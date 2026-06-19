'use client'

import dynamic from 'next/dynamic'
import { motion, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const ParticleSphere = dynamic(() => import('./particle-sphere'), { ssr: false })

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(180,190,254,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(180,190,254,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(180,190,254,0.08) 0%, rgba(203,166,247,0.05) 40%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center min-h-screen pt-20 pb-16">
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-mono text-[#cba6f7] text-sm tracking-widest uppercase"
          >
            Hello, world — I&apos;m
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance"
          >
            Crafting{' '}
            <span className="gradient-text">Digital</span>{' '}
            Experiences.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[#a6adc8] text-lg leading-relaxed max-w-md text-pretty"
          >
            15-year-old developer specializing in{' '}
            <span className="text-[#b4befe] font-medium">system optimization</span>,{' '}
            <span className="text-[#cba6f7] font-medium">web development</span>, and{' '}
            <span className="text-[#74c7ec] font-medium">interactive 3D graphics</span>.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 flex-wrap"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-[#b4befe] text-[#1e1e2e] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#cba6f7] transition-all duration-200 glow-lavender"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[#b4befe]/30 text-[#b4befe] font-medium text-sm px-6 py-3 rounded-lg hover:bg-[#b4befe]/10 hover:border-[#b4befe]/60 transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Status badge */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6e3a1] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6e3a1]" />
            </span>
            <span className="text-[#a6adc8] text-xs font-mono">Available for projects</span>
          </motion.div>
        </div>

        {/* Right: 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="relative h-[380px] md:h-[500px]"
        >
          <ParticleSphere />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#6c7086] hover:text-[#b4befe] transition-colors"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  )
}
