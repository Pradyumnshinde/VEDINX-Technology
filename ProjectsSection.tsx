import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Globe,
  Laptop,
  MapPin,
  Smartphone,
  X,
} from 'lucide-react';
import { FEATURED_PROJECTS, type ClientProject } from '../content';
import { EASE_OUT_EXPO, FadeIn } from './Motion';

interface ProjectsSectionProps {
  onEnquireSimilar: (category: string, projectName: string) => void;
}

export function ProjectsSection({ onEnquireSimilar }: ProjectsSectionProps) {
  const [modalProject, setModalProject] = useState<ClientProject | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalProject(null);
      }
    };
    if (modalProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalProject]);

  return (
    <section
      id="projects"
      className="border-b border-[#222733] bg-[#0D1016] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-6 bg-[#3B82F6]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.14em] text-[#A1A8B3] uppercase">
              Selected Work
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.65rem] [text-wrap:balance]">
            Selected Client Projects.
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-[#A1A8B3]">
            Live production websites and digital solutions engineered by VEDNIX Technologies for real businesses.
          </p>
        </FadeIn>

        <div className="mt-16 space-y-20 lg:space-y-24">
          {FEATURED_PROJECTS.map((project, index) => {
            const visualOnRight = index % 2 === 1;

            return (
              <article
                key={project.id}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
              >
                <div
                  className={`lg:col-span-7 ${
                    visualOnRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <FadeIn delay={0.05}>
                    <LiveWebsitePreview project={project} />
                  </FadeIn>
                </div>

                <div
                  className={`lg:col-span-5 ${
                    visualOnRight ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <FadeIn delay={0.1}>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-[0.08em] uppercase">
                      <span style={{ color: project.accentColor }}>
                        {project.category}
                      </span>
                      <span className="text-[#475569]" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-[#A1A8B3]">{project.badgeLabel}</span>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold leading-[1.2] tracking-tight text-white sm:text-3xl [text-wrap:balance]">
                      {project.name}
                    </h3>

                    <div className="mt-2.5 flex items-center gap-2 text-xs font-medium text-[#A1A8B3]">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#3B82F6]" aria-hidden="true" />
                      <span>{project.location}</span>
                    </div>

                    <p className="mt-4 text-base leading-[1.7] text-[#A1A8B3]">
                      {project.shortDescription}
                    </p>

                    <div className="mt-6 border-t border-[#222733] pt-5">
                      <p className="text-xs font-semibold tracking-[0.08em] text-[#A1A8B3] uppercase">
                        Technologies Used
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-white">
                        {project.technologies.join(' · ')}
                      </p>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#2563EB] active:scale-[0.985] whitespace-nowrap shrink-0"
                      >
                        <span>Visit Live Website</span>
                        <ExternalLink
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </a>

                      <button
                        type="button"
                        onClick={() => setModalProject(project)}
                        className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#222733] bg-[#11141B] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:border-[#3B82F6] hover:text-[#3B82F6] active:scale-[0.985] whitespace-nowrap shrink-0"
                      >
                        <span>Project Details</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </FadeIn>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {modalProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.985 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#222733] bg-[#11141B] p-6 shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#222733] pb-5">
                <div>
                  <p
                    style={{ color: modalProject.accentColor }}
                    className="text-xs font-semibold tracking-[0.08em] uppercase"
                  >
                    {modalProject.category} · {modalProject.badgeLabel}
                  </p>
                  <h3
                    id="project-modal-title"
                    className="mt-2 text-2xl font-bold tracking-tight text-white"
                  >
                    {modalProject.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#A1A8B3]">{modalProject.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalProject(null)}
                  aria-label="Close project details"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#222733] bg-[#0B0D10] text-[#A1A8B3] transition-colors hover:border-[#3B82F6] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6">
                <LiveWebsitePreview project={modalProject} compact />
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold tracking-[0.08em] text-white uppercase">
                    Project Overview
                  </h4>
                  <p className="mt-2 text-sm leading-[1.7] text-[#A1A8B3] sm:text-base">
                    {modalProject.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold tracking-[0.08em] text-white uppercase">
                    Key Deliverables
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {modalProject.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-[#A1A8B3] sm:text-base"
                      >
                        <CheckCircle2
                          style={{ color: modalProject.accentColor }}
                          className="mt-0.5 h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#222733] pt-5">
                  <p className="text-xs font-semibold tracking-[0.08em] text-[#A1A8B3] uppercase">
                    Technologies Used
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-white">
                    {modalProject.technologies.join(' · ')}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#222733] pt-6">
                  <a
                    href={modalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#222733] bg-[#0B0D10] px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-[#3B82F6] hover:text-[#3B82F6]"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const project = modalProject;
                      setModalProject(null);
                      onEnquireSimilar(project.category, project.name);
                    }}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#3B82F6] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
                  >
                    <span>Discuss a Similar Project</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function LiveWebsitePreview({
  project,
  compact = false,
}: {
  project: ClientProject;
  compact?: boolean;
}) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [isLoaded, setIsLoaded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(640);
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const displayHost = project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const desktopBaseWidth = 1280;
  const desktopBaseHeight = 800;
  const desktopScale = Math.min(1, Math.max(0.2, containerWidth / desktopBaseWidth));
  const scaledDesktopHeight = Math.round(desktopBaseHeight * desktopScale);

  const mobileFrameWidth = Math.min(310, Math.max(240, containerWidth));
  const mobileBaseWidth = 390;
  const mobileBaseHeight = 680;
  const mobileScale = mobileFrameWidth / mobileBaseWidth;
  const scaledMobileHeight = Math.round(mobileBaseHeight * mobileScale);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#222733] bg-[#0B0D10] shadow-[0_14px_40px_rgba(0,0,0,0.5)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222733] bg-[#11141B] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <Globe className="h-3.5 w-3.5 shrink-0 text-[#3B82F6]" aria-hidden="true" />
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-xs font-medium text-[#A1A8B3] transition-colors hover:text-white"
          >
            {displayHost}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <div
            role="tablist"
            aria-label="Live preview viewport size"
            className="flex items-center gap-1 rounded-lg border border-[#222733] bg-[#0B0D10] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewport === 'desktop'}
              onClick={() => setViewport('desktop')}
              className={`relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors whitespace-nowrap ${
                viewport === 'desktop' ? 'text-white' : 'text-[#A1A8B3] hover:text-white'
              }`}
            >
              {viewport === 'desktop' && (
                <motion.span
                  layoutId={prefersReducedMotion ? undefined : `preview-vp-${project.id}-${compact ? 'm' : 'p'}`}
                  transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                  className="absolute inset-0 rounded-md bg-[#3B82F6]"
                />
              )}
              <Laptop className="relative z-10 h-3 w-3" aria-hidden="true" />
              <span className="relative z-10">Desktop</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={viewport === 'mobile'}
              onClick={() => setViewport('mobile')}
              className={`relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors whitespace-nowrap ${
                viewport === 'mobile' ? 'text-white' : 'text-[#A1A8B3] hover:text-white'
              }`}
            >
              {viewport === 'mobile' && (
                <motion.span
                  layoutId={prefersReducedMotion ? undefined : `preview-vp-${project.id}-${compact ? 'm' : 'p'}`}
                  transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                  className="absolute inset-0 rounded-md bg-[#3B82F6]"
                />
              )}
              <Smartphone className="relative z-10 h-3 w-3" aria-hidden="true" />
              <span className="relative z-10">Mobile</span>
            </button>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} live website in a new tab`}
            className="inline-flex items-center gap-1 rounded-lg border border-[#222733] bg-[#0B0D10] px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:border-[#3B82F6] hover:text-[#3B82F6] whitespace-nowrap"
          >
            <span>Open</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div
        ref={stageRef}
        className={`relative flex w-full items-center justify-center bg-[#080808] ${
          viewport === 'mobile' ? 'p-5 sm:p-6' : ''
        }`}
      >
        <div
          style={
            viewport === 'desktop'
              ? { width: '100%', height: `${compact ? Math.min(scaledDesktopHeight, 340) : scaledDesktopHeight}px` }
              : { width: `${mobileFrameWidth}px`, height: `${compact ? Math.min(scaledMobileHeight, 380) : scaledMobileHeight}px` }
          }
          className={`relative overflow-hidden bg-[#11141B] transition-[width,height] duration-300 ${
            viewport === 'mobile' ? 'rounded-xl border border-[#222733] shadow-2xl' : ''
          }`}
        >
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0B0D10] p-6 text-center">
              <p className="text-xs font-semibold tracking-[0.1em] text-[#3B82F6] uppercase">
                Loading Live Preview
              </p>
              <p className="mt-2 text-sm font-medium text-white">{project.name}</p>
              <p className="mt-1 text-xs text-[#A1A8B3]">{displayHost}</p>
            </div>
          )}

          <iframe
            src={project.liveUrl}
            title={`${project.name} live website preview`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            style={
              viewport === 'desktop'
                ? {
                    width: `${desktopBaseWidth}px`,
                    height: `${desktopBaseHeight}px`,
                    transform: `scale(${desktopScale})`,
                    transformOrigin: 'top left',
                  }
                : {
                    width: `${mobileBaseWidth}px`,
                    height: `${mobileBaseHeight}px`,
                    transform: `scale(${mobileScale})`,
                    transformOrigin: 'top left',
                  }
            }
            className="block border-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
