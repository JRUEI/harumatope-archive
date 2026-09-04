'use client';

import { EpisodeData } from '@/lib/markdown';

export default function TranscriptMode({ episode }: { episode: EpisodeData }) {
  if (!episode.transcript || episode.transcript.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-xl flex items-center justify-center min-h-[300px]">
        <p className="text-zinc-500 text-lg">目前此集數尚未提供逐字稿。</p>
      </div>
    );
  }

  return (
    <div className="w-full">


      <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8">
        
        {/* 對話列表 */}
        <div className="flex flex-col gap-2">
          {episode.transcript.map((line, idx) => {
            const isHost = line.speaker === '福嶋晴菜';
            const speakerColorClass = isHost ? 'text-brand-purple' : 'text-amber-500 dark:text-amber-400';
            const timestampHoverClass = isHost
              ? 'group-hover:text-brand-purple'
              : 'group-hover:text-amber-500 dark:group-hover:text-amber-400';

            return (
              <div key={idx} className="group flex gap-4 md:gap-6 p-4 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-colors duration-200">
                <div className="w-12 shrink-0 pt-0.5">
                  <span className={`text-xs font-mono text-zinc-500 ${timestampHoverClass} transition-colors cursor-pointer hover:underline`}>
                    {line.time}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`font-bold ${speakerColorClass} text-sm`}>
                      {line.speaker}
                    </span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors text-base md:text-lg leading-relaxed m-0">
                    {line.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
