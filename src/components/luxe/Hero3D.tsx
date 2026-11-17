import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const GOLD = '#d9b877'

function Env() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl)
    const tex = pm.fromScene(new RoomEnvironment(), 0.04).texture
    // eslint-disable-next-line react-hooks/immutability
    scene.environment = tex
    return () => {
       
      scene.environment = null
      tex.dispose()
      pm.dispose()
    }
  }, [gl, scene])
  return null
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const a = new Float32Array(count * 3)
    let seed = 1337
    const rnd = () => {
      seed = (seed + 0x6d2b79f5) | 0
      let x = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296
    }
    for (let i = 0; i < count; i++) {
      const r = 2.2 + rnd() * 5
      const t = rnd() * Math.PI * 2
      const p = Math.acos(2 * rnd() - 1)
      a[i * 3] = r * Math.sin(p) * Math.cos(t)
      a[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.7
      a[i * 3 + 2] = r * Math.cos(p)
    }
    g.setAttribute('position', new THREE.BufferAttribute(a, 3))
    return g
  }, [count])
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.03
  })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={GOLD} size={0.022} sizeAttenuation transparent opacity={0.75} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function Crystal({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const sc = () => {
      scroll.current = Math.min(1, window.scrollY / window.innerHeight)
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', sc, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', sc)
    }
  }, [])

  useFrame((state, d) => {
    const t = state.clock.elapsedTime
    const g = group.current
    if (!g) return
    const s = scroll.current
    g.rotation.y += (pointer.current.x * 0.6 + t * 0.12 + s * 2 - g.rotation.y) * Math.min(1, d * 2)
    g.rotation.x += (pointer.current.y * 0.35 + s * 0.8 - g.rotation.x) * Math.min(1, d * 2)
    g.position.y = Math.sin(t * 0.8) * 0.08 - s * 1.2 + (mobile ? 1.5 : 0)
    g.position.x = mobile ? 0 : 1.9
    g.scale.setScalar((mobile ? 0.62 : 1) * (1 - s * 0.35))
    if (core.current) core.current.rotation.z = t * 0.1
    if (ringA.current) ringA.current.rotation.z = t * 0.25
    if (ringB.current) ringB.current.rotation.z = -t * 0.18
  })

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.12} clearcoat={1} clearcoatRoughness={0.05} iridescence={0.6} envMapIntensity={1.4} flatShading />
      </mesh>
      <mesh scale={1.5}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color="#f1e0b4" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.1, 0.012, 16, 160]} />
        <meshStandardMaterial color="#f1e0b4" metalness={1} roughness={0.2} emissive={GOLD} emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.8, 0.5, 0]}>
        <torusGeometry args={[2.6, 0.008, 16, 160]} />
        <meshStandardMaterial color="#b88a3e" metalness={1} roughness={0.25} emissive="#b88a3e" emissiveIntensity={0.35} />
      </mesh>
    </group>
  )
}

export function Hero3D() {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [mobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      {reduced ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(217,184,119,0.22),transparent_55%)]" />
      ) : (
        <Canvas
          frameloop={visible ? 'always' : 'never'}
          dpr={[1, mobile ? 1.5 : 2]}
          camera={{ position: [0, 0, 6.5], fov: 42 }}
          gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.1
          }}
        >
          <Env />
          <ambientLight intensity={0.25} />
          <pointLight position={[4, 3, 4]} intensity={30} color="#f1e0b4" />
          <Crystal mobile={mobile} />
          <Particles count={mobile ? 350 : 900} />
        </Canvas>
      )}
    </div>
  )
}
