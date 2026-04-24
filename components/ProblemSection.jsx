'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Clock, Trees, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const problems = [
  {
    icon: <Clock size={28} />,
    color: '#ff0044',
    stat: '+45 dk',
    label: 'Ortalama müdahale süresi',
    desc: 'Yangın ihbarından ilk müdahaleye kadar geçen süre kritik kaybı belirler.',
  },
  {
    icon: <Trees size={28} />,
    color: '#ff6b35',
    stat: '80.000+',
    label: 'Yıllık hektar kayıp',
    desc: "Türkiye'de yıllık ortalama 80.000 hektar orman, önlenebilir yangınlara kurban gidiyor.",
  },
  {
    icon: <AlertTriangle size={28} />,
    color: '#ff0044',
    stat: '%73',
    label: 'Geç tespit kaynaklı hasar',
    desc: 'Yangınların büyük çoğunluğu, kontrol noktasını ilk 5 dakikada geçtikten sonra ihbar ediliyor.',
  },
  {
    icon: <Flame size={28} />,
    color: '#ff6b35',
    stat: '∞',
    label: 'Telafisi mümkün olmayan ekosistem kaybı',
    desc: "Bir yangında yok olan flora ve fauna, onlarca yıl içinde bile eskiye dönemiyor.",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="problem" className="py-32 max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
      {/* Dramatic problem headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
        <span className="inline-flex items-center gap-2 text-xs font-bold text-danger uppercase tracking-widest mb-6">
          <Flame size={14} />
          Gerçek Tehdit
        </span>
        <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
          Her Yıl <span style={{ color: '#ff0044' }}>Binlerce Hektar</span>
          <br />
          Kül Oluyor.
        </h2>
        <p className="text-textMuted text-xl max-w-2xl mx-auto leading-relaxed">
          Mevcut sistemler insan müdahalesini bekler. İnsan, yangının hızını asla yakalayamaz.
          Bu gecikme, geri dönülemez sonuçlara yol açıyor.
        </p>
      </motion.div>

      {/* Problem cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {problems.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}
            >
              {p.icon}
            </div>
            <div
              className="font-heading font-black text-3xl"
              style={{ color: p.color }}
            >
              {p.stat}
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-1">{p.label}</div>
              <div className="text-textMuted text-xs leading-relaxed">{p.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bridge to solution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center"
      >
        <p className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
          Peki ya sistem insan beklemiyor olsaydı?
        </p>
        <Link
          href="/#solution"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-black hover:shadow-neon-primary hover:scale-[1.02] transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg,#00e5ff,#00b8cc)' }}
        >
          Çözümü Keşfet
        </Link>
      </motion.div>
    </section>
  );
}
