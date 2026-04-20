import { useState } from "react";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/lib/supabase";

const CATEGORIES = ["All", "ML/MLOps", "Generative AI", "Web Dev"] as const;

const ProjectCard = ({ project }: { project: Project }) => (
  <div
    className={`glass-card-hover p-6 flex flex-col group ${
      project.sort_order === 1 ? "md:col-span-2 lg:col-span-2" : ""
    }`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
          {project.image_url ? (
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <span className="font-mono text-sm text-primary">{"{ }"}</span>
          )}
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-border/30 text-muted-foreground">
          {project.category}
        </span>
      </div>
      <div className="flex gap-2">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>

    <h3 className="font-display text-xl font-semibold text-[hsl(var(--text-primary))] mb-2 group-hover:text-primary transition-colors">
      {project.title}
    </h3>
    <p className="text-sm text-muted-foreground mb-2 flex-1">{project.description}</p>

    {project.role && (
      <p className="font-mono text-xs text-primary/70 mb-4">Role: {project.role}</p>
    )}

    <div className="flex flex-wrap gap-2">
      {project.tools.map((tool) => (
        <span
          key={tool}
          className="px-2 py-1 rounded-md bg-primary/5 border border-primary/10 text-xs font-mono text-primary/70 group-hover:border-primary/30 transition-colors"
        >
          {tool}
        </span>
      ))}
    </div>
  </div>
);

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { data: projects = [], isLoading } = useProjects(true);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Selected Work</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))]">
            Built in <span className="gradient-text">Production</span>
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-muted/30 text-muted-foreground border border-transparent hover:border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
