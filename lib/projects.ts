export const CYAN   = "#00F5FF";
export const VIOLET = "#7B2FFF";
export const PINK   = "#FF2D78";

export interface Highlight {
  value: string;
  label: string;
}

export interface ProjectData {
  slug:       string;
  num:        string;
  cat:        string;
  title:      string;
  desc:       string;
  overview:   string;
  challenge:  string;
  solution:   string;
  highlights: Highlight[];
  tags:       string[];
  gradient:   string;
  accent:     string;
  accentRgb:  string;
  stat:       string;
  features:   string[];
  role:       string;
  status:     string;
  logo?:      string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug:  "camlex",
    num:   "01",
    cat:   "Legal Tech",
    title: "CAMLEX",
    desc:  "Offline-first, bilingual legal practice management platform purpose-built for Cameroonian law firms — case management, court deadlines, secure documents, and Mobile Money billing in one system.",
    overview:
      "CamLex is Nexlify's flagship product: an offline-first, bilingual (English/French) platform built for the realities of legal practice in Cameroon, where connectivity can't be assumed and bijural complexity (Common Law + Civil Law/OHADA) demands precision. Phase one delivers a full Practice Manager — case management, court deadline tracking, secure document vault, client portal, and integrated Mobile Money billing (MTN & Orange). Future phases extend into an AI-powered legal knowledge assistant and an online dispute resolution platform for commercial cases. Backed by direct validation from senior legal practitioners.",
    challenge:
      "Law firms in Cameroon operate under two incompatible legal systems — Common Law in the Anglophone regions, and OHADA-based Civil Law elsewhere — while internet connectivity remains unreliable outside major urban centres. Every existing practice management tool is built for Western markets: they assume stable connectivity, a single legal tradition, and card-based payments. Practitioners end up managing active cases across paper files, WhatsApp threads, and disconnected spreadsheets. A missed court deadline or a broken document chain isn't an inconvenience — it ends careers and loses client cases.",
    solution:
      "CamLex is built ground-up for the Cameroonian context. Offline-first architecture ensures the platform works regardless of whether the practitioner is in Douala or a rural courthouse. Bilingual interfaces — not translation, but full design parity in both French and English — mean every user operates in their working language. Bijural case records correctly distinguish Common Law proceedings from OHADA-governed matters. The entire platform was validated with senior legal practitioners before a line of production code was written, ensuring it solves real practice problems, not assumed ones.",
    highlights: [
      { value: "Offline-First",    label: "Fully operational without an internet connection" },
      { value: "Bilingual",        label: "English & French designed in parallel, not translated" },
      { value: "Bijural",          label: "Common Law + Civil Law / OHADA in one unified system" },
      { value: "3-Phase Roadmap",  label: "Practice manager → AI legal assistant → online dispute resolution" },
    ],
    tags:      ["Django REST Framework", "Next.js", "Flutter", "PostgreSQL", "Mobile Money API"],
    gradient:  "linear-gradient(135deg, rgba(0,245,255,0.12) 0%, rgba(123,47,255,0.18) 60%, transparent 100%)",
    accent:    CYAN,
    accentRgb: "0,245,255",
    stat:      "In Active Development",
    features: [
      "Offline-first architecture",
      "Bilingual interface (EN / FR)",
      "Case management & court deadline tracking",
      "Secure document vault",
      "Client portal with matter visibility",
      "Mobile Money billing (MTN & Orange)",
      "Bijural support (Common Law + OHADA)",
      "AI-powered legal assistant (Phase 2)",
      "Online dispute resolution for commercial cases (Phase 3)",
    ],
    role:   "Full-stack Development, System Architecture, Database Design, API Development",
    status: "In Development — Phase 1 near completion, backed by practitioner validation.",
  },

  {
    slug:  "lawbridge",
    num:   "02",
    cat:   "Legal Tech",
    title: "LAWBRIDGE",
    desc:  "Bilingual, bijural case management platform with AI-assisted lawyer matching, automatic conflict detection, digital evidence chain-of-custody, and production-grade cloud-native microservices.",
    overview:
      "LawBridge is a bilingual, bijural case management platform engineered for law firms operating across Common Law and Civil Law systems. Six standout capabilities set it apart: AI-assisted lawyer-to-case matching, automatic conflict-of-interest detection, digital chain-of-custody for evidence, automated deadline escalation, real-time case status timelines, and legal aid eligibility scoring. The entire system runs on a production-grade cloud architecture — microservices on AWS ECS/EKS, Next.js frontend, RDS PostgreSQL, Jenkins CI/CD, and full observability via Prometheus and Grafana, with Kubernetes self-healing demonstrated live.",
    challenge:
      "Managing a law firm across two legal systems creates compounding operational complexity. Tracking which lawyer has the right specialisation for a new case, confirming no conflict of interest exists against the full case history, maintaining a legally defensible evidence trail, and keeping clients informed in real time — most firms handle all of this through institutional memory, email threads, and shared folders. Those systems fail silently under scale, staff turnover, or a compliance audit.",
    solution:
      "LawBridge replaces ad hoc practice management with an intelligent, cloud-native system built to scale. AI-assisted lawyer-to-case matching removes manual assignment bottlenecks by analysing matter type, practitioner history, and availability. Conflict-of-interest detection runs automatically against the full case graph at every new intake. Evidence chain-of-custody is cryptographically enforced so every document access is auditable. The entire platform is deployed on AWS microservices with full CI/CD, live Kubernetes self-healing, and a Prometheus/Grafana observability stack — production-grade from day one.",
    highlights: [
      { value: "6 AI Capabilities", label: "Lawyer matching, conflict detection, legal aid scoring, and more" },
      { value: "AWS ECS/EKS",       label: "Production microservices architecture on AWS" },
      { value: "Self-Healing",      label: "Kubernetes auto-recovery demonstrated live" },
      { value: "Full Observability",label: "Prometheus metrics + Grafana dashboards + Jenkins CI/CD" },
    ],
    tags:      ["Next.js", "Django", "AWS ECS/EKS", "PostgreSQL (RDS)", "Jenkins CI/CD", "Prometheus/Grafana", "Kubernetes"],
    gradient:  "linear-gradient(135deg, rgba(123,47,255,0.16) 0%, rgba(255,45,120,0.14) 60%, transparent 100%)",
    accent:    VIOLET,
    accentRgb: "123,47,255",
    stat:      "Production Architecture",
    features: [
      "AI-assisted lawyer-to-case matching",
      "Automatic conflict-of-interest detection",
      "Digital chain-of-custody for evidence",
      "Automated deadline escalation & alerts",
      "Real-time case status timelines for clients",
      "Legal aid eligibility scoring",
      "Microservices on AWS ECS/EKS",
      "Kubernetes self-healing infrastructure",
      "Full CI/CD pipeline via Jenkins",
      "Prometheus + Grafana observability stack",
    ],
    role:   "Cloud Architecture, Database & Security, CI/CD Pipeline Design, System Design",
    status: "Production-grade architecture complete. Kubernetes self-healing live-demonstrated.",
    logo:   "/assets/Lawbridge.jpeg",
  },

  {
    slug:  "skillforge-237",
    num:   "03",
    cat:   "E-Learning",
    title: "SKILLFORGE 237",
    desc:  "Role-based e-learning platform connecting learners, tutors, and administrators — built for accessibility on lower-bandwidth connections across Cameroon.",
    overview:
      "SkillForge 237 is a role-based e-learning platform designed to widen access to skills training for young people in Cameroon. Built with Django 5, DRF, and HTMX for a fast, lightweight experience that remains accessible even on lower-bandwidth connections. The platform connects learners, tutors, and administrators under distinct role-based access controls, enabling structured course delivery, progress tracking, direct learner-tutor engagement, and administrator-level analytics in a single system.",
    challenge:
      "Young people in Cameroon face a skills gap that formal education systems alone cannot close. Online learning platforms exist, but they are built for high-bandwidth markets — they load slowly on mobile connections, assume credit card payments, and offer no path for local tutors to reach local learners. The result is that the people who most need skills training have the least access to it.",
    solution:
      "SkillForge 237 is purpose-built for the local context. HTMX replaces JavaScript-heavy frameworks with lightweight, progressively-enhanced interactions that load fast on 3G. Django 5 and DRF power a clean, extensible API that can grow with the platform. Three distinct role experiences — learner, tutor, admin — ensure every user gets a focused interface matched to what they actually need to do, without the overhead of features that don't apply to them.",
    highlights: [
      { value: "3 User Roles",    label: "Dedicated learner, tutor, and admin experiences" },
      { value: "Low-Bandwidth",   label: "HTMX-powered — fast even on 3G connections" },
      { value: "Django 5 + DRF",  label: "Latest Django with a clean, extensible REST API" },
      { value: "Live",            label: "Deployed and accessible to users today" },
    ],
    tags:      ["Django 5", "Django REST Framework", "HTMX", "PostgreSQL", "Python"],
    gradient:  "linear-gradient(135deg, rgba(255,45,120,0.14) 0%, rgba(0,245,255,0.10) 60%, transparent 100%)",
    accent:    PINK,
    accentRgb: "255,45,120",
    stat:      "Live Platform",
    features: [
      "Role-based access (learner / tutor / admin)",
      "Low-bandwidth-optimized interface via HTMX",
      "Structured course creation and management",
      "Progress tracking and assessments",
      "Direct learner-tutor engagement tools",
      "Admin analytics and oversight dashboard",
    ],
    role:   "Backend Development, Database Design, API Development",
    status: "Live and deployed.",
  },

  {
    slug:  "digitalfashion-hub",
    num:   "04",
    cat:   "E-Commerce",
    title: "DIGITALFASHION HUB",
    desc:  "Full-scale e-commerce marketplace with a 28-entity relational schema, automated database triggers, and stored procedures powering order, inventory, and transaction logic.",
    overview:
      "DigitalFashion Hub is a full-scale e-commerce marketplace platform built for fashion retail at scale. The platform is anchored by a 28-entity relational database schema with automated triggers and stored procedures that enforce all order lifecycle, inventory management, and transaction logic at the database layer — where ACID guarantees apply. The frontend is built with Next.js 15 and Django REST Framework on PostgreSQL, delivering a fast, modern shopping experience with separate seller and buyer dashboards.",
    challenge:
      "Building a fashion marketplace means managing interconnected operational complexity: product variants, real-time inventory levels, multi-step order workflows, payment states, and seller accounts — all needing to stay consistent under concurrent operations from multiple users simultaneously. A single race condition in inventory tracking or a payment state inconsistency translates directly into chargebacks, oversells, and lost customer trust.",
    solution:
      "DigitalFashion Hub pushes correctness down to the database layer. The 28-entity relational schema — with automated triggers and stored procedures — means business-critical operations like inventory deductions and order state transitions happen atomically inside the database, where transactions are ACID-compliant regardless of what happens at the application layer. Next.js 15 and Django REST Framework sit on top as a fast, modern interface for both buyers and sellers, while the database guarantees the consistency beneath.",
    highlights: [
      { value: "28 DB Entities", label: "Comprehensive schema covering every marketplace operation" },
      { value: "Automated",      label: "Triggers & stored procedures enforce correctness at DB level" },
      { value: "Dual Dashboards",label: "Separate buyer and seller management interfaces" },
      { value: "Next.js 15",     label: "Modern frontend on the latest Next.js release" },
    ],
    tags:      ["Next.js 15", "Django REST Framework", "PostgreSQL", "Python", "JavaScript"],
    gradient:  "linear-gradient(135deg, rgba(0,245,255,0.10) 0%, rgba(255,45,120,0.14) 60%, transparent 100%)",
    accent:    CYAN,
    accentRgb: "0,245,255",
    stat:      "28-Entity Schema",
    features: [
      "28-entity relational database schema",
      "Automated order and inventory triggers",
      "Stored procedures for transaction logic",
      "Product listing and catalog management",
      "Full order lifecycle management",
      "Seller and buyer dashboards",
    ],
    role:   "Database Architecture, API Development, Frontend Integration",
    status: "Built and operational.",
  },

  {
    slug:  "chopsmo",
    num:   "05",
    cat:   "AI Platform",
    title: "CHOPSMO",
    desc:  "Smart meal planning web app with ingredient-based suggestions, recipe search, community sharing, and an AI-powered personal chef assistant integrated directly into the platform.",
    overview:
      "ChopSmo is a smart meal planning web application that helps users discover recipes, generate meal suggestions based on available ingredients, save favourite meals, rate recipes, and manage personalised meal plans. An AI-powered personal chef assistant is integrated directly into the platform — providing personalised meal recommendations, ingredient analysis, and interactive cooking guidance. Community features enable recipe sharing and ratings, while budget-conscious meal planning and automatic grocery list generation make the platform practical for everyday use.",
    challenge:
      "Deciding what to cook is deceptively hard. Users have to balance what's already in the fridge, dietary preferences, budget constraints, and the desire for variety — while not wanting to spend twenty minutes planning. Most recipe apps surface a lot of content but do nothing to help users make actual decisions. They discover recipes they'd never cook. The gap between inspiration and a grocery list remains entirely manual.",
    solution:
      "ChopSmo closes the gap between recipe discovery and executable meal planning. Ingredient-based suggestions start from what users already have, cutting food waste and decision paralysis simultaneously. The AI personal chef assistant handles the open-ended questions — what to make tonight with these three ingredients, how to substitute an item, what fits a budget. Community ratings create a living feedback loop on recipe quality, and automatic grocery list generation turns a meal plan into a shopping list in one tap.",
    highlights: [
      { value: "AI Chef",      label: "Integrated personal chef assistant — always available" },
      { value: "Smart Lists",  label: "Grocery lists auto-generated from your meal plan" },
      { value: "Community",    label: "User-contributed recipes, ratings, and sharing" },
      { value: "Budget Mode",  label: "Affordable meal recommendations built into the core" },
    ],
    tags:      ["Django", "PostgreSQL", "JavaScript", "HTML/CSS", "AI Integration"],
    gradient:  "linear-gradient(135deg, rgba(123,47,255,0.18) 0%, rgba(0,245,255,0.10) 60%, transparent 100%)",
    accent:    VIOLET,
    accentRgb: "123,47,255",
    stat:      "AI-Powered",
    features: [
      "Ingredient-based meal suggestions",
      "Recipe search and advanced filtering",
      "Personalised user profiles and preferences",
      "Recipe rating system",
      "Community recipe sharing",
      "Smart grocery list generation",
      "Budget meal recommendations",
      "AI-powered personal chef assistant",
    ],
    role:   "Backend Development, Database Design, Feature Enhancement, API Development, AI Integration",
    status: "Live platform. AI assistant in active development.",
  },

  {
    slug:  "shop-easy",
    num:   "06",
    cat:   "E-Commerce",
    title: "SHOP EASY",
    desc:  "Multi-vendor online marketplace with phone number authentication, JWT security, seller verification, and Mobile Money integration for MTN and Orange — built for the African market.",
    overview:
      "Shop Easy is a modern multi-vendor online marketplace connecting buyers and sellers while supporting secure transactions and seller verification. Built specifically for the African market — featuring phone number authentication, JWT-based security, and direct Mobile Money integration with MTN and Orange. The platform supports both delivery and direct exchange options, with role-based access controlling seller and buyer permissions throughout the platform. A seller verification workflow ensures marketplace integrity before any listing goes live.",
    challenge:
      "E-commerce platforms built for Western markets don't fit the African context without heavy adaptation. Most buyers don't have credit cards — they have mobile money. Most sellers need verification workflows that generic platforms treat as optional. Delivery logistics are local and informal. Attempting to force a foreign marketplace framework onto these realities produces workarounds layered on workarounds: slow, fragile, and expensive to maintain.",
    solution:
      "Shop Easy is built for the market from day one. Phone number authentication removes the email-address barrier that excludes millions of potential users. Mobile Money integration with both MTN and Orange covers the dominant payment infrastructure across the region. Seller verification is a first-class flow in the system — not an afterthought bolted onto a Western-market template. JWT-based security and role-based access control give the platform a solid security foundation that scales as the marketplace grows.",
    highlights: [
      { value: "MTN + Orange",  label: "Direct Mobile Money integration for both major carriers" },
      { value: "Phone Auth",    label: "Sign in with phone number — no email address required" },
      { value: "JWT Security",  label: "Token-based auth with a formal seller verification flow" },
      { value: "Multi-Vendor",  label: "Buyers, sellers, and admins each with distinct roles" },
    ],
    tags:      ["Django", "Flutter Web", "PostgreSQL", "JWT", "Mobile Money API"],
    gradient:  "linear-gradient(135deg, rgba(255,45,120,0.16) 0%, rgba(123,47,255,0.14) 60%, transparent 100%)",
    accent:    PINK,
    accentRgb: "255,45,120",
    stat:      "Mobile Money Ready",
    features: [
      "Phone number authentication",
      "JWT-based security",
      "Seller verification workflow",
      "Product listing management",
      "Review and rating system",
      "Delivery and direct exchange options",
      "Mobile Money integration (MTN & Orange)",
      "Role-based access control",
    ],
    role:   "Database & Security Specialist — database architecture, authentication design, security implementation, and API optimisation",
    status: "Built and deployed.",
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
