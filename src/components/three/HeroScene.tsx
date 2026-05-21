'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

/**
 * Single cinematic glass form. No particles. No chromatic spam.
 * Calibrated for low GPU load while still feeling sculpted and emotional.
 */
function GlassForm({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetX = pointer.current.x * 0.25;
    const targetY = pointer.current.y * 0.18;
    group.current.rotation.y += (targetX - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (-targetY - group.current.rotation.x) * 0.03;
    group.current.rotation.z += delta * 0.025;
  });

  return (
    <group ref={group}>
      <mesh scale={2.4}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshTransmissionMaterial
          samples={3}
          thickness={1.1}
          chromaticAberration={0.012}
          anisotropy={0.3}
          distortion={0.18}
          distortionScale={0.3}
          temporalDistortion={0}
          roughness={0.14}
          transmission={1}
          ior={1.34}
          backside
          color="#f6f1e8"
          attenuationColor="#1f8454"
          attenuationDistance={2.6}
        />
      </mesh>
    </group>
  );
}

function PointerCapture({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  useFrame((state) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.05;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.05;
    state.camera.position.x += (state.pointer.x * 0.35 - state.camera.position.x) * 0.03;
    state.camera.position.y += (-state.pointer.y * 0.22 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 7], fov: 36 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{ background: 'transparent' }}
    >
      <fog attach="fog" args={['#070b09', 5.5, 14]} />
      <ambientLight intensity={0.35} />
      {/* Emerald rim, top-left */}
      <directionalLight position={[-4, 4, 3]} intensity={1.1} color="#6fc18a" />
      {/* Warm cream key, right */}
      <directionalLight position={[5, 1, 2]} intensity={0.9} color="#f6f1e8" />
      {/* Deep cool fill, bottom */}
      <pointLight position={[0, -3, 2]} intensity={0.4} color="#94a59c" />
      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <GlassForm pointer={pointer} />
        <PointerCapture pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
