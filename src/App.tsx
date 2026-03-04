import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Menu, 
  X, 
  Instagram, 
  Youtube, 
  Mail, 
  ArrowRight, 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  CheckCircle,
  Video,
  Settings
} from 'lucide-react';

// --- Types ---
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  category: string;
}

interface Inquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

// --- Components ---

const Navbar = ({ onAdminClick }: { onAdminClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '홈', href: '#home' },
    { name: '서비스', href: '#services' },
    { name: '포트폴리오', href: '#portfolio' },
    { name: '문의하기', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center">
        <div className="hidden md:flex items-center gap-6">
          {navLinks.slice(0, 2).map((link) => (
            <a key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors text-white">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex justify-center items-center col-span-3 md:col-span-1">
          <div className="flex flex-col items-center">
            <span className="font-signature text-7xl lowercase text-white leading-[0.4] mb-1">aurum</span>
            <span className="font-serif text-[10px] font-bold uppercase tracking-[0.8em] text-white opacity-80 pl-[0.8em]">studio</span>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end gap-6">
          {navLinks.slice(2).map((link) => (
            <a key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors text-white">
              {link.name}
            </a>
          ))}
          <button 
            onClick={onAdminClick}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>
        </div>

        <button className="md:hidden
