'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero3D — Pure HTML5 Canvas particle sphere animation.
 * Renders 1800 particles on a rotating sphere with cyan→violet gradient,
 * inner wireframe core, and three orbital rings.
 * No Three.js / React Three Fiber dependency — zero compatibility issues.
 */
export default function Hero3D() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const COUNT = 1800;
    const RADIUS = Math.min(width, height) * 0.32;

    // Build particle sphere
    const particles = Array.from({ length: COUNT }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = RADIUS * (0.88 + Math.random() * 0.24);
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        t: Math.random(),
        size: 0.7 + Math.random() * 1.3,
      };
    });

    // Orbital ring helpers
    function makeRing(radius, segments = 120) {
      return Array.from({ length: segments }, (_, i) => {
        const a = (i / segments) * Math.PI * 2;
        return { x: Math.cos(a) * radius, y: Math.sin(a) * radius, z: 0 };
      });
    }

    const rings = [
      { pts: makeRing(RADIUS * 1.1), tilt: Math.PI / 3, speed: 0.25, color: 'rgba(0,229,255,0.35)' },
      { pts: makeRing(RADIUS * 1.28), tilt: Math.PI / 5, speed: -0.18, color: 'rgba(0,229,255,0.2)' },
      { pts: makeRing(RADIUS * 1.45), tilt: Math.PI / 1.6, speed: 0.12, color: 'rgba(124,58,237,0.28)' },
    ];

    function rotY(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { ...p, x: p.x * c - p.z * s, z: p.x * s + p.z * c };
    }
    function rotX(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { ...p, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    }

    function draw(ts) {
      const rotAngle = ts * 0.00035;
      const cx = width / 2, cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Central background glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS * 0.6);
      grd.addColorStop(0, 'rgba(0,229,255,0.10)');
      grd.addColorStop(0.5, 'rgba(124,58,237,0.05)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      // Orbital rings
      rings.forEach((ring) => {
        const ra = ts * 0.001 * ring.speed;
        const transformed = ring.pts.map((p) => rotY(rotX(p, ring.tilt), rotAngle + ra));
        ctx.beginPath();
        transformed.forEach((p, i) => {
          const persp = 600 / (600 + p.z);
          const sx = cx + p.x * persp, sy = cy + p.y * persp;
          i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        });
        ctx.closePath();
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Particles (depth-sorted)
      particles
        .map((p) => {
          let q = rotY(p, rotAngle);
          q = rotX(q, rotAngle * 0.55);
          return { ...q, t: p.t, size: p.size };
        })
        .sort((a, b) => a.z - b.z)
        .forEach((p) => {
          const persp = 600 / (600 + p.z);
          const sx = cx + p.x * persp, sy = cy + p.y * persp;
          const sz = p.size * persp;
          const depth = (p.z + RADIUS) / (RADIUS * 2);
          const alpha = 0.2 + 0.8 * depth;
          const t = p.t;
          const r = Math.round(t < 0.5 ? 0 : (t - 0.5) * 2 * 124);
          const g = Math.round(Math.max(0, 229 - t * 320));
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(0.3, sz), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},255,${alpha.toFixed(2)})`;
          ctx.fill();
        });

      // Inner wireframe core
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS * 0.38);
      cg.addColorStop(0, 'rgba(0,229,255,0.16)');
      cg.addColorStop(1, 'transparent');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, width, height);

      const CR = RADIUS * 0.3;
      ctx.strokeStyle = 'rgba(0,229,255,0.2)';
      ctx.lineWidth = 0.7;
      for (let i = 0; i < 8; i++) {
        const a1 = (i / 8) * Math.PI * 2 + rotAngle * 1.2;
        const a2 = ((i + 1) / 8) * Math.PI * 2 + rotAngle * 1.2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a1) * CR, cy + Math.sin(a1) * CR * 0.6);
        ctx.lineTo(cx + Math.cos(a2) * CR, cy + Math.sin(a2) * CR * 0.6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a1) * CR, cy + Math.sin(a1) * CR * 0.6);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-label="Airdus Remote sistem animasyonu"
    />
  );
}
