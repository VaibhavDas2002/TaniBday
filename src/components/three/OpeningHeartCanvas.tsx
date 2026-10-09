"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createHeartGeometry } from "./HeartGeometry";
import FloatingPetals from "./FloatingPetals";
import GoldenDust from "./GoldenDust";

interface HeartMeshProps {
  isDissolving: boolean;
  onClick: () => void;
}

function RotatingHeart({ isDissolving, onClick }: HeartMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  const geometry = useMemo(() => createHeartGeometry(0.35, 0.18, 0.14), []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    if (!isDissolving) {
      // Gentle floating, rotation, and slight pointer tracking
      meshRef.current.rotation.y = Math.sin(t * 0.8) * 0.4 + pointer.x * 0.3;
      meshRef.current.rotation.x = Math.cos(t * 0.6) * 0.15 - pointer.y * 0.2;
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.12;

      // Soft pulsating heartbeat scale
      const heartbeat = 1 + Math.sin(t * 2.5) * 0.04;
      meshRef.current.scale.set(heartbeat, heartbeat, heartbeat);

      if (glowRef.current) {
        glowRef.current.intensity = 2.5 + Math.sin(t * 3) * 0.8;
      }
    } else {
      // Dissolve animation: scale up fast, spin rapidly, fade
      meshRef.current.rotation.y += 0.08;
      meshRef.current.scale.multiplyScalar(1.025);
      const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat.opacity > 0.02) {
        mat.opacity -= 0.03;
      }
    }
  });

  return (
    <group onClick={onClick}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        castShadow
        receiveShadow
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <meshPhysicalMaterial
          color="#9E2A4B"
          emissive="#521028"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.6}
          ior={1.45}
          transparent
          opacity={0.95}
        />
      </mesh>

      <pointLight
        ref={glowRef}
        color="#F5C8D5"
        intensity={2.8}
        distance={6}
        decay={2}
      />
    </group>
  );
}

interface OpeningHeartCanvasProps {
  isDissolving: boolean;
  onHeartClick: () => void;
}

export default function OpeningHeartCanvas({
  isDissolving,
  onHeartClick,
}: OpeningHeartCanvasProps) {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#FFF7EF" />
        <directionalLight position={[-4, -3, 2]} intensity={0.9} color="#D9B779" />
        <pointLight position={[0, 0, 2]} color="#F5C8D5" intensity={1.8} />

        <RotatingHeart isDissolving={isDissolving} onClick={onHeartClick} />
        <FloatingPetals count={35} area={[7, 6, 5]} color="#C23B65" speed={0.9} />
        <GoldenDust count={90} size={0.045} color="#D9B779" range={[8, 7, 6]} />
      </Canvas>
    </div>
  );
}
