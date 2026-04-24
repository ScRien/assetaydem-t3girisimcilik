'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import WaitlistForm from './WaitlistForm';
import { Shield, Trees, Zap } from 'lucide-react';

const perks = [
  { icon: <Zap size={16} />, text: 'Beta erişim önceliği' },
  { icon: <Trees size={16} />, text: 'Lansman anında bildirim' },
  { icon: <Shield size={16} />, text: 'Özel teknik brifing' },
];

export default function WaitlistSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="waitlist" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 65%)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,229,255,0.3),transparent)' }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Erken Erişim Programı
          </span>

          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
            Geleceğin Savunma<br />
            <span
              style={{
                background: 'linear-gradient(135deg,#00e5ff,#7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Teknolojisine İlk Adım At
            </span>
          </h2>

          <p className="text-textMuted text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Listemize katıl, projenin gelişimini takip et ve lansman gününde
            ilk kullananlar arasında ol.
          </p>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {perks.map(({ icon, text }) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs text-white font-medium"
              >
                <span className="text-primary">{icon}</span>
                {text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <WaitlistForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-textMuted mt-6"
        >
          Verileriniz yalnızca iletişim amacıyla saklanır. Üçüncü taraflarla paylaşılmaz.
        </motion.p>
      </div>
    </section>
  );
}
