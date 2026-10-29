import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Sparkles, 
  Film,
  Compass,
  Flower2
} from 'lucide-react';

const CHAPTERS = [
  { id: 'invocation', name: 'Palace & Invocation', targetPercent: 0.08 },
  { id: 'herald', name: 'Nishane Aane March', targetPercent: 0.28 },
  { id: 'ambari-scroll', name: 'Golden Ambari Scroll', targetPercent: 0.52 },
  { id: 'our-story', name: 'Our Story', targetPercent: 0.68 },
  { id: 'ceremonies', name: 'Ceremonies', targetPercent: 0.82 },
  { id: 'venue-rsvp', name: 'Venue & RSVP', targetPercent: 1.0 }
];

// Stately Storybook Film Waypoints: Paced with gentle reading pauses so guests comfortably absorb every royal scene
const STORYBOOK_WAYPOINTS = [
  { targetPercent: 0.00, pause: 2.4, title: '✦ Scene I — The Imperial Palace Reveal ✦' },
  { targetPercent: 0.08, pause: 3.4, title: '✦ Scene II — Royal Couple Monogram & Blessing ✦' },
  { targetPercent: 0.16, pause: 3.4, title: '✦ Scene III — Auspicious Date & Muhurtham ✦' },
  { targetPercent: 0.25, pause: 4.0, title: '✦ Scene IV — Nishane Aane Herald March ✦', isElephantMarch: true },
  { targetPercent: 0.38, pause: 3.2, title: '✦ Scene IV (Part II) — Twin Imperial Guardians ✦' },
  { targetPercent: 0.52, pause: 3.4, title: '✦ Kalyana Shasana — Golden Ambari Scroll ✦' },
  { targetPercent: 0.68, pause: 3.2, title: '✦ Our Sacred Story ✦' },
  { targetPercent: 0.82, pause: 4.0, title: '✦ Sacred Ceremonies & Auspicious Timings ✦' },
  { targetPercent: 1.00, pause: 0.0, title: '✦ Royal Procession Complete • Shower Blessings! ✦' }
];

