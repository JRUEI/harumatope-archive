import { getAllEpisodeListItems } from '@/lib/markdown';
import HomeEpisodeList from '@/components/HomeEpisodeList';

export default function Home() {
  const episodes = getAllEpisodeListItems();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 sm:py-16">
      {/* 站名已移至頁首，此處不再重複 */}

      {/* Episodes List */}
      <HomeEpisodeList episodes={episodes} />
    </div>
  );
}
