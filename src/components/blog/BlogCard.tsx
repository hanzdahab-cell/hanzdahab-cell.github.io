import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
  onSelect: (post: BlogPost) => void;
}

export function BlogCard({ post, onSelect }: BlogCardProps) {
  const publishedDate = new Date(`${post.publishedAt}T00:00:00`);
  const dateLabel = new Intl.DateTimeFormat('en', { month: 'long', day: '2-digit', year: 'numeric' }).format(publishedDate);

  return (
    <article className="h-full">
      <button
        type="button"
        onClick={() => onSelect(post)}
        aria-label={`Read article: ${post.title}`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A2943] text-left text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-[transform,border-color,box-shadow] duration-[450ms] ease-out hover:-translate-y-1.5 hover:border-cyan-300/60 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#081F35]">
          <img
            src={post.image.url}
            alt={post.image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081F35]/35 to-transparent" aria-hidden="true" />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-alata text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
              {post.tags[0] ?? 'Freediving'}
            </span>
            <time dateTime={post.publishedAt} className="font-alata text-xs text-slate-400">{dateLabel}</time>
          </div>

          <h3 className="font-bebas text-2xl leading-tight tracking-[0.035em] text-white transition-colors duration-300 group-hover:text-cyan-200 group-focus-visible:text-cyan-200 sm:text-3xl">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300">{post.excerpt}</p>

          <span className="mt-auto inline-flex items-center gap-2 pt-6 font-alata text-sm font-semibold text-cyan-200">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
          </span>
        </div>
      </button>
    </article>
  );
}
