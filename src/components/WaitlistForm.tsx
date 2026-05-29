import React, { useState, useEffect } from 'react';
import { registerWaitlistEmail } from '../lib/supabase';
import { Sparkles, Trophy, Flame, CheckCircle, Share2, Copy, Users, ShieldCheck } from 'lucide-react';

interface WaitlistFormProps {
  onSuccess: (email: string) => void;
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [pref] = useState('General Focus');
  const [level] = useState('All Levels');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savedSource, setSavedSource] = useState<'supabase' | 'localStorage'>('localStorage');
  const [refLink, setRefLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrMessage('Please supply an authentic, valid email address.');
      return;
    }

    setLoading(true);
    setErrMessage(null);

    try {
      const response = await registerWaitlistEmail(email.trim(), pref, level);
      
      if (response.success) {
        setSuccess(true);
        setSavedSource(response.source);
        
        // Generate viral referral link
        const salt = Math.random().toString(36).substring(2, 6).toUpperCase();
        setRefLink(`https://calnics.fit/?ref=ATHLETE-${salt}`);
        
        onSuccess(email.trim());
      } else {
        setErrMessage(response.error || 'Registration failed unexpectedly.');
      }
    } catch (err: any) {
      setErrMessage(err.message || 'Network exception occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-start">
      {!success ? (
        <form onSubmit={handleSubmit} className="w-full space-y-3.5">
          {/* Integrated input box with button inside on the right */}
          <div className="relative flex items-center w-full max-w-md bg-neutral-950/80 rounded-2xl border border-neutral-850 p-1.5 focus-within:border-red-500/40 focus-within:ring-2 focus-within:ring-red-950/45 transition-all duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent pl-4 pr-3 py-2.5 text-sm text-neutral-200 outline-none placeholder-neutral-700 flex-1 font-sans"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-red-650 hover:bg-red-650 hover:scale-[1.01] transition-all duration-200 text-white font-bold text-xs uppercase px-5 py-3.5 flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 active:scale-95 shadow-[0_4px_12px_rgba(239,68,68,0.2)] flex-shrink-0 font-sans tracking-wider"
            >
              {loading ? (
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <span>Join</span>
                  <span className="text-sm font-sans font-light">→</span>
                </>
              )}
            </button>
          </div>

          {errMessage && (
            <div className="p-3 bg-red-950/25 border border-red-900/30 rounded-xl flex items-center gap-2 max-w-md">
              <span className="text-red-500 text-xs">⚠️</span>
              <p className="text-[11px] text-red-400 font-mono leading-none">{errMessage}</p>
            </div>
          )}

          {/* Luxury action banner label underneath */}
          <div className="inline-flex items-center space-x-2 text-[10.5px] font-mono text-neutral-500 bg-neutral-950/40 border border-neutral-900/90 rounded-xl px-4 py-2 mt-1 select-none">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>The top athletes get free lifetime premium access.</span>
          </div>
        </form>
      ) : (
        <div className="w-full max-w-md bg-neutral-950/40 border border-neutral-900 rounded-3xl p-6.5 text-left space-y-5 animate-fade-in relative backdrop-blur-xl">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0 animate-pulse">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Access Secured</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Check <strong className="text-neutral-200">{email}</strong> shortly for early invitation links. Dynamic priority record logged in {savedSource === 'supabase' ? 'Supabase cloud registry' : 'Athletes Sandbox'}.
              </p>
            </div>
          </div>

          {/* Social sharing/referrals */}
          <div className="pt-3 border-t border-neutral-900 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Invite 3 friends
              </span>
              <span className="text-[9.5px] font-mono text-neutral-500 uppercase">Skip the queue</span>
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                value={refLink} 
                className="bg-black border border-neutral-850 text-[10.5px] font-mono text-neutral-400 rounded-lg p-2.5 flex-1 focus:outline-none"
                readOnly
              />
              <button
                onClick={handleCopyLink}
                className="p-2.5 rounded-lg border border-neutral-850 bg-neutral-950 hover:bg-neutral-900 active:scale-95 text-neutral-400 hover:text-white transition flex items-center justify-center cursor-pointer"
              >
                {copied ? <span className="text-[10px] text-green-400 font-mono tracking-tighter">Copied!</span> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
