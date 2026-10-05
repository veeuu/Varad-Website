import { Color, Mesh, Program, Renderer, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

import './Aurora.css'

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
  int index = 0; \
  for (int i = 0; i < 2; i++) { \
    ColorStop currentColor = colors[i]; \
    bool isInBetween = currentColor.position <= factor; \
    index = int(mix(float(index), float(i), float(isInBetween))); \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index + 1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float portrait = smoothstep(0.78, 1.15, uResolution.y / uResolution.x);
  float detail = mix(1.0, 1.75, portrait);
  float motionScale = mix(1.0, 1.3, portrait);
  float flowA = snoise(vec2(uv.x * 1.35 * detail + uTime * 0.08, uTime * 0.16));
  float flowB = snoise(vec2(uv.x * 2.1 * detail - uTime * 0.06, 2.7 + uTime * 0.12));
  float flowC = snoise(vec2(uv.x * 0.8 * detail + uTime * 0.04, 5.1 - uTime * 0.1));
  float waveA = 0.59 + flowA * 0.11 * uAmplitude * motionScale + sin(uv.x * 5.4 * detail - uTime * 0.34) * 0.025 * motionScale;
  float waveB = 0.77 + flowB * 0.085 * uAmplitude * motionScale + sin(uv.x * 3.8 * detail + uTime * 0.25) * 0.03 * motionScale;
  float waveC = 0.91 + flowC * 0.045 * uAmplitude * motionScale + sin(uv.x * 7.3 * detail - uTime * 0.2) * 0.016 * motionScale;
  float softness = max(0.018, uBlend * mix(0.09, 0.075, portrait));

  float fadeTop = 1.0 - smoothstep(0.91, 1.0, uv.y);
  float lowerCurtain = smoothstep(waveA - softness, waveA + softness, uv.y) * fadeTop;
  float middleCurtain = smoothstep(waveB - softness, waveB + softness, uv.y)
    * (1.0 - smoothstep(waveC - softness, waveC + softness, uv.y));
  float upperCurtain = smoothstep(waveC - softness, waveC + softness, uv.y);
  float ribbonA = exp(-pow((uv.y - waveA) / 0.045, 2.0));
  float ribbonB = exp(-pow((uv.y - waveB) / 0.04, 2.0));

  float alpha = clamp(
    lowerCurtain * mix(0.25, 0.34, portrait) + middleCurtain * mix(0.22, 0.3, portrait) + upperCurtain * 0.08
      + (ribbonA * mix(0.12, 0.17, portrait) + ribbonB * mix(0.1, 0.14, portrait)) * fadeTop,
    0.0,
    mix(0.48, 0.58, portrait)
  );
  vec3 color = mix(rampColor, uColorStops[1], 0.16);
  color = mix(color, uColorStops[0], ribbonA * 0.18);
  color = mix(color, uColorStops[2], ribbonB * 0.2);

  fragColor = vec4(color * alpha, alpha);
}
`

const DEFAULT_COLORS = ['#D4A05A', '#E8879C', '#6E8B89']

export default function Aurora({ colorStops = DEFAULT_COLORS, amplitude = 1, blend = 0.5, speed = 1 }) {
  const containerRef = useRef(null)
  const settingsRef = useRef({ colorStops, amplitude, blend, speed })
  settingsRef.current = { colorStops, amplitude, blend, speed }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let renderer
    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true })
    } catch {
      return undefined
    }

    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.canvas.setAttribute('aria-hidden', 'true')

    const getColorValues = stops => stops.map(hex => {
      const color = new Color(hex)
      return [color.r, color.g, color.b]
    })

    const size = () => {
      const { width, height } = container.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      renderer.setSize(Math.max(1, width * pixelRatio), Math.max(1, height * pixelRatio))
      if (program) program.uniforms.uResolution.value = [width * pixelRatio, height * pixelRatio]
    }

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) delete geometry.attributes.uv

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: getColorValues(colorStops) },
        uResolution: { value: [1, 1] },
        uBlend: { value: blend },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    container.appendChild(gl.canvas)

    let frameId = 0
    let lastColorStops = colorStops
    const render = timestamp => {
      const settings = settingsRef.current
      program.uniforms.uTime.value = timestamp * 0.0001 * settings.speed
      program.uniforms.uAmplitude.value = settings.amplitude
      program.uniforms.uBlend.value = settings.blend
      if (settings.colorStops !== lastColorStops) {
        program.uniforms.uColorStops.value = getColorValues(settings.colorStops)
        lastColorStops = settings.colorStops
      }
      renderer.render({ scene: mesh })
      frameId = window.requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(size)
    resizeObserver.observe(container)
    size()
    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <div ref={containerRef} className="aurora-container" aria-hidden="true" />
}
