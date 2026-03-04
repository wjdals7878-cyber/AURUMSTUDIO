// ... 상단 import 생략 (기존과 동일) ...

const Gallery = () => {
  // 사진 파일이 public 폴더 안에 있고, 이름이 setup1.jpg.jpg 일 때의 경로입니다.
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
          {/* 메인 큰 이미지 */}
          <motion.div className="md:col-span-8 md:row-span-2 relative group rounded-3xl overflow-hidden border border-white/5">
            <img src={images[0].src} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
          </motion.div>

          {/* 오른쪽 위 이미지 */}
          <motion.div className="md:col-span-4 relative group rounded-3xl overflow-hidden border border-white/5">
            <img src={images[1].src} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
          </motion.div>

          {/* 오른쪽 아래 이미지 */}
          <motion.div className="md:col-span-4 relative group rounded-3xl overflow-hidden border border-white/5">
            <img src={images[2].src} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
          </motion.div>

          {/* 하단 긴 이미지 */}
          <motion.div className="md:col-span-12 relative group rounded-3xl overflow-hidden border border-white/5 h-[300px]">
            <img src={images[3].src} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ... 하단 App 컴포넌트 생략 (기존과 동일) ...
