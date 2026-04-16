import { useState } from "react";
import { Mail, Linkedin, Twitter, Github, Copy, Check, Code2 } from "lucide-react";
import { usePersonal } from "@/hooks/usePersonal";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const { data: personal } = usePersonal();

  const email = personal?.email ?? "er.mananjain26@gmail.com";
  const linkedin = personal?.linkedin ?? "https://www.linkedin.com/in/manan-jain-6770751b6";
  const twitter = personal?.twitter ?? "https://x.com/manan_jain26";
  const github = personal?.github ?? "https://github.com/MananJain2464";
  const leetcode = personal?.leetcode ?? "https://leetcode.com/u/manan_jain_iiitn/";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    { icon: Mail, label: "Gmail", href: `mailto:${email}`, color: "hover:text-primary" },
    { icon: Linkedin, label: "LinkedIn", href: linkedin, color: "hover:text-[#0A66C2]" },
    { icon: Twitter, label: "X / Twitter", href: twitter, color: "hover:text-foreground" },
    { icon: Github, label: "GitHub", href: github, color: "hover:text-foreground" },
    { icon: Code2, label: "LeetCode", href: leetcode, color: "hover:text-[#FFA116]" },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-3xl mx-auto text-center">
        <span className="font-mono text-sm text-primary mb-2 block">// execute.connect()</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))] mb-4">
          Let's <span className="gradient-text">Execute</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-md mx-auto">
          Ready to build something extraordinary? Let's compile a plan together.
        </p>

        {/* Terminal-style card */}
        <div className="glass-card max-w-xl mx-auto mb-12 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/20">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-[hsl(40,100%,50%)]/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">terminal — contact</span>
          </div>
          <div className="p-6 text-left">
            <div className="font-mono text-sm space-y-2">
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> echo $EMAIL
              </p>
              <p className="text-foreground flex items-center gap-2">
                {email}
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                >
                  {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                  {copied ? "copied!" : "copy"}
                </button>
              </p>
              {copied && (
                <p className="text-primary text-xs animate-fade-up">
                  ✓ Success: Email copied to clipboard
                </p>
              )}
              <p className="text-muted-foreground mt-4">
                <span className="text-primary">$</span> status --availability
              </p>
              <p className="text-primary">
                ● Open to opportunities & collaborations
              </p>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {links.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center gap-2 text-muted-foreground ${color} transition-all duration-300`}
            >
              <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)] transition-all duration-300">
                <Icon className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border/30 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">©</span> {new Date().getFullYear()} {personal?.name ?? "Manan Jain"} — Designed & Built with precision.
          <span className="mx-2 text-border">|</span>
          <span className="text-muted-foreground/50">v2.0.0</span>
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
