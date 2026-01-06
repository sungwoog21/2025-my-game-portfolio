import React, { useState } from 'react';
import { achievements } from './data/achievements';
import Modal from './components/Modal';
import { Database, User, ChevronRight, Layers, Quote, ArrowLeft } from 'lucide-react';

function App() {
  // view 상태에 'thanks' 추가하여 페이지 이동 구현
  const [view, setView] = useState('home'); 
  const [selectedCard, setSelectedCard] = useState(null);

  // --- [1] 메인 홈 화면 ---
  const HomeView = () => (
    <div className="max-w-3xl w-full animate-fadeIn py-16 px-6 flex flex-col items-center relative">
      <div className="w-full flex justify-end absolute top-0 right-0 md:-top-1 md:-right-20">
        <span className="text-game-gold font-bold text-[10px] md:text-xs tracking-widest uppercase border border-game-gold/30 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md shadow-sm">
          코어RPG운영2셀
        </span>
      </div>

      <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center mb-12 border border-white/10 shadow-xl mt-8 md:mt-0">
        <User className="w-8 h-8 text-game-gold" />
      </div>

      <header className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
          안녕하세요, <span className="text-game-gold">이준성</span>입니다.
        </h1>
        <p className="text-lg md:text-xl text-game-dim leading-relaxed font-light tracking-tight">
          데이터로 게임 운영의 해답을 찾는 <br/>
          <span className="text-white font-semibold">게임 서비스 운영자 & 데이터 분석가</span>입니다.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14 w-full">
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-game-blue/50 transition-all shadow-xl group text-left">
          <Database className="text-game-blue w-7 h-7 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-2">Data-Driven Ops</h3>
          <p className="text-game-dim text-[11px] leading-relaxed">
            Snowflake SQL을 활용한 로그 분석 및 실시간 이슈 탐지 대시보드 구축에 능숙하며, 수치 기반의 의사결정을 지원합니다.
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-game-gold/50 transition-all shadow-xl group text-left">
          <Layers className="text-game-gold w-7 h-7 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-2">Service Operation</h3>
          <p className="text-game-dim text-[11px] leading-relaxed">
            아키에이지 워 운영 업무를 진행하며 위기 관리 프로세스를 통해 안정적인 서비스를 유지합니다.
          </p>
        </div>
      </section>

      <div className="flex flex-col items-center gap-14 w-full">
        <button 
          onClick={() => setView('projectList')}
          className="group relative flex items-center gap-3 bg-game-gold text-black px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg hover:-translate-y-1"
        >
          <span>2025 성과 아카이브 확인하기</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 max-w-xl w-full mx-auto shadow-inner">
          <Quote className="w-6 h-6 text-game-gold/10 absolute top-2 left-2" />
          <p className="text-game-dim text-[11px] md:text-[13px] leading-loose italic px-2 text-center">
            업무 외에는 여러 장르의 게임을 플레이하며 다양한 유저층의 니즈를 직접 경험하고<br/>
            더 넓은 시야로 방법을 모색하기 위해 데이터 공부를 병행하고 있으며,<br/>
            이를 실제 운영 프로세스에 녹여내기 위한 실무적 인사이트를 기르고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );

  // --- [2] 진행 중인 프로젝트 리스트 ---
  const ProjectListView = () => (
    <div className="max-w-4xl w-full animate-fadeIn py-10 px-8 text-left">
      <button onClick={() => setView('home')} className="text-game-dim hover:text-game-gold mb-8 flex items-center gap-2 transition-colors text-xs font-bold uppercase tracking-widest">
        <ArrowLeft className="w-3 h-3" /> 최초 화면으로 돌아가기
      </button>

      <header className="mb-10 border-l-3 border-game-gold pl-6">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter">진행 중인 프로젝트</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          onClick={() => setView('projectDetail')}
          className="bg-white/5 backdrop-blur-md rounded-[1.5rem] p-0 overflow-hidden border border-white/10 hover:border-game-gold transition-all duration-300 cursor-pointer group shadow-xl flex flex-col items-center"
        >
          <div className="w-full aspect-[760/449] overflow-hidden">
            <img 
              src="/images/arche.png"
              alt="아키에이지 워"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-game-gold transition-colors">
              아키에이지 워 <br className="hidden md:block"/>(국내/글로벌)
            </h3>
            <p className="text-game-gold/60 text-[10px] font-bold tracking-widest uppercase">MMORPG / PC · MOBILE</p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- [3] 프로젝트 상세 성과 화면 (성과 리포트) ---
  const ProjectDetailView = () => (
    <div className="max-w-4xl w-full animate-fadeIn py-10 px-8">
      {/* 상단 네비게이션 */}
      <button onClick={() => setView('projectList')} className="text-game-dim hover:text-game-gold mb-8 flex items-center gap-2 transition-colors text-xs font-bold uppercase tracking-widest">
        <ArrowLeft className="w-3 h-3" /> 프로젝트로 돌아가기
      </button>
      
      <header className="mb-10">
        <h2 className="text-game-gold font-bold uppercase tracking-[0.3em] mb-2 text-[10px] opacity-60 text-left">Success Milestone</h2>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter text-left">아키에이지 워 성과 리포트</h1>
        <div className="w-16 h-1 bg-game-gold mt-4 rounded-full shadow-glow"></div>
      </header>

      {/* 성과 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {achievements.map((item) => (
          <div key={item.id} onClick={() => setSelectedCard(item)} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-game-gold transition-all cursor-pointer group hover:-translate-y-1 shadow-lg text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 group-hover:bg-game-gold/10 transition-all">
                <item.icon className="w-5 h-5 text-game-gold" />
              </div>
              <h2 className="text-base font-bold text-white tracking-tight leading-tight">{item.title}</h2>
            </div>
            <p className="text-game-dim text-[11px] leading-relaxed line-clamp-3">{item.summary}</p>
          </div>
        ))}
      </div>

      {/* 하단 네비게이션: 우측 끝으로 가기만 남김 */}
      <div className="flex justify-end items-center border-t border-white/10 pt-8">
        <button 
          onClick={() => {
            setView('thanks');
            window.scrollTo(0, 0); // 새 페이지 이동 시 상단으로 스크롤
          }}
          className="group flex items-center gap-2 text-game-dim hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
        >
          끝으로 가기 <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );

  // --- [4] 감사합니다 화면 (독립된 페이지) ---
  const ThanksView = () => (
    <div className="max-w-4xl w-full animate-fadeIn min-h-[80vh] flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="space-y-8 bg-gradient-to-b from-white/[0.02] to-game-blue/5 p-16 rounded-[3rem] border border-white/5 w-full shadow-2xl">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          감사합니다.
        </h2>
        <div className="w-20 h-1 bg-game-gold mx-auto rounded-full shadow-glow"></div>
        <p className="text-game-dim max-w-lg mx-auto leading-relaxed text-base md:text-lg">
          데이터를 통해 더 나은 운영의 근거를 마련하고,<br />
          안정적인 서비스를 위해 끊임없이 고민하겠습니다.
        </p>
        
        <div className="pt-10 flex flex-col items-center gap-6">
          <button 
            onClick={() => {
              setView('projectDetail');
              window.scrollTo(0, 0);
            }}
            className="text-[11px] uppercase tracking-[0.2em] text-game-gold hover:text-white transition-all border border-game-gold/20 px-6 py-2 rounded-full hover:bg-game-gold/10"
          >
            [ 리포트로 다시 돌아가기 ]
          </button>
          
          <button 
            onClick={() => {
              setView('home');
              window.scrollTo(0, 0);
            }}
            className="text-[10px] uppercase tracking-[0.1em] text-gray-500 hover:text-white transition-colors"
          >
            메인 화면으로 가기
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-game-black flex flex-col items-center relative overflow-x-hidden">
      {/* 골드 프레임 장식 */}
      <div className="fixed inset-4 md:inset-6 border border-game-gold/10 pointer-events-none z-50 rounded-sm">
        <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t-2 border-l-2 border-game-gold shadow-glow"></div>
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-2 border-r-2 border-game-gold shadow-glow"></div>
        <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-2 border-l-2 border-game-gold shadow-glow"></div>
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-2 border-r-2 border-game-gold shadow-glow"></div>
      </div>

      <main className="w-full flex justify-center relative z-10 px-6 md:px-12 py-10">
        {view === 'home' && <HomeView />}
        {view === 'projectList' && <ProjectListView />}
        {view === 'projectDetail' && <ProjectDetailView />}
        {view === 'thanks' && <ThanksView />}
      </main>
      
      <Modal isOpen={!!selectedCard} onClose={() => setSelectedCard(null)} data={selectedCard} />
    </div>
  );
}

export default App;