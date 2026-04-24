'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Cpu, Wifi, Eye, Crosshair, ShieldAlert, Zap, ChevronDown } from 'lucide-react';

const features = [
  {
    icon: <Cpu size={22} />, color: '#00e5ff', tag: 'ASSET 2.0 / 2.1',
    title: 'Hiyerarşik Sensör Ağı',
    short: 'BLE + LoRa ile kesintisiz, internetsiz veri akışı.',
    detail: 'Ormanın kılcallarına gömülü düşük enerjili duman ve sıcaklık sensörleri. Yalnızca veri toplar, en yakın 2.1 hub\'a BLE üzerinden aktarır. Hub, veriyi LoRa 433MHz ile AYDEM Hangar\'a uçurur. 5 km+ menzil, battarya ömrü yıllarca.',
    stat: '5km+ Menzil',
  },
  {
    icon: <Eye size={22} />, color: '#7c3aed', tag: 'Detection Drone',
    title: 'Termal Keşif Sistemi',
    short: 'FLIR Lepton ile duman arkasını görür.',
    detail: 'FLIR Lepton 3.5 termal kamera, Benewake TFmini LiDAR ve mmWave radar kombinasyonu. Gece körü, dumanlı ortamda dahi yangın çekirdeğini santimetrik hassasiyetle kilitler. Aruco Marker\'la hassas iniş ve otomatik şarj.',
    stat: '360° Görüş',
  },
  {
    icon: <Crosshair size={22} />, color: '#ff6b35', tag: 'Capsule Drone',
    title: 'Kimyasal Müdahale',
    short: 'MAP kapsülleriyle anlık söndürme.',
    detail: 'Monoamonyum Fosfat (MAP) bazlı darbe duyarlı kapsüller, yangın çekirdeğine isabetli şekilde bırakılır. Kapsül çarptığında serbest kalan MAp tozu, alevin oksijenle temasını keser. Klasik yangın söndürücüden 3x daha hızlı etki.',
    stat: 'Anlık Söndürme',
  },
  {
    icon: <ShieldAlert size={22} />, color: '#00e5ff', tag: 'Obstacle Drone',
    title: 'Yangın Bariyer Sistemi',
    short: 'Amonyum polifosfat ile yanmayan koridor.',
    detail: 'Yangın yayılma hattına amonyum polifosfat bazlı geciktirici sıvı püskürten drone. Sıvı bitki örtüsüne nüfuz ederek yanma eşiğini yükseltir. Böylece yangın izole edilir, çevreye yayılmaz.',
    stat: '+500m Bariyer',
  },
  {
    icon: <Wifi size={22} />, color: '#7c3aed', tag: 'İletişim',
    title: 'Hibrit Haberleşme',
    short: '5 katman: İnternet kesilse sistem çalışır.',
    detail: 'BLE → LoRa → MavLink → MQTT → GSM/Starlink zinciri. Her halka bağımsız çalışanabilir. GSM kesintisinde LoRa devreye girer. Starlink ile global izleme mümkün. ZTE MG2618 GSM modülü entegre.',
    stat: '5 Katman Güvenlik',
  },
  {
    icon: <Zap size={22} />, color: '#ff6b35', tag: 'Enerji',
    title: 'Off-Grid Enerji Döngüsü',
    short: '200W güneş + LiFePO4 → sonsuz çalışma.',
    detail: '200W monokristal güneş paneli → MPPT şarj kontrolcüsü → 40Ah LiFePO4 batarya bloğu. Şebekeden tamamen bağımsız. Kapasitörler aşırı akım koruması sağlar. Drone sisteme döndüğünde yaylar bakır rail ile otonom şarj.',
    stat: '7/24 Otonom',
  },
];

function FeatureCard({ feature, index }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 border border-white/5 hover:border-white/12 transition-all duration-300 flex flex-col gap-4 overflow-hidden group relative"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at top left, ${feature.color}10, transparent 60%)` }}
      />

      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${feature.color}15`, color: feature.color, border: `1px solid ${feature.color}30` }}
        >
          {feature.icon}
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
          style={{ color: feature.color, background: `${feature.color}12`, border: `1px solid ${feature.color}22` }}
        >
          {feature.tag}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-heading font-bold text-lg text-white">{feature.title}</h3>
        <p className="text-textMuted text-sm">{feature.short}</p>
      </div>

      {/* Expandable detail */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-medium transition-colors"
        style={{ color: feature.color }}
      >
        <span>{expanded ? 'Daha az gör' : 'Detayları gör'}</span>
        <ChevronDown size={12} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-textMuted text-xs leading-relaxed overflow-hidden border-t border-white/5 pt-3"
          >
            {feature.detail}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs font-semibold text-white/50">{feature.stat}</span>
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: feature.color }} />
      </div>
    </motion.div>
  );
}

export default function FeatureGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="py-28 max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="text-xs font-bold text-primary uppercase tracking-widest">Neden Bizi Seçmelisiniz?</span>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mt-2 mb-3">
          Her Katmanda Üstünlük
        </h2>
        <p className="text-textMuted max-w-xl">
          Rakipler tek bir noktaya odaklanır. Biz uçtan uca sorumluluk alıyoruz.
          Detay görmek için kartlara tıklayın.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}
