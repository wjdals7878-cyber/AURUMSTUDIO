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
  ExternalLink,
  Video,
  Settings,
  Image as ImageIcon
} from 'lucide-react';
import { PortfolioItem, Inquiry } from './types';

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-bottom border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center">
        <div className="hidden md:flex items-center gap-6">
          {navLinks.slice(0, 2).map((link) => (
            <a key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex justify-center items-center col-span-3 md:col-span-1">
          <div className="flex flex-col items-center">
            <span className="font-signature text-7xl lowercase text-white leading-[0.4] mb-1">aurum</span>
            <span className="font-serif text-[10px] font-bold uppercase tracking-[0.8em] opacity-80 pl-[0.8em]">studio</span>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end gap-6">
          {navLinks.slice(2).map((link) => (
            <a key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors">
              {link.name}
            </a>
          ))}
          <button 
            onClick={onAdminClick}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="관리자 대시보드"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>
        </div>

        <button className="md:hidden absolute right-6" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                className="text-lg font-medium"
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
          <a href="#portfolio" className="px-8 py-4 bg-white hover:bg-zinc-200 text-zinc-950 rounded-full font-bold transition-all flex items-center gap-2 purple-glow">
            포트폴리오 보기 <Play className="w-4 h-4 fill-current" />
          </a>
          <a href="#contact" className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all">
            문의하기
          </a>
        </div>
      </motion.div>
    </div>

    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
    >
      <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
        <div className="w-1 h-2 bg-white/40 rounded-full" />
      </div>
    </motion.div>
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
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">우리가 제공하는 <br />전문적인 가치</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <motion.div 
              key={s.title}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-3xl transition-all"
            >
              <div className="text-brand mb-6">{s.icon}</div>
              <h4 className="text-2xl font-bold mb-4">{s.title}</h4>
              <p className="text-white/60 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ items }: { items: PortfolioItem[] }) => (
  <section id="portfolio" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">PORTFOLIO</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">최근 프로젝트</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <motion.div 
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer"
          >
            <img 
              src={item.imageUrl} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt={item.title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-8 text-center">
              <span className="text-xs font-bold text-brand mb-2">{item.category}</span>
              <h4 className="text-xl font-bold mb-4">{item.title}</h4>
              <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 fill-current" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Gallery = () => {
  // 파일 이름 끝에 .jpg.jpg가 붙어있는 현재 상황에 맞춰 수정했습니다.
  const images = [
    { src: '/setup1.jpg.jpg', title: '현장 셋업 및 장비 구성', category: 'Setup' },
    { src: '/setup2.jpg.jpg', title: '촬영 준비 및 조명 세팅', category: 'Production' },
    { src: '/setup3.jpg.jpg', title: '디테일 모니터링', category: 'Directing' },
    { src: '/setup4.jpg.jpg', title: '최종 촬영 진행', category: 'Shooting' }
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-sm font-bold text-brand uppercase tracking-[0.3em] mb-4">BEHIND THE SCENES</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter">현장의 순간들</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-8 md:row-span-2 relative group rounded-3xl overflow-hidden border border-white/5"
          >
            <img 
              src={images[0].src} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt={images[0].title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
              <span className="text-xs font-bold text-brand uppercase tracking-widest mb-2">{images[0].category}</span>
              <h4 className="text-3xl font-bold">{images[0].title}</h4>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 relative group rounded-3xl overflow-hidden border border-white/5"
          >
            <img 
              src={images[1].src} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt={images[1].title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-xs font-bold text-brand uppercase tracking-widest mb-1">{images[1].category}</span>
              <h4 className="text-xl font-bold">{images[1].title}</h4>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 relative group rounded-3xl overflow-hidden border border-white/5"
          >
            <img 
              src={images[2].src} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt={images[2].title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-xs font-bold text-brand uppercase tracking-widest mb-1">{images[2].category}</span>
              <h4 className="text-xl font-bold">{images[2].title}</h4>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-12 relative group rounded-3xl overflow-hidden border border-white/5 h-[300px]"
          >
            <img 
              src={images[3].src} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt={images[3].title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
              <span className="text-xs font-bold text-brand uppercase tracking-widest mb-2">{images[3].category}</span>
              <h4 className="text-2xl font-bold">{images[3].title}</h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">CONTACT US</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">새로운 프로젝트를 <br />시작할 준비가 되셨나요?</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-white/40">Email</p>
                <p className="font-bold">contact@aurumstudio.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-white/40">Instagram</p>
                <p className="font-bold">@aurum_studio_official</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-10 rounded-3xl">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <CheckCircle className="w-16 h-16 text-brand mb-6" />
              <h4 className="text-2xl font-bold mb-2">문의가 접수되었습니다!</h4>
              <button onClick={() => setSubmitted(false)} className="mt-8 text-brand font-bold hover:underline">
                새로운 문의 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60">성함 / 업체명</label>
                <input 
                  required
                  type="text" 
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand outline-none transition-all"
                  placeholder="홍길동"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60">이메일 주소</label>
                <input 
                  required
                  type="email" 
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand outline-none transition-all"
                  placeholder="example@mail.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60">문의 내용</label>
                <textarea 
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand outline-none transition-all resize-none"
                  placeholder="프로젝트에 대해 설명해 주세요."
                />
              </div>
              <button className="w-full py-4 bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                문의 보내기 <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const AdminDashboard = ({ onClose, portfolio, onRefresh }: { onClose: () => void, portfolio: PortfolioItem[], onRefresh: () => void }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'inquiries'>('portfolio');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [newPortfolio, setNewPortfolio] = useState({ title: '', description: '', videoUrl: '', imageUrl: '', category: 'Brand Film' });

  useEffect(() => {
    fetch('/api/inquiries').then(res => res.json()).then(setInquiries);
  }, []);

  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPortfolio)
    });
    if (res.ok) {
      onRefresh();
      setNewPortfolio({ title: '', description: '', videoUrl: '', imageUrl: '', category: 'Brand Film' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <header className="border-b border-white/10 p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gradient">ADMIN DASHBOARD</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </header>
      <main className="flex-1 overflow-y-auto p-8">
        <p className="text-white/60">포트폴리오와 문의 내역을 관리할 수 있습니다.</p>
      </main>
    </div>
  );
};

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const fetchPortfolio = () => {
    fetch('/api/portfolio').then(res => res.json()).then(setPortfolio);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover opacity-60"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-zinc-950/40" />
      </div>

      <div className="relative z-10">
        <Navbar onAdminClick={() => setIsAdminOpen(true)} />
        <main>
          <Hero />
          <Services />
          <Portfolio items={portfolio} />
          <Gallery />
          <Contact />
        </main>
        <footer className="py-12 px-6 border-t border-white/10 bg-black/40 backdrop-blur-sm text-center">
          <p className="text-sm text-white/20">© 2026 Aurum Studio. All rights reserved.</p>
        </footer>
      </div>

      {isAdminOpen && (
        <AdminDashboard 
          onClose={() => setIsAdminOpen(false)} 
          portfolio={portfolio} 
          onRefresh={fetchPortfolio} 
        />
      )}
    </div>
  );
}
