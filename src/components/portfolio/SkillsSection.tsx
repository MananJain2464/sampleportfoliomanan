import { Loader2 } from "lucide-react";
import { useSkills } from "@/hooks/useSkills";
import { useInView } from "@/hooks/useInView";
import type { Skill } from "@/lib/supabase";

const CATEGORY_ORDER = ["Languages", "AI & ML", "Data", "Backend", "MLOps & Cloud", "Frameworks", "Tools", "Cloud"];

const SkillChip = ({ skill }: { skill: Skill }) => (
  <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.2)] transition-all duration-300 group cursor-default w-[76px]">
    <div className="h-10 w-10 flex items-center justify-center">
      {skill.icon_url ? (
        <img
          src={skill.icon_url}
          alt={skill.name}
          className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
          <span className="font-mono text-sm font-bold text-primary">{skill.name[0]}</span>
        </div>
      )}
    </div>
    <span className="text-[10px] font-mono text-muted-foreground text-center leading-tight group-hover:text-primary/80 transition-colors duration-200 w-full truncate">
      {skill.name}
    </span>
  </div>
);

const CategoryPanel = ({
  category,
  skills,
  delay,
  wide = false,
}: {
  category: string;
  skills: Skill[];
  delay: number;
  wide?: boolean;
}) => {
  const { ref, isInView } = useInView();
  return (
    <div
      ref={ref}
      className={`glass-card p-5 ${wide ? "md:col-span-2" : ""}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease-out ${delay}ms, transform 0.55s ease-out ${delay}ms`,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold whitespace-nowrap">
          // {category.toLowerCase()}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        <span className="font-mono text-[10px] text-muted-foreground/50">{skills.length}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillChip key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const { data: skills = [], isLoading } = useSkills();
  const { ref: headingRef, isInView: headingInView } = useInView();

  const grouped = CATEGORY_ORDER.reduce<Record<string, Skill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  const otherCategories = [...new Set(skills.map((s) => s.category))].filter(
    (c) => !CATEGORY_ORDER.includes(c)
  );
  otherCategories.forEach((cat) => {
    grouped[cat] = skills.filter((s) => s.category === cat);
  });

  const allCategories = [...CATEGORY_ORDER, ...otherCategories].filter(
    (cat) => grouped[cat]?.length > 0
  );

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div
          ref={headingRef}
          className="text-center mb-12"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Technical Skills</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))]">
            The <span className="gradient-text">Stack</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allCategories.map((category, i) => {
              const catSkills = grouped[category];
              const wide = catSkills.length >= 6;
              return (
                <CategoryPanel
                  key={category}
                  category={category}
                  skills={catSkills}
                  delay={i * 80}
                  wide={wide}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
