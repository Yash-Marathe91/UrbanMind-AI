"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/store/useAppStore';

function GlobeMesh() {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Rotate globe continuously
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
      globeRef.current.rotation.x += 0.0005;
    }
  });

  // Generate random data points on a sphere to simulate "cities/nodes"
  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 200; i++) {
      const phi = Math.acos(-1 + (2 * i) / 200);
      const theta = Math.sqrt(200 * Math.PI) * phi;
      const x = 2 * Math.cos(theta) * Math.sin(phi);
      const y = 2 * Math.sin(theta) * Math.sin(phi);
      const z = 2 * Math.cos(phi);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  return (
    <group ref={globeRef}>
      {/* Core Sphere */}
      <Sphere args={[1.95, 64, 64]}>
        <meshBasicMaterial color="#000000" transparent opacity={0.8} />
      </Sphere>
      
      {/* Wireframe outer sphere */}
      <Sphere args={[2, 32, 32]}>
        <meshBasicMaterial color="#00C2FF" wireframe transparent opacity={0.15} />
      </Sphere>

      {/* City Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={i % 5 === 0 ? "#FF5C75" : "#3EE6B0"} />
        </mesh>
      ))}

      {/* Connecting Lines (Data flow) */}
      <Line
        points={nodes}
        color="#00C2FF"
        lineWidth={0.5}
        transparent
        opacity={0.1}
      />
    </group>
  );
}

export function SwarmGlobe() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
