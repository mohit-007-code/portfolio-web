export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  industry: string;
  stack: string[];
  href: string;
  accent: string;
  gradient: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "house-prediction",
    index: "01",
    title: "House Price AI",
    tagline: "High-precision real estate valuation engine",
    description:
      "Advanced machine learning model delivering instant, data-driven house price predictions based on spatial demographics, historical housing indices, and property feature vectors.",
    role: "Full-Stack & ML Integration",
    year: "2025",
    industry: "PropTech & AI",
    stack: ["React", "Tailwind CSS", "Python", "Scikit-Learn", "Random Forest", "Vercel"],
    href: "https://house-prediction-ai.vercel.app/",
    accent: "#8B5CF6",
    gradient: "linear-gradient(135deg, rgba(20,20,24,0.9) 0%, rgba(55,27,90,0.4) 60%, rgba(139,92,246,0.15) 100%)",
    image: "/projects/house-prediction.png",
  },
  {
    id: "groq-rag-reader",
    index: "02",
    title: "GROQ AI Doc Reader RAG",
    tagline: "Sub-second multi-format document intelligence",
    description:
      "Ultra-low latency Retrieval-Augmented Generation (RAG) system powered by GROQ LPUs and vector embeddings, enabling instantaneous semantic search and contextual Q&A across massive multi-page documents.",
    role: "AI Systems Architect",
    year: "2025",
    industry: "Generative AI",
    stack: ["GROQ API", "LangChain", "FastAPI", "ChromaDB", "Next.js"],
    href: "https://groq-doc-reader.mohit.dev/",
    accent: "#EAB308",
    gradient: "linear-gradient(135deg, rgba(20,20,24,0.9) 0%, rgba(90,68,8,0.4) 60%, rgba(234,179,8,0.15) 100%)",
    image: "/projects/groq-doc-ai.png",
  },
  {
    id: "student-score-ai",
    index: "03",
    title: "Student Score Predictor",
    tagline: "Predictive academic performance intelligence",
    description:
      "Intelligent deep-learning predictive platform analyzing longitudinal study habits, engagement patterns, and quiz metrics to forecast student exam performance and generate adaptive intervention roadmaps.",
    role: "ML Engineer",
    year: "2025",
    industry: "EdTech & Analytics",
    stack: ["Python", "XGBoost", "FastAPI", "React", "PostgreSQL", "Tailwind"],
    href: "https://student-score-ai.mohit.dev/",
    accent: "#06B6D4",
    gradient: "linear-gradient(135deg, rgba(20,20,24,0.9) 0%, rgba(8,70,85,0.4) 60%, rgba(6,182,212,0.15) 100%)",
    image: "/projects/student-score-ai.png",
  },

  {
    id: "hospital-management",
    index: "04",
    title: "CarePulse Health Cloud",
    tagline: "Telehealth with AI doctor assistance & live video calls",
    description:
      "Next-generation hospital management system featuring encrypted WebRTC video consultations, real-time clinical AI triage assistants, and direct bi-directional patient-doctor chat channels.",
    role: "Lead Full-Stack Architect",
    year: "2024",
    industry: "HealthTech",
    stack: ["WebRTC", "Socket.io", "GROQ API", "Django REST", "React.js"],
    href: "https://carepulse-health.mohit.dev/",
    accent: "#10B981",
    gradient: "linear-gradient(135deg, rgba(20,20,24,0.9) 0%, rgba(6,60,40,0.4) 60%, rgba(16,185,129,0.15) 100%)",
  },



];

