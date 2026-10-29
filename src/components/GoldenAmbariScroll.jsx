import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, Flower2, ChevronLeft, ChevronRight, ScrollText, CheckCircle2, Volume2 } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

/**
 * GoldenAmbariScroll — The Unfurling of the Golden Ambari Scroll (Kalyana Shasana)
 * 
 * Features:
 * 1. Authentic User-Provided Royal Wax Seal:
 *    High-definition embossed gold elephant mandala medallion with ruby insets (/assets/royal-wax-seal.png).
 * 2. Transition Text Experience:
 *    - Step 1: Sacred Invocation: ॥ ಶ್ರೀ ಚಾಮುಂಡೇಶ್ವರಿ ಪ್ರಸನ್ನಃ ॥ (Sri Chamundeshwari Prasanna)
 *    - Step 2: Royal Decree: Official proclamation inviting guests to the union of Aditya & Radhika
 *    - Step 3: Sacred Mangalashtaka Verse: Traditional Vedic wedding blessing with English translation
 * 3. Interactive Wax Seal Tap:
 *    - Unleashes the festive Pushpa Vrushti petal shower (Mysore Mallige, Sevanthige, Rose)
 *    - Rings a sacred royal temple bell chime
 *    - Advances to the next verse in the royal decree sequence!
 */

const TRANSITION_STEPS = [
  {
    id: 'invocation',
    stepNumber: 'I',
    badge: 'Sacred Invocation',
    titleKannada: '॥ ಶ್ರೀ ಚಾಮುಂಡೇಶ್ವರಿ ಪ್ರಸನ್ನಃ ॥',
    titleEnglish: '|| Sri Chamundeshwari Prasanna ||',
    lead: 'With the divine grace and supreme protection of Goddess Sri Chamundeshwari and the sacred blessings of our revered ancestors',
    subtext: 'Chamundi Hills, Mysuru • Divine Guardian Deity of Karnataka'
  },
  {
    id: 'decree',
    stepNumber: 'II',
    badge: 'Royal Decree • Kalyana Shasana',
    titleKannada: 'ಆದಿತ್ಯ ಮತ್ತು ರಾಧಿಕಾ ಕಲ್ಯಾಣ ಮಹೋತ್ಸವ',
    titleEnglish: 'The Royal Union of Aditya & Radhika',
    lead: 'Under the sovereign canopy of Mysore heritage, the Royal House warmly proclaims and cordially invites you to grace the auspicious matrimonial covenant uniting two noble families',
    subtext: 'The Varma Family of Bengaluru & The Raj Family of Mysuru'
  },
  {
    id: 'mangalashtaka',
    stepNumber: 'III',
    badge: 'Sacred Mangalashtaka Verse',
    titleKannada: 'ಮಾಂಗಲ್ಯಂ ತಂತುನಾನೇನ ಮಮ ಜೀವನ ಹೇತುನಾ । ಕಂಠೇ ಬಧ್ನಾಮಿ ಶುಭಗೇ ತ್ವಂ ಜೀವ ಶರದಃ ಶತಮ್ ॥',
    titleEnglish: 'The Sacred Vedic Wedding Vow',
    lead: '“By this sacred thread of life, bound in eternal dharma, mutual devotion, and celestial harmony, may we walk together through a hundred autumns.”',
    subtext: 'Rigvedic Benediction • Sacred Saptapadi Covenant'
  }
];

