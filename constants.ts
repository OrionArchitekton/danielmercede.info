import { Organization, LinkItem, Competency } from './types';

export const COMPETENCIES: Competency[] = [
  {
    area: "Governed AI Systems",
    details: "Architecture of compliant, controlled artificial intelligence environments for enterprise deployment."
  },
  {
    area: "AI Orchestration",
    details: "Design of multi-agent workflows and automated decision-making pipelines."
  },
  {
    area: "Enterprise Execution Infrastructure",
    details: "Reliability engineering for high-stakes automated business processes."
  },
  {
    area: "Financial Systems Architecture",
    details: "Structural design of automated trading and capital management platforms."
  }
];

export const ORGANIZATIONS: Organization[] = [
  {
    name: "Orion Apex Capital",
    role: "Founder & Systems Architect",
    description: "Quantitative financial technology and automated trading systems.",
    url: "https://orionapexcapital.com"
  },
  {
    name: "Orion Intelligence Agency",
    role: "Director, Applied AI & Orchestration",
    description: "Enterprise AI reliability engineering and process automation.",
    url: "https://orionintelligence.ai" // Hypothesized based on context, can be adjusted
  },
  {
    name: "Cosmocrat",
    role: "Platform Architect",
    description: "Governed AI Operating System for regulated industries.",
    url: "https://cosmocrat.ai"
  }
];

export const LINKS: LinkItem[] = [
  {
    label: "Professional Hub",
    url: "https://danmercede.com",
    displayUrl: "danmercede.com"
  },
  {
    label: "Identity Summary",
    url: "https://danmercede.info",
    displayUrl: "danmercede.info"
  },
  {
    label: "LinkedIn Profile",
    url: "https://www.linkedin.com/in/danmercede",
    displayUrl: "linkedin.com/in/danmercede"
  }
];