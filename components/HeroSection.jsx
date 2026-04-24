'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Radio } from 'lucide-react';

// Dynamic import for Canvas (browser-only)
const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

const tags = [
  { icon: <Zap size={12} />, label: 'Edge AI — YOLOv8' },
  { icon: <Radio size={12} />, label: 'LoRa 433MHz' },
  { icon: <Shield size={12} />, label: 'Fail-Safe RTL' },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: headline + CTAs */}
        <div className="flex flex-col gap-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold text-textMuted"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            T3 Girişimcilik — İnovasyon Projesi 2024
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold leading-[1.05] tracking-tight"
          >
            <span className="text-5xl sm:text-6xl lg:text-7xl block text-white">Otonom</span>
            <span
              className="text-5xl sm:text-6xl lg:text-7xl block"
              style={{
                background: 'linear-gradient(135deg,#00e5ff 0%,#7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Orman Kalkanı
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-textMuted text-lg leading-relaxed max-w-lg"
          >
            <strong className="text-white">ASSET</strong> sensör ağıyla yangını{' '}
            <strong className="text-primary">saniyeler</strong> içinde tespit et.{' '}
            <strong className="text-white">AYDEM</strong> drone filosuyla{' '}
            <strong className="text-primary">dakikalar</strong> içinde otonom müdahale gerçekleştir.
            İnsan hatası sıfır — etki maksimum.
          </motion.p>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-primary glass border border-primary/20"
              >
                {t.icon}
                {t.label}
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/#waitlist"
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-black transition-all hover:shadow-neon-primary hover:scale-[1.02] active:scale-95"
              style={{ background: 'linear-gradient(135deg,#00e5ff,#00b8cc)' }}
            >
              Ön Erişime Katıl
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#problem"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white glass border border-white/10 hover:bg-white/5 transition-all active:scale-95"
            >
              Sorun Nedir?
            </Link>
          </motion.div>

          {/* Inline stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex gap-8 pt-2 border-t border-white/5"
          >
            {[
              { value: '<300ms', label: 'Karar Süresi' },
              { value: '%98.5', label: 'AI Doğruluğu' },
              { value: '7/24', label: 'Otonom İzleme' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white">{value}</span>
                <span className="text-xs text-textMuted">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Canvas sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[420px] lg:h-[560px] w-full"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 65%)',
              filter: 'blur(30px)',
            }}
          />
          <Hero3D />

          {/* Floating data cards */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-8 left-4 glass rounded-xl px-4 py-3 border border-white/10"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-semibold">ASSET 2.1 Aktif</span>
            </div>
            <div className="text-white font-mono text-sm mt-0.5">
              Sıcaklık: <span className="text-primary">24.3°C</span>
            </div>
            <div className="text-textMuted text-[10px] mt-0.5">LoRa · 433MHz · RSSI: -72dBm</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-12 right-4 glass rounded-xl px-4 py-3 border border-white/10"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-semibold">AYDEM Hangar</span>
            </div>
            <div className="text-white font-mono text-sm mt-0.5">
              Drone: <span className="text-primary">Beklemede</span>
            </div>
            <div className="text-textMuted text-[10px] mt-0.5">YOLOv8 · Edge AI · Ready</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #000000)' }}
      />
    </section>
  );
}
