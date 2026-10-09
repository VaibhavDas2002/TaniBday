"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingPetalsProps {
  count?: number;
  area?: [number, number, number];
  color?: string;
  speed?: number;
}

export default function FloatingPetals({
  count = 45,
  area = [12, 10, 8],
  color = "#B83B68",
  speed = 1.0,
}: FloatingPetalsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Curved petal geometry
  const petalGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.35, 0.45, 4, 4);
    const pos = geom.attributes.position;
    // Curve the plane into a natural petal cup
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = -0.08 * (1 - (x * x + y * y));
      pos.setZ(i, z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Initial random properties for each petal
  const particles = useMemo(() => {
    const temp = [];
    const [w, h, d] = area;
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * w,
        y: (Math.random() - 0.5) * h,
        z: (Math.random() - 0.5) * d,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.005,
        speedY: (0.006 + Math.random() * 0.008) * speed,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        scale: 0.6 + Math.random() * 0.7,
        swaySpeed: 0.5 + Math.random() * 1.5,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count, area, speed]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const [, h] = area;

    particles.forEach((p, i) => {
      p.y -= p.speedY;
      // Wrap around top if fallen through bottom
      if (p.y < -h / 2) {
        p.y = h / 2;
        p.x = (Math.random() - 0.5) * area[0];
      }

      p.rotX += p.rotSpeedX;
      p.rotY += p.rotSpeedY;

      // Natural horizontal flutter
      const sway = Math.sin(time * p.swaySpeed + p.swayOffset) * 0.008;
      p.x += sway + p.speedX;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, undefined, count]}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color={color}
        roughness={0.4}
        metalness={0.05}
        clearcoat={0.3}
        side={THREE.DoubleSide}
        transparent
        opacity={0.88}
      />
    </instancedMesh>
  );
}
