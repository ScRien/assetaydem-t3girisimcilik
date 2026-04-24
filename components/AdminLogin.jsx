'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState('loading');
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      setState('error');
      setError(data.error || 'Giriş başarısız.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="glass rounded-2xl p-8 border border-white/10 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Image src="/logo.png" alt="Airdus Remote Logo" width={28} height={28} className="object-contain drop-shadow-md" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-white">Admin Paneli</h1>
            <p className="text-textMuted text-sm text-center">
              Ön erişim listesini görüntülemek için şifrenizi girin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (state === 'error') setState('idle'); }}
                placeholder="Yönetici şifresi"
                required
                className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder-textMuted text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-white transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {state === 'error' && error && (
              <div className="flex items-center gap-2 text-xs text-red-400">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm text-black transition-all hover:shadow-neon-primary disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg,#00e5ff,#00b8cc)' }}
            >
              {state === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
              {state === 'loading' ? 'Kontrol ediliyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
