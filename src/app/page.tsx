'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { 
  Stethoscope, Pill, Apple, Brain, Activity, ShieldAlert, 
  ShieldCheck, Heart, Lock, Shield, Sparkles, CheckCircle, ArrowRight
} from 'lucide-react';

export default function Home() {
  const { setIsChatOpen, setChatTriggerMsg, setChatTriggerCategory } = useTheme();

  const handleStartChatWithQuery = (query: string, category: string) => {
    setIsChatOpen(true);
    setChatTriggerCategory(category);
    setChatTriggerMsg(query);
  };

  const features = [
    {
      title: 'Symptom Checker',
      desc: 'Check warning signs for fever, cold, stomach ache, and more.',
      icon: Stethoscope,
      query: 'Check Symptoms',
      color: 'from-blue-500/10 to-cyan-500/10 text-blue-500 border-blue-500/20'
    },
    {
      title: 'Medication Information',
      desc: 'Understand drug dosage thresholds, uses, and side effects.',
      icon: Pill,
      query: 'Medication Info',
      color: 'from-purple-500/10 to-indigo-500/10 text-purple-500 border-purple-500/20'
    },
    {
      title: 'Nutrition Guidance',
      desc: 'Build balanced calorie/protein targets and hydration routines.',
      icon: Apple,
      query: 'Healthy Diet Plan',
      color: 'from-green-500/10 to-emerald-500/10 text-green-500 border-green-500/20'
    },
    {
      title: 'Mental Health Support',
      desc: 'Strategies for anxiety management, sleep hygiene, and mindfulness.',
      icon: Brain,
      query: 'Mental Wellness',
      color: 'from-pink-500/10 to-rose-500/10 text-pink-500 border-rose-500/20'
    },
    {
      title: 'Fitness Recommendations',
      desc: 'Tailored cardio, strength-training, and mobility splits.',
      icon: Activity,
      query: 'Fitness Tips',
      color: 'from-orange-500/10 to-amber-500/10 text-orange-500 border-orange-500/20'
    },
    {
      title: 'Disease Awareness',
      desc: 'Learn general preventive patterns for chronic illnesses.',
      icon: ShieldAlert,
      query: 'Tell me about common diseases and prevention',
      color: 'from-red-500/10 to-rose-500/10 text-red-500 border-red-500/20'
    },
    {
      title: 'First Aid Guidance',
      desc: 'Step-by-step procedures for minor burns, nosebleeds, and cuts.',
      icon: ShieldCheck,
      query: 'Emergency Guidance',
      color: 'from-teal-500/10 to-cyan-500/10 text-teal-500 border-teal-500/20'
    },
    {
      title: 'Preventive Healthcare Tips',
      desc: 'Actionable checks and health screens based on longevity research.',
      icon: Heart,
      query: 'General preventive care advice',
      color: 'from-sky-500/10 to-blue-500/10 text-sky-500 border-sky-500/20'
    }
  ];

  const trustBadges = [
    {
      title: 'Secure Conversations',
      desc: 'All chats are encrypted and stored locally on your device.',
      icon: Lock
    },
    {
      title: 'Privacy Protection',
      desc: 'Your health queries are strictly anonymous. We do not sell or store personal identity metadata.',
      icon: Shield
    },
    {
      title: 'AI-Powered Assistance',
      desc: 'Expert client-side heuristics simulate evidence-based medical literature.',
      icon: Sparkles
    },
    {
      title: 'Healthcare Information Safety',
      desc: 'Derived from trusted standards like Mayo Clinic, WHO, and AHA guidelines.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        
        {/* Floating Background Glows */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-float" />
        <div className="absolute top-1/3 right-1/10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headings & Action buttons */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Medical AI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-none">
                Welcome to <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent blink-brand inline-block">
                  MediMind AI
                </span>
              </h1>
              
              <h2 className="text-lg sm:text-xl font-bold text-foreground/90 tracking-tight">
                "Your Intelligent Healthcare Companion"
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                Get instant health insights, symptom guidance, wellness recommendations, nutrition advice, and healthcare support powered by advanced artificial intelligence.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-95 shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer"
                >
                  <span>Start Chatting with MediMind AI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#features"
                  className="flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-card hover:bg-foreground/5 text-foreground font-medium transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Column: Beautiful custom SVG illustration */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                
                {/* Glowing Outer Rings */}
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-slow scale-95" />
                <div className="absolute inset-4 rounded-full border border-secondary/15 animate-pulse-slow" style={{ animationDelay: '1s' }} />
                
                {/* Main Glass Circle */}
                <div className="absolute inset-10 rounded-full glass flex items-center justify-center shadow-lg animate-float">
                  
                  {/* Heartbeat pulse path animation */}
                  <svg className="w-48 h-48 text-primary/35 absolute" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M 0 50 L 30 50 L 38 30 L 46 70 L 52 45 L 56 55 L 62 50 L 100 50" strokeDasharray="300" strokeDashoffset="0" className="animate-pulse" />
                  </svg>

                  <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-xl shadow-primary/25">
                    <Brain className="w-14 h-14 animate-pulse-slow" />
                  </div>
                </div>

                {/* Orbiting medical items */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-card border border-border shadow-md flex items-center justify-center text-red-500 animate-float" style={{ animationDelay: '0.5s' }}>
                  <Heart className="w-5 h-5 fill-red-500 animate-heartbeat" />
                </div>
                <div className="absolute bottom-6 left-6 w-10 h-10 rounded-xl bg-card border border-border shadow-md flex items-center justify-center text-blue-500 animate-float" style={{ animationDelay: '1.2s' }}>
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-xl bg-card border border-border shadow-md flex items-center justify-center text-purple-500 animate-float" style={{ animationDelay: '1.8s' }}>
                  <Pill className="w-5 h-5" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 border-t border-border bg-card/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Intelligent Healthcare Features
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Select one of our specialized modules below to consult MediMind AI immediately on that topic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleStartChatWithQuery(feature.query, feature.title)}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center bg-gradient-to-tr ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {feature.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary group-hover:translate-x-1.5 transition-transform duration-300">
                    <span>Ask AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECURITY & TRUST SECTION */}
      <section className="py-20 border-t border-border bg-background transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left trust column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Security & Trust</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Your Health Information, Kept Encrypted.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe healthcare assistance requires maximum confidentiality. MediMind AI runs query validation logic securely, keeping chats localized and private.
              </p>
              <div className="p-4 rounded-xl border border-border glass flex items-start gap-3">
                <ShieldCheck className="w-8 h-8 text-secondary flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">Zero Cloud Storage Policy</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                    Conversations are preserved exclusively in your web browser's storage, allowing you to delete your history instantly with a single click.
                  </p>
                </div>
              </div>
            </div>

            {/* Right badges column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{badge.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{badge.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
