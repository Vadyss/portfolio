// All site copy lives here. Edit this file to change texts, projects or contact details.

export const GITHUB_USER = 'Vadyss'
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`
const repo = (name: string) => `${GITHUB_URL}/${name}`

export const profile = {
  name: 'Adam Krúpa',
  role: 'Full Stack Developer & AI Engineer',
  location: 'Prague, Czechia',
  emailPersonal: 'adamkrupa1111@gmail.com',
  phoneDisplay: '+420 775 935 221',
  phoneHref: 'tel:+420775935221',
}

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export const hero = {
  greeting: 'Hey, my name is',
  // Rotating headline.
  // \u2060 (word joiner) keeps "full-stack" from breaking at the hyphen.
  phrases: [
    'I build full-\u2060stack applications.',
    'I build AI agents & integrations.',
    'I build AI-powered web apps.',
  ],
  lead: 'Based in Prague. I connect artificial intelligence, web development and cybersecurity — and I study IT at SSPŠ.',
  ctaPrimary: 'Get in touch',
  ctaSecondary: 'See my work',
  scroll: 'Scroll to explore',
}

export const about = {
  eyebrow: 'About me',
  title: 'A developer who likes the place where AI meets security.',
  paragraphs: [
    'I am a full-stack developer and AI engineer from Prague. I build GenAI applications, AI agents, RAG systems and web apps — from Python backends to React frontends.',
    'I write my code myself. For selected parts I use AI-assisted, spec-driven development — and everything AI produces goes through my own code review, where I check it, fix it and make sure I understand every line.',
    'I work in the ČEZ Group — at ČEZ ICT Services in the AI & Advanced Analytics team and at ČEZ Distribuce in cybersecurity — and study Information Technology at SSPŠ in Prague.',
  ],
  stats: [
    { value: '2', label: 'ČEZ Group companies' },
    // GitHub contribution calendar total incl. private repos, Nov 2026: 310 (rounded to 10).
    { value: '310+', label: 'commits on GitHub, public & private' },
    { value: '2025', label: 'actively building since' },
  ],
}

export const experience = {
  eyebrow: 'Experience',
  title: 'Work & education',
  intro: 'Within the ČEZ Group I work across two fields that overlap more every year — artificial intelligence and cybersecurity — alongside my IT studies.',
  items: [
    {
      company: 'ČEZ ICT Services, a.s.',
      area: 'AI & Advanced Analytics team',
      tags: ['Artificial intelligence', 'Advanced analytics'],
      icon: 'ai',
      status: 'Present',
    },
    {
      company: 'ČEZ Distribuce, a.s.',
      area: 'Cybersecurity',
      tags: ['Cybersecurity'],
      icon: 'security',
      status: 'Present',
    },
    {
      company: 'SSPŠ — Smíchovská střední průmyslová škola',
      area: 'Information Technology',
      tags: ['Student', 'IT'],
      icon: 'school',
      status: 'Studying',
    },
  ] as { company: string; area: string; tags: string[]; icon: 'ai' | 'security' | 'school'; status: string }[],
}

export const stack = {
  eyebrow: 'Stack',
  title: 'What I work with',
  intro: 'From AI and web development to the infrastructure and security behind it — the areas I work in day to day.',
  focus: [
    { label: 'Mostly writing', value: 'Python' },
    { label: 'Frontends in', value: 'React + TypeScript' },
    { label: 'APIs run on', value: 'FastAPI' },
    { label: 'Agents built with', value: 'LangChain' },
    { label: 'Focused on', value: 'GenAI & AI agents' },
    { label: 'Shipping with', value: 'Docker' },
  ],
  groups: [
    {
      title: 'Generative AI',
      items: [
        'GenAI applications',
        'AI agents & automation',
        'Retrieval-augmented generation (RAG)',
        'LLM integration (OpenAI, Claude)',
        'Prompt engineering',
        'LangChain',
        'Vector databases',
        'Evaluating AI quality',
        'Machine learning fundamentals',
      ],
    },
    {
      title: 'Software development',
      items: [
        'Programming (Python, TypeScript, JavaScript)',
        'Clean code & code review',
        'Testing & code quality',
        'Git & GitHub',
      ],
    },
    {
      title: 'Backend',
      items: ['Python', 'FastAPI', 'REST APIs', 'Databases (PostgreSQL, SQL)', 'Async & background processing'],
    },
    {
      title: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Responsive UI', 'HTML, CSS & JavaScript'],
    },
    {
      title: 'Infrastructure & DevOps',
      items: [
        'Linux',
        'Docker & containers',
        'Virtualization (Proxmox)',
        'CI/CD pipelines',
        'Security checks in CI',
        'Monitoring & logging',
        'Cloud (AWS)',
        'Infrastructure as Code (Terraform)',
      ],
    },
    {
      title: 'Cybersecurity',
      items: [
        'Threat detection',
        'Log analysis & SIEM',
        'Incident triage',
        'MITRE ATT&CK',
        'Network scanning',
        'Identity & access management',
        'Securing AI systems',
      ],
    },
  ],
  cta: 'Check out my GitHub',
  learning: {
    eyebrow: 'Currently learning',
    title: 'Always learning, always improving.',
    description:
      "I don't consider any of these skills finished. Every project teaches me something new, and I keep learning and growing across AI, software development, infrastructure and security — tech moves fast, and so do I.",
  },
}

export type Project = {
  slug: string
  name: string
  kind: string
  /** Short factual line shown under the title, e.g. date and size. */
  meta?: string
  description: string
  highlights?: string[]
  tags: string[]
  url: string
  visual?: 'toolsmith' | 'redlab' | 'siem'
}

export const projects = {
  eyebrow: 'Projects',
  title: "What I've been building",
  intro: 'My strongest public projects — agentic AI, full-stack and security. Every project links straight to its repository.',
  viewRepo: 'View repository',
  moreTitle: 'More projects',
  allRepos: 'All repositories on GitHub',
  featured: [
    {
      slug: 'toolsmith',
      name: 'Toolsmith',
      kind: 'Agentic AI · Cybersecurity',
      meta: 'Oct 2026 · hackathon project · 146 of 159 commits mine',
      description:
        'An AI agent that writes, tests and validates its own detection tools from a plain-language request. A human approves every result before it is used.',
      highlights: [
        'LLM proposes, deterministic checks verify, human approves',
        'Generated code runs in an isolated sandbox',
        'Evals, multi-tenant auth and LLM cost tracking',
      ],
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'Next.js', 'Docker'],
      url: repo('CyberSecurity-AI-Agent'),
      visual: 'toolsmith',
    },
    {
      slug: 'redlab',
      name: 'RED LAB — Deployment Portal',
      kind: 'Full-stack · Infrastructure',
      meta: 'Sep 2026 · 30 commits',
      description:
        'A web portal for creating virtual machines on Proxmox in a few clicks — pick an OS and resources, get a running VM with its IP address.',
      highlights: [
        'React frontend, FastAPI backend',
        'Live job status while the VM is created',
        'Start, stop and delete VMs from one table',
      ],
      tags: ['React', 'TypeScript', 'FastAPI', 'Proxmox API'],
      url: repo('Terraform-forms-web'),
      visual: 'redlab',
    },
    {
      slug: 'mini-siem',
      name: 'AI SOC Analyst',
      kind: 'Threat detection · AI triage',
      meta: 'Jul 2026 · repo: mini-siem · 22 commits',
      description:
        'Detects attacks in server logs and lets an AI analyst triage each finding with a severity and a recommended action.',
      highlights: [
        'Detects brute force, password spraying and compromised accounts',
        'AI agent enriches findings with tool calling',
        'Uses security runbooks (MITRE ATT&CK) via RAG',
      ],
      tags: ['Python', 'OpenAI', 'RAG', 'ChromaDB'],
      url: repo('mini-siem'),
      visual: 'siem',
    },
  ] as Project[],
  more: [
    {
      slug: 'docs-rag-agent',
      name: 'Docs RAG Agent',
      kind: 'Multi-agent RAG',
      meta: 'Oct 2026',
      description:
        'Answers questions from technical documentation: an orchestrator retrieves relevant sections and parallel sub-agents turn them into one answer with sources.',
      tags: ['Python', 'LangChain', 'Deep Agents', 'OpenAI'],
      url: repo('docs-rag-agent'),
    },
    {
      slug: 'trading-journal',
      name: 'Trading Journal',
      kind: 'Web app · Frontend',
      meta: 'Jun 2026',
      description: 'A web app for logging trades and reviewing results on a monthly calendar with weekly profit and loss.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      url: repo('Trading-Journal-Web'),
    },
  ] as Project[],
  private: {
    eyebrow: 'Client & company work',
    title: 'Most of my real-world work is private.',
    description:
      'Projects I build for companies and clients live in private repositories, so I can’t share them publicly. Happy to walk you through them in person.',
    action: 'Ask me about them',
  },
}

export const contact = {
  eyebrow: 'Contact',
  title: 'Contact me.',
  personalEmail: 'Email',
  phone: 'Phone',
  github: 'GitHub',
  copy: 'Copy',
  copied: 'Copied',
  actions: {
    email: 'Send an email',
    call: 'Call me',
    profile: 'View profile',
  },
}

export const footer = {
  built: 'Built with React, Vite and Tailwind CSS.',
  top: 'Back to top',
}
