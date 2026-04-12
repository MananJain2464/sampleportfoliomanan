import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Briefcase, GraduationCap, FolderOpen, Award, Trophy,
  BookOpen, ArrowLeft, Plus, Trash2, Save, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const sections = [
  { key: "personal", label: "Personal Info", icon: User },
  { key: "career", label: "Career", icon: Briefcase },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "projects", label: "Projects", icon: FolderOpen },
  { key: "certificates", label: "Certificates", icon: Award },
  { key: "competitions", label: "Competitions", icon: Trophy },
  { key: "articles", label: "Articles", icon: BookOpen },
];

const Admin = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl flex flex-col">
        <div className="p-4 border-b border-border/50">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </button>
        </div>
        <div className="p-4">
          <h2 className="font-display text-lg font-bold text-[hsl(var(--text-primary))] mb-1">Admin Panel</h2>
          <p className="font-mono text-xs text-muted-foreground">manage.portfolio()</p>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-all duration-200 ${
                activeSection === s.key
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-[hsl(var(--text-primary))] hover:bg-muted/30"
              }`}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {activeSection === "personal" && <PersonalEditor />}
          {activeSection === "career" && <ListEditor title="Career" fields={["role", "company", "period", "description"]} />}
          {activeSection === "education" && <ListEditor title="Education" fields={["degree", "institution", "period", "description"]} />}
          {activeSection === "projects" && <ListEditor title="Projects" fields={["title", "description", "tags", "github", "live"]} hasVisibility />}
          {activeSection === "certificates" && <ListEditor title="Certificates" fields={["name", "issuer", "date", "credential"]} />}
          {activeSection === "competitions" && <ListEditor title="Competitions" fields={["name", "rank", "year", "organizer"]} />}
          {activeSection === "articles" && <ListEditor title="Articles" fields={["title", "excerpt", "url", "date"]} />}
        </div>
      </main>
    </div>
  );
};

const PersonalEditor = () => (
  <div>
    <h2 className="font-display text-2xl font-bold text-[hsl(var(--text-primary))] mb-6">Personal Information</h2>
    <div className="glass-card p-6 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-1.5">Full Name</label>
          <Input placeholder="John Doe" className="bg-muted/20 border-border/50" />
        </div>
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-1.5">Title</label>
          <Input placeholder="Full-Stack Developer & AI Engineer" className="bg-muted/20 border-border/50" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-1.5">Bio</label>
        <Textarea placeholder="A short bio about yourself..." rows={4} className="bg-muted/20 border-border/50" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-1.5">Email</label>
          <Input placeholder="you@email.com" className="bg-muted/20 border-border/50" />
        </div>
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-1.5">LinkedIn</label>
          <Input placeholder="linkedin.com/in/..." className="bg-muted/20 border-border/50" />
        </div>
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-1.5">X / Twitter</label>
          <Input placeholder="@handle" className="bg-muted/20 border-border/50" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  </div>
);

interface ListEditorProps {
  title: string;
  fields: string[];
  hasVisibility?: boolean;
}

const ListEditor = ({ title, fields, hasVisibility }: ListEditorProps) => {
  const [items, setItems] = useState([{ id: "1" }]);

  const addItem = () => setItems([...items, { id: Date.now().toString() }]);
  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-[hsl(var(--text-primary))]">{title}</h2>
        <Button onClick={addItem} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-mono text-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-muted-foreground">#{idx + 1}</span>
              <div className="flex items-center gap-3">
                {hasVisibility && (
                  <div className="flex items-center gap-2">
                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    <Switch />
                  </div>
                )}
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fields.map((field) => (
                <div key={field} className={field === "description" || field === "excerpt" ? "md:col-span-2" : ""}>
                  <label className="block text-xs font-mono text-muted-foreground mb-1 capitalize">{field}</label>
                  {field === "description" || field === "excerpt" ? (
                    <Textarea placeholder={`Enter ${field}...`} rows={3} className="bg-muted/20 border-border/50 text-sm" />
                  ) : (
                    <Input placeholder={`Enter ${field}...`} className="bg-muted/20 border-border/50 text-sm" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
          <Save className="h-4 w-4 mr-2" />
          Save All
        </Button>
      </div>
    </div>
  );
};

export default Admin;
