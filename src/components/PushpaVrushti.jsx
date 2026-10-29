import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Flower2 } from 'lucide-react';

/**
 * PushpaVrushti — Auspicious Royal Petal Shower
 * 
 * In Karnataka royal and wedding traditions, royal processions and sacred unions are blessed 
 * with a continuous shower of fresh blooms:
 * 1. Mysore Mallige (fragrant white/ivory jasmine blossoms)
 * 2. Karnataka Sevanthige (radiant golden yellow and saffron marigold petals)
 * 3. Mysore Gulabi (regal crimson and ruby rose petals)
 * 
 * Physics: Multi-plane depth, 3D sinusoidal sway, tilt rotation, scroll acceleration, and touch ripples.
 */

// Petal Types Configuration
const PETAL_TYPES = [
  // 1. Karnataka Sevanthige (Golden Yellow Marigold)
  {
    type: 'sevanthige-gold',
    colors: ['#FFB800', '#FFA000', '#FFD54F', '#FACC15', '#F59E0B'],
    aspect: 1.4,
    draw: (ctx, size) => {
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.45, size * 0.75, 0, 0, Math.PI * 2);
      ctx.fill();
      // Subtle petal spine
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.5);
      ctx.lineTo(0, size * 0.5);
      ctx.stroke();
    }
  },
  // 2. Karnataka Sevanthige Deep Saffron
  {
    type: 'sevanthige-saffron',
    colors: ['#F97316', '#EA580C', '#D97706', '#C2410C'],
    aspect: 1.3,
    draw: (ctx, size) => {
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.42, size * 0.72, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  // 3. Mysore Mallige (Ivory White Jasmine)
  {
    type: 'mallige-jasmine',
    colors: ['#FFFFFF', '#FFFDF5', '#FAF6F0', '#FDF8EE'],
    aspect: 1.1,
    draw: (ctx, size) => {
      // 5-petal starlet jasmine blossom
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.38, size * 0.19, size * 0.33, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // Golden jasmine center pistil
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.13, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  // 4. Royal Rose (Velvet Crimson Gulabi)
  {
    type: 'rose-crimson',
    colors: ['#991B1B', '#881337', '#BE123C', '#E11D48', '#8B1E3F'],
    aspect: 1.25,
    draw: (ctx, size) => {
      ctx.beginPath();
      // Curved heart-curled rose petal shape
      ctx.moveTo(0, size * 0.62);
      ctx.bezierCurveTo(size * 0.62, size * 0.2, size * 0.68, -size * 0.5, 0, -size * 0.62);
      ctx.bezierCurveTo(-size * 0.68, -size * 0.5, -size * 0.62, size * 0.2, 0, size * 0.62);
      ctx.fill();
      // Shimmer highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.ellipse(-size * 0.15, -size * 0.12, size * 0.12, size * 0.24, -0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
];

export default function PushpaVrushti({ isActive = true }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const [showerActive, setShowerActive] = useState(isActive);
  const [burstCount, setBurstCount] = useState(0);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    setShowerActive(isActive);
  }, [isActive]);

  // Initialize petals
  const createPetal = useCallback((width, height, isBurst = false, burstX = 0.5, burstY = 0.2) => {
    const config = PETAL_TYPES[Math.floor(Math.random() * PETAL_TYPES.length)];
    const depth = Math.random(); // 0: background (small, slow), 1: foreground (large, fast)
    const baseSize = depth > 0.75 ? 18 + Math.random() * 8 : depth > 0.35 ? 12 + Math.random() * 6 : 8 + Math.random() * 4;

    // Start petals across the upper viewport so they rain down gracefully
    const startX = isBurst 
      ? Math.max(20, Math.min(width - 20, width * burstX + (Math.random() - 0.5) * width * 0.7))
      : Math.random() * width;
    const startY = isBurst 
      ? -20 - Math.random() * 120 
      : -30 - Math.random() * 100;

    return {
      x: startX,
      y: startY,
      size: baseSize,
      depth,
      config,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      opacity: depth > 0.4 ? 0.9 + Math.random() * 0.1 : 0.6 + Math.random() * 0.3,
      speedY: 1.8 + depth * 2.4 + Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 1.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.02 + Math.random() * 0.025,
      swayAmplitude: 0.9 + depth * 1.8,
      tiltX: Math.random() * Math.PI,
      tiltSpeed: 0.025 + Math.random() * 0.035,
    };
  }, []);

  // Trigger an auspicious burst of fresh Karnataka flowers ONLY when blessing is requested
  const triggerPushpaBurst = useCallback((count = 65, x = 0.5, y = 0.2) => {
    if (!canvasRef.current) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newPetals = [];
    for (let i = 0; i < count; i++) {
      newPetals.push(createPetal(width, height, true, x, y));
    }
    particlesRef.current.push(...newPetals);
    setBurstCount((prev) => prev + 1);
  }, [createPetal]);

  // Listen to global pushpa-vrushti custom event
  useEffect(() => {
    const handlePushpaEvent = (e) => {
      const { count, x, y } = e.detail || {};
      triggerPushpaBurst(count || 55, x ?? 0.5, y ?? 0.2);
    };

    window.addEventListener('trigger-pushpa-vrushti', handlePushpaEvent);
    return () => window.removeEventListener('trigger-pushpa-vrushti', handlePushpaEvent);
  }, [triggerPushpaBurst]);

  // Track scroll speed to accelerate falling petals naturally
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      scrollVelocity.current = Math.min(delta * 0.08, 4.0);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      // Zero persistent background petals: petals only appear when blessing is requested!
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation ticker
    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity smoothly
      scrollVelocity.current *= 0.94;

      // Only animate active blessing bursts
      if (particlesRef.current.length > 0) {
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];

          // Update physics
          p.sway += p.swaySpeed;
          p.tiltX += p.tiltSpeed;
          p.rotation += p.rotationSpeed;

          const swayOffset = Math.sin(p.sway) * p.swayAmplitude;
          p.x += p.speedX + swayOffset;
          p.y += p.speedY + scrollVelocity.current;

          // 3D perspective scale calculation (foreshortening during tilt)
          const scaleY = Math.cos(p.tiltX);
          const currentSize = p.size;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.scale(1, scaleY);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          // Soft drop shadow for foreground petals
          if (p.depth > 0.7) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetY = 4;
          }

          p.config.draw(ctx, currentSize);
          ctx.restore();

          // Remove offscreen petals once they have fallen through
          if (p.y > height + 40 || p.x < -80 || p.x > width + 80) {
            particlesRef.current.splice(i, 1);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [showerActive, createPetal]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-32"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
