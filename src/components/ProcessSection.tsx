import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { WORKING_PROCESS } from '../content';
import { EASE_OUT_EXPO, FadeIn } from './Motion';

const STEP_ACCENTS = ['#3B82F6', '#14B8A6', '#818CF8', '#38BDF8'];

export function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isTrackInView = useInView(trackRef, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="process"
      className="border-b border-[#222733] bg-[#080808] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-6 bg-[#3B82F6]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.14em] text-[#A1A8B3] uppercase">
              Our Process
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.65rem] [text-wrap:balance]">
            A Clear Process. Better Execution.
          </h2>
        </FadeIn>

        <div ref={trackRef} className="relative mt-14">
          <div
            aria-hidden="true"
            className="hidden lg:block lg:absolute lg:top-[11px] lg:right-0 lg:left-0 lg:h-px lg:bg-[#222733]"
          />
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={isTrackInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.0, delay: 0.15, ease: EASE_OUT_EXPO }}
              className="hidden lg:block lg:absolute lg:top-[11px] lg:right-0 lg:left-0 lg:h-[2px] lg:origin-left lg:bg-[#3B82F6]"
            />
          )}

          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[11px] w-px bg-[#222733] lg:hidden"
          />

          <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
            {WORKING_PROCESS.map((step, index) => {
              const accent = STEP_ACCENTS[index] ?? '#3B82F6';
              return (
                <FadeIn key={step.number} delay={index * 0.12}>
                  <li className="group flex items-start gap-5 lg:block">
                    <div
                      style={{
                        borderColor: accent,
                        backgroundColor: index === 0 ? accent : '#080808',
                      }}
                      className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-200 group-hover:scale-110"
                    >
                      <span
                        style={{
                          backgroundColor: index === 0 ? '#080808' : accent,
                        }}
                        className="h-2 w-2 rounded-full"
                      />
                    </div>

                    <div className="lg:mt-8">
                      <span
                        style={{ color: accent }}
                        className="text-xs font-bold tabular-nums"
                      >
                        {step.number}
                      </span>
                      <h3 className="mt-2 text-lg font-bold tracking-tight text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.7] text-[#A1A8B3] sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </FadeIn>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
