import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../data/weddingConfig';
import { Calendar, MapPin, Sparkles, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RoyalProcessionExperience() {
  const containerRef = useRef(null);
  const palaceBgRef = useRef(null);
  const palaceFgRef = useRef(null);
  const parasolLeftRef = useRef(null);
  const parasolRightRef = useRef(null);

  // Typography refs
  const invocationRef = useRef(null);
  const coupleNameRef = useRef(null);
  const dateInviteRef = useRef(null);
  const walkingHeadingRef = useRef(null);
  const twinBlessingHeadingRef = useRef(null);

  // Act I: Walking Elephant ref
  const walkingElephantContainerRef = useRef(null);

  // Act II: Twin Mirrored Royal Elephants refs
  const twinElephantsContainerRef = useRef(null);
  const leftElephantRef = useRef(null);
  const rightElephantRef = useRef(null);
  const centerBlessingRef = useRef(null);

  // Interactive State
  const [blessingActive, setBlessingActive] = useState(false);
  const [blessingMessage, setBlessingMessage] = useState('');

  // Scroll pacing ref
  const lastScrollYRef = useRef(0);

  // Master GSAP Timeline & ScrollTrigger Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=620%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
      window.processionTimeline = masterTl;

      // SCENE 2: Palace Reveal & Initial Archway Depth Parallax
      masterTl
        .fromTo(palaceBgRef.current, 
          { scale: 1.15, y: '0%' }, 
          { scale: 1.0, y: '-3%', duration: 1.5, ease: 'none' }, 0
        )
        .fromTo(palaceFgRef.current,
          { scale: 1.0, opacity: 0.95 },
          { scale: 1.35, y: '-10%', opacity: 0, duration: 1.8, ease: 'power1.inOut' }, 0
        )

        // SCENE 3: Ceremonial Parasols
        .fromTo(parasolLeftRef.current,
          { x: '-70%', y: '-10%', rotation: -10, opacity: 0 },
          { x: '0%', y: '0%', rotation: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.2
        )
        .fromTo(parasolRightRef.current,
          { x: '70%', y: '-10%', rotation: 10, opacity: 0 },
          { x: '0%', y: '0%', rotation: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.2
        )

        // Typography Phase 1: Invocation (t: 0.4 to 1.3)
        .fromTo(invocationRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1.0, duration: 0.7, ease: 'power2.out' }, 0.4
        )
        .to(invocationRef.current, { opacity: 0, y: -20, duration: 0.4 }, 1.2)

        // Typography Phase 2: Couple Monogram & Names (t: 1.4 to 2.5) — Strictly Before Date
        .to(parasolLeftRef.current, { x: '-24%', rotation: -6, duration: 1.0 }, 1.4)
        .to(parasolRightRef.current, { x: '24%', rotation: 6, duration: 1.0 }, 1.4)
        .fromTo(coupleNameRef.current,
          { opacity: 0, y: 35, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1.0, duration: 0.8, ease: 'power2.out' }, 1.4
        )
        .to(coupleNameRef.current, { opacity: 0, y: -25, duration: 0.45 }, 2.4)

        // Typography Phase 3: Wedding Date & Royal Invitation (t: 2.7 to 3.8) — STRICTLY AFTER Couple Names Fade Out!
        .fromTo(dateInviteRef.current,
          { opacity: 0, y: 35, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1.0, duration: 0.8, ease: 'power2.out' }, 2.7
        )
        .to(dateInviteRef.current, { opacity: 0, y: -20, duration: 0.45 }, 3.8)

        // Retract Parasols cleanly before Herald March so the grand Mysore Palace Courtyard is fully revealed
        .to(parasolLeftRef.current, { x: '-65%', opacity: 0, duration: 0.8, ease: 'power2.in' }, 3.8)
        .to(parasolRightRef.current, { x: '65%', opacity: 0, duration: 0.8, ease: 'power2.in' }, 3.8)

        // =========================================================================
        // ACT I: THE HERALD WALKING ELEPHANT MARCH (Royal Stride Left-to-Right)
        // Enters from the Left at 4.0, strides majestically across courtyard, exits to the Right
        // Balanced medium tempo: neither too fast nor too slow
        // =========================================================================
        .fromTo(walkingHeadingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 }, 4.0
        )
        .to(walkingHeadingRef.current, { opacity: 0, y: -15, duration: 0.4 }, 6.6)

        // Stride across Mysore Palace courtyard: Left (-75vw) -> Center (0vw) -> Right (+75vw)
        // Solid opacity: elephant remains a solid majestic presence throughout the march
        .fromTo(walkingElephantContainerRef.current,
          { xPercent: -50, x: '-75vw', opacity: 1, scale: 0.98 },
          { xPercent: -50, x: '0vw', opacity: 1, scale: 1.0, duration: 1.3, ease: 'power1.out' }, 4.0
        )
        // Automatic Pushpa Vrushti flower burst as Nishane Aane reaches center courtyard
        .call(() => {
          try {
            window.dispatchEvent(
              new CustomEvent('trigger-pushpa-vrushti', {
                detail: { count: 70, x: 0.5, y: 0.25 }
              })
            );
          } catch (e) {}
        }, null, 5.3)
        // Royal stride continues smoothly from center to right exit
        .to(walkingElephantContainerRef.current,
          { xPercent: -50, x: '75vw', opacity: 1, scale: 1.02, duration: 1.3, ease: 'power1.in' }, 6.5
        )
        .set(walkingElephantContainerRef.current, { opacity: 0 }, 7.8)

        // =========================================================================
        // ACT II: THE TWIN ROYAL ELEPHANTS (LEFT REFLECTED & RIGHT) EMERGE TO BLESS!
        // Starts at 7.7, once the walking elephant has departed completely
        // =========================================================================
        .fromTo(twinBlessingHeadingRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1.0, y: 0, duration: 0.8, ease: 'power2.out' }, 7.7
        )

        // Left Mirrored Elephant advances from left
        .fromTo(leftElephantRef.current,
          { x: '-45vw', opacity: 0, scale: 0.85 },
          { x: '0vw', opacity: 1, scale: 1.0, duration: 1.1, ease: 'power2.out' }, 7.7
        )

        // Right Elephant advances from right
        .fromTo(rightElephantRef.current,
          { x: '45vw', opacity: 0, scale: 0.85 },
          { x: '0vw', opacity: 1, scale: 1.0, duration: 1.1, ease: 'power2.out' }, 7.7
        )

        // Center Royal Blessing Crest & Call-to-action
        .fromTo(centerBlessingRef.current,
          { opacity: 0, scale: 0.85, y: 20 },
          { opacity: 1, scale: 1.0, y: 0, duration: 0.9, ease: 'back.out(1.5)' }, 8.0
        )
        // Automatic Pushpa Vrushti burst during Twin Blessing
        .call(() => {
          try {
            window.dispatchEvent(
              new CustomEvent('trigger-pushpa-vrushti', {
                detail: { count: 75, x: 0.5, y: 0.2 }
              })
            );
          } catch (e) {}
        }, null, 8.1)

        // Parasols return to salute the twin royal guardians
        .fromTo(parasolLeftRef.current,
          { x: '-65%', opacity: 0 },
          { x: '-38%', y: '10%', scale: 0.85, opacity: 0.65, duration: 1.2, ease: 'power2.out' }, 7.5
        )
        .fromTo(parasolRightRef.current,
          { x: '65%', opacity: 0 },
          { x: '38%', y: '10%', scale: 0.85, opacity: 0.65, duration: 1.2, ease: 'power2.out' }, 7.5
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Interactive Blessings
  const handleWalkingElephantTap = () => {
    setBlessingMessage('✦ Nishane Aane Advances in Auspicious Stride! ✦');
    setBlessingActive(true);
    if (walkingElephantContainerRef.current) {
      gsap.timeline()
        .to(walkingElephantContainerRef.current, { scale: 1.06, y: -10, duration: 0.22, ease: 'power2.out' })
        .to(walkingElephantContainerRef.current, { scale: 1.0, y: 0, duration: 0.38, ease: 'bounce.out' });
    }
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75, x: 0.5 },
        colors: ['#D4AF37', '#ECC876', '#FAF6F0']
      });
      window.dispatchEvent(
        new CustomEvent('trigger-pushpa-vrushti', {
          detail: { count: 65, x: 0.5, y: 0.3 }
        })
      );
    } catch (e) {}
    setTimeout(() => setBlessingActive(false), 2600);
  };

  const handleLeftElephantTap = () => {
    setBlessingMessage('✦ Left Royal Tusker: Vijaya & Sovereign Strength ✦');
    setBlessingActive(true);
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.65, x: 0.25 },
        colors: ['#ECC876', '#E1B24B', '#FAF6F0', '#B78328']
      });
      window.dispatchEvent(
        new CustomEvent('trigger-pushpa-vrushti', {
          detail: { count: 65, x: 0.25, y: 0.35 }
        })
      );
    } catch (e) {}
    setTimeout(() => setBlessingActive(false), 3000);
  };

  const handleRightElephantTap = () => {
    setBlessingMessage('✦ Right Royal Tusker: Mangala & Divine Harmony ✦');
    setBlessingActive(true);
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.65, x: 0.75 },
        colors: ['#8B1E3F', '#D4AF37', '#FAF6F0', '#ECC876']
      });
      window.dispatchEvent(
        new CustomEvent('trigger-pushpa-vrushti', {
          detail: { count: 65, x: 0.75, y: 0.35 }
        })
      );
    } catch (e) {}
    setTimeout(() => setBlessingActive(false), 3000);
  };

  const handleGrandTwinBlessing = () => {
    setBlessingMessage('✦ The Twin Imperial Elephants Bestow Their Eternal Dasara Blessing! ✦');
    setBlessingActive(true);
    try {
      confetti({
        particleCount: 80,
        spread: 110,
        origin: { y: 0.6, x: 0.5 },
        colors: ['#ECC876', '#E1B24B', '#6B1D2F', '#FAF6F0', '#B78328', '#D4AF37']
      });
      // Trigger Pushpa Vrushti flower shower
      window.dispatchEvent(
        new CustomEvent('trigger-pushpa-vrushti', {
          detail: { count: 60, x: 0.5, y: 0.4 }
        })
      );
    } catch (e) {}
    setTimeout(() => setBlessingActive(false), 3800);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-royal-midnight select-none"
      id="procession"
    >
      {/* Layer 1: Mysore Palace Twilight Background with Parallax */}
      <div
        ref={palaceBgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/palace-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          willChange: 'transform',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-royal-midnight via-transparent to-royal-midnight/50 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-royal-midnight/60" />
      </div>

      {/* Layer 2: Palace Carved Archway Foreground Parallax Layer */}
      <div
        ref={palaceFgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{
          backgroundImage: 'url(/assets/palace-foreground.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 3: Left Ceremonial Parasol */}
      <div
        ref={parasolLeftRef}
        className="absolute -left-12 sm:left-4 md:left-12 -top-6 sm:top-2 w-44 sm:w-64 md:w-80 lg:w-96 aspect-[1122/1402] pointer-events-none z-30"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/assets/parasol-left.png"
          alt="Royal Ceremonial Parasol Left"
          className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* Layer 4: Right Ceremonial Parasol */}
      <div
        ref={parasolRightRef}
        className="absolute -right-12 sm:right-4 md:right-12 -top-6 sm:top-2 w-44 sm:w-64 md:w-80 lg:w-96 aspect-[1122/1402] pointer-events-none z-30"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/assets/parasol-right.png"
          alt="Royal Ceremonial Parasol Right"
          className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* Layer 5: Scroll-Triggered Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-25 px-4">
        {/* Phase 1: Invocation */}
        <div
          ref={invocationRef}
          className="absolute text-center w-[92vw] max-w-lg mx-auto space-y-2 sm:space-y-3 opacity-0 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-royal-midnight/90 border border-royal-gold/40 shadow-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-midnight border border-royal-gold/50 shadow-royal-gold mb-1">
            <Sparkles className="w-3 h-3 text-royal-gold animate-spin [animation-duration:8s]" />
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-royal-gold-light">
              {weddingConfig.couple.invocation}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-royal-cream/90 max-w-md mx-auto">
            {weddingConfig.couple.blessingLead}
          </p>
        </div>

        {/* Phase 2: Couple Monogram & Names (Completely Independent Phase) */}
        <div
          ref={coupleNameRef}
          className="absolute text-center w-[92vw] max-w-2xl sm:max-w-3xl mx-auto space-y-2.5 sm:space-y-3 opacity-0 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-royal-midnight/90 border border-royal-gold/40 shadow-2xl"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-royal-gold/15 border border-royal-gold/50 mx-auto shadow-royal-gold">
            <span className="font-royal text-lg sm:text-2xl font-bold text-gold-gradient tracking-widest">
              {weddingConfig.couple.groom.firstName[0]}&{weddingConfig.couple.bride.firstName[0]}
            </span>
          </div>
          <h1 className="font-royal text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-gold-gradient font-bold tracking-wide">
            {weddingConfig.couple.groom.firstName}
            <span className="text-royal-gold mx-2 sm:mx-3 font-serif font-light">&</span>
            {weddingConfig.couple.bride.firstName}
          </h1>
          <p className="text-[11px] sm:text-sm font-serif text-royal-cream/90 max-w-lg mx-auto leading-relaxed">
            {weddingConfig.couple.invitationLead}
          </p>
        </div>

        {/* Phase 3: Date & Muhurtham (Completely Independent Phase) */}
        <div
          ref={dateInviteRef}
          className="absolute text-center w-[92vw] max-w-lg mx-auto space-y-2.5 sm:space-y-3.5 opacity-0 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-royal-midnight/90 border border-royal-gold/40 shadow-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-royal-deep-ruby/90 border border-royal-gold/50 shadow-royal-gold">
            <Calendar className="w-3.5 h-3.5 text-royal-gold" />
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-royal-gold-light font-medium">
              Save The Auspicious Date
            </span>
          </div>
          <h3 className="font-royal text-xl xs:text-2xl sm:text-3xl text-gold-gradient font-bold">
            {weddingConfig.couple.weddingDateText}
          </h3>
          <p className="text-[11px] sm:text-xs font-serif italic text-royal-gold-light font-medium">
            {weddingConfig.couple.muhurthamTime}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-serif text-royal-cream/90">
            <MapPin className="w-3.5 h-3.5 text-royal-gold shrink-0" />
            <span className="truncate">{weddingConfig.venue.name}, {weddingConfig.couple.city}</span>
          </div>
        </div>

        {/* Phase 4: Act I Walking Herald Heading */}
        <div
          ref={walkingHeadingRef}
          className="absolute top-16 sm:top-20 text-center max-w-xl mx-auto space-y-1 sm:space-y-1.5 opacity-0 p-2.5 sm:p-3 rounded-2xl bg-royal-midnight/90 border border-royal-gold/40 shadow-xl z-30"
        >
          <p className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-royal-gold font-bold">
            Scene Four — The Royal Courtyard
          </p>
          <h2 className="font-royal text-lg sm:text-2xl text-gold-gradient font-bold tracking-wider">
            The Nishane Aane Herald March
          </h2>
          <p className="text-[11px] font-serif text-royal-cream/90">
            Witness the sacred walking cycle heralding the royal procession
          </p>
        </div>

        {/* Phase 5: Act II Twin Blessing Heading */}
        <div
          ref={twinBlessingHeadingRef}
          className="absolute top-16 sm:top-20 text-center max-w-[92vw] sm:max-w-xl mx-auto space-y-1 sm:space-y-1.5 opacity-0 p-2.5 sm:p-3.5 rounded-2xl bg-royal-midnight/90 border border-royal-gold/50 shadow-2xl"
        >
          <p className="text-[9px] sm:text-xs font-serif uppercase tracking-[0.25em] sm:tracking-[0.3em] text-royal-gold font-bold">
            Scene Four (Part II) — Royal Benediction
          </p>
          <h2 className="font-royal text-lg sm:text-3xl text-gold-gradient font-bold tracking-wider">
            Twin Imperial Guardians Blessing
          </h2>
          <p className="text-[10px] sm:text-[11px] font-serif text-royal-cream/90">
            Tap either royal tusker to receive their auspicious Dasara blessing
          </p>
        </div>
      </div>

      {/* =========================================================================
          ACT I: HERALD WALKING ELEPHANT (Seamlessly Blended Royal Mysore Tusker)
          Carries the sacred Golden Ambari (750kg Howdah) gracefully across the palace courtyard
         ========================================================================= */}
      <div
        ref={walkingElephantContainerRef}
        onClick={handleWalkingElephantTap}
        className="absolute left-1/2 bottom-[2.5%] sm:bottom-[3.5%] h-[68vh] sm:h-[72vh] md:h-[75vh] aspect-[9/16] w-auto max-w-[95vw] cursor-pointer z-22 group opacity-0"
        style={{ willChange: 'transform, opacity' }}
        title="Tap the Herald Elephant to accelerate gait!"
      >
        {/* Multi-Tiered Courtyard Floor Occlusion Shadows */}
        <div className="absolute left-[8%] right-[8%] bottom-[6.5%] h-6 sm:h-9 bg-black/90 rounded-full blur-md transform scale-y-40 pointer-events-none z-10" />
        <div className="absolute left-[3%] right-[3%] bottom-[5.5%] h-10 sm:h-14 bg-black/75 rounded-full blur-xl transform scale-y-35 pointer-events-none z-10" />
        <div className="absolute left-[12%] right-[12%] bottom-[6.5%] h-5 sm:h-8 bg-amber-950/50 rounded-full blur-lg transform scale-y-50 pointer-events-none z-10" />

        {/* Seamless Blended Walking Elephant (100% Native Alpha Transparency, Edge-Despilled & Palace Twilight Harmonized) */}
        <div
          className="w-full h-full relative z-10 flex items-center justify-center"
          style={{
            isolation: 'isolate',
            transform: 'translate3d(0,0,0)',
            WebkitTransform: 'translate3d(0,0,0)',
          }}
        >
          <picture className="w-full h-full flex items-center justify-center pointer-events-none">
            <source srcSet="/assets/elephant-walking-mysore.webp" type="image/webp" />
            <img
              src="/assets/elephant-walking-mysore.webp"
              alt="Royal Mysore Herald Elephant carrying Golden Ambari"
              className="w-full h-full object-contain relative z-10 select-none pointer-events-none filter drop-shadow-[0_0_22px_rgba(235,178,75,0.22)]"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        {/* Herald Badge */}
        <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-3 py-1 rounded-full bg-royal-midnight/90 border border-royal-gold/40 text-[9px] sm:text-[10px] font-serif uppercase tracking-wider text-royal-gold-light shadow-md pointer-events-none backdrop-blur-sm">
          ✦ Nishane Aane (Walking Herald Stride) ✦
        </div>
      </div>

      {/* =========================================================================
          ACT II: THE TWIN ROYAL ELEPHANTS (LEFT REFLECTED & RIGHT TUSKERS)
          Enter from Left and Right facing each other to bestow the Royal Blessing!
         ========================================================================= */}
      <div
        ref={twinElephantsContainerRef}
        className="absolute inset-0 pointer-events-none z-23 overflow-hidden"
      >
        {/* 1. LEFT ROYAL ELEPHANT (Reflected / Mirrored to face inward) */}
        <div
          ref={leftElephantRef}
          onClick={handleLeftElephantTap}
          className="absolute -left-2 sm:left-2 md:left-6 lg:left-10 bottom-[3%] sm:bottom-[10%] w-[210px] xs:w-[250px] sm:w-[410px] md:w-[480px] lg:w-[540px] aspect-[1448/1086] cursor-pointer pointer-events-auto group opacity-0"
          style={{ willChange: 'transform, opacity' }}
          title="Tap the Left Imperial Tusker (Vira Gaja) for blessing!"
        >
          {/* Ground shadow */}
          <div className="absolute left-[12%] right-[12%] bottom-2 h-7 sm:h-10 bg-black/85 rounded-full blur-xl transform scale-y-50" />

          {/* Mirrored Left Elephant Image */}
          <img
            src="/assets/elephant-left.png"
            alt="Left Imperial Adorned Elephant (Reflected)"
            className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-transform duration-300 group-hover:scale-105"
          />

          {/* Left Elephant Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-2 py-0.5 rounded-full bg-royal-midnight/90 border border-royal-gold/50 text-[8px] sm:text-[10px] font-serif uppercase tracking-wider text-royal-gold-light shadow-md">
            ✦ Vira Gaja (Left Guardian) ✦
          </div>
        </div>

        {/* 2. RIGHT ROYAL ELEPHANT (Natural Orientation facing inward) */}
        <div
          ref={rightElephantRef}
          onClick={handleRightElephantTap}
          className="absolute -right-2 sm:right-2 md:right-6 lg:right-10 bottom-[3%] sm:bottom-[10%] w-[210px] xs:w-[250px] sm:w-[410px] md:w-[480px] lg:w-[540px] aspect-[1448/1086] cursor-pointer pointer-events-auto group opacity-0"
          style={{ willChange: 'transform, opacity' }}
          title="Tap the Right Imperial Tusker (Mangala Gaja) for blessing!"
        >
          {/* Ground shadow */}
          <div className="absolute left-[12%] right-[12%] bottom-2 h-7 sm:h-10 bg-black/85 rounded-full blur-xl transform scale-y-50" />

          {/* Right Elephant Image */}
          <img
            src="/assets/elephant-right.png"
            alt="Right Imperial Adorned Elephant"
            className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-transform duration-300 group-hover:scale-105"
          />

          {/* Right Elephant Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-2 py-0.5 rounded-full bg-royal-deep-ruby/90 border border-royal-gold/60 text-[8px] sm:text-[10px] font-serif uppercase tracking-wider text-gold-gradient font-bold shadow-md">
            ✦ Mangala Gaja (Right Guardian) ✦
          </div>
        </div>

        {/* 3. CENTER TWIN BLESSING CREST & CTA (Framed between both facing elephants) */}
        <div
          ref={centerBlessingRef}
          className="absolute left-1/2 top-[20%] xs:top-[21%] sm:top-auto sm:bottom-[16%] md:bottom-[18%] -translate-x-1/2 z-30 text-center w-[92vw] max-w-xs sm:max-w-sm md:max-w-md px-2 sm:px-3 pointer-events-auto opacity-0"
        >
          <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0c152a]/95 border border-royal-gold/60 sm:border-2 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1.5 mb-1 text-royal-gold">
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold" />
              <span className="font-royal text-[11px] sm:text-xs uppercase tracking-widest text-gold-gradient font-bold">
                Dwara Gaja Ashirwada
              </span>
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold" />
            </div>

            <p className="text-[10px] sm:text-xs font-serif text-royal-cream/90 leading-relaxed mb-2.5 sm:mb-3">
              The twin imperial elephants raise their golden caparisons in sacred salute, bestowing divine blessings upon Aditya & Radhika.
            </p>

            <button
              onClick={handleGrandTwinBlessing}
              className="whitespace-nowrap inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-4 sm:px-6 rounded-full bg-gold-foil text-royal-midnight font-serif text-[10px] sm:text-xs uppercase tracking-wider font-bold shadow-royal-gold hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-royal-midnight" />
              <span>Invoke Twin Royal Blessing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Royal Blessing Popup Toast (Docked at Bottom, Never Collides with Headings!) */}
      {blessingActive && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-royal-deep-ruby/95 border-2 border-royal-gold shadow-2xl text-center animate-bounce pointer-events-none">
          <span className="font-royal text-[11px] sm:text-sm text-gold-gradient font-bold tracking-wider">
            {blessingMessage}
          </span>
        </div>
      )}


    </div>
  );
}
