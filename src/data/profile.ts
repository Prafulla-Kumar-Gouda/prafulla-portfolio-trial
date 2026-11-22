// Contact details are kept in ONE place. Fill in `email` before publishing:
// while they still start with "[", the site hides those rows instead of showing placeholders.
export const profile = {
  name: 'Prafulla Kumar Gouda',
  headline: 'Data Analytics | Business Intelligence | Python & SQL',
  location: 'Bengaluru, Karnataka, India',
  // Contact details are read from a local .env file (see .env.example) so they are not stored in the code.
  // While unset, the matching rows and icons are simply not shown (no placeholder text appears on the site).
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() ?? '',
  phone: (import.meta.env.VITE_CONTACT_PHONE as string | undefined)?.trim() ?? '',
  linkedin: 'https://linkedin.com/in/prafulla-kumar-gouda',
  github: 'https://github.com/Prafulla-Kumar-Gouda',
  repo: 'https://github.com/Prafulla-Kumar-Gouda/AI-Business-Intelligence',
  liveDemo: 'https://ai-business-intelligence-prafulla.streamlit.app/',
  resumeFile: 'Prafulla_Kumar_Gouda_Resume.pdf', // place the real PDF in /public with this exact name
  // Optional: URL of a form endpoint that accepts JSON (set VITE_FEEDBACK_ENDPOINT in .env). Never put secrets here.
  feedbackEndpoint: (import.meta.env.VITE_FEEDBACK_ENDPOINT as string | undefined) ?? '',
}

export const isFilled = (v: string) => v.trim().length > 0

export const highlights = [
  { label: 'Degree', value: 'BCA (Honours), Data Science' },
  { label: 'CGPA', value: '8.4 / 10' },
  { label: 'Built', value: 'Analytics & Python projects' },
  { label: 'Deployed', value: 'Business Intelligence app' },
  { label: 'Internship', value: 'Digital marketing' },
  { label: 'Leadership', value: 'NCC Army Wing & University Event Management' },
]

export const pillars = [
  {
    title: 'Analytical Thinking',
    text: 'I start with the question a dataset should answer, then clean, explore and visualise until the answer is clear.',
    tone: 'accent',
  },
  {
    title: 'Practical Project Development',
    text: 'My projects run end to end: from raw files to forecasts, segments and an interface people can actually use.',
    tone: 'accent',
  },
  {
    title: 'Leadership and Teamwork',
    text: 'I coordinate people, stay accountable and work toward a shared result. The Leadership section has the details.',
    tone: 'accent',
  },
] as const
