import { useState, useEffect } from 'react';
import { WORKOUTS, WorkoutCard } from './data/workouts';
import ThreeDCard from './components/ThreeDCard';
import PhoneSimulator from './components/PhoneSimulator';
import WaitlistForm from './components/WaitlistForm';
import AdminPortal from './components/AdminPortal';
import PricingSection from './components/PricingSection';
import { 
  Flame, Award, Eye, Code, Layers, Sparkles, Dumbbell, 
  MapPin, CheckCircle, Smartphone, ArrowDown, ChevronRight, Share2 
} from 'lucide-react';

export default function App() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'workouts' | 'progress' | 'profile'>('home');

  const activeWorkout = WORKOUTS[activeCardIndex];

  // Listener to scroll state to trigger blur navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast auto-dismiss utility
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % WORKOUTS.length);
  };

  const handlePrevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + WORKOUTS.length) % WORKOUTS.length);
  };

  const handleOnSuccess = (email: string) => {
    setUserEmail(email);
    // Automatically triggers an animation/welcome notification!
  };

  return (
    <div 
      className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-500 selection:text-white overflow-x-hidden relative transition-colors duration-1000"
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(18, 18, 18, 0.98), rgba(0, 0, 0, 1)),
          radial-gradient(ellipse at 80% 10%, ${activeWorkout.color}15 0%, transparent 50%),
          radial-gradient(ellipse at 20% 80%, ${activeWorkout.color}10 0%, transparent 50%)
        `
      }}
    >
      
      {/* Background Cyber-Tech Grid Line Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" 
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)'
        }}
      />

      {/* HEADER NAVBAR */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b select-none ${
          isScrolled 
            ? 'bg-neutral-950/70 backdrop-blur-xl py-3 border-neutral-900/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)]' 
            : 'bg-transparent py-5 border-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 group cursor-pointer select-none"
          >
            {/* Pure Raw Logo Container - no border, bg, shadows, or glow */}
            <div className="w-10 h-10 flex items-center justify-center relative transition-all duration-300">
              <img 
                src="/1.png" 
                alt="Calnics Logo" 
                className="w-full h-full object-contain transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-black tracking-[0.25em] text-white group-hover:text-red-500 transition-colors duration-300">CALNICS</span>
              <span className="text-[7.5px] font-mono tracking-widest text-neutral-500 uppercase">Interactive training OS</span>
            </div>
          </div>

          {/* Center navigation links - REMOVED */}
          <div className="hidden md:flex flex-1" />

          {/* Right Action buttons */}
          <div className="flex items-center space-x-6">
            <span className="text-[10.5px] font-mono tracking-[0.2em] text-neutral-500 uppercase select-none font-bold">
              INVITE ONLY
            </span>
          </div>

        </div>
      </header>

      {/* HERO / DECK OF CARDS VIEW SECTION */}
      <main id="interactive-holo-cards" className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-20 md:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Waitlist Submission Entry */}
          <div className="lg:col-span-6 space-y-7 md:space-y-9 flex flex-col items-start text-left">
            <div className="space-y-4">
              {/* Top micro tag */}
              <div 
                className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border border-neutral-900 bg-neutral-950/80 text-neutral-400 text-[10px] font-mono tracking-widest uppercase select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>Premium access opening soon</span>
              </div>

              {/* Massive eye catching display heading - high-fidelity typographic pairing */}
              <h1 className="text-5xl md:text-[5.5rem] font-black text-white tracking-tight leading-[0.95] font-sans flex flex-col uppercase">
                <span>Supreme</span>
                <span>strength,</span>
                <span className="text-neutral-500 font-light lowercase italic mt-1.5 select-none normal-case">perfected.</span>
              </h1>

              {/* Editorial / Swiss-modern description */}
              <p className="text-sm md:text-[14.5px] text-neutral-400 mt-6 max-w-lg leading-relaxed font-sans">
                Meet <strong className="text-white">Calnics</strong>, the AI-powered app for effortless calisthenics. Just snap a photo, scan a routine, or describe your workout for instant form and performance insights. It brings the entire calisthenics world together, giving you the complete freedom to practice, move, and grow on your own terms.
              </p>
            </div>

            {/* Waitlist form inline component */}
            <div className="w-full">
              <WaitlistForm onSuccess={handleOnSuccess} />
            </div>

            {/* Downward indicator banner linking recommended section */}
            <div className="flex items-center space-x-3 text-neutral-500 font-mono text-[10px] uppercase pt-2 select-none tracking-wider">
              <span>EXPLORE INTERACTIVE CALNICS SIMULATION</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-red-500" />
            </div>

          </div>


          {/* Right Column: High Fidelity 3D Card Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <span className="hidden md:block absolute -top-12 left-2 text-[9px] font-mono text-neutral-500 uppercase tracking-widest select-none">
              🔮 Drag or hover to inspect perspective 3D depths
            </span>
            
            <div className="w-full max-w-[430px] relative">
              
              {/* Active Backglow Ring */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000 -z-10"
                style={{ backgroundColor: activeWorkout.color }}
              />

              {/* ThreeDCard Rendering */}
              <ThreeDCard
                card={activeWorkout}
                onPrev={handlePrevCard}
                onNext={handleNextCard}
                currentIndex={activeCardIndex}
                totalCards={WORKOUTS.length}
              />
            </div>
          </div>

        </div>
      </main>

      {/* RECOMMENDED SECTION WITH PHONESIMULATION INTERACTIVE */}
      <section id="warrior-training-dashboard" className="w-full bg-neutral-950/50 border-y border-neutral-900/60 py-16 md:py-24 relative overflow-hidden">
        
        {/* Glow grid background */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: UI walkthrough details / value proposition - Dynamic depending on phone's active tag */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left min-h-[460px]">
            {activeTab === 'home' && (
              <div className="space-y-6 md:space-y-8 animate-fade-in">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#d4ff1a] uppercase font-extrabold block mb-2">
                    PERSONALIZED SYSTEM OVERVIEW
                  </span>
                  <h2 className="text-3xl md:text-4xl font-sans font-black text-white uppercase tracking-tight leading-none mb-4">
                    THE WARRIOR OS <br />
                    RECOMMENDED DASHBOARD
                  </h2>
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans max-w-xl">
                    The Calnics digital experience matches elite athletic coaching. It bundles video streaming workout loops and precise progression tracking into a beautiful, high-fidelity native application shell. Explore the interactive prototype to the right.
                  </p>
                </div>

                {/* Bento Bullet walkthrough */}
                <div className="space-y-4">
                  {/* Bullet 1 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 flex-shrink-0 animate-pulse">
                      <Flame className="w-5 h-5 text-red-500" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight">True Progression Ring</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        Tracks daily calories, workout timers, and custom calisthenics reps in a gorgeous ring model glowing with active red energy.
                      </p>
                    </div>
                  </div>

                  {/* Bullet 2 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 flex-shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight">Active Workout Streaming</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        Tap <strong className="text-white">Start</strong> on the activity list on the phone to stream tutorials and activate the automatic countdown tracker.
                      </p>
                    </div>
                  </div>

                  {/* Bullet 3 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 flex-shrink-0">
                      <Award className="w-5 h-5 text-amber-500 animate-pulse" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight font-sans font-black">Progression Analytics</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        Navigate to <strong className="text-white">Progress</strong> in the phone bar below to log your Max Pushups, update bodyweight, or inspect your custom targets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workouts' && (
              <div className="space-y-6 md:space-y-8 animate-fade-in">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#d4ff1a] uppercase font-extrabold block mb-2">
                    ATHLETIC TRAINING CHANNELS
                  </span>
                  <h2 className="text-3xl md:text-4xl font-sans font-black text-white uppercase tracking-tight leading-none mb-4">
                    DISCOVER CORE <br />
                    PROGRESSIVE SCHEMAS
                  </h2>
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans max-w-xl">
                    Explore advanced, stateful calisthenics templates structured by elite trainers. Tap the AI camera tracker or query physical routines to align posture, improve shoulder joint torque, and trigger adaptations.
                  </p>
                </div>

                {/* Bento Bullet walkthrough */}
                <div className="space-y-4">
                  {/* Bullet 1 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      <Eye className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight">Real-time Pose AI Sync</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        Simulate advanced, zero-friction pose alignment scans directly inside the viewport of your simulated mobile device.
                      </p>
                    </div>
                  </div>

                  {/* Bullet 2 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500 flex-shrink-0">
                      <Dumbbell className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight font-black">Curated Progression Paths</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        From high-velocity functional HIIT routines to structured muscleup and handstand guides, curated for immediate strength.
                      </p>
                    </div>
                  </div>

                  {/* Bullet 3 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-purple-400 flex-shrink-0">
                      <Layers className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight font-black">Granular Metadata Filtering</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        Filter modules smoothly using the integrated real-time text input search or category selector pill buttons inside the simulator.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6 md:space-y-8 animate-fade-in">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#d4ff1a] uppercase font-extrabold block mb-2">
                    ATHLETE QUANTIFIED METRICS
                  </span>
                  <h2 className="text-3xl md:text-4xl font-sans font-black text-white uppercase tracking-tight leading-none mb-4">
                    INTERACTIVE <br />
                    PERFORMANCE CURVES
                  </h2>
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans max-w-xl">
                    Transform raw physical exertion into clear, visible signals. Log your real-time performance milestones, update personal indicators, and view progress on an organic custom high-contrast SVG path.
                  </p>
                </div>

                {/* Bento Bullet walkthrough */}
                <div className="space-y-4">
                  {/* Bullet 1 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500 flex-shrink-0">
                      <Layers className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight font-black">Bezier SVG Tracking</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        An organic high-fidelity representation of your maximum pushup intervals, tracked historically across training cycles.
                      </p>
                    </div>
                  </div>

                  {/* Bullet 2 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-green-500 flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight font-black">Targets Calibration</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        Input current bodyweight parameters or modify goals dynamically inside the phone to watch success metrics re-scale automatically.
                      </p>
                    </div>
                  </div>

                  {/* Bullet 3 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 flex-shrink-0 animate-pulse">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight font-black">Local Log Persistence</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        Completed workout exercises are instantly appended into on-device histories, ensuring zero data leakage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6 md:space-y-8 animate-fade-in">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#d4ff1a] uppercase font-extrabold block mb-2">
                    GAMIFIED PHYSICAL LEAGUES
                  </span>
                  <h2 className="text-3xl md:text-4xl font-sans font-black text-white uppercase tracking-tight leading-none mb-4">
                    DUOLINGO STYLE <br />
                    ACTIVE CHALLENGES
                  </h2>
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans max-w-xl">
                    Complete challenges to scale online calisthenics leagues. Climb the winding stepper path inside the simulator to claim chest awards, manage hearts, and compete.
                  </p>
                </div>

                {/* Bento Bullet walkthrough */}
                <div className="space-y-4">
                  {/* Bullet 1 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#58cc02] flex-shrink-0 animate-bounce">
                      <Award className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight font-black">Snake Lesson Stepper Path</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        A gorgeous winding progression tree displaying finished, active, and locked calisthenics lessons like the Duolingo platform.
                      </p>
                    </div>
                  </div>

                  {/* Bullet 2 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-400 flex-shrink-0 animate-pulse">
                      <Flame className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight font-sans font-black font-black">Interactive Chest & Hearts</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        Restore shield life hearts with your earned Gems or unlock secret Chest packages to claim massive rank points.
                      </p>
                    </div>
                  </div>

                  {/* Bullet 3 */}
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-4 flex gap-4 hover:border-neutral-800 transition">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight font-black">Season Leaderboards</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        Gain EZ points to rank on global championships alongside elite warriors Anna, Sam, and Nariman.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Clickable Phone Simulator */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center w-full overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-500 mb-4 block uppercase tracking-widest select-none text-center">
              📱 CLICK TABS ON SIMULATOR PHONE TO INTERACT LIVE
            </span>
            <div className="scale-85 sm:scale-95 md:scale-100 origin-center transition-transform duration-300 w-full flex justify-center">
              <PhoneSimulator currentEmail={userEmail} onTabChange={(tab) => setActiveTab(tab)} />
            </div>
          </div>

        </div>
      </section>

      {/* PREMIUM JENNIE AI INSPRED PRICING FOR WARRIORS */}
      <PricingSection />

      {/* DEVELOPER DASHBOARD PORTAL (COLLAPSIBLE / TOGGLE OVERLAY) */}
      {(showAdmin || userEmail) && (
        <section id="developer-admin-portal" className="w-full bg-black py-16 px-6 md:px-12 border-t border-neutral-900 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <AdminPortal />
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="w-full bg-black py-12 px-6 md:px-12 border-t border-neutral-900/60 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left copyright */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
               <span className="text-xs font-black tracking-widest text-white">CALNICS TECH TRADING LTD</span>
              <span className="text-[9px] font-mono px-2 py-0.5 bg-neutral-900 text-neutral-500 uppercase rounded">V1.0</span>
            </div>
            <p className="text-[10px] font-mono text-neutral-500 mt-1 uppercase tracking-tight">
               © {new Date().getFullYear()} Calnics. All rights of athletes reserved. Made for calisthenics dudes worldwide.
            </p>
          </div>

          {/* Footer Logo symbol */}
          <div className="w-10 h-10 rounded-full border border-neutral-900 bg-neutral-950 flex items-center justify-center text-neutral-500 hover:text-red-500 transition-colors">
            <svg className="w-6.5 h-6.5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="3" />
              <polygon points="50,25 73,65 27,65" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </div>

        </div>
      </footer>

      {/* Premium Floating Status Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in bg-neutral-950/95 border border-neutral-800 text-neutral-200 text-xs font-mono py-3 px-5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center space-x-2.5 border-l-2 border-l-red-500 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
