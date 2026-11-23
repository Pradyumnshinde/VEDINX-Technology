import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { EASE_OUT_EXPO, MarqueeTicker, MaskedReveal } from './Motion';

const HERO_TICKER_ITEMS = [
  'WEBSITE DEVELOPMENT',
  'AI AUTOMATION',
  'AI CHATBOTS',
  'AI VOICE AGENTS',
];

const HERO_SYSTEM_METRICS = [
  { label: 'Web Architecture', detail: 'Responsive · SEO-Ready', accent: '#3B82F6' },
  { label: 'Workflow Automation', detail: 'CRM · Triggers · Alerts', accent: '#14B8A6' },
  { label: 'Conversational Chat', detail: 'Web · WhatsApp · Leads', accent: '#818CF8' },
  { label: 'Voice Reception', detail: 'Enquiries · Scheduling', accent: '#38BDF8' },
];

export function HeroSection() {
  const [activeNode, setActiveNode] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveNode((prev) => (prev + 1) % HERO_SYSTEM_METRICS.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section id="home" className="bg-[#080808]">
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Monumental Headline Column */}
          <div className="lg:col-span-6">
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="flex items-center gap-3"
            >
              <span className="h-[2px] w-7 bg-[#3B82F6]" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.16em] text-[#A1A8B3] uppercase">
                TECHNOLOGY | DEVELOPMENT | AUTOMATION
              </p>
            </motion.div>

            <h1 className="mt-6 text-[clamp(2.5rem,4.6vw,4.15rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
              <MaskedReveal delay={0.06}>
                <span className="block">Technology</span>
              </MaskedReveal>
              <MaskedReveal delay={0.14}>
                <span className="block">That Moves</span>
              </MaskedReveal>
              <MaskedReveal delay={0.22}>
                <span className="block text-[#3B82F6]">Your Business</span>
              </MaskedReveal>
              <MaskedReveal delay={0.3}>
                <span className="block">Forward.</span>
              </MaskedReveal>
            </h1>

            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.34, ease: EASE_OUT_EXPO }}
              className="mt-6 max-w-xl text-base leading-[1.7] text-[#A1A8B3] sm:text-lg"
            >
              We build modern digital experiences and intelligent automation solutions that help businesses operate smarter, connect better and grow faster.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: EASE_OUT_EXPO }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#services"
                className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#2563EB] active:scale-[0.985] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
              >
                <span>Explore Our Services</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </div>

          {/* Right Animated Systems Architecture Canvas */}
          <div className="lg:col-span-6">
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98, y: 12 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE_OUT_EXPO }}
              className="rounded-2xl border border-[#222733] bg-[#11141B] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-[#222733] pb-4">
                <span className="text-xs font-semibold tracking-[0.12em] text-[#A1A8B3] uppercase">
                  Digital & Automation Architecture
                </span>
                <span className="text-xs font-bold tabular-nums text-[#3B82F6]">
                  0{activeNode + 1} / 0{HERO_SYSTEM_METRICS.length}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {HERO_SYSTEM_METRICS.map((item, idx) => {
                  const isActive = activeNode === idx;
                  return (
                    <motion.button
                      key={item.label}
                      type="button"
                      onClick={() => setActiveNode(idx)}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { x: isActive ? 6 : 0 }
                      }
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      className={`relative flex w-full items-center justify-between overflow-hidden rounded-xl border p-4 text-left transition-colors duration-200 sm:px-5 sm:py-4 ${
                        isActive
                          ? 'border-[#3B82F6]/60 bg-[#080808]'
                          : 'border-[#222733] bg-[#0B0D10]/70 hover:bg-[#080808]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          style={{
                            backgroundColor: isActive ? item.accent : '#161B24',
                            color: isActive ? '#FFFFFF' : '#A1A8B3',
                            borderColor: isActive ? item.accent : '#222733',
                          }}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-bold tabular-nums transition-colors duration-200"
                        >
                          {isActive ? <Check className="h-4 w-4" /> : `0${idx + 1}`}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-white sm:text-base">
                            {item.label}
                          </p>
                          <p className="text-xs text-[#A1A8B3]">{item.detail}</p>
                        </div>
                      </div>

                      <span
                        style={{ color: isActive ? item.accent : '#64748B' }}
                        className="text-xs font-semibold transition-colors"
                      >
                        {isActive ? 'Active Focus' : 'View'}
                      </span>

                      {isActive && !prefersReducedMotion && (
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 2.35, ease: 'linear' }}
                          style={{ backgroundColor: item.accent }}
                          className="absolute right-0 bottom-0 left-0 h-[2px] origin-left"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#222733] pt-4 text-xs text-[#A1A8B3]">
                <span>VEDNIX Technologies · Integrated Systems</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <MarqueeTicker items={HERO_TICKER_ITEMS} />
    </section>
  );
}
