'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card text-foreground transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 blink-brand">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary text-white shadow-sm">
                <Brain className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                MediMind AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your Intelligent Healthcare Companion. Empowering everyday wellness, symptom assessment, and fitness guidance powered by artificial intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors duration-200">Symptom Checker</Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors duration-200">Healthy Diet Plans</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors duration-200">Wellness Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Trust and Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">Legal & Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors duration-200">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors duration-200">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors duration-200">Contact Support</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Prominent Medical Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 text-warning text-xs leading-relaxed mb-8 select-none">
          <p className="font-semibold mb-1">⚠️ IMPORTANT MEDICAL DISCLAIMER</p>
          <p>
            MediMind AI provides educational healthcare information only and is not a substitute for professional medical diagnosis, treatment, or emergency care. Always consult qualified healthcare professionals for medical concerns, prescription changes, or acute symptoms. Do not disregard professional medical advice or delay seeking it because of information found on this application.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-border/60 pt-6 text-xs text-muted-foreground gap-4">
          <div className="flex items-center gap-1">
            <span>© {currentYear} MediMind AI. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground/85">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-heartbeat" />
            <span>for a healthier world.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
