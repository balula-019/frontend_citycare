
// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';

// // ✅ Fixed relative paths – now go up two levels to reach src/assets/
// import phoneImage    from '../../assets/phone.png';
// import bagImage      from '../../assets/bag.png';
// import documentImage from '../../assets/document.png';
// import chakoImage    from '../../assets/chako.png';

// // ─── Arrow that draws itself then glows ────────────────────────────────────────
// const AnimatedArrow = () => (
//   <motion.div
//     className="flex flex-col items-center gap-3"
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     transition={{ duration: 0.5 }}
//   >
//     <motion.p
//       className="text-sm font-semibold tracking-widest uppercase text-[#1A56DB]/70"
//       initial={{ opacity: 0, y: -6 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2, duration: 0.4 }}
//     >
//       Recovery in progress
//     </motion.p>

//     <motion.svg
//       width="64"
//       height="64"
//       viewBox="0 0 64 64"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* Shaft */}
//       <motion.line
//         x1="8" y1="32" x2="52" y2="32"
//         stroke="#10B981"
//         strokeWidth="3"
//         strokeLinecap="round"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: 1 }}
//         transition={{ duration: 0.55, ease: 'easeOut' }}
//       />
//       {/* Head top */}
//       <motion.line
//         x1="52" y1="32" x2="38" y2="20"
//         stroke="#10B981"
//         strokeWidth="3"
//         strokeLinecap="round"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: 1 }}
//         transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
//       />
//       {/* Head bottom */}
//       <motion.line
//         x1="52" y1="32" x2="38" y2="44"
//         stroke="#10B981"
//         strokeWidth="3"
//         strokeLinecap="round"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: 1 }}
//         transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
//       />
//       {/* Glow pulse circle at tip */}
//       <motion.circle
//         cx="52" cy="32" r="6"
//         fill="#10B981"
//         fillOpacity="0.2"
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: [0, 1.8, 1], opacity: [0, 0.6, 0] }}
//         transition={{ delay: 0.85, duration: 0.7, ease: 'easeOut' }}
//       />
//     </motion.svg>

//     <motion.p
//       className="text-xs text-gray-400 tracking-wide"
//       initial={{ opacity: 0, y: 6 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 1.0, duration: 0.4 }}
//     >
//       Item found
//     </motion.p>
//   </motion.div>
// );

// // ─── Individual illustration card ──────────────────────────────────────────────
// const IllustrationCard = ({ src, alt, label }) => (
//   <motion.div
//     key={src}
//     initial={{ opacity: 0, scale: 0.88, x: 40 }}
//     animate={{ opacity: 1, scale: 1, x: 0 }}
//     exit={{ opacity: 0, scale: 0.92, x: -30 }}
//     transition={{ type: 'spring', stiffness: 260, damping: 24 }}
//     className="flex flex-col items-center gap-4"
//   >
//     {/* Card */}
//     <motion.div
//       className="relative rounded-3xl p-8 md:p-10 shadow-2xl"
//       style={{
//         background: 'rgba(255,255,255,0.72)',
//         backdropFilter: 'blur(18px)',
//         WebkitBackdropFilter: 'blur(18px)',
//         border: '1px solid rgba(255,255,255,0.55)',
//         boxShadow: '0 20px 60px rgba(26,86,219,0.10), 0 4px 20px rgba(0,0,0,0.06)',
//       }}
//       animate={{ y: [0, -10, 0] }}
//       transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
//     >
//       <img
//         src={src}
//         alt={alt}
//         className="w-48 h-48 md:w-60 md:h-60 object-contain drop-shadow-lg"
//         draggable={false}
//       />
//     </motion.div>

//     {/* Caption pill */}
//     <motion.span
//       className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/80 border border-gray-200 text-gray-600 shadow-sm backdrop-blur-sm"
//       initial={{ opacity: 0, y: 6 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.25, duration: 0.4 }}
//     >
//       {label}
//     </motion.span>
//   </motion.div>
// );

