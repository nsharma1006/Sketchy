import { useState } from 'react';
import { PenTool, Menu, X } from 'lucide-react';
import Link from 'next/link';


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how' },
    { label: 'Showcase', href: '#showcase' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#0a0a1a]/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/30">
            <PenTool className="text-[#1a0a2e]" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">Sketchy</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
            <Link href="/signin">
                <button className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                    Sign in
                </button>
            </Link>
            <Link href="/signup">
                <button className="rounded-lg bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-[#1a0a2e] shadow-lg shadow-orange-500/20 transition hover:shadow-orange-500/40 hover:brightness-110">
                    Get started
                </button>
            </Link>
        </div>

        <button
          className="text-white/70 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0a0a1a]/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link href="/signin">
              <button
                onClick={() => {  setMobileOpen(false); }}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white"
              >
                Sign in
              </button>
              </Link>
              <Link href="/signup">
              <button
                onClick={() => { setMobileOpen(false); }}
                className="rounded-lg bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-[#1a0a2e]"
              >
                Get started
              </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
