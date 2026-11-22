import { profile } from '../data/profile'
import { useFileAvailable } from './useFileAvailable'

export function useResumeAvailable() {
  const url = `./${profile.resumeFile}`
  return { available: useFileAvailable(url, 'pdf'), url }
}
