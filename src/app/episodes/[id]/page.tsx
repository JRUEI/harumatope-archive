import { getEpisodeData, getAllEpisodeIds } from '@/lib/markdown';
import EpisodeViewer from '@/components/EpisodeViewer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamicParams = false;

// Pre-render every episode from the committed Markdown content at build time.
export async function generateStaticParams() {
  const ids = getAllEpisodeIds();
  return ids.map((id) => ({
    id: id.params.id,
  }));
}

// Ensure the page takes standard Promise-based params for Next.js 15+
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const episode = getEpisodeData(resolvedParams.id);
  if (!episode) return { title: 'はるまとぺーじ Wiki' };
  return {
    title: `第${episode.episodeNumber}回 ${episode.title} — はるまとぺーじ Wiki`,
    description: episode.summary[0] || `福嶋晴菜「はるまとぺーじ」第${episode.episodeNumber}回`,
  };
}

export default async function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const episode = getEpisodeData(resolvedParams.id);

  if (!episode) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-6 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-brand-purple dark:hover:text-brand-purple transition-colors mb-2"
        >
          <ArrowLeft size={16} />
          返回節目列表
        </Link>
      </div>
      <EpisodeViewer episode={episode} />
    </div>
  );
}
