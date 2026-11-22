import type { ReactNode } from 'react'
import { reveal } from '../motion'

export default function SectionHeading({ id, title, children }: { id: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-7 max-w-2xl">
      <h2 id={`${id}-title`} {...reveal()} className="title-bar text-[clamp(1.9rem,4.2vw,2.75rem)] font-semibold">{title}</h2>
      {children && <p {...reveal(2)} className="mt-4 text-muted">{children}</p>}
    </div>
  )
}
