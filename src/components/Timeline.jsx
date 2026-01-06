// src/components/Timeline.jsx
import React from 'react';
import { Database } from 'lucide-react';

function Timeline({ milestones }) {
  return (
    <div className="relative border-l-2 border-game-blue/30 ml-3 space-y-10 py-4">
      {milestones.map((step, idx) => (
        <div key={idx} className="relative pl-8">
          {/* 타임라인 노드 (점) */}
          <div className="absolute -left-[11px] top-1 w-5 h-5 bg-game-black border-2 border-game-blue rounded-full shadow-[0_0_10px_rgba(52,152,219,0.8)]" />
          
          {/* 시간 및 태그 */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-game-blue font-mono font-bold">{step.time}</span>
            <span className="bg-game-blue/20 text-game-blue text-[10px] px-2 py-0.5 rounded border border-game-blue/30 uppercase">
              {step.tag}
            </span>
          </div>

          {/* 내용 박스 */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <h4 className="text-white font-bold mb-1">{step.label}</h4>
            
            {/* ⭐️ whitespace-pre-line을 추가하여 \n 줄바꿈이 적용되도록 수정했습니다. */}
            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
              {step.content}
            </p>
            
            {/* SQL 강조 표시 (분석 단계일 때만) */}
            {step.tag === "분석" && (
              <div className="mt-3 p-3 bg-black/40 rounded border border-game-blue/20 flex items-center gap-3">
                <Database className="w-5 h-5 text-game-blue" />
                <span className="text-xs text-game-blue/80 italic font-mono">
                  SELECT * FROM logs WHERE action = 'exploit_suspect'...
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;