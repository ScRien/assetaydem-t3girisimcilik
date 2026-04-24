import Link from 'next/link';
import { Shield, Globe, Github } from 'lucide-react';

const footerLinks = [
  { label: 'Sorun & Çözüm', href: '/#problem' },
  { label: 'Özellikler', href: '/#features' },
  { label: 'Ön Erişim', href: '/#waitlist' },
  { label: 'Admin', href: '/admin' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-8">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,229,255,0.25),transparent)' }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-primary" />
              <span className="font-heading font-bold text-white">ASSET & AYDEM</span>
            </div>
            <p className="text-textMuted text-sm max-w-xs leading-relaxed">
              Türkiye'nin ormanlarını yapay zeka ve otonom drone sistemleriyle koruyoruz.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-primary/60">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Sistem Aktif — 7/24 İzleme
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-widest mb-1">Bağlantılar</span>
            {footerLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm text-textMuted hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-widest mb-1">Teknoloji</span>
            {['YOLOv8 Edge AI', 'LoRa 433MHz', 'Next.js App Router', 'MongoDB Atlas'].map((t) => (
              <span key={t} className="text-sm text-textMuted">{t}</span>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-textMuted">
            &copy; {new Date().getFullYear()} ASSET & AYDEM — T3 Girişimcilik. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-3">
            {[Globe, Github].map((Icon, i) => (
              <button key={i} className="p-1.5 rounded-md text-textMuted hover:text-white hover:bg-white/5 transition-colors">
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
