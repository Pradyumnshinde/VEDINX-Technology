import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Check, RotateCcw, Send } from 'lucide-react';
import { SERVICES } from '../content';
import { EASE_OUT_EXPO, FadeIn } from './Motion';

export function ServicesSection() {
  const [automationCapIdx, setAutomationCapIdx] = useState(0);

  return (
    <section
      id="services"
      className="border-b border-[#222733] bg-[#0D1016] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-6 bg-[#3B82F6]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.14em] text-[#A1A8B3] uppercase">
              Our Services
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.65rem] [text-wrap:balance]">
            Our Expertise. Your Business Advantage.
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-[#A1A8B3]">
            Four disciplines engineered to strengthen your online presence and streamline day-to-day operations.
          </p>
        </FadeIn>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {SERVICES.map((service, index) => {
            const visualOnLeft = index === 1;

            return (
              <div
                key={service.id}
                className="grid grid-cols-1 items-center gap-10 border-t border-[#222733] pt-14 lg:grid-cols-12 lg:gap-14 lg:pt-16"
              >
                <div
                  className={`lg:col-span-5 ${
                    visualOnLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <FadeIn>
                    <div className="flex items-center gap-2.5 text-xs font-bold tracking-[0.12em] uppercase">
                      <span style={{ color: service.accentColor }} className="tabular-nums">
                        {service.number}
                      </span>
                      <span className="text-[#334155]" aria-hidden="true">
                        —
                      </span>
                      <span style={{ color: service.accentColor }}>
                        {service.shortTitle}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-base leading-[1.7] text-[#A1A8B3]">
                      {service.description}
                    </p>

                    {service.id === 'ai-automation' ? (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {service.capabilities.map((cap, capIdx) => {
                          const active = automationCapIdx === capIdx;
                          return (
                            <button
                              key={cap}
                              type="button"
                              onClick={() => setAutomationCapIdx(capIdx)}
                              className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors ${
                                active
                                  ? 'border-[#14B8A6] bg-[#14B8A6] text-[#080808]'
                                  : 'border-[#222733] bg-[#11141B] text-white hover:border-[#14B8A6]'
                              }`}
                            >
                              {cap}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <ul className="mt-6 divide-y divide-[#222733] border-y border-[#222733]">
                        {service.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-center gap-3 py-3 text-sm font-medium text-white"
                          >
                            <Check
                              style={{ color: service.accentColor }}
                              className="h-4 w-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </FadeIn>
                </div>

                <div
                  className={`lg:col-span-7 ${
                    visualOnLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <FadeIn delay={0.08}>
                    {service.id === 'website-development' && <WebsiteBrowserDemo />}
                    {service.id === 'ai-automation' && (
                      <AutomationNodeGraphDemo highlightedIndex={automationCapIdx} />
                    )}
                    {service.id === 'ai-chatbots' && <LiveChatbotDemo />}
                    {service.id === 'ai-voice-agents' && <VoiceWaveformDemo />}
                  </FadeIn>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WebsiteBrowserDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'overview' | 'layout'>('overview');

  return (
    <div className="overflow-hidden rounded-xl border border-[#222733] bg-[#0B0D10]">
      <div className="flex items-center justify-between border-b border-[#222733] bg-[#11141B] px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#334155]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#334155]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#334155]" />
        </div>
        <div className="rounded-md border border-[#222733] bg-[#080808] px-3 py-1 text-[11px] font-medium text-[#A1A8B3]">
          https://yourbusiness.com
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`rounded px-2 py-0.5 text-[11px] font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#3B82F6] text-white'
                : 'text-[#A1A8B3] hover:text-white'
            }`}
          >
            Hero
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('layout')}
            className={`rounded px-2 py-0.5 text-[11px] font-semibold transition-colors ${
              activeTab === 'layout'
                ? 'bg-[#3B82F6] text-white'
                : 'text-[#A1A8B3] hover:text-white'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-[#222733] bg-[#11141B] p-5 sm:grid-cols-12">
          <div className="space-y-3 sm:col-span-7">
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: [0.65, 1, 0.65] }
              }
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-20 rounded-full bg-[#3B82F6]"
            />
            <div className="space-y-1.5">
              <div className="h-3.5 w-full rounded bg-white/85" />
              <div className="h-3.5 w-4/5 rounded bg-white/85" />
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="h-2 w-full rounded bg-[#334155]" />
              <div className="h-2 w-5/6 rounded bg-[#334155]" />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="h-6 w-20 rounded-md bg-[#3B82F6]" />
              <div className="h-6 w-20 rounded-md border border-[#222733] bg-[#080808]" />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-[#222733] bg-[#080808] p-3.5 sm:col-span-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-[#3B82F6] uppercase">
                {activeTab === 'overview' ? 'Performance' : 'Responsive'}
              </span>
              <span className="h-1.5 w-6 rounded-full bg-[#3B82F6]/45" />
            </div>
            <div className="my-3 space-y-2">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scaleX: [0.75, 1, 0.75] }
                }
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="h-2 w-full origin-left rounded-full bg-[#3B82F6]/85"
              />
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scaleX: [0.55, 0.9, 0.55] }
                }
                transition={{ duration: 3.2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                className="h-2 w-4/5 origin-left rounded-full bg-[#14B8A6]/85"
              />
            </div>
            <div className="h-2 w-2/3 rounded bg-[#222733]" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Clean Structure', barColor: '#3B82F6' },
            { label: 'Fast Loading', barColor: '#14B8A6' },
            { label: 'Lead Ready', barColor: '#818CF8' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_OUT_EXPO }}
              className="rounded-lg border border-[#222733] bg-[#11141B] p-3"
            >
              <div
                style={{ backgroundColor: card.barColor }}
                className="h-1.5 w-8 rounded-full"
              />
              <p className="mt-2.5 text-[11px] font-semibold text-white">
                {card.label}
              </p>
              <div className="mt-1.5 h-1.5 w-3/4 rounded bg-[#222733]" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationNodeGraphDemo({ highlightedIndex }: { highlightedIndex: number }) {
  const prefersReducedMotion = useReducedMotion();

  const isCrmHighlighted = highlightedIndex === 1 || highlightedIndex === 2;
  const isNotifyHighlighted = highlightedIndex === 4;

  return (
    <div className="overflow-hidden rounded-xl border border-[#222733] bg-[#0B0D10] p-5 sm:p-7">
      <div className="relative flex min-h-[240px] items-center justify-center rounded-xl border border-[#222733] bg-[#11141B] p-4 sm:p-6">
        <svg
          viewBox="0 0 460 190"
          className="w-full max-w-[460px] overflow-visible"
          role="img"
          aria-label="Automated workflow diagram connecting Trigger to AI Engine, CRM, and Notify"
        >
          <path
            d="M 98 95 L 175 95"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
          />
          <path
            d="M 275 95 C 315 95, 315 48, 355 48"
            fill="none"
            stroke={isCrmHighlighted ? '#14B8A6' : '#334155'}
            strokeWidth="2"
          />
          <path
            d="M 275 95 C 315 95, 315 142, 355 142"
            fill="none"
            stroke={isNotifyHighlighted ? '#3B82F6' : '#334155'}
            strokeWidth="2"
          />

          {!prefersReducedMotion && (
            <>
              <motion.circle
                r="4"
                fill="#14B8A6"
                initial={{ cx: 98, cy: 95, opacity: 0 }}
                animate={{
                  cx: [98, 175],
                  cy: [95, 95],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.circle
                r="4"
                fill="#14B8A6"
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }}
                style={{
                  offsetPath: 'path("M 275 95 C 315 95, 315 48, 355 48")',
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.circle
                r="4"
                fill="#3B82F6"
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }}
                style={{
                  offsetPath: 'path("M 275 95 C 315 95, 315 142, 355 142")',
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </>
          )}

          <g transform="translate(12, 74)">
            <rect
              width="86"
              height="42"
              rx="8"
              fill="#080808"
              stroke="#334155"
              strokeWidth="1.5"
            />
            <text
              x="43"
              y="25"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              TRIGGER
            </text>
          </g>

          <g transform="translate(175, 72)">
            <rect
              width="100"
              height="46"
              rx="8"
              fill="#0F1F1F"
              stroke="#14B8A6"
              strokeWidth="1.75"
            />
            <text
              x="50"
              y="27"
              textAnchor="middle"
              fill="#2DD4BF"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              AI ENGINE
            </text>
          </g>

          <g transform="translate(355, 27)">
            <rect
              width="88"
              height="42"
              rx="8"
              fill={isCrmHighlighted ? '#0F1F1F' : '#080808'}
              stroke={isCrmHighlighted ? '#14B8A6' : '#334155'}
              strokeWidth="1.5"
            />
            <text
              x="44"
              y="25"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              CRM
            </text>
          </g>

          <g transform="translate(355, 121)">
            <rect
              width="88"
              height="42"
              rx="8"
              fill={isNotifyHighlighted ? '#111827' : '#080808'}
              stroke={isNotifyHighlighted ? '#3B82F6' : '#334155'}
              strokeWidth="1.5"
            />
            <text
              x="44"
              y="25"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              NOTIFY
            </text>
          </g>
        </svg>
      </div>

      <p className="mt-4 text-center text-[11px] font-semibold tracking-[0.14em] text-[#A1A8B3] uppercase">
        Input · Intelligence · Action
      </p>
    </div>
  );
}

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

const SCRIPTED_CHAT: ChatMessage[] = [
  { sender: 'bot', text: 'Hi there! How can I help your business today?' },
  { sender: 'user', text: "I'd like to book an appointment." },
  { sender: 'bot', text: 'Sure — could I get your preferred day and time?' },
  { sender: 'user', text: 'Tuesday afternoon works for me.' },
  {
    sender: 'bot',
    text: 'Booked for Tuesday, 2:00 PM. Confirmation details sent.',
  },
];

function LiveChatbotDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  const [visibleCount, setVisibleCount] = useState(prefersReducedMotion ? SCRIPTED_CHAT.length : 1);
  const [customMessages, setCustomMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;
    if (visibleCount >= SCRIPTED_CHAT.length) return;

    const timer = window.setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, 850);
    return () => window.clearTimeout(timer);
  }, [isInView, visibleCount, prefersReducedMotion]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    setCustomMessages((prev) => [
      ...prev,
      { sender: 'user', text: trimmed },
      {
        sender: 'bot',
        text: 'Thanks for your message. Your enquiry has been noted for follow-up.',
      },
    ]);
    setDraft('');
  };

  const shownMessages = [...SCRIPTED_CHAT.slice(0, visibleCount), ...customMessages];

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-xl border border-[#222733] bg-[#0B0D10]"
    >
      <div className="flex items-center justify-between border-b border-[#222733] bg-[#11141B] px-5 py-3.5">
        <span className="text-[11px] font-bold tracking-[0.12em] text-[#A1A8B3] uppercase">
          Chatbot · Concept Preview
        </span>
        <span className="text-[11px] font-bold tracking-[0.1em] text-[#2DD4BF] uppercase">
          Active Preview
        </span>
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <div className="max-h-[250px] min-h-[220px] space-y-2.5 overflow-y-auto pr-1">
          {shownMessages.map((msg, idx) => (
            <motion.div
              key={`${msg.sender}-${idx}`}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[82%] rounded-lg px-3.5 py-2.5 text-xs leading-relaxed sm:text-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#6366F1] text-white'
                    : 'border border-[#222733] bg-[#11141B] text-white'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-[#222733] pt-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Try typing a sample message..."
            aria-label="Test chatbot preview message"
            className="w-full rounded-lg border border-[#222733] bg-[#11141B] px-3.5 py-2 text-xs text-white placeholder-[#64748B] focus:border-[#818CF8] focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            aria-label="Send test message"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#6366F1] text-white transition-colors hover:bg-[#4F46E5]"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

const VOICE_TRANSCRIPT = [
  { role: 'AI', text: 'Hello, thanks for calling — how can I help you today?', color: '#38BDF8' },
  { role: 'CALLER', text: "I'd like to book an appointment this week.", color: '#FFFFFF' },
  {
    role: 'AI',
    text: 'Of course. I have Tuesday 10:00 or Wednesday 14:30 — which works for you?',
    color: '#38BDF8',
  },
  { role: 'BOOKED', text: 'Confirmation details sent automatically', color: '#2DD4BF' },
];

const BAR_HEIGHTS = [14, 24, 38, 22, 44, 30, 52, 26, 46, 56, 32, 48, 36, 54, 28, 42, 22, 36, 20, 14];

function VoiceWaveformDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(
    prefersReducedMotion ? VOICE_TRANSCRIPT.length : 1
  );

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;
    if (visibleLines >= VOICE_TRANSCRIPT.length) return;

    const timer = window.setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [isInView, visibleLines, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-xl border border-[#222733] bg-[#0B0D10] p-5 sm:p-6"
    >
      <div className="flex h-20 items-center justify-center gap-1.5 rounded-xl border border-[#222733] bg-[#11141B] px-4">
        {BAR_HEIGHTS.map((maxH, idx) => (
          <motion.span
            key={idx}
            animate={
              prefersReducedMotion
                ? { height: maxH * 0.65 }
                : {
                    height: [maxH * 0.35, maxH, maxH * 0.45],
                  }
            }
            transition={{
              duration: 0.9 + (idx % 5) * 0.18,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: idx * 0.04,
            }}
            style={{
              backgroundColor: idx % 3 === 0 ? '#38BDF8' : '#3B82F6',
            }}
            className="w-1 rounded-full"
          />
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-[#222733] bg-[#11141B] p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-[#222733] pb-2.5">
          <span className="text-[11px] font-bold tracking-[0.12em] text-[#A1A8B3] uppercase">
            Incoming Call — AI Receptionist
          </span>
          <button
            type="button"
            onClick={() => setVisibleLines(1)}
            aria-label="Replay call transcript animation"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#38BDF8] hover:underline"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Replay</span>
          </button>
        </div>

        <div className="mt-3.5 space-y-2.5 text-xs leading-relaxed sm:text-[13px]">
          {VOICE_TRANSCRIPT.slice(0, visibleLines).map((entry, idx) => (
            <motion.p
              key={idx}
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              className="text-[#A1A8B3]"
            >
              <span style={{ color: entry.color }} className="font-bold">
                {entry.role}:
              </span>{' '}
              <span className="text-white">{entry.text}</span>
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
