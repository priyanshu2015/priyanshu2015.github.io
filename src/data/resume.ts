/**
 * The entire site's content, in one object.
 *
 * Every section on the homepage reads from here. To change what the site says about
 * you, change this file — you should never need to open a component.
 *
 * Blog posts are the exception: they live as MDX in content/posts/. See CONTENT.md.
 *
 * Types are enforced, so a missing field fails `npm run typecheck` and the CI build
 * rather than shipping a broken page.
 */

export type Social = {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "mail";
};

export type Stat = {
  value: string;
  label: string;
};

export type Work = {
  company: string;
  href?: string;
  logoUrl?: string;
  title: string;
  /** Shown verbatim. Use "Present" for ongoing. */
  start: string;
  end: string;
  description: string;
  /** Optional YouTube URL. Renders as a click-to-load facade, never an auto-embed. */
  video?: string;
};

export type Education = {
  school: string;
  href?: string;
  logoUrl?: string;
  degree: string;
  start: string;
  end: string;
};

export type Project = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: string[];
  links: { type: string; href: string }[];
};

export const DATA = {
  name: "Priyanshu Gupta",
  initials: "PG",
  url: "https://priyanshu2015.github.io",
  location: "Göttingen, Germany",

  /** The one line under the name. No current-role claim, by design. */
  description:
    "I build backend systems and AI agents, and write about how they work underneath.",

  /**
   * The About paragraph. Markdown is not parsed here — keep it plain prose.
   * Deliberately says nothing about Germany, the move, or student status.
   */
  summary:
    "I like taking things apart to see how they actually work, then explaining what I found. Most of my work has been deep in the backend: exchange infrastructure that settles real money, LLM agent systems that have to be right rather than merely plausible, and the unglamorous edge cases that decide whether either one survives contact with production. I was the first tech hire at Krypto, a founding team member at TanX when it was two engineers, and I've since been building Prysm. Alongside that I teach — 10,000+ people follow along on YouTube, and I ran an eight-week backend architecture course at GeeksForGeeks. Away from the screen I travel, play badminton, and spend more time in the gym than my posture suggests.",

  avatarUrl: "/images/priyanshu.jpg",

  stats: [
    { value: "10K+", label: "YouTube subscribers" },
    { value: "10K+", label: "People mentored" },
    { value: "5/5", label: "GFG instructor rating" },
    { value: "Top 1%", label: "On Topmate" },
  ] satisfies Stat[],

  contact: {
    email: "priyanshuguptacontact@gmail.com",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/priyanshu2015",
        icon: "github",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/priyanshuofcl/",
        icon: "linkedin",
      },
    ] satisfies Social[],
  },

  work: [
    {
      company: "Prysm Finance",
      href: "https://www.prysm.fi",
      logoUrl: "/images/work/prysm.png",
      title: "Founder & Lead Engineer",
      start: "Dec 2024",
      end: "Present",
      description:
        "An AI-first investing platform. Architected a production LLM agent system on LangGraph serving 5,000+ users and 50K+ queries, with a RAG pipeline over 100K+ multi-format documents doing source-attributed retrieval. Built a real-time voice assistant across 11 languages on a streaming speech-to-text → LLM → speech pipeline. Instrumented the funnel end to end and took conversion from 18% to 43%.",
      video: "https://www.youtube.com/watch?v=51rkzlrJjfA",
    },
    {
      company: "TanX (prev. Brine Finance)",
      href: "https://www.tanx.fi",
      logoUrl: "/images/work/tanx.svg",
      title: "Senior Product Engineer & Founding Team Member",
      start: "Nov 2022",
      end: "Jan 2024",
      description:
        "Joined a two-person tech team and helped scale it to ten. TanX became a top-10 global DEX, clearing $1B+ in quarterly trading volume. Built core exchange infrastructure: the order execution engine, on-chain deposits, L1/L2 transfers, and StarkEx ZKP settlement. Spent six weeks reverse-engineering a StarkEx settlement ratio error that had stalled 1,000+ transactions, and unblocked the exchange's core trading loop.",
    },
    {
      company: "GeeksForGeeks",
      href: "https://www.geeksforgeeks.org",
      logoUrl: "/images/work/gfg.jpg",
      title: "Course Instructor (Part-Time)",
      start: "Oct 2023",
      end: "Dec 2023",
      description:
        "Led an eight-week course on scalable backend architecture in Python. Rated 5/5 across every delivery metric.",
    },
    {
      company: "Krypto",
      href: "https://krypto.exchange",
      logoUrl: "/images/work/krypto.png",
      title: "Product Engineer, First Tech Hire",
      start: "Aug 2021",
      end: "Oct 2022",
      description:
        "Owned the Portfolio feature end to end, designed for eventual consistency with event-based async computation and reconciliation that was idempotent and retried cleanly. Tripled database throughput with PgBouncer pooling in front of PostgreSQL, and added Datadog logging and APM so failures could be seen rather than guessed at.",
    },
  ] satisfies Work[],

  education: [
    {
      school: "Georg-August-Universität Göttingen",
      href: "https://www.uni-goettingen.de",
      logoUrl: "/images/education/goettingen.png",
      degree: "MSc Computer Science — Applied System Engineering",
      start: "2024",
      end: "Present",
    },
    {
      school: "Vellore Institute of Technology",
      href: "https://vit.ac.in",
      logoUrl: "/images/education/vit.png",
      degree: "B.Tech, Information Technology",
      start: "2018",
      end: "2022",
    },
  ] satisfies Education[],

  projects: [
    {
      title: "Portfolio X-Ray",
      href: "https://github.com/priyanshu2015/portfolio-xray",
      dates: "2026",
      description:
        "Your broker shows you a list of holdings. It doesn't show you that three of your \"diversified\" funds hold the same five large-caps. Portfolio X-Ray opens every Indian mutual fund and ETF, pulls out the stocks actually inside, and adds them up — so you can see your real sector, market-cap, and geographic exposure. Reads from Zerodha, broker-agnostic by design, and never places orders.",
      technologies: ["Python", "HTML", "Zerodha Kite API", "MIT"],
      links: [
        { type: "Source", href: "https://github.com/priyanshu2015/portfolio-xray" },
      ],
    },
    {
      title: "LoRA and Efficient LLM Serving for Financial Expert Agents",
      dates: "2025",
      description:
        "A research seminar survey of parameter-efficient fine-tuning and multi-tenant serving: LoRA's 10,000× reduction in trainable parameters, and where vLLM, S-LoRA, and dLoRA actually earn their throughput gains. Evaluated FinLoRA, FinGPT, and layered RAG agent architectures for financial reasoning.",
      technologies: ["LoRA", "vLLM", "S-LoRA", "RAG"],
      links: [],
    },
    {
      title: "AI Trust & Citizen Participation in Digital Public Services",
      dates: "2025",
      description:
        "A 2×2 between-subjects experiment (N=143) on how an AI's authenticity and its performance shape citizen trust. Both raised trust independently, but poor performance blunted the benefit of authenticity. Trust predicted participation and yet failed to predict disclosure — suggesting people weigh how sensitive the information is over how much they trust the system.",
      technologies: ["Qualtrics", "Prolific", "Statistics"],
      links: [],
    },
    {
      title: "LetsProgressify",
      href: "https://www.letsprogressify.com",
      dates: "2024",
      description:
        "A learning platform for a 10K+ subscriber community, supporting structured resource publishing and content monetisation. Included an ETL pipeline aggregating hackathons, competitions, and conferences from several platforms into one tracked dashboard.",
      technologies: ["Python", "Django", "Next.js", "PostgreSQL", "Docker"],
      links: [
        { type: "Website", href: "https://www.letsprogressify.com" },
      ],
    },
    {
      title: "Privacy-Preserving Computation Techniques",
      dates: "2024",
      description:
        "Implemented partially homomorphic encryption, secure multi-party computation, and zero-knowledge proofs across a multi-server Flask architecture, then measured what each one actually costs in performance and scalability.",
      technologies: ["Python", "Flask", "Cryptography", "ZKP"],
      links: [],
    },
  ] satisfies Project[],
} as const;

export type ResumeData = typeof DATA;
