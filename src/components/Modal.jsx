// src/components/Modal.jsx
import React, { useState, useEffect } from 'react'; // 1. useEffect 추가
import { X, ExternalLink, Search } from 'lucide-react';
import Timeline from './Timeline';

function Modal({ isOpen, onClose, data }) {
  const [enlargedImage, setEnlargedImage] = useState(null);

  // 2. ESC 키 이벤트 리스너 추가
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        if (enlargedImage) {
          // 확대된 이미지가 있다면 이미지부터 닫기
          setEnlargedImage(null);
        } else {
          // 이미지가 없다면 모달 닫기
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    // 컴포넌트가 사라지거나 모달이 닫힐 때 리스너 제거 (메모리 누수 방지)
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, enlargedImage, onClose]);

  if (!isOpen || !data) return null;

  // 타임라인 레이아웃 카테고리 정의
  const isTimelineLayout = ['Issue', 'Log', 'Operation'].includes(data.category);

  return (
    <>
      {/* 배경 클릭 시 닫히게 하려면 여기에 onClick={onClose}를 추가할 수 있습니다 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
        <div 
          className="bg-game-dark border border-game-gold w-full max-w-2xl rounded-lg shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
        >
          {/* 헤더 */}
          <div className="p-6 border-b border-white/10 flex justify-between items-start bg-black/40">
            <div className="flex items-center gap-3">
              <data.icon className={`w-8 h-8 ${isTimelineLayout ? 'text-game-blue' : 'text-game-gold'}`} />
              <h2 className="text-2xl font-bold text-white">{data.title}</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 본문 */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {isTimelineLayout ? (
              <div className="space-y-6">
                <div className="bg-game-blue/10 border border-game-blue/30 p-4 rounded">
                  <p className="text-game-blue font-bold">
                    {data.category === 'Issue' && '🎯 이슈 대응 연대기'}
                    {data.category === 'Operation' && '🎯 운영 대응 연대기'}
                    {data.category === 'Log' && '🛠️ 로그 및 운영툴 개선 연대기'}
                  </p>

                  <div className="text-sm text-gray-400 leading-relaxed">
                    {data.category === 'Issue' || data.category === 'Operation' ? (
                      <>
                        <p>{data.category === 'Issue' ? '사건 발생' : '운영 이슈 발생'}부터 SQL 분석을 통한 해결까지의 전 과정입니다.</p>
                        <p className="pl-0 mt-0">사전 제작된 대쉬보드와 실시간으로 필요한 쿼리를 병행하여 업무에 적용합니다.</p>
                      </>
                    ) : (
                      <>
                        <p>운영 효율 증진을 위한 로그 및 운영툴 개선 과정입니다.</p>
                        <p className="pl-0 mt-0">사전 제작된 대쉬보드와 실시간으로 필요한 쿼리를 병행하여 업무에 적용합니다.</p>
                      </>
                    )}
                  </div>
                </div>
                <Timeline milestones={data.milestones} />
              </div>
            ) : (
              <div className="space-y-6 text-gray-300">
                <div className="bg-game-gold/10 border border-game-gold/30 p-4 rounded">
                  <h3 className="text-game-gold font-bold mb-1">Summary</h3>
                  <p className="text-gray-300 whitespace-pre-line">{data.summary}</p>
                </div>
                <div>
                  <h3 className="text-game-gold font-bold text-lg mb-2">상세 내용</h3>
                  <p className="leading-relaxed whitespace-pre-line">{data.description || data.content}</p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">주요 성과</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    {data.details.map((detail, idx) => (<li key={idx}>{detail}</li>))}
                  </ul>
                </div>
              </div>
            )}
            {/* 이미지 섹션 생략... */}
          </div>
          {/* 푸터 섹션 생략... */}
        </div>
      </div>

      {/* 이미지 확대 레이어 (이 상태에서도 ESC가 작동합니다) */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setEnlargedImage(null)}
        >
          <img src={enlargedImage.url} alt={enlargedImage.caption} className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl" />
        </div>
      )}
    </>
  );
}

export default Modal;