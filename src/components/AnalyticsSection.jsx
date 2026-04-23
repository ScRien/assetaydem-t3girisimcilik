import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, Cell,
} from 'recharts';

// Detection response time across scenarios
const responseData = [
  { time: '06:00', tespit: 280, müdahale: 480 },
  { time: '08:00', tespit: 260, müdahale: 440 },
  { time: '10:00', tespit: 310, müdahale: 520 },
  { time: '12:00', tespit: 240, müdahale: 400 },
  { time: '14:00', tespit: 290, müdahale: 460 },
  { time: '16:00', tespit: 270, müdahale: 430 },
  { time: '18:00', tespit: 255, müdahale: 410 },
];

// System capability matrix
const radarData = [
  { metric: 'Tespit Hızı', value: 95 },
  { metric: 'Enerji Verimliliği', value: 87 },
  { metric: 'Kapsama Alanı', value: 78 },
  { metric: 'Fail-Safe', value: 99 },
  { metric: 'AI Doğruluğu', value: 98 },
  { metric: 'Otonom Müdahale', value: 90 },
];

// Coverage comparison
const coverageData = [
  { name: 'Geleneksel', value: 23, color: '#374151' },
  { name: 'ASSET 1.0', value: 58, color: '#0099cc' },
  { name: 'ASSET 2.1', value: 97, color: '#00e5ff' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl px-4 py-3 border border-white/10 shadow-card">
        {label && <div className="text-xs text-textMuted mb-1.5">{label}</div>}
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-white font-medium">{entry.value} {entry.unit || 'ms'}</span>
            <span className="text-textMuted capitalize">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function SectionTitle({ label, title, sub }) {
  return (
    <div className="flex flex-col gap-2 mb-12">
      <span className="text-xs font-semibold text-primary uppercase tracking-widest">{label}</span>
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-white">{title}</h2>
      {sub && <p className="text-textMuted max-w-lg">{sub}</p>}
    </div>
  );
}

function ChartCard({ title, children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-2xl p-6 border border-white/7 ${className}`}
    >
      <h3 className="text-sm font-semibold text-textMuted mb-5 uppercase tracking-wide">{title}</h3>
      {children}
    </motion.div>
  );
}

export default function AnalyticsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="analytics" className="py-28 max-w-7xl mx-auto px-6 lg:px-8" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle
          label="Veri Görselleştirme"
          title="Sistem Performans Analitiği"
          sub="Gerçek zamanlı ölçümler ve karşılaştırmalı analizlerle ASSET & AYDEM'in üstünlüğünü somut verilerle görün."
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart - spans 2 cols */}
        <ChartCard title="Tespit & Müdahale Süresi (ms) — Günlük Dağılım" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={responseData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="colorTespit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMüdahale" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="tespit"
                stroke="#00e5ff"
                strokeWidth={2}
                fill="url(#colorTespit)"
                dot={false}
                activeDot={{ r: 4, fill: '#00e5ff' }}
              />
              <Area
                type="monotone"
                dataKey="müdahale"
                stroke="#7c3aed"
                strokeWidth={2}
                fill="url(#colorMüdahale)"
                dot={false}
                activeDot={{ r: 4, fill: '#7c3aed' }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-2 text-xs text-textMuted">
              <span className="w-3 h-0.5 rounded-full bg-primary" />
              Tespit Süresi
            </div>
            <div className="flex items-center gap-2 text-xs text-textMuted">
              <span className="w-3 h-0.5 rounded-full bg-secondary" />
              Müdahale Süresi
            </div>
          </div>
        </ChartCard>

        {/* Radar Chart */}
        <ChartCard title="Sistem Kapasite Matrisi (%)">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Radar
                name="Kapasite"
                dataKey="value"
                stroke="#00e5ff"
                strokeWidth={1.5}
                fill="#00e5ff"
                fillOpacity={0.12}
                dot={{ fill: '#00e5ff', r: 3 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar Chart - coverage comparison */}
        <ChartCard title="Alan Kapsama Başarısı Karşılaştırması (%)" className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={coverageData} barCategoryGap="35%" margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass rounded-xl px-4 py-3 border border-white/10">
                          <span className="text-white font-bold text-lg">{payload[0].value}%</span>
                          <span className="text-textMuted text-xs block">{payload[0].payload.name}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {coverageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              {coverageData.map(({ name, value, color }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-textMuted">{name}</span>
                    <span className="font-bold text-white">{value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>
    </section>
  );
}
