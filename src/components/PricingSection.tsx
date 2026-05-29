import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, Sparkles, HelpCircle, ShieldCheck, Zap, 
  CreditCard, Flame, Info, Star, Award, Gift, ArrowRight, X
} from 'lucide-react';

interface PricingTier {
  name: string;
  badge: string;
  badgeIcon: React.ReactNode;
  billingText: string;
  price: string;
  strikePrice?: string;
  discountTip?: string;
  features: Array<{ text: string; isBonus?: boolean }>;
  buttonText: string;
  popular: boolean;
  color: string;
  glowColor: string;
}

export default function PricingSection() {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [billingCycle, setBillingCycle] = useState<'all' | 'monthly' | 'yearly'>('all');
  const [paymentStep, setPaymentStep] = useState<'checkout' | 'success'>('checkout');
  const [promoCode, setPromoCode] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  
  const tiers: PricingTier[] = [
    {
      name: "Monthly",
      badge: "💡 Try It First",
      badgeIcon: <Sparkles className="w-3.5 h-3.5 text-blue-400" />,
      billingText: "billed monthly",
      price: "$12.99",
      features: [
        { text: "Intelligent Workout Routine Builder" },
        { text: "Calisthenics Form AI Scan Camera" },
        { text: "Nutrient & Calorie Barcode Scan" },
        { text: "Advanced Performance Analytics" },
        { text: "Automatic Daily Streak Tracker" }
      ],
      buttonText: "Get Monthly Access",
      popular: false,
      color: "#3b82f6",
      glowColor: "rgba(59, 130, 246, 0.2)"
    },
    {
      name: "Quarterly",
      badge: "🔥 Popular Choice",
      badgeIcon: <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />,
      billingText: "billed every 3 months",
      strikePrice: "$79.99",
      price: "$42.99",
      discountTip: "💡 Save 50% now",
      features: [
        { text: "Intelligent Workout Routine Builder" },
        { text: "Calisthenics Form AI Scan Camera" },
        { text: "Nutrient & Calorie Barcode Scan" },
        { text: "Advanced Performance Analytics" },
        { text: "Automatic Daily Streak Tracker" },
        { text: "Calnics Monthly digital fitness guide (value $42.99)", isBonus: true },
        { text: "Access to private athlete Telegram network", isBonus: true },
        { text: "Locked-In Price // your price never changes", isBonus: true },
        { text: "⭐ Priority AI Updates", isBonus: true }
      ],
      buttonText: "Get Quarterly Access",
      popular: true,
      color: "#ef4444",
      glowColor: "rgba(239, 68, 68, 0.25)"
    },
    {
      name: "Yearly",
      badge: "🏆 Best Value",
      badgeIcon: <Award className="w-3.5 h-3.5 text-amber-500" />,
      billingText: "billed yearly",
      strikePrice: "$259.99",
      price: "$129.99",
      discountTip: "💡 Save 50% now",
      features: [
        { text: "Intelligent Workout Routine Builder" },
        { text: "Calisthenics Form AI Scan Camera" },
        { text: "Nutrient & Calorie Barcode Scan" },
        { text: "Advanced Performance Analytics" },
        { text: "Automatic Daily Streak Tracker" },
        { text: "Calnics Monthly digital fitness guide (value $129.99)", isBonus: true },
        { text: "Access to private athlete Telegram network", isBonus: true },
        { text: "Locked-In Price // your price never changes", isBonus: true },
        { text: "⭐ Priority AI Updates", isBonus: true }
      ],
      buttonText: "Get Yearly Access",
      popular: false,
      color: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.2)"
    }
  ];

  const handleSubscribe = (tier: PricingTier) => {
    setSelectedTier(tier);
    setPaymentStep('checkout');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('success');
  };

  return (
    <section id="premium-membership-pricing" className="w-full bg-black py-16 md:py-24 border-t border-neutral-900 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* SECTION HEADER BLOCK */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-4 mb-16">
        
        {/* Company Branded Headliner */}
        <div className="flex items-center space-x-3 bg-neutral-900/60 border border-neutral-800/80 px-4 py-2 rounded-full mb-2">
          <img 
            src="/1.png" 
            alt="Calnics Logo" 
            className="w-5 h-5 object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback logo symbol if standard image file isn't populated on disk yet
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            CALNICS TRAINING SYSTEMS PRO
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
          CHOOSE YOUR <span className="text-red-500">TRAINING TIERS</span>
        </h2>
        
        <p className="text-sm text-neutral-400 max-w-xl leading-relaxed">
          Level up with full-spectrum calisthenics algorithms, daily sequence players, custom trainer advice pools, and premium library vaults. Cancel anytime.
        </p>

        {/* Dynamic switcher tabs */}
        <div className="flex bg-neutral-950 p-1 rounded-full border border-neutral-900 mt-4">
          <button 
            onClick={() => setBillingCycle('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
              billingCycle === 'all' 
                ? 'bg-neutral-900 text-white border-b border-red-500/50' 
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            All Plans
          </button>
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
              billingCycle === 'monthly' 
                ? 'bg-neutral-900 text-white border-b border-red-500/50' 
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Shorter Commitment
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
              billingCycle === 'yearly' 
                ? 'bg-neutral-900 text-white border-b border-red-500/50' 
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Most Popular / Best Value
          </button>
        </div>
      </div>

      {/* PRICING CARDS ROW GRID */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {tiers
          .filter(t => {
            if (billingCycle === 'monthly') return t.name === 'Monthly';
            if (billingCycle === 'yearly') return t.name !== 'Monthly';
            return true;
          })
          .map((tier) => {
            const hasDiscount = !!tier.strikePrice;
            return (
              <motion.div
                key={tier.name}
                id={`pricing-card-${tier.name.toLowerCase()}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`rounded-[2rem] bg-neutral-950 border overflow-hidden flex flex-col relative ${
                  tier.popular 
                    ? 'border-red-500/40 shadow-[0_20px_45px_-12px_rgba(239,68,68,0.18)]' 
                    : 'border-neutral-900/90 shadow-[0_15px_30px_rgba(0,0,0,0.4)]'
                }`}
                style={{
                  minHeight: '440px'
                }}
              >
                {/* Popularity Badge or highlight line */}
                {tier.popular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />
                )}

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  
                  {/* Top Header details matching requested spec */}
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-bold tracking-wider text-neutral-300 uppercase">
                      {tier.name}
                    </span>
                    <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono tracking-wider text-neutral-300">
                      {tier.badgeIcon}
                      <span>{tier.badge}</span>
                    </div>
                  </div>

                  {/* Pricing details section */}
                  <div className="mb-4">
                    {hasDiscount && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-neutral-500 line-through">
                          Cancel on {tier.strikePrice}
                        </span>
                        {tier.discountTip && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-green-950/40 text-green-400 rounded-md border border-green-500/10 uppercase">
                            {tier.discountTip}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl md:text-5xl font-black text-white tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                        / {tier.billingText}
                      </span>
                    </div>
                  </div>

                  {/* Divider line before features */}
                  <div className="h-px bg-neutral-900 w-full my-4" />

                  {/* List of high caliber training system items */}
                  <ul className="space-y-3 flex-grow my-2">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2.5 text-xs text-neutral-400">
                        {feature.isBonus ? (
                          <Star className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`${feature.isBonus ? 'text-neutral-300 font-medium' : ''}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Checkout Trigger */}
                  <button
                    onClick={() => handleSubscribe(tier)}
                    className={`w-full text-center py-3.5 mt-6 rounded-2xl font-mono text-[10.5px] uppercase tracking-widest font-extrabold transition cursor-pointer flex items-center justify-center space-x-2 ${
                      tier.popular
                        ? 'bg-red-600 text-white hover:bg-red-700 shadow-[0_5px_15px_rgba(239,68,68,0.25)]'
                        : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-850 hover:text-white border border-neutral-800'
                    }`}
                  >
                    <span>{tier.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-current" />
                  </button>

                </div>
              </motion.div>
            );
          })}
      </div>

      {/* DETAILED CHECKOUT SIMULATOR DRAWER POPUP */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTier(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-neutral-950 border border-neutral-900 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] z-10 relative"
            >
              
              {/* Close Button element */}
              <button
                onClick={() => setSelectedTier(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 flex items-center justify-center text-neutral-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {paymentStep === 'checkout' ? (
                <form onSubmit={handleCheckoutSubmit} className="p-6 md:p-8 space-y-6">
                  
                  {/* Header containing order summaries */}
                  <div>
                    <div className="flex items-center space-x-2 text-red-500 font-mono text-[9px] uppercase tracking-widest mb-1">
                      <Zap className="w-3 h-3 text-red-500" />
                      <span>SaaS SECURE GATEWAY</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                      CALNICS {selectedTier.name} PRO
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Unlock fully optimized calisthenics algorithms instantly.
                    </p>
                  </div>

                  {/* Summary row */}
                  <div className="bg-neutral-900/40 border border-neutral-900 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-400 block font-mono">ORDER SUMMARY</span>
                      <span className="text-sm text-neutral-100 font-extrabold uppercase font-sans">
                        {selectedTier.name} Member License
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black block text-red-500">{selectedTier.price}</span>
                      <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono">
                        {selectedTier.billingText}
                      </span>
                    </div>
                  </div>

                  {/* Step field labels */}
                  <div className="space-y-4">
                    
                    {/* Input 1: EMail */}
                    <div className="flex flex-col space-y-1.5 text-left">
                      <label className="text-[9.5px] font-mono uppercase text-neutral-400 tracking-wider">
                        WARRIOR EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="athlete@calnics.com"
                        className="bg-neutral-900 border border-neutral-850 hover:border-neutral-800 focus:border-red-500 text-sm text-white px-4 py-3 rounded-xl outline-none transition"
                      />
                    </div>

                    {/* Input 2: Card Credentials */}
                    <div className="flex flex-col space-y-1.5 text-left">
                      <label className="text-[9.5px] font-mono uppercase text-neutral-400 tracking-wider">
                        CARD HOLDER NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="JACK WARRIOR"
                        className="bg-neutral-900 border border-neutral-850 hover:border-neutral-800 focus:border-red-500 text-sm placeholder-neutral-600 text-white px-4 py-3 rounded-xl outline-none transition uppercase"
                      />
                    </div>

                    {/* Card grid credentials details */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col space-y-1.5 text-left">
                        <label className="text-[9.5px] font-mono uppercase text-neutral-400 tracking-wider">
                          CARD NUMBER
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            maxLength={19}
                            placeholder="4242 •••• •••• 4242"
                            className="bg-neutral-900 border border-neutral-850 hover:border-neutral-800 focus:border-red-500 text-sm placeholder-neutral-600 text-white px-4 py-3 pl-10 rounded-xl outline-none transition w-full"
                          />
                          <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col space-y-1.5 text-left">
                          <label className="text-[9.5px] font-mono uppercase text-neutral-400 tracking-wider">
                            EXP DATE
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            placeholder="MM/YY"
                            className="bg-neutral-900 border border-neutral-850 hover:border-neutral-800 focus:border-red-500 text-sm placeholder-neutral-600 text-white px-3 py-3 rounded-xl outline-none transition text-center"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5 text-left">
                          <label className="text-[9.5px] font-mono uppercase text-neutral-400 tracking-wider">
                            CVV
                          </label>
                          <input
                            type="password"
                            required
                            maxLength={3}
                            placeholder="•••"
                            className="bg-neutral-900 border border-neutral-850 hover:border-neutral-800 focus:border-red-500 text-sm placeholder-neutral-600 text-white px-3 py-3 rounded-xl outline-none transition text-center"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Promo Code input field */}
                    <div className="flex items-center space-x-2 pt-1 font-mono">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="ENTER COUPON CODE"
                        className="bg-neutral-950 border border-neutral-900 hover:border-neutral-850 focus:border-red-500 text-[10.5px] text-white px-3.5 py-2.5 rounded-lg outline-none transition uppercase w-full"
                      />
                      <button 
                        type="button" 
                        onClick={() => alert("Promo Code validated successfully! Enjoy 0% server fee override.")}
                        className="bg-neutral-900 border border-neutral-800 px-3.5 py-2.5 rounded-lg text-xs hover:text-white text-neutral-400 transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                  </div>

                  {/* Submission Action */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      className="w-full text-center py-4 rounded-xl font-mono text-[11px] uppercase tracking-widest font-extrabold hover:bg-neutral-100 bg-white text-black transition active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Pay {selectedTier.price} Securely</span>
                    </button>
                    <div className="text-center text-[9px] font-mono tracking-wider text-neutral-500 uppercase flex items-center justify-center space-x-1">
                      <span>✓ SSL ENCRYPTED GATEWAY</span>
                      <span className="text-neutral-600">•</span>
                      <span>CANCEL ANYTIME</span>
                    </div>
                  </div>

                </form>
              ) : (
                <div className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mx-auto animate-bounce mt-4">
                    <Check className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                      TRANSACTION CONFIRMED // PRO LEVEL LOADED
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                      ACCESS PERMITTED
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                      Congratulations, Warrior! Your purchase of the <strong>{selectedTier.name} Access Plan</strong> has been fully synchronized on our terminal. A secret link has been sent to <strong className="text-white">{emailInput || "your email"}</strong>.
                    </p>
                  </div>

                  <div className="bg-neutral-950/60 p-4 rounded-2xl border border-neutral-900 text-left space-y-2 max-w-sm mx-auto">
                    <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase">
                      <span>Ref Token:</span>
                      <span className="text-neutral-300">CAL_#{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase">
                      <span>Billed sum:</span>
                      <strong className="text-neutral-200">{selectedTier.price}</strong>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase">
                      <span>Status:</span>
                      <span className="text-emerald-500 font-bold font-mono">ACTIVE LICENSE</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase">
                      <span>Features active:</span>
                      <span className="text-white">All Interactive Holo Drills</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTier(null)}
                    className="w-full text-center py-3.5 rounded-xl font-mono text-[10px] uppercase tracking-widest bg-neutral-900 hover:bg-neutral-850 hover:text-white text-neutral-400 transition cursor-pointer"
                  >
                    Return to OS Dashboard
                  </button>

                </div>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
