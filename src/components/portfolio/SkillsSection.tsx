import { Loader2 } from "lucide-react";
import { useSkills } from "@/hooks/useSkills";
import type { Skill } from "@/lib/supabase";

const CATEGORY_ORDER = ["Languages", "Frameworks", "Tools", "Cloud"];

const SkillBadge = ({ skill }: { skill: Skill }) => (
  <span className="px-3 py-1.5 rounded-lg bg-muted/40 border border-border/30 text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default">
    {skill.name}
  </span>
);

const SkillsSection = () => {
  const { data: skills = [], isLoading } = useSkills();

  const grouped = CATEGORY_ORDER.reduce<Record<string, Skill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  // Any category not in CATEGORY_ORDER
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
        <div className="text-center mb-12">
          <span className="font-mono text-sm text-primary mb-2 block">// skills.reduce()</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))]">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {allCategories.map((category) => (
              <div key={category} className="glass-card p-6">
                <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
                  // {category.toLowerCase()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {grouped[category].map((skill) => (
                    <SkillBadge key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
