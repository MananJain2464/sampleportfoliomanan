import { useState, useEffect, ReactNode } from "react";
import { Terminal, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  isAuthorized,
  verifyPassword,
  checkPasswordConfigured,
  setPassword,
} from "@/lib/auth";

interface PasswordGateProps {
  children: ReactNode;
}

type GateState = "loading" | "setup" | "login" | "authorized";

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [state, setState] = useState<GateState>("loading");
  const [password, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthorized()) {
      setState("authorized");
      return;
    }
    checkPasswordConfigured().then((configured) => {
      setState(configured ? "login" : "setup");
    });
  }, []);

  const handleLogin = async () => {
    if (!password.trim()) return;
    setSubmitting(true);
    setError("");
    const ok = await verifyPassword(password);
    setSubmitting(false);
    if (ok) {
      setState("authorized");
    } else {
      setError("You are not authorized.");
      setPasswordInput("");
    }
  };

  const handleSetup = async () => {
    if (!password.trim()) {
      setError("Password cannot be empty.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await setPassword(password);
      setState("authorized");
    } catch {
      setError("Failed to save password. Check your Supabase connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
      </div>
    );
  }

  if (state === "authorized") {
    return <>{children}</>;
  }

  const isSetup = state === "setup";

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Terminal header */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/20">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-[hsl(40,100%,50%)]/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              terminal — {isSetup ? "setup" : "auth"}
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display font-bold text-[hsl(var(--text-primary))]">
                  {isSetup ? "Initial Setup" : "Access Required"}
                </h1>
                <p className="font-mono text-xs text-muted-foreground">
                  {isSetup ? "Set your admin password" : "Enter password to continue"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (isSetup ? handleSetup() : handleLogin())}
                  className="bg-muted/20 border-border/50 font-mono pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {isSetup && (
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSetup()}
                  className="bg-muted/20 border-border/50 font-mono"
                />
              )}

              {error && (
                <p className="font-mono text-xs text-destructive">{error}</p>
              )}

              <Button
                onClick={isSetup ? handleSetup : handleLogin}
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isSetup ? (
                  "Set Password"
                ) : (
                  "$ authenticate"
                )}
              </Button>
            </div>

            {!isSetup && (
              <p className="font-mono text-[10px] text-muted-foreground/50 text-center mt-4">
                Session expires after 8 hours or on tab close
              </p>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
            <Terminal className="h-3 w-3" />
            Return to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordGate;
