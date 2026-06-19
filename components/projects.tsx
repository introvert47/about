'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Terminal, Globe, Zap, Layers } from 'lucide-react'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.579 9.579 0 0 1 12 6.836a9.58 9.58 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

const projects = [
  {
    id: 'nexus',
    title: 'Nexus Optimizer',
    tagline: 'System performance, redefined.',
    description:
      'A comprehensive system optimization application built with Python and CustomTkinter. Manages PC performance tweaks, clears storage, and flushes RAM across both Windows and Linux platforms. Features a modern dark UI with real-time system metrics.',
    tags: ['Python', 'CustomTkinter', 'Windows', 'Linux', 'System Optimization'],
    accent: '#74c7ec',
    icon: <Terminal size={22} />,
    large: true,
    github: 'https://github.com',
  },
  {
    id: 'gesture',
    title: 'Gesture 3D Particles',
    tagline: 'Your hands, the controller.',
    description:
      'An advanced web app utilizing Three.js and MediaPipe Hands for real-time hand gesture tracking. Users can morph complex 3D particle systems into shapes like hearts, galaxies, and fractals — all through natural hand movements in the browser.',
    tags: ['Three.js', 'MediaPipe', 'WebGL', 'React', 'Computer Vision'],
    accent: '#cba6f7',
    icon: <Layers size={22} />,
    large: true,
    github: 'https://github.com',
    demo: '#',
  },
  {
    id: 'extra1',
    title: 'Linux Config Manager',
    tagline: 'Dotfiles, unified.',
    description: 'A shell-based tool for managing and syncing dotfiles across multiple Linux machines.',
    tags: ['Bash', 'Linux', 'Git'],
    accent: '#a6e3a1',
    icon: <Zap size={22} />,
    large: false,
    github: 'https://github.com',
  },
  {
    id: 'extra2',
    title: 'Web Portfolio Engine',
    tagline: 'This very site.',
    description: 'A Next.js + React Three Fiber portfolio with Catppuccin theming, glassmorphism, and interactive 3D.',
    tags: ['Next.js', 'R3F', 'Framer Motion'],
    accent: '#b4befe',
    icon: <Globe size={22} />,
    large: false,
    github: 'https://github.com',
  },
]

function ProjectCard({ project, i }: { project: (typeof projects)[number]; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass rounded-2xl p-6 flex flex-col gap-5 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        project.large ? 'md:col-span-1' : ''
      }`}
      style={{
        '--accent': project.accent,
      } as React.CSSProperties}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at top left, ${project.accent}10 0%, transparent 60%)`,
        }}
      />

      {/* Icon + tags row */}
      <div className="flex items-start justify-between gap-4 relative">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${project.accent}18`, color: project.accent }}
        >
          {project.icon}
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code"
              className="text-[#6c7086] hover:text-[#cdd6f4] transition-colors p-1"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live demo"
              className="text-[#6c7086] hover:text-[#cdd6f4] transition-colors p-1"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 relative">
        <p className="font-mono text-xs" style={{ color: project.accent }}>
          {project.tagline}
        </p>
        <h3 className="text-xl font-bold text-[#cdd6f4]">{project.title}</h3>
        <p className="text-[#a6adc8] text-sm leading-relaxed text-pretty">{project.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto relative">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-1 rounded-md"
            style={{
              background: `${project.accent}15`,
              color: project.accent,
              border: `1px solid ${project.accent}30`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA button for large cards */}
      {project.large && (
        <div className="flex gap-3 relative">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg border transition-all duration-200"
            style={{
              borderColor: `${project.accent}40`,
              color: project.accent,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = `${project.accent}18`
              el.style.borderColor = `${project.accent}70`
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'transparent'
              el.style.borderColor = `${project.accent}40`
            }}
          >
            <GithubIcon size={13} />
            View Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200"
              style={{ background: `${project.accent}22`, color: project.accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${project.accent}35`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${project.accent}22`
              }}
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-[#cba6f7] text-sm">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#cdd6f4]">Featured Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#b4befe]/30 to-transparent ml-4" />
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
