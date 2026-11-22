import { useState, type FormEvent } from 'react'
import { Check, Copy, ExternalLink, Mail, MapPin, MessageSquareText, Phone, Send } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { isFilled, profile } from '../data/profile'
import { reveal } from '../motion'

const link = 'inline-block break-all py-2 text-ink underline decoration-line underline-offset-4 hover:decoration-accent'

// Two delivery modes, both honest about what they can confirm:
//  1. If a form endpoint is configured (VITE_FEEDBACK_ENDPOINT), the message is POSTed and success is shown only
//     when the server answers with an OK status. Failures show an error and keep the text so nothing is lost.
//  2. Otherwise the visitor's email app opens with the message ready (the site has no backend of its own).
// No keys or credentials live in this file.
type Status = 'idle' | 'short' | 'noemail' | 'sending' | 'sent' | 'error' | 'opened'

function FeedbackForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const endpoint = profile.feedbackEndpoint.trim()
  const busy = status === 'sending'

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (busy || status === 'sent') return // blocks accidental double submission
    if (message.trim().length < 10) return setStatus('short')

    if (endpoint) {
      setStatus('sending')
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // simple request: no CORS preflight
          body: JSON.stringify({ name: name.trim(), message: message.trim(), page: window.location.href }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setStatus('sent')
        setName('')
        setMessage('')
      } catch {
        setStatus('error')
      }
      return
    }

    if (!isFilled(profile.email)) return setStatus('noemail')
    const body = `${message.trim()}${name.trim() ? `\n\n— ${name.trim()}` : ''}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio feedback')}&body=${encodeURIComponent(body)}`
    setStatus('opened')
  }

  const hint = endpoint ? 'Your message is sent to me directly.' : 'Opens your email app with this message.'
  return (
    <form id="feedback" onSubmit={submit} noValidate aria-labelledby="feedback-title" {...reveal(1)} className="panel flex h-full flex-col gap-4 p-6">
      <div>
        <h3 id="feedback-title" className="text-2xl font-semibold">Share Your Feedback</h3>
        <p className="mt-2 text-muted">Thoughts on my portfolio or projects? {endpoint ? 'Write your message and send it to me.' : 'Write your message and it opens in your email app, ready to send to me.'}</p>
      </div>
      <div>
        <label htmlFor="fb-name" className="mb-1.5 block text-sm font-semibold">Your name <span className="font-normal text-muted">(optional)</span></label>
        <input id="fb-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={80} disabled={busy}
          className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-ink placeholder:text-muted" placeholder="How should I address you?" />
      </div>
      <div className="flex flex-1 flex-col">
        <label htmlFor="fb-msg" className="mb-1.5 block text-sm font-semibold">Your feedback <span className="font-normal text-muted">(required)</span></label>
        <textarea id="fb-msg" value={message} onChange={(e) => { setMessage(e.target.value); if (status !== 'sending') setStatus('idle') }} rows={5} maxLength={1500} required disabled={busy}
          aria-invalid={status === 'short'} aria-describedby="fb-status" className="min-h-36 w-full flex-1 resize-y rounded-lg border border-line bg-bg px-3.5 py-2.5 text-ink placeholder:text-muted" placeholder="What worked well, and what could be better?" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy} className="btn btn-primary"><Send size={17} aria-hidden /> {busy ? 'Sending…' : 'Send feedback'}</button>
        <p id="fb-status" role="status" aria-live="polite" className={`flex min-w-0 flex-1 items-center gap-2 text-sm ${status === 'error' || status === 'short' || status === 'noemail' ? 'text-amber' : status === 'sent' ? 'text-secondary' : 'text-muted'}`}>
          {status === 'idle' && <><MessageSquareText size={16} className="shrink-0" aria-hidden /> {hint}</>}
          {status === 'short' && 'Please write at least a sentence (10 characters) before sending.'}
          {status === 'sending' && 'Sending your message…'}
          {status === 'sent' && 'Thank you. Your feedback was sent.'}
          {status === 'error' && 'Sorry, your message could not be sent. Your text is still here, so please try again in a moment.'}
          {status === 'noemail' && 'Sending is not set up yet: the owner needs to add the contact email.'}
          {status === 'opened' && 'Your email app should now be open. Press send there to finish.'}
        </p>
      </div>
    </form>
  )
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const hasEmail = isFilled(profile.email)
  const hasPhone = isFilled(profile.phone)
  // The feedback form needs somewhere to send to. If neither an email nor an endpoint is configured it is hidden on the
  // live site (and shown with a setup note only while developing), so visitors never meet a form that cannot work.
  const showForm = Boolean(profile.feedbackEndpoint.trim()) || hasEmail || import.meta.env.DEV

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this email address:', profile.email)
    }
  }

  const icons = [
    { label: 'LinkedIn profile', href: profile.linkedin, icon: <LinkedinIcon size={20} />, external: true },
    { label: 'GitHub profile', href: profile.github, icon: <GithubIcon size={20} />, external: true },
    ...(hasEmail ? [{ label: 'Write me an email', href: `mailto:${profile.email}?subject=${encodeURIComponent('Hello from your portfolio')}`, icon: <Mail size={20} aria-hidden />, external: false }] : []),
    { label: 'AI Business Intelligence live demo', href: profile.liveDemo, icon: <ExternalLink size={20} aria-hidden />, external: true },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className={`wrap grid gap-10 ${showForm ? 'lg:grid-cols-2' : ''}`}>
        <div className="flex flex-col">
          <SectionHeading id="contact" title="Let's Connect">
            I'm interested in opportunities where I can apply analytical thinking, programming, and business intelligence to practical
            problems. Feel free to connect with me regarding entry-level opportunities, data projects, or professional discussions.
          </SectionHeading>

          <h3 {...reveal()} className="text-sm font-semibold">Connect with me</h3>
          <ul className="mb-5 mt-3 flex flex-wrap gap-3">
            {icons.map((i, idx) => (
              <li key={i.label} {...reveal(idx + 1)}>
                <a href={i.href} aria-label={i.label} title={i.label} className="btn !h-12 !w-12 !px-0"
                  {...(i.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {i.icon}
                </a>
              </li>
            ))}
          </ul>

          <ul {...reveal(2)} className="panel flex flex-1 flex-col divide-y divide-line">
            {hasEmail && (
              <li className="flex flex-1 flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <Mail size={20} className="shrink-0 text-accent" aria-hidden />
                  <a href={`mailto:${profile.email}`} className={link}>{profile.email}</a>
                </div>
                <button type="button" className="btn !min-h-11" onClick={copyEmail} aria-live="polite">
                  {copied ? <><Check size={16} aria-hidden /> Copied</> : <><Copy size={16} aria-hidden /> Copy email</>}
                </button>
              </li>
            )}
            {hasPhone && (
              <li className="flex flex-1 items-center gap-3 p-4 sm:p-5">
                <Phone size={20} className="shrink-0 text-accent" aria-hidden />
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className={link}>{profile.phone}</a>
              </li>
            )}
            <li className="flex flex-1 items-center gap-3 p-4 sm:p-5">
              <LinkedinIcon size={20} />
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={link}>linkedin.com/in/prafulla-kumar-gouda</a>
            </li>
            <li className="flex flex-1 items-center gap-3 p-4 sm:p-5">
              <GithubIcon size={20} />
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={link}>github.com/Prafulla-Kumar-Gouda</a>
            </li>
            <li className="flex flex-1 items-center gap-3 p-4 sm:p-5">
              <MapPin size={20} className="shrink-0 text-accent" aria-hidden />
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>
        {showForm && <div className="flex flex-col"><FeedbackForm /></div>}
      </div>
    </section>
  )
}
