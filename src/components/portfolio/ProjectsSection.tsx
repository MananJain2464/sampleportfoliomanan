import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Neural Trading Engine",
    description: "Deep learning-powered algorithmic trading system with real-time market analysis, risk management, and automated execution across multiple asset classes.",
    tags: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    featured: true,
    github: "#",
    live: "#",
  },
  {
    id: "2",
    title: "AI Code Reviewer",
    description: "GPT-powered code review assistant that analyzes pull requests for bugs, performance issues, and style violations.",
    tags: ["TypeScript", "OpenAI", "React", "Node.js"],
    github: "#",
    live: "#",
  },
  {
    id: "3",
    title: "DeFi Portfolio Tracker",
    description: "Real-time cryptocurrency portfolio management with yield farming analytics and impermanent loss calculations.",
    tags: ["React", "Web3.js", "Solidity", "TheGraph"],
    github: "#",
  },
  {
    id: "4",
    title: "Distributed Task Scheduler",
    description: "Fault-tolerant distributed task scheduling system handling 100k+ concurrent jobs with priority queues and retry mechanisms.",
    tags: ["Go", "Redis", "gRPC", "Kubernetes"],
    github: "#",
    live: "#",
  },
  {
    id: "5",
    title: "NLP Sentiment Analyzer",
    description: "Financial news sentiment analysis pipeline processing 50k+ articles daily with custom BERT fine-tuning.",
    tags: ["Python", "BERT", "Kafka", "ElasticSearch"],
    github: "#",
  },
  {
    id: "6",
    title: "Real-Time Analytics Dashboard",
    description: "WebSocket-powered analytics dashboard with customizable widgets, drill-down capabilities, and data export.",
    tags: ["React", "D3.js", "WebSocket", "ClickHouse"],
    live: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary mb-2 block">// projects.map()</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))]">
            Portfolio <span className="gradient-text">Matrix</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`glass-card-hover p-6 flex flex-col group ${
                project.featured ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Project image */}
              <div className="w-full h-40 rounded-lg bg-muted/20 border border-border/30 mb-4 overflow-hidden flex items-center justify-center">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-mono text-xs text-muted-foreground">project-thumbnail.png</span>
                )}
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <span className="font-mono text-sm text-primary">{"{ }"}</span>
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-[hsl(var(--text-primary))] mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-primary/5 border border-primary/10 text-xs font-mono text-primary/70 group-hover:border-primary/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
