import { useEffect, useRef } from "react";
import { ArrowDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 230, 118, 0.4)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 230, 118, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 max-w-5xl px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Profile image */}
        <div className="flex-shrink-0 relative group">
          <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden glass-card border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.15)] group-hover:shadow-[0_0_60px_-10px_hsl(var(--primary)/0.3)]">
            {/* Replace src with your image */}
            <div className="w-full h-full bg-muted/30 flex items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground text-center px-4">your-photo.jpg</span>
            </div>
          </div>
          {/* Glow ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-sm -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Text content */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-sm text-muted-foreground">system.status: <span className="text-primary">online</span></span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-[hsl(var(--text-primary))]">Building the</span>
            <br />
            <span className="gradient-text">Future Stack</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4 font-light">
            Full-Stack Developer & AI Engineer crafting intelligent systems 
            at the intersection of technology and innovation.
          </p>

          <p className="font-mono text-sm text-muted-foreground mb-10">
            <span className="text-primary">const</span> expertise = [<span className="text-secondary">"AI/ML"</span>, <span className="text-secondary">"Finance"</span>, <span className="text-secondary">"Full-Stack"</span>];
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.6)] font-display font-semibold"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Portfolio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:border-primary/50 hover:bg-primary/5 font-display transition-all duration-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              Compile Resume
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("career")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  );
};

export default HeroSection;
