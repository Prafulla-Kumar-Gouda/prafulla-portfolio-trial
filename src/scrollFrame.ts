// ONE shared scroll listener for the scroll-linked effects. Callbacks run at most once per animation frame and only while
// the page is actually scrolling or resizing; nothing runs when the page is idle.
type Cb = () => void
const subs = new Set<Cb>()
let ticking = false
let bound = false

const run = () => { ticking = false; subs.forEach((f) => f()) }
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(run) } }

export function onScrollFrame(cb: Cb) {
  subs.add(cb)
  if (!bound) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    bound = true
  }
  cb()
  return () => {
    subs.delete(cb)
    if (!subs.size) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      bound = false
    }
  }
}

export const motionOn = () => document.documentElement.classList.contains('motion-ready')
