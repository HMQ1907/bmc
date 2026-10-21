<script setup>
/**
 * Three.js hero scene — a living "corrugated sheet":
 * a point-cloud surface shaped like flute waves, rolling through space,
 * with a scanning laser line and floating particles. Reacts to the mouse.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const host = ref(null)
let renderer, scene, camera, raf, sheet, sheetMat, dust, scan, ro
const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function makeSheet() {
  const COLS = 180, ROWS = 70, W = 26, D = 10
  const count = COLS * ROWS
  const pos = new Float32Array(count * 3)
  const uv = new Float32Array(count * 2)
  let i = 0
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const u = c / (COLS - 1), v = r / (ROWS - 1)
      pos[i * 3] = (u - 0.5) * W
      pos[i * 3 + 1] = 0
      pos[i * 3 + 2] = (v - 0.5) * D
      uv[i * 2] = u; uv[i * 2 + 1] = v
      i++
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.setAttribute('aUv', new THREE.BufferAttribute(uv, 2))

  sheetMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPx: { value: Math.min(window.devicePixelRatio, 2) },
      uRed: { value: new THREE.Color('#ff2d4a') },
      uCyan: { value: new THREE.Color('#3de0ff') }
    },
    vertexShader: /* glsl */`
      uniform float uTime; uniform float uPx;
      attribute vec2 aUv;
      varying float vH; varying vec2 vUv; varying float vScan;
      void main() {
        vec3 p = position;
        // corrugated flute profile travelling along X
        float flute = sin(p.x * 2.2 - uTime * 1.6) * 0.38;
        // big slow swell so the sheet feels like it is moving on rollers
        float swell = sin(p.x * 0.22 + uTime * 0.35) * 1.1 + cos(p.z * 0.45 + uTime * 0.5) * 0.45;
        p.y = flute + swell;
        vH = flute / 0.38;
        vUv = aUv;
        float scanX = mod(uTime * 0.12, 1.4) - 0.2;
        vScan = 1.0 - smoothstep(0.0, 0.035, abs(aUv.x - scanX));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = (1.6 + vScan * 2.6 + (vH * 0.5 + 0.5) * 0.9) * uPx * (12.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uRed; uniform vec3 uCyan;
      varying float vH; varying vec2 vUv; varying float vScan;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float soft = smoothstep(0.5, 0.0, d);
        vec3 col = mix(uCyan * 0.55, uRed, smoothstep(0.15, 0.95, vUv.x));
        col = mix(col, vec3(1.0), vH * 0.5 + 0.5 > 0.92 ? 0.35 : 0.0);
        col += vScan * vec3(1.0, 0.9, 0.9);
        float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.82, vUv.x) * smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
        float a = soft * (0.35 + (vH * 0.5 + 0.5) * 0.5 + vScan) * edge;
        gl_FragColor = vec4(col, a);
      }`
  })
  sheet = new THREE.Points(g, sheetMat)
  sheet.rotation.x = -0.18
  scene.add(sheet)
}

function makeDust() {
  const n = 600
  const pos = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 40
    pos[i * 3 + 1] = (Math.random() - 0.2) * 16
    pos[i * 3 + 2] = (Math.random() - 0.5) * 24
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const m = new THREE.PointsMaterial({ color: 0x9fdcff, size: 0.05, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending })
  dust = new THREE.Points(g, m)
  scene.add(dust)
}

function makeRings() {
  // roller "ghosts" — thin rings suggesting corrugating rolls
  scan = new THREE.Group()
  const mat = new THREE.LineBasicMaterial({ color: 0x3de0ff, transparent: true, opacity: 0.18 })
  for (let k = 0; k < 3; k++) {
    const curve = new THREE.EllipseCurve(0, 0, 1.6 + k * 0.5, 1.6 + k * 0.5, 0, Math.PI * 2)
    const pts = curve.getPoints(96).map((p) => new THREE.Vector3(p.x, p.y, 0))
    const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), mat)
    scan.add(line)
  }
  scan.position.set(7.5, 3.6, -3)
  scan.rotation.y = -0.5
  scene.add(scan)
}

function resize() {
  if (!host.value || !renderer) return
  const w = host.value.clientWidth, h = host.value.clientHeight
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.position.set(0, 4.2, w < 720 ? 17 : 13)
  camera.updateProjectionMatrix()
}

function onMove(e) {
  mouse.tx = (e.clientX / window.innerWidth - 0.5)
  mouse.ty = (e.clientY / window.innerHeight - 0.5)
}

onMounted(() => {
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch (e) {
    return // no WebGL — CSS fallback background remains
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  host.value.appendChild(renderer.domElement)
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x05070d, 0.045)
  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.lookAt(0, 0, 0)
  makeSheet(); makeDust(); makeRings()
  resize()
  ro = new ResizeObserver(resize); ro.observe(host.value)
  window.addEventListener('pointermove', onMove, { passive: true })

  const clock = new THREE.Clock()
  let visible = true
  const vis = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
  vis.observe(host.value)
  host.value._vis = vis

  const loop = () => {
    raf = requestAnimationFrame(loop)
    if (!visible) return
    const t = reduce ? 4 : clock.getElapsedTime()
    sheetMat.uniforms.uTime.value = t
    mouse.x += (mouse.tx - mouse.x) * 0.04
    mouse.y += (mouse.ty - mouse.y) * 0.04
    sheet.rotation.y = mouse.x * 0.25
    sheet.rotation.x = -0.18 + mouse.y * 0.08
    dust.rotation.y = t * 0.015
    scan.rotation.z = t * 0.2
    camera.lookAt(mouse.x * 1.2, 0.4 - mouse.y * 0.6, 0)
    renderer.render(scene, camera)
  }
  loop()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
  ro && ro.disconnect()
  host.value && host.value._vis && host.value._vis.disconnect()
  if (renderer) {
    scene.traverse((o) => { o.geometry && o.geometry.dispose(); o.material && o.material.dispose() })
    renderer.dispose()
    renderer.domElement.remove()
  }
})
</script>

<template>
  <div ref="host" class="hero-canvas" aria-hidden="true"></div>
</template>

<style scoped>
.hero-canvas { position: absolute; inset: 0; }
.hero-canvas :deep(canvas) { width: 100% !important; height: 100% !important; display: block; }
</style>
