/**
 * The AI Playbook: the skills, connectors (MCP servers), plugins, and open-source tools
 * I actually use with Claude, grouped by use case. Each use case is an ordered workflow;
 * each step lists the options for it. `items` is the toolkit with links.
 *
 * Only add what you've used on real work. The homepage teaser and /playbook read from here.
 */

export type PlaybookItem = {
  name: string;
  kind: "connector" | "skill" | "plugin" | "tool" | "library";
  /** One line: what it does for this use case, not what the vendor says it is. */
  use: string;
  href?: string;
};

export type PlaybookStep = {
  title: string;
  /** What happens at this step, in plain words. */
  what: string;
  /** Names from `items` that can do this step. */
  options: string[];
};

export type PlaybookCategory = {
  id: string;
  title: string;
  blurb: string;
  steps: PlaybookStep[];
  items: PlaybookItem[];
};

export const PLAYBOOK: PlaybookCategory[] = [
  {
    id: "video",
    title: "Video editing, sound & VFX",
    blurb: "How I edit my reels: Claude does the heavy lifting, I make the calls.",
    steps: [
      { title: "Study the reference", what: "Break down a reel I like: pacing, cuts, on-screen text.", options: ["Watch skill"] },
      { title: "Clean the rough cut", what: "Remove false starts, repeats and silences.", options: ["cut-audit & take-geometry", "Palmier Pro", "FFmpeg"] },
      { title: "Edit on a timeline", what: "Cuts, captions, colour and export, from chat.", options: ["Palmier Pro", "Remotion", "FFmpeg"] },
      { title: "Effects & b-roll", what: "Face-tracked effects, motion graphics, overlays.", options: ["claude-video-effects", "Motion Studio MCP", "video-overlay-kit", "HyperFrames", "Remotion", "OpenMontage", "Tabler Icons"] },
      { title: "Sound design", what: "Real sound effects on the right frame, plus a check of how it sounds.", options: ["real-sfx", "Earshot", "Openverse", "soundcn"] },
      { title: "Get ideas", what: "Motion videos with the prompts and skills behind them.", options: ["Prompt Motion"] },
    ],
    items: [
      { name: "Watch skill", kind: "skill", use: "Turns a video into frames, audio and transcript Claude can read.", href: "https://github.com/oxbshw/watch-skill" },
      { name: "cut-audit & take-geometry", kind: "skill", use: "By Nishant Chahar. Check a rough cut is clean; find where text can sit around your face. Free starter pack for his Substack subscribers.", href: "https://nishantchahar.substack.com/p/i-edit-every-video-with-claude-here" },
      { name: "Palmier Pro", kind: "connector", use: "A real editing timeline Claude can drive.", href: "https://www.palmier.io" },
      { name: "FFmpeg", kind: "tool", use: "The command-line tool behind almost every step: cut, convert, mix audio, export.", href: "https://ffmpeg.org" },
      { name: "Remotion", kind: "library", use: "Video as React code.", href: "https://www.remotion.dev" },
      { name: "claude-video-effects", kind: "skill", use: "36 effects for talking-head clips, with face tracking. Type /effects orbit.", href: "https://github.com/Vibha-Ramprakash/claude-video-effects" },
      { name: "Motion Studio MCP", kind: "connector", use: "Motion's official MCP: generate and tweak animations from chat.", href: "https://motion.dev/docs/studio-install" },
      { name: "video-overlay-kit", kind: "connector", use: "Describe the b-roll, get an MP4 back.", href: "https://github.com/alichherawalla/video-overlay-kit" },
      { name: "HyperFrames", kind: "tool", use: "HTML-based motion graphics that render to video.", href: "https://www.hyperframes.dev" },
      { name: "OpenMontage", kind: "tool", use: "Open-source agentic video production.", href: "https://github.com/calesthio/OpenMontage" },
      { name: "Tabler Icons", kind: "library", use: "6,000+ free icons for on-screen graphics.", href: "https://github.com/tabler/tabler-icons" },
      { name: "real-sfx", kind: "skill", use: "Real recorded sound effects, placed on the exact frame.", href: "https://clipwing.pro/skills/real-sfx" },
      { name: "Earshot", kind: "connector", use: "Lets Claude listen to audio and review it.", href: "https://github.com/Leonxlnx/earshot" },
      { name: "Openverse", kind: "library", use: "Free, openly licensed sounds and images.", href: "https://openverse.org" },
      { name: "soundcn", kind: "library", use: "700+ UI sound effects.", href: "https://github.com/kapishdima/soundcn" },
      { name: "Prompt Motion", kind: "tool", use: "Motion videos made with Claude, with prompts and skills.", href: "https://prompt-motion.com" },
    ],
  },
  {
    id: "coding",
    title: "Coding & development",
    blurb: "The loop I use to plan, build, review, and ship, including this website.",
    steps: [
      { title: "Shape the idea", what: "Ask questions until the real goal is clear, then write a short design before any code.", options: ["superpowers", "feature-dev"] },
      { title: "Understand the codebase", what: "Trace how the existing feature works so the change fits what's already there.", options: ["feature-dev", "typescript-lsp"] },
      { title: "Look up current docs", what: "Pull up-to-date library docs so the model stops guessing at old APIs.", options: ["Context7"] },
      { title: "Build", what: "Small, tested steps on a separate branch.", options: ["superpowers", "GitHub CLI"] },
      { title: "Verify in a real browser", what: "Open the app and check pages, flows, and console errors instead of trusting the code.", options: ["Playwright"] },
      { title: "Review, simplify, ship", what: "A second pass for bugs and needless complexity, then the PR and deploy.", options: ["code-review", "pr-review-toolkit", "code-simplifier", "Vercel"] },
    ],
    items: [
      { name: "superpowers", kind: "plugin", use: "Brainstorm, plan, test-first, debug, and review as a repeatable workflow.", href: "https://github.com/anthropics/claude-plugins-official" },
      { name: "feature-dev", kind: "plugin", use: "Explore the codebase and design the change before touching it." },
      { name: "Context7", kind: "connector", use: "Current library docs on demand.", href: "https://context7.com" },
      { name: "typescript-lsp", kind: "plugin", use: "Language-server intelligence for TypeScript projects." },
      { name: "Playwright", kind: "connector", use: "Drive a real browser to check layouts, flows, and errors.", href: "https://playwright.dev" },
      { name: "code-review", kind: "plugin", use: "Review a diff or PR for real bugs before it merges." },
      { name: "pr-review-toolkit", kind: "plugin", use: "Focused reviewers for tests, error handling, and types." },
      { name: "code-simplifier", kind: "plugin", use: "Refine recent code for clarity without changing behaviour." },
      { name: "Vercel", kind: "plugin", use: "Deploy and inspect Vercel projects.", href: "https://vercel.com" },
      { name: "GitHub CLI", kind: "tool", use: "PRs, issues, and CI from the same session.", href: "https://cli.github.com" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & design",
    blurb: "From a deliberate visual direction to a verified, animated page.",
    steps: [
      { title: "Pick a direction", what: "Choose a style, palette, and type pairing on purpose instead of accepting a default.", options: ["frontend-design", "ui-ux-pro-max"] },
      { title: "Build components", what: "Pull in ready-made components instead of writing them from scratch.", options: ["shadcn MCP", "Magic UI MCP", "21st.dev Magic", "ui-design"] },
      { title: "Add motion", what: "Scroll, page and micro-interactions, used sparingly.", options: ["Motion Studio MCP", "Design skillstack"] },
      { title: "Check accessibility and layout", what: "Audit against WCAG, then resize and flip dark mode in a real browser.", options: ["ui-design", "Playwright"] },
    ],
    items: [
      { name: "frontend-design", kind: "skill", use: "Pushes past templated UI toward an intentional visual direction." },
      { name: "ui-ux-pro-max", kind: "skill", use: "Style, palette, and type pairing lookups for fast design decisions.", href: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" },
      { name: "ui-design", kind: "plugin", use: "Design review, components, design-system setup, accessibility audit.", href: "https://github.com/wshobson/agents" },
      { name: "shadcn MCP", kind: "connector", use: "Browse and install shadcn/ui components from chat.", href: "https://ui.shadcn.com/docs/mcp" },
      { name: "Magic UI MCP", kind: "connector", use: "Animated components from Magic UI, added by name.", href: "https://magicui.design/docs/mcp" },
      { name: "Motion Studio MCP", kind: "connector", use: "Motion's official MCP for animations.", href: "https://motion.dev/docs/studio-install" },
      { name: "21st.dev Magic", kind: "connector", use: "Generate and fetch polished UI components.", href: "https://21st.dev" },
      { name: "Playwright", kind: "connector", use: "Check layouts and dark mode in a real browser.", href: "https://playwright.dev" },
      { name: "Design skillstack", kind: "plugin", use: "GSAP ScrollTrigger, Framer Motion, Lottie, Locomotive Scroll, Three.js.", href: "https://github.com/freshtechbro/claudedesignskills" },
    ],
  },
  {
    id: "research",
    title: "Research, data & automation",
    blurb: "Find facts fast, pull data that has no API, and connect apps without writing glue code.",
    steps: [
      { title: "Search widely", what: "Fan out across sources and come back with a cited summary.", options: ["Deep research", "last30days"] },
      { title: "Pull data", what: "Scrape sites that have no API and get clean data back.", options: ["Apify", "Claude in Chrome"] },
      { title: "Keep it", what: "Save notes, docs and findings in one shared place.", options: ["Notion"] },
      { title: "Automate it", what: "Connect apps and run repeat tasks without code.", options: ["Zapier"] },
    ],
    items: [
      { name: "Deep research", kind: "skill", use: "Searches many sources and writes a cited report." },
      { name: "last30days", kind: "plugin", use: "What people are saying about a topic in the last month.", href: "https://github.com/mvanhorn/last30days-skill" },
      { name: "Apify", kind: "connector", use: "Ready-made scrapers for almost any site, run from chat.", href: "https://apify.com" },
      { name: "Claude in Chrome", kind: "connector", use: "Claude works inside your browser for sites with no connector." },
      { name: "Notion", kind: "connector", use: "Read and write pages and databases from chat.", href: "https://notion.so" },
      { name: "Zapier", kind: "connector", use: "Thousands of apps Claude can trigger, like Gmail, Sheets and Slack.", href: "https://zapier.com" },
    ],
  },
  {
    id: "markets",
    title: "Markets & investing",
    blurb: "How I use Claude to look at markets and my own portfolio.",
    steps: [
      { title: "Check my portfolio", what: "Read holdings and positions straight from Zerodha.", options: ["Kite MCP"] },
      { title: "Scan the market", what: "Screeners, technical indicators, sector tables and watchlists.", options: ["TradingView MCP"] },
      { title: "Go deeper", what: "Valuation, competitive analysis and research reports on a company before I decide.", options: ["Financial services skills", "Deep research"] },
    ],
    items: [
      { name: "Kite MCP", kind: "connector", use: "Zerodha's official MCP: holdings, positions and market data in Claude.", href: "https://github.com/zerodha/kite-mcp-server" },
      { name: "TradingView MCP", kind: "connector", use: "Community MCP for TradingView screeners and technical analysis. Unofficial.", href: "https://pypi.org/project/tradingview-mcp-server/" },
      { name: "Financial services skills", kind: "skill", use: "Anthropic's six skills for valuation models, competitive analysis, research reports and due diligence.", href: "https://academy.claude.com/tutorials/claude-for-financial-services-skills" },
      { name: "Deep research", kind: "skill", use: "Searches many sources and writes a cited report." },
    ],
  },
  {
    id: "growth",
    title: "Content & growth",
    blurb: "Getting the work in front of people without living inside the apps.",
    steps: [
      { title: "Write it", what: "Hooks, captions, and scripts in my own voice, then strip anything that reads like AI.", options: ["Claude"] },
      { title: "Automate replies", what: "Keyword replies and DM flows that deliver what people asked for.", options: ["Manychat"] },
    ],
    items: [
      { name: "Claude", kind: "tool", use: "Drafting in my own voice.", href: "https://claude.ai" },
      { name: "Manychat", kind: "tool", use: "Instagram DM automations: comment-to-DM and keyword flows.", href: "https://manychat.com" },
    ],
  },
  {
    id: "discover",
    title: "Finding new skills",
    blurb: "Where I look before writing a skill myself.",
    steps: [
      { title: "Search a registry", what: "Look for a ranked, maintained skill before building one.", options: ["Skills Directory", "explainx.ai", "Anthropic skills"] },
      { title: "Read before installing", what: "Open the SKILL.md and scripts; a skill runs with your permissions.", options: ["Anthropic skills"] },
      { title: "Write your own", what: "Capture a workflow you keep repeating as a skill.", options: ["skill-creator"] },
    ],
    items: [
      { name: "Skills Directory", kind: "tool", use: "Searchable directory of Claude skills with grades.", href: "https://www.skillsdirectory.com/skills/" },
      { name: "explainx.ai", kind: "tool", use: "Registry to browse and install agent skills.", href: "https://www.explainx.ai/skills" },
      { name: "Anthropic skills", kind: "library", use: "Reference skills to learn from.", href: "https://github.com/anthropics/skills" },
      { name: "skill-creator", kind: "skill", use: "Draft, test, and improve a skill." },
    ],
  },
];
