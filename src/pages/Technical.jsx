import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Wifi, ShieldAlert, Map, Crosshair, Server, Zap } from 'lucide-react';

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const communicationLayers = [
  { from: 'ASSET 2.0', to: 'ASSET 2.1', proto: 'BLE / LoRa (Kısa)', desc: 'Ham sıcaklık/gaz verisi aktarımı', color: '#00e5ff' },
  { from: 'ASSET 2.1', to: 'AYDEM Hangar', proto: 'LoRa 433MHz (Uzun)', desc: 'Doğrulanmış alarm paketleri', color: '#7c3aed' },
  { from: 'AYDEM Hangar', to: 'Drone Filosu', proto: 'MavLink / Radio Link', desc: 'Koordinat atama, görev emri', color: '#ff6b35' },
  { from: 'AYDEM Hangar', to: 'Bulut/Komuta', proto: 'MQTT / GSM / Starlink', desc: 'Uzaktan izleme, raporlama', color: '#00e5ff' },
];

const droneTypes = [
  {
    id: 'detection',
    name: 'Asset Out — Detection',
    subtitle: 'Keşif & Termal Tespit',
    icon: <Map size={20} />,
    color: '#00e5ff',
    sensors: ['FLIR Lepton 3.5 Termal', 'Benewake TFmini LiDAR', 'mmWave Radar', 'ESP32-CAM Optik'],
    features: ['Duman arkası ısı çekirdeği tespiti', '360° gece görüşü', 'Aruco Marker hassas iniş', 'Radyometrik termal koordinat'],
  },
  {
    id: 'capsule',
    name: 'Asset Out — Capsule',
    subtitle: 'Kimyasal Müdahale',
    icon: <Crosshair size={20} />,
    color: '#7c3aed',
    sensors: ['Darbe sensörü', 'Kapsül dağıtım mekanizması'],
    features: ['Monoamonyum Fosfat (MAP) kapsül', 'Yangın çekirdeğine anlık söndürme', 'Oksijen kesme stratejisi', 'Çoklu atış kapasitesi'],
  },
  {
    id: 'obstacle',
    name: 'Asset Out — Obstacle',
    subtitle: 'Bariyer Oluşturma',
    icon: <ShieldAlert size={20} />,
    color: '#ff6b35',
    sensors: ['Akış kontrol sensörü', 'Basınç regulatörü'],
    features: ['Amonyum polifosfat bazlı sıvı', 'Yanmayan koridor oluşturma', 'Rüzgar yönü güdümlü püskürtme', 'Geniş alan bariyer kapasitesi'],
  },
];

const hwComponents = [
  { label: 'İşlemci (Hangar)', value: 'AMD Ryzen 5 3500U — G10 Mini PC', icon: <Cpu size={16} />, color: '#00e5ff' },
  { label: 'RAM', value: '16 GB DDR4', icon: <Server size={16} />, color: '#7c3aed' },
  { label: 'Uçuş Kontrolcü', value: 'Pixhawk 4/6C', icon: <Zap size={16} />, color: '#ff6b35' },
  { label: 'AI Kontrolcü', value: 'Deneyap Kart 1A v2', icon: <Cpu size={16} />, color: '#00e5ff' },
  { label: 'Haberleşme', value: 'E32-433T20D LoRa Modülü + ZTE MG2618 GSM', icon: <Wifi size={16} />, color: '#7c3aed' },
  { label: 'Termal Kamera', value: 'FLIR Lepton 3.5', icon: <Map size={16} />, color: '#ff6b35' },
  { label: 'Güneş Paneli', value: '200W Monokristal', icon: <Zap size={16} />, color: '#00e5ff' },
  { label: 'Batarya', value: '40Ah LiFePO4', icon: <Zap size={16} />, color: '#7c3aed' },
];

