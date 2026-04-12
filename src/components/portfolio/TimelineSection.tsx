import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags: string[];
  type: "career" | "education";
  metrics?: string;
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    title: "Senior Full-Stack Developer",
    subtitle: "Tech Corp International",
    period: "2023 — Present",
    description: "Leading development of AI-powered financial analytics platform. Architecting microservices and real-time data pipelines.",
    tags: ["React", "Python", "AWS", "TensorFlow"],
    type: "career",
    metrics: "+40% system performance",
  },
  {
    id: "2",
    title: "M.S. Computer Science",
    subtitle: "Stanford University",
    period: "2021 — 2023",
    description: "Specialized in Machine Learning and Distributed Systems. Published 3 research papers on NLP applications in fintech.",
    tags: ["ML", "NLP", "Research", "Python"],
    type: "education",
    metrics: "GPA: 3.9/4.0",
  },
  {
    id: "3",
    title: "Software Engineer",
    subtitle: "FinTech Startup",
    period: "2020 — 2021",
    description: "Built algorithmic trading platform processing 10k+ transactions/sec. Implemented real-time risk assessment models.",
    tags: ["Node.js", "Go", "PostgreSQL", "Redis"],
    type: "career",
    metrics: "10k+ TPS",
  },
  {
    id: "4",
    title: "B.S. Computer Engineering",
    subtitle: "MIT",
    period: "2016 — 2020",
    description: "Core focus on Systems Programming, Data Structures, and Algorithms. Dean's list all semesters.",
    tags: ["C++", "Java", "Algorithms", "Systems"],
    type: "education",
    metrics: "Dean's List",
  },
];

const TimelineSection = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="career" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary mb-2 block">// career && education</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))]">
            Growth <span className="gradient-text">Trajectory</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <div className="w-full bg-gradient-to-b from-primary via-secondary to-primary animate-draw-line" style={{ height: "100%" }} />
          </div>

          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = visibleItems.has(`timeline-${item.id}`);

            return (
              <div
                key={item.id}
                id={`timeline-${item.id}`}
                ref={(el) => { if (el) itemRefs.current.set(`timeline-${item.id}`, el); }}
                className={`relative flex items-start mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.6s ease-out",
                }}
              >
                {/* Node dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    item.type === "career" ? "border-primary bg-primary/20" : "border-secondary bg-secondary/20"
                  }`}>
                    <div className={`w-2 h-2 rounded-full mx-auto mt-0.5 ${
                      item.type === "career" ? "bg-primary" : "bg-secondary"
                    }`} />
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[45%] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="glass-card-hover p-6 group">
                    <div className="flex items-center gap-2 mb-3">
                      {item.type === "career" ? (
                        <Briefcase className="h-4 w-4 text-primary" />
                      ) : (
                        <GraduationCap className="h-4 w-4 text-secondary" />
                      )}
                      <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
                      {item.metrics && (
                        <span className="ml-auto font-mono text-xs text-primary">{item.metrics}</span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[hsl(var(--text-primary))] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.subtitle}</p>
                    <p className="text-sm text-foreground/80 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-muted/50 text-xs font-mono text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
