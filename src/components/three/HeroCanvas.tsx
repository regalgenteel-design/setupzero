"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import type { Theme } from "@/lib/hooks/useTheme";

const PAPER: Record<Theme, string> = { dark: "#121212", light: "#fbfbfb" };

function InkMaterial({ theme }: { theme: Theme }) {
  return (
    <meshPhysicalMaterial
      color={theme === "dark" ? "#0b0b0b" : "#141414"}
      metalness={theme === "dark" ? 0.85 : 0.7}
      roughness={0.16}
      clearcoat={1}
      clearcoatRoughness={0.05}
      envMapIntensity={theme === "dark" ? 1.6 : 1.25}
    />
  );
}

/** The "zero": a thick glossy ring that nods to the brand name. */
function ZeroRing({ theme }: { theme: Theme }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.08;
  });
  return (
    <mesh ref={ref} rotation={[-0.55, 0.35, 0]}>
      <torusGeometry args={[1.7, 0.54, 96, 256]} />
      <InkMaterial theme={theme} />
    </mesh>
  );
}

function CoreKnot({ theme }: { theme: Theme }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x -= dt * 0.12;
    ref.current.rotation.y += dt * 0.18;
  });
  return (
    <mesh ref={ref} scale={0.9}>
      <torusKnotGeometry args={[0.52, 0.16, 256, 32, 2, 3]} />
      <InkMaterial theme={theme} />
    </mesh>
  );
}

const SHARDS = Array.from({ length: 7 }, (_, i) => ({
  offset: (i / 7) * Math.PI * 2,
  speed: 0.22 + (i % 3) * 0.05,
  radius: 0.07 + ((i * 7) % 5) * 0.022,
  tilt: ((i % 4) - 1.5) * 0.35,
}));

function Shards({ theme }: { theme: Theme }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    SHARDS.forEach((s, i) => {
      const m = refs.current[i];
      if (!m) return;
      const a = t * s.speed + s.offset;
      m.position.set(Math.cos(a) * 2.8, Math.sin(a) * 1.1 + Math.sin(a * 2 + s.tilt) * 0.25, Math.sin(a) * 0.9);
    });
  });
  return (
    <>
      {SHARDS.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[s.radius, 32, 32]} />
          <InkMaterial theme={theme} />
        </mesh>
      ))}
    </>
  );
}

/** Raw pointer input written by DOM handlers outside the canvas. Read-only inside the scene. */
type InputState = {
  pointerX: number;
  pointerY: number;
  active: boolean;
  lastX: number;
  lastY: number;
  dragYaw: number;
  dragPitch: number;
};

/** Applies drag spin (with inertia) and idle pointer parallax. Physics state stays local. */
function Interaction({ input, children }: { input: React.RefObject<InputState>; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const motion = useRef({ yaw: 0, pitch: 0, vYaw: 0, vPitch: 0, seenYaw: 0, seenPitch: 0 });
  useFrame((_, dt) => {
    const g = ref.current;
    const inp = input.current;
    if (!g || !inp) return;
    const m = motion.current;
    const dYaw = inp.dragYaw - m.seenYaw;
    const dPitch = inp.dragPitch - m.seenPitch;
    m.seenYaw = inp.dragYaw;
    m.seenPitch = inp.dragPitch;
    if (inp.active) {
      m.vYaw = dYaw;
      m.vPitch = dPitch;
      m.yaw += dYaw;
      m.pitch = THREE.MathUtils.clamp(m.pitch + dPitch, -0.9, 0.9);
    } else {
      m.vYaw = THREE.MathUtils.damp(m.vYaw, 0, 2.2, dt);
      m.vPitch = THREE.MathUtils.damp(m.vPitch, 0, 2.2, dt);
      m.yaw += m.vYaw + dt * 0.12;
      m.pitch = THREE.MathUtils.damp(m.pitch + m.vPitch, 0, 0.8, dt);
    }
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, m.yaw + inp.pointerX * 0.22, 4, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, m.pitch - inp.pointerY * 0.14, 4, dt);
  });
  return <group ref={ref}>{children}</group>;
}

/** Procedural studio lighting (no HDR download). Neutral white light only. */
function Env({ theme }: { theme: Theme }) {
  const dark = theme === "dark";
  return (
    <Environment key={theme} resolution={256} frames={1}>
      <color attach="background" args={[dark ? "#040404" : "#d6d6d6"]} />
      <Lightformer form="rect" intensity={dark ? 5 : 3} color="#ffffff" position={[4, 1.5, -3]} scale={[3, 6, 1]} target={[0, 0, 0]} />
      <Lightformer form="ring" intensity={dark ? 2 : 1.6} color="#ffffff" position={[-4, -2, -2]} scale={[4, 4, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={dark ? 1.2 : 2} color="#ffffff" position={[0, 5, 2]} scale={[8, 0.35, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={dark ? 0.8 : 1.4} color="#ffffff" position={[-3, 0, 4]} scale={[2, 5, 1]} target={[0, 0, 0]} />
    </Environment>
  );
}

export default function HeroCanvas({ active, theme }: { active: boolean; theme: Theme }) {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dark = theme === "dark";
  const input = useRef<InputState>({ pointerX: 0, pointerY: 0, active: false, lastX: 0, lastY: 0, dragYaw: 0, dragPitch: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = input.current;
      d.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      d.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
      if (!d.active) return;
      const dx = e.clientX - d.lastX;
      const dy = e.clientY - d.lastY;
      d.lastX = e.clientX;
      d.lastY = e.clientY;
      d.dragYaw += dx * 0.008;
      d.dragPitch += dy * 0.006;
    };
    const onUp = () => {
      input.current.active = false;
      setDragging(false);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const d = input.current;
    d.active = true;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    setDragging(true);
  };

  return (
    <div
      onPointerDown={onPointerDown}
      className={`absolute inset-0 touch-pan-y transition-opacity duration-1000 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        opacity: ready ? 1 : 0,
        maskImage: "radial-gradient(ellipse 62% 64% at 50% 50%, #000 52%, transparent 82%)",
        WebkitMaskImage: "radial-gradient(ellipse 62% 64% at 50% 50%, #000 52%, transparent 82%)",
      }}
    >
      <Canvas
        dpr={dpr}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 7.4], fov: 35 }}
        gl={{ antialias: !dark, alpha: false, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        onCreated={() => window.setTimeout(() => setReady(true), 120)}
      >
        <color attach="background" args={[PAPER[theme]]} />
        <PerformanceMonitor onDecline={() => setDpr([1, 1])} />
        <Suspense fallback={null}>
          <Env theme={theme} />
          <ambientLight intensity={dark ? 0.06 : 0.25} />
          <directionalLight color="#ffffff" intensity={dark ? 0.5 : 0.9} position={[2, 4, 5]} />
          <Interaction input={input}>
            <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
              <ZeroRing theme={theme} />
              <CoreKnot theme={theme} />
              <Shards theme={theme} />
            </Float>
          </Interaction>
          {dark ? (
            <EffectComposer multisampling={0}>
              <Bloom mipmapBlur intensity={0.45} luminanceThreshold={0.72} luminanceSmoothing={0.25} radius={0.6} />
            </EffectComposer>
          ) : null}
        </Suspense>
      </Canvas>
    </div>
  );
}
