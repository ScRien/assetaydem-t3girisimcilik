import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, ShieldCheck, Sun } from 'lucide-react';

const bentoItems = [
  {
    id: 'sensor-net',
    span: 'lg:col-span-2',
    icon: <Activity size={28} />,
    color: '#00e5ff',
    tag: 'ASSET 2.0 → 2.1',
    title: 'Sensör Topografyası',
    body: 'Asset 2.0 düğümleri ormanın içine gömülü düşük enerjili uç noktalardır. Yalnızca ham sıcaklık ve duman verisi toplar, en yakın 2.1 Hub\'a iletir. 2.1 modüller bu veriyi paketler, doğrular ve LoRa 433MHz hattıyla AYDEM Hangar\'a uçurur.',
    pills: ['BLE 5.0', 'LoRa 433MHz', 'E32-433T20D', 'Düşük Güç Modu'],
    visual: (
      <div className="relative mt-4 h-24 flex items-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${i * 22}%` }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2, ease: 'easeInOut' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-primary/40 border border-primary/60" />
          </motion.div>
        ))}
        <div className="absolute right-0 w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
          <Activity size={14} className="text-primary" />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)' }}
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
    title: 'Komuta Merkezi',
    body: 'Mini PC (Ryzen 5, 16GB RAM) sistemin beynidir. YOLOv8, MavLink Gateway, yerel MQTT broker ve tüm kara kutu verisini yönetir.',
    pills: ['Edge AI', 'MavLink', 'MQTT', 'Aruco Iniş'],
    visual: null,
  },
  {
    id: 'energy',
    span: 'lg:col-span-1',
    icon: <Sun size={28} />,
    color: '#ff6b35',
    tag: 'Enerji Mimarisi',
    title: 'Off-Grid UPS Döngüsü',
    body: '200W monokristal panel → MPPT şarj kontrol → 40Ah LiFePO4. Hem hangar hem drone için kesintisiz güç kaynağı.',
    pills: ['200W Solar', '40Ah LiFePO4', 'MPPT', 'UPS'],
    visual: null,
  },
];

function BentoCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      id={`bento-${item.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative glass rounded-3xl p-7 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden ${item.span}`}
    >
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-0"
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
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
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
              style={{
                color: `${item.color}cc`,
                background: `${item.color}10`,
                border: `1px solid ${item.color}20`,
              }}
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
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="bento" className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="text-xs font-bold text-primary uppercase tracking-widest">Altyapı</span>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mt-2 mb-3">
          Sistem Anatomisi
        </h2>
        <p className="text-textMuted max-w-lg">
          Her modül, diğerlerine bağımlı ama tek başına da işlevsel. İzole hata, sistemi durdurmaz.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {bentoItems.map((item, i) => (
          <BentoCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
