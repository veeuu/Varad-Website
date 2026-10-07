import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import './ModelViewer.css'

const ENVIRONMENT_LIGHTS = {
  forest: { sky: 0xb7d0b7, ground: 0x253525, key: 0xc8dfb3 },
  studio: { sky: 0xe9e4d9, ground: 0x24211d, key: 0xffffff },
}

export default function ModelViewer({
  url,
  width = 400,
  height = 400,
  modelXOffset = 0,
  modelYOffset = 0,
  modelScale = 5.25,
  mobileModelXOffset = 0,
  mobileModelYOffset = 0,
  mobileModelScale = 4,
  enableMouseParallax = false,
  enableHoverRotation = false,
  environmentPreset = 'studio',
  fadeIn = true,
  autoRotate = false,
  autoRotateSpeed = 0.35,
}) {
  const containerRef = useRef(null)
  const pointerRef = useRef(new THREE.Vector2())
  const rotationRef = useRef(new THREE.Vector2())
  const dragRef = useRef({ active: false, x: 0, y: 0 })
  const [status, setStatus] = useState('Loading 3D model')
  const [modelReady, setModelReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let disposed = false
    let animationFrame = 0
    let model = null
    let mixer = null
    let lastTime = 0
    const lights = ENVIRONMENT_LIGHTS[environmentPreset] || ENVIRONMENT_LIGHTS.studio
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0.45, 4.2)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true })
    } catch (error) {
      setStatus(`3D preview is unavailable: ${error.message}`)
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D model preview')
    container.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(lights.sky, lights.ground, 2.1))
    const keyLight = new THREE.DirectionalLight(lights.key, 3.5)
    keyLight.position.set(-3, 5, 5)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0xa8bcff, 2.4)
    rimLight.position.set(4, 2, -3)
    scene.add(rimLight)

    const resize = () => {
      if (disposed) return
      const bounds = container.getBoundingClientRect()
      const viewWidth = Math.max(1, bounds.width || width)
      const viewHeight = Math.max(1, bounds.height || height)
      renderer.setSize(viewWidth, viewHeight, false)
      camera.aspect = viewWidth / viewHeight
      camera.updateProjectionMatrix()
      if (model) {
        const isMobile = window.matchMedia('(max-width: 700px)').matches
        model.scale.setScalar((isMobile ? mobileModelScale : modelScale) / model.userData.maxDimension)
        model.position.x = -model.userData.center.x * model.scale.x + (isMobile ? mobileModelXOffset : modelXOffset)
        model.position.y = -model.userData.center.y * model.scale.y + (isMobile ? mobileModelYOffset : modelYOffset)
        model.position.z = -model.userData.center.z * model.scale.z
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    const handlePointerMove = event => {
      if (dragRef.current.active) {
        const deltaX = event.clientX - dragRef.current.x
        const deltaY = event.clientY - dragRef.current.y
        rotationRef.current.x = THREE.MathUtils.clamp(
          rotationRef.current.x + deltaY * 0.009,
          -1.2,
          1.2,
        )
        rotationRef.current.y += deltaX * 0.009
        dragRef.current.x = event.clientX
        dragRef.current.y = event.clientY
        return
      }

      const bounds = container.getBoundingClientRect()
      pointerRef.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      pointerRef.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
    }
    const handlePointerDown = event => {
      if (event.button !== 0) return
      dragRef.current = { active: true, x: event.clientX, y: event.clientY }
      container.classList.add('is-dragging')
      container.setPointerCapture(event.pointerId)
      event.preventDefault()
    }
    const handlePointerUp = () => {
      dragRef.current.active = false
      container.classList.remove('is-dragging')
    }
    const clearPointer = () => {
      if (!dragRef.current.active) pointerRef.current.set(0, 0)
    }
    const handleKeyDown = event => {
      const rotationStep = 0.12
      if (event.key === 'ArrowLeft') rotationRef.current.y -= rotationStep
      else if (event.key === 'ArrowRight') rotationRef.current.y += rotationStep
      else if (event.key === 'ArrowUp') rotationRef.current.x -= rotationStep
      else if (event.key === 'ArrowDown') rotationRef.current.x += rotationStep
      else return
      event.preventDefault()
    }
    container.addEventListener('pointerdown', handlePointerDown)
    container.addEventListener('pointermove', handlePointerMove)
    container.addEventListener('pointerleave', clearPointer)
    container.addEventListener('pointerup', handlePointerUp)
    container.addEventListener('pointercancel', handlePointerUp)
    container.addEventListener('lostpointercapture', handlePointerUp)
    container.addEventListener('keydown', handleKeyDown)

    const loader = new GLTFLoader()
    loader.load(
      url,
      gltf => {
        if (disposed) {
          gltf.scene.traverse(object => {
            if (object.isMesh) {
              object.geometry.dispose()
              for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
                material.dispose()
              }
            }
          })
          return
        }

        model = gltf.scene
        const bounds = new THREE.Box3().setFromObject(model)
        const center = bounds.getCenter(new THREE.Vector3())
        const size = bounds.getSize(new THREE.Vector3())
        const maxDimension = Math.max(size.x, size.y, size.z, 0.001)
        model.userData.center = center
        model.userData.maxDimension = maxDimension
        resize()
        scene.add(model)

        if (gltf.animations.length) {
          mixer = new THREE.AnimationMixer(model)
          gltf.animations.forEach(clip => mixer.clipAction(clip).play())
        }

        setModelReady(true)
        setStatus('3D model loaded')
      },
      undefined,
      error => {
        if (!disposed) setStatus(`Could not load 3D model: ${error.message || 'please try again later'}`)
      },
    )

    const animate = time => {
      if (disposed) return
      animationFrame = window.requestAnimationFrame(animate)
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0
      lastTime = time

      if (model) {
        const cursorTiltX = enableMouseParallax || enableHoverRotation ? pointerRef.current.y * 0.16 : 0
        const cursorTiltY = enableMouseParallax || enableHoverRotation ? pointerRef.current.x * 0.28 : 0
        const targetX = rotationRef.current.x + cursorTiltX
        const targetY = rotationRef.current.y + cursorTiltY
        model.rotation.x += (targetX - model.rotation.x) * 0.09
        model.rotation.y += (targetY - model.rotation.y) * 0.09
        if (autoRotate) model.rotation.y += delta * autoRotateSpeed
      }

      mixer?.update(delta)
      renderer.render(scene, camera)
    }
    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      container.removeEventListener('pointerdown', handlePointerDown)
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerleave', clearPointer)
      container.removeEventListener('pointerup', handlePointerUp)
      container.removeEventListener('pointercancel', handlePointerUp)
      container.removeEventListener('lostpointercapture', handlePointerUp)
      container.removeEventListener('keydown', handleKeyDown)
      container.classList.remove('is-dragging')
      mixer?.stopAllAction()
      scene.traverse(object => {
        if (!object.isMesh) return
        object.geometry.dispose()
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          for (const value of Object.values(material)) {
            if (value?.isTexture) value.dispose()
          }
          material.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [
    autoRotate,
    autoRotateSpeed,
    enableHoverRotation,
    enableMouseParallax,
    environmentPreset,
    height,
    modelScale,
    modelXOffset,
    modelYOffset,
    mobileModelXOffset,
    mobileModelYOffset,
    mobileModelScale,
    url,
    width,
  ])

  return (
    <div
      className={`model-viewer${modelReady && fadeIn ? ' model-viewer--ready' : ''}`}
      style={{ '--model-width': `${width}px`, '--model-height': `${height}px` }}
    >
      <div
        ref={containerRef}
        className="model-viewer__canvas"
        role="region"
        aria-label="Interactive 3D model. Drag to rotate, or use the arrow keys."
        tabIndex={0}
      />
      {!modelReady && <p className="model-viewer__status" role="status">{status}</p>}
      {modelReady && (
        <span className="model-viewer__status--sr-only" role="status">{status}</span>
      )}
    </div>
  )
}
