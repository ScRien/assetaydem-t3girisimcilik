import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Wifi, Crosshair, ShieldCheck, Zap, Eye } from 'lucide-react';

const features = [
  {
    icon: <Cpu size={22} />,
    color: '#00e5ff',
    tag: 'ASSET 2.0 / 2.1',
    title: 'Hiyerarşik Sensör Ağı',
    desc: 'Ormanın kılcallarına gömülü düşük güçlü duman/sıcaklık düğümleri, BLE ile hub\'lara aktar. LoRa 433MHz ile merkeze iletir.',
    stat: '2.4km Menzil',
  },
  {
    icon: <Eye size={22} />,
    color: '#7c3aed',
    tag: 'ASSET Out - Detection',
    title: 'Termal Keşif Drone\'u',
    desc: 'FLIR Lepton 3.5 termal sensör, LiDAR ve mmWave radarla duman arkasındaki ısı çekirdeklerini santimetrik hassasiyetle tespit eder.',
    stat: '360° Koruma',
  },
  {
    icon: <Crosshair size={22} />,
    color: '#ff6b35',
    tag: 'ASSET Out - Capsule',
    title: 'Kimyasal Müdahale',
    desc: 'Yangın çekirdeğine MAP (Monoamonyum Fosfat) kapsülleri fırlatır. Oksijenle temasın kesilmesiyle anlık söndürme sağlar.',
    stat: 'Anlık Tepki',
  },
  {
    icon: <ShieldCheck size={22} />,
    color: '#00e5ff',
    tag: 'ASSET Out - Obstacle',
    title: 'Yangın Bariyer Sistemi',
    desc: 'Amonyum polifosfat bazlı geciktirici sıvı ile yayılma hattına yanmayan koridorlar oluşturur. Ormanı böler, yangını izole eder.',
    stat: '+500m Bariyer',
  },
  {
    icon: <Wifi size={22} />,
    color: '#7c3aed',
    tag: 'Haberleşme',
    title: 'Hibrit İletişim Katmanı',
    desc: 'BLE → LoRa → MavLink → MQTT → GSM/Starlink zinciri. Her halkada redundancy: internet kesilse bile sistem çalışır.',
    stat: '5 Katman',
  },
  {
    icon: <Zap size={22} />,
    color: '#ff6b35',
    tag: 'Enerji',
    title: 'Kesintisiz Güç Döngüsü',
    desc: '200W monokristal güneş + 40Ah LiFePO4 batarya. Hangar ve drone filo için şebekeden bağımsız UPS görevi görür.',
    stat: '7/24 Otonom',
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at top left, ${feature.color}10, transparent 60%)`,
        }}
      />

      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${feature.color}15`,
          border: `1px solid ${feature.color}30`,
          color: feature.color,
        }}
      >
        {feature.icon}
      </div>

      <div className="flex flex-col gap-1.5">
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: feature.color }}
        >
          {feature.tag}
        </span>
        <h3 className="font-heading font-bold text-lg text-white leading-snug">{feature.title}</h3>
        <p className="text-textMuted text-sm leading-relaxed">{feature.desc}</p>
      </div>

      <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs font-semibold text-white/60">{feature.stat}</span>
        <div
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: feature.color }}
        />
      </div>
    </motion.div>
  );
}

export default function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="py-28 max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="text-xs font-bold text-primary uppercase tracking-widest">Ekosistem Bileşenleri</span>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mt-2 mb-3">
          Uçtan Uca Savunma Katmanları
        </h2>
        <p className="text-textMuted max-w-xl">
          Altı temel bileşen, hiyerarşik bir ekosistem içinde birbirine bağlı çalışarak sıfır hata hedefler.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
