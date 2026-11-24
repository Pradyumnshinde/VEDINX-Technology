import { motion, useReducedMotion } from 'motion/react';
import { WHY_CHOOSE_PILLARS } from '../content';
import { EASE_OUT_EXPO, FadeIn } from './Motion';

const PILLAR_ACCENTS = ['#3B82F6', '#14B8A6', '#818CF8', '#38BDF8'];

export function WhyChooseSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="solutions"
      className="border-b border-[#222733] bg-[#080808] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#3B82F6]" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-[0.14em] text-[#A1A8B3] uppercase">
                  Why Choose VEDNIX
                </p>
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.65rem] [text-wrap:balance]">
                Practical Technology. Meaningful Results.
              </h2>
              <p className="mt-5 text-base leading-[1.7] text-[#A1A8B3]">
                Our approach is straightforward — understand the business first, then engineer the cleanest path to a dependable digital solution.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-[#222733] border-y border-[#222733]">
              {WHY_CHOOSE_PILLARS.map((pillar, index) => {
                const accent = PILLAR_ACCENTS[index] ?? '#3B82F6';
                return (
                  <FadeIn key={pillar.number} delay={index * 0.06}>
                    <motion.div
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : { x: 6, backgroundColor: '#11141B' }
                      }
                      transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                      className="group grid grid-cols-1 gap-3 rounded-lg px-4 py-7 transition-colors sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-6 sm:py-8"
                    >
                      <div className="sm:col-span-2">
                        <span
                          style={{ color: accent }}
                          className="text-sm font-bold tabular-nums"
                        >
                          {pillar.number}
                        </span>
                      </div>
                      <div className="sm:col-span-4">
                        <h3 className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-[#3B82F6] sm:text-lg">
                          {pillar.title}
                        </h3>
                      </div>
                      <div className="sm:col-span-6">
                        <p className="text-sm leading-[1.7] text-[#A1A8B3] sm:text-base">
                          {pillar.description}
                        </p>
                      </div>
                    </motion.div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
