/**
 * Orb WebGL Animation
 * Glowing Orb with Sparkles - Ethereal particle-filled sphere
 * Warm, mesmerizing, light-mode optimized
 */

'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface OrbWebGLProps {
  className?: string;
}

// Vertex shader for glowing orb
const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  void main() {
    vNormal = normal;
    vPosition = position;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader for glowing translucent orb
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uGlowColor;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  // Simplex noise for internal texture
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
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
    
    // Internal particle effect using noise
    float noise1 = snoise(vPosition * 8.0 + uTime * 0.3);
    float noise2 = snoise(vPosition * 15.0 + uTime * 0.5) * 0.5;
    float noise3 = snoise(vPosition * 25.0 + uTime * 0.7) * 0.25;
    
    // Create sparkle pattern
    float sparkles = step(0.85, noise1 + noise2 + noise3);
    sparkles = max(sparkles, step(0.92, noise1) * 0.8);
    sparkles = max(sparkles, step(0.88, noise2) * 0.6);
    
    // Base color with depth
    float depth = length(vPosition) / 1.5;
    vec3 baseColor = mix(uColor1, uColor2, depth);
    
    // Add sparkles
    vec3 sparkleColor = mix(uColor2, uGlowColor, 0.7);
    baseColor = mix(baseColor, sparkleColor, sparkles * 0.9);
    
    // Glow effect on edges
    vec3 glow = uGlowColor * fresnel * 0.6;
    baseColor += glow;
    
    // Soft translucent appearance
    float alpha = 0.75 + fresnel * 0.2;
    
    gl_FragColor = vec4(baseColor, alpha);
  }
`;

const OrbWebGL: React.FC<OrbWebGLProps> = ({ className = '' }) => {
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

    // Camera - positioned to view right side
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(2, 0, 5);

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

    // Warm colors - peach, orange, gold
    const peachGlow = new THREE.Color(0xFFE5D4);  // Soft peach glow
    const orangeGold = new THREE.Color(0xFF8C42); // Orange-gold
    const deepOrange = new THREE.Color(0xFF6B35);  // Deep orange
    const goldSparkle = new THREE.Color(0xFFD700); // Gold sparkles

    // Main orb material
    const orbMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: deepOrange },
        uColor2: { value: orangeGold },
        uGlowColor: { value: peachGlow },
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });

    // Main orb - smaller size
    const orbGeometry = new THREE.SphereGeometry(0.8, 96, 96);
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(3.5, 0, 0);
    scene.add(orb);

    // Create particle system for external sparkles/halo
    const sparkleCount = 100;
    const sparkleGeometry = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleSizes = new Float32Array(sparkleCount);
    const sparkleColors = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      const i3 = i * 3;
      
      // Position sparkles around the orb in a halo
      const radius = 1.0 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.6; // Concentrate around equator
      
      sparklePositions[i3] = Math.cos(phi) * Math.cos(theta) * radius;
      sparklePositions[i3 + 1] = Math.sin(phi) * radius;
      sparklePositions[i3 + 2] = Math.cos(phi) * Math.sin(theta) * radius;
      
      sparkleSizes[i] = Math.random() * 0.08 + 0.03;
      
      // Golden-white sparkle colors
      sparkleColors[i3] = 1.0; // R
      sparkleColors[i3 + 1] = 0.9 + Math.random() * 0.1; // G
      sparkleColors[i3 + 2] = 0.7 + Math.random() * 0.2; // B
    }

    sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    sparkleGeometry.setAttribute('size', new THREE.BufferAttribute(sparkleSizes, 1));
    sparkleGeometry.setAttribute('color', new THREE.BufferAttribute(sparkleColors, 3));

    // Sparkle shader
    const sparkleVertexShader = `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        vColor = color;
        vSize = size;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = size * (300.0 / -mvPosition.z);
      }
    `;

    const sparkleFragmentShader = `
      uniform float uTime;
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        alpha *= 0.8 + sin(uTime * 2.0 + gl_PointCoord.x * 10.0) * 0.2;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const sparkleMaterial = new THREE.ShaderMaterial({
      vertexShader: sparkleVertexShader,
      fragmentShader: sparkleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    sparkles.position.copy(orb.position);
    scene.add(sparkles);

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;

      // Update shader uniforms
      orbMaterial.uniforms.uTime.value = time;
      sparkleMaterial.uniforms.uTime.value = time;

      // Gentle rotation
      orb.rotation.y = time * 0.15;
      orb.rotation.x = Math.sin(time * 0.1) * 0.1;
      
      // Subtle floating
      orb.position.y = Math.sin(time * 0.2) * 0.1;

      // Rotate sparkles around orb
      sparkles.rotation.y = time * 0.1;
      sparkles.rotation.x = Math.sin(time * 0.15) * 0.05;

      // Subtle camera movement - keep looking at right side
      camera.position.x = 2 + Math.sin(time * 0.05) * 0.2;
      camera.position.y = Math.cos(time * 0.04) * 0.15;
      camera.lookAt(orb.position);

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
      orbGeometry.dispose();
      sparkleGeometry.dispose();
      orbMaterial.dispose();
      sparkleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 bottom-0 right-0 w-1/2 ${className}`}
      style={{ 
        pointerEvents: 'none',
      }}
    />
  );
};

export default OrbWebGL;
