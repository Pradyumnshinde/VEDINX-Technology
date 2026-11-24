import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../content';
import { EASE_OUT_EXPO } from './Motion';

interface NavbarProps {
  onGetInTouch: () => void;
}

export function Navbar({ onGetInTouch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('#home');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHref(`#${id}`);
            }
          });
        },
        {
          rootMargin: '-35% 0px -55% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveHref(href);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? 'border-b border-[#222733] bg-[#080808]/95'
          : 'border-b border-transparent bg-[#080808]/85'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-5 sm:px-8 lg:h-20">
        <a
          href="#home"
          onClick={() => setActiveHref('#home')}
          className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6] sm:text-lg"
        >
          VEDNIX Technologies
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveHref(item.href)}
                className={`relative py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6] ${
                  isActive ? 'text-white' : 'text-[#A1A8B3] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId={prefersReducedMotion ? undefined : 'active-nav-underline'}
                    transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                    className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#3B82F6]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onGetInTouch();
            }}
            className="hidden rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#2563EB] active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:inline-flex"
          >
            Get in Touch
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#222733] bg-[#11141B] text-white transition-colors duration-150 hover:border-[#3B82F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
            className="overflow-hidden border-t border-[#222733] bg-[#080808] lg:hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1 px-5 py-5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors duration-150 hover:bg-[#11141B] hover:text-white ${
                    activeHref === item.href ? 'bg-[#11141B] text-[#3B82F6]' : 'text-[#A1A8B3]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onGetInTouch();
                  }}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#2563EB]"
                >
                  Get in Touch
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
