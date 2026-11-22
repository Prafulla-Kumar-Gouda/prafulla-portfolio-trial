import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="rule py-8 text-sm text-muted max-lg:pb-24">
      <div className="wrap flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. {profile.location}.</p>
        <p>Built with React, TypeScript and Tailwind CSS.</p>
      </div>
    </footer>
  )
}
