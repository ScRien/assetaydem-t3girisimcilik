'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Shield, Menu, X, Zap } from 'lucide-react';

const links = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Sorun & Çözüm', href: '/#problem' },
  { label: 'Özellikler', href: '/#features' },
  { label: 'Ön Erişim', href: '/#waitlist' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-[0_8px_32px_rgba(0,0,0,0.7)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Shield size={18} className="text-primary" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-sm text-white tracking-wide">ASSET & AYDEM</span>
            <span className="text-[10px] text-primary/60 tracking-widest uppercase">Defense Ecosystem</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-textMuted hover:text-white hover:bg-white/5 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/#waitlist"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-black rounded-lg transition-all hover:shadow-neon-primary hover:scale-[1.02] active:scale-95"
            style={{ background: 'linear-gradient(135deg,#00e5ff,#00b8cc)' }}
          >
            <Zap size={14} />
            Ön Erişime Katıl
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-textMuted hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Menü"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-textMuted hover:text-white hover:bg-white/5 transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-black rounded-lg"
              style={{ background: 'linear-gradient(135deg,#00e5ff,#00b8cc)' }}
            >
              <Zap size={14} />
              Ön Erişime Katıl
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
