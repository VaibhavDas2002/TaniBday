"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import FloatingPetals from "./FloatingPetals";
import GoldenDust from "./GoldenDust";

interface CakeModelProps {
  isCandleLit: boolean;
  onBlowOut: () => void;
}

function CakeModel({ isCandleLit, onBlowOut }: CakeModelProps) {
  const cakeGroupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const flameLightRef = useRef<THREE.PointLight>(null);

  // Decorative pearls around tiers
  const bottomPearls = useMemo(() => {
    const list = [];
    const count = 28;
    const radius = 1.62;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      list.push([Math.cos(angle) * radius, -0.42, Math.sin(angle) * radius]);
    }
    return list;
  }, []);

  const topPearls = useMemo(() => {
    const count = 22;
    const radius = 1.12;
    const list = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      list.push([Math.cos(angle) * radius, 0.42, Math.sin(angle) * radius]);
    }
    return list;
  }, []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (cakeGroupRef.current) {
      // Slow ambient spin + subtle mouse tilt
      cakeGroupRef.current.rotation.y = t * 0.15 + pointer.x * 0.2;
      cakeGroupRef.current.rotation.x = 0.15 - pointer.y * 0.1;
    }

    if (flameRef.current && isCandleLit) {
      // Natural organic flicker
      const flicker = 1 + Math.sin(t * 18) * 0.08 + Math.cos(t * 26) * 0.06;
      flameRef.current.scale.set(flicker, 1 + Math.sin(t * 22) * 0.12, flicker);
      flameRef.current.rotation.z = Math.sin(t * 15) * 0.06;

      if (flameLightRef.current) {
        flameLightRef.current.intensity = 2.4 + Math.sin(t * 20) * 0.6;
      }
    }
  });

  return (
    <group ref={cakeGroupRef} position={[0, -0.5, 0]}>
      {/* 1. Golden Pedestal Cake Stand */}
      <mesh position={[0, -0.95, 0]} receiveShadow>
        <cylinderGeometry args={[2.0, 1.2, 0.2, 48]} />
        <meshStandardMaterial
          color="#D9B779"
          metalness={0.85}
          roughness={0.2}
          emissive="#791F42"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* 2. Bottom Tier: Deep Rose Velvet Cake */}
      <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.85, 48]} />
        <meshPhysicalMaterial
          color="#6E1537"
          roughness={0.5}
          metalness={0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Bottom Tier Gold Frosting Pearls */}
      {bottomPearls.map((pos, idx) => (
        <mesh key={`bp-${idx}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#D9B779" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* 3. Top Tier: Warm Ivory Vanilla Cream Cake */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.75, 48]} />
        <meshPhysicalMaterial
          color="#FFF7EF"
          roughness={0.4}
          metalness={0.02}
          clearcoat={0.4}
        />
      </mesh>

      {/* Top Tier Gold Frosting Pearls */}
      {topPearls.map((pos, idx) => (
        <mesh key={`tp-${idx}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#D9B779" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* 4. Elegant Birthday Candle */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 0.45, 24]} />
        <meshStandardMaterial color="#FFF7EF" roughness={0.2} />
      </mesh>

      {/* Candle Wick */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.07, 12]} />
        <meshBasicMaterial color="#151014" />
      </mesh>

      {/* 5. Glowing Candle Flame */}
      {isCandleLit && (
        <group
          position={[0, 1.32, 0]}
          onClick={onBlowOut}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          {/* Flame teardrop */}
          <mesh ref={flameRef}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#FFB24A" />
          </mesh>

          {/* Outer yellow/red glow halo */}
          <pointLight
            ref={flameLightRef}
            color="#FF9D3B"
            intensity={2.8}
            distance={5}
            decay={2}
          />
        </group>
      )}

      {/* Extinguished Smoke Whisper */}
      {!isCandleLit && (
        <group position={[0, 1.35, 0]}>
          <mesh>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#FFF7EF" transparent opacity={0.3} />
          </mesh>
        </group>
      )}

      {/* Pool of soft warm cake lighting */}
      <pointLight position={[0, 1.8, 1]} color="#FFF7EF" intensity={1.5} distance={6} />
    </group>
  );
}

interface BirthdayCakeCanvasProps {
  isCandleLit: boolean;
  onBlowOut: () => void;
}

export default function BirthdayCakeCanvas({
  isCandleLit,
  onBlowOut,
}: BirthdayCakeCanvasProps) {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 1.2, 4.4], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} color="#FFF7EF" />
        <directionalLight position={[-4, 3, -3]} intensity={0.8} color="#D9B779" />

        <CakeModel isCandleLit={isCandleLit} onBlowOut={onBlowOut} />
        <FloatingPetals count={30} area={[7, 6, 5]} color="#B83B68" speed={0.6} />
        <GoldenDust count={80} size={0.035} color="#D9B779" range={[8, 7, 6]} />
      </Canvas>
    </div>
  );
}
