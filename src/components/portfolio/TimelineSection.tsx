import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, ExternalLink, Loader2 } from "lucide-react";
import { useTimeline } from "@/hooks/useTimeline";
import type { TimelineEntry } from "@/lib/supabase";

const TimelineCard = ({
  item,
  isLeft,
  isVisible,
}: {
  item: TimelineEntry;
  isLeft: boolean;
  isVisible: boolean;
}) => (
  <div
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
      <div
        className={`w-4 h-4 rounded-full border-2 ${
          item.type === "experience"
            ? "border-primary bg-primary/20"
            : "border-secondary bg-secondary/20"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full mx-auto mt-0.5 ${
            item.type === "experience" ? "bg-primary" : "bg-secondary"
          }`}
        />
      </div>
    </div>

    {/* Content card */}
    <div className={`ml-16 md:ml-0 md:w-[45%] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
      <div className="glass-card-hover p-6 group">
        <div className="flex items-center gap-2 mb-3">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.organization}
              className="h-5 w-5 object-contain rounded"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : item.type === "experience" ? (
            <Briefcase className="h-4 w-4 text-primary" />
          ) : (
            <GraduationCap className="h-4 w-4 text-secondary" />
          )}
          <span className="font-mono text-xs text-muted-foreground">{item.duration}</span>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        <h3 className="font-display text-lg font-semibold text-[hsl(var(--text-primary))] mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{item.organization}</p>
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

const TimelineSection = () => {
  const { data: entries = [], isLoading } = useTimeline();
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observations) => {
        observations.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <section id="career" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Experience & Education</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))]">
            Track <span className="gradient-text">Record</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border">
              <div
                className="w-full bg-gradient-to-b from-primary via-secondary to-primary animate-draw-line"
                style={{ height: "100%" }}
              />
            </div>

            {entries.map((item, index) => {
              const elemId = `timeline-${item.id}`;
              return (
                <div
                  key={item.id}
                  id={elemId}
                  ref={(el) => { if (el) itemRefs.current.set(elemId, el); }}
                >
                  <TimelineCard
                    item={item}
                    isLeft={index % 2 === 0}
                    isVisible={visibleItems.has(elemId)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TimelineSection;
