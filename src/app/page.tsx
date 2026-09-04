import { getAllEpisodeListItems } from '@/lib/markdown';
import HomeEpisodeList from '@/components/HomeEpisodeList';

export default function Home() {
  const episodes = getAllEpisodeListItems();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 sm:py-16">
      {/* Hero Section */}
      <div className="text-center mb-10 sm:mb-14 relative">
        <h1 className="flex flex-col items-center text-[clamp(2rem,10vw,3rem)] sm:text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-[1.3] sm:leading-tight">
          <span>福嶋晴菜の</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-green mt-2 whitespace-nowrap">
            「はるまとぺーじ」
          </span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base tracking-wide">
          非公式節目內容紀錄 Wiki・全 {episodes.length} 回收錄
        </p>
      </div>

      {/* Episodes List */}
      <HomeEpisodeList episodes={episodes} />
    </div>
  );
}