export default function GoldenAmbariScroll() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoTransition, setIsAutoTransition] = useState(true);
  const [sealTapped, setSealTapped] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isCompleteView, setIsCompleteView] = useState(false);
  const audioCtxRef = useRef(null);

  // Play an authentic synthesized royal temple bell / golden chime
  const playRoyalBellChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      // Fundamental temple bell chime frequencies (E5 ~ 659.25Hz & B5 ~ 987.77Hz)
      [659.25, 987.77, 1318.51].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.18 / (i + 1), now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + i * 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.4);
      });
    } catch (e) {}
  };

  // Auto-advance transition text every 5.5 seconds unless user pauses or manually clicks
  useEffect(() => {
    if (!isAutoTransition || isCompleteView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % TRANSITION_STEPS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoTransition, isCompleteView]);

  // Handle Interactive Royal Wax Seal Click
  const handleSealClick = () => {
    setSealTapped(true);
    setIsAutoTransition(false); // Pause auto-rotation when guest interacts
    playRoyalBellChime();

    // Haptic feedback
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([40, 60, 40]);
    }

    // 1. Guaranteed Confetti Petals (Karnataka Gold, Jasmine White, Ruby Rose)
    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.65, x: 0.5 },
        colors: ['#FFB800', '#FFA000', '#FAF6F0', '#FFFDF5', '#8B1E3F', '#ECC876']
      });
    } catch (e) {}

    // 2. Trigger Full-Screen Pushpa Vrushti Canvas Shower
    try {
      window.dispatchEvent(
        new CustomEvent('trigger-pushpa-vrushti', {
          detail: { count: 70, x: 0.5, y: 0.3 }
        })
      );
    } catch (e) {}

    // 3. Advance to Next Transition Text
    const nextStep = (activeStep + 1) % TRANSITION_STEPS.length;
    setActiveStep(nextStep);

    setToastMessage(`✦ Pushpa Vrushti Bestowed! Transitioning to: ${TRANSITION_STEPS[nextStep].badge} ✦`);

    setTimeout(() => {
      setSealTapped(false);
      setToastMessage('');
    }, 3200);
  };

  const current = TRANSITION_STEPS[activeStep];

  return (
    <section
      id="ambari-scroll"
      className="relative w-full max-w-4xl mx-auto my-12 sm:my-20 px-3 sm:px-6 select-none z-30"
      aria-label="Golden Ambari Royal Decree"
    >
      {/* 1. Golden Ambari Spire & Arch Header */}
      <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-royal-gold to-transparent" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-deep-ruby/95 border border-royal-gold/60 shadow-royal-gold">
            <Crown className="w-3.5 h-3.5 text-royal-gold animate-pulse" />
            <span className="text-[9.5px] sm:text-xs font-serif uppercase tracking-[0.25em] text-royal-gold-light font-bold">
              Chinnada Ambari • 750kg Golden Howdah
            </span>
            <Crown className="w-3.5 h-3.5 text-royal-gold animate-pulse" />
          </div>
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-royal-gold to-transparent" />
        </div>

        {/* Scroll Roller Rod */}
        <div className="relative w-full max-w-xl h-5 sm:h-6 rounded-full bg-gradient-to-r from-[#9A7B1C] via-[#ECC876] to-[#9A7B1C] shadow-[0_4px_16px_rgba(0,0,0,0.85)] border border-[#FFE194]/80 flex items-center justify-between px-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[#5E1220] border border-royal-gold shadow-inner" />
          <div className="text-[9px] sm:text-[10px] font-royal uppercase tracking-widest text-[#420B15] font-bold">
            ✦ Kalyana Shasana • Royal Ceremonial Decree ✦
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#5E1220] border border-royal-gold shadow-inner" />
        </div>
      </div>

      {/* 2. The Golden Royal Decree Parchment Container */}
      <div className="relative w-full max-w-2xl mx-auto rounded-3xl bg-[#091124]/95 border-2 border-royal-gold/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-md overflow-hidden p-5 sm:p-9">
        {/* Ornate Gold Border Corners */}
        <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-royal-gold/80" />
        <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-royal-gold/80" />
        <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-royal-gold/80" />
        <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-royal-gold/80" />

        {/* Subtle Watermark Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#ECC876_1px,transparent_1px)] [background-size:20px_20px] opacity-5 pointer-events-none" />

        {/* Transition Stepper Pills (Step I, Step II, Step III) */}
        <div className="relative z-10 grid grid-cols-3 gap-1 sm:gap-2 mb-6 pb-3 border-b border-royal-gold/20">
          {TRANSITION_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveStep(idx);
                setIsAutoTransition(false);
              }}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-1.5 rounded-full text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-serif uppercase tracking-wider transition-all duration-300 text-center ${
                activeStep === idx
                  ? 'bg-royal-deep-ruby/90 text-royal-gold-light border border-royal-gold font-bold shadow-royal-gold scale-[1.02]'
                  : 'text-royal-cream/65 hover:text-royal-gold hover:bg-royal-gold/10 border border-transparent'
              }`}
            >
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-royal-gold/20 flex items-center justify-center text-[7.5px] sm:text-[8.5px] font-bold text-royal-gold shrink-0">
                {s.stepNumber}
              </span>
              <span className="truncate">
                {idx === 0 ? 'Invocation' : idx === 1 ? 'Royal Decree' : 'Mangalashtaka'}
              </span>
            </button>
          ))}
        </div>

        {/* =========================================================================
            3. DYNAMIC TRANSITION TEXT STAGE
            Transitions smoothly between Invocation, Royal Decree, and Mangalashtaka
           ========================================================================= */}
        <div className="relative min-h-[220px] sm:min-h-[250px] flex flex-col justify-center text-center px-1 sm:px-4 z-10">
          <div
            key={current.id}
            className="space-y-3 sm:space-y-4 animate-[fadeIn_0.5s_ease-out] transition-all"
          >
            {/* Step Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-midnight/90 border border-royal-gold/40 shadow-sm mx-auto">
              <Sparkles className="w-3 h-3 text-royal-gold" />
              <span className="text-[9px] sm:text-[10.5px] font-serif uppercase tracking-[0.25em] text-royal-gold-light font-bold">
                {current.badge}
              </span>
            </div>

            {/* Sacred Title in Kannada (Large, Gold Foil Gradient) */}
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gold-gradient tracking-wide leading-relaxed">
              {current.titleKannada}
            </h3>

            {/* Sacred English Sub-heading */}
            <p className="font-royal text-xs sm:text-sm uppercase tracking-widest text-royal-gold-light/90 font-medium">
              {current.titleEnglish}
            </p>

            <div className="w-16 h-0.5 bg-royal-gold/40 mx-auto" />

            {/* Lead Narrative Text */}
            <p className="text-xs sm:text-sm font-serif italic text-royal-cream/95 leading-relaxed max-w-lg mx-auto">
              {current.lead}
            </p>

            {/* Context Line */}
            <p className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-royal-gold/80">
              {current.subtext}
            </p>
          </div>
        </div>

        {/* Stepper Navigation Arrows & Progress Dots */}
        <div className="relative z-10 flex items-center justify-between mt-6 pt-3 border-t border-royal-gold/20">
          {/* Previous Verse Button */}
          <button
            onClick={() => {
              setActiveStep((prev) => (prev - 1 + TRANSITION_STEPS.length) % TRANSITION_STEPS.length);
              setIsAutoTransition(false);
            }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-royal-midnight border border-royal-gold/30 text-[10px] font-serif text-royal-cream/80 hover:text-royal-gold hover:border-royal-gold transition-colors"
            title="Previous Verse"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Prev</span>
          </button>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2">
            {TRANSITION_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveStep(i);
                  setIsAutoTransition(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  activeStep === i ? 'w-6 bg-royal-gold' : 'w-2 bg-royal-gold/30 hover:bg-royal-gold/60'
                }`}
                title={`Go to Step ${i + 1}`}
                aria-label={`Go to Step ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Verse Button */}
          <button
            onClick={() => {
              setActiveStep((prev) => (prev + 1) % TRANSITION_STEPS.length);
              setIsAutoTransition(false);
            }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-royal-midnight border border-royal-gold/30 text-[10px] font-serif text-royal-cream/80 hover:text-royal-gold hover:border-royal-gold transition-colors"
            title="Next Verse"
          >
            <span className="hidden xs:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* =========================================================================
            4. THE USER-PROVIDED AUTHENTIC ROYAL WAX SEAL
            Embossed Golden Elephant Mandala Medallion (/assets/royal-wax-seal.png)
           ========================================================================= */}
        <div className="relative z-10 text-center mt-7 pt-4 border-t border-royal-gold/25">
          <div className="flex flex-col items-center">
            {/* The Authentic Royal Wax Seal Button */}
            <div className="relative group cursor-pointer" onClick={handleSealClick}>
              {/* Pulsing Aura Glow Behind Seal */}
              <div className="absolute inset-0 rounded-full bg-radial from-amber-400/40 via-royal-gold/20 to-transparent blur-lg transform group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

              {/* Ping Ring on Tap */}
              {sealTapped && (
                <div className="absolute inset-0 rounded-full border-2 border-royal-gold animate-ping pointer-events-none" />
              )}

              {/* The Authentic Embossed Mysore Gold Elephant Medallion */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#9A7B1C] via-[#ECC876] to-[#FFE194] shadow-[0_10px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 active:scale-95 transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#5E1220] bg-gradient-to-b from-[#3a0b16] to-[#0b1328] flex items-center justify-center shadow-inner p-1">
                  <img
                    src="/assets/royal-wax-seal.png"
                    alt="Royal Mysore Elephant Gold Wax Seal Medallion"
                    loading="eager"
                    className="w-full h-full object-contain filter contrast-[1.08] brightness-[1.05] group-hover:rotate-6 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Callout */}
            <div className="mt-4 space-y-1">
              <p className="text-[11px] sm:text-xs font-serif text-royal-gold-light font-bold flex items-center justify-center gap-1.5">
                <Flower2 className="w-3.5 h-3.5 text-royal-gold animate-spin [animation-duration:8s]" />
                <span>Tap Royal Wax Seal to Shower Petals & Transition</span>
                <Flower2 className="w-3.5 h-3.5 text-royal-gold animate-spin [animation-duration:8s]" />
              </p>
              <p className="text-[9.5px] sm:text-[10.5px] font-serif text-royal-cream/60">
                Bestows auspicious Mysore Mallige, Sevanthige & Rose Petal blessings
              </p>
            </div>
          </div>
        </div>

        {/* Royal Toast Notification on Tap */}
        {toastMessage && (
          <div className="mt-4 p-2.5 rounded-full bg-royal-deep-ruby/95 border border-royal-gold text-center animate-bounce shadow-2xl relative z-20">
            <p className="font-royal text-[11px] sm:text-xs text-gold-gradient font-bold tracking-wide">
              {toastMessage}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Gold Scroll Rod with Dangling Tassels */}
      <div className="relative w-full max-w-xl mx-auto h-4 sm:h-5 mt-2 rounded-full bg-gradient-to-r from-[#9A7B1C] via-[#ECC876] to-[#9A7B1C] shadow-[0_6px_18px_rgba(0,0,0,0.85)] border border-[#FFE194]/80 flex items-center justify-between px-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#5E1220] border border-royal-gold" />
        <div className="flex gap-10">
          <div className="w-1.5 h-3 bg-royal-gold rounded-b-full shadow" />
          <div className="w-1.5 h-3 bg-royal-gold rounded-b-full shadow" />
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#5E1220] border border-royal-gold" />
      </div>
    </section>
  );
}
