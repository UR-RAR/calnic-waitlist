export interface WaitlistEntry {
  id: string;
  email: string;
  workoutPreference: string;
  experienceLevel: string;
  userAgent?: string;
  createdAt: string;
  referralCode?: string;
  customAvatarSeed: number;
}

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConfigured: boolean;
}
