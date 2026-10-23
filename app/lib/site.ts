export const site = {
  name: "Aximest",
  url: "https://www.aximest.com",
  title: "Aximest — Custom Software, Web Apps & AI Automation",
  description:
    "Aximest builds custom software that grows your business: web and mobile apps, AI automation, and ERP, CRM and dashboard platforms that run your operations.",
  mark: "Axmst®",
  tagline: "Development Labs",
  city: "Worldwide",
  code: "/0026",
  codeLabel: "Engineering_",
  contactCode: "F034671",
  since: "In business since 2016",
};

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  slug: string;
};

export const services: Service[] = [
  {
    id: "ai",
    index: "S/001",
    title: "Artificial Intelligence (AI)",
    description:
      "Put AI to work on real operations: RAG knowledge assistants, support chatbots and voice agents, agentic workflow automation, document processing and private LLMs, evaluated and monitored in production.",
    slug: "/services/artificial-intelligence",
  },
  {
    id: "product-development",
    index: "S/002",
    title: "Product Development",
    description:
      "Bring market-ready products to life: UX design, prototypes & MVPs, SaaS, e-commerce, web and mobile applications, from planning and design to coding, testing, and ongoing maintenance.",
    slug: "/services/product-development",
  },
  {
    id: "data",
    index: "S/003",
    title: "Data & Analytics",
    description:
      "Turn scattered data into decisions: data pipelines and warehouses, BI dashboards, natural-language analytics and forecasting models your team can trust.",
    slug: "/services/data-analytics",
  },
  {
    id: "enterprise-software",
    index: "S/004",
    title: "Enterprise Software",
    description:
      "Scale effectively: ERP and CRM implementation, custom platforms, advanced integrations, and security and support systems that keep your infrastructure safe.",
    slug: "/services/enterprise-software",
  },
  {
    id: "advisory",
    index: "S/005",
    title: "Advisory",
    description:
      "Gain strategic insights from our fractional CTOs, benefit from comprehensive technical reviews, and accelerate development with expert backend, frontend, and DevOps solutions.",
    slug: "/services/advisory",
  },
  {
    id: "blockchain",
    index: "S/006",
    title: "Blockchain",
    description:
      "Delivering secure immutable data, smart contract development, tokenomics, and zero-knowledge proof technologies to optimize security, transparency, and financial operations.",
    slug: "/services/blockchain",
  },
];

export const clients = [
  {
    index: "I/001",
    title: "Startups",
    description:
      "Empowering startups with agile development and cost-effective solutions, we excel in product thinking, rapid prototyping, MVP development, and comprehensive mobile and SaaS solutions.",
    cta: "Build with us",
    image: "/images/clients/startups.jpg",
  },
  {
    index: "I/002",
    title: "Enterprises",
    description:
      "Our Enterprise Services streamline operations by building new products, deploying ERPs, and enabling access to new technologies. With diligent monitoring and support we safeguard your business around the clock.",
    cta: "Shape what's next",
    image: "/images/clients/enterprises.jpg",
  },
  {
    index: "I/003",
    title: "Web 3 Companies",
    description:
      "From establishing Layer 1 and Layer 2 protocols to crafting intricate smart contracts and creating engaging frontend, we spearhead projects forward, whether it's a meme coin or a complex zk-proof system.",
    cta: "Take Your Product Further",
    image: "/images/clients/web3.jpg",
  },
];

export const pillars = [
  {
    key: "expertise",
    label: "Expertise",
    items: [
      {
        n: "01",
        title: "Edgetech",
        body: "The latest in technology trends, from blockchain to artificial intelligence.",
      },
      {
        n: "02",
        title: "In-House",
        body: "Professional local talent in your timezone, no outsourcing involved. Direct communication and collaboration.",
      },
      {
        n: "03",
        title: "Experienced",
        body: "Hackers to straight-A students, over 90% of our developers are senior engineers with various areas of expertise.",
      },
    ],
  },
  {
    key: "values",
    label: "Values",
    items: [
      {
        n: "01",
        title: "Flexibility",
        body: "We adapt swiftly to the evolving needs of our clients and markets, ensuring tailored solutions.",
      },
      {
        n: "02",
        title: "Performance",
        body: "Driven by excellence, we consistently deliver top-tier results, setting industry standards for quality and efficiency.",
      },
      {
        n: "03",
        title: "Innovation",
        body: "Our commitment to innovation keeps us at the forefront of technology, empowering us to solve complex challenges creatively.",
      },
    ],
  },
  {
    key: "methodology",
    label: "Methodology",
    items: [
      {
        n: "01",
        title: "Product Thinking",
        body: "Product-centric mindset, focusing on delivering functional, user-oriented solutions that drive value.",
      },
      {
        n: "02",
        title: "Collaborative",
        body: "Working closely with your team to ensure their vision and objectives are fully realized in every project.",
      },
      {
        n: "03",
        title: "Scalable",
        body: "Designed to scale seamlessly with your business needs, ensuring robust solutions that accommodate growth and change.",
      },
    ],
  },
];

