export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export const SERVICES: Service[] = [
  {
    id: "product-design",
    index: "01",
    title: "Product Design & UX",
    description:
      "Deep user research, comprehensive design systems, and high-fidelity clickable prototypes that align cross-functional engineering teams and accelerate build velocity.",
    deliverables: ["User Journey Architecture", "Interactive Figma Prototypes", "Design Token Libraries", "Design System Audits"],
    tools: ["Figma", "Design Tokens", "Linear", "Whimsical"],
  },
  {
    id: "web-development",
    index: "02",
    title: "Full-Stack Web Development",
    description:
      "Type-safe, performance-engineered web applications designed to ship cleanly to production. Zero layout shift, instant server-driven initial paint, and reliable edge scaling.",
    deliverables: ["Next.js App Router Architecture", "Custom API Integrations", "Database & ORM Schema Design", "Responsive Layouts"],
    tools: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
  },
  {
    id: "motion-interaction",
    index: "03",
    title: "Motion & Interaction",
    description:
      "Cinematic micro-interactions, smooth scroll choreography, and tactile physical feedback that transform static interfaces into memorable product experiences.",
    deliverables: ["Lenis Smooth Momentum Scrolling", "Spring Physics Micro-Interactions", "Canvas & WebGL Visual Effects", "Framer Motion State Orchestration"],
    tools: ["Framer Motion", "GSAP", "Lenis", "HTML5 Canvas", "WebGL"],
  },
];
