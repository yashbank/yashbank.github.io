import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import type { Group } from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTheme } from '@/theme/ThemeContext'

/**
 * Minimal closed-laptop silhouette (procedural boxes only).
 * Authored for this site — no third-party mesh; avoids ambiguous GLB licensing on a public portfolio.
 * Background-only: low contrast, slow drift, no interaction.
 */
function WorkstationSilhouette() {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    g.rotation.y += delta * 0.052
    g.position.y = -0.48 + Math.sin(performance.now() * 0.00035) * 0.018
  })

  return (
    <group ref={group} position={[1.45, -0.48, 0.08]} rotation={[0.2, -0.58, 0.06]}>
      <mesh rotation={[0.1, 0, 0]}>
        <boxGeometry args={[2.38, 0.11, 1.46]} />
        <meshStandardMaterial color="#13141c" metalness={0.38} roughness={0.52} />
      </mesh>
      <mesh position={[0, 0.052, -0.5]} rotation={[0.14, 0, 0]}>
        <boxGeometry args={[2.34, 0.045, 1.02]} />
        <meshStandardMaterial color="#0c0d12" metalness={0.32} roughness={0.58} />
      </mesh>
      <mesh position={[0, 0.052, 0.02]} rotation={[0.14, 0, 0]}>
        <boxGeometry args={[2.15, 0.018, 0.88]} />
        <meshStandardMaterial
          color="#1e2030"
          metalness={0.55}
          roughness={0.28}
          emissive="#2a2d42"
          emissiveIntensity={0.06}
        />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.28} color="#c4c8dc" />
      <directionalLight position={[5.5, 8.5, 6]} intensity={0.48} color="#e8eaf5" />
      <directionalLight position={[-4, -2, -3]} intensity={0.14} color="#7c6fd4" />
      <hemisphereLight args={['#9098b8', '#0a0b12', 0.16]} />
      <WorkstationSilhouette />
    </>
  )
}

export function HeroBackground3D() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()

  if (reduced) return null

  const isLight = theme === 'light'

  return (
    <div
      className={`hero-3d-layer pointer-events-none absolute inset-0 z-[2] ${isLight ? 'opacity-[0.14] mix-blend-multiply' : 'opacity-[0.22] mix-blend-soft-light'} max-md:hidden`}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        }}
        camera={{ position: [0, 0.12, 4.35], fov: 26, near: 0.1, far: 24 }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
