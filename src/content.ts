export interface NavItem {
  label: string;
  href: string;
}

export interface HighlightItem {
  number: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  accentColor: string;
  accentSoftBg: string;
  description: string;
  capabilities: string[];
  outcomeNote: string;
  workflowSteps: string[];
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
}

export interface ClientProject {
  id: string;
  name: string;
  category: string;
  badgeLabel: string;
  location: string;
  liveUrl: string;
  accentColor: string;
  shortDescription: string;
  overview: string;
  technologies: string[];
  deliverables: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  emailPlaceholder: string;
  phonePlaceholder: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  locationPlaceholder: string;
  hoursPlaceholder: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Projects', href: '#projects' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const INTRO_HIGHLIGHTS: HighlightItem[] = [
  {
    number: '01',
    title: 'Innovation',
    description:
      'Practical application of modern web frameworks and AI workflows tailored to real operational bottlenecks.',
  },
  {
    number: '02',
    title: 'Performance',
    description:
      'Clean, lightweight engineering designed for fast page loads, responsive interfaces, and dependable execution.',
  },
  {
    number: '03',
    title: 'Reliability',
    description:
      'Structured architectures and documented systems built to remain stable as your business scales.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'website-development',
    number: '01',
    title: 'Website Development',
    shortTitle: 'Website Development',
    accentColor: '#3B82F6',
    accentSoftBg: '#111827',
    description:
      'We design and develop modern, responsive and high-performance websites that strengthen your online presence and help turn visitors into customers.',
    capabilities: [
      'Business Websites',
      'Landing Pages',
      'Portfolio Websites',
      'Website Redesign',
      'Responsive Development',
    ],
    outcomeNote: 'Built with semantic markup, accessible navigation, and search-ready structure.',
    workflowSteps: ['Information Architecture', 'Responsive UI Engineering', 'Speed & SEO Optimization', 'Edge Deployment'],
  },
  {
    id: 'ai-automation',
    number: '02',
    title: 'AI Automation',
    shortTitle: 'AI Automation',
    accentColor: '#14B8A6',
    accentSoftBg: '#0F1F1F',
    description:
      'We simplify repetitive business processes through intelligent automation systems that save time and improve operational efficiency.',
    capabilities: [
      'Workflow Automation',
      'CRM Automation',
      'Lead Management',
      'Business Process Automation',
      'Automated Notifications',
    ],
    outcomeNote: 'Connects forms, spreadsheets, CRMs, and internal notifications into one dependable flow.',
    workflowSteps: ['Trigger Capture', 'Data Validation & Enrichment', 'CRM Synchronization', 'Automated Team Alerts'],
  },
  {
    id: 'ai-chatbots',
    number: '03',
    title: 'AI Chatbots',
    shortTitle: 'AI Chatbots',
    accentColor: '#818CF8',
    accentSoftBg: '#15172B',
    description:
      'We develop intelligent conversational assistants that help businesses manage enquiries, answer customer questions and improve communication.',
    capabilities: [
      'Website Chatbots',
      'WhatsApp Automation',
      'Customer Support Assistants',
      'Lead Collection',
      'Appointment Enquiries',
    ],
    outcomeNote: 'Structured conversational guardrails with seamless handoff to your team when needed.',
    workflowSteps: ['Knowledge Grounding', 'Intent Classification', 'Lead & Booking Capture', 'Human Escalation'],
  },
  {
    id: 'ai-voice-agents',
    number: '04',
    title: 'AI Voice Agents',
    shortTitle: 'AI Voice Agents',
    accentColor: '#38BDF8',
    accentSoftBg: '#0F1C2A',
    description:
      'AI-powered voice assistants designed to manage incoming enquiries and support customer communication.',
    capabilities: [
      'AI Receptionists',
      'Automated Enquiry Handling',
      'Appointment Management',
      'Voice-Based Customer Support',
    ],
    outcomeNote: 'Clear call routing, structured call summaries, and calendar-ready booking workflows.',
    workflowSteps: ['Inbound Call Greeting', 'Enquiry Qualification', 'Schedule Coordination', 'Summary Logging'],
  },
];

export const WHY_CHOOSE_PILLARS: PillarItem[] = [
  {
    number: '01',
    title: 'Business-Focused Approach',
    description:
      'We understand your business requirements before recommending a solution.',
  },
  {
    number: '02',
    title: 'Custom-Built Solutions',
    description:
      'We develop solutions according to individual business needs.',
  },
  {
    number: '03',
    title: 'Modern Technology',
    description:
      'We use modern development tools and automation technologies.',
  },
  {
    number: '04',
    title: 'Reliable Support',
    description:
      'We focus on long-term relationships and continuous improvements.',
  },
];

export const FEATURED_PROJECTS: ClientProject[] = [
  {
    id: 'ak-reality-architects',
    name: 'AK Reality & Architects',
    category: 'Website Development',
    badgeLabel: 'Client Project',
    location: 'Chh. Sambhajinagar, Maharashtra',
    liveUrl: 'https://ak-reality.pages.dev/',
    accentColor: '#3B82F6',
    shortDescription:
      'A custom architectural showcase and corporate website engineered for AK Reality & Architects—combining editorial typography, multi-image project galleries, leadership profiles, and direct WhatsApp & web enquiry channels.',
    overview:
      'Designed and built a modern, responsive digital presence for AK Reality & Architects ("Designing Spaces That Inspire"). The website highlights residential apartments, private residences, and luxury estates with curated multi-image galleries, introduces the founding architect and engineering leadership team, integrates studio directions via Google Maps, and streamlines client enquiries through WhatsApp and a structured web contact form.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Cloudflare Pages'],
    deliverables: [
      'Editorial responsive website tailored for architectural & construction branding',
      'Curated multi-image residential and commercial portfolio gallery',
      'Leadership team profiles, studio Google Maps integration, and direct WhatsApp enquiry flow',
      'Fast global edge hosting deployed on Cloudflare Pages',
    ],
  },
];

export const WORKING_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand business requirements and objectives.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Develop a strategy and define the right solution.',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Design, build and test the solution.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Launch the project and provide ongoing support.',
  },
];

export const CONTACT_INFO: ContactInfo = {
  emailPlaceholder: 'vednixtech@gmail.com',
  phonePlaceholder: '+91 70580 54063',
  whatsappNumber: '917058054063',
  whatsappDisplay: 'Chat on WhatsApp',
  locationPlaceholder: 'Remote & Global Business Support',
  hoursPlaceholder: 'Monday – Friday · Business Hours',
};
