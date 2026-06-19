'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-black/30 py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[#b4befe] font-bold text-lg tracking-tight"
        >
          {'<dev />'}
        </motion.a>

        {/* Desktop links */}
        <motion.ul
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[#a6adc8] hover:text-[#b4befe] transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                <span className="text-[#cba6f7] font-mono text-xs mr-1">0{i + 1}.</span>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#b4befe]/40 text-[#b4befe] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#b4befe]/10 hover:border-[#b4befe]/70 transition-all duration-200"
            >
              GitHub
            </a>
          </li>
        </motion.ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#b4befe] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-[#b4befe]/10"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {links.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-[#a6adc8] hover:text-[#b4befe] transition-colors text-sm font-medium"
                  >
                    <span className="text-[#cba6f7] font-mono text-xs mr-2">0{i + 1}.</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