// // ─── Decorative background blobs ───────────────────────────────────────────────
// const BackgroundEffects = () => (
//   <div className="absolute inset-0 pointer-events-none overflow-hidden">
//     <motion.div
//       className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
//       style={{ background: 'radial-gradient(circle, rgba(26,86,219,0.10) 0%, transparent 70%)' }}
//       animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
//       transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
//     />
//     <motion.div
//       className="absolute bottom-0 -left-16 w-64 h-64 rounded-full"
//       style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)' }}
//       animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
//       transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
//     />
//     <motion.div
//       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
//       style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)' }}
//       animate={{ scale: [1, 1.08, 1] }}
//       transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
//     />
//     {/* Tiny sparkle dots */}
//     {[
//       { top: '15%', left: '10%', delay: 0 },
//       { top: '70%', left: '80%', delay: 1.5 },
//       { top: '40%', left: '90%', delay: 3 },
//       { top: '85%', left: '20%', delay: 2 },
//     ].map((pos, i) => (
//       <motion.div
//         key={i}
//         className="absolute w-1.5 h-1.5 rounded-full bg-[#1A56DB]/30"
//         style={{ top: pos.top, left: pos.left }}
//         animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
//         transition={{ duration: 3, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }}
//       />
//     ))}
//   </div>
// );

// // ─── Step indicator dots ────────────────────────────────────────────────────────
// const StepDots = ({ total, current }) => (
//   <div className="flex items-center gap-2 mt-6">
//     {Array.from({ length: total }).map((_, i) => (
//       <motion.div
//         key={i}
//         className="rounded-full bg-[#1A56DB]"
//         animate={{ width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.25 }}
//         transition={{ duration: 0.35, ease: 'easeInOut' }}
//         style={{ height: 6 }}
//       />
//     ))}
//   </div>
// );

// // ─── Main carousel ─────────────────────────────────────────────────────────────
// const SLIDES = [
//   { type: 'image', src: phoneImage,    alt: 'Lost phone',      label: 'Lost your phone?',     hold: 3000 },
//   { type: 'image', src: bagImage,      alt: 'Lost bag',        label: 'Lost your bag?',        hold: 3000 },
//   { type: 'image', src: documentImage, alt: 'Lost documents',  label: 'Lost your documents?',  hold: 3000 },
//   { type: 'arrow',                                                                               hold: 2200 },
//   { type: 'image', src: chakoImage,    alt: 'PataChako',       label: 'PataChako finds it.',   hold: 4500 },
// ];

// const HeroImageCarousel = () => {
//   const [step, setStep] = useState(0);
//   const slides = useMemo(() => SLIDES, []);

//   const advance = useCallback(() => {
//     setStep(prev => (prev + 1) % slides.length);
//   }, [slides.length]);

//   useEffect(() => {
//     const timer = setTimeout(advance, slides[step].hold);
//     return () => clearTimeout(timer);
//   }, [step, advance, slides]);

//   const current = slides[step];
//   // dot index: only count image slides for dots
//   const imageSlidesCount = slides.filter(s => s.type === 'image').length;
//   const dotIndex = slides.slice(0, step + 1).filter(s => s.type === 'image').length - 1;

//   return (
//     <div className="relative flex flex-col items-center justify-center">
//       <BackgroundEffects />

//       <div className="relative z-10 flex flex-col items-center">
//         <AnimatePresence mode="wait">
//           {current.type === 'image' ? (
//             <IllustrationCard
//               key={current.src}
//               src={current.src}
//               alt={current.alt}
//               label={current.label}
//             />
//           ) : (
//             <AnimatedArrow key="arrow" />
//           )}
//         </AnimatePresence>

//         {current.type === 'image' && (
//           <StepDots total={imageSlidesCount} current={Math.max(0, dotIndex)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeroImageCarousel;

import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ✅ Images – now includes laptop
import phoneImage    from '../../assets/phone.png';
import bagImage      from '../../assets/bag.png';
import documentImage from '../../assets/document.png';
import laptopImage   from '../../assets/laptop.png';    // ← new
import chakoImage    from '../../assets/chako.png';

