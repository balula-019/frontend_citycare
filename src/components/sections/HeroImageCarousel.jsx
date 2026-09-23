// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, FileCheck2, Sparkles, HeartCrack } from 'lucide-react';

// // ✅ Drop these four images into ../../assets/ exactly as named
// import loserImage  from '../../assets/loser.png';
// import searchImage from '../../assets/search.png';
// import reportImage from '../../assets/report.png';
// import matchImage  from '../../assets/match.png';

// /* ── Brand palette ────────────────────────────────────────────── */
// const BLUE  = '#1A56DB';
// const GREEN = '#10B981';
// const AMBER = '#F59E0B';
// const SLATE = '#64748B';

// /* ── The four-beat story ─────────────────────────────────────────
//    1. loser  – the pain point (muted, heavy, still)
//    2. search – PataChako scans its network (blue, active scanning)
//    3. report – reporting takes seconds (blue→green, confidence)
//    4. match  – AI finds it (green/gold, celebratory payoff)
// ------------------------------------------------------------------ */
// const BEATS = [
//   {
//     key: 'loser',
//     src: loserImage,
//     icon: HeartCrack,
//     eyebrow: 'The problem',
//     title: 'Lost something valuable?',
//     sub: 'That sinking feeling when it\u2019s just… gone.',
//     accent: SLATE,
//     hold: 3400,
//   },
//   {
//     key: 'search',
//     src: searchImage,
//     icon: Search,
//     eyebrow: 'PataChako searches',
//     title: 'We scan every verified location',
//     sub: 'Police stations, airports, universities — all in one network.',
//     accent: BLUE,
//     hold: 3400,
//   },
//   {
//     key: 'report',
//     src: reportImage,
//     icon: FileCheck2,
//     eyebrow: 'You report',
//     title: 'Report it in seconds',
//     sub: 'A quick, guided form is all it takes.',
//     accent: BLUE,
//     hold: 3200,
//   },
//   {
//     key: 'match',
//     src: matchImage,
//     icon: Sparkles,
//     eyebrow: 'AI matching',
//     title: 'Found. Matched. Returned.',
//     sub: 'Our AI connects your report to the real thing — automatically.',
//     accent: GREEN,
//     hold: 4400,
//   },
// ];

// /* ── Radar sweep rings — "search" beat only ──────────────────────── */
// const SearchPulse = () => (
//   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//     {[0, 1, 2].map((i) => (
//       <motion.div
//         key={i}
//         className="absolute w-40 h-40 md:w-64 md:h-64 rounded-full border-2"
//         style={{ borderColor: BLUE }}
//         initial={{ scale: 0.6, opacity: 0.6 }}
//         animate={{ scale: 2.8, opacity: 0 }}
//         transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
//       />
//     ))}
//   </div>
// );

// /* ── Sparkle burst — "match" beat only ───────────────────────────── */
// const MatchBurst = () => {
//   const particles = useMemo(
//     () =>
//       Array.from({ length: 20 }).map((_, i) => ({
//         id: i,
//         angle: (360 / 20) * i,
//         delay: Math.random() * 0.35,
//         dist: 140 + Math.random() * 120,
//       })),
//     []
//   );

//   return (
//     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//       {particles.map((p) => {
//         const rad = (p.angle * Math.PI) / 180;
//         const x = Math.cos(rad) * p.dist;
//         const y = Math.sin(rad) * p.dist;
//         return (
//           <motion.span
//             key={p.id}
//             className="absolute w-2.5 h-2.5 rounded-full"
//             style={{ background: p.id % 2 === 0 ? GREEN : AMBER }}
//             initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
//             animate={{ x, y, opacity: 0, scale: 1 }}
//             transition={{ duration: 1.3, delay: 0.15 + p.delay, ease: 'easeOut' }}
//           />
//         );
//       })}
//       <motion.div
//         className="absolute w-64 h-64 rounded-full"
//         style={{ background: `radial-gradient(circle, ${GREEN}55 0%, transparent 70%)` }}
//         initial={{ scale: 0, opacity: 0.9 }}
//         animate={{ scale: 2.6, opacity: 0 }}
//         transition={{ duration: 1.1, ease: 'easeOut' }}
//       />
//     </div>
//   );
// };

// /* ── Full-bleed background image for the current beat ───────────── */
// const BeatBackground = ({ beat }) => {
//   const isLoser = beat.key === 'loser';
//   const isMatch = beat.key === 'match';