export default function Technical() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="max-w-3xl mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold text-primary uppercase tracking-widest"
        >
          Teknik Mimari
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-4xl md:text-5xl text-white mt-3 mb-5 leading-tight"
        >
          Sistem Mimarisi &<br />
          <span
            style={{
              background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Donanım Detayları
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-textMuted text-lg leading-relaxed"
        >
          Üç katmanlı ASSET sensör hiyerarşisinden AYDEM Hangar'ın Edge AI motoruna,
          drone filosunun görev spesifikasyonlarından fail-safe protokollerine kadar teknik tam resim.
        </motion.p>
      </div>

      {/* 3-Layer Architecture */}
      <FadeIn>
        <div className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-white mb-8">
            <span className="text-primary mr-2">01</span> Üç Katmanlı Sistem Hiyerarşisi
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { num: '2.0', title: 'Uç Sensörler', desc: 'Ormanın derinliklerine yerleştirilen düşük enerjili duman ve sıcaklık sensörleri. Yalnızca veri toplar, en yakın 2.1 modülüne iletir.', color: '#00e5ff' },
              { num: '2.1', title: 'Toplayıcı / Hub', desc: '2.0 modüllerinden gelen verileri paketler, doğrular ve uzun menzilli LoRa hattı üzerinden AYDEM Hangar\'a iletir.', color: '#7c3aed' },
              { num: 'AYDEM', title: 'Hangar — Karar Merkezi', desc: 'Tüm sistemin beynidir. YOLOv8 ile veriyi analiz eder, drone filosunu sevk eder, kara kutu kaydı tutar.', color: '#ff6b35' },
            ].map(({ num, title, desc, color }) => (
              <div
                key={num}
                className="glass rounded-2xl p-6 border flex flex-col gap-3"
                style={{ borderColor: `${color}25` }}
              >
                <div
                  className="font-heading font-black text-4xl"
                  style={{ color: `${color}40` }}
                >
                  {num}
                </div>
                <h3 className="font-heading font-bold text-lg text-white">{title}</h3>
                <p className="text-textMuted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Hardware table */}
      <FadeIn delay={0.1}>
        <div className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-white mb-8">
            <span className="text-primary mr-2">02</span> Donanım Bileşenleri
          </h2>
          <div className="glass rounded-2xl overflow-hidden border border-white/7">
            <div className="divide-y divide-white/5">
              {hwComponents.map(({ label, value, icon, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}20` }}
                  >
                    {icon}
                  </div>
                  <span className="text-textMuted text-sm w-40 shrink-0">{label}</span>
                  <span className="text-white text-sm font-medium">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Communication Layers */}
      <FadeIn delay={0.15}>
        <div className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-white mb-8">
            <span className="text-primary mr-2">03</span> Haberleşme Protokol Katmanları
          </h2>
          <div className="space-y-3">
            {communicationLayers.map(({ from, to, proto, desc, color }, i) => (
              <motion.div
                key={proto}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl px-6 py-4 border border-white/7 flex flex-wrap items-center gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-sm font-semibold text-white whitespace-nowrap">{from}</span>
                  <div className="flex items-center gap-1 text-textMuted">
                    <span className="h-px w-8" style={{ background: color }} />
                    <svg width="8" height="8" viewBox="0 0 8 8" fill={color}><path d="M0 4h6M4 1l3 3-3 3" stroke={color} strokeWidth="1.5" fill="none" /></svg>
                  </div>
                  <span className="text-sm font-semibold text-white whitespace-nowrap">{to}</span>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                  style={{ color, background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  {proto}
                </span>
                <span className="text-textMuted text-sm ml-auto">{desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Drone types */}
      <FadeIn delay={0.2}>
        <div className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-white mb-8">
            <span className="text-primary mr-2">04</span> İHA Filosu — Görev Spesifikasyonları
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {droneTypes.map((drone, i) => (
              <motion.div
                key={drone.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border flex flex-col gap-4"
                style={{ borderColor: `${drone.color}20` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${drone.color}15`, color: drone.color, border: `1px solid ${drone.color}25` }}
                >
                  {drone.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">{drone.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: drone.color }}>{drone.subtitle}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-2">Sensörler</p>
                  <ul className="space-y-1">
                    {drone.sensors.map(s => (
                      <li key={s} className="text-xs text-textMuted flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: drone.color }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-2">Yetenekler</p>
                  <ul className="space-y-1">
                    {drone.features.map(f => (
                      <li key={f} className="text-xs text-white/70 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Fail-Safe */}
      <FadeIn delay={0.25}>
        <div
          className="rounded-3xl p-8 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,229,255,0.04), rgba(124,58,237,0.04))',
            borderColor: 'rgba(0,229,255,0.2)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 0% 0%, rgba(0,229,255,0.08), transparent 50%)' }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <ShieldAlert size={20} />
              </div>
              <h2 className="font-heading font-bold text-2xl text-white">
                <span className="text-primary mr-2">05</span> Fail-Safe & Yasal Uyumluluk
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Haberleşme kaybında drone otomatik RTL (Eve Dön) moduna geçer',
                'Sanal çit (Geo-Fencing) ile uçuş alanı dışına çıkış engellenir',
                'Düşük batarya güvenliği: kritik eşikte otomatik iniş',
                'SHT-İHA yönetmeliklerine %100 uyum, Remote ID yayını aktif',
                'Tüm uçuş verileri Mini PC kara kutusuna kaydedilir',
                'Hangar kapağı mekanik sıkışmalara karşı akım korumalı aktüatör',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-textMuted">
                  <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary text-xs">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}