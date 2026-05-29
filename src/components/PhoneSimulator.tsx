import { useState, useEffect } from 'react';
import { 
  Bell, Flame, Clock, Dumbbell, Play, Trash2, Award, 
  TrendingUp, Calendar, Heart, ShieldAlert, Sparkles, CheckCircle, Video,
  History, Settings, MessageSquare, MoreHorizontal, Compass, Search,
  ArrowLeft, Camera, Globe, HelpCircle, FileText, LogOut, Check
} from 'lucide-react';
import { ACTIVITIES, WeeklyActivity } from '../data/workouts';
import hiitIcon from '../assets/images/hiit_thumb_1779951833858.png';
import pushIcon from '../assets/images/push_thumb_1779951854497.png';
import mobilityIcon from '../assets/images/mobility_thumb_1779951875364.png';
import coreIcon from '../assets/images/core_isometric_thumb_1779952209477.png';
import lsitIcon from '../assets/images/lsit_strength_thumb_1779952231891.png';
import archerIcon from '../assets/images/archer_pushup_thumb_1779952248345.png';
import profileScenery from '../assets/images/profile_scenery_1779952530394.png';
import athleteAvatar from '../assets/images/athlete_avatar_1779952548620.png';

interface PhoneSimulatorProps {
  currentEmail?: string;
  onTabChange?: (tab: 'home' | 'workouts' | 'progress' | 'profile') => void;
}