export default function UnifiedCinematicController({ isEnvelopeOpen, onReopenEnvelope }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0); // 0 to 1
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const animFrameRef = useRef(null);
  const isPlayingRef = useRef(false);
  const playGracePeriodRef = useRef(0);
  const touchStartYRef = useRef(0);
  const toastTimerRef = useRef(null);
  const pauseUntilRef = useRef(0);
  const nextWaypointIdxRef = useRef(0);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToast(false), 2800);
  };

  // Helper: Trigger Pushpa Vrushti flower shower (Interactive Option A)
  const triggerPushpaShower = (count = 75, message = '🌸 Pushpa Vrushti Bestowed • May the Couple Be Blessed! 🌸') => {
    try {
      window.dispatchEvent(
        new CustomEvent('trigger-pushpa-vrushti', {
          detail: { count, x: 0.5, y: 0.22 }
        })
      );
    } catch (e) {}
    if (message) {
      showNotification(message);
    }
  };

  // Track overall scroll progress & active chapter in real time
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setOverallProgress(progress);

      // Determine active chapter based on targetPercent
      let activeIdx = 0;
      for (let i = 0; i < CHAPTERS.length; i++) {
        if (progress >= (i === 0 ? 0 : (CHAPTERS[i - 1].targetPercent + CHAPTERS[i].targetPercent) / 2)) {
          activeIdx = i;
        }
      }
      setCurrentChapter(activeIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect manual user touch or wheel to auto-pause Video Mode with robust thresholds
  useEffect(() => {
    const handleUserInterrupt = () => {
      if (isPlayingRef.current) {
        // Only interrupt after initial 900ms grace period has passed (prevents button tap / inertia from aborting)
        if (performance.now() < playGracePeriodRef.current) return;

        setIsPlaying(false);
        isPlayingRef.current = false;
        document.documentElement.style.scrollBehavior = '';
        showNotification('Tour Paused • Scroll freely or tap ▶ to resume');
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!isPlayingRef.current) return;
      if (performance.now() < playGracePeriodRef.current) return;
      if (e.touches && e.touches[0]) {
        const delta = Math.abs(e.touches[0].clientY - touchStartYRef.current);
        // Only cancel if user intentionally dragged finger more than 28px
        if (delta > 28) {
          handleUserInterrupt();
        }
      }
    };

    const handleWheel = (e) => {
      if (!isPlayingRef.current) return;
      if (performance.now() < playGracePeriodRef.current) return;
      // Only cancel if intentional user wheel swipe (ignore residual subpixel trackpad inertia)
      if (Math.abs(e.deltaY) > 10) {
        handleUserInterrupt();
      }
    };

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.code)) {
        handleUserInterrupt();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Stately Storybook Cinematic Auto-Cruise Animation Loop with Gentle Scene Pauses
  useEffect(() => {
    isPlayingRef.current = isPlaying;

    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.documentElement.style.scrollBehavior = '';
      return;
    }

    // Set 900ms grace period so tapping the button never self-interrupts
    playGracePeriodRef.current = performance.now() + 900;
    document.documentElement.style.scrollBehavior = 'auto';

    showNotification('✦ Royal Storybook Tour Active • Stately Paced with Scene Pauses ✦');

    let lastTime = performance.now();
    let virtualScrollY = window.scrollY;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Synchronize starting waypoint with current scroll position
    let startIdx = 0;
    if (maxScroll > 0) {
      for (let i = 0; i < STORYBOOK_WAYPOINTS.length; i++) {
        if (STORYBOOK_WAYPOINTS[i].targetPercent * maxScroll > virtualScrollY + 25) {
          startIdx = i;
          break;
        }
        if (i === STORYBOOK_WAYPOINTS.length - 1) {
          startIdx = 0;
          virtualScrollY = 0;
          window.scrollTo(0, 0);
        }
      }
    }
    nextWaypointIdxRef.current = startIdx;
    pauseUntilRef.current = 0;

    const cruiseStep = (now) => {
      if (!isPlayingRef.current) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const currentMaxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (currentMaxScroll <= 0) return;

      // 1. If currently in a dignified reading pause, hold position smoothly
      if (now < pauseUntilRef.current) {
        animFrameRef.current = requestAnimationFrame(cruiseStep);
        return;
      }

      // 2. Check if reached bottom finale
      if (virtualScrollY >= currentMaxScroll - 10) {
        setIsPlaying(false);
        isPlayingRef.current = false;
        document.documentElement.style.scrollBehavior = '';
        showNotification('✦ Royal Procession Complete • We Seek Your Blessings! ✦');
        try {
          window.dispatchEvent(new CustomEvent('trigger-pushpa-vrushti', {
            detail: { count: 85, x: 0.5, y: 0.22 }
          }));
        } catch (e) {}
        return;
      }

      // 3. Glide gracefully towards the current target waypoint
      const currentIdx = nextWaypointIdxRef.current;
      if (currentIdx < STORYBOOK_WAYPOINTS.length) {
        const wp = STORYBOOK_WAYPOINTS[currentIdx];
        const targetY = wp.targetPercent * currentMaxScroll;

        if (virtualScrollY < targetY - 4) {
          // Stately glide between scenes (~2.8 - 3.4 seconds travel)
          const distance = targetY - virtualScrollY;
          const glideSpeed = Math.max(currentMaxScroll / 34, distance / 2.8);
          virtualScrollY += glideSpeed * dt;

          if (virtualScrollY >= targetY - 4) {
            virtualScrollY = targetY;
            window.scrollTo(0, virtualScrollY);
            nextWaypointIdxRef.current = currentIdx + 1;

            if (wp.title) showNotification(wp.title);

            if (wp.isElephantMarch) {
              try {
                window.dispatchEvent(new CustomEvent('trigger-pushpa-vrushti', {
                  detail: { count: 75, x: 0.5, y: 0.25 }
                }));
              } catch (e) {}
            }

            if (wp.pause > 0) {
              pauseUntilRef.current = now + (wp.pause * 1000);
            }
          } else {
            window.scrollTo(0, virtualScrollY);
          }
        } else {
          nextWaypointIdxRef.current = currentIdx + 1;
        }
      } else {
        // Final gentle descent to venue
        virtualScrollY += (currentMaxScroll / 24) * dt;
        window.scrollTo(0, virtualScrollY);
      }

      animFrameRef.current = requestAnimationFrame(cruiseStep);
    };

    animFrameRef.current = requestAnimationFrame(cruiseStep);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.documentElement.style.scrollBehavior = '';
    };
  }, [isPlaying]);

  // Jump to specific chapter
  const scrollToChapter = (chapterIdx) => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = CHAPTERS[chapterIdx].targetPercent * maxScroll;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    isPlayingRef.current = next;

    if (next) {
      playGracePeriodRef.current = performance.now() + 900;
    }

    // If starting from the very end, restart from top
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (next && window.scrollY >= maxScroll - 20) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const restartTour = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsPlaying(true);
      isPlayingRef.current = true;
    }, 600);
  };

  const nextChapter = () => {
    const next = Math.min(CHAPTERS.length - 1, currentChapter + 1);
    scrollToChapter(next);
  };

  const prevChapter = () => {
    const prev = Math.max(0, currentChapter - 1);
    scrollToChapter(prev);
  };

  const toggleSound = () => {
    setIsMuted((m) => {
      const next = !m;
      try {
        window.dispatchEvent(new CustomEvent('toggle-royal-music', { detail: { mute: next } }));
      } catch (e) {}
      const audios = document.querySelectorAll('audio');
      audios.forEach((a) => {
        a.muted = next;
      });
      return next;
    });
  };

  if (!isEnvelopeOpen) return null;

  return (
    <>
      {/* =========================================================================
          FIXED TOP CINEMATIC HEADER (Story Progress Bars & Video Controls)
         ========================================================================= */}
      <header className="fixed top-0 inset-x-0 z-40 bg-royal-midnight/95 border-b border-royal-gold/25 backdrop-blur-md shadow-2xl transition-all duration-300">
        <div className="max-w-6xl mx-auto px-2.5 sm:px-6 py-1.5 sm:py-2.5 flex flex-col gap-1.5 sm:gap-2">
          {/* Segmented Story Progress Bars (6 Chapters) */}
          <div className="flex items-center gap-1 sm:gap-2 w-full">
            {CHAPTERS.map((ch, idx) => {
              // Calculate fill for this specific chapter segment
              const prevTarget = idx === 0 ? 0 : CHAPTERS[idx - 1].targetPercent;
              const curTarget = ch.targetPercent;
              const segmentRange = curTarget - prevTarget;
              
              let segmentProgress = 0;
              if (overallProgress >= curTarget) {
                segmentProgress = 1;
              } else if (overallProgress > prevTarget) {
                segmentProgress = (overallProgress - prevTarget) / segmentRange;
              }

              return (
                <button
                  key={ch.id}
                  onClick={() => scrollToChapter(idx)}
                  className="flex-1 h-1 sm:h-1.5 rounded-full bg-white/15 overflow-hidden relative group cursor-pointer transition-transform hover:scale-y-125"
                  title={`Jump to ${ch.name}`}
                >
                  <div
                    className="h-full bg-gradient-to-r from-royal-gold via-royal-gold-light to-royal-gold shadow-[0_0_8px_rgba(212,175,55,0.8)] rounded-full transition-all duration-100"
                    style={{ width: `${segmentProgress * 100}%` }}
                  />
                </button>
              );
            })}
          </div>

          {/* Action Row: Fully Responsive for Mobile & Desktop */}
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 text-xs sm:text-sm">
            {/* Left: Royal Status Badge (Desktop) / Minimal Monogram (Mobile) */}
            <div className="flex items-center">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-royal-midnight border border-royal-gold/40 text-royal-gold text-[10px] sm:text-xs font-serif uppercase tracking-widest font-semibold shadow-inner whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-royal-gold animate-spin [animation-duration:8s]" />
                <span>Royal Mysore</span>
              </span>
              <span className="sm:hidden text-[9px] font-royal tracking-widest text-royal-gold/90 uppercase font-bold pl-1">
                ✦ Mysore
              </span>
            </div>

            {/* Center: Play/Pause Video Tour + Shower Blessings Button */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={prevChapter}
                disabled={currentChapter === 0}
                className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-royal-midnight/90 border border-royal-gold/30 text-royal-gold hover:border-royal-gold disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="Previous Chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Play / Pause Video Tour */}
              <button
                onClick={togglePlay}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-serif font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-royal-gold whitespace-nowrap ${
                  isPlaying
                    ? 'bg-royal-deep-ruby border border-royal-gold text-royal-gold-light shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                    : 'bg-gradient-to-r from-royal-gold to-royal-gold-light text-royal-midnight hover:brightness-110'
                }`}
                title={isPlaying ? 'Pause Video Tour' : 'Play Video Tour (Auto-Scroll)'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                    <span>Play Tour</span>
                  </>
                )}
              </button>

              <button
                onClick={nextChapter}
                disabled={currentChapter === CHAPTERS.length - 1}
                className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-royal-midnight/90 border border-royal-gold/30 text-royal-gold hover:border-royal-gold disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="Next Chapter"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Interactive Pushpa Vrushti Button (Only Blessings Trigger Petals) */}
              <button
                onClick={() => triggerPushpaShower(70, '🌸 Pushpa Vrushti Bestowed • May the Couple Be Blessed! 🌸')}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 hover:from-amber-500/35 hover:to-rose-500/35 border border-royal-gold/60 text-royal-gold hover:text-white shadow-[0_0_12px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer whitespace-nowrap"
                title="Shower Auspicious Petals (Pushpa Vrushti)"
              >
                <Flower2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-royal-gold group-hover:rotate-45 group-hover:text-rose-400 transition-all animate-pulse" />
                <span className="font-serif font-bold text-[10px] sm:text-xs uppercase tracking-wider text-royal-gold group-hover:text-royal-gold-light">
                  Blessings
                </span>
              </button>
            </div>

            {/* Right: Sound Toggle & Chapter Indicator */}
            <div className="flex items-center gap-1 sm:gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-[11px] font-serif text-royal-gold-light bg-royal-midnight/80 px-3 py-1 rounded-full border border-royal-gold/30">
                <span className="text-royal-gold font-bold">Act {currentChapter + 1}/6:</span>
                <span className="truncate max-w-[130px]">{CHAPTERS[currentChapter].name}</span>
              </div>

              <button
                onClick={toggleSound}
                className="flex items-center justify-center w-7 h-7 sm:w-auto sm:px-2.5 sm:py-1 rounded-full bg-royal-midnight/80 border border-royal-gold/40 text-royal-gold hover:border-royal-gold hover:text-royal-gold-light transition-all shadow-md"
                title={isMuted ? 'Unmute Royal Music' : 'Mute Music'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
                <span className="hidden lg:inline text-[10px] font-serif uppercase tracking-wider ml-1">
                  {isMuted ? 'Muted' : 'Music'}
                </span>
              </button>

              <button
                onClick={restartTour}
                className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-royal-midnight/80 border border-royal-gold/30 text-royal-gold hover:text-royal-gold-light hover:border-royal-gold transition-all"
                title="Replay from Beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Toast Message */}
      {showToast && (
        <div className="fixed top-20 inset-x-0 z-50 flex justify-center pointer-events-none px-4 animate-fade-in">
          <div className="px-4 sm:px-6 py-2 rounded-full bg-royal-deep-ruby/95 border border-royal-gold text-royal-gold-light text-xs sm:text-sm font-serif font-bold shadow-2xl backdrop-blur-md animate-bounce">
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
}
