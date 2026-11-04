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
  icon: "github" | "linkedin" | "youtube" | "instagram" | "mail";
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
  /** Third-party coverage, such as press mentions. */
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
  /** Optional screenshot. Set it only where a real artifact exists. */
  image?: { src: string; alt: string };
};

export const DATA = {
  name: "Priyanshu Gupta",
  initials: "PG",
  url: "https://priyanshu2015.github.io",
  location: "Göttingen, Germany",

  /**
   * The one line under the name. Also the site's meta description and the social-card
   * subtitle. Keep it to one line.
   */
  description:
    "Systems, infrastructure and AI agents, and how they work under the hood. I also share investing learnings and connect the dots to build financial thinking.",


  /** The About paragraph. Markdown is not parsed here, so keep it plain prose. */
  summary:
    "For the last few years I've been building products where real money and data are involved. I was a founding engineer at trading exchanges, and since 2024 I'm building Prysm, an AI research platform for investors. Working on these taught me that in finance, code that runs is not enough. The numbers have to be exactly right, every time. One small mistake meant someone lost real money, so I learned to be extra careful: double-check everything, plan for what can go wrong, and build systems people can rely on. I'm still learning every day, and I write here about what worked, what broke, and what I would do differently.",

  /** Short principles shown under About. Keep each to one line. */
  principles: [
    { k: "Get it right first", v: "If it touches someone's money, it has to be correct." },
    { k: "Measure it", v: "Numbers over gut feeling." },
    { k: "Build, then share", v: "Ship to real users, then write about it." },
  ],

  avatarUrl: "/images/priyanshu.jpg",

  /** Lead card on the homepage. Capabilities and outcomes only, no implementation details. */
  featured: {
    name: "Prysm",
    href: "https://www.prysmai.in",
    role: "Founder & Chief Architect",
    since: "Dec 2024",
    pitch:
      "Building the financial layer for Indian markets. AI workflows for deep research that blend fundamental, technical and qualitative research, to help people build their own market conviction.",
    /** Shown under the pitch. */
    clients: {
      text: "Already serving leading clients. Want to plug Prysm into your app?",
      email: "priyanshu@prysmai.in",
    },
    metrics: [
      { value: "30K+", label: "monthly visits" },
      { value: "$22M", label: "portfolios connected" },
      { value: "5,000+", label: "users" },
      { value: "50K+", label: "AI queries answered" },
    ],
    /** What it does, across the investor journey. */
    journey: [
      { id: "pre", label: "Pre-trade", body: "Research and screen stocks by just asking, before you put money in." },
      { id: "in", label: "In-trade", body: "While you place a trade: price action, news and sentiment for that stock, right where you need it." },
      { id: "post", label: "Post-trade", body: "Portfolio analysis, connected straight from your broker." },
    ],
    video: "https://www.youtube.com/watch?v=51rkzlrJjfA",
  },

  /** Older credentials. Shown as one quiet line at the bottom of the homepage. */
  stats: [
    {
      value: "10K+",
      label: "YouTube subscribers",
      href: "https://www.youtube.com/@priyanshuguptaofficial",
    },
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
      {
        name: "YouTube",
        url: "https://www.youtube.com/@priyanshuguptaofficial",
        icon: "youtube",
      },
    ] satisfies Social[],
  },

  work: [
    {
      company: "Prysm Finance",
      href: "https://www.prysmai.in",
      logoUrl: "/images/work/prysm.png",
      title: "Founder & Chief Architect",
      start: "Dec 2024",
      end: "Present",
      // The full story is in the featured card at the top of the page; this is the record.
      description:
        "Founded Prysm and built it from idea to 5,000+ users in the first year.",
    },
    {
      company: "TanX (prev. Brine Finance)",
      href: "https://www.tanx.fi",
      logoUrl: "/images/work/tanx.svg",
      title: "Senior Product Engineer & Founding Team Member",
      start: "Nov 2022",
      end: "Jan 2024",
      description:
        "Joined when the tech team was two people and helped grow it to ten, mentoring engineers and owning the exchange's core end to end: the order execution engine, on-chain deposits, L1 and L2 transfers, and StarkEx zero-knowledge settlement. TanX became a top-10 global DEX and cleared over $1B in quarterly trading volume. I led the integrations with institutional market makers, LayerSwap, and Merkle Science, which is where most of the liquidity and compliance surface came from, and built the on-ramp integrations with Polygon and Starknet. When a StarkEx settlement ratio error stalled more than 1,000 transactions, I spent six weeks reverse-engineering their fee and price model and wrote the automation that cleared every edge case, unblocking the trading loop.",
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
      // No link: the site is no longer up.
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
      href: "https://drive.google.com/drive/folders/1IssVKiYtG9WxIElw2vZtsRNu8tJuk4XJ?usp=sharing",
      dates: "2025",
      description:
        "How do you serve a hundred specialised financial models without buying a hundred GPUs? A research survey of parameter-efficient fine-tuning and multi-tenant serving: LoRA training 10,000x fewer parameters, and where vLLM, S-LoRA, and dLoRA actually earn their claimed 4x throughput rather than just quoting it. Evaluated FinLoRA, FinGPT, and layered RAG agent architectures for financial reasoning.",
      technologies: ["LoRA", "vLLM", "S-LoRA", "RAG"],
      links: [
        {
          type: "Paper",
          href: "https://drive.google.com/drive/folders/1IssVKiYtG9WxIElw2vZtsRNu8tJuk4XJ?usp=sharing",
        },
      ],
    },
    {
      title: "AI Trust & Citizen Participation in Digital Public Services",
      href: "https://drive.google.com/file/d/1l2wc_TAqg31Mtq1RVTzVY2Mg2Zx4YseU/view?usp=sharing",
      dates: "2025",
      description:
        "Does an AI that sounds human earn more trust than one that works? We ran a 2x2 experiment on 143 people to find out. Both helped, but sounding authentic stopped counting for much once the thing performed badly. The odd result: trust predicted whether people would participate, and predicted nothing at all about whether they would hand over their data. People weigh how sensitive the information is over how much they like you.",
      technologies: ["Qualtrics", "Prolific", "Statistics"],
      links: [
        {
          type: "Paper",
          href: "https://drive.google.com/file/d/1l2wc_TAqg31Mtq1RVTzVY2Mg2Zx4YseU/view?usp=sharing",
        },
      ],
    },
    {
      title: "LetsProgressify",
      dates: "2024",
      description:
        "A learning platform for a 10,000+ subscriber community, built around Roadmaps: an interactive, drag-and-drop canvas where every topic carries its own resources, deadline, and rules for what can be done in parallel, what's optional, and what's recommended. Expert-verified roadmaps to start from, or build your own with AI. Also shipped an ETL pipeline that pulled hackathons, competitions, and conferences from several platforms into one tracked dashboard.",
      technologies: ["Python", "Django", "Next.js", "PostgreSQL", "Docker"],
      links: [],
      image: {
        src: "/images/projects/letsprogressify-roadmap.jpg",
        alt: "The LetsProgressify Roadmaps editor showing a System Design roadmap as a node graph, with a legend for ordering rules and a side panel for resources, deadline, and timeframe",
      },
    },
    {
      title: "Privacy-Preserving Computation Techniques",
      href: "https://github.com/priyanshu2015/PPC-Techniques-Implementation",
      dates: "2024",
      description:
        "Can several parties compute on data none of them are allowed to see? Implemented partially homomorphic encryption, secure multi-party computation, and zero-knowledge proofs across a multi-server Flask setup, then measured what each one actually costs. The cryptography is elegant; the bill is real.",
      technologies: ["Python", "Flask", "Cryptography", "ZKP"],
      links: [
        {
          type: "Source",
          href: "https://github.com/priyanshu2015/PPC-Techniques-Implementation",
        },
      ],
    },
  ] satisfies Project[],

  education: [
    {
      school: "Georg-August-Universität Göttingen",
      href: "https://www.uni-goettingen.de",
      logoUrl: "/images/education/goettingen.png",
      degree: "MSc Computer Science, Spec. Applied System Engineering with minor in Business Information Systems",
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
