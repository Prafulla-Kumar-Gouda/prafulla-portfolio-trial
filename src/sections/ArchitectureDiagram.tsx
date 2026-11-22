import { ArrowDown } from 'lucide-react'
import { featured } from '../data/projects'

type Node = { title: string; detail: string; file: string }

function Step({ n, i }: { n: Node; i: number }) {
  return (
    <div className="h-full rounded-xl border border-line bg-surface p-3.5">
      <p className="flex items-center gap-2 font-semibold leading-snug">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent text-[0.8125rem] text-accent" aria-hidden>{i}</span>
        {n.title}
      </p>
      <p className="mt-1 text-sm text-muted">{n.detail}</p>
      <p className="mt-1.5 break-all font-mono text-[0.8125rem] text-accent">{n.file}</p>
    </div>
  )
}
const Arrow = ({ className = '' }: { className?: string }) => (
  <div className={`flex justify-center py-1.5 text-muted ${className}`} aria-hidden><ArrowDown size={18} /></div>
)

// One group of steps: stacked with arrows on phones, a row/grid on wider screens.
function Group({ nodes, start, cols }: { nodes: Node[]; start: number; cols: string }) {
  return (
    <ul className={`m-0 grid list-none gap-0 p-0 sm:gap-2.5 ${cols}`}>
      {nodes.map((n, idx) => (
        <li key={n.title}>
          <Step n={n} i={start + idx} />
          {idx < nodes.length - 1 && <Arrow className="sm:hidden" />}
        </li>
      ))}
    </ul>
  )
}

// Lightweight architecture diagram in plain HTML so it scales, stays readable and works with screen readers.
// It mirrors the modules app.py actually calls (see featured.pipeline in data/projects.ts).
export default function ArchitectureDiagram() {
  const { before, branches, after } = featured.pipeline
  return (
    <figure aria-labelledby="arch-cap" className="rounded-2xl border border-line bg-surface2 p-4 sm:p-5">
      <figcaption id="arch-cap" className="mb-3 text-sm text-muted">
        Application flow, in numbered order, with the Python file behind each step. Steps 5 to 7 run on the analysed data.
      </figcaption>
      <Group nodes={before} start={1} cols="sm:grid-cols-2" />
      <Arrow />
      <Group nodes={branches} start={before.length + 1} cols="sm:grid-cols-3" />
      <Arrow />
      <Group nodes={after} start={before.length + branches.length + 1} cols="sm:grid-cols-2" />
    </figure>
  )
}
