import {
  siApachespark, siCss, siGit, siGithub, siGoogleads, siGoogleanalytics, siGooglecolab, siGooglesearchconsole,
  siFlask, siHtml5, siJavascript, siMongodb, siNumpy, siPandas, siPycharm, siPython, siR, siReact, siSelenium, siSemrush,
  type SimpleIcon,
} from 'simple-icons'
import {
  Activity, BarChart3, CalendarDays, Code2, Database, FileSpreadsheet, Flag, LayoutDashboard, LineChart, Link2,
  MessageSquare, Network, PieChart, Puzzle, Search, Share2, ShieldCheck, Sigma, Target, TestTube2, Users, KeyRound,
  Palette, Link as LinkIcon, Search as SearchIcon, type LucideIcon,
} from 'lucide-react'

const brand: Record<string, SimpleIcon> = {
  Python: siPython, R: siR, Pandas: siPandas, NumPy: siNumpy, PySpark: siApachespark, 'Apache Spark': siApachespark, MongoDB: siMongodb,
  'Google Analytics': siGoogleanalytics, 'Google Search Console': siGooglesearchconsole, 'Google Ads': siGoogleads,
  SEMrush: siSemrush, HTML: siHtml5, CSS: siCss, JavaScript: siJavascript, Selenium: siSelenium, Git: siGit,
  GitHub: siGithub, PyCharm: siPycharm, 'Google Colab': siGooglecolab, React: siReact, Flask: siFlask,
}

// Skills without a brand mark in the icon set get a clear generic icon instead.
const generic: Record<string, LucideIcon> = {
  SQL: Database, 'Statistical Analysis': Sigma, 'Exploratory Data Analysis (EDA)': SearchIcon,
  'Microsoft Power BI': BarChart3, Tableau: LineChart, 'Microsoft Excel': FileSpreadsheet, Matplotlib: LineChart,
  Seaborn: PieChart, 'Data Visualization': PieChart, 'Business Intelligence': LayoutDashboard, 'KPI Analysis': Target,
  'Search Engine Optimization (SEO)': Search, 'Social Media Marketing (SMM)': Share2, Ahrefs: LinkIcon, Canva: Palette,
  'Keyword Research': KeyRound, 'Backlink Analysis': Link2, 'Performance Tracking': Activity,
  'Automated Website Testing': TestTube2, 'Visual Studio Code': Code2,
  Leadership: Flag, Teamwork: Users, 'Problem-Solving': Puzzle, Communication: MessageSquare, Discipline: ShieldCheck,
  Coordination: Network, 'Event Management': CalendarDays,
}

export default function SkillIcon({ name, large = false }: { name: string; large?: boolean }) {
  const b = brand[name]
  const Generic = generic[name] ?? Code2
  return (
    <span className={`inline-flex shrink-0 ${large ? 'h-12 w-12 rounded-xl' : 'h-7 w-7'} items-center justify-center ${large ? '' : 'rounded-lg'} bg-[#f5f5f5] shadow-sm ring-1 ring-black/10`} aria-hidden>
      {b ? (
        <svg viewBox="0 0 24 24" width={large ? 26 : 17} height={large ? 26 : 17} fill={`#${b.hex}`}><path d={b.path} /></svg>
      ) : (
        <Generic size={large ? 24 : 16} color="#9a7523" strokeWidth={2} />
      )}
    </span>
  )
}