/* ── Animated arrow ──────────────────────────────────────────── */
const AnimatedArrow = () => (
  <motion.div
    className="flex flex-col items-center gap-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.p
      className="text-sm font-semibold tracking-widest uppercase text-[#1A56DB]/70"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      Recovery in progress
    </motion.p>

    <motion.svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <motion.line
        x1="8" y1="32" x2="52" y2="32"
        stroke="#10B981" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />
      <motion.line
        x1="52" y1="32" x2="38" y2="20"
        stroke="#10B981" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
      />
      <motion.line
        x1="52" y1="32" x2="38" y2="44"
        stroke="#10B981" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
      />
      <motion.circle
        cx="52" cy="32" r="6" fill="#10B981" fillOpacity="0.2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.8, 1], opacity: [0, 0.6, 0] }}
        transition={{ delay: 0.85, duration: 0.7, ease: 'easeOut' }}
      />
    </motion.svg>

    <motion.p
      className="text-xs text-gray-400 tracking-wide"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.4 }}
    >
      Item found
    </motion.p>
  </motion.div>
);

/* ── Illustration card – larger, no visible card background ──── */
const IllustrationCard = ({ src, alt, label }) => (
  <motion.div
    key={src}
    initial={{ opacity: 0, scale: 0.88, x: 40 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    exit={{ opacity: 0, scale: 0.92, x: -30 }}
    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    className="flex flex-col items-center gap-6"
  >
    {/* Image with only a soft shadow */}
    <motion.div
      className="flex items-center justify-center"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img
        src={src}
        alt={alt}
        className="w-80 h-80 md:w-[28rem] md:h-[28rem] object-contain drop-shadow-2xl"
        draggable={false}
      />
    </motion.div>

    {/* Caption pill */}
    <motion.span
      className="px-5 py-2 rounded-full text-base font-semibold bg-white/90 border border-gray-200 text-gray-700 shadow-sm backdrop-blur-sm"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
    >
      {label}
    </motion.span>
  </motion.div>
);

/* ── Background effects (unchanged) ────────────────────────────── */
const BackgroundEffects = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(26,86,219,0.10) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-0 -left-16 w-64 h-64 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)' }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
    />
    {[
      { top: '15%', left: '10%', delay: 0 },
      { top: '70%', left: '80%', delay: 1.5 },
      { top: '40%', left: '90%', delay: 3 },
      { top: '85%', left: '20%', delay: 2 },
    ].map((pos, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-[#1A56DB]/30"
        style={{ top: pos.top, left: pos.left }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

/* ── Step dots (unchanged) ────────────────────────────────────── */
const StepDots = ({ total, current }) => (
  <div className="flex items-center gap-2 mt-8">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        className="rounded-full bg-[#1A56DB]"
        animate={{ width: i === current ? 22 : 6, opacity: i === current ? 1 : 0.25 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{ height: 6 }}
      />
    ))}
  </div>
);

/* ── Slides – laptop added ────────────────────────────────────── */
const SLIDES = [
  { type: 'image', src: phoneImage,    alt: 'Lost phone',      label: 'Lost your phone?',     hold: 3000 },
  { type: 'image', src: bagImage,      alt: 'Lost bag',        label: 'Lost your bag?',        hold: 3000 },
  { type: 'image', src: documentImage, alt: 'Lost documents',  label: 'Lost your documents?',  hold: 3000 },
  { type: 'image', src: laptopImage,   alt: 'Lost laptop',     label: 'Lost your laptop?',     hold: 3000 },
  { type: 'arrow',                                                                               hold: 2200 },
  { type: 'image', src: chakoImage,    alt: 'PataChako',       label: 'PataChako finds it.',   hold: 4500 },
];

/* ── Main carousel ────────────────────────────────────────────── */
const HeroImageCarousel = () => {
  const [step, setStep] = useState(0);
  const slides = useMemo(() => SLIDES, []);

  const advance = useCallback(() => {
    setStep(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setTimeout(advance, slides[step].hold);
    return () => clearTimeout(timer);
  }, [step, advance, slides]);

  const current = slides[step];
  const imageSlidesCount = slides.filter(s => s.type === 'image').length;
  const dotIndex = slides.slice(0, step + 1).filter(s => s.type === 'image').length - 1;

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      <BackgroundEffects />

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {current.type === 'image' ? (
            <IllustrationCard
              key={current.src}
              src={current.src}
              alt={current.alt}
              label={current.label}
            />
          ) : (
            <AnimatedArrow key="arrow" />
          )}
        </AnimatePresence>

        {current.type === 'image' && (
          <StepDots total={imageSlidesCount} current={Math.max(0, dotIndex)} />
        )}
      </div>
    </div>
  );
};

export default HeroImageCarousel;