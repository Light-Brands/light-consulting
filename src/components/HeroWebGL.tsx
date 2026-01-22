/**
 * Hero WebGL Animation
 * Flowing Liquid Gold - Organic morphing metallic blob
 * Premium, mesmerizing, light-mode optimized
 */

'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface HeroWebGLProps {
  className?: string;
}

// Simplex noise implementation for organic movement
const SimplexNoise = () => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const grad3 = [
    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
  ];

  const dot3 = (g: number[], x: number, y: number, z: number) => g[0]*x + g[1]*y + g[2]*z;

  const F3 = 1/3, G3 = 1/6;

  return (x: number, y: number, z: number): number => {
    const s = (x + y + z) * F3;
    const i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s);
    const t = (i + j + k) * G3;
    const X0 = i - t, Y0 = j - t, Z0 = k - t;
    const x0 = x - X0, y0 = y - Y0, z0 = z - Z0;

    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if (y0 < z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if (x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }

    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2*G3, y2 = y0 - j2 + 2*G3, z2 = z0 - k2 + 2*G3;
    const x3 = x0 - 1 + 3*G3, y3 = y0 - 1 + 3*G3, z3 = z0 - 1 + 3*G3;

    const ii = i & 255, jj = j & 255, kk = k & 255;

    let n = 0;
    let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    if (t0 > 0) { t0 *= t0; n += t0 * t0 * dot3(grad3[perm[ii + perm[jj + perm[kk]]] % 12], x0, y0, z0); }
    let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    if (t1 > 0) { t1 *= t1; n += t1 * t1 * dot3(grad3[perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]] % 12], x1, y1, z1); }
    let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    if (t2 > 0) { t2 *= t2; n += t2 * t2 * dot3(grad3[perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]] % 12], x2, y2, z2); }
    let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    if (t3 > 0) { t3 *= t3; n += t3 * t3 * dot3(grad3[perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]] % 12], x3, y3, z3); }

    return 32 * n;
  };
};

// Vertex shader for liquid deformation
const vertexShader = `
  uniform float uTime;
  uniform float uNoiseScale;
  uniform float uNoiseStrength;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  // Simplex 3D noise
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normal;
    vPosition = position;

    // Multi-layered noise for organic movement
    float slowTime = uTime * 0.3;
    float noise1 = snoise(position * uNoiseScale + slowTime);
    float noise2 = snoise(position * uNoiseScale * 2.0 + slowTime * 1.3) * 0.5;
    float noise3 = snoise(position * uNoiseScale * 4.0 + slowTime * 0.7) * 0.25;

    float displacement = (noise1 + noise2 + noise3) * uNoiseStrength;
    vDisplacement = displacement;

    vec3 newPosition = position + normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment shader for liquid gold material
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    // Fresnel effect for metallic rim lighting
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);

    // Dynamic color based on displacement and fresnel
    float colorMix = vDisplacement * 2.0 + 0.5;
    colorMix = clamp(colorMix, 0.0, 1.0);

    vec3 baseColor = mix(uColor1, uColor2, colorMix);
    vec3 highlightColor = uColor3;

    // Metallic shading
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float diffuse = max(dot(vNormal, lightDir), 0.0);
    float specular = pow(max(dot(reflect(-lightDir, vNormal), viewDirection), 0.0), 32.0);

    vec3 color = baseColor * (0.4 + diffuse * 0.6);
    color += highlightColor * specular * 0.8;
    color += highlightColor * fresnel * 0.6;

    // Subtle iridescence
    float iridescence = sin(vDisplacement * 10.0 + uTime) * 0.1 + 0.9;
    color *= iridescence;

    gl_FragColor = vec4(color, 0.95);
  }
`;

export const HeroWebGL: React.FC<HeroWebGLProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Liquid gold colors
    const goldDark = new THREE.Color(0xB8860B);   // Dark gold
    const goldMain = new THREE.Color(0xC9940A);   // Main gold
    const goldLight = new THREE.Color(0xE8C547);  // Light gold/highlight

    // Shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uNoiseScale: { value: 1.2 },
        uNoiseStrength: { value: 0.4 },
        uColor1: { value: goldDark },
        uColor2: { value: goldMain },
        uColor3: { value: goldLight },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Main blob - high poly sphere for smooth deformation
    const geometry = new THREE.IcosahedronGeometry(1.8, 64);
    const blob = new THREE.Mesh(geometry, material);
    blob.position.x = 1.5; // Offset to the right
    scene.add(blob);

    // Secondary smaller blob
    const material2 = material.clone();
    material2.uniforms.uNoiseScale = { value: 1.8 };
    material2.uniforms.uNoiseStrength = { value: 0.35 };

    const geometry2 = new THREE.IcosahedronGeometry(0.9, 48);
    const blob2 = new THREE.Mesh(geometry2, material2);
    blob2.position.set(3.2, -1.2, -1);
    scene.add(blob2);

    // Third accent blob
    const material3 = material.clone();
    material3.uniforms.uNoiseScale = { value: 2.2 };
    material3.uniforms.uNoiseStrength = { value: 0.3 };

    const geometry3 = new THREE.IcosahedronGeometry(0.5, 32);
    const blob3 = new THREE.Mesh(geometry3, material3);
    blob3.position.set(0.5, 1.8, -0.5);
    scene.add(blob3);

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;

      // Update shader uniforms
      material.uniforms.uTime.value = time;
      material2.uniforms.uTime.value = time * 1.1;
      material3.uniforms.uTime.value = time * 0.9;

      // Gentle rotation and floating
      blob.rotation.x = Math.sin(time * 0.2) * 0.1;
      blob.rotation.y = time * 0.1;
      blob.position.y = Math.sin(time * 0.3) * 0.2;

      blob2.rotation.x = time * 0.15;
      blob2.rotation.y = Math.cos(time * 0.25) * 0.2;
      blob2.position.y = -1.2 + Math.sin(time * 0.4 + 1) * 0.15;

      blob3.rotation.y = time * 0.2;
      blob3.position.y = 1.8 + Math.cos(time * 0.35) * 0.1;
      blob3.position.x = 0.5 + Math.sin(time * 0.25) * 0.1;

      // Subtle camera breathing
      camera.position.x = Math.sin(time * 0.1) * 0.3;
      camera.position.y = Math.cos(time * 0.08) * 0.2;
      camera.lookAt(1, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      geometry.dispose();
      geometry2.dispose();
      geometry3.dispose();
      material.dispose();
      material2.dispose();
      material3.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default HeroWebGL;
