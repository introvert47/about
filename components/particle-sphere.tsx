'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const { size } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })

  const COUNT = 3000

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    // Catppuccin Mocha accent colors
    const palette = [
      new THREE.Color('#b4befe'), // lavender
      new THREE.Color('#cba6f7'), // mauve
      new THREE.Color('#74c7ec'), // sapphire
      new THREE.Color('#89dceb'), // sky
    ]

    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      const r = 1.8 + (Math.random() - 0.5) * 0.6
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const col = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    return { positions, colors }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      targetMouse.current.x = (t.clientX / window.innerWidth - 0.5) * 2
      targetMouse.current.y = -(t.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    // Smooth mouse follow
    mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.05
    mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.05

    const t = state.clock.getElapsedTime()

    // Slow auto-rotation + mouse influence
    meshRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.4
    meshRef.current.rotation.x = mouse.current.y * 0.3
    meshRef.current.rotation.z = t * 0.04

    // Pulse scale
    const pulse = 1 + Math.sin(t * 0.5) * 0.04
    meshRef.current.scale.setScalar(pulse)
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// Inner wireframe ring
function WireRings() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.3
      ring1.current.rotation.z = t * 0.2
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.25
      ring2.current.rotation.x = t * -0.15
    }
  })

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[1.85, 0.006, 6, 120]} />
        <meshBasicMaterial color="#b4befe" transparent opacity={0.18} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.55, 0.004, 6, 120]} />
        <meshBasicMaterial color="#cba6f7" transparent opacity={0.14} />
      </mesh>
    </>
  )
}

export default function ParticleSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
        <WireRings />
      </Canvas>
    </div>
  )
}
