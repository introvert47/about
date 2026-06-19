'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const techStack = [
  { name: 'Python', sub: 'CustomTkinter', icon: '🐍', color: '#74c7ec' },
  { name: 'JavaScript', sub: 'Three.js · React', icon: '⚡', color: '#cba6f7' },
  { name: 'Linux', sub: 'Systems & Shells', icon: '🐧', color: '#a6e3a1' },
  { name: 'Three.js', sub: '3D / WebGL', icon: '◈', color: '#b4befe' },
  { name: 'React', sub: 'Frontend Dev', icon: '⚛', color: '#89dceb' },
  { name: 'Frontend', sub: 'HTML · CSS · UI', icon: '🎨', color: '#f9e2af' },
]

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      {/* Section label */}
      <div className="max-w-6xl mx-auto px-6">
        <FadeInSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[#cba6f7] text-sm">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#cdd6f4]">About Me</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#b4befe]/30 to-transparent ml-4" />
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Bio */}
          <FadeInSection delay={0.1}>
            <div className="flex flex-col gap-6">
              <p className="text-[#a6adc8] leading-relaxed text-pretty">
                I&apos;m a self-taught developer with a deep obsession for{' '}
                <span className="text-[#b4befe] font-medium">open-source software</span> and the
                beauty of well-structured code. At 15, I&apos;ve already built production-level
                tools used across Windows and Linux systems.
              </p>
              <p className="text-[#a6adc8] leading-relaxed text-pretty">
                My journey started tinkering with{' '}
                <span className="text-[#cba6f7] font-medium">Linux environments</span>, writing
                shell scripts, and optimizing system performance. That curiosity evolved into
                building full applications — from system optimizers to gesture-controlled{' '}
                <span className="text-[#74c7ec] font-medium">3D particle systems</span>.
              </p>
              <p className="text-[#a6adc8] leading-relaxed text-pretty">
                I believe code should be{' '}
                <span className="text-[#f9e2af] font-medium">clean, purposeful, and fast</span>.
                Every project I build reflects that philosophy.
              </p>

              {/* Small stat row */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { val: '2+', label: 'Years coding' },
                  { val: '10+', label: 'Projects built' },
                  { val: '∞', label: 'Lines of code' },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#b4befe]">{s.val}</div>
                    <div className="text-xs text-[#6c7086] mt-1 font-mono">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Right: Tech Stack Grid */}
          <FadeInSection delay={0.2}>
            <div>
              <p className="font-mono text-[#6c7086] text-xs tracking-widest uppercase mb-6">
                Tech Stack
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="glass rounded-xl p-4 flex flex-col gap-2 cursor-default group"
                  >
                    <span
                      className="text-2xl"
                      role="img"
                      aria-label={tech.name}
                      style={{ filter: 'none' }}
                    >
                      {tech.icon}
                    </span>
                    <div>
                      <div
                        className="font-semibold text-sm"
                        style={{ color: tech.color }}
                      >
                        {tech.name}
                      </div>
                      <div className="text-[#6c7086] text-xs font-mono mt-0.5">{tech.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
