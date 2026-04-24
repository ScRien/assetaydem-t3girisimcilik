'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, ShieldCheck, Sun } from 'lucide-react';

const items = [
  {
    id: 'sensor',
    span: 'lg:col-span-2',
    icon: <Activity size={28} />,
    color: '#00e5ff',
    tag: 'ASSET 2.0 → 2.1',
    title: 'Sensör Ağı Anatomisi',
    body: 'Asset 2.0 uç düğümleri, ormanın içine gömülü düşük enerjili algılayıcılardır. Yalnızca ham veri toplar ve en yakın 2.1 Hub\'a aktarır. Hub\'lar veriyi paketler, doğrular ve LoRa 433MHz hattıyla Hangar\'a uçurur. Tüm katman internet bağımsız çalışır.',
    pills: ['BLE 5.0', 'LoRa 433MHz', 'E32-433T20D', 'Düşük Güç Modu'],
    visual: (
      <div className="relative mt-4 h-20 flex items-end">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${i * 22}%`, bottom: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2, ease: 'easeInOut' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-primary/40 border border-primary/60" />
          </motion.div>
        ))}
        <div className="absolute right-0 bottom-0 w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
          <Activity size={14} className="text-primary" />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(0,229,255,0.4),transparent)' }}
        />
      </div>
    ),
  },
  {
    id: 'hangar',
    span: 'lg:col-span-1',
    icon: <ShieldCheck size={28} />,
    color: '#7c3aed',
    tag: 'AYDEM Hangar',
    title: 'Bağımsız Komuta',
    body: 'G10 Mini PC (Ryzen 5, 16GB RAM) sistemin beynidir. YOLOv8 modelleri Edge AI kararlarını yerel olarak verir. MavLink Gateway, drone filosunu yönetir. Tüm uçuş verileri kara kutuda saklanır.',
    pills: ['Edge AI YOLOv8', 'MavLink', 'MQTT Broker', 'Kara Kutu'],
    visual: null,
  },
  {
    id: 'energy',
    span: 'lg:col-span-1',
    icon: <Sun size={28} />,
    color: '#ff6b35',
    tag: 'Enerji Mimarisi',
    title: 'Sonsuz Güç Döngüsü',
    body: '200W monokristal panel → MPPT şarj kontrolcüsü → 40Ah LiFePO4. Hem hangar hem drone için şebekeden tamamen bağımsız UPS görevi görür.',
    pills: ['200W Solar', '40Ah LiFePO4', 'MPPT', 'Contact Charging'],
    visual: null,
  },
];

function BentoCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      id={`bento-${item.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative glass rounded-3xl p-7 border border-white/5 hover:border-white/12 transition-all duration-300 overflow-hidden ${item.span}`}
    >
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${item.color}15, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />

      <div className="relative z-10 flex flex-col h-full gap-4">
        <div className="flex items-start justify-between gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}
          >
            {item.icon}
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap"
            style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}25` }}
          >
            {item.tag}
          </span>
        </div>

        <div>
          <h3 className="font-heading font-bold text-xl text-white mb-2">{item.title}</h3>
          <p className="text-textMuted text-sm leading-relaxed">{item.body}</p>
        </div>

        {item.visual}

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
          {item.pills.map((p) => (
            <span
              key={p}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ color: `${item.color}cc`, background: `${item.color}10`, border: `1px solid ${item.color}20` }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoBox() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="system" className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="text-xs font-bold text-primary uppercase tracking-widest">Sistem Anatomisi</span>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mt-2 mb-3">
          Her Parça Bağımsız,<br />Birlikte Güçlü
        </h2>
        <p className="text-textMuted max-w-lg">
          Tek bir bileşenin arızası sistemi durdurmaz. Her modül izole çalışabilir.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <BentoCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
