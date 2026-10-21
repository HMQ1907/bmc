/**
 * BMC cinematic scroll scene (inspired by Montfort-style storytelling).
 * One renderer, four "acts" driven by a single progress value p ∈ [0,1]:
 *   A. drifting cloud sea (domain-warped fbm)           — also used as the transition veil
 *   B. energy light streaks curving into the horizon    — "uốn lượn" fibre-optic lines
 *   C. hologram corrugator line, camera flying a curve  — blueprint wireframe on dot floor
 *   D. undulating dot sea                                — waves of light points
 */
import * as THREE from 'three'

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
const bell = (a, b, c, d, x) => smooth(a, b, x) * (1 - smooth(c, d, x))
export const lerp = (a, b, t) => a + (b - a) * t

/* ---------- shared GLSL noise ---------- */
const NOISE = /* glsl */`
  float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
  float fbm(vec2 p){ float v = 0., a = .5; mat2 m = mat2(1.6,1.2,-1.2,1.6);
    for(int i=0;i<5;i++){ v += a*noise(p); p = m*p; a *= .5; } return v; }
`

export function createStory(host, { mobile = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: false, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2))
  renderer.setClearColor(0x04060b, 1)
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200)
  const clock = new THREE.Clock()
  const disposables = []
  const track = (o) => { disposables.push(o); return o }

  /* ============ A. CLOUD VEIL (screen-space quad, drawn last) ============ */
  const cloudMat = track(new THREE.ShaderMaterial({
    transparent: true, depthTest: false, depthWrite: false,
    uniforms: { uTime: { value: 0 }, uCover: { value: 1 }, uDark: { value: 0 }, uAspect: { value: 1 }, uScroll: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader: NOISE + /* glsl */`
      uniform float uTime, uCover, uDark, uAspect, uScroll; varying vec2 vUv;
      void main(){
        vec2 p = vec2(vUv.x*uAspect, vUv.y) * 1.6;
        p.y -= uScroll * 2.5;
        float t = uTime * .04;
        vec2 q = vec2(fbm(p + vec2(0., t)), fbm(p + vec2(5.2, 1.3) - t));
        vec2 r = vec2(fbm(p + 3.5*q + vec2(1.7, 9.2) + t*1.6), fbm(p + 3.5*q + vec2(8.3, 2.8) - t));
        float f = fbm(p + 3.0*r);
        // cloud colours: cold steel → white highlights
        vec3 deep = mix(vec3(.62,.69,.78), vec3(.05,.08,.13), uDark);
        vec3 lite = mix(vec3(.96,.97,.99), vec3(.42,.52,.64), uDark);
        vec3 col = mix(deep, lite, smoothstep(.25, .85, f + length(q)*.35));
        col = mix(col, vec3(1.), smoothstep(.7, 1.05, f + r.x*.4) * (1. - uDark) * .6);
        // dissolve: coverage threshold through the noise field → wispy transitions
        float edge = 1. - uCover;
        float a = smoothstep(edge - .18, edge + .18, f * .9 + q.y * .35 + (1. - vUv.y) * .08);
        a *= smoothstep(0., .02, uCover);
        gl_FragColor = vec4(col, a);
      }`
  }))
  const cloud = new THREE.Mesh(track(new THREE.PlaneGeometry(2, 2)), cloudMat)
  cloud.frustumCulled = false
  cloud.renderOrder = 999
  scene.add(cloud)

  /* ============ B. ENERGY STREAKS ============ */
  const streaks = new THREE.Group()
  scene.add(streaks)
  const STREAKS = mobile ? 150 : 300, SEG = 90
  {
    const pos = [], aT = [], aSeed = [], idx = []
    let v = 0
    const tmp = new THREE.Vector3()
    for (let i = 0; i < STREAKS; i++) {
      const s = Math.random()
      const side = (i / STREAKS) * 2 - 1                              // -1..1 spread
      const x0 = side * (18 + Math.random() * 10)
      const lift = 2.5 + Math.random() * 11
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(x0, -3.2 - Math.random() * 1.5, 10 + Math.random() * 4),      // foreground, fanned out
        new THREE.Vector3(x0 * 0.45, -2.2, -6 - Math.random() * 4),                      // sweep toward horizon
        new THREE.Vector3(side * (0.6 + Math.random() * 1.2), -1.4, -22),               // converge
        new THREE.Vector3(side * (0.4 + Math.random() * 2.4), -1.2 + lift, -24 - Math.random() * 2) // rise like a fountain
      )
      for (let k = 0; k <= SEG; k++) {
        curve.getPoint(k / SEG, tmp)
        pos.push(tmp.x, tmp.y, tmp.z); aT.push(k / SEG); aSeed.push(s)
        if (k) idx.push(v + k - 1, v + k)
      }
      v += SEG + 1
    }
    const g = track(new THREE.BufferGeometry())
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setAttribute('aT', new THREE.Float32BufferAttribute(aT, 1))
    g.setAttribute('aSeed', new THREE.Float32BufferAttribute(aSeed, 1))
    g.setIndex(idx)
    const m = track(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uAlpha: { value: 0 }, uRed: { value: 0 } },
      vertexShader: `attribute float aT; attribute float aSeed; varying float vT; varying float vS; varying float vZ;
        void main(){ vT = aT; vS = aSeed; vec4 mv = modelViewMatrix * vec4(position,1.); vZ = -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform float uTime, uAlpha, uRed; varying float vT; varying float vS; varying float vZ;
        void main(){
          float sp = .12 + vS * .22;
          float s = fract(vT * 1.3 - uTime * sp + vS * 7.);
          float pulse = smoothstep(0., .015, s) * smoothstep(.16, 0., s);
          float core = smoothstep(.45, .66, vT) * (1. - smoothstep(.66, 1., vT));   // glow where lines converge
          vec3 cyan = vec3(.24,.78,1.), white = vec3(.85,.97,1.), red = vec3(1.,.2,.32);
          vec3 base = mix(cyan, red, uRed * step(.5, fract(vS*13.)));
          vec3 col = mix(base * .55, white, pulse * .8 + core * .5);
          float fade = smoothstep(0., .08, vT) * (1. - smoothstep(.86, 1., vT));
          float a = (.10 + pulse * .95 + core * .35) * fade * uAlpha;
          gl_FragColor = vec4(col, a);
        }`
    }))
    streaks.add(new THREE.LineSegments(g, m))
    streaks.userData.mat = m

    // horizon glow
    const glowMat = track(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uAlpha: { value: 0 }, uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
      fragmentShader: `uniform float uAlpha, uTime; varying vec2 vUv;
        void main(){ vec2 c = vUv - vec2(.5,.42); c.x *= .45;
          float g = exp(-dot(c,c)*28.) * (0.85 + .15*sin(uTime*2.));
          float band = exp(-pow((vUv.y-.42)*18., 2.)) * .5;
          gl_FragColor = vec4(vec3(.3,.8,1.)*(g+band), (g+band)*uAlpha); }`
    }))
    const glow = new THREE.Mesh(track(new THREE.PlaneGeometry(60, 30)), glowMat)
    glow.position.set(0, -0.5, -25)
    streaks.add(glow)
    streaks.userData.glow = glowMat
  }

  /* ============ C+D. DOT FLOOR (shared, waves controllable) ============ */
  const floorMat = track(new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uAlpha: { value: 0 }, uWave: { value: 0 }, uPx: { value: renderer.getPixelRatio() } },
    vertexShader: `uniform float uTime, uWave, uPx; varying float vH; varying float vD;
      void main(){
        vec3 p = position;
        float d = length(p.xz - vec2(4., -6.));
        float w = sin(d*.55 - uTime*1.4) * .5 + sin(p.x*.32 + uTime*.8) * .35 + cos(p.z*.4 - uTime*.6) * .3;
        p.y += w * uWave;
        vH = w; vD = d;
        vec4 mv = modelViewMatrix * vec4(p, 1.);
        gl_PointSize = (1.4 + max(w,0.)*uWave*1.2) * uPx * (16. / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `uniform float uAlpha, uWave; varying float vH; varying float vD;
      void main(){ vec2 c = gl_PointCoord - .5; if(length(c) > .5) discard;
        vec3 col = mix(vec3(.16,.55,.85), vec3(.75,.95,1.), smoothstep(.2, 1., vH) * uWave);
        col = mix(col, vec3(1.,.25,.35), smoothstep(.85, 1.1, vH) * uWave * .6);
        float a = (.35 + max(vH,0.) * .6 * uWave) * uAlpha * (1. - smoothstep(18., 42., vD));
        gl_FragColor = vec4(col, a); }`
  }))
  {
    const COLS = mobile ? 90 : 150, ROWS = mobile ? 60 : 90, SP = 0.55
    const pos = new Float32Array(COLS * ROWS * 3)
    let i = 0
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      pos[i++] = (c - COLS / 2) * SP + (r % 2) * SP * 0.5   // hex-like offset rows
      pos[i++] = 0
      pos[i++] = (r - ROWS * 0.7) * SP
    }
    const g = track(new THREE.BufferGeometry())
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const floor = new THREE.Points(g, floorMat)
    floor.position.set(2, -0.05, 0)
    scene.add(floor)
  }

  /* ============ C. HOLOGRAM CORRUGATOR LINE ============ */
  const holo = new THREE.Group()
  scene.add(holo)
  const edgeMat = track(new THREE.LineBasicMaterial({ color: 0x5fe6ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }))
  const fillMat = track(new THREE.MeshBasicMaterial({ color: 0x0a4a6e, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
  const accentMat = track(new THREE.LineBasicMaterial({ color: 0xff3b55, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }))
  const W = 3.2 // machine width (z)

  function part(geo, x, y, z, { rx = 0, ry = 0, rz = 0, accent = false } = {}) {
    track(geo)
    const mesh = new THREE.Mesh(geo, fillMat)
    const edges = new THREE.LineSegments(track(new THREE.EdgesGeometry(geo, 18)), accent ? accentMat : edgeMat)
    const g = new THREE.Group(); g.add(mesh, edges)
    g.position.set(x, y, z); g.rotation.set(rx, ry, rz)
    holo.add(g)
    return g
  }
  const box = (w, h, d, x, y, z, o) => part(new THREE.BoxGeometry(w, h, d), x, y, z, o)
  const roll = (r, x, y, len = W, o = {}) => part(new THREE.CylinderGeometry(r, r, len, 28, 1, true), x, y, 0, { rx: Math.PI / 2, ...o })

  // 01 mill roll stands (with paper reels)
  ;[-17, -14.2].forEach((x) => {
    box(0.25, 2.6, 0.25, x - 0.8, 1.3, -W / 2 - 0.2); box(0.25, 2.6, 0.25, x + 0.8, 1.3, -W / 2 - 0.2)
    box(0.25, 2.6, 0.25, x - 0.8, 1.3, W / 2 + 0.2); box(0.25, 2.6, 0.25, x + 0.8, 1.3, W / 2 + 0.2)
    roll(1.0, x, 1.6, W - 0.2, { accent: x === -17 })
    roll(0.18, x, 1.6, W + 0.8)
  })
  // 02 preheater
  box(1.4, 2.4, W, -10.8, 1.2, 0); roll(0.55, -10.8, 2.6, W + 0.2)
  // 03 single facer (cassette)
  box(2.4, 2.2, W + 0.4, -7.2, 1.1, 0); roll(0.42, -7.6, 2.55, W + 0.6, { accent: true }); roll(0.42, -6.8, 2.55, W + 0.6)
  // bridge conveyor
  box(9, 0.12, W - 0.4, -1.8, 3.6, 0); [-5.5, -1.8, 1.9].forEach((x) => box(0.15, 3.6, 0.15, x, 1.8, W / 2 - 0.4))
  // 04 glue machine
  box(1.6, 2.0, W, 3.6, 1.0, 0); roll(0.32, 3.6, 2.2, W + 0.4)
  // 05 double facer — long with heating plates
  box(9, 0.9, W, 9.8, 0.45, 0)
  for (let k = 0; k < 14; k++) box(0.5, 0.08, W - 0.2, 5.8 + k * 0.6, 1.0, 0)
  box(9, 0.1, W - 0.6, 9.8, 1.6, 0, { accent: true })
  // 06 slitter scorer
  box(1.3, 2.0, W + 0.4, 15.6, 1.0, 0); roll(0.25, 15.6, 1.4, W + 0.6); roll(0.25, 15.6, 0.9, W + 0.6)
  // 07 cut-off & stacker
  box(1.6, 2.2, W + 0.4, 18.4, 1.1, 0); roll(0.5, 18.4, 1.6, W + 0.6, { accent: true })
  box(2.6, 1.2, W, 21.4, 0.6, 0)
  for (let k = 0; k < 5; k++) box(2.2, 0.12, W - 0.6, 21.4, 1.35 + k * 0.16, 0)

  // flowing board ribbon (points that travel along the machine path, with flute ripple)
  const ribbonMat = track(new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uAlpha: { value: 0 }, uPx: { value: renderer.getPixelRatio() } },
    vertexShader: `uniform float uTime, uPx; attribute float aU; varying float vU;
      void main(){ vec3 p = position; float u = fract(aU + uTime*.035);
        // path: up over the bridge then down along the double facer
        float x = mix(-17., 22., u);
        float y = 1.6 + smoothstep(-9.,-6.,x)*2.1 - smoothstep(2.,4.,x)*2.65 + sin(x*7.)*.04;
        p.x = x; p.y = y; vU = u;
        vec4 mv = modelViewMatrix * vec4(p,1.); gl_PointSize = 2.2 * uPx * (14. / -mv.z); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform float uAlpha; varying float vU; void main(){ vec2 c = gl_PointCoord-.5; if(length(c)>.5) discard;
      gl_FragColor = vec4(mix(vec3(.4,.9,1.), vec3(1.,.4,.5), vU), .8*uAlpha); }`
  }))
  {
    const N = mobile ? 1200 : 2600
    const pos = new Float32Array(N * 3), aU = new Float32Array(N)
    for (let i = 0; i < N; i++) { aU[i] = Math.random(); pos[i * 3 + 2] = (Math.random() - 0.5) * (W - 0.6) }
    const g = track(new THREE.BufferGeometry())
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aU', new THREE.BufferAttribute(aU, 1))
    holo.add(new THREE.Points(g, ribbonMat))
  }

  // scan plane sweeping along the line
  const scanMat = track(new THREE.MeshBasicMaterial({ color: 0x3de0ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
  const scan = new THREE.Mesh(track(new THREE.PlaneGeometry(W + 2, 5)), scanMat)
  scan.rotation.y = Math.PI / 2; scan.position.y = 2.5
  holo.add(scan)

  // camera path over the line (curvy dolly)
  const camPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-32, 12, 24), new THREE.Vector3(-16, 7, 14), new THREE.Vector3(-4, 5.5, 12),
    new THREE.Vector3(7, 6, 12.5), new THREE.Vector3(17, 5, 11), new THREE.Vector3(27, 9, 15)
  ], false, 'catmullrom', 0.5)
  const look = new THREE.Vector3()
  const camPos = new THREE.Vector3()

  /* ============ state & update ============ */
  const state = { p: 0, mx: 0, my: 0, visible: true }
  const out = { stage: 0, holoT: 0 }

  function resize() {
    const w = host.clientWidth, h = host.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.fov = w < h ? 60 : 45
    camera.updateProjectionMatrix()
    cloudMat.uniforms.uAspect.value = w / h
  }

  function frame() {
    const t = clock.getElapsedTime()
    const p = state.p

    // --- act weights
    const wStreak = bell(0.17, 0.27, 0.47, 0.53, p)
    const wHolo = bell(0.50, 0.57, 0.78, 0.83, p)
    const wSea = smooth(0.80, 0.88, p)
    const cover = Math.max(1 - smooth(0.12, 0.26, p), bell(0.44, 0.515, 0.515, 0.6, p), bell(0.75, 0.815, 0.815, 0.88, p) * 0.95)

    cloudMat.uniforms.uTime.value = t
    cloudMat.uniforms.uCover.value = cover
    cloudMat.uniforms.uDark.value = smooth(0.3, 0.55, p) * 0.85
    cloudMat.uniforms.uScroll.value = p

    streaks.visible = wStreak > 0.001
    streaks.userData.mat.uniforms.uTime.value = t
    streaks.userData.mat.uniforms.uAlpha.value = wStreak
    streaks.userData.mat.uniforms.uRed.value = smooth(0.35, 0.47, p)
    streaks.userData.glow.uniforms.uAlpha.value = wStreak
    streaks.userData.glow.uniforms.uTime.value = t

    holo.visible = wHolo > 0.001
    const flick = 0.92 + Math.sin(t * 40) * 0.03 + (Math.random() < 0.02 ? -0.3 : 0)
    edgeMat.opacity = 0.85 * wHolo * flick
    accentMat.opacity = 0.9 * wHolo
    fillMat.opacity = 0.16 * wHolo
    ribbonMat.uniforms.uAlpha.value = wHolo
    ribbonMat.uniforms.uTime.value = t
    const holoT = smooth(0.52, 0.80, p)
    scan.position.x = lerp(-19, 24, (t * 0.12) % 1)
    scanMat.opacity = 0.06 * wHolo

    floorMat.uniforms.uTime.value = t
    floorMat.uniforms.uAlpha.value = Math.max(wHolo * 0.7, wSea, wStreak * 0.0)
    floorMat.uniforms.uWave.value = lerp(0.04, 1.6, wSea)

    // --- camera per act (switched while hidden behind the cloud veil)
    if (p < 0.515) {
      // streak act: low camera looking at the horizon, slight drift
      const k = smooth(0.17, 0.5, p)
      camera.position.set(state.mx * 1.5, 0.2 + k * 0.8 - state.my * 0.6, 9 - k * 4)
      look.set(state.mx * 2, 0.6, -20)
    } else if (p < 0.815) {
      camPath.getPoint(holoT, camPos)
      camera.position.set(camPos.x + state.mx * 1.2, camPos.y - state.my * 0.8, camPos.z)
      look.set(lerp(-15, 22, holoT) - 5.5, 2.6, 0)
    } else {
      const k = smooth(0.8, 1, p)
      camera.position.set(4 + state.mx * 2, 3.2 + k * 1.5 - state.my, 12 - k * 2)
      look.set(4, 0, -8)
    }
    camera.lookAt(look)

    out.holoT = holoT
    out.stage = Math.min(6, Math.floor(holoT * 7))
    renderer.render(scene, camera)
  }

  resize()
  return {
    renderer, resize, frame, state, out,
    dispose() {
      disposables.forEach((d) => d.dispose && d.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }
}
