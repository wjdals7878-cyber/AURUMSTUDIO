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

        <button className="md:hidden absolute right-6 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-t border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-white"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-lg font-medium text-brand"
            >
              <LayoutDashboard className="w-5 h-5" /> 관리자 대시보드
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="relative z-10 text-center px-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-lg">
          VISIONS INTO <br />
          <span className="text-gradient">REALITY</span>
        </h1>
        <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
          아우룸스튜디오는 기획부터 촬영, 편집까지 모든 과정을 아우르는 전문 영상 프로덕션입니다. 
          당신의 이야기를 가장 빛나는 영상으로 담아냅니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#portfolio" className="px-8 py-4 bg-white hover:bg-zinc-200 text-zinc-950 rounded-full font-bold transition-all flex items-center gap-2">
            포트폴리오 보기 <Play className="w-4 h-4 fill-current" />
          </a>
          <a href="#contact" className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all">
            문의하기
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    { title: '기획 & 컨셉', desc: '브랜드의 핵심 가치를 분석하여 최적의 영상 전략과 시나리오를 제안합니다.', icon: <LayoutDashboard className="w-8 h-8" /> },
    { title: '전문 촬영', desc: '최첨단 장비와 전문 인력을 통해 고퀄리티 시네마틱 영상을 촬영합니다.', icon: <Video className="w-8 h-8" /> },
    { title: '포스트 프로덕션', desc: '감각적인 편집, 색보정, 사운드 디자인으로 영상의 완성도를 높입니다.', icon: <Settings className="w-8 h-8" /> },
  ];

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">OUR SERVICES</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">우리가 제공하는 <br />전문적인 가치</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="glass p-10 rounded-3xl transition-all hover:-translate-y-2">
              <div className="text-brand mb-6">{s.icon}</div>
              <h4 className="text-2xl font-bold mb-4 text-white">{s.title}</h4>
              <p className="text-white/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ items }: { items: PortfolioItem[] }) => (
  <section id="portfolio" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">PORTFOLIO</h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">최근 프로젝트</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length > 0 ? items.map((item) => (
          <div key={item.id} className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer">
            <img 
              src={item.imageUrl} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt={item.title}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-8 text-center">
              <span className="text-xs font-bold text-brand mb-2">{item.category}</span>
              <h4 className="text-xl font-bold mb-4 text-white">{item.title}</h4>
              <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white">
                <Play className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>
        )) : (
          <p className="text-white/40 col-span-full text-center py-20 border border-dashed border-white/10 rounded-3xl">등록된 포트폴리오가 없습니다.</p>
        )}
      </div>
    </div>
  </section>
);

const Gallery = () => {
  // 사용자의 현재 파일 상황 (setup1.jpg.jpg 등)에 맞춘 경로입니다.
  const images = [
    { src: '/setup1.jpg.jpg', title: '현장 셋업 및 장비 구성', category: 'Setup' },
    { src: '/setup2.jpg.jpg', title: '촬영 준비 및 조명 세팅', category: 'Production' },
    { src: '/setup3.jpg.jpg', title: '디테일 모니터링', category: 'Directing' },
    { src: '/setup4.jpg.jpg', title: '최종 촬영 진행', category: 'Shooting' }
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-brand uppercase tracking-[0.3em] mb-4">BEHIND THE SCENES</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white">현장의 순간들</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          <div className="md:col-span-8 md:row-span-2 relative group rounded-3xl overflow-hidden border border-white/5">
            <img src={images[0].src} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end">
              <span className="text-brand font-bold text-xs uppercase mb-2">{images[0].category}</span>
              <h4 className="text-white text-3xl font-bold">{images[0].title}</h4>
            </div>
          </div>

          <div className="md:col-span-4 relative group rounded-3xl overflow-hidden border border-white/5">
            <img src={images[1].src} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
              <h4 className="text-white text-xl font-bold">{images[1].title}</h4>
            </div>
          </div>

          <div className="md:col-span-4 relative group rounded-3xl overflow-hidden border border-white/5">
            <img src={images[2].src} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
              <h4 className="text-white text-xl font-bold">{images[2].title}</h4>
            </div>
          </div>

          <div className="md:col-span-12 relative group rounded-3xl overflow-hidden border border-white/5 h-[300px]">
            <img src={images[3].src} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end">
              <h4 className="text-white text-2xl font-bold">{images[3].title}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">CONTACT US</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8">새로운 프로젝트를 <br />시작할 준비가 되셨나요?</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand"><Mail /></div>
              <div><p className="text-xs opacity-40">Email</p><p className="font-bold">contact@aurumstudio.com</p></div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand"><Instagram /></div>
              <div><p className="text-xs opacity-40">Instagram</p><p className="font-bold">@aurum_studio_official</p></div>
            </div>
          </div>
        </div>

        <div className="glass p-10 rounded-3xl">
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle className="w-16 h-16 text-brand mx-auto mb-4" />
              <h4 className="text-white text-2xl font-bold">전송 완료!</h4>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                required placeholder="성함 / 업체명" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              />
              <input 
                required type="email" placeholder="이메일" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              />
              <textarea 
                required rows={5} placeholder="문의 내용" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand resize-none"
                value={form.message} onChange={e => setForm({...form, message: e.target.value})}
              />
              <button className="w-full py-4 bg-white text-zinc-950 rounded-xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                문의 보내기 <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const AdminDashboard = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col">
      <header className="border-b border-white/10 p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">ADMIN DASHBOARD</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white"><X /></button>
      </header>
      <main className="flex-1 p-8 text-center text-white/40">
        <p>관리 시스템 준비 중입니다.</p>
      </main>
    </div>
  );
};

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover opacity-30" alt=""
        />
      </div>

      <div className="relative z-10">
        <Navbar onAdminClick={() => setIsAdminOpen(true)} />
        <main>
          <Hero />
          <Services />
          <Portfolio items={[]} />
          <Gallery />
          <Contact />
        </main>
        <footer className="py-12 border-t border-white/10 text-center text-white/20 text-sm">
          © 2026 Aurum Studio. All rights reserved.
        </footer>
      </div>

      {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
}
