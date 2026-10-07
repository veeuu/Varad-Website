import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './Ballpit.css'

const BALL_COLORS = [0xd4a05a, 0xb8d59c, 0xe8879c, 0xd7c6ed, 0xe9e4d9]

export default function Ballpit({
  count = 100,
  gravity = 0.01,
  friction = 0.9975,
  wallBounce = 0.95,
  followCursor = false,
  className = '',
  onComplete,
}) {
  const canvasRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  const [error, setError] = useState('')
  onCompleteRef.current = onComplete

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'WebGL is unavailable'
      setError(`The 3D animation could not start: ${message}`)
      return undefined
    }

    let frameId = 0
    let previousTime = 0
    let stableFrames = 0
    let rollingOut = false
    let completed = false
    let disposed = false
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    const cameraDistance = 14
    camera.position.z = cameraDistance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping

    scene.add(new THREE.HemisphereLight(0xf4e8d8, 0x22241c, 2))
    const keyLight = new THREE.DirectionalLight(0xffffff, 3)
    keyLight.position.set(-4, 7, 8)
    scene.add(keyLight)
    const fillLight = new THREE.PointLight(0xb8d59c, 18, 22)
    fillLight.position.set(5, -2, 5)
    scene.add(fillLight)

    const ballCount = Math.max(1, Math.floor(count))
    const geometry = new THREE.SphereGeometry(1, 18, 14)
    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0.28,
      metalness: 0.16,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    })
    const balls = new THREE.InstancedMesh(geometry, material, ballCount)
    balls.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(balls)

    const positions = new Float32Array(ballCount * 3)
    const velocities = new Float32Array(ballCount * 3)
    const radii = new Float32Array(ballCount)
    const active = new Uint8Array(ballCount).fill(1)
    const dummy = new THREE.Object3D()
    const sphereColor = new THREE.Color()
    const random = Math.random

    for (let index = 0; index < ballCount; index++) {
      const offset = index * 3
      radii[index] = 0.14 + random() * 0.12
      velocities[offset] = (random() - 0.5) * 0.06
      velocities[offset + 1] = (random() - 0.5) * 0.05
      velocities[offset + 2] = (random() - 0.5) * 0.04
      balls.setColorAt(index, sphereColor.setHex(BALL_COLORS[index % BALL_COLORS.length]))
    }

    const bounds = { x: 5, y: 3.5, z: 2.5, viewX: 5 }
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      const halfHeight = cameraDistance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      bounds.y = Math.max(0.5, halfHeight - 0.4)
      bounds.viewX = Math.max(0.5, halfHeight * camera.aspect)
      bounds.x = Math.max(0.5, bounds.viewX - 0.4)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    resize()
    for (let index = 0; index < ballCount; index++) {
      const offset = index * 3
      positions[offset] = (random() * 2 - 1) * Math.max(0, bounds.x - radii[index])
      positions[offset + 1] = (random() * 2 - 1) * Math.max(0, bounds.y - radii[index])
      positions[offset + 2] = (random() * 2 - 1) * (bounds.z - radii[index])
    }

    const animate = time => {
      if (disposed) return
      frameId = window.requestAnimationFrame(animate)
      const frames = previousTime ? Math.min((time - previousTime) / (1000 / 60), 2.5) : 1
      previousTime = time

      let maxSpeedSquared = 0
      for (let index = 0; index < ballCount; index++) {
        if (!active[index]) continue
        const offset = index * 3
        const damping = Math.pow(friction, frames)
        const direction = positions[offset] < 0 || (positions[offset] === 0 && index % 2 === 0) ? -1 : 1
        if (rollingOut) {
          velocities[offset] = THREE.MathUtils.clamp(
            (velocities[offset] + direction * 0.003 * frames) * damping,
            -0.12,
            0.12,
          )
        } else {
          velocities[offset] *= damping
        }
        velocities[offset + 1] -= gravity * frames
        velocities[offset + 1] *= damping
        velocities[offset + 2] *= damping
        if (positions[offset + 1] <= -bounds.y + radii[index] + 0.03 && Math.abs(velocities[offset + 1]) < 0.08) {
          velocities[offset] *= Math.pow(0.985, frames)
        }
        positions[offset] += velocities[offset] * frames
        positions[offset + 1] += velocities[offset + 1] * frames
        positions[offset + 2] += velocities[offset + 2] * frames

        const radius = radii[index]
        if (!rollingOut && (positions[offset] < -bounds.x + radius || positions[offset] > bounds.x - radius)) {
          positions[offset] = THREE.MathUtils.clamp(positions[offset], -bounds.x + radius, bounds.x - radius)
          velocities[offset] *= -wallBounce
        }
        if (positions[offset + 1] < -bounds.y + radius || positions[offset + 1] > bounds.y - radius) {
          const hitFloor = positions[offset + 1] < -bounds.y + radius
          positions[offset + 1] = THREE.MathUtils.clamp(positions[offset + 1], -bounds.y + radius, bounds.y - radius)
          if (hitFloor && Math.abs(velocities[offset + 1]) < 0.08) {
            velocities[offset + 1] = 0
          } else {
            velocities[offset + 1] *= -wallBounce
          }
        }
        if (positions[offset + 2] < -bounds.z + radius || positions[offset + 2] > bounds.z - radius) {
          positions[offset + 2] = THREE.MathUtils.clamp(positions[offset + 2], -bounds.z + radius, bounds.z - radius)
          velocities[offset + 2] *= -wallBounce
        }
        if (rollingOut && Math.abs(positions[offset]) > bounds.viewX + radius) {
          active[index] = 0
          continue
        }
      }

      for (let first = 0; first < ballCount; first++) {
        if (!active[first]) continue
        const firstOffset = first * 3
        for (let second = first + 1; second < ballCount; second++) {
          if (!active[second]) continue
          const secondOffset = second * 3
          const dx = positions[secondOffset] - positions[firstOffset]
          const dy = positions[secondOffset + 1] - positions[firstOffset + 1]
          const dz = positions[secondOffset + 2] - positions[firstOffset + 2]
          const minimumDistance = radii[first] + radii[second]
          const distanceSquared = dx * dx + dy * dy + dz * dz
          if (distanceSquared === 0 || distanceSquared >= minimumDistance * minimumDistance) continue

          const distance = Math.sqrt(distanceSquared)
          const nx = dx / distance
          const ny = dy / distance
          const nz = dz / distance
          const overlap = (minimumDistance - distance) / 2
          positions[firstOffset] -= nx * overlap
          positions[firstOffset + 1] -= ny * overlap
          positions[firstOffset + 2] -= nz * overlap
          positions[secondOffset] += nx * overlap
          positions[secondOffset + 1] += ny * overlap
          positions[secondOffset + 2] += nz * overlap

          const relativeVelocity =
            (velocities[secondOffset] - velocities[firstOffset]) * nx +
            (velocities[secondOffset + 1] - velocities[firstOffset + 1]) * ny +
            (velocities[secondOffset + 2] - velocities[firstOffset + 2]) * nz
          if (relativeVelocity < 0) {
            const impulse = -(1 + wallBounce) * relativeVelocity / 2
            velocities[firstOffset] -= impulse * nx
            velocities[firstOffset + 1] -= impulse * ny
            velocities[firstOffset + 2] -= impulse * nz
            velocities[secondOffset] += impulse * nx
            velocities[secondOffset + 1] += impulse * ny
            velocities[secondOffset + 2] += impulse * nz
          }
        }
      }

      for (let index = 0; index < ballCount; index++) {
        const offset = index * 3
        if (!active[index]) {
          dummy.position.set(0, 0, 0)
          dummy.scale.setScalar(0)
          dummy.updateMatrix()
          balls.setMatrixAt(index, dummy.matrix)
          continue
        }
        const speedSquared =
          velocities[offset] * velocities[offset] +
          velocities[offset + 1] * velocities[offset + 1] +
          velocities[offset + 2] * velocities[offset + 2]
        maxSpeedSquared = Math.max(maxSpeedSquared, speedSquared)
        dummy.position.set(positions[offset], positions[offset + 1], positions[offset + 2])
        dummy.scale.setScalar(radii[index])
        dummy.updateMatrix()
        balls.setMatrixAt(index, dummy.matrix)
      }
      if (!rollingOut) {
        stableFrames = maxSpeedSquared < 0.000625 ? stableFrames + frames : 0
        if (stableFrames >= 90) rollingOut = true
      }
      balls.instanceMatrix.needsUpdate = true
      renderer.render(scene, camera)
      if (rollingOut && active.every(isActive => isActive === 0) && !completed) {
        completed = true
        window.cancelAnimationFrame(frameId)
        onCompleteRef.current?.()
        return
      }
    }

    frameId = window.requestAnimationFrame(animate)

    return () => {
      disposed = true
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      scene.remove(balls)
      geometry.dispose()
      material.dispose()
      if (balls.instanceColor) balls.instanceColor.dispose()
      renderer.dispose()
    }
  }, [count, friction, gravity, wallBounce, followCursor])

  return (
    <div className={`ballpit${className ? ` ${className}` : ''}`}>
      <canvas ref={canvasRef} className="ballpit__canvas" aria-hidden="true"/>
      {error && <p className="ballpit__error" role="alert">{error}</p>}
    </div>
  )
}
