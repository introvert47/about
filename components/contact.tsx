'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, MessageSquare } from 'lucide-react'

// Inline SVG icons for brands not in lucide-react v1
function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.579 9.579 0 0 1 12 6.836a9.58 9.58 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: <GithubIcon size={18} />,
    color: '#b4befe',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <LinkedinIcon size={18} />,
    color: '#74c7ec',
  },
  {
    label: 'Discord',
    href: 'https://discord.com',
    icon: <MessageSquare size={18} />,
    color: '#cba6f7',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px]"
          style={{
            background:
              'radial-gradient(circle at bottom right, rgba(203,166,247,0.06) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-[#cba6f7] text-sm">04.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#cdd6f4]">Get In Touch</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#b4befe]/30 to-transparent ml-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#a6adc8] max-w-lg mb-14 leading-relaxed text-pretty"
        >
          Whether you have a project idea, want to collaborate, or just want to say hi — my inbox is
          always open. I&apos;ll get back to you as soon as possible.
        </motion.p>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-16" ref={ref}>
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:col-span-3 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#6c7086] uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-[#181825] border border-[#313244] text-[#cdd6f4] placeholder-[#45475a] rounded-xl px-4 py-3 text-sm focus:border-[#b4befe]/60 input-glow transition-all duration-200 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#6c7086] uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-[#181825] border border-[#313244] text-[#cdd6f4] placeholder-[#45475a] rounded-xl px-4 py-3 text-sm focus:border-[#b4befe]/60 input-glow transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-[#6c7086] uppercase tracking-wider">
                Message
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or just say hello..."
                className="bg-[#181825] border border-[#313244] text-[#cdd6f4] placeholder-[#45475a] rounded-xl px-4 py-3 text-sm focus:border-[#b4befe]/60 input-glow transition-all duration-200 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status !== 'idle'}
              className="self-start flex items-center gap-2 bg-[#b4befe] text-[#1e1e2e] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#cba6f7] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 glow-lavender"
            >
              {status === 'sending' ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#1e1e2e]/40 border-t-[#1e1e2e] rounded-full animate-spin" />
                  Sending…
                </>
              ) : status === 'sent' ? (
                <>
                  <span>✓</span>
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:col-span-2 flex flex-col gap-8"
          >
            <div>
              <p className="font-mono text-xs text-[#6c7086] uppercase tracking-widest mb-4">
                Find me on
              </p>
              <ul className="flex flex-col gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      <span style={{ color: s.color }}>{s.icon}</span>
                      <span className="text-[#a6adc8] group-hover:text-[#cdd6f4] text-sm font-medium transition-colors">
                        {s.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-5">
              <p className="font-mono text-xs text-[#6c7086] uppercase tracking-widest mb-2">
                Response time
              </p>
              <p className="text-[#b4befe] font-semibold">Within 24 hours</p>
              <p className="text-[#6c7086] text-xs mt-1 font-mono">Usually much faster</p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
