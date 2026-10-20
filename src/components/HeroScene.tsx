import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function Crystal({ position, scale = 1, color }: { position: [number, number, number]; scale?: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15 + position[0];
    ref.current.rotation.y = state.clock.elapsedTime * 0.22 + position[1];
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.2} transparent opacity={0.92} />
      </mesh>
    </Float>
  );
}

function SoftPlane() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.15;
  });
  return (
    <mesh ref={ref} position={[0, 0, -1.5]} rotation={[-0.35, 0.2, 0]}>
      <planeGeometry args={[6, 4]} />
      <meshStandardMaterial color="#163556" metalness={0.3} roughness={0.7} transparent opacity={0.45} />
    </mesh>
  );
}

function Scene() {
  const crystals = useMemo(
    () =>
      [
        { position: [-1.6, 0.4, 0] as [number, number, number], scale: 0.55, color: "#C4A574" },
        { position: [1.4, -0.2, 0.4] as [number, number, number], scale: 0.4, color: "#E8DFD0" },
        { position: [0.2, 0.9, -0.3] as [number, number, number], scale: 0.28, color: "#C4A574" },
        { position: [-0.5, -0.7, 0.5] as [number, number, number], scale: 0.22, color: "#F7F3EC" },
      ] as const,
    [],
  );
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#fff5e6" />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#C4A574" />
      <SoftPlane />
      {crystals.map((c, i) => (
        <Crystal key={i} {...c} />
      ))}
      <Environment preset="city" />
    </>
  );
}

export function HeroScene() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] opacity-90" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
