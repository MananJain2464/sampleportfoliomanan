import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Plus, Search, Image, FileText, Link2, Video,
  Tag, StickyNote, Trash2, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import PasswordGate from "@/components/PasswordGate";
import { useNotes, useAddNote, useDeleteNote } from "@/hooks/useNotes";
import type { Note } from "@/lib/supabase";

type NoteType = "text" | "image" | "video" | "link";

const tagOptions = ["Idea", "Bug", "Inspo", "Finance", "AI", "Personal", "Work"];

const typeIcons: Record<NoteType, typeof FileText> = {
  text: StickyNote,
  image: Image,
  video: Video,
  link: Link2,
};

// ── Notespace Content ────────────────────────────────────────────────────────

const NotespaceContent = () => {
  const navigate = useNavigate();
  const { data: notes = [], isLoading } = useNotes();
  const addNote = useAddNote();
  const deleteNote = useDeleteNote();

  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCapture, setShowCapture] = useState(false);
  const [newNote, setNewNote] = useState<{
    type: NoteType; title: string; content: string; tags: string[];
  }>({ type: "text", title: "", content: "", tags: [] });

  const filteredNotes = notes.filter((n) => {
    const matchTag = !filterTag || n.tags.includes(filterTag);
    const matchSearch =
      !searchQuery ||
      n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchSearch;
  });

  const handleAdd = async () => {
    if (!newNote.content.trim() && !newNote.title.trim()) return;
    try {
      await addNote.mutateAsync({
        title: newNote.title,
        content: newNote.content,
        type: newNote.type,
        tags: newNote.tags,
        url: null,
      });
      setNewNote({ type: "text", title: "", content: "", tags: [] });
      setShowCapture(false);
      toast.success("Note saved!");
    } catch {
      toast.error("Failed to save note.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote.mutateAsync(id);
      toast.success("Note deleted.");
    } catch {
      toast.error("Failed to delete note.");
    }
  };

  const toggleTag = (tag: string) => {
    setNewNote((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </button>
          <h1 className="font-display font-bold text-lg text-[hsl(var(--text-primary))]">
            Note<span className="text-primary">.</span>space
          </h1>
          <Button
            onClick={() => setShowCapture(!showCapture)}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs"
          >
            <Plus className="h-4 w-4 mr-1" />
            Capture
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Quick capture */}
        {showCapture && (
          <div className="glass-card p-5 mb-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              {(["text", "image", "video", "link"] as NoteType[]).map((t) => {
                const Icon = typeIcons[t];
                return (
                  <button
                    key={t}
                    onClick={() => setNewNote((prev) => ({ ...prev, type: t }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                      newNote.type === t
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-[hsl(var(--text-primary))] bg-muted/20"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t}
                  </button>
                );
              })}
            </div>
            <Input
              placeholder="Title..."
              value={newNote.title}
              onChange={(e) => setNewNote((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-muted/20 border-border/50 mb-3 text-sm"
            />
            <Textarea
              placeholder={
                newNote.type === "link" ? "Paste URL..." :
                newNote.type === "image" ? "Image URL..." :
                newNote.type === "video" ? "Video URL..." :
                "Write your note..."
              }
              value={newNote.content}
              onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
              rows={3}
              className="bg-muted/20 border-border/50 mb-3 text-sm"
            />
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2 py-0.5 rounded-full text-xs font-mono transition-all ${
                      newNote.tags.includes(tag)
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "bg-muted/20 text-muted-foreground hover:text-[hsl(var(--text-primary))]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <Button
                onClick={handleAdd}
                disabled={addNote.isPending}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs"
              >
                {addNote.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        )}

        {/* Search & filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/20 border-border/50 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tagOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all ${
                  filterTag === tag
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-muted/20 text-muted-foreground hover:text-[hsl(var(--text-primary))]"
                }`}
              >
                <Tag className="inline h-3 w-3 mr-1" />
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <>
            {/* Masonry grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filteredNotes.map((note: Note) => {
                const Icon = typeIcons[note.type as NoteType] ?? StickyNote;
                return (
                  <div key={note.id} className="break-inside-avoid glass-card-hover p-4 group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                        <span className="font-mono text-[10px] text-muted-foreground uppercase">{note.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {note.created_at?.split("T")[0]}
                        </span>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    {note.title && (
                      <h3 className="font-display text-sm font-semibold text-[hsl(var(--text-primary))] mb-1.5">
                        {note.title}
                      </h3>
                    )}
                    {note.type === "image" ? (
                      <div className="w-full h-32 rounded-md bg-muted/20 border border-border/30 flex items-center justify-center mb-2">
                        <Image className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                    ) : note.type === "link" ? (
                      <a href={note.content} className="text-sm text-primary font-mono break-all hover:underline">
                        {note.content}
                      </a>
                    ) : note.type === "video" ? (
                      <div className="w-full h-28 rounded-md bg-muted/20 border border-border/30 flex items-center justify-center mb-2">
                        <Video className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed">{note.content}</p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {note.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] font-mono border-border/30 text-muted-foreground px-1.5 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredNotes.length === 0 && (
              <div className="text-center py-20">
                <StickyNote className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="font-mono text-sm text-muted-foreground">No notes found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ── Export (wrapped in PasswordGate) ────────────────────────────────────────

const Notespace = () => (
  <PasswordGate>
    <NotespaceContent />
  </PasswordGate>
);

export default Notespace;
