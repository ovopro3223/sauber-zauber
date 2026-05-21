'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function FloatingBubbles({ count = 90 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) s[i] = 0.2 + Math.random() * 0.5;
    return s;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const geom = points.current?.geometry as THREE.BufferGeometry | undefined;
    if (!geom) return;
    const attr = geom.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const baseX = positions[ix];
      const baseY = positions[ix + 1];
      const baseZ = positions[ix + 2];
      attr.array[ix] = baseX + Math.sin(t * speeds[i] + i) * 0.2;
      attr.array[ix + 1] = baseY + ((t * speeds[i] * 0.3) % 6) - 3;
      attr.array[ix + 2] = baseZ + Math.cos(t * speeds[i] * 0.5 + i) * 0.2;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#f6e3a1"
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function GlassOrb({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = pointer.current.x * 0.5;
    const targetY = pointer.current.y * 0.3;
    group.current.rotation.y += (targetX - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-targetY - group.current.rotation.x) * 0.04;
    group.current.rotation.z += delta * 0.06;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh scale={2.6}>
          <icosahedronGeometry args={[1, 6]} />
          <MeshTransmissionMaterial
            samples={6}
            thickness={1.4}
            chromaticAberration={0.06}
            anisotropy={0.6}
            distortion={0.4}
            distortionScale={0.4}
            temporalDistortion={0.2}
            roughness={0.08}
            transmission={1}
            ior={1.35}
            backside
            color="#ffffff"
          />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh position={[2.6, 1.4, -1]} scale={0.7}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshTransmissionMaterial
            thickness={0.8}
            roughness={0.1}
            transmission={1}
            ior={1.3}
            color="#f6e3a1"
          />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.7}>
        <mesh position={[-2.8, -1.6, -0.5]} scale={0.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshTransmissionMaterial
            thickness={0.6}
            roughness={0.05}
            transmission={1}
            ior={1.45}
            color="#cfe8ff"
          />
        </mesh>
      </Float>
    </group>
  );
}

function PointerCapture({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { gl } = useThree();
  useFrame((state) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.07;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.07;
    state.camera.position.x += (state.pointer.x * 0.6 - state.camera.position.x) * 0.04;
    state.camera.position.y += (-state.pointer.y * 0.4 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#06080d']} />
      <fog attach="fog" args={['#06080d', 6, 16]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#f6e3a1" />
      <directionalLight position={[-5, -3, 2]} intensity={1.2} color="#7dd6ff" />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <GlassOrb pointer={pointer} />
        <FloatingBubbles count={120} />
        <PointerCapture pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
