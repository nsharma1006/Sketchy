"use client"
import { useState, type ReactNode } from 'react';
import { PenTool, Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  links?: NavLink[];
  logo?: ReactNode;
  onSignIn?: () => void;
  onSignUp?: () => void;
  ctaLabel?: string;
  sticky?: boolean;
}

const defaultLinks: NavLink[] = [
  { label: 'SignIn', href: '/signin' },
  { label: 'SignUp', href: '/signup' },
  { label: 'Create Room', href: '/room/create'},
];

function defaultLogo() {
  return (
    <a href="#" className="flex items-center gap-2 text-slate-800">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-amber-400 to-orange-500 shadow-sm">
        <PenTool className="text-white" size={20} />
      </div>
      <span className="text-xl font-bold tracking-tight">Sketchy</span>
    </a>
  );
}

export default function Header({
  links = defaultLinks,
  logo,
  onSignIn,
  onSignUp,
  ctaLabel = 'Get started',
  sticky = true,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const positionClass = sticky ? 'sticky top-0' : '';

  return (
    <header className={`z-40 border-b border-slate-200/80 p-2 bg-white/80 backdrop-blur-md ${positionClass}`}>
      <nav className="mx-auto flex max-w-7xl items-center md:justify-between px-4 py-2">
        <div>
        {logo ?? defaultLogo()}
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}

        {/* Mobile toggle */}
        <button
          className="text-slate-600 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200/80 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            {(onSignIn || onSignUp) && (
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/80">
                {onSignIn && (
                  <button
                    onClick={() => { onSignIn(); setMobileOpen(false); }}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    Sign in
                  </button>
                )}
                {onSignUp && (
                  <button
                    onClick={() => { onSignUp(); setMobileOpen(false); }}
                    className="rounded-lg bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                  >
                    {ctaLabel}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
