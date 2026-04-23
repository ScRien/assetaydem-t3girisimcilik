import { useEffect, useRef } from 'react';

/**
 * Pure HTML5 Canvas particle sphere — no Three.js / R3F dependency.
 * Renders ~1800 particles on a rotating sphere with cyan→purple gradient,
 * inner wireframe icosahedron simulation, and three orbit rings.
 */
export default function Hero3D() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // --- Particle data --------------------------------------------------
    const COUNT = 1800;
    const RADIUS = Math.min(width, height) * 0.32;

    const particles = Array.from({ length: COUNT }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = RADIUS * (0.88 + Math.random() * 0.24);
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        t: Math.random(), // color lerp factor
        size: 0.8 + Math.random() * 1.2,
      };
    });

    // --- Orbit ring vertices -------------------------------------------
    function makeRing(radius, segments = 120) {
      return Array.from({ length: segments }, (_, i) => {
        const a = (i / segments) * Math.PI * 2;
        return { x: Math.cos(a) * radius, y: Math.sin(a) * radius, z: 0 };
      });
    }

    const rings = [
      { pts: makeRing(RADIUS * 1.1), tilt: Math.PI / 3, speed: 0.25, color: 'rgba(0,229,255,0.35)' },
      { pts: makeRing(RADIUS * 1.28), tilt: Math.PI / 5, speed: -0.18, color: 'rgba(0,229,255,0.2)' },
      { pts: makeRing(RADIUS * 1.45), tilt: Math.PI / 1.6, speed: 0.12, color: 'rgba(124,58,237,0.25)' },
    ];

    // --- 3D rotation helpers -------------------------------------------
    function rotY(p, a) {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { ...p, x: p.x * cos - p.z * sin, z: p.x * sin + p.z * cos };
    }
    function rotX(p, a) {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { ...p, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    }

    let rotAngle = 0;

    // --- Draw loop ----------------------------------------------------- 
    function draw(ts) {
      rotAngle = ts * 0.00035;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Central glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS * 0.55);
      grd.addColorStop(0, 'rgba(0,229,255,0.12)');
      grd.addColorStop(0.5, 'rgba(124,58,237,0.06)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      // --- Orbit rings ---
      rings.forEach((ring, ri) => {
        const ringAngle = ts * 0.001 * ring.speed;
        const tilt = ring.tilt;
        const transformed = ring.pts.map(p => {
          // tilt around X then rotate around Y
          let q = rotX(p, tilt);
          q = rotY(q, rotAngle + ringAngle);
          return q;
        });

        // Sort by z (painter's algo)
        ctx.beginPath();
        transformed.forEach((p, i) => {
          const perspective = 600 / (600 + p.z);
          const sx = cx + p.x * perspective;
          const sy = cy + p.y * perspective;
          const alpha = 0.15 + 0.35 * ((p.z + RADIUS * 1.5) / (RADIUS * 3));
          if (i === 0) {
            ctx.moveTo(sx, sy);
          } else {
            ctx.lineTo(sx, sy);
          }
        });
        ctx.closePath();
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // --- Particles ---
      // Sort by z to fake depth
      const sorted = particles
        .map(p => {
          let q = rotY(p, rotAngle);
          q = rotX(q, rotAngle * 0.55);
          return { ...q, t: p.t, size: p.size };
        })
        .sort((a, b) => a.z - b.z);

      sorted.forEach(p => {
        const perspective = 600 / (600 + p.z);
        const sx = cx + p.x * perspective;
        const sy = cy + p.y * perspective;
        const sz = p.size * perspective;

        // Depth-based brightness
        const depth = (p.z + RADIUS) / (RADIUS * 2); // 0..1
        const alpha = 0.25 + 0.75 * depth;

        // Cyan→Purple gradient based on t
        const t = p.t;
        const r = Math.round(t < 0.5 ? 0 : (t - 0.5) * 2 * 124);
        const g = Math.round(t < 0.5 ? 229 * (1 - t * 1.4) : Math.max(0, 229 - (t) * 300));
        const b = 255;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.3, sz), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${Math.max(0, g)},${b},${alpha.toFixed(2)})`;
        ctx.fill();
      });

      // --- Inner wireframe glow core ---
      const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS * 0.35);
      coreGrd.addColorStop(0, 'rgba(0,229,255,0.18)');
      coreGrd.addColorStop(0.6, 'rgba(0,229,255,0.06)');
      coreGrd.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrd;
      ctx.fillRect(0, 0, width, height);

      // Core wireframe (approximated as rotating hexagon lines)
      const CR = RADIUS * 0.32;
      const faces = 8;
      ctx.strokeStyle = 'rgba(0,229,255,0.18)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < faces; i++) {
        const a1 = (i / faces) * Math.PI * 2 + rotAngle * 1.2;
        const a2 = ((i + 1) / faces) * Math.PI * 2 + rotAngle * 1.2;
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

    // --- Resize handler ------------------------------------------------
    const onResize = () => {
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
      className="w-full h-full"
      aria-label="Otonom Savunma Sistemi — 3D Parçacık Animasyonu"
      style={{ display: 'block' }}
    />
  );
}
