import { createClient } from '@supabase/supabase-js';
import { WaitlistEntry } from '../types';

// Read variables from client environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Use lazy initialization or conditional client to prevent crash
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Retrieve current waitlist submissions either from Supabase (if configured)
 * or from localStorage as a super-robust fallback.
 */
export async function getWaitlistEntries(): Promise<{ 
  data: WaitlistEntry[]; 
  source: 'supabase' | 'localStorage'; 
  error: string | null; 
}> {
  // Always fetch localStorage backups as default/fallback
  const getLocalData = (): WaitlistEntry[] => {
    try {
      const stored = localStorage.getItem('calnic_waitlist');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Local storage error:", e);
      return [];
    }
  };

  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('calnic_waitlist')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn("Supabase query error, falling back to local:", error.message);
        return { data: getLocalData(), source: 'localStorage', error: error.message };
      }

      const formattedData: WaitlistEntry[] = (data || []).map((row: any) => ({
        id: row.id || String(row.created_at || Date.now()),
        email: row.email,
        workoutPreference: row.workout_preference || 'Core & Upper Body',
        experienceLevel: row.experience_level || 'Beginner',
        createdAt: row.created_at,
        customAvatarSeed: row.avatar_seed || Math.floor(Math.random() * 100)
      }));

      // Sync local storage so user has cross-compatible logs
      localStorage.setItem('calnic_waitlist', JSON.stringify(formattedData));
      return { data: formattedData, source: 'supabase', error: null };
    } catch (err: any) {
      console.warn("Exception during Supabase fetch:", err);
      return { data: getLocalData(), source: 'localStorage', error: err.message || 'Supabase connectivity error' };
    }
  }

  return { data: getLocalData(), source: 'localStorage', error: null };
}

/**
 * Registers an email into the waitlist.
 */
export async function registerWaitlistEmail(
  email: string, 
  workoutPreference: string, 
  experienceLevel: string
): Promise<{ success: boolean; source: 'supabase' | 'localStorage'; error: string | null }> {
  const newEntry: WaitlistEntry = {
    id: Math.random().toString(36).substring(2, 11),
    email,
    workoutPreference,
    experienceLevel,
    createdAt: new Date().toISOString(),
    customAvatarSeed: Math.floor(Math.random() * 100)
  };

  // 1. Always write to Local Storage first to ensure persistent backup
  const existingLocal = localStorage.getItem('calnic_waitlist');
  const list: WaitlistEntry[] = existingLocal ? JSON.parse(existingLocal) : [];
  
  // Prevent exact duplicate email locally
  if (!list.some(item => item.email.trim().toLowerCase() === email.trim().toLowerCase())) {
    list.unshift(newEntry);
    localStorage.setItem('calnic_waitlist', JSON.stringify(list));
  }

  // 2. Try Supabase if configured
  if (supabase && isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('calnic_waitlist')
        .insert([
          { 
            email, 
            workout_preference: workoutPreference, 
            experience_level: experienceLevel,
            avatar_seed: newEntry.customAvatarSeed
          }
        ]);

      if (error) {
        console.error("Supabase write failed:", error);
        return { 
          success: true, 
          source: 'localStorage', 
          error: `Saved to sandbox fallback (Supabase returned error: ${error.message})` 
        };
      }

      return { success: true, source: 'supabase', error: null };
    } catch (err: any) {
      console.error("Supabase exception:", err);
      return { 
        success: true, 
        source: 'localStorage', 
        error: `Saved to sandbox fallback (Network/Supabase offline: ${err.message || err})` 
      };
    }
  }

  // Pure Local Storage mode
  return { success: true, source: 'localStorage', error: null };
}
