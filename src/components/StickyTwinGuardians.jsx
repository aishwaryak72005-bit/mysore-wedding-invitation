import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Eye, EyeOff, Crown } from 'lucide-react';

export default function StickyTwinGuardians({ isEnvelopeOpen }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blessingMessage, setBlessingMessage] = useState('');
  const [blessingActive, setBlessingActive] = useState(false);

  useEffect(() => {
    if (isEnvelopeOpen) {
      setIsVisible(true);
    }
  }, [isEnvelopeOpen]);

  // Track scroll position to hide sticky side guardians during Scene 4 Procession (prevents 3 elephants on screen)
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      setScrollProgress(window.scrollY / maxScroll);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldHide = isMinimized;

  const handleLeftTap = () => {
    setBlessingMessage('✦ Left Tusker: Vijaya & Sovereign Strength ✦');
    setBlessingActive(true);
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { x: 0.15, y: 0.8 },
        colors: ['#ECC876', '#E1B24B', '#FAF6F0', '#B78328']
      });
      // Trigger Pushpa Vrushti flower shower
      window.dispatchEvent(
        new CustomEvent('trigger-pushpa-vrushti', {
          detail: { count: 40, x: 0.15, y: 0.75 }
        })
      );
    } catch (e) {}
    setTimeout(() => setBlessingActive(false), 2600);
  };

  const handleRightTap = () => {
    setBlessingMessage('✦ Right Tusker: Mangala & Divine Harmony ✦');
    setBlessingActive(true);
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { x: 0.85, y: 0.8 },
        colors: ['#8B1E3F', '#D4AF37', '#FAF6F0', '#ECC876']
      });
      // Trigger Pushpa Vrushti flower shower
      window.dispatchEvent(
        new CustomEvent('trigger-pushpa-vrushti', {
          detail: { count: 40, x: 0.85, y: 0.75 }
        })
      );
    } catch (e) {}
    setTimeout(() => setBlessingActive(false), 2600);
  };

  if (!isEnvelopeOpen || !isVisible) return null;

  return (
    <aside aria-label="Sticky Royal Elephant Guardians" className="fixed inset-0 pointer-events-none z-50">
      {/* 1. DESKTOP & TABLET STICKY TWIN GUARDIANS (Screens >= 1024px) */}
      <div className={`hidden lg:block transition-opacity duration-700 pointer-events-none select-none z-50 ${shouldHide ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Left Sticky Elephant (Vira Gaja, Reflected, Facing Right) */}
        <div
          onClick={handleLeftTap}
          className="fixed left-0 bottom-2 xl:bottom-4 w-[240px] xl:w-[310px] 2xl:w-[360px] aspect-[1448/1086] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-105 z-50"
          title="Tap the Left Sticky Guardian for royal victory blessing!"
        >
          {/* Ground Contact Shadow */}
          <div className="absolute left-[12%] right-[12%] bottom-2 h-6 bg-black/85 rounded-full blur-xl transform scale-y-50 pointer-events-none" />

          {/* Left Elephant Image */}
          <img
            src="/assets/elephant-left.png"
            alt="Sticky Left Imperial Royal Elephant (Reflected)"
            loading="eager"
            className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] animate-[floatGentle_4s_ease-in-out_infinite]"
          />

          {/* Left Badge */}
          <div className="absolute -bottom-1 left-6 z-20 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-royal-midnight/90 border border-royal-gold/50 text-[9px] font-serif uppercase tracking-wider text-royal-gold-light shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
            ✦ Vira Gaja (Sticky Guardian) ✦
          </div>
        </div>

        {/* Right Sticky Elephant (Mangala Gaja, Natural, Facing Left) */}
        <div
          onClick={handleRightTap}
          className="fixed right-0 bottom-2 xl:bottom-4 w-[240px] xl:w-[310px] 2xl:w-[360px] aspect-[1448/1086] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-105 z-50"
          title="Tap the Right Sticky Guardian for divine harmony blessing!"
        >
          {/* Ground Contact Shadow */}
          <div className="absolute left-[12%] right-[12%] bottom-2 h-6 bg-black/85 rounded-full blur-xl transform scale-y-50 pointer-events-none" />

          {/* Right Elephant Image */}
          <img
            src="/assets/elephant-right.png"
            alt="Sticky Right Imperial Royal Elephant"
            loading="eager"
            className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] animate-[floatGentle_4s_ease-in-out_infinite_2s]"
          />

          {/* Right Badge */}
          <div className="absolute -bottom-1 right-6 z-20 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-royal-deep-ruby/90 border border-royal-gold/60 text-[9px] font-serif uppercase tracking-wider text-gold-gradient font-bold shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
            ✦ Mangala Gaja (Sticky Guardian) ✦
          </div>
        </div>
      </div>

      {/* 2. MOBILE & COMPACT STICKY GUARDIANS (Screens < 1024px) — Reduced Elegant Size, Flanking Bottom Corners */}
      <div className={`lg:hidden transition-opacity duration-500 pointer-events-none select-none z-50 ${shouldHide ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Mobile Left Miniature Elephant Guardian */}
        <div
          onClick={handleLeftTap}
          className="fixed left-2 bottom-20 w-16 h-12 pointer-events-auto cursor-pointer group z-50 active:scale-110 transition-transform"
          title="Tap Left Tusker for Victory Blessing"
        >
          {/* Subtle Ground Shadow */}
          <div className="absolute left-[10%] right-[10%] bottom-0 h-2 bg-black/90 rounded-full blur-sm transform scale-y-50 pointer-events-none" />

          {/* Left Elephant Image (Reflected, facing inward) */}
          <img
            src="/assets/elephant-left.png"
            alt="Mobile Sticky Left Elephant"
            loading="eager"
            className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.95)]"
          />

          {/* Miniature Left Pill */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-[1px] rounded-full bg-royal-midnight/95 border border-royal-gold/70 text-[7px] font-royal uppercase tracking-wider text-royal-gold-light shadow-md">
            ✦ Vira ✦
          </div>
        </div>

        {/* Mobile Right Miniature Elephant Guardian */}
        <div
          onClick={handleRightTap}
          className="fixed right-2 bottom-20 w-16 h-12 pointer-events-auto cursor-pointer group z-50 active:scale-110 transition-transform"
          title="Tap Right Tusker for Divine Harmony Blessing"
        >
          {/* Subtle Ground Shadow */}
          <div className="absolute left-[10%] right-[10%] bottom-0 h-2 bg-black/90 rounded-full blur-sm transform scale-y-50 pointer-events-none" />

          {/* Right Elephant Image (Natural, facing inward) */}
          <img
            src="/assets/elephant-right.png"
            alt="Mobile Sticky Right Elephant"
            loading="eager"
            className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.95)]"
          />

          {/* Miniature Right Pill */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-[1px] rounded-full bg-royal-deep-ruby/95 border border-royal-gold/80 text-[7px] font-royal uppercase tracking-wider text-gold-gradient font-bold shadow-md">
            ✦ Mangala ✦
          </div>
        </div>
      </div>

      {/* 3. ROYAL BLESSING TOAST ON TAP (Flexbox Centered, Safe From Animation Transform Overrides) */}
      {blessingActive && (
        <div className="fixed bottom-32 left-0 right-0 flex justify-center z-50 pointer-events-none px-4">
          <div className="w-auto max-w-[85vw] px-4 py-2 rounded-full bg-royal-deep-ruby/95 border-2 border-royal-gold shadow-2xl text-center animate-bounce">
            <span className="font-royal text-[11px] sm:text-xs text-gold-gradient font-bold tracking-wider">
              {blessingMessage}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
