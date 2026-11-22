import { useEffect, useState } from 'react'

// True only when the file exists AND has the expected content type (a dev server may answer
// a missing file with index.html, which must not count).
export function useFileAvailable(url: string, typePart: string) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    if (window.location.protocol === 'file:') return // a page opened straight from disk cannot check for files
    let cancelled = false
    fetch(url, { method: 'HEAD' })
      .then((r) => { if (!cancelled) setOk(r.ok && (r.headers.get('content-type') ?? '').includes(typePart)) })
      .catch(() => { if (!cancelled) setOk(false) })
    return () => { cancelled = true }
  }, [url, typePart])
  return ok
}
