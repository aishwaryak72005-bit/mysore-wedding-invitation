import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { weddingConfig } from '../data/weddingConfig';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function Scene1Envelope({ onOpenComplete, onSkipIntro }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const containerRef = useRef(null);
  const envelopeWrapperRef = useRef(null);
  const closedEnvelopeRef = useRef(null);
  const openedPalaceEnvelopeRef = useRef(null);
  const innerCardRef = useRef(null);
  const promptRef = useRef(null);
  const skipBtnRef = useRef(null);

  const handleOpen = () => {
    if (isOpened || isOpening) return;
    setIsOpening(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsOpened(true);
      onOpenComplete();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        setIsOpened(true);
        onOpenComplete();
      }
    });

    // 1. Fade prompt and skip button out
    tl.to([promptRef.current, skipBtnRef.current], {
      opacity: 0,
      y: 12,
      duration: 0.35,
      pointerEvents: 'none'
    });

    // 2. Closed envelope rotates open forward and smoothly reveals the user-provided opened envelope asset
    tl.to(closedEnvelopeRef.current, {
      rotateX: 45,
      opacity: 0,
      scale: 0.95,
      duration: 0.65,
      ease: 'power2.inOut',
      transformOrigin: 'top center'
    }, "-=0.1");

    tl.to(openedPalaceEnvelopeRef.current, {
      opacity: 1,
      scale: 1.0,
      duration: 0.7,
      ease: 'power2.out'
    }, "-=0.4");

    // 3. Inner invitation card POPS UP dramatically from inside the opened envelope pocket!
    tl.fromTo(innerCardRef.current, 
      { opacity: 0, y: '30%', scale: 0.92, zIndex: 40 },
      { opacity: 1, y: '-36%', scale: 1.05, zIndex: 50, duration: 1.1, ease: 'back.out(1.4)' },
      "-=0.4"
    );

    // 4. Camera zooms into the palace depicted inside the opened envelope, transitioning into the palace courtyard!
    tl.to(envelopeWrapperRef.current, {
      scale: 2.8,
      y: '30%',
      opacity: 0,
      duration: 1.2,
      ease: 'power3.in'
    }, "+=0.7");

    // 5. Fade container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out'
    }, "-=0.3");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial-gradient from-royal-midnight via-[#070B19] to-[#03050B] p-4 sm:p-6 overflow-hidden select-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Royal Wedding Envelope Invitation"
    >
      {/* Background ambient royal glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-royal-gold/15 via-royal-deep-ruby/20 to-transparent blur-2xl" />

      {/* Skip Intro Control */}
      <div ref={skipBtnRef} className="absolute top-6 right-6 z-50">
        <button
          onClick={onSkipIntro}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif uppercase tracking-widest text-royal-gold-light/80 hover:text-royal-gold bg-royal-midnight/60 hover:bg-royal-midnight/90 border border-royal-gold/30 hover:border-royal-gold transition-all duration-300 backdrop-blur-md shadow-lg"
          aria-label="Skip envelope animation and view invitation directly"
        >
          <span>Skip Intro</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Studio Header Brand */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-royal-gold animate-ping" />
        <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-royal-gold-light/70">
          {weddingConfig.studio.name}
        </span>
      </div>

      {/* 3D Envelope Container with natural in-flow sizing (fits viewport height perfectly) */}
      <div className="perspective-1500 w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[390px] md:max-w-[410px] relative flex justify-center">
        <div
          ref={envelopeWrapperRef}
          onClick={handleOpen}
          className="relative w-full preserve-3d cursor-pointer transition-transform duration-500 hover:scale-[1.015]"
          role="button"
          tabIndex={0}
          aria-label="Closed Royal Wedding Envelope. Click to open."
        >
          {/* STATE A: Closed Royal Envelope Foundation (Single Authentic Asset — ZERO Double Seal) */}
          <div ref={closedEnvelopeRef} className="relative w-full">
            <img
              src="/assets/envelope-body.png"
              alt="Royal Mysore Dasara Wedding Envelope"
              className="w-full h-auto block rounded-2xl shadow-2xl shadow-black/95 border border-royal-gold/40 pointer-events-none"
            />
          </div>

          {/* STATE B: User-Provided Opened Envelope Asset (Featuring Mysore Palace & Royal Elephants) */}
          <div
            ref={openedPalaceEnvelopeRef}
            className="absolute inset-0 w-full flex items-center justify-center opacity-0 pointer-events-none z-30"
          >
            <img
              src="/assets/envelope-opened-palace.png"
              alt="Opened Royal Mysore Dasara Envelope with Palace & Elephants"
              className="w-full h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* Inner Invitation Card (Nestled inside, POPS UP majestically on open) */}
          <div
            ref={innerCardRef}
            className="absolute left-1/2 top-[8%] -translate-x-1/2 w-[86%] max-w-[340px] sm:max-w-[420px] rounded-2xl royal-glass-ivory p-5 sm:p-7 flex flex-col items-center justify-between text-center text-royal-midnight shadow-2xl border-2 border-royal-gold/70 pointer-events-none z-45 opacity-0"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.98) 0%, rgba(246,239,228,0.98) 100%)',
              filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.85))'
            }}
          >
            {/* Inner Card Traditional Header */}
            <div className="space-y-1">
              <p className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-royal-burgundy font-semibold">
                {weddingConfig.invocation.sanskritIast}
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto" />
            </div>

            {/* Couple Monogram & Names */}
            <div className="my-auto space-y-2 sm:space-y-3 py-1 sm:py-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full border-2 border-royal-gold/70 flex items-center justify-center bg-royal-gold/15 shadow-inner">
                <span className="font-royal text-base sm:text-xl text-royal-burgundy font-bold whitespace-nowrap tracking-wider flex items-center justify-center gap-1">
                  <span>{weddingConfig.couple.groom.firstName[0]}</span>
                  <span className="text-royal-gold text-xs sm:text-sm font-sans">&</span>
                  <span>{weddingConfig.couple.bride.firstName[0]}</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-royal-deep-ruby/80">
                {weddingConfig.couple.invitationGreeting}
              </p>
              <h2 className="font-royal text-xl sm:text-3xl text-royal-deep-ruby font-bold tracking-wide">
                {weddingConfig.couple.groom.firstName}
                <span className="text-royal-gold mx-2">&</span>
                {weddingConfig.couple.bride.firstName}
              </h2>
              <p className="text-xs sm:text-sm font-serif italic text-royal-burgundy/90 max-w-xs mx-auto">
                {weddingConfig.couple.weddingDateText}
              </p>
            </div>

            {/* Bottom Inner Card Crest */}
            <div className="pt-1">
              <p className="text-[10px] font-serif uppercase tracking-[0.25em] text-royal-gold-dark font-medium">
                {weddingConfig.couple.city}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Interactive Prompt */}
      <div
        ref={promptRef}
        onClick={handleOpen}
        className="mt-6 flex flex-col items-center gap-2 cursor-pointer z-50 group"
      >
        <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-royal-midnight/80 border border-royal-gold/50 shadow-royal-gold group-hover:border-royal-gold group-hover:scale-105 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-royal-gold animate-spin [animation-duration:6s]" />
          <span className="text-xs sm:text-sm font-serif uppercase tracking-[0.2em] text-royal-gold-light group-hover:text-white">
            Tap to open your invitation
          </span>
        </div>
        <span className="text-[11px] text-royal-ivory/50 font-serif tracking-widest uppercase">
          (Or press Enter / Space)
        </span>
      </div>
    </section>
  );
}
