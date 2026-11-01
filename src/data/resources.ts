/**
 * Resource hub: reading and tools I recommend. Every link was checked when added.
 * Add a `note` saying why it's worth the time; a bare list of links is not a recommendation.
 */

export type Resource = {
  title: string;
  href: string;
  by?: string;
  note: string;
  /** Thumbnail for videos. YouTube links get one automatically; set this for anything else. */
  thumb?: string;
};

/** YouTube thumbnail from a watch, youtu.be, or embed URL. Undefined for anything else. */
export function thumbnailFor(r: Resource): string | undefined {
  if (r.thumb) return r.thumb;
  const m = r.href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/mqdefault.jpg` : undefined;
}

export type ResourceGroup = {
  id: string;
  title: string;
  blurb: string;
  items: Resource[];
};

/** Shown at the top of /resources. Bump it whenever the list changes. */
export const RESOURCES_UPDATED = "2026-11-01";

export const RESOURCES: ResourceGroup[] = [
  {
    id: "watch",
    title: "Start here: watch",
    blurb: "Start with these.",
    items: [
      { title: "Large Language Models explained briefly", href: "https://www.youtube.com/watch?v=LPZh9BOjkQs", by: "3Blue1Brown", note: "Best short explanation of how an LLM works." },
      { title: "Deep Dive into LLMs like ChatGPT", href: "https://www.youtube.com/watch?v=7xTGNNLPyMI", by: "Andrej Karpathy", note: "How ChatGPT-like models are trained, end to end. Long, but worth it." },
      { title: "Let's build GPT: from scratch, in code", href: "https://www.youtube.com/watch?v=kCc8FmEb1nY", by: "Andrej Karpathy", note: "Build a GPT from scratch, line by line." },
      { title: "Practical tips on using Claude Code, by Boris Cherny", href: "https://www.youtube.com/watch?v=M8HuXu_bOco&t=1263s", by: "Solomon Alfred", note: "How the creator of Claude Code uses it day to day." },
      { title: "Harvard CS50 (2026)", href: "https://www.youtube.com/watch?v=gmuTjeQUbTM", by: "freeCodeCamp.org", note: "Full CS foundation, free. Use the chapters to jump around." },
      { title: "The Revolutionary Course", href: "https://youtube.com/playlist?list=PLLz6Bi1mIXhEE3NEaLz3xNn7JHBHNb34I", by: "Priyanshu Gupta", note: "Covers computer architecture, networking, operating systems, multithreading and asynchronous programming, in a practical way. Created in 2021.", thumb: "https://i.ytimg.com/vi/uZpkxZIJH54/mqdefault.jpg" },
      { title: "How to build a career you actually love", href: "https://www.ted.com/talks/bill_gurley_how_to_build_a_career_you_actually_love", by: "Bill Gurley, TED", note: "Not technical, but really good advice on choosing what to work on.", thumb: "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/talks/talk_180789/723fcb38-8e0b-4c51-8bd9-bb6173158f31/BillGurley_2026-embed.jpg?quality=80&c=640%2C360&w=640" },
    ],
  },
  {
    id: "ai-engineering",
    title: "AI engineering",
    blurb: "Building LLM products that hold up past the demo.",
    items: [
      { title: "Building effective agents", href: "https://www.anthropic.com/engineering/building-effective-agents", by: "Anthropic", note: "Clear patterns for workflows versus agents. Start simple, add complexity only when it earns its place." },
      { title: "Your AI product needs evals", href: "https://hamel.dev/blog/posts/evals/", by: "Hamel Husain", note: "The most practical argument for measuring quality before you scale anything." },
      { title: "Chip Huyen's blog", href: "https://huyenchip.com", by: "Chip Huyen", note: "Production ML and AI systems, written by someone who has shipped them." },
      { title: "Eugene Yan", href: "https://eugeneyan.com", by: "Eugene Yan", note: "Applied LLM patterns, recommender systems, and how to write about technical work." },
      { title: "Lil'Log", href: "https://lilianweng.github.io", by: "Lilian Weng", note: "Deep, careful surveys of agents, prompting, and model internals." },
      { title: "Neural Networks: Zero to Hero", href: "https://karpathy.ai/zero-to-hero.html", by: "Andrej Karpathy", note: "Build a language model from scratch. The best way to stop treating it as a black box." },
      { title: "Hugging Face course", href: "https://huggingface.co/learn", by: "Hugging Face", note: "Free hands-on courses for LLMs, agents, and fine-tuning." },
      { title: "Model Context Protocol", href: "https://modelcontextprotocol.io", by: "MCP", note: "The standard for connecting models to tools and data. Read it before building a connector." },
    ],
  },
  {
    id: "serving",
    title: "Serving & fine-tuning models",
    blurb: "Throughput, cost, and many specialised models on shared hardware.",
    items: [
      { title: "LoRA: Low-Rank Adaptation", href: "https://arxiv.org/abs/2106.09685", by: "Hu et al.", note: "The paper behind parameter-efficient fine-tuning." },
      { title: "S-LoRA", href: "https://arxiv.org/abs/2311.03285", by: "Sheng et al.", note: "Serving thousands of LoRA adapters from one GPU pool." },
      { title: "vLLM docs", href: "https://docs.vllm.ai", by: "vLLM", note: "The reference for fast open-model serving: batching, paged attention, deployment." },
    ],
  },
  {
    id: "backend",
    title: "Backend & distributed systems",
    blurb: "The foundations under every AI product.",
    items: [
      { title: "Designing Data-Intensive Applications", href: "https://dataintensive.net", by: "Martin Kleppmann", note: "The book on storage, replication, streams, and consistency. Read it once, reread chapters often." },
      { title: "System Design Primer", href: "https://github.com/donnemartin/system-design-primer", by: "Donne Martin", note: "A free map of the concepts that come up in design interviews and real reviews." },
      { title: "Google SRE Book", href: "https://sre.google/sre-book/table-of-contents/", by: "Google", note: "SLOs, error budgets, incident response. Essential once real clients depend on you." },
      { title: "Celery docs", href: "https://docs.celeryq.dev", by: "Celery", note: "Task queues in Python; read the sections on retries and idempotency." },
      { title: "RabbitMQ tutorials", href: "https://www.rabbitmq.com/tutorials", by: "RabbitMQ", note: "Messaging patterns explained one at a time." },
      { title: "PostgreSQL docs", href: "https://www.postgresql.org/docs/", by: "PostgreSQL", note: "Still the best database documentation in existence." },
      { title: "PgBouncer", href: "https://www.pgbouncer.org", by: "PgBouncer", note: "Connection pooling for Postgres, the cheapest throughput win I know." },
      { title: "OpenTelemetry docs", href: "https://opentelemetry.io/docs/", by: "OpenTelemetry", note: "Vendor-neutral tracing, metrics, and logs." },
    ],
  },
  {
    id: "evals",
    title: "Evaluation & quality",
    blurb: "Knowing whether it works.",
    items: [
      { title: "Ragas docs", href: "https://docs.ragas.io", by: "Ragas", note: "Metrics and tooling for evaluating retrieval-augmented pipelines." },
      { title: "Playwright", href: "https://playwright.dev", by: "Microsoft", note: "End-to-end browser testing and a good way to let an agent verify a UI." },
    ],
  },
  {
    id: "staying-current",
    title: "Staying current",
    blurb: "Where I follow what is changing in AI.",
    items: [
      { title: "Simon Willison's weblog", href: "https://simonwillison.net", by: "Simon Willison", note: "Daily, honest notes on what new models and tools can actually do." },
      { title: "Latent Space", href: "https://www.latent.space", by: "swyx & Alessio", note: "Podcast and newsletter for AI engineers." },
      { title: "Claude platform docs", href: "https://platform.claude.com/docs", by: "Anthropic", note: "API, tool use, and prompt-caching reference." },
      { title: "Anthropic skills", href: "https://github.com/anthropics/skills", by: "Anthropic", note: "Reference skills to learn from before writing your own." },
    ],
  },
  {
    id: "video",
    title: "Video & creative tooling",
    blurb: "For the editing workflow in the Playbook.",
    items: [
      { title: "Remotion docs", href: "https://www.remotion.dev/docs", by: "Remotion", note: "Programmatic video in React; the fundamentals page is worth an hour." },
    ],
  },
];
