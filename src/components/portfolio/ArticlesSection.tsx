import { Clock, ArrowUpRight, BookOpen } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Building a Real-Time Trading Bot with Reinforcement Learning",
    excerpt: "How I used PPO and custom reward shaping to build a profitable algorithmic trading system that adapts to market volatility.",
    date: "2024-03-15",
    readTime: "12 min",
    tags: ["AI/ML", "Finance", "Python"],
    url: "#",
  },
  {
    id: "2",
    title: "Why I Switched from Kubernetes to Serverless (And Back Again)",
    excerpt: "A deep dive into the cost-benefit analysis of container orchestration vs serverless for high-throughput fintech applications.",
    date: "2024-01-22",
    readTime: "8 min",
    tags: ["DevOps", "Architecture"],
    url: "#",
  },
  {
    id: "3",
    title: "Fine-Tuning LLMs for Financial Document Analysis",
    excerpt: "Step-by-step guide to creating domain-specific language models for SEC filing analysis and earnings call summarization.",
    date: "2023-11-08",
    readTime: "15 min",
    tags: ["NLP", "Finance", "LLMs"],
    url: "#",
  },
  {
    id: "4",
    title: "The Architecture Behind 10k TPS: Lessons from Building a Payment Gateway",
    excerpt: "System design patterns and optimizations that enabled our payment system to handle peak Black Friday traffic.",
    date: "2023-09-14",
    readTime: "10 min",
    tags: ["System Design", "Performance"],
    url: "#",
  },
];

const ArticlesSection = () => {
  return (
    <section id="articles" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary mb-2 block">// medium.feed()</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))]">
            Latest <span className="gradient-text">Dispatches</span>
          </h2>
        </div>

        {/* Ticker bar */}
        <div className="overflow-hidden mb-12 py-3 border-y border-border/30">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...articles, ...articles].map((article, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-8 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-muted-foreground">{article.title}</span>
                <span className="text-primary font-mono text-xs">{article.readTime}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              className="group glass-card-hover p-6 flex flex-col md:flex-row md:items-center gap-4 block"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-[hsl(var(--text-primary))] group-hover:text-primary transition-colors mb-1 truncate">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{article.excerpt}</p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex gap-2">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-muted/30 text-xs font-mono text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </div>
                <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