export const testimonial = {
  quote:
    "I was truly impressed by their level of flexibility, professionalism, and dedication when it came to tackling the workload. Their commitment to the task at hand, coupled with their serious approach, truly stood out to me.",
  author: "Eugen Baicea",
  role: "SR. Producer",
  company: "Amber Studio",
  image: "/images/testimonial.jpg",
};

export const offices = [
  {
    country: "Dhaka",
    lines: ["House -31/A (Lift-1)", "Road-21, Nikunjo-2", "Khilkhet", "Dhaka-1229"],
    phone: "01619547969",
  },
  {
    country: "Chittagong",
    lines: ["House No. 6, 1st floor", "Road No. 6", "Nasirabad Housing Society", "Chittagong"],
    phone: "01716222093",
  },
];

export const nav = [
  { n: "01", label: "Services", href: "/#services", children: services },
  { n: "02", label: "Projects", href: "/projects" },
  { n: "03", label: "Expertise", href: "/expertise" },
  { n: "04", label: "About", href: "/about" },
  { n: "05", label: "Contact", href: "/contact" },
  { n: "06", label: "Podcasts", href: "/podcasts" },
];

/* ---------------------------------------------------------------
   Inner pages
   --------------------------------------------------------------- */

export const projects = [
  { n: "01", name: "Styllar", slug: "styllar", kind: "Marketplace", group: "Web 3", image: "/images/projects/styllar.jpg",
    scope: ["Cross-chain marketplace", "On-chain royalties", "Batch listings", "High-volume settlement layer"],
    body: "A cross-chain marketplace with on-chain royalties, batch listings and a settlement layer built for volume." },
  { n: "02", name: "Sonr", slug: "sonr", kind: "Layer 1", group: "Web 3", image: "/images/projects/sonr.jpg",
    scope: ["Protocol design", "Validator tooling", "An SDK that keeps app teams clear of consensus"],
    body: "Protocol design, validator tooling and an SDK that lets application teams ship without touching consensus." },
  { n: "03", name: "Formula E: High Voltage", slug: "formula-e-high-voltage", kind: "GameFi", group: "Web 3", image: "/images/projects/formula-e.jpg",
    scope: ["Racing title", "Tokenised in-game assets", "In-game economy", "Custody layer players never see"],
    body: "A racing title with tokenised assets, an in-game economy and a custody layer players never have to think about." },
  { n: "04", name: "Northbound Health", slug: "northbound-health", kind: "Platform", group: "Web 2", image: "/images/projects/northbound-health.jpg",
    scope: ["Patient scheduling", "Health records", "Billing", "HIPAA-compliant platform"],
    body: "A HIPAA-compliant care platform: scheduling, records and billing consolidated into one operational system." },
  { n: "05", name: "Cargoline", slug: "cargoline", kind: "Logistics", group: "Web 2", image: "/images/projects/cargoline.jpg",
    scope: ["Fleet telemetry", "Route optimisation", "Dispatch console", "Replaced a decade of spreadsheets"],
    body: "Fleet telemetry, route optimisation and a dispatch console replacing a decade of spreadsheets." },
  { n: "06", name: "Ledgerbase", slug: "ledgerbase", kind: "Fintech", group: "Web 2", image: "/images/projects/ledgerbase.jpg",
    scope: ["Double-entry ledger", "Reconciliation engine", "Built for millions of daily postings"],
    body: "A double-entry ledger and reconciliation engine handling millions of daily postings." },
];

export const projectGroups = ["Web 3", "Web 2"];

/** A card on the home page, and the detail page its Explore opens. */
export type CardItem = {
  title: string;
  body: string;
  slug: string;
  /** Opening paragraph on the detail page. */
  intro: string;
  /** What we build or cover, listed on the detail page. */
  points: string[];
  image?: string;
};

