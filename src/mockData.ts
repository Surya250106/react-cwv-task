export interface Article {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  category: string;
  badge?: string;
}

export interface Headline {
  id: string;
  title: string;
  category: string;
  timeAgo: string;
  reads: string;
}

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Large Language Model Reasoning Architectures: A 2026 Comprehensive Study",
    excerpt: "Exploring recursive self-correction, tree-of-thought verification, and latent space optimization in contemporary transformer topologies.",
    thumbnail: "/images/article-1.png",
    author: {
      name: "Dr. Sophia Chen",
      avatar: "/images/avatar-1.png",
      role: "Principal AI Research Scientist"
    },
    date: "2026-10-04T09:30:00.000Z",
    readTime: "7 min read",
    category: "AI & Neural Systems",
    badge: "Trending"
  },
  {
    id: "art-2",
    title: "Sub-Second INP at Scale: Modern Browser Rendering Pipeline Optimization",
    excerpt: "How leading media platforms eradicated main-thread input bottlenecks through scheduler slicing and frame-budget allocation.",
    thumbnail: "/images/article-2.png",
    author: {
      name: "Alexandre Laurent",
      avatar: "/images/avatar-2.png",
      role: "Staff Performance Engineer"
    },
    date: "2026-10-04T08:15:00.000Z",
    readTime: "5 min read",
    category: "Web Performance",
    badge: "Must Read"
  },
  {
    id: "art-3",
    title: "Hyperscale Serverless Topology: Multi-Cloud Traffic Routing Patterns",
    excerpt: "Architecting resilient zero-cold-start edge compute networks across heterogeneous geographical infrastructure clusters.",
    thumbnail: "/images/article-3.png",
    author: {
      name: "Maya Rodriguez",
      avatar: "/images/avatar-3.png",
      role: "VP Cloud Infrastructure"
    },
    date: "2026-10-03T18:45:00.000Z",
    readTime: "8 min read",
    category: "Cloud Infrastructure"
  },
  {
    id: "art-4",
    title: "Zero-Trust Cryptographic Identity in Micro-Frontend Ecosystems",
    excerpt: "Enforcing fine-grained authorization boundaries and token attenuation across modular client-side distributed architectures.",
    thumbnail: "/images/article-4.png",
    author: {
      name: "Ethan Wright",
      avatar: "/images/avatar-4.png",
      role: "Chief Security Officer"
    },
    date: "2026-10-03T14:20:00.000Z",
    readTime: "6 min read",
    category: "Cybersecurity"
  },
  {
    id: "art-5",
    title: "Continuous Mutation Testing: Eliminating Fragile CI/CD Pipelines",
    excerpt: "Transitioning from legacy code coverage metrics to semantic mutation fuzzing for mission-critical banking deployments.",
    thumbnail: "/images/article-5.png",
    author: {
      name: "Devon Kim",
      avatar: "/images/avatar-5.png",
      role: "DevOps Architect"
    },
    date: "2026-10-03T11:00:00.000Z",
    readTime: "4 min read",
    category: "DevOps & Tooling"
  },
  {
    id: "art-6",
    title: "Server Components vs Client Islands: Benchmarking Real-World Web Apps",
    excerpt: "A deep quantitative analysis comparing hydration overhead, bundle serialization, and time-to-interactive tradeoffs.",
    thumbnail: "/images/article-6.png",
    author: {
      name: "Jessica Taylor",
      avatar: "/images/avatar-6.png",
      role: "Lead Frontend Architect"
    },
    date: "2026-10-02T20:10:00.000Z",
    readTime: "9 min read",
    category: "Frontend Architecture"
  },
  {
    id: "art-7",
    title: "Raft Consensus and LSM-Trees: Building Ultra-Low Latency Key-Value Stores",
    excerpt: "Dissecting write amplification reductions and lockless memory tables in high-throughput distributed database engines.",
    thumbnail: "/images/article-7.png",
    author: {
      name: "Nikolai Koval",
      avatar: "/images/avatar-7.png",
      role: "Database Systems Researcher"
    },
    date: "2026-10-02T16:00:00.000Z",
    readTime: "11 min read",
    category: "Distributed Databases"
  },
  {
    id: "art-8",
    title: "Modern Cross-Platform Compilers: Rust, WASM, and Native GPU Shaders",
    excerpt: "Bridging client compute bottlenecks by offloading complex layout and geometry rasterization directly to GPU pipelines.",
    thumbnail: "/images/article-8.png",
    author: {
      name: "Hannah Liu",
      avatar: "/images/avatar-8.png",
      role: "Mobile Systems Engineer"
    },
    date: "2026-10-02T12:30:00.000Z",
    readTime: "6 min read",
    category: "Mobile Computing"
  },
  {
    id: "art-9",
    title: "Topological Qubits and Quantum Error Correction Thresholds",
    excerpt: "Recent experimental milestones in Majorana zero-mode braiding algorithms and coherent state preservation.",
    thumbnail: "/images/article-9.png",
    author: {
      name: "Vikram Raman",
      avatar: "/images/avatar-9.png",
      role: "Quantum Physics Fellow"
    },
    date: "2026-10-01T22:00:00.000Z",
    readTime: "10 min read",
    category: "Quantum Information"
  },
  {
    id: "art-10",
    title: "Sustainable Governance Models for Critical Open Source Tooling",
    excerpt: "Analyzing community foundations, multi-corporate sponsorship tiers, and contributor maintainability dynamics in 2026.",
    thumbnail: "/images/article-10.png",
    author: {
      name: "Olivia Bennett",
      avatar: "/images/avatar-10.png",
      role: "Open Source Advocate"
    },
    date: "2026-10-01T15:45:00.000Z",
    readTime: "5 min read",
    category: "Open Source Systems"
  },
  {
    id: "art-11",
    title: "gRPC over QUIC: Replacing HTTP/2 in Global Edge Microservice Meshes",
    excerpt: "Benchmarking connection handshakes, packet multiplexing, and head-of-line blocking elimination over unreliable networks.",
    thumbnail: "/images/article-11.png",
    author: {
      name: "Marcus Patel",
      avatar: "/images/avatar-11.png",
      role: "Networking Infrastructure Lead"
    },
    date: "2026-09-30T19:20:00.000Z",
    readTime: "7 min read",
    category: "Microservices & Mesh"
  },
  {
    id: "art-12",
    title: "Engineering Metric Hygiene: Moving Beyond DORA to Cognitive Load Indexes",
    excerpt: "How modern high-performing organizations align deployment frequency with developer burnout mitigation frameworks.",
    thumbnail: "/images/article-12.png",
    author: {
      name: "Teresa Collins",
      avatar: "/images/avatar-12.png",
      role: "VP Engineering Operations"
    },
    date: "2026-09-30T11:15:00.000Z",
    readTime: "8 min read",
    category: "Engineering Velocity"
  }
];

