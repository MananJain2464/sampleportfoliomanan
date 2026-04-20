import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ──────────────────────────────────────────────────────────────────

export interface Personal {
  id: string;
  name: string;
  designation: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  linkedin: string;
  twitter: string;
  leetcode: string;
  instagram: string;
  resume_url: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  role: string;
  github_url: string | null;
  demo_url: string | null;
  category: string;
  visible: boolean;
  sort_order: number;
  created_at: string;
  image_url: string | null;
}

export interface TimelineEntry {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  duration: string;
  description: string;
  tags: string[];
  link: string | null;
  sort_order: number;
  image_url: string | null;
}

export interface Credential {
  id: string;
  type: 'certificate' | 'competition';
  name: string;
  issuer: string;
  date: string;
  category: string;
  link: string | null;
  result: string | null;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  sort_order: number;
  icon_url: string | null;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'link';
  tags: string[];
  url: string | null;
  created_at: string;
  updated_at: string;
}
