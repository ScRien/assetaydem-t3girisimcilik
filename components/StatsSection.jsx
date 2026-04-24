'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '<2s', label: 'Tespit Süresi', color: '#00e5ff', sub: 'İnsan ortalama 45 dk' },
  { value: '%98.5', label: 'AI Doğruluğu', color: '#7c3aed', sub: 'Gerçek saha testleri' },
  { value: '<5dk', label: 'İlk Müdahale', color: '#00e5ff', sub: 'Hangar\'dan kalkış dahil' },
  { value: '3 tip', label: 'Özel Drone', color: '#ff6b35', sub: 'Tespit, hücum, bariyer' },
  { value: '5km+', label: 'LoRa Menzil', color: '#7c3aed', sub: 'İnternetsiz haberleşme' },
  { value: '7/24', label: 'Kesintisiz', color: '#00e5ff', sub: 'Solar enerji ile' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="stats" className="py-20 relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,229,255,0.3),rgba(124,58,237,0.2),transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.2),rgba(0,229,255,0.3),transparent)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center,rgba(0,229,255,0.04) 0%,transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {stats.map(({ value, label, color, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass flex flex-col items-center justify-center py-10 px-4 text-center gap-1 group hover:bg-white/3 transition-colors"
            >
              <div className="font-heading font-bold text-3xl md:text-4xl leading-none" style={{ color }}>
                {value}
              </div>
              <div className="text-xs text-white font-semibold mt-1">{label}</div>
              <div className="text-[10px] text-textMuted">{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
