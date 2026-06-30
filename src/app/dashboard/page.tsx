'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  User, Plus, Trash2, Check, Flame, Droplet, Clock, 
  MessageSquare, Edit2, CheckCircle2, ChevronRight, Activity, Moon
} from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dose: string;
  time: string;
  taken: boolean;
}

interface Profile {
  name: string;
  age: number;
  bloodGroup: string;
  height: string;
  weight: string;
}

interface HealthGoal {
  type: 'steps' | 'water' | 'sleep';
  current: number;
  target: number;
  unit: string;
}

export default function Dashboard() {
  const { setIsChatOpen, setChatTriggerMsg } = useTheme();
  
  // Profile state
  const [profile, setProfile] = useState<Profile>({
    name: 'Alex Carter',
    age: 28,
    bloodGroup: 'O+',
    height: '178 cm',
    weight: '72 kg'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Medication states
  const [meds, setMeds] = useState<Medication[]>([
    { id: '1', name: 'Vitamin D3', dose: '2000 IU', time: '09:00 AM', taken: false },
    { id: '2', name: 'Omega-3 Fish Oil', dose: '1000 mg', time: '01:00 PM', taken: true },
    { id: '3', name: 'Magnesium Glycinate', dose: '200 mg', time: '09:30 PM', taken: false },
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedTime, setNewMedTime] = useState('08:00 AM');

  // Goals State
  const [goals, setGoals] = useState<HealthGoal[]>([
    { type: 'steps', current: 7400, target: 10000, unit: 'steps' },
    { type: 'water', current: 1.8, target: 3.0, unit: 'Liters' },
    { type: 'sleep', current: 6.5, target: 8.0, unit: 'hours' },
  ]);

  // Saved Chats List (loaded from localStorage)
  const [savedConversations, setSavedConversations] = useState<any[]>([]);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('medimind_profile');
    if (savedProfile) {
      try { setProfile(JSON.parse(savedProfile)); } catch(e) {}
    }
    
    // Load meds from localStorage
    const savedMeds = localStorage.getItem('medimind_meds');
    if (savedMeds) {
      try { setMeds(JSON.parse(savedMeds)); } catch(e) {}
    }

    // Load goals from localStorage
    const savedGoals = localStorage.getItem('medimind_goals');
    if (savedGoals) {
      try { setGoals(JSON.parse(savedGoals)); } catch(e) {}
    }

    // Load chat history listing
    const storedChats = localStorage.getItem('medimind_chats');
    if (storedChats) {
      try {
        const chats = JSON.parse(storedChats);
        setSavedConversations(chats.filter((c: any) => c.messages.length > 0));
      } catch (e) {}
    }
  }, []);

  const saveProfile = (updated: Profile) => {
    setProfile(updated);
    localStorage.setItem('medimind_profile', JSON.stringify(updated));
  };

  const saveMeds = (updated: Medication[]) => {
    setMeds(updated);
    localStorage.setItem('medimind_meds', JSON.stringify(updated));
  };

  const saveGoals = (updated: HealthGoal[]) => {
    setGoals(updated);
    localStorage.setItem('medimind_goals', JSON.stringify(updated));
  };

  // Toggle Medication Taken status
  const handleToggleMed = (id: string) => {
    const updated = meds.map((med) => {
      if (med.id === id) {
        return { ...med, taken: !med.taken };
      }
      return med;
    });
    saveMeds(updated);
  };

  // Add new medication
  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !newMedDose.trim()) return;

    const newMed: Medication = {
      id: Date.now().toString(),
      name: newMedName.trim(),
      dose: newMedDose.trim(),
      time: newMedTime,
      taken: false
    };

    const updated = [...meds, newMed];
    saveMeds(updated);
    
    // Reset fields
    setNewMedName('');
    setNewMedDose('');
    setNewMedTime('08:00 AM');
  };

  // Delete medication
  const handleDeleteMed = (id: string) => {
    const updated = meds.filter((med) => med.id !== id);
    saveMeds(updated);
  };

  // Increment wellness goals (e.g. +1 cup water, +1000 steps)
  const handleIncrementGoal = (type: 'steps' | 'water' | 'sleep') => {
    const updated = goals.map((goal) => {
      if (goal.type === type) {
        let amt = 0;
        if (type === 'steps') amt = 1000;
        if (type === 'water') amt = 0.25;
        if (type === 'sleep') amt = 0.5;
        
        const nextVal = Math.min(goal.current + amt, goal.target + (type === 'water' ? 2 : 5000));
        // Keep to 2 decimals for water
        return { ...goal, current: type === 'water' ? parseFloat(nextVal.toFixed(2)) : nextVal };
      }
      return goal;
    });
    saveGoals(updated);
  };

  // Open Chat with selected past conversation
  const handleReloadChatSession = (title: string) => {
    setIsChatOpen(true);
    setChatTriggerMsg(`Reloading saved topic: ${title}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Welcome banner */}
      <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/15 to-transparent border border-primary/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome back, {profile.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Track your daily medication schedule, adjust hydration goals, or check query logs with your companion.
          </p>
        </div>
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white text-xs font-semibold shadow-md shadow-primary/20 hover:opacity-95 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 animate-pulse" />
          <span>Consult AI Assistant</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PROFILE & GOALS (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* User Profile Card */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold tracking-wider uppercase text-foreground">Health Profile</h2>
              <button 
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {isEditingProfile ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => saveProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-primary text-foreground"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground">Age</label>
                    <input
                      type="number"
                      value={profile.age}
                      onChange={(e) => saveProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                      className="w-full bg-background border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground">Blood Group</label>
                    <input
                      type="text"
                      value={profile.bloodGroup}
                      onChange={(e) => saveProfile({ ...profile, bloodGroup: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground">Height</label>
                    <input
                      type="text"
                      value={profile.height}
                      onChange={(e) => saveProfile({ ...profile, height: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground">Weight</label>
                    <input
                      type="text"
                      value={profile.weight}
                      onChange={(e) => saveProfile({ ...profile, weight: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="w-full py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity mt-2 cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center text-primary shadow-inner">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">{profile.name}</h3>
                  <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Blood Type: {profile.bloodGroup} • Age: {profile.age}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Height: {profile.height} • Weight: {profile.weight}</p>
                </div>
              </div>
            )}
          </div>

          {/* Daily Health Targets / Goals */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-6">
            <h2 className="text-sm font-bold tracking-wider uppercase text-foreground">Daily Wellness Goals</h2>
            
            <div className="space-y-4">
              {goals.map((goal) => {
                const percent = Math.min(Math.round((goal.current / goal.target) * 100), 100);
                
                return (
                  <div key={goal.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        {goal.type === 'steps' && <Flame className="w-4 h-4 text-orange-500" />}
                        {goal.type === 'water' && <Droplet className="w-4 h-4 text-blue-500" />}
                        {goal.type === 'sleep' && <Moon className="w-4 h-4 text-indigo-500" />}
                        <span className="capitalize">{goal.type}</span>
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Progress Bar Container */}
                      <div className="flex-1 h-2 bg-foreground/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            goal.type === 'steps' ? 'bg-orange-500' : goal.type === 'water' ? 'bg-blue-500' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      
                      {/* Plus Incrementor */}
                      <button
                        onClick={() => handleIncrementGoal(goal.type)}
                        className="p-1 rounded-md border border-border hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title={`Log ${goal.type === 'steps' ? '+1000 steps' : goal.type === 'water' ? '+250ml water' : '+30mins sleep'}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MED REMINDERS & HISTORY (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Medication Tracker panel */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-sm font-bold tracking-wider uppercase text-foreground">Medication Schedule</h2>
                <p className="text-[10px] text-muted-foreground mt-0.5">Check off your daily prescription doses once taken.</p>
              </div>
            </div>

            {/* Meds List */}
            <div className="space-y-2.5">
              {meds.length === 0 ? (
                <p className="text-center text-xs text-muted-foreground py-8 border border-dashed border-border rounded-xl">
                  No active medication reminders configured.
                </p>
              ) : (
                meds.map((med) => (
                  <div
                    key={med.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      med.taken 
                        ? 'bg-success/5 border-success/20 text-muted-foreground' 
                        : 'bg-background border-border text-foreground hover:border-foreground/20'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <button
                        onClick={() => handleToggleMed(med.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                          med.taken 
                            ? 'bg-success border-success text-white' 
                            : 'border-border hover:border-primary bg-card'
                        }`}
                        aria-label="Toggle taken status"
                      >
                        {med.taken && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <div className="flex flex-col truncate">
                        <span className={`text-xs font-semibold ${med.taken ? 'line-through' : ''}`}>
                          {med.name}
                        </span>
                        <span className="text-[9px] text-muted-foreground mt-0.5">
                          {med.dose} • {med.time}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteMed(med.id)}
                      className="p-1 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-foreground/5 transition-colors cursor-pointer"
                      aria-label="Delete dose tracker"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add Med form */}
            <form onSubmit={handleAddMed} className="p-4 rounded-xl bg-background/50 border border-border/80 grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Medication name (e.g. Vitamin D)"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary text-foreground"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Dose (e.g. 1 pill)"
                  value={newMedDose}
                  onChange={(e) => setNewMedDose(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary text-foreground"
                  required
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Time (e.g. 9:00 AM)"
                  value={newMedTime}
                  onChange={(e) => setNewMedTime(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary text-foreground"
                  required
                />
                <button
                  type="submit"
                  className="px-3 rounded-lg bg-primary text-white hover:opacity-90 flex items-center justify-center flex-shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Saved Health Conversations & Consultations */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-6">
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-foreground">Saved Conversations</h2>
              <p className="text-[10px] text-muted-foreground mt-0.5">Resume past consultation logs with the AI.</p>
            </div>

            <div className="space-y-2.5">
              {savedConversations.length === 0 ? (
                <p className="text-center text-xs text-muted-foreground py-8 border border-dashed border-border rounded-xl">
                  No saved chat history exists yet. Open the chatbot to log consultations.
                </p>
              ) : (
                savedConversations.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleReloadChatSession(chat.title)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 hover:border-primary/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 truncate">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-semibold truncate group-hover:text-primary transition-colors">
                          {chat.title}
                        </span>
                        <span className="text-[9px] text-muted-foreground mt-0.5">
                          {chat.date} • {chat.messages.length} messages
                        </span>
                      </div>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Health Log History */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-6">
            <h2 className="text-sm font-bold tracking-wider uppercase text-foreground">Activity & Health Logs</h2>
            
            <div className="relative border-l border-border pl-5 space-y-5 ml-2">
              <div className="relative">
                <span className="absolute -left-[25px] mt-0.5 flex h-2 w-2 rounded-full bg-success" />
                <h4 className="text-xs font-semibold text-foreground">Logged vitamin supplements</h4>
                <p className="text-[9px] text-muted-foreground mt-0.5">Alex checked off Omega-3 dosage • Today at 1:15 PM</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[25px] mt-0.5 flex h-2 w-2 rounded-full bg-blue-500" />
                <h4 className="text-xs font-semibold text-foreground">Logged hydration levels</h4>
                <p className="text-[9px] text-muted-foreground mt-0.5">Alex added +500ml water tracking log • Today at 11:30 AM</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[25px] mt-0.5 flex h-2 w-2 rounded-full bg-primary" />
                <h4 className="text-xs font-semibold text-foreground">Symptom Checker lookup</h4>
                <p className="text-[9px] text-muted-foreground mt-0.5">Consulted MediMind AI on tension headache triggers • Yesterday</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