//   return (
//     <motion.div
//       key={beat.key}
//       className="absolute inset-0"
//       initial={{ opacity: 0, scale: 1.06 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 1.02 }}
//       transition={{ duration: 0.9, ease: 'easeOut' }}
//     >
//       <motion.img
//         src={beat.src}
//         alt={beat.title}
//         className="w-full h-full object-cover select-none"
//         style={{
//           filter: isLoser
//             ? 'grayscale(30%) brightness(0.85)'
//             : 'brightness(0.9)',
//         }}
//         animate={
//           isMatch
//             ? { scale: [1, 1.04, 1] }
//             : { scale: [1, 1.05, 1] }
//         }
//         transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
//         draggable={false}
//       />

//       {/* Readability gradient so overlaid text always pops */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             'linear-gradient(180deg, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0.15) 35%, rgba(2,6,23,0.55) 78%, rgba(2,6,23,0.8) 100%)',
//         }}
//       />

//       {beat.key === 'search' && <SearchPulse />}
//       {beat.key === 'match' && <MatchBurst />}
//     </motion.div>
//   );
// };

// /* ── Journey rail across the top — four stops, animated progress ── */
// const JourneyRail = ({ current }) => (
//   <div className="flex items-center w-full max-w-md mx-auto px-2">
//     {BEATS.map((beat, i) => {
//       const Icon = beat.icon;
//       const active = i === current;
//       const done = i < current;
//       return (
//         <div key={beat.key} className="flex items-center flex-1 last:flex-none">
//           <motion.div
//             className="flex items-center justify-center rounded-full shrink-0"
//             animate={{
//               width: active ? 40 : 30,
//               height: active ? 40 : 30,
//               background: active || done ? beat.accent : 'rgba(255,255,255,0.25)',
//               boxShadow: active ? `0 0 0 6px ${beat.accent}33` : '0 0 0 0px transparent',
//             }}
//             transition={{ duration: 0.4, ease: 'easeInOut' }}
//           >
//             <Icon size={active ? 18 : 14} color="white" />
//           </motion.div>
//           {i < BEATS.length - 1 && (
//             <div className="flex-1 h-[3px] mx-1.5 rounded-full bg-white/25 overflow-hidden">
//               <motion.div
//                 className="h-full rounded-full"
//                 style={{ background: beat.accent }}
//                 initial={{ width: '0%' }}
//                 animate={{ width: i < current ? '100%' : '0%' }}
//                 transition={{ duration: 0.5, ease: 'easeInOut' }}
//               />
//             </div>
//           )}
//         </div>
//       );
//     })}
//   </div>
// );

// /* ── Text block for the current beat, overlaid near the bottom ──── */
// const BeatCopy = ({ beat }) => (
//   <motion.div
//     key={beat.key}
//     initial={{ opacity: 0, y: 18 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: -10 }}
//     transition={{ duration: 0.45, ease: 'easeOut' }}
//     className="text-center max-w-xl mx-auto px-4"
//   >
//     <span
//       className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
//       style={{ background: `${beat.accent}33`, color: 'white' }}
//     >
//       {beat.eyebrow}
//     </span>
//     <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
//       {beat.title}
//     </h3>
//     <p className="text-white/80 mt-3 text-sm md:text-lg">{beat.sub}</p>
//   </motion.div>
// );

// /* ── Main component — full page, full-bleed ──────────────────────── */
// const HeroImageCarousel = () => {
//   const [step, setStep] = useState(0);
//   const beat = BEATS[step];

//   const advance = useCallback(() => {
//     setStep((prev) => (prev + 1) % BEATS.length);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(advance, beat.hold);
//     return () => clearTimeout(timer);
//   }, [step, advance, beat.hold]);

//   // Locks horizontal overflow so the full-bleed breakout below never
//   // creates a scrollbar or clips off-screen.
//   useEffect(() => {
//     const prevOverflowX = document.body.style.overflowX;
//     document.body.style.overflowX = 'hidden';
//     return () => {
//       document.body.style.overflowX = prevOverflowX;
//     };
//   }, []);

//   return (
//     <div className="relative left-1/2 w-screen -translate-x-1/2 min-h-screen overflow-hidden">
//       <AnimatePresence mode="wait">
//         <BeatBackground key={beat.key} beat={beat} />
//       </AnimatePresence>

//       {/* Foreground content, pinned top (journey) and bottom (copy + dots) */}
//       <div className="relative z-10 flex flex-col justify-between min-h-screen py-8">
//         <JourneyRail current={step} />

//         <div className="flex flex-col items-center gap-8 pb-4">
//           <AnimatePresence mode="wait">
//             <BeatCopy beat={beat} />
//           </AnimatePresence>

