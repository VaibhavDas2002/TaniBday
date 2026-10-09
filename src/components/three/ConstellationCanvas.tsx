"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ConstellationPoint } from "@/config/birthday";
import GoldenDust from "./GoldenDust";

interface StarNodeProps {
  point: ConstellationPoint;
  isActive: boolean;
  onSelect: (point: ConstellationPoint) => void;
}

function StarNode({ point, isActive, onSelect }: StarNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + point.position[0];

    // Pulsing brightness
    const pulse = Math.sin(t * 3) * 0.15;
    const currentScale = (isActive ? 1.4 : 1.0) + pulse;
    meshRef.current.scale.set(currentScale, currentScale, currentScale);

    if (glowLightRef.current) {
      glowLightRef.current.intensity = isActive ? 3.5 : 1.2 + pulse * 2;
    }
  });

  return (
    <group position={point.position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(point);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial
          color={isActive ? "#FFF7EF" : point.color || "#D9B779"}
          emissive={isActive ? "#D9B779" : "#791F42"}
          emissiveIntensity={isActive ? 2.5 : 1.2}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Point glow light */}
      <pointLight
        ref={glowLightRef}
        color={isActive ? "#FFF7EF" : "#D9B779"}
        distance={2.5}
        decay={2}
      />
    </group>
  );
}

interface ConstellationLinesProps {
  points: ConstellationPoint[];
  activeId: string | null;
}

function ConstellationLines({ points, activeId }: ConstellationLinesProps) {
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    // Connect each star to adjacent stars to create constellation patterns
    for (let i = 0; i < points.length; i++) {
      const nextIdx = (i + 1) % points.length;
      positions.push(...points[i].position);
      positions.push(...points[nextIdx].position);

      // Add cross branch
      if (i % 2 === 0) {
        const crossIdx = (i + 3) % points.length;
        positions.push(...points[i].position);
        positions.push(...points[crossIdx].position);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geom;
  }, [points]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial
        color={activeId ? "#D9B779" : "#791F42"}
        transparent
        opacity={activeId ? 0.65 : 0.4}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

interface SceneGroupProps {
  points: ConstellationPoint[];
  activePoint: ConstellationPoint | null;
  onSelect: (point: ConstellationPoint) => void;
}

function SceneGroup({ points, activePoint, onSelect }: SceneGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Slow ambient rotation + pointer tracking
    groupRef.current.rotation.y = t * 0.08 + pointer.x * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.15 - pointer.y * 0.2;
  });

  return (
    <group ref={groupRef}>
      <ConstellationLines points={points} activeId={activePoint?.id || null} />

      {points.map((p) => (
        <StarNode
          key={p.id}
          point={p}
          isActive={activePoint?.id === p.id}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

interface ConstellationCanvasProps {
  points: ConstellationPoint[];
  activePoint: ConstellationPoint | null;
  onSelectStar: (point: ConstellationPoint) => void;
}

export default function ConstellationCanvas({
  points,
  activePoint,
  onSelectStar,
}: ConstellationCanvasProps) {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#FFF7EF" />
        <pointLight position={[-5, -5, -3]} intensity={0.8} color="#791F42" />

        <SceneGroup
          points={points}
          activePoint={activePoint}
          onSelect={onSelectStar}
        />
        <GoldenDust count={120} size={0.035} color="#D9B779" range={[10, 8, 8]} />
      </Canvas>
    </div>
  );
}