export const SIDEBAR_HEADLINES: Headline[] = [
  {
    id: "hl-1",
    title: "OpenAI Announces Next-Gen Multimodal Reasoning Engine with Native Tool Execution",
    category: "AI & Neural Systems",
    timeAgo: "18m ago",
    reads: "14.2k reads"
  },
  {
    id: "hl-2",
    title: "W3C Finalizes Spec for WebAssembly Garbage Collection 2.0 Integration",
    category: "Web Standards",
    timeAgo: "42m ago",
    reads: "9.8k reads"
  },
  {
    id: "hl-3",
    title: "Major Cloud Provider Expands 100% Carbon-Free Edge Datacenters Across EMEA",
    category: "Infrastructure",
    timeAgo: "2h ago",
    reads: "18.5k reads"
  },
  {
    id: "hl-4",
    title: "Linux Foundation Launches Initiative for Standardized Memory Safety in Kernels",
    category: "Systems Engineering",
    timeAgo: "3h ago",
    reads: "22.1k reads"
  },
  {
    id: "hl-5",
    title: "Rust 2026 Edition Released: Faster Compile Times and Expressive Const Generics",
    category: "Developer Tools",
    timeAgo: "5h ago",
    reads: "31.4k reads"
  },
  {
    id: "hl-6",
    title: "Global Cyber Incident Response Teams Adopt Post-Quantum Encryption Directives",
    category: "Cybersecurity",
    timeAgo: "7h ago",
    reads: "16.7k reads"
  }
];
