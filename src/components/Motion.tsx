import type { ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function ScrollProgressBar() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-[60] h-[2.5px] origin-left bg-[#3B82F6]"
    />
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  yOffset = 20,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MaskedRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MaskedReveal({
  children,
  className = '',
  delay = 0,
}: MaskedRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: '35%' }}
        animate={{ opacity: 1, y: '0%' }}
        transition={{
          duration: 0.65,
          delay,
          ease: EASE_OUT_EXPO,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface MarqueeTickerProps {
  items: string[];
}

export function MarqueeTicker({ items }: MarqueeTickerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="border-y border-[#222733] bg-[#0E1117] py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-5 text-xs font-semibold tracking-[0.16em] text-[#A1A8B3] uppercase">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="group relative overflow-hidden border-y border-[#222733] bg-[#0E1117] py-4 select-none">
      <div className="flex w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
        >
          {repeated.map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex items-center gap-8">
              <span className="text-xs font-semibold tracking-[0.18em] text-[#A1A8B3] uppercase whitespace-nowrap">
                {item}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
                aria-hidden="true"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
