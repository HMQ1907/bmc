import{W as me,S as fe,P as pe,b as C,M as R,g as j,G as V,V as f,h as de,B as q,i as L,A as b,j as te,a as I,d as ae,L as oe,k as ne,D as ie,l as he,m as ge,n as we,C as xe,o as ye}from"./three-Cv_7yLO6.js";const S=(d,p,r)=>{const h=Math.min(1,Math.max(0,(r-d)/(p-d)));return h*h*(3-2*h)},E=(d,p,r,h,g)=>S(d,p,g)*(1-S(r,h,g)),O=(d,p,r)=>d+(p-d)*r,Me=`
  float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
  float fbm(vec2 p){ float v = 0., a = .5; mat2 m = mat2(1.6,1.2,-1.2,1.6);
    for(int i=0;i<5;i++){ v += a*noise(p); p = m*p; a *= .5; } return v; }
`;function be(d,{mobile:p=!1}={}){const r=new me({antialias:!p,alpha:!1,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio,p?1.5:2)),r.setClearColor(263691,1),d.appendChild(r.domElement);const h=new fe,g=new pe(45,1,.1,200),se=new xe,Z=[],s=e=>(Z.push(e),e),A=s(new C({transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uTime:{value:0},uCover:{value:1},uDark:{value:0},uAspect:{value:1},uScroll:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:Me+`
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
      }`})),B=new R(s(new j(2,2)),A);B.frustumCulled=!1,B.renderOrder=999,h.add(B);const w=new V;h.add(w);const N=p?150:300,W=90;{const e=[],t=[],i=[],o=[];let n=0;const m=new f;for(let M=0;M<N;M++){const ce=Math.random(),H=M/N*2-1,ee=H*(18+Math.random()*10),ve=2.5+Math.random()*11,ue=new de(new f(ee,-3.2-Math.random()*1.5,10+Math.random()*4),new f(ee*.45,-2.2,-6-Math.random()*4),new f(H*(.6+Math.random()*1.2),-1.4,-22),new f(H*(.4+Math.random()*2.4),-1.2+ve,-24-Math.random()*2));for(let T=0;T<=W;T++)ue.getPoint(T/W,m),e.push(m.x,m.y,m.z),t.push(T/W),i.push(ce),T&&o.push(n+T-1,n+T);n+=W+1}const c=s(new q);c.setAttribute("position",new L(e,3)),c.setAttribute("aT",new L(t,1)),c.setAttribute("aSeed",new L(i,1)),c.setIndex(o);const v=s(new C({transparent:!0,depthWrite:!1,blending:b,uniforms:{uTime:{value:0},uAlpha:{value:0},uRed:{value:0}},vertexShader:`attribute float aT; attribute float aSeed; varying float vT; varying float vS; varying float vZ;
        void main(){ vT = aT; vS = aSeed; vec4 mv = modelViewMatrix * vec4(position,1.); vZ = -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform float uTime, uAlpha, uRed; varying float vT; varying float vS; varying float vZ;
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
        }`}));w.add(new te(c,v)),w.userData.mat=v;const u=s(new C({transparent:!0,depthWrite:!1,blending:b,uniforms:{uAlpha:{value:0},uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform float uAlpha, uTime; varying vec2 vUv;
        void main(){ vec2 c = vUv - vec2(.5,.42); c.x *= .45;
          float g = exp(-dot(c,c)*28.) * (0.85 + .15*sin(uTime*2.));
          float band = exp(-pow((vUv.y-.42)*18., 2.)) * .5;
          gl_FragColor = vec4(vec3(.3,.8,1.)*(g+band), (g+band)*uAlpha); }`})),z=new R(s(new j(60,30)),u);z.position.set(0,-.5,-25),w.add(z),w.userData.glow=u}const k=s(new C({transparent:!0,depthWrite:!1,blending:b,uniforms:{uTime:{value:0},uAlpha:{value:0},uWave:{value:0},uPx:{value:r.getPixelRatio()}},vertexShader:`uniform float uTime, uWave, uPx; varying float vH; varying float vD;
      void main(){
        vec3 p = position;
        float d = length(p.xz - vec2(4., -6.));
        float w = sin(d*.55 - uTime*1.4) * .5 + sin(p.x*.32 + uTime*.8) * .35 + cos(p.z*.4 - uTime*.6) * .3;
        p.y += w * uWave;
        vH = w; vD = d;
        vec4 mv = modelViewMatrix * vec4(p, 1.);
        gl_PointSize = (1.4 + max(w,0.)*uWave*1.2) * uPx * (16. / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`uniform float uAlpha, uWave; varying float vH; varying float vD;
      void main(){ vec2 c = gl_PointCoord - .5; if(length(c) > .5) discard;
        vec3 col = mix(vec3(.16,.55,.85), vec3(.75,.95,1.), smoothstep(.2, 1., vH) * uWave);
        col = mix(col, vec3(1.,.25,.35), smoothstep(.85, 1.1, vH) * uWave * .6);
        float a = (.35 + max(vH,0.) * .6 * uWave) * uAlpha * (1. - smoothstep(18., 42., vD));
        gl_FragColor = vec4(col, a); }`}));{const e=p?90:150,t=p?60:90,i=.55,o=new Float32Array(e*t*3);let n=0;for(let v=0;v<t;v++)for(let u=0;u<e;u++)o[n++]=(u-e/2)*i+v%2*i*.5,o[n++]=0,o[n++]=(v-t*.7)*i;const m=s(new q);m.setAttribute("position",new I(o,3));const c=new ae(m,k);c.position.set(2,-.05,0),h.add(c)}const P=new V;h.add(P);const K=s(new oe({color:6285055,transparent:!0,opacity:0,blending:b,depthWrite:!1})),J=s(new ne({color:674414,transparent:!0,opacity:0,blending:b,depthWrite:!1,side:ie})),Q=s(new oe({color:16726869,transparent:!0,opacity:0,blending:b,depthWrite:!1})),a=3.2;function X(e,t,i,o,{rx:n=0,ry:m=0,rz:c=0,accent:v=!1}={}){s(e);const u=new R(e,J),z=new te(s(new ye(e,18)),v?Q:K),M=new V;return M.add(u,z),M.position.set(t,i,o),M.rotation.set(n,m,c),P.add(M),M}const l=(e,t,i,o,n,m,c)=>X(new ge(e,t,i),o,n,m,c),x=(e,t,i,o=a,n={})=>X(new we(e,e,o,28,1,!0),t,i,0,{rx:Math.PI/2,...n});[-17,-14.2].forEach(e=>{l(.25,2.6,.25,e-.8,1.3,-a/2-.2),l(.25,2.6,.25,e+.8,1.3,-a/2-.2),l(.25,2.6,.25,e-.8,1.3,a/2+.2),l(.25,2.6,.25,e+.8,1.3,a/2+.2),x(1,e,1.6,a-.2,{accent:e===-17}),x(.18,e,1.6,a+.8)}),l(1.4,2.4,a,-10.8,1.2,0),x(.55,-10.8,2.6,a+.2),l(2.4,2.2,a+.4,-7.2,1.1,0),x(.42,-7.6,2.55,a+.6,{accent:!0}),x(.42,-6.8,2.55,a+.6),l(9,.12,a-.4,-1.8,3.6,0),[-5.5,-1.8,1.9].forEach(e=>l(.15,3.6,.15,e,1.8,a/2-.4)),l(1.6,2,a,3.6,1,0),x(.32,3.6,2.2,a+.4),l(9,.9,a,9.8,.45,0);for(let e=0;e<14;e++)l(.5,.08,a-.2,5.8+e*.6,1,0);l(9,.1,a-.6,9.8,1.6,0,{accent:!0}),l(1.3,2,a+.4,15.6,1,0),x(.25,15.6,1.4,a+.6),x(.25,15.6,.9,a+.6),l(1.6,2.2,a+.4,18.4,1.1,0),x(.5,18.4,1.6,a+.6,{accent:!0}),l(2.6,1.2,a,21.4,.6,0);for(let e=0;e<5;e++)l(2.2,.12,a-.6,21.4,1.35+e*.16,0);const F=s(new C({transparent:!0,depthWrite:!1,blending:b,uniforms:{uTime:{value:0},uAlpha:{value:0},uPx:{value:r.getPixelRatio()}},vertexShader:`uniform float uTime, uPx; attribute float aU; varying float vU;
      void main(){ vec3 p = position; float u = fract(aU + uTime*.035);
        // path: up over the bridge then down along the double facer
        float x = mix(-17., 22., u);
        float y = 1.6 + smoothstep(-9.,-6.,x)*2.1 - smoothstep(2.,4.,x)*2.65 + sin(x*7.)*.04;
        p.x = x; p.y = y; vU = u;
        vec4 mv = modelViewMatrix * vec4(p,1.); gl_PointSize = 2.2 * uPx * (14. / -mv.z); gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform float uAlpha; varying float vU; void main(){ vec2 c = gl_PointCoord-.5; if(length(c)>.5) discard;
      gl_FragColor = vec4(mix(vec3(.4,.9,1.), vec3(1.,.4,.5), vU), .8*uAlpha); }`}));{const e=p?1200:2600,t=new Float32Array(e*3),i=new Float32Array(e);for(let n=0;n<e;n++)i[n]=Math.random(),t[n*3+2]=(Math.random()-.5)*(a-.6);const o=s(new q);o.setAttribute("position",new I(t,3)),o.setAttribute("aU",new I(i,1)),P.add(new ae(o,F))}const Y=s(new ne({color:4055295,transparent:!0,opacity:0,blending:b,depthWrite:!1,side:ie})),D=new R(s(new j(a+2,5)),Y);D.rotation.y=Math.PI/2,D.position.y=2.5,P.add(D);const re=new he([new f(-32,12,24),new f(-16,7,14),new f(-4,5.5,12),new f(7,6,12.5),new f(17,5,11),new f(27,9,15)],!1,"catmullrom",.5),U=new f,_=new f,y={p:0,mx:0,my:0,visible:!0},G={stage:0,holoT:0};function $(){const e=d.clientWidth,t=d.clientHeight;r.setSize(e,t,!1),g.aspect=e/t,g.fov=e<t?60:45,g.updateProjectionMatrix(),A.uniforms.uAspect.value=e/t}function le(){const e=se.getElapsedTime(),t=y.p,i=E(.17,.27,.47,.53,t),o=E(.5,.57,.78,.83,t),n=S(.8,.88,t),m=Math.max(1-S(.12,.26,t),E(.44,.515,.515,.6,t),E(.75,.815,.815,.88,t)*.95);A.uniforms.uTime.value=e,A.uniforms.uCover.value=m,A.uniforms.uDark.value=S(.3,.55,t)*.85,A.uniforms.uScroll.value=t,w.visible=i>.001,w.userData.mat.uniforms.uTime.value=e,w.userData.mat.uniforms.uAlpha.value=i,w.userData.mat.uniforms.uRed.value=S(.35,.47,t),w.userData.glow.uniforms.uAlpha.value=i,w.userData.glow.uniforms.uTime.value=e,P.visible=o>.001;const c=.92+Math.sin(e*40)*.03+(Math.random()<.02?-.3:0);K.opacity=.85*o*c,Q.opacity=.9*o,J.opacity=.16*o,F.uniforms.uAlpha.value=o,F.uniforms.uTime.value=e;const v=S(.52,.8,t);if(D.position.x=O(-19,24,e*.12%1),Y.opacity=.06*o,k.uniforms.uTime.value=e,k.uniforms.uAlpha.value=Math.max(o*.7,n,i*0),k.uniforms.uWave.value=O(.04,1.6,n),t<.515){const u=S(.17,.5,t);g.position.set(y.mx*1.5,.2+u*.8-y.my*.6,9-u*4),U.set(y.mx*2,.6,-20)}else if(t<.815)re.getPoint(v,_),g.position.set(_.x+y.mx*1.2,_.y-y.my*.8,_.z),U.set(O(-15,22,v)-5.5,2.6,0);else{const u=S(.8,1,t);g.position.set(4+y.mx*2,3.2+u*1.5-y.my,12-u*2),U.set(4,0,-8)}g.lookAt(U),G.holoT=v,G.stage=Math.min(6,Math.floor(v*7)),r.render(h,g)}return $(),{renderer:r,resize:$,frame:le,state:y,out:G,dispose(){Z.forEach(e=>e.dispose&&e.dispose()),r.dispose(),r.domElement.remove()}}}export{be as createStory,O as lerp};
