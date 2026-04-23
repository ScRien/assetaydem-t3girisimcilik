import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Globe, Users, ArrowRight, TreePine, Flame } from 'lucide-react';

function Section({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const timeline = [
  { year: '2023', title: 'Fikir & Kavram', desc: 'T3 Girişimcilik programı kapsamında konsept geliştirme ve literatür araştırması.' },
  { year: '2024 Q1', title: 'ASSET 2.0 Prototip', desc: 'İlk sensör düğümü prototipi. BLE bağlantısı ve düşük güç testi.' },
  { year: '2024 Q2', title: 'AYDEM Hangar', desc: 'Drone hangarı mekanik tasarımı, otonom kapak sistemi ve Contact Charging.' },
  { year: '2024 Q3', title: 'Edge AI Entegrasyon', desc: 'YOLOv8 modelinin Deneyap Kart üzerinde optimizasyonu, saha testi.' },
  { year: '2024 Q4', title: 'Entegre Sistem Testi', desc: 'Uçtan uca sistem entegrasyon testi. Başarı oranı %98.5.' },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      {/* Page header */}
      <div className="max-w-3xl mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold text-primary uppercase tracking-widest"
        >
          Vizyon & Misyon
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-4xl md:text-5xl text-white mt-3 mb-5 leading-tight"
        >
          Ormanlarımızı Koruma<br />
          <span
            style={{
              background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            İnsansız Misyonu
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-textMuted text-lg leading-relaxed"
        >
          Türkiye her yıl on binlerce hektarı bulan orman yangınlarıyla mücadele etmektedir. ASSET & AYDEM,
          bu felakete karşı insan müdahalesini beklemeyen otonom ve kalıcı bir çözüm sunar.
        </motion.p>
      </div>

      {/* Problem / Solution split */}
      <div className="grid md:grid-cols-2 gap-6 mb-20">
        <Section delay={0.1}>
          <div className="glass rounded-3xl p-8 border border-white/7 h-full flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Flame size={20} />
              </div>
              <h2 className="font-heading font-bold text-xl text-white">Problem</h2>
            </div>
            <p className="text-textMuted leading-relaxed">
              Geleneksel yangın tespiti insana bağımlı, gecikmeye açık ve bölge koşullarına duyarlıdır.
              İlk 15 dakika kritiktir — bu pencerede müdahale yapılamazsa yangın kontrolden çıkar.
            </p>
            <ul className="space-y-2 text-sm text-textMuted mt-auto">
              {['Gecikmeli insan tespiti', 'Sınırlı kapsama alanı', 'Ekip ulaşım güçlüğü', 'Gece/duman körü görüş'].map(p => (
                <li key={p} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section delay={0.2}>
          <div
            className="glass rounded-3xl p-8 border h-full flex flex-col gap-5"
            style={{ borderColor: 'rgba(0,229,255,0.2)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <TreePine size={20} />
              </div>
              <h2 className="font-heading font-bold text-xl text-white">Çözüm: ASSET & AYDEM</h2>
            </div>
            <p className="text-textMuted leading-relaxed">
              Yerleşik sensör ağı + otonom drone filosu = 7/24 uyanık, insan beklemeyen, yapay zeka destekli
              savunma kalkanı. İlk tespitten müdahaleye &lt;5 dakika.
            </p>
            <ul className="space-y-2 text-sm text-textMuted mt-auto">
              {['Anlık termal & duman tespiti', 'LoRa hibrit ağ (internet bağımsız)', 'YOLOv8 gerçek zamanlı AI', 'Otonom kimyasal müdahale'].map(p => (
                <li key={p} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>

      {/* Value props */}
      <Section>
        <div className="grid sm:grid-cols-3 gap-5 mb-20">
          {[
            { icon: <Target size={22} />, title: 'Amacımız', body: 'Orman yangınını başlangıç noktasında, &lt;5 dakika içinde tespit edip otonom müdahaleyle söndürmek veya izole etmek.' },
            { icon: <Users size={22} />, title: 'Ekibimiz', body: 'T3 Girişimcilik programı bünyesinde çalışan mühendislik öğrencileri, yapay zeka ve donanım meraklılarından oluşan çok disiplinli ekip.' },
            { icon: <Globe size={22} />, title: 'Vizyonumuz', body: 'Orman savunmasından başlayarak sınır güvenliği ve arama-kurtarma operasyonlarına kadar genişleyen küresel ölçekli otonom ağ.' },
          ].map(({ icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 border border-white/7 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                {icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-white">{title}</h3>
              <p className="text-textMuted text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <div className="mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Yol Haritası</span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mt-2">Proje Zaman Çizelgesi</h2>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-transparent" />

          <div className="space-y-8">
            {timeline.map(({ year, title, desc }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex items-start gap-6 pl-14"
              >
                {/* Dot */}
                <div className="absolute left-[18px] w-3 h-3 rounded-full bg-primary border-2 border-background -translate-y-0.5" />
                <div>
                  <span className="text-xs font-bold text-primary">{year}</span>
                  <h4 className="font-heading font-bold text-white mt-0.5">{title}</h4>
                  <p className="text-textMuted text-sm mt-1">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div
          className="mt-20 rounded-3xl p-10 text-center flex flex-col items-center gap-6 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(124,58,237,0.05) 100%)',
            borderColor: 'rgba(0,229,255,0.15)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,229,255,0.08), transparent 60%)' }}
          />
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-white relative z-10">
            Teknik Detaylara Dalmaya Hazır Mısınız?
          </h3>
          <p className="text-textMuted max-w-lg relative z-10">
            Donanım bileşenlerinden AI model mimarisine, haberleşme protokollerinden fail-safe senaryolarına kadar tüm detaylar burada.
          </p>
          <Link
            to="/technical"
            className="relative z-10 flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-black hover:shadow-neon-primary hover:scale-[1.02] active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #00b8cc 100%)' }}
          >
            Teknik Mimariyi İncele
            <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </div>
  );
}