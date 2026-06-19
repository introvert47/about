import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ variable: '--font-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio — Young Developer',
  description:
    '15-year-old developer specializing in system optimization, web development, and interactive 3D graphics.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1e1e2e',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-[#1e1e2e]`}>
      <body className="font-sans antialiased bg-[#1e1e2e] text-[#cdd6f4] overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
