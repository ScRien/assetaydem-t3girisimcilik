'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, Trash2, Download, RefreshCw, LogOut, Users, Calendar, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('tr-TR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function exportCSV(entries) {
  const header = 'E-posta,IP Adresi,Kayıt Tarihi\n';
  const rows = entries.map((e) =>
    `"${e.email}","${e.ip}","${formatDate(e.registeredAt)}"`
  ).join('\n');
  const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `waitlist_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/entries');
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleDelete = async (id) => {
    if (!confirm('Bu kaydı silmek istediğinizden emin misiniz?')) return;
    setDeletingId(id);
    try {
      await fetch('/api/admin/entries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      {/* Ambient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 20% 20%, rgba(0,229,255,0.05), transparent 50%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Image src="/logo.png" alt="Airdus Remote Logo" width={24} height={24} className="object-contain drop-shadow-md" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-white">Admin Paneli</h1>
              <p className="text-xs text-textMuted">Airdus Remote — Ön Erişim Yönetimi</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchEntries}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass border border-white/10 text-xs text-textMuted hover:text-white transition-colors"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              Yenile
            </button>
            <button
              onClick={() => exportCSV(entries)}
              disabled={entries.length === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass border border-white/10 text-xs text-textMuted hover:text-white transition-colors disabled:opacity-40"
            >
              <Download size={13} />
              CSV İndir
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={13} />
              Çıkış
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Users size={18} />, label: 'Toplam Kayıt', value: entries.length, color: '#00e5ff' },
            { icon: <Calendar size={18} />, label: 'Son Kayıt', value: entries[0] ? formatDate(entries[0].registeredAt).split(' ')[0] : '—', color: '#7c3aed' },
            { icon: <Globe size={18} />, label: 'Benzersiz IP', value: new Set(entries.map((e) => e.ip)).size, color: '#ff6b35' },
          ].map(({ icon, label, value, color }) => (
            <div key={label} className="glass rounded-2xl p-5 border border-white/7 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
              >
                {icon}
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-white">{value}</div>
                <div className="text-xs text-textMuted">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="glass rounded-2xl border border-white/7 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-semibold text-white text-sm">Ön Erişim Listesi</h2>
            <span className="text-xs text-textMuted">{entries.length} kayıt</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw size={24} className="text-primary animate-spin" />
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16 text-textMuted text-sm">
              Henüz kayıt yok. Ana sayfadaki formu test edin.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-textMuted uppercase tracking-wider">E-posta</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-textMuted uppercase tracking-wider">Kayıt Tarihi</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-textMuted uppercase tracking-wider">IP Adresi</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {entries.map((entry, i) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-white/2 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium">{entry.email}</td>
                      <td className="px-6 py-4 text-textMuted text-xs font-mono">{formatDate(entry.registeredAt)}</td>
                      <td className="px-6 py-4 text-textMuted text-xs font-mono">{entry.ip}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          disabled={deletingId === entry.id}
                          className="p-1.5 rounded-lg text-textMuted hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
                          title="Sil"
                        >
                          <Trash2 size={14} className={deletingId === entry.id ? 'animate-pulse' : ''} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
