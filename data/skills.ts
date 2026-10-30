export interface SkillCategory {
  category: string;
  color: string;
  skills: { name: string; level: string; iconTag: string }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend & Spatial UI",
    color: "cyan",
    skills: [
      { name: "Next.js (App Router)", level: "Expert", iconTag: "NEXT" },
      { name: "React 19 / RSC", level: "Expert", iconTag: "REACT" },
      { name: "TypeScript", level: "Senior", iconTag: "TS" },
      { name: "Tailwind CSS v4", level: "Master", iconTag: "CSS" },
      { name: "Framer Motion", level: "Advanced", iconTag: "FX" },
      { name: "Lenis Smooth Scroll", level: "Advanced", iconTag: "PHYS" },
      { name: "HTML5 Canvas / WebGL", level: "Intermediate", iconTag: "GL" },
    ],
  },
  {
    category: "Backend & Systems",
    color: "purple",
    skills: [
      { name: "Node.js & Express", level: "Senior", iconTag: "NODE" },
      { name: "Go / Golang", level: "Proficient", iconTag: "GO" },
      { name: "Python / FastAPI", level: "Advanced", iconTag: "PY" },
      { name: "PostgreSQL & Prisma", level: "Senior", iconTag: "SQL" },
      { name: "Redis & Vector DBs", level: "Intermediate", iconTag: "KV" },
      { name: "GraphQL & RESTful", level: "Senior", iconTag: "API" },
    ],
  },
  {
    category: "Architecture & DevOps",
    color: "pink",
    skills: [
      { name: "Docker & Containers", level: "Advanced", iconTag: "CONTAIN" },
      { name: "CI/CD & GitHub Actions", level: "Senior", iconTag: "AUTO" },
      { name: "Vercel & AWS Edge", level: "Advanced", iconTag: "CLOUD" },
      { name: "Turborepo Monorepos", level: "Proficient", iconTag: "MONO" },
      { name: "Performance Optimization", level: "Master", iconTag: "PERF" },
    ],
  },
];
