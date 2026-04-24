'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Radio, Server, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    num: '01',
    icon: <Radio size={28} />,
    color: '#00e5ff',
    title: 'ASSET Sensör Ağı Tespit Eder',
    subtitle: 'Saniyeler içinde, insan müdahalesi olmadan',
    desc: 'Ormanın kılcallarına gömülü ASSET 2.0 düğümleri anlık duman ve sıcaklık verisi toplar. ASSET 2.1 hub\'ları bu veriyi LoRa 433MHz üzerinden merkeze taşır. Sistem uyur — tehlike hiç uyumaz.',
    highlight: '<2 saniye tespit',
  },
  {
    num: '02',
    icon: <Server size={28} />,
    color: '#7c3aed',
    title: 'AYDEM Hangar Karar Verir',
    subtitle: 'YOLOv8 Edge AI ile 300ms\'de analiz',
    desc: 'Mini PC üzerindeki YOLOv8 modeli, sensör verisini gerçek zamanlı işler. Alarm doğrulandığında Hangar otonom olarak tavan kapağını açar, uygun drone\'u seçer ve koordinat atar. Hiçbir operatör aramak gerekmez.',
    highlight: '<300ms karar',
  },
  {
    num: '03',
    icon: <Zap size={28} />,
    color: '#ff6b35',
    title: 'Drone Filosu Müdahale Eder',
    subtitle: 'Tespit, söndürme, bariyer — aynı anda',
    desc: 'Detection drone termal sensörle yangın çekirdeğini koordinat bazlı kilitler. Capsule drone MAP kapsülleri fırlatarak alevleri anında boğar. Obstacle drone ise yayılma hattına kimyasal bariyer çizer.',
    highlight: '<5 dk müdahale',
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="solution" className="py-32 max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">
          Nasıl Çalışır?
        </span>
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
          Tespitten <span className="neon-text">Müdahaleye</span>
          <br />
          Tamamen Otonom
        </h2>
        <p className="text-textMuted text-lg max-w-2xl mx-auto">
          Üç koordineli katman, birbirinden bağımsız çalışabilir ama birlikte%98.5 başarı oranı yakalar.
        </p>
      </motion.div>

      {/* 3-step flow */}
      <div className="space-y-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 border border-white/5 hover:border-white/12 transition-colors group overflow-hidden relative"
          >
            {/* Number watermark */}
            <div
              className="absolute top-4 right-8 font-heading font-black text-[100px] leading-none pointer-events-none select-none"
              style={{ color: `${step.color}08` }}
            >
              {step.num}
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}30` }}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: step.color, background: `${step.color}15`, border: `1px solid ${step.color}25` }}
                  >
                    Adım {step.num}
                  </span>
                  <span
                    className="text-xs font-semibold text-black px-3 py-1 rounded-full"
                    style={{ background: step.color }}
                  >
                    {step.highlight}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-1">{step.title}</h3>
                <p className="text-sm mb-3" style={{ color: step.color }}>{step.subtitle}</p>
                <p className="text-textMuted text-sm leading-relaxed max-w-xl">{step.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Why us CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-textMuted text-lg mb-6">
          Rakiplerimiz hâlâ insan operatörü bekliyor. Biz beklemiyoruz.
        </p>
        <Link
          href="/#waitlist"
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-black hover:shadow-neon-primary hover:scale-[1.02] transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg,#00e5ff,#00b8cc)' }}
        >
          Projeye Ön Erişim Al
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}