export default function PhoneSimulator({ currentEmail, onTabChange }: PhoneSimulatorProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'workouts' | 'progress' | 'profile'>('home');

  // Trigger callback when activeTab changes
  useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab]);

  // Duolingo Style Challenges State
  const [duoProgress, setDuoProgress] = useState(2); // Level 1 done, level 2 active, levels 3-5 locked
  const [duoGems, setDuoGems] = useState(316);
  const [duoLives, setDuoLives] = useState(5);
  const [activeChallNode, setActiveChallNode] = useState<{ id: number; title: string; challenge: string; details: string } | null>(null);

  const [selectedWorkout, setSelectedWorkout] = useState<WeeklyActivity | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const [userWeightInput, setUserWeightInput] = useState('78');
  const [maxPushups, setMaxPushups] = useState(38);
  const [customGoal, setCustomGoal] = useState('45 Pushups');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]); // Step 1 pre-checked
  const [streakVal, setStreakVal] = useState(5);
  const [activeProfileTab, setActiveProfileTab] = useState<'leaders' | 'challenges' | 'badges'>('leaders');
  const [profileSubScreen, setProfileSubScreen] = useState<'profile' | 'settings' | 'edit_profile'>('profile');
  const [profileName, setProfileName] = useState('Alexander Carter');
  const [profileUsername, setProfileUsername] = useState('warrior_prime');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 019-2834');
  const [profileEmail, setProfileEmail] = useState(currentEmail || 'warrior@calisthenics.fit');
  const [biometricSync, setBiometricSync] = useState(false);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [historyLogs, setHistoryLogs] = useState([
    { id: 'h1', title: 'Supine Core Ignition', time: '12m ago', calories: 95, completed: true, img: coreIcon },
    { id: 'h2', title: 'Strength PR: Bench Dips', time: '2h ago', calories: 150, completed: true, img: pushIcon },
    { id: 'h3', title: 'HIIT Fat Furnace', time: 'Yesterday', calories: 380, completed: true, img: hiitIcon },
    { id: 'h4', title: 'Flexibility Routine', time: '2 days ago', calories: 110, completed: true, img: mobilityIcon },
  ]);

  // Auto-dismiss "Coming Soon" toast within the phone
  useEffect(() => {
    if (showComingSoon) {
      const timer = setTimeout(() => {
        setShowComingSoon(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showComingSoon]);

  // Workout Timer Effect
  useEffect(() => {
    let interval: any;
    if (isPlaying && workoutTimer > 0) {
      interval = setInterval(() => {
        setWorkoutTimer((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            if (selectedWorkout) {
              setCompletedWorkouts((prevDone) => [...prevDone, selectedWorkout.id]);
              setHistoryLogs((logs) => [
                {
                  id: 'h-' + Date.now(),
                  title: selectedWorkout.title,
                  time: 'Just now',
                  calories: selectedWorkout.calories,
                  completed: true,
                  img: selectedWorkout.imageFallbackType === 'hiit' ? hiitIcon : selectedWorkout.imageFallbackType === 'push' ? pushIcon : mobilityIcon
                },
                ...logs
              ]);
            }
            alert(`🔥 Congratulations Warrior! You've successfully completed the session: ${selectedWorkout?.title}! 100+ XP recorded.`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, workoutTimer, selectedWorkout]);

  const handleStartWorkout = (act: WeeklyActivity) => {
    setSelectedWorkout(act);
    setWorkoutTimer(act.id === 'act-1' ? 420 : act.id === 'act-2' ? 1800 : 900); // match seconds to duration
    setIsPlaying(true);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // SVG Line Chart Helpers for Progress Dashboard
  const pushupHistory = [22, 25, 29, 28, 32, 35, 38];
  const chartWidth = 280;
  const chartHeight = 110;
  const points = pushupHistory.map((val, idx) => {
    const x = (idx / (pushupHistory.length - 1)) * (chartWidth - 20) + 10;
    const y = chartHeight - ((val - 15) / (45 - 15)) * (chartHeight - 30) - 15;
    return { x, y, val };
  });

  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div id="app-simulator-phone" className="relative w-[345px] h-[720px] rounded-[48px] border-[10px] border-neutral-900 bg-black shadow-2xl overflow-hidden shadow-red-950/20 flex flex-col select-none">
      
      {/* Phone Camera Notch (Dynamic Island) */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5.5 bg-neutral-900 rounded-full z-50 flex items-center justify-between px-3 text-white text-[8px] font-mono">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
        <span className="text-[9px] text-neutral-400 font-sans font-semibold">Calnics Live</span>
        <div className="w-2.5 h-1 rounded-full bg-blue-600/60 shadow-inner" />
      </div>

      {/* Screen Interface */}
      <div className="w-full h-full flex flex-col justify-between pt-9 text-neutral-200 font-sans relative">
        
        {/* Top Status Bar Grid */}
        <div className="flex justify-between items-center px-6 text-[10px] text-neutral-400 font-mono select-none">
          <span>9:41</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[9px]">5G</span>
            <div className="w-5 h-2.5 border border-neutral-700 rounded-sm p-0.5 flex">
              <div className="w-full bg-red-500 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Content Box (Scrollable / Tab Specific) */}
        <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar flex flex-col">
          
          {/* Active Player Overlay Modal */}
          {isPlaying && selectedWorkout && (
            <div className="absolute inset-x-0 top-9 bottom-[65px] bg-black/95 z-40 flex flex-col p-5 justify-between animate-fade-in text-center">
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-mono text-neutral-500 tracking-wider">ACTIVE WORKOUT TRACKER</span>
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="text-[10px] text-red-500 font-semibold uppercase hover:underline"
                  >
                    Quit
                  </button>
                </div>

                {/* Animated Workout Character Wave */}
                <div className="w-32 h-32 rounded-full border border-red-500/30 bg-red-950/20 mx-auto flex items-center justify-center animate-[pulse_2s_infinite] mb-6 relative">
                  <Video className="w-10 h-10 text-red-500 absolute" />
                  <div className="w-24 h-24 rounded-full border border-red-500/20 animate-ping absolute" />
                </div>

                <h4 className="text-lg font-black tracking-wide">{selectedWorkout.title}</h4>
                <p className="text-xs text-neutral-400 mt-1">Focus Mode: Keep breathing loops dynamic</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <span className="text-xs bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full text-red-500 font-mono font-bold">
                    🔥 {selectedWorkout.calories} KCAL
                  </span>
                  <span className="text-xs bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full text-neutral-300 font-mono">
                    🕜 {selectedWorkout.duration}
                  </span>
                </div>
              </div>

              {/* Countdown Dial */}
              <div className="my-6">
                <span className="text-5xl font-mono font-black text-white tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  {formatTimer(workoutTimer)}
                </span>
                <p className="text-[10px] text-neutral-500 font-mono tracking-widest mt-2 uppercase">remaining time</p>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setIsPlaying(false);
                    if (selectedWorkout) {
                      setCompletedWorkouts((prevDone) => [...prevDone, selectedWorkout.id]);
                      setHistoryLogs((logs) => [
                        {
                          id: 'h-' + Date.now(),
                          title: selectedWorkout.title,
                          time: 'Just now',
                          calories: selectedWorkout.calories,
                          completed: true,
                          img: selectedWorkout.imageFallbackType === 'hiit' ? hiitIcon : selectedWorkout.imageFallbackType === 'push' ? pushIcon : mobilityIcon
                        },
                        ...logs
                      ]);
                    }
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs tracking-widest rounded-xl transition"
                >
                  COMPLETE SESSION
                </button>
                <p className="text-[9px] text-neutral-500 italic">Push boundaries. Calisthenics build supreme raw force.</p>
              </div>
            </div>
          )}

          {/* ================= TAB 1: HOME ================= */}
          {activeTab === 'home' && (
            <div className="flex-1 flex flex-col justify-start">
              
              {/* Header Profile Info */}
              <div className="flex justify-between items-center mb-5 mt-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center overflow-hidden">
                    <svg className="w-7 h-7 text-neutral-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="48" fill="#171717" stroke="#333" strokeWidth="2" />
                      {/* Warrior Helmet Silhouette vector */}
                      <path d="M50 20 L68 45 L50 40 L32 45 Z" fill="#ff3333" />
                      <path d="M35 48 Q50 45 65 48 L60 80 Q50 85 40 80 Z" fill="#ffffff" />
                      <line x1="50" y1="40" x2="50" y2="83" stroke="#ff3333" strokeWidth="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[9px] tracking-wide text-neutral-500 uppercase block font-medium">Good Morning,</span>
                    <span 
                      className="text-xs font-black tracking-widest text-red-500"
                      style={{ textShadow: '0 0 12px rgba(239,68,68,0.4)' }}
                    >
                      WARRIOR
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  {/* Streak Fire Badge */}
                  <button 
                    onClick={() => {
                      setStreakVal((prev) => prev + 1);
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/25 hover:bg-red-500 hover:text-white transition group cursor-pointer"
                  >
                    <span className="text-[10px] animate-pulse">🔥</span>
                    <span className="text-[10.5px] font-mono font-black text-red-500 group-hover:text-white leading-none">{streakVal}</span>
                  </button>

                  <div className="relative">
                    <button className="w-9 h-9 rounded-full bg-neutral-900/80 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition">
                      <Bell className="w-4.5 h-4.5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Date Wheel Slider Row */}
              <div className="flex justify-between mb-5 bg-neutral-950/40 p-1.5 rounded-2xl border border-neutral-900">
                {[
                  { dayMonth: '17', dayLabel: 'MON' },
                  { dayMonth: '18', dayLabel: 'TUE' },
                  { dayMonth: '19', dayLabel: 'WED' },
                  { dayMonth: '20', dayLabel: 'THU', active: true },
                  { dayMonth: '21', dayLabel: 'FRI' },
                  { dayMonth: '22', dayLabel: 'SAT' },
                  { dayMonth: '23', dayLabel: 'SUN' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center w-7.5 py-1.5 rounded-xl transition ${
                      item.active 
                        ? 'bg-red-600 text-white font-bold shadow-[0_4px_12px_rgba(239,68,68,0.4)]' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <span className="text-[7.5px] font-mono tracking-tighter mb-0.5">{item.dayLabel}</span>
                    <span className="text-[10.5px] font-bold font-sans">{item.dayMonth}</span>
                  </div>
                ))}
              </div>

              {/* Bolder, Larger Daily Progress Box */}
              <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 border border-neutral-800/80 rounded-[2rem] p-5 mb-5.5 relative overflow-hidden shadow-[0_15px_30px_rgba(239,68,68,0.06)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
                
                <div className="flex justify-between items-center mb-4.5">
                  <div>
                    <span className="text-[9.5px] uppercase font-mono font-bold tracking-widest text-[#d4ff1a] block">WARRIOR TARGETS</span>
                    <h4 className="text-sm font-black text-white uppercase mt-0.5 tracking-wide">Daily Mastery Level</h4>
                  </div>
                  <span className="text-[8.5px] px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/25 font-mono font-bold text-red-500 animate-pulse">L5 ATHLETE</span>
                </div>

                <div className="grid grid-cols-12 gap-3.5 items-center">
                  
                  {/* Left stats counts panel */}
                  <div className="col-span-7 space-y-3">
                    <div className="flex items-center space-x-3 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-900">
                      <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[8.5px] text-neutral-500 uppercase tracking-wider block font-bold leading-none">Calories active</span>
                        <p className="text-xs font-black text-neutral-100 mt-1">
                          1,450 <span className="text-[9px] text-neutral-500 font-normal">/ 2,000 kcal</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-900">
                      <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[8.5px] text-neutral-500 uppercase tracking-wider block font-bold leading-none">Practice Time</span>
                        <p className="text-xs font-black text-neutral-100 mt-1">
                          45 <span className="text-[9px] text-neutral-500 font-normal">/ 60 min</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-900">
                      <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                        <Dumbbell className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[8.5px] text-neutral-500 uppercase tracking-wider block font-bold leading-none">Completed Exercises</span>
                        <p className="text-xs font-black text-neutral-100 mt-1">
                          10 <span className="text-[9px] text-neutral-500 font-normal">/ 12 reps</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Glowing Ring Progress - enlarged */}
                  <div className="col-span-5 flex justify-center">
                    <div className="w-[104px] h-[104px] relative flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.04)" strokeWidth="10" fill="transparent" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="38" 
                          stroke="#ff2222" 
                          strokeWidth="10" 
                          fill="transparent" 
                          strokeDasharray={238} 
                          strokeDashoffset={238 - (238 * 82) / 100}
                          strokeLinecap="round"
                          className="filter drop-shadow-[0_0_8px_rgba(239,68,68,0.85)]"
                          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-lg font-black text-white leading-none">82%</span>
                        <span className="text-[8px] text-neutral-400 uppercase tracking-widest mt-1.5 font-bold">Done</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic History Section (replacing Personalized Content) */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-xs font-bold tracking-tight">Recent Activity History</span>
                  <p className="text-[8px] text-neutral-500 uppercase font-mono mt-0.5">Your training logs</p>
                </div>
                <button 
                  onClick={() => {
                    setHistoryLogs([]);
                    setCompletedWorkouts([]);
                  }}
                  className="text-[9px] text-red-500 font-semibold cursor-pointer hover:underline"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-2.5 flex-1 select-none">
                {historyLogs.length === 0 ? (
                  <div className="py-8 text-center rounded-2xl border border-dashed border-neutral-900 bg-neutral-950/40">
                    <History className="w-6 h-6 text-neutral-700 mx-auto mb-2 animate-bounce" />
                    <span className="text-[10px] text-neutral-500 uppercase font-mono block">No history logged yet</span>
                    <span className="text-[8px] text-neutral-600 block mt-0.5">Start a session to record form & reps</span>
                  </div>
                ) : (
                  historyLogs.map((log) => (
                    <div 
                      key={log.id}
                      className="flex justify-between items-center p-2.5 rounded-2xl border bg-neutral-950/90 border-neutral-900 hover:border-neutral-800 transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center select-none relative overflow-hidden">
                          <img 
                            src={log.img} 
                            alt={log.title} 
                            className="w-full h-full object-cover select-none" 
                            referrerPolicy="no-referrer" 
                          />
                          
                          {/* Success badge check overlays */}
                          <div className="absolute inset-0 bg-neutral-950/75 flex items-center justify-center text-green-500">
                            <CheckCircle className="w-4.5 h-4.5" />
                          </div>
                        </div>

                        <div>
                          <h5 className="text-[11.5px] font-bold text-white leading-snug">{log.title}</h5>
                          <div className="flex items-center space-x-2 text-[9px] text-neutral-400 font-mono mt-0.5">
                            <span className="flex items-center gap-0.5 text-neutral-500">{log.time}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-red-500 font-bold"><Flame className="w-2.5 h-2.5 text-red-500" />{log.calories} Kcal</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end pr-1">
                        <span className="text-[8px] font-mono text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/15">SAVED</span>
                        <span className="text-[7.5px] text-neutral-500 mt-1 font-mono">Form Verified</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* ================= TAB 2: PROGRESS TRACKER ================= */}
          {activeTab === 'progress' && (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4 mt-1">
                <span className="text-xs font-black tracking-wider uppercase text-red-500">STRENGTH ANALYTICS</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 font-mono text-neutral-400">SYNCED LIVE</span>
              </div>

              {/* Progress Graph SVG Component */}
              <div className="bg-neutral-950/95 border border-neutral-900 rounded-2xl p-3.5 mb-4 text-center">
                <div className="flex justify-between items-center mb-2.5">
                  <div>
                    <span className="text-[8.5px] uppercase font-mono tracking-widest text-neutral-500 block">MAX RECORD TYPE</span>
                    <span className="text-sm font-black text-neutral-100 uppercase">Push-up Max Gains</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8.5px] uppercase font-mono text-neutral-500 block">CURRENT PR</span>
                    <span className="text-xs font-bold text-red-500 font-mono">{maxPushups} reps</span>
                  </div>
                </div>

                {/* SVG Polyline Chart representing calisthenics records */}
                <div className="w-full h-28 bg-neutral-900/50 rounded-xl relative overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                    {/* Horizontal helper grid lines */}
                    <line x1="0" y1="20" x2={chartWidth} y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="55" x2={chartWidth} y2="55" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="90" x2={chartWidth} y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                    {/* Gradient under line */}
                    <path 
                      d={`M ${points[0].x} ${chartHeight} L ${polylinePoints} L ${points[points.length-1].x} ${chartHeight} Z`}
                      fill="url(#gradUnderLine)"
                    />

                    {/* Polyline Path */}
                    <polyline
                      fill="none"
                      stroke="#ff3333"
                      strokeWidth="2.5"
                      points={polylinePoints}
                      className="filter drop-shadow-[0_0_4px_rgba(255,51,51,0.6)]"
                    />

                    {/* Chart Nodes Circles */}
                    {points.map((p, idx) => (
                      <circle
                        key={idx}
                        cx={p.x}
                        cy={p.y}
                        r={idx === points.length - 1 ? "4" : "2.5"}
                        fill={idx === points.length - 1 ? "#ffffff" : "#ff3333"}
                        stroke={idx === points.length - 1 ? "#ff2222" : "transparent"}
                        strokeWidth="1.5"
                      />
                    ))}

                    {/* Chart definitions */}
                    <defs>
                      <linearGradient id="gradUnderLine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff3333" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ff3333" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 mt-2 px-1">
                  <span>WK 1</span>
                  <span>WK 2</span>
                  <span>WK 3</span>
                  <span>WK 4</span>
                  <span>WK 5</span>
                  <span>WK 6</span>
                  <span className="text-red-400 font-bold">WK 7 (NOW)</span>
                </div>
              </div>

              {/* Editable Tracker Inputs */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4.5 space-y-3 flex-1">
                <span className="text-[11px] font-bold tracking-tight text-neutral-400 block mb-1">Quick PR Logger</span>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[8px] font-mono text-neutral-500 uppercase block mb-1">Max Push-ups</label>
                    <input 
                      type="number"
                      value={maxPushups}
                      onChange={(e) => setMaxPushups(Math.max(1, parseInt(e.target.value) || 0))} 
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-1 px-2.5 font-mono text-xs text-red-500 focus:outline-none focus:border-red-600 text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-mono text-neutral-500 uppercase block mb-1">Bodyweight (kg)</label>
                    <input 
                      type="number"
                      value={userWeightInput}
                      onChange={(e) => setUserWeightInput(e.target.value)} 
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-1 px-2.5 font-mono text-xs text-neutral-200 focus:outline-none focus:border-neutral-700 text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[8px] font-mono text-neutral-500 uppercase block mb-1">Target Calnics Goal</label>
                  <input 
                    type="text"
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    placeholder="e.g., Archer Push Up 10 reps"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-1 px-2.5 font-mono text-xs text-neutral-200 focus:outline-none focus:border-neutral-700 block"
                  />
                </div>

                <div className="bg-neutral-900/60 rounded-xl p-2.5 border border-neutral-800/40 flex items-center gap-2.5 mt-3">
                  <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <p className="text-[9.5px] text-neutral-400 leading-snug">
                    <span className="font-bold text-neutral-200 block">WARRIOR BONUS METRICS:</span>
                    Current weight-to-strength index is <span className="text-amber-500 font-bold">1.43x</span>. You are scoring in the top <span className="text-white font-bold">15%</span> of Calnics athletes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="flex-1 flex flex-col justify-start animate-fade-in text-left">
              {profileSubScreen === 'profile' ? (
                <>
                  {/* Profile Top Action Bar / Header */}
                  <div className="flex justify-between items-center mb-6 mt-2">
                    <span className="text-[17px] font-black text-white uppercase tracking-tight">My profile</span>
                    
                    <div className="flex items-center space-x-2.5">
                      {/* Streak Fire Capsule */}
                      <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/25">
                        <span className="text-[10px] animate-pulse">🔥</span>
                        <span className="text-[10.5px] font-mono font-black text-red-500 leading-none">{streakVal}</span>
                      </div>

                      {/* Settings gear icon */}
                      <button 
                        onClick={() => setProfileSubScreen('settings')} 
                        className="w-8.5 h-8.5 rounded-full bg-neutral-900/80 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition cursor-pointer"
                        title="Settings"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Profile Main Card */}
                  <div className="flex flex-col items-center text-center mb-5 select-none">
                    <div className="relative w-22 h-22 rounded-full p-1.5 bg-gradient-to-tr from-red-650 to-neutral-900 border border-neutral-800/80 flex items-center justify-center shadow-[0_10px_20px_rgba(239,68,68,0.04)]">
                      <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950">
                        <img 
                          src={athleteAvatar} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      {/* Lime green glowing verification badge */}
                      <span className="absolute bottom-0 right-1 bg-green-500 text-neutral-950 w-[19px] h-[19px] rounded-full flex items-center justify-center border-2 border-neutral-950 font-black text-[9px] shadow-lg animate-pulse" aria-label="Verified Tick">
                        ✓
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-white uppercase tracking-wider mt-3.5 flex items-center gap-1.5">
                      {profileName}
                    </h4>
                    <p className="text-[10px] text-neutral-500 mt-1 font-medium select-text">
                      @{profileUsername} <span className="text-neutral-700 mx-1">•</span> 10.2k followers <span className="text-neutral-700 mx-1">•</span> 142 following
                    </p>
                  </div>

                  {/* Capsule pill tabs */}
                  <div className="flex space-x-2.5 mb-5 select-none justify-center">
                    {[
                      { id: 'leaders', label: 'Leaders' },
                      { id: 'challenges', label: 'Challenge' },
                      { id: 'badges', label: 'Badge' },
                    ].map((pTab) => {
                      const isActive = activeProfileTab === pTab.id;
                      return (
                        <button
                          key={pTab.id}
                          onClick={() => setActiveProfileTab(pTab.id as 'leaders' | 'challenges' | 'badges')}
                          className={`px-4.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tight transition cursor-pointer ${
                            isActive 
                              ? 'bg-[#d4ff1a] text-black shadow-md shadow-[#d4ff1a]/10 font-extrabold' 
                              : 'bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 text-neutral-400 font-bold'
                          }`}
                        >
                          {pTab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feed Card Rendering under profile tabs */}
                  <div className="space-y-4 flex-1">
                    {activeProfileTab === 'leaders' ? (
                      /* ================= HIGH CONTRAST STYLIZED LEADERBOARD ================= */
                      <div className="space-y-4.5 p-1 select-none animate-fade-in relative overflow-visible">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono tracking-wider font-extrabold text-neutral-400 uppercase">Season Leader_</span>
                          <span className="text-[9px] font-bold text-red-500 font-mono animate-pulse">LIVEMATCH v4.8</span>
                        </div>

                        {/* Rank 1: Anna - Warm high glow golden gradient */}
                        <div 
                          className="relative rounded-[1.8rem] p-4.5 bg-gradient-to-r from-[#ffbf00] via-[#ffa200] to-[#ff8000] text-black shadow-[0_15px_30px_rgba(251,191,36,0.25)] transform hover:scale-[1.02] hover:-rotate-1 transition-all duration-300 overflow-hidden border border-amber-300/40"
                          style={{
                            clipPath: 'polygon(0% 0%, 100% 0%, 98% 100%, 1% 100%)'
                          }}
                        >
                          {/* Light flare beam highlight at top */}
                          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_8px_#fff]" />
                          
                          {/* Warm particles/glow */}
                          <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none" />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3.5">
                              {/* Orange number bubble from screenshot */}
                              <div className="w-7 h-7 rounded-full bg-orange-600 border border-white text-white flex items-center justify-center font-sans font-black text-xs shadow-md">
                                1
                              </div>

                              {/* Stylized Avatar container */}
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/60 bg-neutral-900 shadow-sm flex items-center justify-center">
                                <img 
                                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120" 
                                  alt="Anna"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              <span className="text-sm font-sans font-black text-neutral-950 uppercase tracking-tight">
                                Anna
                              </span>
                            </div>

                            {/* Score info */}
                            <div className="flex items-center space-x-1 px-2.5 py-1 rounded bg-black/10">
                              <span className="text-xs font-mono font-black text-[#5c3000] leading-none">+1,000 EZ</span>
                              <span className="text-xs text-[#5c3000] leading-none">✦</span>
                            </div>
                          </div>
                        </div>

                        {/* Rank 2: Sam - Dark inclined item with blue athlete avatar */}
                        <div 
                          className="relative rounded-[1.8rem] p-4.5 bg-gradient-to-r from-[#171923] to-[#0f1118] text-white shadow-lg transform rotate-[1.5deg] hover:rotate-0 hover:scale-[1.02] transition-transform duration-300 overflow-hidden border border-neutral-850"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3.5">
                              {/* White/gray circle badge */}
                              <div className="w-7 h-7 rounded-full bg-[#1e2230] border border-neutral-700 text-neutral-300 flex items-center justify-center font-sans font-black text-xs">
                                2
                              </div>

                              {/* Sam avatar */}
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-500/30 bg-neutral-900 flex items-center justify-center">
                                <img 
                                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120" 
                                  alt="Sam"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              <span className="text-sm font-sans font-black text-[#f1f2f5] uppercase tracking-tight">
                                Sam
                              </span>
                            </div>

                            {/* Score info */}
                            <div className="flex items-center space-x-1.5 bg-neutral-900/60 px-3 py-1 rounded-full border border-neutral-800">
                              <span className="text-xs font-mono font-black text-[#d4ff1a] leading-none">+500 EZ</span>
                              <span className="text-xs text-[#d4ff1a] leading-none">✦</span>
                            </div>
                          </div>
                        </div>

                        {/* Rank 3: Nariman - Deep anthracite tilted flat dark card */}
                        <div 
                          className="relative rounded-[1.8rem] p-4.5 bg-gradient-to-r from-[#12131a] to-[#0a0b0e] text-neutral-300 shadow-md transform rotate-[-1deg] hover:rotate-0 hover:scale-[1.02] transition-transform duration-300 overflow-hidden border border-neutral-900"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3.5">
                              {/* Circle badge */}
                              <div className="w-7 h-7 rounded-full bg-[#181921] border border-neutral-800 text-neutral-400 flex items-center justify-center font-sans font-black text-xs">
                                3
                              </div>

                              {/* Nariman Avatar */}
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-red-500/20 bg-neutral-900 flex items-center justify-center">
                                <img 
                                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120" 
                                  alt="Nariman"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              <span className="text-sm font-sans font-black text-neutral-300 uppercase tracking-tight">
                                Nariman
                              </span>
                            </div>

                            {/* Score info */}
                            <div className="flex items-center space-x-1.5 bg-neutral-[#0e0f12] px-3 py-1 rounded-full border border-neutral-800">
                              <span className="text-xs font-mono font-black text-amber-500 leading-none">+100 EZ</span>
                              <span className="text-xs text-amber-500 leading-none">✦</span>
                            </div>
                          </div>
                        </div>

                        {/* Rank 4: Caleb - Translucent styled faded list item */}
                        <div 
                          className="relative rounded-[1.8rem] p-4.5 bg-[#0e0f12]/40 text-neutral-500 shadow-sm opacity-40 transform rotate-[0.5deg] hover:opacity-100 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-neutral-900/30"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3.5">
                              {/* Circle badge */}
                              <div className="w-7 h-7 rounded-full bg-neutral-950/80 border border-neutral-900 text-neutral-600 flex items-center justify-center font-sans font-black text-xs">
                                4
                              </div>

                              {/* Caleb Avatar */}
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-900 bg-neutral-950 flex items-center justify-center grayscale">
                                <img 
                                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" 
                                  alt="Caleb"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              <span className="text-sm font-sans font-black text-neutral-500 uppercase tracking-tight">
                                Caleb
                              </span>
                            </div>

                            {/* Score info */}
                            <div className="flex items-center space-x-1.5 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-900/40">
                              <span className="text-xs font-mono font-black text-neutral-600 leading-none">+50 EZ</span>
                              <span className="text-xs text-neutral-600 leading-none">✦</span>
                            </div>
                          </div>
                        </div>

                        {/* Challenge / Claim Bonus reward callout */}
                        <div className="bg-neutral-950 border border-neutral-900 rounded-[1.5rem] p-4 text-center mt-3">
                          <span className="text-[10px] font-mono font-black text-red-500 block">✦ NEXT CLASH IN 1H 24M ✦</span>
                          <p className="text-[9.5px] text-neutral-500 mt-1">Complete work on dynamic schedules to automatically synchronize your rank on our league standings!</p>
                        </div>
                      </div>
                    ) : activeProfileTab === 'challenges' ? (
                      /* ================= DUOLINGO STYLE ACTIVE CHALLENGES ================= */
                      <div className="p-1 select-none animate-fade-in relative overflow-visible">
                        
                        {/* Status bar top indicator */}
                        <div className="flex justify-between items-center bg-[#58cc02]/10 border border-[#58cc02]/20 rounded-2xl px-4 py-2.5 mb-4 text-xs font-bold select-none">
                          <button 
                            onClick={() => alert(`🌍 Selected language localization: ${currentLanguage}`)}
                            className="flex items-center space-x-1.5 focus:outline-none hover:opacity-85 transition cursor-pointer"
                          >
                            <span className="text-sm leading-none">{
                              currentLanguage === 'Ukrainian' ? '🇺🇦' :
                              currentLanguage === 'Spanish' ? '🇪🇸' :
                              currentLanguage === 'German' ? '🇩🇪' : '🇺🇸'
                            }</span>
                            <span className="text-[9.5px] uppercase font-mono font-black text-[#58cc02]">
                              {currentLanguage === 'Ukrainian' ? 'UA' : currentLanguage === 'Spanish' ? 'ES' : currentLanguage === 'German' ? 'DE' : 'EN'}
                            </span>
                          </button>

                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1 text-orange-500" title="Streak 🔥">
                              <span>🔥</span>
                              <span className="font-mono font-black">{streakVal}</span>
                            </span>

                            <span className="flex items-center space-x-1 text-cyan-400" title="EZ Gems 💎">
                              <span>💎</span>
                              <span className="font-mono font-black">{duoGems}</span>
                            </span>

                            <button
                              onClick={() => {
                                if (duoLives < 5) {
                                  if (duoGems >= 50) {
                                    if (confirm('❤️ Buy full shield restock (5 Hearts) for 50 💎?')) {
                                      setDuoGems(g => g - 50);
                                      setDuoLives(5);
                                      alert('❤️ Hearts fully restored!');
                                    }
                                  } else {
                                    alert('❌ Not enough EZ Gems! Complete challenges to earn Gems.');
                                  }
                                } else {
                                  alert('❤️ Hearts are already full! Keep training!');
                                }
                              }}
                              className="flex items-center space-x-1 text-red-500 hover:text-red-400 cursor-pointer focus:outline-none transition"
                              title="Hearts ❤️ (Click to refill)"
                            >
                              <span className="animate-pulse">❤️</span>
                              <span className="font-mono font-black">{duoLives}</span>
                            </button>
                          </div>
                        </div>

                        {/* Duolingo unit bar */}
                        <div className="flex justify-between items-center bg-[#58cc02] text-white rounded-[1.8rem] p-4.5 mb-6 shadow-md border-b-4 border-[#419a02] overflow-hidden relative">
                          <div className="text-left">
                            <span className="text-[9.5px] font-black uppercase text-[#cdf5aa] tracking-widest block leading-none">UNIT 3 _ CHALLENGE</span>
                            <h5 className="text-[14px] font-sans font-black text-white mt-1.5 leading-tight uppercase tracking-tight">PLANCHE PROGRESSION</h5>
                          </div>
                          
                          <button 
                            onClick={() => alert(`📖 Planche Guidelines:\n1. Keep hips straight.\n2. Lean forward with shoulder lean.\n3. Keep arms locked out & protract shoulder blades.`)}
                            className="w-9 h-9 rounded-xl bg-[#419a02]/30 hover:bg-[#419a02]/50 transition flex items-center justify-center text-white border border-white/10 active:scale-95 cursor-pointer shadow-inner"
                            title="Notes theory"
                          >
                            <FileText className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Staggered wavy snake trail representation */}
                        <div className="flex flex-col items-center space-y-6 pt-3 pb-5 relative justify-center">
                          {[
                            { id: 1, label: 'Planche Intro', icon: '>>', offset: '-translate-x-12', challenge: 'Hold a posture tuck planche for 5 seconds!', details: 'Excellent job. This introduction settles the correct weight-to-lean vectors.' },
                            { id: 2, label: 'Core Ignition', icon: '📖', offset: 'translate-x-0', challenge: 'Complete 15 slow hollow body hold rocks!', details: 'Improve midsection compression to lift your lower legs into the horizon.' },
                            { id: 3, label: 'Treasure Chest', icon: '🎁', offset: 'translate-x-12', challenge: 'Claim standard chest items!', details: 'Bonus loot. Grants immediate crystal elements to unlock advanced training templates.' },
                            { id: 4, label: 'L-Sit Preparation', icon: '🔒', offset: 'translate-x-0', challenge: 'Complete 30 seconds of high parallette dips!', details: 'Build scapula compression to elevate hips high.' },
                            { id: 5, label: 'Masterclass holds', icon: '🏆', offset: '-translate-x-12', challenge: 'Hold full straddle balance planche for 3 seconds!', details: 'The direct ultimate performance test for professional athletes.' }
                          ].map((node) => {
                            const isDone = node.id < duoProgress;
                            const isActive = node.id === duoProgress;
                            const isLocked = node.id > duoProgress;

                            return (
                              <div key={node.id} className={`relative flex flex-col items-center leading-none ${node.offset}`}>
                                
                                {/* Speech Bubble Overlay above current active node */}
                                {isActive && (
                                  <div className="absolute -top-12 z-20 select-none animate-[bounce_1.5s_infinite] bg-white text-neutral-950 px-3 py-1.5 rounded-2xl text-[8px] font-black uppercase shadow-[0_4px_15px_rgba(0,0,0,0.4)] tracking-wider border border-neutral-100 flex items-center space-x-1 whitespace-nowrap">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#58cc02] animate-ping" />
                                    <span>JUMP HERE?</span>
                                    {/* Arrow caret below */}
                                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-white border-r border-b border-neutral-100" />
                                  </div>
                                )}

                                {/* Main Rounded Active/Done/Locked Button */}
                                <button
                                  onClick={() => {
                                    if (isLocked) {
                                      alert(`🔒 Lesson LOCKED!\nComplete stage ${duoProgress} "${node.id === 3 ? 'Treasure Chest' : 'Core Ignition'}" to proceed!`);
                                      // deduct heart life as penalty for clicking locked! Actually, let's just make them lose one heart for clicking locked but give a funny dialog
                                      setDuoLives(l => Math.max(0, l - 1));
                                      if (duoLives <= 1) {
                                        alert('💀 Wasted! No Hearts remaining. Click Hearts icon in the top header to restock for 50 💎!');
                                      }
                                    } else {
                                      setActiveChallNode({
                                        id: node.id,
                                        title: node.label,
                                        challenge: node.challenge,
                                        details: node.details
                                      });
                                    }
                                  }}
                                  className={`w-15 h-15 rounded-full font-sans font-black flex items-center justify-center transition-all duration-300 relative select-none ${
                                    isDone 
                                      ? 'bg-gradient-to-b from-[#ffd900] to-[#e6b800] text-black shadow-[0_5px_0_#b38f00] active:translate-y-[5px] active:shadow-none' 
                                      : isActive
                                        ? 'bg-gradient-to-b from-[#58cc02] to-[#46a302] text-white shadow-[0_5px_0_#378001] active:translate-y-[5px] active:shadow-none ring-4 ring-[#58cc02]/25 animate-[pulse_2s_infinite]'
                                        : 'bg-neutral-900 border-2 border-neutral-800 text-neutral-600 shadow-[0_5px_0_#262626] cursor-not-allowed opacity-50'
                                  }`}
                                  style={{
                                    transition: 'transform 0.1s, box-shadow 0.1s'
                                  }}
                                >
                                  {/* Custom icons inside buttons */}
                                  <span className="text-xl">
                                    {isDone ? '★' : isLocked ? '🔒' : node.id === 3 ? '🎁' : node.icon}
                                  </span>
                                </button>
                                
                                {/* Label of the lesson below */}
                                <span className="text-[8.5px] font-mono font-bold tracking-tight text-neutral-400 mt-2 block select-all">
                                  {node.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Interactive Task Dialog Popover detailed pane */}
                        {activeChallNode && (
                          <div className="mt-4 p-4.5 bg-neutral-900 border border-neutral-800 rounded-3xl text-left animate-fade-in shadow-xl select-none relative">
                            <div className="absolute top-3 right-3">
                              <button 
                                onClick={() => setActiveChallNode(null)}
                                className="w-6 h-6 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
                              >
                                ×
                              </button>
                            </div>
                            
                            <span className="text-[9px] font-mono font-black text-red-500 uppercase tracking-widest block mb-1">
                              {activeChallNode.id < duoProgress ? "✓ COMPLETED QUIZ" : activeChallNode.id === duoProgress ? "⚡ ACTIVE CHALLENGE" : "🔒 LOCKED"}
                            </span>
                            
                            <h5 className="text-[13.5px] font-black text-white uppercase tracking-wider mb-2">{activeChallNode.title}</h5>
                            <p className="text-[11px] text-neutral-400 mb-3.5 leading-relaxed">{activeChallNode.details}</p>
                            
                            <div className="bg-neutral-950 border border-neutral-800/80 rounded-2xl p-3 mb-4">
                              <span className="text-[8px] font-mono text-neutral-500 uppercase block mb-1">TASK GOAL REQUIREMENTS:</span>
                              <p className="text-[11px] font-sans font-bold text-[#d4ff1a] flex items-center gap-2">
                                <span>{activeChallNode.id === 3 ? '🎁' : '🏋️'}</span>
                                <span className="select-all">{activeChallNode.challenge}</span>
                              </p>
                            </div>

                            {activeChallNode.id === duoProgress ? (
                              <button
                                onClick={() => {
                                  if (duoLives <= 0) {
                                    alert('❌ Cannot complete lesson! You have 0 Hearts ❤️. Refill in top status bar first!');
                                    return;
                                  }
                                  // Play complete animation, add gems, advance level!
                                  const prize = activeChallNode.id === 3 ? 100 : 50;
                                  setDuoGems(prev => prev + prize);
                                  setDuoProgress(prev => Math.min(prev + 1, 6));
                                  setActiveChallNode(null);
                                  alert(`🎉 SMASHED IT!\nYou successfully completed the custom action:\n"${activeChallNode.challenge}"\n\n💎 +${prize} EZ Gems added to resources!`);
                                }}
                                className="w-full py-3 bg-[#58cc02] hover:bg-[#46a302] text-white font-mono font-black text-[10px] tracking-widest rounded-xl transition cursor-pointer text-center block shadow-[0_3px_0_#419a02] active:translate-y-[2px] active:shadow-none"
                              >
                                {activeChallNode.id === 3 ? `OPEN CHEST (+100 💎)` : `COMPLETE DRILL (+50 💎)`}
                              </button>
                            ) : (
                              <button
                                onClick={() => setActiveChallNode(null)}
                                className="w-full py-3 bg-neutral-850 hover:bg-neutral-800 text-neutral-300 font-mono font-bold text-[10px] rounded-xl transition cursor-pointer text-center block"
                              >
                                REVIEW STAGE
                              </button>
                            )}
                          </div>
                        )}

                        <div className="bg-neutral-950 border border-neutral-900 rounded-[1.5rem] p-4 text-center mt-3">
                          <span className="text-[10px] font-mono font-black text-red-500 block">✦ NEXT CLASH IN 1H 24M ✦</span>
                          <p className="text-[9.5px] text-neutral-500 mt-1">Shed excess latency. Complete work on dynamic vectors to automatically synchronize your Duolingo progress rank on league standings!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 text-center rounded-[2rem] border border-dashed border-neutral-900 bg-neutral-950/40 p-4 select-none animate-fade-in">
                        <Sparkles className="w-7 h-7 text-amber-500 mx-auto mb-2.5 animate-pulse" />
                        <span className="text-[11px] text-neutral-100 uppercase tracking-tight block font-black">WARRIOR BADGES</span>
                        <div className="grid grid-cols-3 gap-2 mt-4 max-w-[240px] mx-auto">
                          {['🏆 Planche', '🏅 Muscleup', '👑 Front L.'].map((badge, idx) => (
                            <div key={idx} className="bg-neutral-950 border border-neutral-900 rounded-lg p-2 flex flex-col items-center">
                              <span className="text-xs">{badge.split(' ')[0]}</span>
                              <span className="text-[7.5px] font-mono text-neutral-400 tracking-tighter block mt-1">{badge.split(' ')[1]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : profileSubScreen === 'settings' ? (
                /* ================= SETTINGS MAIN SECTION ================= */
                <div className="flex-1 flex flex-col justify-start animate-fade-in">
                  
                  {/* Settings Header */}
                  <div className="flex items-center justify-between mb-6 mt-2">
                    <button 
                      onClick={() => setProfileSubScreen('profile')} 
                      className="w-8.5 h-8.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-black text-white uppercase tracking-wider">Settings</span>
                    <div className="w-8.5 h-8.5 opacity-0" />
                  </div>

                  {/* Profile Edit Quick Entry banner */}
                  <div 
                    onClick={() => setProfileSubScreen('edit_profile')}
                    className="flex justify-between items-center bg-neutral-950 border border-neutral-900 rounded-[1.8rem] p-4.5 mb-5 hover:border-neutral-800 active:scale-98 transition cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-800 bg-neutral-950">
                        <img 
                          src={athleteAvatar} 
                          alt="avatar" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                      <div>
                        <span className="text-[13px] font-black text-white leading-none block">{profileName}</span>
                        <span className="text-[10px] text-neutral-500 block mt-1">@{profileUsername}</span>
                      </div>
                    </div>
                    
                    <span className="text-[9.5px] px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 font-mono font-bold text-[#d4ff1a]">
                      EDIT✓
                    </span>
                  </div>

                  {/* Options Settings Blocks */}
                  <div className="space-y-3.5 flex-1 overflow-y-auto pr-0.5 scrollbar-none">
                    <span className="text-[9px] uppercase font-mono font-black text-neutral-500 block tracking-widest pl-1">PREFERENCES</span>

                    {/* Reminders Toggle */}
                    <div className="flex justify-between items-center p-4 rounded-[1.5rem] bg-neutral-950 border border-neutral-900">
                      <div className="max-w-[70%] text-left">
                        <span className="text-xs font-bold text-white block">Daily Reminder Alerts</span>
                        <span className="text-[9.5px] text-neutral-500 block mt-0.5">Stay regular with notifications</span>
                      </div>
                      <button 
                        onClick={() => setDailyReminders(!dailyReminders)}
                        className={`w-9.5 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${dailyReminders ? 'bg-red-650' : 'bg-neutral-800'}`}
                      >
                        <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-md transition-transform transform ${dailyReminders ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Biometrics Sync Toggle */}
                    <div className="flex justify-between items-center p-4 rounded-[1.5rem] bg-neutral-950 border border-neutral-900">
                      <div className="max-w-[70%] text-left">
                        <span className="text-xs font-bold text-white block">Biometric Sync</span>
                        <span className="text-[9.5px] text-neutral-500 block mt-0.5">Connect external wearables</span>
                      </div>
                      <button 
                        onClick={() => setBiometricSync(!biometricSync)}
                        className={`w-9.5 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${biometricSync ? 'bg-red-650' : 'bg-neutral-800'}`}
                      >
                        <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-md transition-transform transform ${biometricSync ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Dark Mode toggle */}
                    <div className="flex justify-between items-center p-4 rounded-[1.5rem] bg-neutral-950 border border-neutral-900">
                      <div className="max-w-[70%] text-left">
                        <span className="text-xs font-bold text-white block">Stealth Glow Mode</span>
                        <span className="text-[9.5px] text-neutral-500 block mt-0.5">High contrast dark aesthetics</span>
                      </div>
                      <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-9.5 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${darkMode ? 'bg-red-650' : 'bg-neutral-800'}`}
                      >
                        <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-md transition-transform transform ${darkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Language selector simulated dropdown */}
                    <div className="flex justify-between items-center p-4 rounded-[1.5rem] bg-neutral-950 border border-neutral-900">
                      <div className="text-left">
                        <span className="text-xs font-bold text-white block">System Language</span>
                        <span className="text-[9.5px] text-neutral-500 block mt-0.5">Localization string package</span>
                      </div>
                      <select 
                        value={currentLanguage} 
                        onChange={(e) => setCurrentLanguage(e.target.value)}
                        className="bg-neutral-900 border border-neutral-800 text-[10px] uppercase font-mono font-bold text-red-500 rounded-lg py-1 px-2 focus:outline-none"
                      >
                        <option value="English">EN (US)</option>
                        <option value="Ukrainian">UA (Київ)</option>
                        <option value="Spanish">ES (Spain)</option>
                        <option value="German">DE (Deutsch)</option>
                      </select>
                    </div>

                    <span className="text-[9px] uppercase font-mono font-black text-neutral-500 block tracking-widest pl-1 pt-2">SUPPORT</span>

                    <button 
                      onClick={() => alert(`ℹ️ Feedback Portal:\nFor queries related to biometric metrics sync, reach out using the registered handle @${profileUsername} to support@calnic.fit.`)}
                      className="w-full text-left flex justify-between items-center p-4 rounded-[1.5rem] bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 text-neutral-300">
                        <HelpCircle className="w-4 h-4 text-neutral-500" />
                        <span className="text-xs font-bold">Frequently Asked Questions</span>
                      </div>
                      <span className="text-xs text-neutral-600">→</span>
                    </button>

                    <button 
                      onClick={() => alert('📄 Agreement terms: Dynamic sensor loops are kept on local machine variables for zero network leakage.')}
                      className="w-full text-left flex justify-between items-center p-4 rounded-[1.5rem] bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 text-neutral-300">
                        <FileText className="w-4 h-4 text-neutral-500" />
                        <span className="text-xs font-bold">Terms of Service / Privacy</span>
                      </div>
                      <span className="text-xs text-neutral-600">→</span>
                    </button>
                    
                    {/* Logout Button */}
                    <button 
                      onClick={() => {
                        if(confirm('Disconnect active calisthenics sessions?')) {
                          alert(`Successfully signed out from @${profileUsername}!`);
                          setProfileSubScreen('profile');
                        }
                      }}
                      className="w-full mt-4 py-3.5 bg-neutral-900 hover:bg-red-950/20 text-red-500 hover:text-red-400 font-mono font-black text-[10px] tracking-widest rounded-2xl border border-neutral-800 hover:border-red-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>DISCONNECT ACCOUNT</span>
                    </button>
                  </div>

                </div>
              ) : (
                /* ================= EDIT PROFILE SECTION ================= */
                <div className="flex-1 flex flex-col justify-start animate-fade-in text-left">
                  
                  {/* Edit Header */}
                  <div className="flex items-center justify-between mb-6 mt-2">
                    <button 
                      onClick={() => setProfileSubScreen('settings')} 
                      className="w-8.5 h-8.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-black text-white uppercase tracking-wider">Edit Profile</span>
                    <div className="w-8.5 h-8.5 opacity-0" />
                  </div>

                  {/* Profile Avatar Editor simulation */}
                  <div className="flex flex-col items-center text-center mb-6 select-none relative">
                    <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-red-600 to-neutral-800 flex items-center justify-center">
                      <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950 relative group">
                        <img 
                          src={athleteAvatar} 
                          alt="Avatar" 
                          className="w-full h-full object-cover group-hover:opacity-40 transition"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition cursor-pointer">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      {/* Interactive overlay button */}
                      <button 
                        onClick={() => alert('📷 Avatar sync trigger: Profile photo successfully updated!')}
                        className="absolute bottom-0 right-0 w-7 h-7 bg-red-650 hover:bg-red-700 text-white rounded-full flex items-center justify-center border-2 border-neutral-950 shadow-lg cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[8px] text-neutral-500 font-mono uppercase tracking-widest mt-2">TAP OVERLAY TO UPDATE IMAGE</span>
                  </div>

                  {/* Edit Profile Form Inputs */}
                  <div className="space-y-4 flex-1">
                    
                    {/* Full Name */}
                    <div>
                      <label className="text-[9px] uppercase font-mono font-bold text-neutral-500 block mb-1.5 pl-1">Full Profile Name</label>
                      <input 
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-900 focus:border-red-600 text-xs font-sans text-white rounded-xl py-3 px-3.5 transition focus:outline-none block"
                        placeholder="Alexander Carter"
                      />
                    </div>

                    {/* Username */}
                    <div>
                      <label className="text-[9px] uppercase font-mono font-bold text-neutral-500 block mb-1.5 pl-1">Handle / Username</label>
                      <input 
                        type="text"
                        value={profileUsername}
                        onChange={(e) => setProfileUsername(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-900 focus:border-red-600 text-xs font-mono text-neutral-300 rounded-xl py-3 px-3.5 transition focus:outline-none block"
                        placeholder="warrior_prime"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="text-[9px] uppercase font-mono font-bold text-neutral-500 block mb-1.5 pl-1">Credentials Phone Contact</label>
                      <input 
                        type="text"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-900 focus:border-red-600 text-xs font-sans text-white rounded-xl py-3 px-3.5 transition focus:outline-none block"
                        placeholder="+1 (555) 019-2834"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[9px] uppercase font-mono font-bold text-neutral-500 block mb-1.5 pl-1">Registered Email Address</label>
                      <input 
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-900 focus:border-red-600 text-xs font-sans text-neutral-300 rounded-xl py-3 px-3.5 transition focus:outline-none block"
                        placeholder="warrior@calisthenics.fit"
                      />
                    </div>

                    {/* Action save/cancel */}
                    <div className="grid grid-cols-2 gap-3 pt-3">
                      
                      <button
                        onClick={() => setProfileSubScreen('settings')}
                        className="py-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-neutral-200 font-mono font-black text-[9px] tracking-wider rounded-xl border border-neutral-800 active:scale-95 transition cursor-pointer"
                      >
                        CANCEL
                      </button>

                      <button
                        onClick={() => {
                          if (!profileName.trim()) {
                            alert('⚠️ Profile name cannot be blank!');
                            return;
                          }
                          setProfileSubScreen('profile');
                          alert('⚡ Profile metrics and credentials successfully updated on-device!');
                        }}
                        className="py-3 bg-red-650 hover:bg-red-700 text-white font-mono font-black text-[9px] tracking-wider rounded-xl shadow-lg active:scale-95 transition cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>SAVE CHANGES</span>
                      </button>

                    </div>

                    {/* Delete simulated button */}
                    <button 
                      onClick={() => {
                        if (confirm('🚨 DANGER ZONE! Wipe all local athlete logs and reset scores?')) {
                          setProfileName('Alexander Carter');
                          setProfileUsername('warrior_prime');
                          setProfilePhone('+1 (555) 019-2834');
                          setProfileEmail(currentEmail || 'warrior@calisthenics.fit');
                          setStreakVal(0);
                          setCompletedWorkouts([]);
                          setHistoryLogs([]);
                          setProfileSubScreen('profile');
                          alert('🗑️ On-device metrics successfully cleared.');
                        }
                      }}
                      className="w-full py-2 text-center text-red-500/40 hover:text-red-500 text-[8px] font-mono uppercase tracking-widest mt-2 hover:underline transition cursor-pointer"
                    >
                      DELETE ATHLETE DATA
                    </button>

                  </div>

                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: EXPLORE SECTION (rebuilt beautifully as requested) ================= */}
          {activeTab === 'workouts' && (
            <div className="flex-1 flex flex-col justify-start animate-fade-in text-left">
              
              {/* Header section with Search bar */}
              <div className="flex justify-between items-center mb-4.5 mt-2 select-none">
                <div>
                  <span className="text-[9.5px] tracking-widest text-[#d4ff1a] font-black uppercase font-mono block">CALNICS DISCOVERY</span>
                  <span className="text-[17px] font-black text-white uppercase tracking-tight">Explore Network</span>
                </div>
                <span className="text-[8.5px] px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 font-mono text-[#d4ff1a] font-bold animate-pulse">● LIVE</span>
              </div>

              {/* Integrated Search Bar inside simulator */}
              <div className="relative mb-4 select-none">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                <input 
                  type="text"
                  placeholder="Search exercises, skills, coaches..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2 pl-9 pr-4 text-[11px] text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-red-600 font-sans"
                  readOnly // static placeholder to preserve responsive simulator bounds
                />
              </div>

              {/* Explore Quick Categories */}
              <div className="flex space-x-2 overflow-x-auto pb-3 scrollbar-none select-none">
                {['All', 'Pull', 'Push', 'Core', 'Mobility', 'Coaches'].map((cat, idx) => (
                  <span 
                    key={idx}
                    className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase transition flex-shrink-0 cursor-pointer ${
                      idx === 0 
                        ? 'bg-red-650 text-white' 
                        : 'bg-neutral-950 border border-neutral-900 text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Interactive Core Workouts in Explore Mode */}
              <div className="flex justify-between items-center mb-2.5 mt-2 select-none">
                <span className="text-[10px] uppercase font-mono text-neutral-500 font-black">AI Training Modules</span>
                <span className="text-[8.5px] text-red-500 font-mono">SCAN CAPABLE</span>
              </div>

              <div className="space-y-2.5 mb-5 select-none">
                {ACTIVITIES.map((act) => {
                  const isDone = completedWorkouts.includes(act.id);
                  return (
                    <div 
                      key={act.id}
                      className="flex justify-between items-center p-2.5 rounded-2xl border bg-neutral-950/90 border-neutral-900 hover:border-neutral-800 transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-400 select-none relative overflow-hidden">
                          {act.imageFallbackType === 'hiit' && (
                            <img 
                              src={hiitIcon} 
                              alt="HIIT" 
                              className="w-full h-full object-cover select-none animate-pulse" 
                              referrerPolicy="no-referrer" 
                            />
                          )}
                          {act.imageFallbackType === 'push' && (
                            <img 
                              src={pushIcon} 
                              alt="PUSH" 
                              className="w-full h-full object-cover select-none animate-pulse" 
                              referrerPolicy="no-referrer" 
                            />
                          )}
                          {act.imageFallbackType === 'mobility' && (
                            <img 
                              src={mobilityIcon} 
                              alt="MOB" 
                              className="w-full h-full object-cover select-none animate-pulse" 
                              referrerPolicy="no-referrer" 
                            />
                          )}
                          
                          {/* Checked indicator */}
                          {isDone && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-green-500 z-10">
                              <CheckCircle className="w-5 h-5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h5 className="text-[11.5px] font-bold text-white leading-snug">{act.title}</h5>
                          <div className="flex items-center space-x-2 text-[9px] text-neutral-400 font-mono mt-0.5">
                            <span className="flex items-center gap-0.5">{act.duration}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-red-500 font-bold">{act.calories} Kcal</span>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleStartWorkout(act)}
                        className={`px-3 py-1.5 rounded-lg font-bold text-[9px] uppercase tracking-wider transition cursor-pointer ${
                          isDone 
                            ? 'bg-neutral-900 border border-neutral-800 text-neutral-500' 
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-md active:scale-95'
                        }`}
                        disabled={isDone}
                      >
                        {isDone ? 'Done' : 'Start'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Form Scan Feature Banner */}
              <div className="bg-gradient-to-r from-red-950/20 to-neutral-950 border border-red-500/15 rounded-[1.5rem] p-4.5 mb-5 relative overflow-hidden select-none">
                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-16 h-16 bg-red-600/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5 max-w-[70%]">
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-bold block w-fit">REALTIME AI SCAN</span>
                    <h5 className="text-xs font-black text-white uppercase leading-tight">Camera Form Recognition</h5>
                    <p className="text-[9.5px] text-neutral-400 leading-normal">Snap or scan your posture live on steady pullups & planches for feedback.</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
                    <Video className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Masterclass details */}
              <div className="mb-3 select-none">
                <span className="text-[10px] uppercase font-mono text-neutral-500 font-black">Featured Masterclass</span>
              </div>

              <div className="bg-neutral-950 border border-neutral-900 rounded-[1.5rem] p-3.5 relative overflow-hidden select-none">
                <div className="flex items-center space-x-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 select-none overflow-hidden relative">
                    <img 
                      src={archerIcon} 
                      alt="Front Lever" 
                      className="w-full h-full object-cover select-none opacity-40" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-x-0 bottom-0 py-0.5 bg-black/75 text-[7px] text-center font-mono font-bold uppercase text-red-400 select-none">Lever</div>
                    <Play className="w-4 h-4 text-white absolute self-center" />
                  </div>
                  <div>
                    <h5 className="text-[11.5px] font-black text-white uppercase">Front Lever Progression</h5>
                    <p className="text-[9.5px] text-neutral-500 mt-0.5 leading-tight">Master horizontal holds with Coach Ilya. Pro coaching insights included.</p>
                    <div className="flex space-x-2 mt-1.5 text-[8.5px] font-mono text-[#d4ff1a] font-bold">
                      <span>⭐ 4.9 Coach Rating</span>
                      <span>•</span>
                      <span>6 Modules</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Floating App Navigation Bar Bottom */}
        <div className="bg-neutral-950/95 border-t border-neutral-900 h-[64px] flex items-center justify-around px-2 pb-2.5 relative select-none">
          
          {/* Navigation Tab: Home */}
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-11 h-11 transition ${
              activeTab === 'home' ? 'text-red-500' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[7.5px] mt-0.5 font-sans font-bold">Home</span>
          </button>

          {/* Navigation Tab: Strength Analytics */}
          <button 
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center justify-center w-11 h-11 transition ${
              activeTab === 'progress' ? 'text-red-500' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-[7.5px] mt-0.5 font-sans font-bold">Progress</span>
          </button>

          {/* Floating Center Calnic Big Red Action Button */}
          <div className="relative -top-3 w-14 h-14 rounded-full bg-black border-[4px] border-neutral-950 z-20 flex items-center justify-center">
            <button 
              onClick={() => {
                setShowComingSoon(true);
              }}
              className="w-full h-full rounded-full bg-red-600 text-white flex items-center justify-center transition active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
              style={{
                background: 'radial-gradient(ellipse at center, #ff2222 0%, #bb0000 100%)'
              }}
              aria-label="Launch Action Launcher"
            >
              {/* Inner Triangle Logo (Replicating Screenshot Triangle Logo) */}
              <svg className="w-6.5 h-6.5 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4" />
                <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                <polygon points="50,22 75,66 25,66" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" fill="none" />
                <polygon points="50,38 64,62 36,62" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
            <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping pointer-events-none -z-10" />
          </div>

          {/* Explore Tab Button */}
          <button 
            onClick={() => setActiveTab('workouts')}
            className={`flex flex-col items-center justify-center w-11 h-11 transition ${
              activeTab === 'workouts' ? 'text-red-500' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[7.5px] mt-0.5 font-sans font-bold">Explore</span>
          </button>

          {/* Navigation Tab: Profile */}
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center w-11 h-11 transition ${
              activeTab === 'profile' ? 'text-red-500' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[7.5px] mt-0.5 font-sans font-bold">Profile</span>
          </button>

        </div>

      </div>

      {/* In-app Notification Modal popup inside the phone mockup */}
      {showComingSoon && (
        <div className="absolute inset-x-4 top-16 z-50 animate-fade-in bg-red-605/95 border border-red-500/30 text-white rounded-3xl p-5 shadow-[0_15px_30px_rgba(239,68,68,0.45)] flex flex-col items-center text-center space-y-1.5 backdrop-blur-md">
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest font-sans">Coming Soon</span>
          <p className="text-[10px] text-red-105 font-sans leading-relaxed">
            This advanced training metrics launcher is currently under development for the grand opening.
          </p>
        </div>
      )}

      {/* Glossy Overlay Highlight for realistic glass screen effect */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/3 to-transparent pointer-events-none" />
    </div>
  );
}
