// src/components/Modal.jsx
import React, { useState } from 'react';
import { X, ExternalLink, Search } from 'lucide-react';
import Timeline from './Timeline';

function Modal({ isOpen, onClose, data }) {
  // 확대한 이미지를 저장하는 상태
  const [enlargedImage, setEnlargedImage] = useState(null);

  if (!isOpen || !data) return null;

  const isTimelineLayout = data.category === 'Issue' || data.category === 'Log';

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
        <div className="bg-game-dark border border-game-gold w-full max-w-2xl rounded-lg shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
          
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
				  {data.category === 'Issue' ? '🎯 이슈 대응 연대기' : '🛠️ 로그 및 운영툴 개선 연대기'}</p>

				<div className="text-sm text-gray-400 leading-relaxed">
				  {data.category === 'Issue' ? (
					<>
					  <p>사건 발생부터 SQL 분석을 통한 해결까지의 전 과정입니다.</p>
					  <p className="pl-0 mt-0">
						사전 제작된 대쉬보드와 실시간으로 필요한 쿼리를 병행하여 업무에 적용합니다.
					  </p>
					</>
				  ) : (
					<>
					  <p>운영 효율 증진을 위한 로그 및 운영툴 개선 과정입니다.</p>
					  <p className="pl-0 mt-0">
						사전 제작된 대쉬보드와 실시간으로 필요한 쿼리를 병행하여 업무에 적용합니다.
					  </p>
					</>
				  )}
				</div>
				  
                </div>
                <Timeline milestones={data.milestones} />
              </div>
            ) : (
              <div className="space-y-6 text-gray-300">
                {/* Summary 섹션: 줄바꿈 적용 */}
                <div className="bg-game-gold/10 border border-game-gold/30 p-4 rounded">
                  <h3 className="text-game-gold font-bold mb-1">Summary</h3>
                  <p className="text-gray-300 whitespace-pre-line">{data.summary}</p>
                </div>
                
                {/* 상세 내용 섹션: 줄바꿈 적용 */}
                <div>
                  <h3 className="text-game-gold font-bold text-lg mb-2">상세 내용</h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {/* 데이터 파일의 키값이 content라면 data.content로 수정하세요 */}
                    {data.description || data.content}
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-lg mb-2">주요 성과</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    {data.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 증거 자료 이미지 섹션 */}
            {data.evidenceImages && data.evidenceImages.length > 0 && (
              <div className="mt-10 pt-8 border-t border-white/10">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-game-blue inline-block"></span>
                  자료 이미지
                </h3>
                <p className="text-xs text-game-dim mb-4">이미지를 클릭하면 크게 볼 수 있습니다.</p>
                <div className="grid grid-cols-1 gap-6">
                  {data.evidenceImages.map((img, idx) => (
                    <div key={idx} className="group relative">
                      <div 
                        className="overflow-hidden rounded-lg border border-white/10 group-hover:border-game-blue transition-all relative cursor-pointer"
                        onClick={() => setEnlargedImage(img)}
                      >
                        <img 
                          src={img.url} 
                          alt={img.caption} 
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:brightness-50" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Search className="w-10 h-10 text-game-blue" />
                        </div>
                      </div>
                      <p className="text-xs text-game-dim mt-3 text-center italic font-light">
                        {img.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 푸터 */}
          {data.notionLink && (
            <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end">
              <a href={data.notionLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-game-gold/10 text-game-gold px-4 py-2 rounded border border-game-gold/50 hover:bg-game-gold hover:text-black transition-all font-bold text-sm">
                <ExternalLink className="w-4 h-4" />
                상세 문서 보기
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 이미지 확대 레이어 */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
          onClick={() => setEnlargedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-game-gold">
            <X className="w-10 h-10" />
          </button>
          <img 
            src={enlargedImage.url} 
            alt={enlargedImage.caption} 
            className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl border border-white/10"
          />
          <p className="mt-6 text-game-gold text-lg font-bold bg-black/50 px-4 py-2 rounded">
            {enlargedImage.caption}
          </p>
        </div>
      )}
    </>
  );
}

export default Modal;