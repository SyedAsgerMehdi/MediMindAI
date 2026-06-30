'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatOverlay from './ChatOverlay';
import { useTheme } from '../context/ThemeContext';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { setIsChatOpen } = useTheme();

  return (
    <>
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatOverlay />
    </>
  );
}
