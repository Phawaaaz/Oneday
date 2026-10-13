import { useEffect, useRef, useState } from 'react';

/*
  A photo drawn with WebGL. When it scrolls into view it "develops" like a print:
  washed-out sepia to full colour, settling from a slight zoom. On hover a soft
  ripple spreads from the cursor. Falls back to a plain <img> without WebGL, and
  shows the finished photo straight away when reduced motion is on.
*/

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uMouse;
uniform float uTime;
uniform float uDevelop;
uniform float uHover;

// object-fit: cover
vec2 cover(vec2 uv) {
  float rs = uRes.x / uRes.y;
  float ri = uImg.x / uImg.y;
  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  return (uv - 0.5) * s + 0.5;
}

void main() {
  vec2 uv = vUv;
  float dev = smoothstep(0.0, 1.0, uDevelop);

  // Settle from a slight zoom while developing, lean in a touch on hover
  float zoom = mix(1.08, 1.0, dev) - 0.03 * uHover;
  uv = (uv - 0.5) / zoom + 0.5;

  // Ripple around the cursor
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 d = (uv - uMouse) * aspect;
  float dist = length(d);
  float wave = sin(dist * 38.0 - uTime * 5.0) * exp(-dist * 5.0) * 0.010 * uHover;
  uv += (dist > 0.0 ? d / dist : vec2(0.0)) * wave / aspect;

  vec3 col = texture2D(uTex, cover(uv)).rgb;

  // Developing print: faded sepia with lifted blacks, to full colour
  float g = dot(col, vec3(0.299, 0.587, 0.114));
  vec3 print = vec3(g) * vec3(1.07, 0.97, 0.84) * 0.55 + 0.38;
  col = mix(print, col, dev);

  // Vignette that clears as the print develops
  float v = smoothstep(0.95, 0.35, length(vUv - 0.5));
  col *= mix(0.82 + 0.18 * v, 1.0, dev);

  gl_FragColor = vec4(col, 1.0);
}`;

type Props = { src: string; alt: string; className?: string };

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  return sh;
}

export function MemoryImage({ src, alt, className = 'gl' }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) {
      setFallback(true);
      return;
    }

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u('uRes'), uImg = u('uImg'), uMouse = u('uMouse'), uTime = u('uTime'), uDevelop = u('uDevelop'), uHover = u('uHover');

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Animation state: current values ease toward their targets
    const s = {
      ready: false,
      develop: reduce ? 1 : 0,
      developTarget: reduce ? 1 : 0,
      hover: 0,
      hoverTarget: 0,
      mouse: [0.5, 0.5],
      mouseTarget: [0.5, 0.5],
      start: performance.now(),
    };
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(el.clientWidth * dpr));
      const h = Math.max(1, Math.round(el.clientHeight * dpr));
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    const draw = () => {
      raf = 0;
      if (!s.ready) return;
      resize();
      s.develop += (s.developTarget - s.develop) * 0.035;
      s.hover += (s.hoverTarget - s.hover) * 0.08;
      s.mouse[0] += (s.mouseTarget[0] - s.mouse[0]) * 0.12;
      s.mouse[1] += (s.mouseTarget[1] - s.mouse[1]) * 0.12;
      gl.uniform1f(uDevelop, s.develop);
      gl.uniform1f(uHover, s.hover);
      gl.uniform2f(uMouse, s.mouse[0], s.mouse[1]);
      gl.uniform1f(uTime, (performance.now() - s.start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      // Keep animating only while something is still moving
      const busy = Math.abs(s.developTarget - s.develop) > 0.002 || s.hover > 0.002 || s.hoverTarget > 0;
      if (busy) raf = requestAnimationFrame(draw);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const image = new Image();
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform2f(uImg, image.naturalWidth, image.naturalHeight);
      s.ready = true;
      kick();
    };
    image.onerror = () => setFallback(true);
    image.src = src;

    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          s.developTarget = 1;
          kick();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      s.mouseTarget = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
      kick();
    };
    const onEnter = (e: PointerEvent) => {
      if (reduce || e.pointerType !== 'mouse') return;
      onMove(e);
      s.mouse = [...s.mouseTarget];
      s.hoverTarget = 1;
      kick();
    };
    const onLeave = () => {
      s.hoverTarget = 0;
      kick();
    };
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    const ro = new ResizeObserver(kick);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [src]);

  if (fallback) return <img className={className} src={src} alt={alt} />;
  return <canvas ref={canvas} className={className} role="img" aria-label={alt} />;
}
