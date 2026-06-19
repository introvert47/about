export default function Footer() {
  return (
    <footer className="border-t border-[#313244]/60 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[#6c7086] text-xs">
          Designed & Built with{' '}
          <span className="text-[#f38ba8]">♥</span> — Catppuccin Mocha
        </p>
        <p className="font-mono text-[#6c7086] text-xs">
          {'<dev />'} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
