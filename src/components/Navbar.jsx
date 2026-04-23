import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, Zap } from 'lucide-react';

const links = [
  { label: 'Ana Sayfa', path: '/' },
  { label: 'Hakkında', path: '/about' },
  { label: 'Teknik Detaylar', path: '/technical' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Shield size={18} className="text-primary" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-sm text-white tracking-wide">ASSET & AYDEM</span>
                <span className="text-[10px] text-primary/60 tracking-widest uppercase">Defense Ecosystem</span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map(({ label, path }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-textMuted hover:text-white'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                        style={{ zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/technical"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-background rounded-lg transition-all duration-200 hover:shadow-neon-primary active:scale-95"
                style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #0099cc 100%)' }}
              >
                <Zap size={14} />
                Sistemi Keşfet
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-textMuted hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Menüyü Aç/Kapat"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/5 md:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'text-primary bg-primary/10'
                      : 'text-textMuted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/5 mt-1">
                <Link
                  to="/technical"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-background rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #0099cc 100%)' }}
                >
                  <Zap size={14} />
                  Sistemi Keşfet
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}