import { ArrowRight } from 'lucide-react'
import { featured } from '../data/projects'
import { reveal } from '../motion'

// Small preview of the flagship project on the Home page. The full story lives on the Projects page.
export default function FeaturedPreview() {
  const shot = featured.screens[0]
  return (
    <section aria-labelledby="featured-preview-title" className="pb-14 sm:pb-20">
      <div className="wrap">
        <a href="#project-ai-bi" {...reveal()} className="panel panel-hover grid overflow-hidden no-underline sm:grid-cols-[14rem_1fr] md:grid-cols-[18rem_1fr]">
          <div className="relative min-h-40 border-b border-line bg-surface2 sm:border-b-0 sm:border-r">
            <img src={shot.src} width={shot.w} height={shot.h} alt={shot.alt} loading="lazy" {...reveal()} className="absolute inset-0 h-full w-full object-cover object-left-top" />
          </div>
          <div className="p-5 sm:p-6">
            <p className="inline-block rounded-md border border-accent/50 bg-accent/10 px-2 py-0.5 text-[0.8125rem] font-semibold text-accent">Featured project</p>
            <h2 id="featured-preview-title" className="mt-2 text-xl font-semibold">AI Business Intelligence</h2>
            <p className="mt-1 text-sm text-muted">
              Upload a sales dataset and get cleaning, analysis, customer segments and a sales forecast in one dashboard. Built with Python, Pandas, Streamlit and scikit-learn.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">View project <ArrowRight size={16} aria-hidden /></span>
          </div>
        </a>
      </div>
    </section>
  )
}
