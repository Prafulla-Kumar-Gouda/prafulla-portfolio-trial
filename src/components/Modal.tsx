import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

// Native <dialog>: focus trap, Esc to close and inert background come from the browser.
export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) { d.showModal(); document.body.style.overflow = 'hidden' }
    if (!open && d.open) d.close()
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onClose={() => { document.body.style.overflow = ''; onClose() }}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
      className="m-auto w-[min(100%-1.5rem,60rem)] max-h-[92dvh] overflow-hidden rounded-2xl max-sm:m-0 max-sm:mt-auto max-sm:w-full max-sm:max-w-full max-sm:rounded-b-none border border-line bg-bg p-0 text-ink shadow-2xl backdrop:bg-black/70"
    >
      {open && (
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line bg-surface px-5 py-4 sm:px-7">
            <h2 id="modal-title" className="text-xl font-semibold sm:text-2xl">{title}</h2>
            <button type="button" className="btn !px-0 w-10 !min-h-11 shrink-0" onClick={onClose} aria-label="Close"><X size={18} aria-hidden /></button>
          </div>
          <div tabIndex={0} role="region" aria-label={`${title}, scrollable details`} className="overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-7">{children}</div>
        </div>
      )}
    </dialog>
  )
}
