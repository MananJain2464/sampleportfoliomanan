import { supabase } from './supabase';

const SESSION_KEY = 'portfolio_auth';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

// ── Hashing ────────────────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ── Session ────────────────────────────────────────────────────────────────

interface Session {
  authorized: boolean;
  expires: number;
}

export function getSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: Session = JSON.parse(raw);
    if (Date.now() > session.expires) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function isAuthorized(): boolean {
  const session = getSession();
  return session?.authorized === true;
}

function setSession(): void {
  const session: Session = {
    authorized: true,
    expires: Date.now() + SESSION_DURATION_MS,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

// ── Password Check ─────────────────────────────────────────────────────────

export async function checkPasswordConfigured(): Promise<boolean> {
  const { data } = await supabase
    .from('config')
    .select('value')
    .eq('key', 'admin_password')
    .maybeSingle();
  return !!data;
}

export async function verifyPassword(input: string): Promise<boolean> {
  const hashed = await hashPassword(input);
  const { data } = await supabase
    .from('config')
    .select('value')
    .eq('key', 'admin_password')
    .single();
  if (!data) return false;
  const match = data.value === hashed;
  if (match) setSession();
  return match;
}

export async function setPassword(newPassword: string): Promise<void> {
  const hashed = await hashPassword(newPassword);
  const { error } = await supabase
    .from('config')
    .upsert({ key: 'admin_password', value: hashed }, { onConflict: 'key' });
  if (error) throw error;
  setSession();
}
