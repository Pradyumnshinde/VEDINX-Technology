import { motion, useReducedMotion } from 'motion/react';
import { INTRO_HIGHLIGHTS } from '../content';
import { EASE_OUT_EXPO, FadeIn } from './Motion';

const HIGHLIGHT_ACCENTS = ['#3B82F6', '#14B8A6', '#818CF8'];

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="border-b border-[#222733] bg-[#080808] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#3B82F6]" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-[0.14em] text-[#A1A8B3] uppercase">
                  Who We Are
                </p>
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.65rem] [text-wrap:balance]">
                Building Smarter Digital Solutions.
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-6">
            <FadeIn delay={0.08}>
              <p className="text-base leading-[1.75] text-[#A1A8B3] sm:text-lg">
                At VEDNIX Technologies, we combine design, development and intelligent automation to solve real business challenges. Our focus is on creating practical digital solutions that deliver value and support long-term business growth.
              </p>
              <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-[#64748B] uppercase">
                Design · Development · Automation
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {INTRO_HIGHLIGHTS.map((item, idx) => {
            const accent = HIGHLIGHT_ACCENTS[idx] ?? '#3B82F6';
            return (
              <FadeIn key={item.number} delay={idx * 0.08}>
                <motion.div
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -4, borderColor: accent }
                  }
                  transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                  className="flex h-full flex-col justify-between rounded-xl border border-[#222733] bg-[#11141B] p-7 transition-colors duration-200 hover:bg-[#141821] sm:p-8"
                >
                  <div>
                    <span
                      style={{ color: accent }}
                      className="text-xs font-bold tracking-[0.12em] tabular-nums"
                    >
                      {item.number}
                    </span>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.7] text-[#A1A8B3] sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{ backgroundColor: accent }}
                    className="mt-6 h-[2px] w-8 opacity-80"
                    aria-hidden="true"
                  />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
