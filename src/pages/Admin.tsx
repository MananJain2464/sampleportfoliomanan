import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Briefcase, GraduationCap, FolderOpen, Award, Trophy,
  ArrowLeft, Plus, Trash2, Save, Eye, EyeOff, Loader2, LogOut, Code2, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import PasswordGate from "@/components/PasswordGate";
import { clearSession } from "@/lib/auth";

// Hooks
import { usePersonal, useUpdatePersonal } from "@/hooks/usePersonal";
import {
  useProjects, useAddProject, useUpdateProject, useDeleteProject,
} from "@/hooks/useProjects";
import {
  useTimeline, useAddTimelineEntry, useUpdateTimelineEntry, useDeleteTimelineEntry,
} from "@/hooks/useTimeline";
import {
  useCredentials, useAddCredential, useUpdateCredential, useDeleteCredential,
} from "@/hooks/useCredentials";
import {
  useSkills, useAddSkill, useUpdateSkill, useDeleteSkill,
} from "@/hooks/useSkills";
import {
  useArticles, useAddArticle, useUpdateArticle, useDeleteArticle, type Article,
} from "@/hooks/useArticles";

import type { Project, TimelineEntry, Credential, Skill } from "@/lib/supabase";

const sections = [
  { key: "personal", label: "Personal Info", icon: User },
  { key: "career", label: "Career", icon: Briefcase },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "projects", label: "Projects", icon: FolderOpen },
  { key: "certificates", label: "Certificates", icon: Award },
  { key: "competitions", label: "Competitions", icon: Trophy },
  { key: "skills", label: "Skills", icon: Code2 },
  { key: "articles", label: "Articles", icon: BookOpen },
];

// ── Admin Shell ─────────────────────────────────────────────────────────────

const AdminContent = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("personal");

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl flex flex-col">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </button>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
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
          {activeSection === "career" && <TimelineEditor type="experience" label="Career" />}
          {activeSection === "education" && <TimelineEditor type="education" label="Education" />}
          {activeSection === "projects" && <ProjectsEditor />}
          {activeSection === "certificates" && <CredentialsEditor type="certificate" label="Certificates" />}
          {activeSection === "competitions" && <CredentialsEditor type="competition" label="Competitions" />}
          {activeSection === "skills" && <SkillsEditor />}
          {activeSection === "articles" && <ArticlesEditor />}
        </div>
      </main>
    </div>
  );
};

// ── Personal Editor ──────────────────────────────────────────────────────────

const PersonalEditor = () => {
  const { data: personal, isLoading } = usePersonal();
  const updatePersonal = useUpdatePersonal();

  const [form, setForm] = useState({
    name: "", designation: "", bio: "", email: "", phone: "",
    address: "", github: "", linkedin: "", twitter: "", leetcode: "",
    instagram: "", resume_url: "",
  });

  useEffect(() => {
    if (personal) setForm({ ...form, ...personal });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personal]);

  const handleSave = async () => {
    try {
      await updatePersonal.mutateAsync(form);
      toast.success("Personal info saved!");
    } catch {
      toast.error("Failed to save. Check your Supabase connection.");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>;

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[hsl(var(--text-primary))] mb-6">Personal Information</h2>
      <div className="glass-card p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Designation" value={form.designation} onChange={(v) => setForm({ ...form, designation: v })} />
        </div>
        <Field label="Bio" value={form.bio} onChange={(v) => setForm({ ...form, bio: v })} multiline />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
          <Field label="Resume URL" value={form.resume_url} onChange={(v) => setForm({ ...form, resume_url: v })} />
          <Field label="GitHub" value={form.github} onChange={(v) => setForm({ ...form, github: v })} />
          <Field label="LinkedIn" value={form.linkedin} onChange={(v) => setForm({ ...form, linkedin: v })} />
          <Field label="Twitter / X" value={form.twitter} onChange={(v) => setForm({ ...form, twitter: v })} />
          <Field label="LeetCode" value={form.leetcode} onChange={(v) => setForm({ ...form, leetcode: v })} />
          <Field label="Instagram" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} />
        </div>
        <div className="flex justify-end">
          <SaveButton onClick={handleSave} loading={updatePersonal.isPending} />
        </div>
      </div>
    </div>
  );
};

