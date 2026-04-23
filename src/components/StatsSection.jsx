import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '<300', unit: 'ms', label: 'Tespit & Karar Süresi', color: '#00e5ff' },
  { value: '98.5', unit: '%', label: 'AI Tespit Doğruluğu', color: '#7c3aed' },
  { value: '3', unit: 'tip', label: 'Uzmanlaşmış Drone', color: '#ff6b35' },
  { value: '7/24', unit: '', label: 'Kesintisiz Güç', color: '#00e5ff' },
  { value: '5', unit: 'km', label: 'LoRa Menzili', color: '#7c3aed' },
  { value: '0', unit: 'insan', label: 'Operatör Gerektirmez', color: '#ff6b35' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      {/* Top border glow */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.25), rgba(124,58,237,0.2), transparent)' }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), rgba(0,229,255,0.25), transparent)' }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {stats.map(({ value, unit, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass flex flex-col items-center justify-center py-10 px-4 text-center gap-1.5 group hover:bg-white/3 transition-colors"
            >
              <div
                className="font-heading font-bold text-3xl md:text-4xl leading-none"
                style={{ color }}
              >
                {value}
                <span className="text-lg ml-0.5 opacity-70">{unit}</span>
              </div>
              <div className="text-xs text-textMuted mt-1 leading-snug">{label}</div>
              <div
                className="w-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                style={{ background: color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
