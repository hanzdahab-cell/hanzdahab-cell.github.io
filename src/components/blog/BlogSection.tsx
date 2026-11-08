import { useState } from 'react';
import { blogPosts } from '../../data/blog';
import { BlogPost } from '../../types';
import { BookOpen, Clock, User, ArrowRight, X } from 'lucide-react';
import { BlogCard } from './BlogCard';

export function BlogSection() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="ocean-surface relative border-t border-white/5 px-6 py-28">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.3em] uppercase text-cyan-400">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>THE ARCHIVE • DEEP DIVING INSIGHTS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Freediving <span className="text-cyan-300 italic font-normal">Journal & Blog</span>
            </h2>
            <p className="text-slate-400 font-sans font-light max-w-xl text-sm sm:text-base">
              Physiological science, equalisation breakdowns, and expedition field dispatches 
              from the depths of the Dahab Blue Hole.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} onSelect={setActivePost} />
          ))}
        </div>

        {/* Blog Article Reader Modal */}
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="glass-panel w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-cyan-400/40 p-6 sm:p-8 relative bg-slate-950/95 shadow-2xl">
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3">
                <span>{activePost.publishedAt}</span>
                <span>•</span>
                <span>{activePost.readTimeMin} MIN READ</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                {activePost.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-6 pb-4 border-b border-white/10">
                <span className="text-cyan-200">{activePost.author}</span>
                <span>—</span>
                <span>{activePost.authorRole}</span>
              </div>

              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={activePost.image.url}
                  alt={activePost.image.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 font-sans leading-relaxed text-sm sm:text-base space-y-4">
                <p>{activePost.excerpt}</p>
                <p>{activePost.content}</p>
                <p className="text-slate-400 text-xs italic">
                  Published in Dahab Blue Hole archives. For inquiries or equalization coaching, contact our master instructors.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
