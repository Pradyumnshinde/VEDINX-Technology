import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { CONTACT_INFO, SERVICES } from '../content';
import { EASE_OUT_EXPO, FadeIn } from './Motion';

interface ContactSectionProps {
  preselectedService: string;
  preselectedContext: string;
  focusTrigger: number;
}

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectDescription: string;
}

interface SubmissionSuccess {
  referenceId: string;
  message: string;
}

const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  'Multiple Services / Custom Solution',
];

export function ContactSection({
  preselectedService,
  preselectedContext,
  focusTrigger,
}: ContactSectionProps) {
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [form, setForm] = useState<FormState>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    serviceRequired: SERVICES[0].title,
    projectDescription: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<SubmissionSuccess | null>(null);

  useEffect(() => {
    if (preselectedService) {
      const matched = SERVICE_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(preselectedService.toLowerCase())
      );
      setForm((prev) => ({
        ...prev,
        serviceRequired: matched ?? prev.serviceRequired,
        projectDescription:
          preselectedContext && !prev.projectDescription
            ? preselectedContext
            : prev.projectDescription,
      }));
      setSubmissionSuccess(null);
    }
  }, [preselectedService, preselectedContext]);

  useEffect(() => {
    if (focusTrigger > 0) {
      const timer = window.setTimeout(() => {
        fullNameInputRef.current?.focus();
      }, 350);
      return () => window.clearTimeout(timer);
    }
  }, [focusTrigger]);

  const validateClient = (values: FormState): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (values.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    if (values.businessName.trim().length < 2) {
      errors.businessName = 'Please enter your business name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!/^[+\d\s().-]{7,25}$/.test(values.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!values.serviceRequired) {
      errors.serviceRequired = 'Please choose a service.';
    }
    if (values.projectDescription.trim().length < 15) {
      errors.projectDescription =
        'Please describe your project requirements (at least 15 characters).';
    }
    return errors;
  };

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    const errors = validateClient(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
    const referenceId = `VDX-${datePart}-${randomPart}`;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'ec14ca36-e390-4e4f-bb5c-6a90036e32a1',
          subject: `New Project Enquiry [${referenceId}] — ${form.businessName}`,
          from_name: 'VEDNIX Website',
          name: form.fullName,
          email: form.email,
          replyto: form.email,
          phone: form.phone,
          business_name: form.businessName,
          service_required: form.serviceRequired,
          reference_id: referenceId,
          message: form.projectDescription,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.success) {
        setSubmitError(
          payload?.message ||
            'We could not submit your enquiry right now. Please try again.'
        );
        return;
      }

      setSubmissionSuccess({
        referenceId,
        message:
          'Your enquiry has been received. A member of our team will respond within one business day.',
      });
      setForm({
        fullName: '',
        businessName: '',
        email: '',
        phone: '',
        serviceRequired: SERVICES[0].title,
        projectDescription: '',
      });
    } catch {
      setSubmitError(
        'Network error while sending your enquiry. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello VEDNIX Technologies, I would like to discuss a project enquiry.'
  )}`;

  const inputBaseClass =
    'mt-2 w-full rounded-lg border bg-[#080808] px-4 py-3 text-sm text-white placeholder-[#64748B] transition-colors focus:border-[#3B82F6] focus:outline-none';

  return (
    <section
      id="contact"
      className="border-b border-[#222733] bg-[#0D1016] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#3B82F6]" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-[0.14em] text-[#A1A8B3] uppercase">
                  Contact
                </p>
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.65rem] [text-wrap:balance]">
                Let&apos;s Build Something Valuable.
              </h2>
              <p className="mt-5 text-base leading-[1.7] text-[#A1A8B3]">
                Have a project in mind? Tell us about your business requirements and let&apos;s explore the right technology solution.
              </p>

              <div className="mt-10 space-y-5 border-t border-[#222733] pt-8">
                <div className="flex items-start gap-3.5">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#3B82F6]" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase">
                      Business Email
                    </p>
                    <a
                      href={`mailto:${CONTACT_INFO.emailPlaceholder}`}
                      className="mt-0.5 inline-block text-sm font-semibold text-white transition-colors hover:text-[#3B82F6]"
                    >
                      {CONTACT_INFO.emailPlaceholder}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#14B8A6]" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase">
                      Phone
                    </p>
                    <a
                      href={`tel:${CONTACT_INFO.phonePlaceholder.replace(/[^+\d]/g, '')}`}
                      className="mt-0.5 inline-block text-sm font-semibold tabular-nums text-white transition-colors hover:text-[#3B82F6]"
                    >
                      {CONTACT_INFO.phonePlaceholder}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#818CF8]" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase">
                      Coverage
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-white">
                      {CONTACT_INFO.locationPlaceholder}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#38BDF8]" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase">
                      Availability
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-white">
                      {CONTACT_INFO.hoursPlaceholder}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-lg border border-[#222733] bg-[#11141B] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-[#14B8A6] hover:text-[#14B8A6] whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="h-4 w-4 text-[#14B8A6]" aria-hidden="true" />
                  <span>{CONTACT_INFO.whatsappDisplay}</span>
                </a>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-[#222733] bg-[#11141B] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.45)] sm:p-9">
                <AnimatePresence mode="wait">
                  {submissionSuccess ? (
                    <motion.div
                      key="confirmation"
                      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      className="py-8"
                    >
                      <div className="flex items-center gap-3 text-[#14B8A6]">
                        <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                        <span className="text-sm font-semibold tracking-[0.06em] uppercase">
                          Enquiry Confirmed
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-bold text-white">
                        Thank you for contacting VEDNIX Technologies.
                      </h3>
                      <p className="mt-3 text-base leading-[1.65] text-[#A1A8B3]">
                        {submissionSuccess.message}
                      </p>
                      <div className="mt-6 rounded-lg border border-[#222733] bg-[#080808] p-4">
                        <p className="text-xs font-semibold tracking-[0.08em] text-[#A1A8B3] uppercase">
                          Enquiry Reference
                        </p>
                        <p className="mt-1 text-base font-bold tabular-nums text-white">
                          {submissionSuccess.referenceId}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmissionSuccess(null)}
                        className="mt-7 inline-flex min-h-[44px] items-center rounded-lg border border-[#222733] bg-[#080808] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#3B82F6]"
                      >
                        Submit Another Enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="enquiry-form"
                      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      {submitError && (
                        <div
                          role="alert"
                          className="flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-200"
                        >
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase"
                          >
                            Full Name <span className="text-[#3B82F6]">*</span>
                          </label>
                          <input
                            ref={fullNameInputRef}
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            autoComplete="name"
                            value={form.fullName}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, fullName: e.target.value }));
                              if (fieldErrors.fullName) {
                                setFieldErrors((prev) => ({ ...prev, fullName: '' }));
                              }
                            }}
                            placeholder="Your full name"
                            className={`${inputBaseClass} ${
                              fieldErrors.fullName ? 'border-red-500' : 'border-[#222733]'
                            }`}
                          />
                          {fieldErrors.fullName && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {fieldErrors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="businessName"
                            className="block text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase"
                          >
                            Business Name <span className="text-[#3B82F6]">*</span>
                          </label>
                          <input
                            id="businessName"
                            name="businessName"
                            type="text"
                            required
                            autoComplete="organization"
                            value={form.businessName}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, businessName: e.target.value }));
                              if (fieldErrors.businessName) {
                                setFieldErrors((prev) => ({ ...prev, businessName: '' }));
                              }
                            }}
                            placeholder="Company or organization"
                            className={`${inputBaseClass} ${
                              fieldErrors.businessName ? 'border-red-500' : 'border-[#222733]'
                            }`}
                          />
                          {fieldErrors.businessName && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {fieldErrors.businessName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase"
                          >
                            Email Address <span className="text-[#3B82F6]">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, email: e.target.value }));
                              if (fieldErrors.email) {
                                setFieldErrors((prev) => ({ ...prev, email: '' }));
                              }
                            }}
                            placeholder="name@company.com"
                            className={`${inputBaseClass} ${
                              fieldErrors.email ? 'border-red-500' : 'border-[#222733]'
                            }`}
                          />
                          {fieldErrors.email && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {fieldErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase"
                          >
                            Phone Number <span className="text-[#3B82F6]">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, phone: e.target.value }));
                              if (fieldErrors.phone) {
                                setFieldErrors((prev) => ({ ...prev, phone: '' }));
                              }
                            }}
                            placeholder="+91 98765 43210"
                            className={`${inputBaseClass} ${
                              fieldErrors.phone ? 'border-red-500' : 'border-[#222733]'
                            }`}
                          />
                          {fieldErrors.phone && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {fieldErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="serviceRequired"
                          className="block text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase"
                        >
                          Service Required <span className="text-[#3B82F6]">*</span>
                        </label>
                        <select
                          id="serviceRequired"
                          name="serviceRequired"
                          required
                          value={form.serviceRequired}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              serviceRequired: e.target.value,
                            }));
                            if (fieldErrors.serviceRequired) {
                              setFieldErrors((prev) => ({ ...prev, serviceRequired: '' }));
                            }
                          }}
                          className={`${inputBaseClass} ${
                            fieldErrors.serviceRequired ? 'border-red-500' : 'border-[#222733]'
                          }`}
                        >
                          {SERVICE_OPTIONS.map((serviceOption) => (
                            <option
                              key={serviceOption}
                              value={serviceOption}
                              className="bg-[#11141B] text-white"
                            >
                              {serviceOption}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.serviceRequired && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {fieldErrors.serviceRequired}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="projectDescription"
                          className="block text-[11px] font-bold tracking-[0.1em] text-[#A1A8B3] uppercase"
                        >
                          Project Description <span className="text-[#3B82F6]">*</span>
                        </label>
                        <textarea
                          id="projectDescription"
                          name="projectDescription"
                          rows={4}
                          required
                          value={form.projectDescription}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              projectDescription: e.target.value,
                            }));
                            if (fieldErrors.projectDescription) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                projectDescription: '',
                              }));
                            }
                          }}
                          placeholder="Describe your current workflow, website goals, or automation requirements..."
                          className={`${inputBaseClass} resize-y ${
                            fieldErrors.projectDescription
                              ? 'border-red-500'
                              : 'border-[#222733]'
                          }`}
                        />
                        {fieldErrors.projectDescription && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {fieldErrors.projectDescription}
                          </p>
                        )}
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                        >
                          <span>
                            {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
                          </span>
                          <Send className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