/** The three card grids that follow the testimonial on the home page. */
export const cardGrids: {
  id: string;
  label: string;
  code: string;
  title: string;
  aside: string;
  /** Where the detail pages live: `${base}/${item.slug}`. */
  base: string;
  /** Four to a row across the full page width instead of three under the title. */
  wide?: boolean;
  items: CardItem[];
}[] = [
  {
    id: "industries",
    label: "Industries",
    code: "IND",
    title: "Built for your sector",
    aside: "We ship production systems in the industries that run on reliable software.",
    base: "/industries",
    items: [
      {
        title: "Automotive", slug: "automotive",
        body: "Retail, dealer, and marketing platforms.",
        intro: "Dealer groups and automotive retailers run on stock, leads and service bookings spread across too many tools. We build the platforms that bring them into one place, from the showroom floor to the service bay.",
        points: ["Dealer management and inventory systems", "Online showrooms and vehicle listings", "Lead capture, CRM and follow-up automation", "Service booking and workshop scheduling"],
      },
      {
        title: "Oil & Gas / Energy", slug: "oil-gas-energy",
        body: "Systems for offshore and resource operators.",
        intro: "Operators in energy and resources need software that holds up in remote sites and audited environments. We build the systems that track assets, crews and output, and report on them without manual work.",
        points: ["Asset and maintenance management", "Field data capture that works offline", "Operational dashboards and reporting", "Health, safety and compliance workflows"],
      },
      {
        title: "Distribution", slug: "distribution",
        body: "Supply-chain and inventory platforms.",
        intro: "Distributors live or die on knowing what is in stock, where it is and when it will arrive. We build the supply-chain software that answers those questions in real time.",
        points: ["Inventory and warehouse management", "Order processing and fulfilment", "Route planning and delivery tracking", "Supplier and purchase automation"],
      },
      {
        title: "Healthcare", slug: "healthcare",
        body: "HIPAA-ready clinical and lab software.",
        intro: "Clinics, labs and care providers need software that is fast for staff and careful with patient data. We build clinical and operational systems designed around privacy and compliance from the start.",
        points: ["Patient records and scheduling", "Lab and diagnostics workflows", "Billing and claims processing", "Privacy-first architecture, built to HIPAA standards"],
      },
      {
        title: "E-commerce & Retail", slug: "ecommerce-retail",
        body: "Storefronts built to scale.",
        intro: "Retailers need storefronts that stay fast on their busiest day and back offices that keep up with every order. We build both, connected to the stock, payment and delivery systems behind them.",
        points: ["Custom storefronts and mobile shopping apps", "Point of sale and multi-store inventory", "Payments, promotions and loyalty", "Sales analytics and demand forecasting"],
      },
      {
        title: "Insurance", slug: "insurance",
        body: "Quoting, policy, and claims systems.",
        intro: "Insurers and brokers handle large volumes of quotes, policies and claims that still move by email and spreadsheet. We build the systems that make each step faster and easier to audit.",
        points: ["Quoting and underwriting tools", "Policy administration", "Claims intake and processing", "Customer and broker portals"],
      },
      {
        title: "Financial Services", slug: "financial-services",
        body: "Regulated fintech and compliance.",
        intro: "Financial products carry strict rules on security, accuracy and reporting. We build fintech platforms and internal tools that meet those rules without slowing the business down.",
        points: ["Ledgers, payments and reconciliation", "KYC, onboarding and compliance checks", "Lending and account management platforms", "Regulatory and management reporting"],
      },
      {
        title: "Real Estate", slug: "real-estate",
        body: "PropTech and investment platforms.",
        intro: "Developers, agencies and property investors juggle listings, tenants and money across many systems. We build PropTech that keeps every property and every payment in view.",
        points: ["Listing and property portals", "Tenant, lease and maintenance management", "Investment and portfolio tracking", "Sales pipelines and agent tools"],
      },
      {
        title: "Research & Public Sector", slug: "research-public-sector",
        body: "Data platforms for research teams.",
        intro: "Research teams and public bodies collect large amounts of data that is hard to bring together and share. We build data platforms that make it usable, secure and easy to report on.",
        points: ["Data collection and survey platforms", "Data warehouses and pipelines", "Dashboards and public reporting", "Secure access and permission controls"],
      },
      {
        title: "Media & Out-of-Home", slug: "media-out-of-home",
        body: "Advertising and content systems.",
        intro: "Media owners and advertisers need to plan, sell and prove every campaign. We build the content and advertising systems that run inventory, bookings and reporting in one place.",
        points: ["Ad inventory and booking systems", "Content management and scheduling", "Campaign reporting and proof of play", "Audience data and analytics"],
      },
      {
        title: "Crypto & Web3", slug: "crypto-web3",
        body: "Protocols, smart contracts, and audits.",
        intro: "Web3 teams need engineering that is right the first time, because code on chain is hard to change. We build protocols, smart contracts and the apps people use to reach them.",
        points: ["Smart contract development and reviews", "Layer 1 and Layer 2 protocol work", "Wallets, marketplaces and dApp frontends", "Token, custody and settlement systems"],
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    code: "PRD",
    title: "We ship our own software",
    aside: "Products we built, own, and run in production.",
    base: "/products",
    wide: true,
    // TODO: placeholders drawn from the services Aximest sells — swap in the real product names.
    items: [
      {
        title: "Aximest ERP", slug: "aximest-erp",
        body: "Inventory, finance and HR in one operational system.",
        intro: "One system for the whole operation. Orders, stock, finance and people sit in the same place, and AI automations take the repetitive work off your team.",
        points: ["Orders, inventory and purchasing", "Finance, invoicing and bank matching", "HR, leave and payroll", "AI automations and scheduled reports"],
      },
      {
        title: "Aximest CRM", slug: "aximest-crm",
        body: "Leads, deals and follow-ups your sales team will actually use.",
        intro: "A sales pipeline your team will keep up to date, because it does the busywork for them. Every lead, deal and follow-up is tracked, and AI drafts the next message.",
        points: ["Visual deal pipeline", "Contact and company records", "AI-written follow-ups and sequences", "Win-rate and revenue reporting"],
      },
      {
        title: "Pulse Dashboards", slug: "pulse-dashboards",
        body: "Live business metrics from every system you already run.",
        intro: "Your key numbers, live, from the systems you already use. Pulse connects to your sales, stock, ads and bank data and turns it into dashboards your managers will check every day.",
        points: ["Connectors for ERP, POS, ads and bank data", "Live KPI dashboards", "Breakdowns by region, product and customer", "Alerts when a number moves"],
      },
      {
        title: "Inbox Agent", slug: "inbox-agent",
        body: "Support email sorted, routed and answered by AI.",
        intro: "An AI agent that works your support inbox. It reads every email, tags it, answers the routine ones and drafts replies for the rest, so customers hear back in minutes instead of hours.",
        points: ["Reads and tags every incoming email", "Answers routine questions on its own", "Drafts replies for your team to approve", "Routes sales and urgent emails to the right person"],
      },
    ],
  },
  {
    id: "clients",
    label: "Clients",
    code: "PRJ",
    title: "Software our clients run on",
    aside: "Real engagements, shipped and running in production.",
    base: "/work",
    items: projects.map((p) => ({
      title: p.name,
      body: p.body,
      slug: p.slug,
      intro: `A ${p.kind} project from our ${p.group} work, shipped and running in production.`,
      points: p.scope,
      image: p.image,
    })),
  },
];

export const stack = [
  { n: "01", name: "Python", kind: "Language", group: "Language",
    body: "Backend services, data pipelines and ML tooling — our default for anything analytical." },
  { n: "02", name: "React Native", kind: "Framework", group: "Mobile",
    body: "One codebase across iOS and Android, with native modules where performance demands them." },
  { n: "03", name: "React JS", kind: "Framework", group: "Frontend",
    body: "Component architecture, state boundaries and rendering strategies that survive a growing team." },
  { n: "04", name: "Django", kind: "Framework", group: "Backend",
    body: "Batteries-included APIs, admin tooling and migrations for products that need to ship this quarter." },
  { n: "05", name: "Rust", kind: "Language", group: "Language",
    body: "Where correctness and throughput both matter: protocol clients, indexers and cryptographic work." },
  { n: "06", name: "Solidity", kind: "Language", group: "Smart Contract",
    body: "Audited contract systems, upgrade paths and gas profiles reviewed line by line." },
  { n: "07", name: "Go", kind: "Language", group: "Backend",
    body: "Concurrent services and infrastructure daemons where predictable latency is the requirement." },
  { n: "08", name: "CosmWasm", kind: "Backend", group: "Smart Contract",
    body: "Contract development for Cosmos-based chains, from module design to IBC integration." },
  { n: "09", name: "PostgreSQL", kind: "Database", group: "Database",
    body: "Schema design, query planning and partitioning strategies for datasets that keep growing." },
  { n: "10", name: "Kubernetes", kind: "Infrastructure", group: "Infrastructure",
    body: "Cluster topology, autoscaling and deployment pipelines that fail safely." },
  { n: "11", name: "TypeScript", kind: "Language", group: "Frontend",
    body: "Types as design documentation — the contract between your teams and your future selves." },
  { n: "12", name: "Node JS", kind: "Web App", group: "Backend",
    body: "Real-time services, edge workloads and the glue between systems that were never meant to meet." },
];

export const stackGroups = [
  "All", "Backend", "Frontend", "Mobile", "Database",
  "Infrastructure", "Language", "Smart Contract",
];

export const podcasts = [
  {
    title: "The Innovation Blueprint",
    host: "Phil Therien",
    image: "/images/podcasts/innovation-blueprint.jpg",
    status: "English only",
    tags: ["Manufacturing", "AI", "Cloud", "Systems", "Leadership", "Energy", "Scaling"],
    body: "Real talk about what's broken and how the best operators are fixing it. Conversations with founders and technical leaders reshaping modern industries.",
  },
  {
    title: "The Interchain Talk Show",
    host: "Utkarsh Varma",
    image: "/images/podcasts/interchain-talk-show.jpg",
    status: "Coming soon",
    tags: ["Blockchain", "L1s", "L2s", "Privacy", "Interchain", "DeFi", "RWA"],
    body: "From technical deep-dives to industry insights, we break down complex topics into engaging discussions that matter to developers and investors alike.",
  },
];

export const articles = [
  { id: "ART/766", image: "/images/articles/ml-medical-imaging.jpg", date: "Mar 4, 2026", tags: ["Healthcare", "Machine Learning"], title: "Machine Learning in Medical Imaging: Uses & Challenges" },
  { id: "ART/765", image: "/images/articles/ml-retail.jpg", date: "Mar 4, 2026", tags: ["Machine Learning", "Retail"], title: "Machine Learning in Retail: Use Cases, Benefits & Guide" },
  { id: "ART/764", image: "/images/articles/ml-logistics.jpg", date: "Mar 4, 2026", tags: ["Logistics", "Machine Learning"], title: "Machine Learning in Logistics: From Data to Delivery" },
  { id: "ART/763", image: "/images/articles/ml-telecom.jpg", date: "Mar 3, 2026", tags: ["Machine Learning", "Telecom"], title: "Understanding Machine Learning in Telecommunications Systems" },
  { id: "ART/762", image: "/images/articles/zero-knowledge.jpg", date: "Mar 1, 2026", tags: ["Blockchain", "Security"], title: "Zero-Knowledge Proofs Without the Hand-Waving" },
  { id: "ART/761", image: "/images/articles/system-design.jpg", date: "Feb 26, 2026", tags: ["Architecture"], title: "Designing Systems That Survive Their Second Year" },
  { id: "ART/760", image: "/images/articles/llm-trust.jpg", date: "Feb 24, 2026", tags: ["AI", "Product"], title: "Shipping LLM Features Users Actually Trust" },
  { id: "ART/759", image: "/images/articles/deployment-pipeline.jpg", date: "Feb 20, 2026", tags: ["DevOps"], title: "The Deployment Pipeline as a Product" },
];

/** Extra copy for each service detail page. */
export const serviceDetail: Record<
  string,
  { abbr: string; statement: string; intro: string; capabilities: string[]; items: { n: string; title: string; slug: string; body: string }[] }
> = {
  advisory: {
    abbr: "ADVSR",
    statement: "Leverage the proficiency of our senior team of experts.",
    intro: "Access our top team's deep expertise for your strategic needs. Get insightful consultations, technical roadmaps, and elite talent to strengthen your lineup.",
    capabilities: ["Technology Architecture", "Product Management", "Systems Integration", "DevOps Methodology", "Cloud Services", "Application Security"],
    items: [
      { n: "001", title: "Fractional CTO", slug: "fractional-cto", body: "Expert tech leadership without full-time commitment, tailored to your budget and needs." },
      { n: "002", title: "Technical Due Diligence", slug: "technical-due-diligence", body: "A senior engineering assessment of the codebase, architecture, and team before you commit." },
      { n: "003", title: "IT Staff Augmentation", slug: "it-staff-augmentation", body: "Senior engineers embedded directly in your team, adding delivery capacity without the hiring cycle." },
      { n: "004", title: "Frontend Development", slug: "frontend-development", body: "Engaging, functional, and visually appealing UIs, enhancing user experience across devices." },
      { n: "005", title: "Backend Development", slug: "backend-development", body: "APIs and services designed for the load you have and the load you are planning for." },
      { n: "006", title: "DevOps Consulting", slug: "devops-consulting", body: "Pipelines, observability and infrastructure-as-code that make releases boring." },
      { n: "007", title: "Cloud Consulting", slug: "cloud-consulting", body: "Migration paths and cost models grounded in what your workloads actually do." },
      { n: "008", title: "Technology Consulting", slug: "technology-consulting", body: "Independent guidance on build-versus-buy, vendor selection and technical strategy." },
      { n: "009", title: "Fullstack Specialists", slug: "fullstack-specialists", body: "Engineers who own a feature end to end, from schema to interface." },
      { n: "010", title: "AI Search Visibility (GEO)", slug: "ai-search-visibility", body: "Technical SEO and structured content that get your business cited by ChatGPT, Perplexity and Google AI answers." },
    ],
  },
  blockchain: {
    abbr: "BLKCH",
    statement: "Protocols, contracts and infrastructure built to be audited.",
    intro: "Delivering secure immutable data, smart contract development, tokenomics, and zero-knowledge proof technologies to optimize security, transparency, and financial operations.",
    capabilities: ["Protocol Design", "Smart Contracts", "Tokenomics", "Zero-Knowledge", "Node Infrastructure", "Wallet Systems"],
    items: [
      { n: "001", title: "Smart Contracts", slug: "smart-contracts", body: "Contract systems written for review: explicit invariants, upgrade paths and gas budgets." },
      { n: "002", title: "Blockchain Consulting", slug: "blockchain-consulting", body: "Chain selection, architecture and compliance framing before a line of code is written." },
      { n: "003", title: "Web3 Development", slug: "web3-development", body: "Frontends, indexers and wallet flows that hide the chain from the people using it." },
      { n: "004", title: "NFT Marketplace", slug: "nft-marketplace", body: "Listings, royalties and settlement designed for throughput rather than a demo." },
      { n: "005", title: "DeFi Development", slug: "defi-development", body: "Lending, AMM and staking primitives with economic assumptions written down." },
      { n: "006", title: "Node Infrastructure", slug: "node-infrastructure", body: "Validator and RPC fleets with the monitoring to know they are healthy." },
      { n: "007", title: "Wallet Development", slug: "wallet-development", body: "Custody, recovery and signing flows for people who will never read a seed phrase." },
      { n: "008", title: "DAO Systems", slug: "dao-systems", body: "Governance contracts, proposal tooling and treasury controls." },
      { n: "009", title: "Token Design", slug: "token-design", body: "Supply schedules and incentive mechanics modelled before launch." },
    ],
  },
  "product-development": {
    abbr: "PRDCT",
    statement: "From a whiteboard sketch to something people pay for.",
    intro: "Bring market-ready products to life: prototypes & MVPs, SaaS, web and mobile applications, from planning and design to coding, testing, and ongoing maintenance.",
    capabilities: ["Product Thinking", "Prototyping", "SaaS Architecture", "Mobile", "QA & Testing", "Maintenance"],
    items: [
      { n: "001", title: "UI/UX Design", slug: "ui-ux-design", body: "Research, flows and interface design tested with real users before a line of code is written." },
      { n: "002", title: "Fast Prototyping", slug: "fast-prototyping", body: "A working artefact in weeks, built to answer the question you are actually asking." },
      { n: "003", title: "MVP Development", slug: "mvp-development", body: "The smallest thing that proves the model, engineered so it does not need throwing away." },
      { n: "004", title: "SaaS Development", slug: "saas-development", body: "Multi-tenancy, billing and permissions designed in from the first commit." },
      { n: "005", title: "Web Applications", slug: "web-applications", body: "Interfaces that stay fast as the data grows and the team changes." },
      { n: "006", title: "Mobile Applications", slug: "mobile-applications", body: "iOS and Android from one codebase, native where it counts." },
      { n: "007", title: "E-commerce Development", slug: "e-commerce-development", body: "Shopify, headless and custom storefronts with checkout, payments and inventory wired in." },
      { n: "008", title: "Project Takeover", slug: "project-takeover", body: "Inheriting someone else's codebase, stabilising it, and making it shippable again." },
      { n: "009", title: "Ongoing Maintenance", slug: "ongoing-maintenance", body: "Dependency hygiene, incident response and the unglamorous work that keeps products alive." },
    ],
  },
  "enterprise-software": {
    abbr: "ENTRP",
    statement: "Operational systems that hold up under real load.",
    intro: "Scale effectively: streamline operations with customized platforms, enhance productivity through advanced integrations, and secure your infrastructure with robust support systems.",
    capabilities: ["Custom Platforms", "ERP & CRM", "Integrations", "Data Migration", "Security", "24/7 Support"],
    items: [
      { n: "001", title: "Custom Platforms", slug: "custom-platforms", body: "Software shaped around how your business works, not the other way round." },
      { n: "002", title: "ERP Implementation", slug: "erp-deployment", body: "Odoo, NetSuite and custom ERP rollouts, configured to your processes with the migration plan written first." },
      { n: "003", title: "CRM Implementation", slug: "crm-implementation", body: "Salesforce and HubSpot setup, customisation and integration, so sales data lives in one place." },
      { n: "004", title: "System Integration", slug: "system-integration", body: "Connecting systems that were never designed to talk, reliably." },
      { n: "005", title: "Data Migration", slug: "data-migration", body: "Moving decades of records without losing the parts that matter." },
      { n: "006", title: "Legacy Modernisation", slug: "legacy-modernisation", body: "Incremental replacement — no big-bang rewrites, no frozen roadmaps." },
      { n: "007", title: "Security & Penetration Testing", slug: "infrastructure-security", body: "Pentests, hardening and audit trails that prepare you for SOC 2, ISO 27001 and your customers' security reviews." },
      { n: "008", title: "Observability", slug: "observability", body: "Metrics, logs and traces arranged so an incident has one obvious first question." },
      { n: "009", title: "Managed Support", slug: "managed-support", body: "Monitoring and response around the clock, with humans on the other end." },
      { n: "010", title: "Performance Engineering", slug: "performance-engineering", body: "Profiling and tuning against the workloads you actually run." },
    ],
  },
  ai: {
    abbr: "AIML",
    statement: "AI that survives contact with production.",
    intro: "Put AI to work on real operations: RAG knowledge assistants, support chatbots and voice agents, agentic workflow automation, document processing and private LLMs, evaluated and monitored in production.",
    capabilities: ["RAG & Knowledge", "Conversational AI", "Voice Agents", "Workflow Automation", "Document AI", "LLMOps"],
    items: [
      { n: "001", title: "AI Strategy & Readiness Audit", slug: "ai-strategy", body: "A short audit that maps where AI pays back in your business, what it will cost, and what to build first." },
      { n: "002", title: "RAG Knowledge Assistants", slug: "rag-knowledge-assistants", body: "Chat with your documents, wikis and databases: grounded answers with citations, permissions respected." },
      { n: "003", title: "AI Support Chatbots", slug: "ai-support-chatbots", body: "Website, WhatsApp, Slack and Messenger assistants that resolve routine tickets and hand off cleanly to a human." },
      { n: "004", title: "AI Voice Agents", slug: "ai-voice-agents", body: "Phone agents that answer calls, qualify leads and book appointments, around the clock and in multiple languages." },
      { n: "005", title: "Agentic Workflow Automation", slug: "ai-automation", body: "Lead qualification, email triage, invoice handling: repetitive back-office work run by agents across your existing tools." },
      { n: "006", title: "Intelligent Document Processing", slug: "document-digitisation", body: "OCR and extraction for invoices, contracts, claims and KYC, turning paperwork into structured data in any language." },
      { n: "007", title: "AI Agents & MCP Servers", slug: "ai-agents", body: "Agents with narrow scope and real evaluations, plus MCP servers that expose your internal tools to assistants safely." },
      { n: "008", title: "AI Copilots for SaaS", slug: "ai-copilots", body: "AI features inside your own product: in-app assistants, smart search, summaries and generation your users will actually use." },
      { n: "009", title: "Private LLMs & Fine-tuning", slug: "private-llms", body: "Self-hosted and fine-tuned open models for teams whose data cannot leave their own cloud, GDPR and HIPAA in mind." },
      { n: "010", title: "Computer Vision", slug: "computer-vision", body: "Visual inspection, video analytics and image recognition tuned to your cameras, lighting and edge cases." },
      { n: "011", title: "Predictive ML", slug: "ml-development", body: "Forecasting, churn, fraud and pricing models trained and served against metrics that mean something." },
      { n: "012", title: "LLMOps, Evals & Guardrails", slug: "llmops-evals", body: "Evaluation suites, monitoring, cost control and guardrails, so non-deterministic systems stay reliable on every change." },
    ],
  },
  data: {
    abbr: "DATA",
    statement: "Numbers your whole team can trust.",
    intro: "Turn scattered data into decisions: data pipelines and warehouses, BI dashboards, natural-language analytics and forecasting models your team can trust.",
    capabilities: ["Data Engineering", "Warehousing", "BI & Dashboards", "Analytics", "Governance", "Forecasting"],
    items: [
      { n: "001", title: "Data Engineering", slug: "data-engineering", body: "Pipelines that move data from every system you run into one place, on schedule and tested." },
      { n: "002", title: "Data Warehousing", slug: "data-warehousing", body: "Snowflake, BigQuery or Postgres warehouses modelled around the questions your business actually asks." },
      { n: "003", title: "BI Dashboards", slug: "bi-dashboards", body: "Power BI, Looker and custom dashboards with one definition of every metric." },
      { n: "004", title: "Natural-Language Analytics", slug: "natural-language-analytics", body: "Ask your data in plain English: text-to-SQL over your warehouse, ERP or CRM, with the query shown." },
      { n: "005", title: "Embedded Analytics", slug: "embedded-analytics", body: "Customer-facing reports and charts built into your SaaS product." },
      { n: "006", title: "Data Governance", slug: "data-governance", body: "Access control, lineage and quality checks that satisfy auditors without slowing analysts down." },
      { n: "007", title: "Data Preparation", slug: "data-preparation", body: "Labelling, cleaning and versioning: the groundwork that decides whether any AI project works." },
    ],
  },
};

/* ---------------------------------------------------------------
   About
   --------------------------------------------------------------- */

export const about = {
  hero: {
    title: "We build the software businesses run on.",
    lead: "Custom platforms, AI automation and the ERP, CRM and dashboard systems behind daily operations. Then we stay accountable for them long after launch.",
  },
  intro: {
    title: "An in-house engineering team, accountable end to end.",
    body: `${site.name} plans, designs, builds and runs custom software for growing companies. The people who scope your project are the people who ship it, from our studios in Dhaka and Chittagong, working in your timezone.`,
  },
  operate: [
    {
      title: "Security by design",
      body: "Access control, audit trails and data handling are designed in from the first sprint, not bolted on before launch.",
    },
    {
      title: "Responsible AI",
      body: "AI drafts, people decide. Our systems propose and explain; a person reviews anything that ships or gets sent.",
    },
    {
      title: "Confidential by default",
      body: "We work under NDA on request. Your project is yours to talk about, not ours.",
    },
    {
      title: "Built to hand over",
      body: "Documentation, admin tools and a clean handover come with the work, so your team is never locked out of its own systems.",
    },
  ],
  // Order is the order on the page. `bio` and `note` are optional — add
  // them as each person signs off on what is said about them.
  leadership: [
    {
      name: "Omer Faruq",
      role: "Chief Executive Officer",
      bio: "Software developer and AI engineer. Leads Aximest and the engineering behind its AI and automation work. Previously a CTO.",
    },
    {
      name: "Mehdi Iqbal",
      role: "Chief Operating Officer",
      bio: "Runs delivery and day-to-day operations. Keeps every project staffed, on schedule and on budget, and makes sure what was promised is what ships.",
    },
    {
      name: "Taufiq Jamal",
      role: "Chief Financial Officer",
      bio: "Owns the company's finances: budgets, billing, contracts and reporting. Keeps pricing clear and every engagement on a sound financial footing.",
    },
    {
      name: "Sayed Sadman",
      role: "Chief Technology Officer",
      bio: "Owns the technical direction across every project: stack choices, code quality, security and the engineering standards our teams build to.",
    },
    {
      name: "Muhammad Mosleh Uddin",
      role: "Head of Business Development",
      bio: "Your first point of contact. Understands what you need to improve, shapes the engagement and stays involved as the senior point of escalation.",
    },
    {
      name: "Maruf Hossain Riyaz",
      role: "Head of Marketing",
      bio: "Leads the Aximest brand and how we tell our story: positioning, content and campaigns that show what our software does for clients.",
    },
  ] as { name: string; role: string; bio?: string; note?: string }[],
  faq: [
    {
      n: "001",
      name: `Who is ${site.name}?`,
      kind: "",
      body: `A software development company in business since 2016. We build web and mobile apps, AI automation, and ERP, CRM and dashboard platforms that run day-to-day operations.`,
    },
    {
      n: "002",
      name: "Where is your team?",
      kind: "",
      body: "Our team is in-house, with offices in Dhaka and Chittagong. You work with the same people from the first plan to ongoing support.",
    },
    {
      n: "003",
      name: "Do you work with clients outside Bangladesh?",
      kind: "",
      body: "Yes. We work with clients worldwide and plan our hours so there is always overlap with your working day.",
    },
    {
      n: "004",
      name: "Do you have your own products?",
      kind: "",
      body: "Yes. Alongside client work we build and run our own products, which means the patterns we bring to your project are already proven in production.",
    },
    {
      n: "005",
      name: "What happens after launch?",
      kind: "",
      body: "We stay on. Support, monitoring and the next round of improvements are part of how we work, with a clean handover whenever you want to take it in-house.",
    },
  ],
};