//           {/* Manual step dots — tap to jump */}
//           <div className="flex items-center gap-2">
//             {BEATS.map((b, i) => (
//               <button
//                 key={b.key}
//                 onClick={() => setStep(i)}
//                 aria-label={`Go to ${b.title}`}
//                 className="rounded-full transition-all duration-300"
//                 style={{
//                   width: i === step ? 22 : 8,
//                   height: 8,
//                   background: i === step ? beat.accent : 'rgba(255,255,255,0.4)',
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroImageCarousel;

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Search, FileCheck2, Sparkles } from 'lucide-react';

// ✅ Drop patachako.mp4 into ../../assets/ exactly as named.
// Optional: drop a matching poster frame at ../../assets/patachako-poster.jpg
import patachakoVideo from '../../assets/patachako.mp4';
// import patachakoPoster from '../../assets/patachako-poster.jpg';

/* ── Brand palette (matches the homepage) ────────────────────────── */
const BLUE  = '#1A56DB';
const GREEN = '#10B981';
const AMBER = '#F59E0B';

/* ── The three things the video shows, in order ──────────────────── */
const CHAPTERS = [
  { key: 'search', icon: Search,     label: 'Search the network',  detail: 'Police, airports & universities in one place', accent: BLUE,  at: 0 },
  { key: 'report', icon: FileCheck2, label: 'Report in seconds',   detail: 'A quick, guided form — no paperwork',           accent: BLUE,  at: 0.34 },
  { key: 'match',  icon: Sparkles,   label: 'AI finds the match',  detail: 'Your report is matched automatically',          accent: GREEN, at: 0.68 },
];

const HeroImageCarousel = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  // Subtle, single parallax move on the video as the section scrolls into
  // and out of view — the one orchestrated motion moment for this section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.9, 0.55, 0.55, 0.9]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // Track playback progress and drive the chapter markers from real video time,
  // so the labels stay honest to what's on screen instead of a fake timer.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!video.duration) return;
      const ratio = video.currentTime / video.duration;
      setProgress(ratio);

      let current = 0;
      CHAPTERS.forEach((c, i) => {
        if (ratio >= c.at) current = i;
      });
      setActiveChapter(current);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative left-1/2 w-screen -translate-x-1/2 min-h-screen overflow-hidden bg-slate-950"
    >
      {/* ── Full-bleed video ──────────────────────────────────────── */}
      <motion.video
        ref={videoRef}
        src={patachakoVideo}
        // poster={patachakoPoster}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale: videoScale }}
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />

      {/* Readability gradient, kept subtle so the footage stays the star */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background:
            'linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.05) 30%, rgba(2,6,23,0.1) 60%, rgba(2,6,23,0.75) 100%)',
        }}
      />

      {/* ── Foreground content ────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        {/* Headline, top-left — echoes the homepage hero's voice */}
        <div className="px-6 md:px-12 pt-14 md:pt-20 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight"
          >
            See how a lost item{' '}
            <span
              style={{
                background: `linear-gradient(90deg, ${BLUE}, #A855F7, #EC4899)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              finds its way home
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-white/75 mt-3 text-sm md:text-lg max-w-md"
          >
            One report, one network, one AI match — watch the whole journey.
          </motion.p>
        </div>

        {/* Bottom bar: chapter readout, progress, controls */}
        <div className="px-6 md:px-12 pb-8 md:pb-10">
          {/* Chapter markers */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {CHAPTERS.map((c, i) => {
              const Icon = c.icon;
              const active = i === activeChapter;
              return (
                <div
                  key={c.key}
                  className="flex items-center gap-2.5 rounded-2xl px-4 py-2.5 backdrop-blur-md border transition-colors duration-300"
                  style={{
                    background: active ? `${c.accent}26` : 'rgba(255,255,255,0.06)',
                    borderColor: active ? `${c.accent}66` : 'rgba(255,255,255,0.14)',
                  }}
                >
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-full shrink-0"
                    style={{ background: active ? c.accent : 'rgba(255,255,255,0.16)' }}
                  >
                    <Icon size={14} color="white" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-white text-xs md:text-sm font-semibold">{c.label}</p>
                    {active && (
                      <p className="text-white/70 text-[11px] md:text-xs hidden sm:block">{c.detail}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress + controls row */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-colors shrink-0"
            >
              {isPlaying ? <Pause size={16} color="white" /> : <Play size={16} color="white" />}
            </button>

            <div className="flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress * 100}%`,
                  background: `linear-gradient(90deg, ${BLUE}, ${GREEN})`,
                  transition: 'width 120ms linear',
                }}
              />
            </div>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-colors shrink-0"
            >
              {isMuted ? <VolumeX size={16} color="white" /> : <Volume2 size={16} color="white" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroImageCarousel;