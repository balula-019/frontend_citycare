import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  { key: 'search', icon: Search,     label: 'Search the network', detail: 'Police, airports & universities in one place', accent: BLUE,  at: 0 },
  { key: 'report', icon: FileCheck2, label: 'Report in seconds',  detail: 'A quick, guided form — no paperwork',           accent: BLUE,  at: 0.34 },
  { key: 'match',  icon: Sparkles,   label: 'AI finds the match', detail: 'Your report is matched automatically',          accent: GREEN, at: 0.68 },
];

const HeroImageCarousel = () => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

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

  // Track playback progress and drive chapter markers from real video time,
  // so labels stay honest to what's actually on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!video.duration) return;
      const ratio = video.currentTime / video.duration;

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
    <section className="relative left-1/2 w-screen -translate-x-1/2 py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-slate-950 via-[#0B1330] to-slate-950 overflow-hidden">
      {/* Ambient brand glow — decorative only, never covers content */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${BLUE}33 0%, transparent 70%)` }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Headline — always full-width text, never sits on top of the video */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
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
          </h2>
          <p className="text-white/70 mt-3 text-sm md:text-lg">
            One report, one network, one AI match — watch the whole journey.
          </p>
        </motion.div>

        {/* Chapter markers — sit above the video, so nothing overlaps the footage */}
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mb-6">
          {CHAPTERS.map((c, i) => {
            const Icon = c.icon;
            const active = i === activeChapter;
            return (
              <div
                key={c.key}
                className="flex items-center gap-2 rounded-full px-3.5 py-2 border transition-colors duration-300"
                style={{
                  background: active ? `${c.accent}1F` : 'rgba(255,255,255,0.04)',
                  borderColor: active ? `${c.accent}66` : 'rgba(255,255,255,0.12)',
                }}
              >
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full shrink-0"
                  style={{ background: active ? c.accent : 'rgba(255,255,255,0.16)' }}
                >
                  <Icon size={12} color="white" />
                </span>
                <span className="text-white text-xs md:text-sm font-semibold whitespace-nowrap">
                  {c.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Video frame ───────────────────────────────────────────
            aspect-[4/5] on phones (taller viewport, less letterboxing),
            aspect-video on larger screens. object-contain guarantees the
            full frame is always visible — nothing is ever cropped. */}
        <div className="relative w-full max-w-3xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
          <video
            ref={videoRef}
            src={patachakoVideo}
            // poster={patachakoPoster}
            className="w-full h-auto block"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
        </div>

        {/* Controls — just play/pause and mute, no progress line */}
        <div className="flex items-center justify-center gap-3 md:gap-4 max-w-3xl mx-auto mt-4">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-colors shrink-0"
          >
            {isPlaying ? <Pause size={15} color="white" /> : <Play size={15} color="white" />}
          </button>

          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-colors shrink-0"
          >
            {isMuted ? <VolumeX size={15} color="white" /> : <Volume2 size={15} color="white" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroImageCarousel;