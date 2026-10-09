"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GoldenDustProps {
  count?: number;
  size?: number;
  color?: string;
  range?: [number, number, number];
}

export default function GoldenDust({
  count = 120,
  size = 0.05,
  color = "#D9B779",
  range = [14, 12, 10],
}: GoldenDustProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, randomSpeeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const [rx, ry, rz] = range;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * rx;
      pos[i * 3 + 1] = (Math.random() - 0.5) * ry;
      pos[i * 3 + 2] = (Math.random() - 0.5) * rz;
      speeds[i] = 0.2 + Math.random() * 0.8;
    }

    return { positions: pos, randomSpeeds: speeds };
  }, [count, range]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position;
    const array = pos.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle floating upwards and twinkling
      const speed = randomSpeeds[i];
      array[i * 3 + 1] += 0.003 * speed;

      // Wrap around
      if (array[i * 3 + 1] > range[1] / 2) {
        array[i * 3 + 1] = -range[1] / 2;
      }

      // Gentle lateral drift
      array[i * 3] += Math.sin(time * speed + i) * 0.0015;
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
