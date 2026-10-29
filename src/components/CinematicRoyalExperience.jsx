import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  X, 
  Sparkles,
  Scroll,
  Share2,
  Compass
} from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

const ACTS = [
  { id: 0, title: 'Invocation & Palace Reveal', duration: 7.5 },
  { id: 1, title: 'The Royal Union', duration: 8.5 },
  { id: 2, title: 'Nishane Aane Herald March', duration: 10.0 },
  { id: 3, title: 'Sacred Muhurtham', duration: 8.5 },
  { id: 4, title: 'Royal Benediction & RSVP', duration: 9999 } // finale stays active
];

export default function CinematicRoyalExperience({ onReopenEnvelope, onSwitchToScroll }) {
  const [currentAct, setCurrentAct] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [actProgress, setActProgress] = useState(0); // 0 to 1
  const [showItinerary, setShowItinerary] = useState(false);
  const [blessingMessage, setBlessingMessage] = useState('');
  const [blessingActive, setBlessingActive] = useState(false);

  // Refs for animation
  const containerRef = useRef(null);
  const palaceBgRef = useRef(null);
  const palaceFgRef = useRef(null);
  const parasolLeftRef = useRef(null);
  const parasolRightRef = useRef(null);
  const videoRef = useRef(null);
  const walkingElephantRef = useRef(null);
  const timelineRef = useRef(null);
  const progressTimerRef = useRef(null);

  // Audio elements
  const audioRef = useRef(null);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio('/assets/audio-nadaswaram.mp3');
    audio.loop = true;
    audio.volume = 0.65;
    audioRef.current = audio;

    audio.play().catch(() => {
      // Autoplay blocked: wait for first interaction
      const playOnUser = () => {
        audio.play().catch(() => {});
        window.removeEventListener('click', playOnUser);
        window.removeEventListener('touchstart', playOnUser);
      };
      window.addEventListener('click', playOnUser);
      window.addEventListener('touchstart', playOnUser);
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Master Act Controller & Progress Tracker
  useEffect(() => {
    if (!isPlaying) return;

    const actInfo = ACTS[currentAct];
    if (actInfo.duration > 500) {
      setActProgress(1);
      return; // Finale holds
    }

    const startTime = Date.now();
    const durationMs = actInfo.duration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min(1, elapsed / durationMs);
      setActProgress(prog);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        goToAct(currentAct + 1);
      }
    }, 40);

    progressTimerRef.current = interval;
    return () => clearInterval(interval);
  }, [currentAct, isPlaying]);

  const goToAct = (actIndex) => {
    if (actIndex < 0) return;
    if (actIndex >= ACTS.length) {
      actIndex = ACTS.length - 1;
    }
    setActProgress(0);
    setCurrentAct(actIndex);
  };

  // Animate Elements on Act Change
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous subtle ambient palace drift
      gsap.to(palaceBgRef.current, {
        scale: 1.05 + currentAct * 0.02,
        y: `${-currentAct * 1.5}%`,
        duration: 2.5,
        ease: 'power2.out'
      });

      // Act 0: Palace reveal
      if (currentAct === 0) {
        gsap.to(palaceFgRef.current, { scale: 1.0, opacity: 0.95, duration: 2.0, ease: 'power1.out' });
        gsap.to(parasolLeftRef.current, { x: '-60%', opacity: 0, duration: 1.0 });
        gsap.to(parasolRightRef.current, { x: '60%', opacity: 0, duration: 1.0 });
        gsap.to(walkingElephantRef.current, { opacity: 0, x: '-60vw', duration: 0.5 });
      }

      // Act 1: Couple reveal & Parasols
      if (currentAct === 1) {
        gsap.to(palaceFgRef.current, { scale: 1.25, opacity: 0.35, duration: 2.0 });
        gsap.to(parasolLeftRef.current, { x: '0%', opacity: 1, rotation: 0, duration: 1.4, ease: 'power2.out' });
        gsap.to(parasolRightRef.current, { x: '0%', opacity: 1, rotation: 0, duration: 1.4, ease: 'power2.out' });
        gsap.to(walkingElephantRef.current, { opacity: 0, x: '-60vw', duration: 0.5 });
      }

      // Act 2: Nishane Aane Herald Elephant March
      if (currentAct === 2) {
        // Parasols flank outward
        gsap.to(parasolLeftRef.current, { x: '-28%', rotation: -6, duration: 1.2 });
        gsap.to(parasolRightRef.current, { x: '28%', rotation: 6, duration: 1.2 });

        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }

        // Stride across the screen: Left (-60vw) -> Center (0vw) -> Right (+60vw)
        gsap.fromTo(walkingElephantRef.current,
          { x: '-55vw', opacity: 0, scale: 0.96 },
          {
            keyframes: [
              { x: '0vw', opacity: 1, scale: 1.0, duration: 4.5, ease: 'power1.out' },
              { x: '0vw', opacity: 1, scale: 1.0, duration: 2.0, ease: 'none' }, // Hold center stage
              { x: '60vw', opacity: 0, scale: 1.02, duration: 3.5, ease: 'power1.in' } // Depart right
            ]
          }
        );
      }

      // Act 3: Sacred Muhurtham Decree Scroll
      if (currentAct === 3) {
        gsap.to(walkingElephantRef.current, { opacity: 0, x: '60vw', duration: 0.5 });
        gsap.to(parasolLeftRef.current, { x: '-35%', opacity: 0.7, duration: 1.2 });
        gsap.to(parasolRightRef.current, { x: '35%', opacity: 0.7, duration: 1.2 });
      }

      // Act 4: Grand Finale & Twin Guardians
      if (currentAct === 4) {
        gsap.to(parasolLeftRef.current, { x: '-40%', opacity: 0.5, duration: 1.2 });
        gsap.to(parasolRightRef.current, { x: '40%', opacity: 0.5, duration: 1.2 });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [currentAct]);

  // Touch screen tap navigation (Tap left = back, Tap right = next)
  const handleScreenClick = (e) => {
    // Ignore clicks on buttons or interactive cards
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.interactive-click')) {
      return;
    }
    const width = window.innerWidth;
    const x = e.clientX || (e.touches && e.touches[0]?.clientX);
    if (!x) return;

    if (x < width * 0.35) {
      // Tap Left ➔ Previous
      goToAct(Math.max(0, currentAct - 1));
    } else if (x > width * 0.65) {
      // Tap Right ➔ Next
      goToAct(Math.min(ACTS.length - 1, currentAct + 1));
    } else {
      // Tap Center ➔ Toggle Play / Pause
      setIsPlaying(p => !p);
    }
  };

  const handleElephantTap = () => {
    setBlessingMessage('✦ Nishane Aane Advances in Auspicious Stride! ✦');
    setBlessingActive(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.4;
      setTimeout(() => {
        if (videoRef.current) videoRef.current.playbackRate = 1.0;
      }, 2500);
    }
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7, x: 0.5 },
        colors: ['#D4AF37', '#ECC876', '#FAF6F0', '#B78328']
      });
    } catch (e) {}
    setTimeout(() => setBlessingActive(false), 2600);
  };

  const handleRSVPWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaskara! We are delighted to RSVP for the wedding of ${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName} on ${weddingConfig.couple.weddingDateText}. Looking forward to the auspicious celebrations!`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`Wedding of ${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}`);
    const details = encodeURIComponent(`The Royal Mysore Wedding Ceremony.\nMuhurtham: ${weddingConfig.couple.muhurthamTime}\nVenue: ${weddingConfig.venue.name}, ${weddingConfig.couple.city}`);
    const location = encodeURIComponent(`${weddingConfig.venue.name}, ${weddingConfig.venue.address}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261206T040000Z/20261206T080000Z`, '_blank');
  };

  return (
    <div
      ref={containerRef}
      onClick={handleScreenClick}
      className="fixed inset-0 w-full h-full overflow-hidden bg-royal-midnight text-royal-ivory select-none font-sans z-30"
    >
      {/* =========================================================================
          BACKGROUND LAYER: ILLUMINATED MYSORE PALACE WITH 3D DEPTH
         ========================================================================= */}
      <div
        ref={palaceBgRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-1000"
        style={{
          backgroundImage: 'url(/assets/palace-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          transform: 'scale(1.05)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-royal-midnight via-transparent to-royal-midnight/60 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-royal-midnight/70" />
      </div>

      {/* Foreground Archway Depth Layer */}
      <div
        ref={palaceFgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-transform duration-1000"
        style={{
          backgroundImage: 'url(/assets/palace-foreground.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Left Ceremonial Parasol */}
      <div
        ref={parasolLeftRef}
        className="absolute -left-12 sm:left-4 md:left-12 -top-6 sm:top-2 w-44 sm:w-64 md:w-80 lg:w-96 aspect-[1122/1402] pointer-events-none z-20 opacity-0"
      >
        <img
          src="/assets/parasol-left.png"
          alt="Royal Ceremonial Parasol Left"
          className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* Right Ceremonial Parasol */}
      <div
        ref={parasolRightRef}
        className="absolute -right-12 sm:right-4 md:right-12 -top-6 sm:top-2 w-44 sm:w-64 md:w-80 lg:w-96 aspect-[1122/1402] pointer-events-none z-20 opacity-0"
      >
        <img
          src="/assets/parasol-right.png"
          alt="Royal Ceremonial Parasol Right"
          className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* =========================================================================
          TOP STORY PROGRESS BARS (Like Instagram Stories / YouTube Shorts)
         ========================================================================= */}
      <div className="absolute top-0 inset-x-0 z-40 p-3 sm:p-5 flex flex-col gap-2.5 bg-gradient-to-b from-royal-midnight/90 via-royal-midnight/40 to-transparent">
        {/* Segmented Progress Bars */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 max-w-2xl mx-auto w-full px-2">
          {ACTS.map((act, index) => {
            const isCompleted = index < currentAct;
            const isCurrent = index === currentAct;
            const fillWidth = isCompleted ? 100 : isCurrent ? actProgress * 100 : 0;

            return (
              <button
                key={act.id}
                onClick={(e) => {
                  e.stopPropagation();
                  goToAct(index);
                }}
                className="flex-1 h-1.5 sm:h-2 rounded-full bg-white/20 overflow-hidden relative group cursor-pointer transition-transform hover:scale-y-125"
                title={`Jump to ${act.title}`}
              >
                <div
                  className="h-full bg-gradient-to-r from-royal-gold via-royal-gold-light to-royal-gold shadow-[0_0_8px_rgba(212,175,55,0.8)] rounded-full transition-all duration-75"
                  style={{ width: `${fillWidth}%` }}
                />
              </button>
            );
          })}
        </div>

        {/* Top Header Bar: Film Mode Label, Audio & Mode Toggles */}
        <div className="flex items-center justify-between max-w-4xl mx-auto w-full px-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-royal-midnight/80 border border-royal-gold/40 text-royal-gold text-[10px] sm:text-xs font-serif uppercase tracking-widest font-semibold backdrop-blur-md">
              <Sparkles className="w-3 h-3 animate-spin [animation-duration:8s]" />
              Royal Cinematic Film
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSound();
              }}
              className="interactive-click flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-midnight/80 border border-royal-gold/40 text-royal-gold hover:border-royal-gold hover:text-royal-gold-light transition-all backdrop-blur-md shadow-lg"
              title={isMuted ? 'Unmute Royal Nadaswaram' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
              <span className="hidden sm:inline text-[11px] font-serif uppercase tracking-wider">
                {isMuted ? 'Muted' : 'Royal Ambience'}
              </span>
            </button>

            {onSwitchToScroll && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSwitchToScroll();
                }}
                className="interactive-click hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-royal-deep-ruby/80 border border-royal-gold/40 text-royal-gold-light text-[11px] font-serif hover:border-royal-gold transition-all backdrop-blur-md"
                title="Switch to traditional scrolling page"
              >
                <Scroll className="w-3.5 h-3.5" />
                <span>Scroll Mode</span>
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowItinerary(true);
              }}
              className="interactive-click flex items-center gap-1 px-3 py-1 rounded-full bg-royal-gold text-royal-midnight font-serif font-bold text-[11px] hover:bg-royal-gold-light transition-all shadow-royal-gold"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Itinerary</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACT CONTENT LAYERS
         ========================================================================= */}

      {/* ACT 0: THE SACRED INVOCATION & PALACE REVEAL */}
      {currentAct === 0 && (
        <div className="absolute inset-0 z-25 flex flex-col items-center justify-center p-4 text-center animate-fade-in pointer-events-none">
          <div className="w-[92vw] max-w-xl mx-auto space-y-4 p-6 sm:p-8 rounded-3xl bg-royal-midnight/85 border border-royal-gold/50 shadow-2xl backdrop-blur-md transform transition-all duration-700 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-deep-ruby/80 border border-royal-gold/40 shadow-royal-gold">
              <Sparkles className="w-4 h-4 text-royal-gold" />
              <span className="text-xs font-serif uppercase tracking-[0.25em] text-royal-gold-light font-bold">
                Auspicious Invocation
              </span>
            </div>

            <h1 className="font-royal text-2xl sm:text-4xl text-gold-gradient font-bold tracking-wider leading-relaxed">
              {weddingConfig.invocation.sanskrit}
            </h1>

            <p className="font-serif italic text-sm sm:text-base text-royal-gold-light font-medium tracking-wide">
              {weddingConfig.invocation.sanskritIast}
            </p>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto my-3" />

            <p className="font-serif text-xs sm:text-sm text-royal-cream/90 leading-relaxed max-w-md mx-auto">
              {weddingConfig.invocation.english}
            </p>
          </div>
        </div>
      )}

      {/* ACT 1: THE ROYAL UNION & COUPLE MONOGRAM */}
      {currentAct === 1 && (
        <div className="absolute inset-0 z-25 flex flex-col items-center justify-center p-4 text-center animate-fade-in pointer-events-none">
          <div className="w-[92vw] max-w-xl mx-auto space-y-4 sm:space-y-5 p-6 sm:p-8 rounded-3xl bg-royal-midnight/85 border border-royal-gold/50 shadow-2xl backdrop-blur-md transform transition-all duration-700 animate-slide-up">
            {/* Monogram Crest */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto bg-gradient-to-br from-royal-gold via-royal-gold-light to-royal-gold-dark p-0.5 shadow-royal-gold">
              <div className="w-full h-full rounded-full bg-royal-midnight flex items-center justify-center border border-royal-gold/40">
                <span className="font-royal text-xl sm:text-2xl text-gold-gradient font-bold tracking-wider">
                  A ✦ R
                </span>
              </div>
            </div>

            <p className="text-xs font-serif uppercase tracking-[0.3em] text-royal-gold font-bold">
              {weddingConfig.couple.invitationGreeting}
            </p>

            <h2 className="font-royal text-3xl sm:text-5xl text-gold-gradient font-bold tracking-wide">
              {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
            </h2>

            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-serif text-royal-gold-light">
              <span>{weddingConfig.couple.groom.familyLineage}</span>
              <span className="text-royal-gold">✦</span>
              <span>{weddingConfig.couple.bride.familyLineage}</span>
            </div>

            <p className="text-xs font-serif italic text-royal-cream/80 max-w-md mx-auto">
              "{weddingConfig.story.quote}"
            </p>
          </div>
        </div>
      )}

      {/* ACT 2: THE NISHANE AANE HERALD MARCH (HALO-FREE WALKING ELEPHANT) */}
      <div
        ref={walkingElephantRef}
        onClick={handleElephantTap}
        className="absolute left-1/2 bottom-[2.5%] sm:bottom-[3.5%] h-[68vh] sm:h-[72vh] md:h-[75vh] aspect-[9/16] w-auto max-w-[95vw] cursor-pointer z-22 group opacity-0 -translate-x-1/2"
        style={{ willChange: 'transform, opacity' }}
        title="Tap the Herald Elephant to accelerate stride!"
      >
        {/* Soft realistic ground contact shadow beneath feet */}
        <div className="absolute left-[8%] right-[8%] bottom-1 sm:bottom-2 h-8 sm:h-12 bg-black/95 rounded-full blur-xl transform scale-y-40 pointer-events-none" />

        {/* Halo-Free Walking Elephant Video */}
        <div className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/elephant-walking-mysore-poster.webp"
            className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
          >
            <source src="/assets/elephant-walking-mysore.webm" type="video/webm" />
            <source src="/assets/elephant-walking-mysore.mp4" type="video/mp4" />
            <source src="/assets/elephant-walking-mysore-720p.mp4" type="video/mp4" />
            <img
              src="/assets/elephant-walking-mysore-poster.png"
              alt="Royal Mysore Herald Elephant carrying Golden Ambari"
              className="w-full h-full object-contain"
            />
          </video>
        </div>
      </div>

      {currentAct === 2 && (
        <div className="absolute top-16 sm:top-20 inset-x-0 z-30 flex justify-center px-4 pointer-events-none animate-fade-in">
          <div className="text-center max-w-xl mx-auto space-y-1.5 p-3 sm:p-4 rounded-2xl bg-royal-midnight/90 border border-royal-gold/40 shadow-xl backdrop-blur-md">
            <p className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-royal-gold font-bold">
              Scene Three — The Imperial Courtyard
            </p>
            <h2 className="font-royal text-lg sm:text-2xl text-gold-gradient font-bold tracking-wider">
              The Nishane Aane Herald March
            </h2>
            <p className="text-[11px] sm:text-xs font-serif text-royal-cream/90">
              Chinnada Ambari • The 750kg Golden Howdah heralding the sacred union
            </p>
          </div>
        </div>
      )}

      {/* ACT 3: SACRED MUHURTHAM & KALYANA SHASANA */}
      {currentAct === 3 && (
        <div className="absolute inset-0 z-25 flex flex-col items-center justify-center p-4 text-center animate-fade-in pointer-events-none">
          <div className="w-[92vw] max-w-lg mx-auto space-y-3.5 sm:space-y-4 p-6 sm:p-8 rounded-3xl bg-royal-midnight/90 border border-royal-gold/60 shadow-2xl backdrop-blur-md transform transition-all duration-700 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-royal-deep-ruby/90 border border-royal-gold/50 shadow-royal-gold">
              <Calendar className="w-3.5 h-3.5 text-royal-gold" />
              <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.2em] text-royal-gold-light font-bold">
                Kalyana Shasana • Sacred Date
              </span>
            </div>

            <h3 className="font-royal text-2xl sm:text-4xl text-gold-gradient font-bold">
              {weddingConfig.couple.weddingDateText}
            </h3>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-serif text-royal-gold-light font-medium bg-royal-gold/10 px-4 py-1.5 rounded-full border border-royal-gold/30">
              <Clock className="w-4 h-4 text-royal-gold" />
              <span>{weddingConfig.couple.muhurthamTime}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-serif text-royal-cream/90">
              <MapPin className="w-4 h-4 text-royal-gold shrink-0" />
              <span>{weddingConfig.venue.name}, {weddingConfig.couple.city}</span>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGoogleCalendar();
                }}
                className="interactive-click flex items-center gap-1.5 px-4 py-2 rounded-full bg-royal-gold text-royal-midnight font-serif font-bold text-xs hover:bg-royal-gold-light transition-all shadow-royal-gold"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACT 4: GRAND FINALE & INTERACTIVE ROYAL HUB */}
      {currentAct === 4 && (
        <div className="absolute inset-0 z-25 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
          {/* Twin Royal Elephants on left and right */}
          <div className="absolute left-2 sm:left-12 bottom-12 w-28 sm:w-44 aspect-[3/4] pointer-events-none opacity-85">
            <img src="/assets/elephant-left.png" alt="Twin Guardian Left" className="w-full h-full object-contain filter drop-shadow-xl" />
          </div>
          <div className="absolute right-2 sm:right-12 bottom-12 w-28 sm:w-44 aspect-[3/4] pointer-events-none opacity-85">
            <img src="/assets/elephant-right.png" alt="Twin Guardian Right" className="w-full h-full object-contain filter drop-shadow-xl" />
          </div>

          <div className="w-[94vw] max-w-xl mx-auto space-y-4 p-6 sm:p-8 rounded-3xl bg-royal-midnight/92 border-2 border-royal-gold/60 shadow-2xl backdrop-blur-lg transform transition-all duration-700 animate-slide-up relative z-30">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-royal-deep-ruby/90 border border-royal-gold/50 shadow-royal-gold">
              <Sparkles className="w-3.5 h-3.5 text-royal-gold" />
              <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.25em] text-royal-gold-light font-bold">
                Royal Benediction
              </span>
            </div>

            <h2 className="font-royal text-2xl sm:text-4xl text-gold-gradient font-bold tracking-wide">
              We Seek Your Auspicious Blessings
            </h2>

            <p className="text-xs sm:text-sm font-serif text-royal-cream/90 max-w-md mx-auto leading-relaxed">
              {weddingConfig.story.blessing}
            </p>

            {/* Instant Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRSVPWhatsApp();
                }}
                className="interactive-click flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-serif font-bold text-xs sm:text-sm hover:brightness-110 shadow-lg transition-all"
              >
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>RSVP on WhatsApp</span>
              </button>

              <a
                href={weddingConfig.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="interactive-click flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-royal-midnight border border-royal-gold/50 text-royal-gold hover:bg-royal-gold hover:text-royal-midnight font-serif font-bold text-xs sm:text-sm shadow-lg transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>Google Maps Directions</span>
              </a>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowItinerary(true);
                }}
                className="interactive-click flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-royal-midnight border border-royal-gold/50 text-royal-gold-light hover:border-royal-gold font-serif font-semibold text-xs sm:text-sm transition-all"
              >
                <Scroll className="w-4 h-4 text-royal-gold" />
                <span>Ceremonies & Itinerary</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToAct(0);
                }}
                className="interactive-click flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-royal-midnight border border-royal-gold/50 text-royal-cream hover:text-royal-gold font-serif font-medium text-xs sm:text-sm transition-all"
              >
                <RotateCcw className="w-4 h-4 text-royal-gold" />
                <span>Watch Royal Film Again</span>
              </button>
            </div>

            {onReopenEnvelope && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReopenEnvelope();
                }}
                className="interactive-click text-[11px] font-serif text-royal-gold/70 hover:text-royal-gold transition-colors pt-1 block mx-auto underline decoration-dotted"
              >
                ← Return to Physical Wax Seal Envelope
              </button>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          BOTTOM CONTROL BAR
         ========================================================================= */}
      <div className="absolute bottom-3 inset-x-0 z-40 flex items-center justify-between px-4 sm:px-8 max-w-4xl mx-auto w-full">
        {/* Play / Pause Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(p => !p);
          }}
          className="interactive-click flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-midnight/90 border border-royal-gold/40 text-royal-gold hover:border-royal-gold hover:text-royal-gold-light transition-all backdrop-blur-md shadow-lg"
          title={isPlaying ? 'Pause Film' : 'Resume Film'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="text-[11px] font-serif uppercase tracking-wider font-semibold">
            {isPlaying ? 'Pause' : 'Play'}
          </span>
        </button>

        {/* Current Act Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-serif text-royal-gold-light bg-royal-midnight/80 px-4 py-1 rounded-full border border-royal-gold/30 backdrop-blur-md">
          <span className="text-royal-gold font-bold">Act {currentAct + 1} of 5:</span>
          <span>{ACTS[currentAct].title}</span>
        </div>

        {/* Skip to RSVP / Next Act */}
        {currentAct < ACTS.length - 1 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToAct(currentAct + 1);
            }}
            className="interactive-click flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-royal-deep-ruby/90 border border-royal-gold/50 text-royal-gold-light hover:bg-royal-deep-ruby text-[11px] font-serif font-bold uppercase tracking-wider transition-all shadow-royal-gold"
          >
            <span>Next Act</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRSVPWhatsApp();
            }}
            className="interactive-click flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-royal-gold text-royal-midnight text-[11px] font-serif font-bold uppercase tracking-wider transition-all shadow-royal-gold"
          >
            <span>RSVP Now</span>
            <CheckCircle className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Interactive Tap Blessing Toast */}
      {blessingActive && (
        <div className="absolute top-24 inset-x-0 z-50 flex justify-center pointer-events-none animate-bounce">
          <div className="px-5 py-2 rounded-full bg-royal-deep-ruby/95 border border-royal-gold text-royal-gold-light text-xs sm:text-sm font-serif font-bold shadow-2xl backdrop-blur-md">
            {blessingMessage}
          </div>
        </div>
      )}

      {/* =========================================================================
          FULL CEREMONIES & ITINERARY MODAL (SLIDE-UP DRAWER)
         ========================================================================= */}
      {showItinerary && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div className="w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-royal-midnight border border-royal-gold/60 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-royal-gold/30 pb-4">
              <div>
                <p className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-royal-gold font-bold">
                  Royal Wedding Itinerary
                </p>
                <h3 className="font-royal text-xl sm:text-2xl text-gold-gradient font-bold">
                  Sacred Ceremonies & Schedule
                </h3>
              </div>
              <button
                onClick={() => setShowItinerary(false)}
                className="w-8 h-8 rounded-full bg-royal-deep-ruby/80 border border-royal-gold/40 flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-royal-midnight transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {weddingConfig.ceremonies.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-royal-midnight/90 border border-royal-gold/30 space-y-2 hover:border-royal-gold/70 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-royal text-base sm:text-lg text-royal-gold font-bold">
                      {c.title}
                    </h4>
                    <span className="text-[11px] font-serif text-royal-gold-light px-2.5 py-0.5 rounded-full bg-royal-deep-ruby border border-royal-gold/30 shrink-0">
                      {c.date}
                    </span>
                  </div>

                  <p className="text-xs font-serif italic text-royal-cream/90">
                    {c.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-serif text-royal-gold-light/90 pt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-royal-gold" />
                      <span>{c.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-royal-gold" />
                      <span>{c.venue}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-royal-gold/10 text-xs">
                    <span className="text-[11px] text-royal-cream/70 italic">Dress Code: {c.dressCode}</span>
                    <a
                      href={c.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-royal-gold hover:text-royal-gold-light font-serif underline"
                    >
                      <span>Map</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowItinerary(false)}
                className="px-6 py-2 rounded-full bg-royal-gold text-royal-midnight font-serif font-bold text-xs hover:bg-royal-gold-light transition-all shadow-royal-gold"
              >
                Back to Royal Film
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
