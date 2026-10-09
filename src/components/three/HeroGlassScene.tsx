"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createHeartGeometry } from "./HeartGeometry";
import FloatingPetals from "./FloatingPetals";
import GoldenDust from "./GoldenDust";

function FloatingCrystalHeart() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => createHeartGeometry(0.38, 0.22, 0.16), []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle float & smooth mouse responsive tilt
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.18;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.45 + Math.sin(t * 0.5) * 0.35,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.3 + Math.cos(t * 0.7) * 0.12,
        0.05
      );
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.3;
      outerRingRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Glass Crystal Heart */}
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#B83B68"
          emissive="#791F42"
          emissiveIntensity={0.4}
          roughness={0.08}
          metalness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.82}
          ior={1.52}
          thickness={1.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Orbiting Golden Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.6, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#D9B779"
          metalness={0.9}
          roughness={0.2}
          emissive="#D9B779"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Internal warm glow */}
      <pointLight color="#FFF7EF" intensity={2.2} distance={4} />
      <pointLight color="#F5C8D5" intensity={1.8} distance={5} />
    </group>
  );
}

export default function HeroGlassScene() {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 5]} intensity={1.8} color="#FFF7EF" />
        <directionalLight position={[-5, -4, 3]} intensity={1.2} color="#D9B779" />
        <pointLight position={[0, -2, 2]} color="#791F42" intensity={2.5} />

        <FloatingCrystalHeart />
        <FloatingPetals count={40} area={[9, 8, 6]} color="#791F42" speed={0.8} />
        <GoldenDust count={100} size={0.04} color="#D9B779" range={[10, 9, 8]} />
      </Canvas>
    </div>
  );
}
