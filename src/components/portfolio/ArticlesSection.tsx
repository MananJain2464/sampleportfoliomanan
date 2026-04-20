import { ExternalLink, Clock, Calendar, Loader2, BookOpen } from "lucide-react";
import { useArticles, type Article } from "@/hooks/useArticles";

const GRADIENT_FALLBACKS = [
  "from-primary/20 to-secondary/10",
  "from-secondary/20 to-primary/10",
  "from-primary/15 via-secondary/10 to-primary/5",
  "from-secondary/15 via-primary/10 to-secondary/5",
  "from-primary/20 via-transparent to-secondary/15",
  "from-secondary/20 via-transparent to-primary/15",
];

const ArticleCard = ({ article, index }: { article: Article; index: number }) => {
  const gradient = GRADIENT_FALLBACKS[index % GRADIENT_FALLBACKS.length];

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col glass-card overflow-hidden hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.2)] transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative w-full h-44 overflow-hidden">
        {article.cover_image ? (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <BookOpen className="h-10 w-10 text-primary/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-all duration-300 flex items-center justify-center">
          <ExternalLink className="h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary/10 text-primary/80 border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-display text-base font-semibold text-[hsl(var(--text-primary))] mb-3 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 pt-3 border-t border-border/30 mt-auto">
          {article.published_at && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {article.published_at}
            </span>
          )}
          {article.read_time && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {article.read_time}
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

const ArticlesSection = () => {
  const { data: articles = [], isLoading } = useArticles();

  return (
    <section id="articles" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Published Research</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))]">
            Quant <span className="gradient-text">Writing</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm">
            Deep-dives on quantitative finance, portfolio theory, and algorithmic trading.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="https://medium.com/@er.mananjain26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/50 text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
              >
                View all on Medium
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
