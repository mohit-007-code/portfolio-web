export interface ProcessStep {
  step: string;
  title: string;
  headline: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Listen & Align",
    headline: "Uncovering the core problem",
    description:
      "Deep dive into product metrics, target customer behavior, and technological constraints. We define concrete acceptance criteria and establish clear delivery milestones before writing any code.",
  },
  {
    step: "02",
    title: "System Architecture",
    headline: "Engineered for speed & ergonomics",
    description:
      "Drafting component boundaries, database entities, and interaction choreographies. Decisions are pressure-tested against edge performance and future scaling requirements.",
  },
  {
    step: "03",
    title: "Build & Polish",
    headline: "Tuned to outperform the brief",
    description:
      "Fast, iterative development sprints with continuous preview staging. Motion design, tactile click feedback, and 60 FPS transitions are meticulously calibrated.",
  },
  {
    step: "04",
    title: "Deploy & Scale",
    headline: "Shipped with confidence",
    description:
      "Automated CI/CD pipelines, lighthouse audits, and CDN caching setup. Your digital product launches globally with sub-second response times and bulletproof reliability.",
  },
];
