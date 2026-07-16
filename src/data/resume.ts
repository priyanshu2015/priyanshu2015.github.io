/**
 * The entire site's content, in one object.
 *
 * Every section on the homepage reads from here. To change what the site says about
 * you, change this file. You should never need to open a component.
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
  /** Optional. Turns the stat into a link so a claim can be checked. */
  href?: string;
};

/** A press mention or external write-up. Rendered as a small labelled link. */
export type WorkLink = {
  label: string;
  href: string;
  /** Publication name, shown as the source. */
  source: string;
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
  /** Third-party coverage. Someone else vouching beats another adjective. */
  links?: WorkLink[];
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
  /**
   * Optional screenshot of the thing actually running.
   *
   * Only set this where a real artifact exists. The research write-ups have nothing to
   * show, and generating a picture to fill the gap would be decoration pretending to be
   * evidence, which is the opposite of what this section is for.
   */
  image?: { src: string; alt: string };
};

export const DATA = {
  name: "Priyanshu Gupta",
  initials: "PG",
  url: "https://priyanshu2015.github.io",
  location: "Göttingen, Germany",

  /**
   * The one line under the name. Lifted from his own LinkedIn headline, which says the
   * thing better than anything written for him. No current-role claim, by design.
   */
  description: "Engineering systems for decision-making. Product, AI, and finance.",

  /**
   * The About paragraph. Markdown is not parsed here, so keep it plain prose.
   *
   * Deliberately says nothing about Germany, the move, or student status.
   *
   * Ends on the present rather than the CV: the previous draft listed three past roles
   * and read as though nothing was happening now.
   */
  summary:
    "I build systems people bet money on, which is a good way to learn the difference between code that works and code that is right. Exchange infrastructure that settles real funds, AI agents that have to be correct rather than merely convincing, and the unglamorous edge cases that decide whether either one survives a Tuesday. First tech hire at Krypto, founding engineer at TanX back when the tech team was two people and a lot of optimism, and now Prysm. I teach what I build: 10,000+ people on YouTube and an eight-week backend architecture course at GeeksForGeeks. There is always something half-finished on my machine. The parts worth explaining end up here.",

  avatarUrl: "/images/priyanshu.jpg",

  stats: [
    { value: "10K+", label: "YouTube subscribers" },
    { value: "10K+", label: "People mentored" },
    { value: "5/5", label: "GFG instructor rating" },
    {
      value: "Top 1%",
      label: "On Topmate",
      href: "https://topmate.io/priyanshugupta",
    },
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
        "An AI-first financial research and portfolio intelligence platform. In its first year: 30,000+ monthly visits, $22M of connected portfolios, 5,000+ users, and 50,000+ AI queries answered. Prysm covers the whole investor journey, from pre-trade research and screening, through in-trade monitoring, to post-trade portfolio analysis, in a single conversational interface. It automates the fundamental, technical, and qualitative work so conviction gets built early, when it still matters, and cuts research time by more than half. I built it from idea to production: natural language stock screening, AI-generated company research, real-time news with sentiment analysis, and quantitative portfolio metrics, on a LangGraph agent system with memory that adapts across sessions, and a RAG pipeline over 100,000+ multi-format documents that attributes every claim to a source. Also a real-time voice assistant in 11 languages, streaming speech to text to LLM to speech, buffered ten words at a time to keep the latency conversational. I instrumented the funnel with Mixpanel, PostHog, and Metabase, defined the KPIs before launch rather than after, and took conversion from 18% to 43%.",
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
        "Joined when the tech team was two people and helped grow it to ten, mentoring engineers and owning the exchange's core end to end: the order execution engine, on-chain deposits, L1 and L2 transfers, and StarkEx zero-knowledge settlement. TanX became a top-10 global DEX and cleared over $1B in quarterly trading volume. I led the integrations with institutional market makers, LayerSwap, and Merkle Science, which is where most of the liquidity and compliance surface came from. When a StarkEx settlement ratio error stalled more than 1,000 transactions, I spent six weeks reverse-engineering their fee and price model and wrote the automation that cleared every edge case, unblocking the trading loop.",
      links: [
        {
          label: "tanX hits $1B quarterly trading volume",
          href: "https://www.globenewswire.com/news-release/2024/07/26/2919512/0/en/Trading-platform-tanX-hits-billion-dollar-quarterly-trading-volume-milestone.html",
          source: "GlobeNewswire",
        },
        {
          label: "Brine.fi raises $16.5M to broaden the DEX market",
          href: "https://www.forbes.com/sites/davidprosser/2023/09/07/brine-fi-raises-165-million-as-it-aims-to-broaden-the-dex-market/",
          source: "Forbes",
        },
      ],
    },
    {
      company: "GeeksForGeeks",
      href: "https://www.geeksforgeeks.org",
      logoUrl: "/images/work/gfg.jpg",
      title: "Course Instructor (Part-Time)",
      start: "Oct 2023",
      end: "Dec 2023",
      description:
        "Designed and taught an eight-week course on scalable backend architecture in Python, taking working engineers from single-server thinking to systems that survive load. Rated 5/5 across every delivery metric.",
    },
    {
      company: "Krypto",
      // No link: Krypto has ceased operations, and a dead link reads worse than none.
      logoUrl: "/images/work/krypto.png",
      title: "Product Engineer, First Tech Hire",
      start: "Aug 2021",
      end: "Oct 2022",
      description:
        "First engineer in. Owned the Portfolio feature from concept to production, designing for eventual consistency with event-based async computation and reconciliation that was idempotent and retried cleanly. Tripled database throughput with PgBouncer pooling in front of PostgreSQL, and added Datadog logging and APM so failures could be seen rather than guessed at.",
    },
  ] satisfies Work[],

  projects: [
    {
      title: "Portfolio X-Ray",
      href: "https://github.com/priyanshu2015/portfolio-xray",
      dates: "2026",
      description:
        "You own four funds, so you are diversified. Except three of them hold the same five large-caps, and you are far more concentrated than your broker's neat little list suggests. That hidden overlap is exactly what hurts in a downturn. Portfolio X-Ray opens every Indian mutual fund and ETF, pulls out the stocks actually inside, and adds them up, so you can see where your money really sits by sector, market cap, and geography. Reads your holdings from Zerodha, broker-agnostic by design, and never places an order.",
      technologies: ["Python", "Zerodha Kite API", "No build step", "MIT"],
      links: [
        {
          type: "Source",
          href: "https://github.com/priyanshu2015/portfolio-xray",
        },
      ],
      image: {
        src: "/images/projects/portfolio-xray.jpg",
        alt: "The Portfolio X-Ray dashboard showing sector, market-cap, and geographic look-through for a demo portfolio, with holdings and P&L broken down below",
      },
    },
    {
      title: "LoRA and Efficient LLM Serving for Financial Expert Agents",
      dates: "2025",
      description:
        "How do you serve a hundred specialised financial models without buying a hundred GPUs? A research survey of parameter-efficient fine-tuning and multi-tenant serving: LoRA training 10,000x fewer parameters, and where vLLM, S-LoRA, and dLoRA actually earn their claimed 4x throughput rather than just quoting it. Evaluated FinLoRA, FinGPT, and layered RAG agent architectures for financial reasoning.",
      technologies: ["LoRA", "vLLM", "S-LoRA", "RAG"],
      links: [],
    },
    {
      title: "AI Trust & Citizen Participation in Digital Public Services",
      dates: "2025",
      description:
        "Does an AI that sounds human earn more trust than one that works? I ran a 2x2 experiment on 143 people to find out. Both helped, but sounding authentic stopped counting for much once the thing performed badly. The odd result: trust predicted whether people would participate, and predicted nothing at all about whether they would hand over their data. People weigh how sensitive the information is over how much they like you.",
      technologies: ["Qualtrics", "Prolific", "Statistics"],
      links: [],
    },
    {
      title: "LetsProgressify",
      href: "https://www.letsprogressify.com",
      dates: "2024",
      description:
        "A learning platform built for a 10,000+ subscriber community, supporting structured resource publishing and content monetisation. Included an ETL pipeline that aggregated hackathons, competitions, and conferences from several platforms into one tracked dashboard.",
      technologies: ["Python", "Django", "Next.js", "PostgreSQL", "Docker"],
      links: [{ type: "Website", href: "https://www.letsprogressify.com" }],
    },
    {
      title: "Privacy-Preserving Computation Techniques",
      dates: "2024",
      description:
        "Can several parties compute on data none of them are allowed to see? Implemented partially homomorphic encryption, secure multi-party computation, and zero-knowledge proofs across a multi-server Flask setup, then measured what each one actually costs. The cryptography is elegant; the bill is real.",
      technologies: ["Python", "Flask", "Cryptography", "ZKP"],
      links: [],
    },
  ] satisfies Project[],

  education: [
    {
      school: "Georg-August-Universität Göttingen",
      href: "https://www.uni-goettingen.de",
      logoUrl: "/images/education/goettingen.png",
      degree: "MSc Computer Science, Applied System Engineering",
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
} as const;

export type ResumeData = typeof DATA;