// ── Timeline Editor ──────────────────────────────────────────────────────────

const TimelineEditor = ({ type, label }: { type: "experience" | "education"; label: string }) => {
  const { data: entries = [], isLoading } = useTimeline(type);
  const addEntry = useAddTimelineEntry();
  const updateEntry = useUpdateTimelineEntry();
  const deleteEntry = useDeleteTimelineEntry();

  const [drafts, setDrafts] = useState<Record<string, Partial<TimelineEntry>>>({});

  const getDraft = (entry: TimelineEntry): TimelineEntry => ({
    ...entry,
    ...(drafts[entry.id] ?? {}),
  });

  const patch = (id: string, key: keyof TimelineEntry, value: unknown) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  };

  const handleSave = async (entry: TimelineEntry) => {
    try {
      const updated = getDraft(entry);
      await updateEntry.mutateAsync({ id: entry.id, ...updated });
      setDrafts((prev) => { const n = { ...prev }; delete n[entry.id]; return n; });
      toast.success("Entry saved!");
    } catch {
      toast.error("Failed to save entry.");
    }
  };

  const handleAdd = async () => {
    try {
      await addEntry.mutateAsync({
        type, title: "New Entry", organization: "", duration: "",
        description: "", tags: [], link: null, sort_order: entries.length + 1,
      });
      toast.success("Entry added!");
    } catch {
      toast.error("Failed to add entry.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry.mutateAsync(id);
      toast.success("Entry deleted.");
    } catch {
      toast.error("Failed to delete entry.");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-[hsl(var(--text-primary))]">{label}</h2>
        <Button onClick={handleAdd} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-mono text-sm">
          <Plus className="h-4 w-4 mr-2" /> Add Entry
        </Button>
      </div>
      <div className="space-y-4">
        {entries.map((entry, idx) => {
          const d = getDraft(entry);
          return (
            <div key={entry.id} className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground">#{idx + 1}</span>
                <button onClick={() => handleDelete(entry.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Title" value={d.title ?? ""} onChange={(v) => patch(entry.id, "title", v)} />
                <Field label="Organization" value={d.organization ?? ""} onChange={(v) => patch(entry.id, "organization", v)} />
                <Field label="Duration" value={d.duration ?? ""} onChange={(v) => patch(entry.id, "duration", v)} />
                <Field label="Link" value={d.link ?? ""} onChange={(v) => patch(entry.id, "link", v)} />
                <div className="md:col-span-2">
                  <Field label="Logo / Image URL" value={d.image_url ?? ""} onChange={(v) => patch(entry.id, "image_url", v || null)} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Description" value={d.description ?? ""} onChange={(v) => patch(entry.id, "description", v)} multiline />
                </div>
                <div className="md:col-span-2">
                  <Field
                    label="Tags (comma-separated)"
                    value={(d.tags ?? []).join(", ")}
                    onChange={(v) => patch(entry.id, "tags", v.split(",").map((t) => t.trim()).filter(Boolean))}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <SaveButton onClick={() => handleSave(entry)} loading={updateEntry.isPending} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Projects Editor ──────────────────────────────────────────────────────────

const ProjectsEditor = () => {
  const { data: projects = [], isLoading } = useProjects(false);
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [drafts, setDrafts] = useState<Record<string, Partial<Project>>>({});

  const getDraft = (p: Project): Project => ({ ...p, ...(drafts[p.id] ?? {}) });

  const patch = (id: string, key: keyof Project, value: unknown) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  };

  const handleSave = async (p: Project) => {
    try {
      const updated = getDraft(p);
      await updateProject.mutateAsync({ id: p.id, ...updated });
      setDrafts((prev) => { const n = { ...prev }; delete n[p.id]; return n; });
      toast.success("Project saved!");
    } catch {
      toast.error("Failed to save project.");
    }
  };

  const handleAdd = async () => {
    try {
      await addProject.mutateAsync({
        title: "New Project", description: "", tools: [], role: "",
        github_url: null, demo_url: null, category: "Web Dev",
        visible: true, sort_order: projects.length + 1,
      });
      toast.success("Project added!");
    } catch {
      toast.error("Failed to add project.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject.mutateAsync(id);
      toast.success("Project deleted.");
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-[hsl(var(--text-primary))]">Projects</h2>
        <Button onClick={handleAdd} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-mono text-sm">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>
      <div className="space-y-4">
        {projects.map((p, idx) => {
          const d = getDraft(p);
          return (
            <div key={p.id} className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground">#{idx + 1}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {d.visible ? <Eye className="h-3.5 w-3.5 text-muted-foreground" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
                    <Switch
                      checked={d.visible ?? true}
                      onCheckedChange={(v) => patch(p.id, "visible", v)}
                    />
                  </div>
                  <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Title" value={d.title ?? ""} onChange={(v) => patch(p.id, "title", v)} />
                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1">Category</label>
                  <select
                    value={d.category ?? "Web Dev"}
                    onChange={(e) => patch(p.id, "category", e.target.value)}
                    className="w-full h-9 rounded-md border border-border/50 bg-muted/20 px-3 text-sm font-mono text-foreground"
                  >
                    <option>ML/MLOps</option>
                    <option>Generative AI</option>
                    <option>Web Dev</option>
                  </select>
                </div>
                <Field label="Role" value={d.role ?? ""} onChange={(v) => patch(p.id, "role", v)} />
                <Field label="GitHub URL" value={d.github_url ?? ""} onChange={(v) => patch(p.id, "github_url", v || null)} />
                <Field label="Demo URL" value={d.demo_url ?? ""} onChange={(v) => patch(p.id, "demo_url", v || null)} />
                <Field label="Image URL" value={d.image_url ?? ""} onChange={(v) => patch(p.id, "image_url", v || null)} />
                <Field
                  label="Tools (comma-separated)"
                  value={(d.tools ?? []).join(", ")}
                  onChange={(v) => patch(p.id, "tools", v.split(",").map((t) => t.trim()).filter(Boolean))}
                />
                <div className="md:col-span-2">
                  <Field label="Description" value={d.description ?? ""} onChange={(v) => patch(p.id, "description", v)} multiline />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <SaveButton onClick={() => handleSave(p)} loading={updateProject.isPending} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Credentials Editor ───────────────────────────────────────────────────────

const CredentialsEditor = ({ type, label }: { type: "certificate" | "competition"; label: string }) => {
  const { data: items = [], isLoading } = useCredentials(type);
  const addCred = useAddCredential();
  const updateCred = useUpdateCredential();
  const deleteCred = useDeleteCredential();

  const [drafts, setDrafts] = useState<Record<string, Partial<Credential>>>({});
  const getDraft = (c: Credential): Credential => ({ ...c, ...(drafts[c.id] ?? {}) });
  const patch = (id: string, key: keyof Credential, value: unknown) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  };

  const handleSave = async (c: Credential) => {
    try {
      await updateCred.mutateAsync({ id: c.id, ...getDraft(c) });
      setDrafts((prev) => { const n = { ...prev }; delete n[c.id]; return n; });
      toast.success("Saved!");
    } catch {
      toast.error("Failed to save.");
    }
  };

  const handleAdd = async () => {
    try {
      await addCred.mutateAsync({ type, name: "New Entry", issuer: "", date: "", category: "", link: null, result: null });
      toast.success("Entry added!");
    } catch {
      toast.error("Failed to add.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCred.mutateAsync(id);
      toast.success("Deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-[hsl(var(--text-primary))]">{label}</h2>
        <Button onClick={handleAdd} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-mono text-sm">
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
      <div className="space-y-4">
        {items.map((c, idx) => {
          const d = getDraft(c);
          return (
            <div key={c.id} className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground">#{idx + 1}</span>
                <button onClick={() => handleDelete(c.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Name" value={d.name ?? ""} onChange={(v) => patch(c.id, "name", v)} />
                <Field label="Issuer / Organizer" value={d.issuer ?? ""} onChange={(v) => patch(c.id, "issuer", v)} />
                <Field label="Date" value={d.date ?? ""} onChange={(v) => patch(c.id, "date", v)} />
                <Field label="Category" value={d.category ?? ""} onChange={(v) => patch(c.id, "category", v)} />
                <Field label="Link" value={d.link ?? ""} onChange={(v) => patch(c.id, "link", v || null)} />
                {type === "competition" && (
                  <Field label="Result (e.g. Runner-Up)" value={d.result ?? ""} onChange={(v) => patch(c.id, "result", v || null)} />
                )}
              </div>
              <div className="flex justify-end mt-3">
                <SaveButton onClick={() => handleSave(c)} loading={updateCred.isPending} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Skills Editor ────────────────────────────────────────────────────────────

const SkillsEditor = () => {
  const { data: skills = [], isLoading } = useSkills();
  const addSkill = useAddSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [newSkill, setNewSkill] = useState({ name: "", category: "Languages", icon_url: "" });
  const [editingIconId, setEditingIconId] = useState<string | null>(null);
  const [iconUrlDraft, setIconUrlDraft] = useState("");

  const handleAdd = async () => {
    if (!newSkill.name.trim()) return;
    try {
      await addSkill.mutateAsync({
        name: newSkill.name,
        category: newSkill.category,
        icon_url: newSkill.icon_url || null,
        sort_order: skills.length + 1,
      });
      setNewSkill({ name: "", category: "Languages", icon_url: "" });
      toast.success("Skill added!");
    } catch {
      toast.error("Failed to add skill.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSkill.mutateAsync(id);
      toast.success("Skill deleted.");
    } catch {
      toast.error("Failed to delete skill.");
    }
  };

  const handleSaveIcon = async (id: string) => {
    try {
      await updateSkill.mutateAsync({ id, icon_url: iconUrlDraft || null });
      setEditingIconId(null);
      toast.success("Icon URL saved!");
    } catch {
      toast.error("Failed to save icon.");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>;

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    acc[s.category] = acc[s.category] ?? [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[hsl(var(--text-primary))] mb-6">Skills</h2>

      {/* Add new skill */}
      <div className="glass-card p-5 mb-6">
        <p className="font-mono text-xs text-primary mb-3">// add new skill</p>
        <div className="flex gap-3 mb-3">
          <Input
            placeholder="Skill name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="bg-muted/20 border-border/50 text-sm font-mono"
          />
          <select
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            className="rounded-md border border-border/50 bg-muted/20 px-3 text-sm font-mono text-foreground"
          >
            <option>Languages</option>
            <option>Frameworks</option>
            <option>Tools</option>
            <option>Cloud</option>
          </select>
          <Button onClick={handleAdd} disabled={addSkill.isPending} className="bg-primary text-primary-foreground font-mono">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Input
          placeholder="Icon URL (optional)"
          value={newSkill.icon_url}
          onChange={(e) => setNewSkill({ ...newSkill, icon_url: e.target.value })}
          className="bg-muted/20 border-border/50 text-sm font-mono"
        />
      </div>

      {/* Grouped skills */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, catSkills]) => (
          <div key={category} className="glass-card p-5">
            <p className="font-mono text-xs text-primary mb-3">// {category.toLowerCase()}</p>
            <div className="flex flex-wrap gap-2">
              {catSkills.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/30">
                    {s.icon_url && <img src={s.icon_url} alt={s.name} className="h-4 w-4 object-contain" />}
                    <span className="text-sm font-mono text-muted-foreground">{s.name}</span>
                    <button
                      onClick={() => { setEditingIconId(s.id); setIconUrlDraft(s.icon_url ?? ""); }}
                      className="text-muted-foreground/40 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 ml-1"
                      title="Edit icon URL"
                    >
                      <Save className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-muted-foreground/40 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  {editingIconId === s.id && (
                    <div className="flex gap-1 mt-1 w-full min-w-[200px]">
                      <Input
                        placeholder="Icon URL"
                        value={iconUrlDraft}
                        onChange={(e) => setIconUrlDraft(e.target.value)}
                        className="bg-muted/20 border-border/50 text-xs font-mono h-7"
                        autoFocus
                      />
                      <Button
                        onClick={() => handleSaveIcon(s.id)}
                        disabled={updateSkill.isPending}
                        className="h-7 px-2 bg-primary text-primary-foreground font-mono text-xs"
                      >
                        OK
                      </Button>
                      <Button
                        onClick={() => setEditingIconId(null)}
                        variant="outline"
                        className="h-7 px-2 font-mono text-xs"
                      >
                        ✕
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Articles Editor ──────────────────────────────────────────────────────────

const ArticlesEditor = () => {
  const { data: articles = [], isLoading } = useArticles();
  const addArticle = useAddArticle();
  const updateArticle = useUpdateArticle();
  const deleteArticle = useDeleteArticle();

  const [drafts, setDrafts] = useState<Record<string, Partial<Article>>>({});

  const getDraft = (a: Article): Article => ({ ...a, ...(drafts[a.id] ?? {}) });

  const patch = (id: string, key: keyof Article, value: unknown) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  };

  const handleSave = async (a: Article) => {
    try {
      await updateArticle.mutateAsync({ id: a.id, ...getDraft(a) });
      setDrafts((prev) => { const n = { ...prev }; delete n[a.id]; return n; });
      toast.success("Article saved!");
    } catch {
      toast.error("Failed to save article.");
    }
  };

  const handleAdd = async () => {
    try {
      await addArticle.mutateAsync({
        title: "New Article", url: "", excerpt: null, cover_image: null,
        published_at: null, read_time: null, tags: [], sort_order: articles.length + 1,
      });
      toast.success("Article added!");
    } catch {
      toast.error("Failed to add article.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteArticle.mutateAsync(id);
      toast.success("Article deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-[hsl(var(--text-primary))]">Articles</h2>
        <Button onClick={handleAdd} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-mono text-sm">
          <Plus className="h-4 w-4 mr-2" /> Add Article
        </Button>
      </div>
      <div className="space-y-4">
        {articles.map((a, idx) => {
          const d = getDraft(a);
          return (
            <div key={a.id} className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground">#{idx + 1}</span>
                <button onClick={() => handleDelete(a.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <Field label="Title" value={d.title ?? ""} onChange={(v) => patch(a.id, "title", v)} />
                </div>
                <Field label="URL" value={d.url ?? ""} onChange={(v) => patch(a.id, "url", v)} />
                <Field label="Cover Image URL" value={d.cover_image ?? ""} onChange={(v) => patch(a.id, "cover_image", v || null)} />
                <Field label="Published At" value={d.published_at ?? ""} onChange={(v) => patch(a.id, "published_at", v || null)} />
                <Field label="Read Time (e.g. 12 min read)" value={d.read_time ?? ""} onChange={(v) => patch(a.id, "read_time", v || null)} />
                <div className="md:col-span-2">
                  <Field
                    label="Tags (comma-separated)"
                    value={(d.tags ?? []).join(", ")}
                    onChange={(v) => patch(a.id, "tags", v.split(",").map((t) => t.trim()).filter(Boolean))}
                  />
                </div>
                <div className="md:col-span-2">
                  <Field label="Excerpt" value={d.excerpt ?? ""} onChange={(v) => patch(a.id, "excerpt", v || null)} multiline />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <SaveButton onClick={() => handleSave(a)} loading={updateArticle.isPending} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Shared UI ────────────────────────────────────────────────────────────────

const Field = ({
  label, value, onChange, multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) => (
  <div>
    <label className="block text-xs font-mono text-muted-foreground mb-1">{label}</label>
    {multiline ? (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="bg-muted/20 border-border/50 text-sm"
      />
    ) : (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-muted/20 border-border/50 text-sm"
      />
    )}
  </div>
);

const SaveButton = ({ onClick, loading }: { onClick: () => void; loading: boolean }) => (
  <Button onClick={onClick} disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" />Save</>}
  </Button>
);

// ── Export (wrapped in PasswordGate) ────────────────────────────────────────

const Admin = () => (
  <PasswordGate>
    <AdminContent />
  </PasswordGate>
);

export default Admin;
