import { CONTACT_INFO } from '../content';

export function Footer() {
  return (
    <footer className="bg-[#080808] pt-16 pb-12 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 border-b border-[#222733] pb-14 sm:flex-row sm:items-start">
          <div>
            <a
              href="#home"
              className="text-lg font-bold tracking-tight text-white"
            >
              VEDNIX Technologies
            </a>
            <p className="mt-4 max-w-sm text-sm leading-[1.7] text-[#A1A8B3]">
              Building modern digital experiences and intelligent business solutions.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.1em] text-white uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A1A8B3]">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.emailPlaceholder}`}
                  className="transition-colors duration-150 hover:text-[#3B82F6]"
                >
                  {CONTACT_INFO.emailPlaceholder}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phonePlaceholder.replace(/[^+\d]/g, '')}`}
                  className="tabular-nums transition-colors duration-150 hover:text-[#3B82F6]"
                >
                  {CONTACT_INFO.phonePlaceholder}
                </a>
              </li>
              <li>{CONTACT_INFO.locationPlaceholder}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-[#64748B] sm:flex-row sm:items-center">
          <p>© 2026 VEDNIX Technologies. All Rights Reserved.</p>
          <p>Web Development · AI Automation · AI Chatbots · AI Voice Agents</p>
        </div>
      </div>
    </footer>
  );
}
