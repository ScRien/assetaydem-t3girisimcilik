'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === 'loading' || state === 'success') return;

    setState('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setState('success');
        setEmail('');
      } else {
        setState('error');
        setMessage(data.error || 'Bir hata oluştu.');
      }
    } catch {
      setState('error');
      setMessage('Bağlantı hatası. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-10 border border-primary/20 text-center flex flex-col items-center gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center"
            >
              <CheckCircle2 size={32} className="text-primary" />
            </motion.div>
            <h3 className="font-heading font-bold text-2xl text-white">Listeye Eklendiniz!</h3>
            <p className="text-textMuted text-sm leading-relaxed max-w-xs">
              Proje lansmanında ilk sizi haberdar edeceğiz.
              Orman savunmasının geleceğine hoş geldiniz.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary/70 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Ön erişim listeniz onaylandı
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 border border-white/10 flex flex-col gap-4"
          >
            {/* Email input */}
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
                placeholder="ornek@email.com"
                required
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-textMuted text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Error message */}
            <AnimatePresence>
              {state === 'error' && message && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs text-red-400"
                >
                  <AlertCircle size={14} />
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={state === 'loading'}
              className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-sm text-black transition-all hover:shadow-neon-primary hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg,#00e5ff,#00b8cc)' }}
            >
              {state === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  Ön Erişime Katıl
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-textMuted">
              Spam göndermeyiz. İstediğiniz zaman çıkabilirsiniz.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
