import { profile } from './profile'

export type Category = 'Data Science' | 'Business Intelligence' | 'Web Development' | 'Automation'
export const filters: ('All Projects' | Category)[] = ['All Projects', 'Data Science', 'Business Intelligence', 'Web Development', 'Automation']

export interface Project {
  id: string
  title: string
  kind: string
  categories: Category[]
  summary: string
  tech: string[]
  github?: string
  live?: string
  note?: string
  problem?: string
  badge?: string // label on the card; defaults to 'Academic project'
  preview?: { src: string; w: number; h: number; alt: string; position?: string }
  highlights?: string[]
  details?: {
    overview: string
    solution: string
    covers: string[]
    skills: string[]
    builtWith: string[]
    // Shown only when there is a real record behind it (code, commit history or the owner's notes).
    findings?: string[]
    images?: { src: string; w: number; h: number; alt: string; caption: string }[]
    learned?: string[]
    challenges?: { challenge: string; solution: string }[]
    limitations?: string[]
    footnote?: string
  }
}

// Order = priority. Only repositories/links that actually exist are listed.
export const projects: Project[] = [
  {
    id: 'ai-bi',
    title: 'AI Business Intelligence — Universal Data Analytics Platform',
    kind: 'Data Analytics | Business Intelligence | Python',
    categories: ['Business Intelligence', 'Data Science'],
    summary:
      'An interactive Business Intelligence platform that turns raw business datasets into insights through automated data cleaning, business analytics, customer segmentation, sales forecasting, recommendations and rule-based business insights.',
    // Checked against the code: charts use Streamlit's built-in chart functions. Plotly is listed in requirements.txt but never imported.
    tech: ['Python', 'Pandas', 'NumPy', 'Streamlit', 'Scikit-learn'],
    problem: 'Cleaning, analysing, segmenting and forecasting business data usually takes several separate manual steps.',
    highlights: ['Upload CSV or Excel; business columns auto-detected', 'Cleaning report, KPIs, revenue and customer analysis', 'K-Means customer segments and a Linear Regression forecast'],
    github: profile.repo,
    live: profile.liveDemo,
  },
  {
    id: 'weather',
    title: 'Weather Data Analysis and Rainfall Prediction',
    kind: 'Data Science | Exploratory Data Analysis',
    categories: ['Data Science'],
    summary:
      'Analysed weather data using exploratory data analysis, statistical analysis and visualisation to investigate rainfall patterns and seasonal trends.',
    tech: ['Python', 'PySpark', 'Pandas', 'Matplotlib', 'Seaborn'],
    note: 'Academic project. No public repository.',
    problem: 'Understanding how rainfall changes across seasons from raw weather data.',
    highlights: ['Exploratory and statistical analysis', 'Rainfall patterns and seasonal trends', 'Matplotlib and Seaborn visuals'],
    details: {
      overview: 'A data analysis project that looks at weather records to understand how rainfall behaves across the seasons.',
      solution: 'Exploratory and statistical analysis of the weather data, with visualisations of rainfall patterns and seasonal trends.',
      covers: [
        'Exploratory data analysis to understand the weather data',
        'Statistical analysis to describe patterns in rainfall',
        'Visualisation of rainfall patterns and seasonal trends with Matplotlib and Seaborn',
        'PySpark for processing the data',
        'Framed as a data analysis and rainfall prediction project',
      ],
      skills: ['Exploratory data analysis', 'Statistics', 'Data visualisation', 'Python and PySpark'],
      builtWith: ['Python', 'PySpark', 'Pandas', 'Matplotlib', 'Seaborn'],
      footnote: 'Academic project. The dataset source, model accuracy and results are not published here.',
    },
  },
  {
    id: 'testing',
    title: 'Website Testing Automation',
    kind: 'Software Testing | Automation',
    categories: ['Automation'],
    summary:
      'Automated website testing workflows to validate navigation, forms, UI elements and functional behaviour.',
    tech: ['Python', 'Selenium', 'PyCharm'],
    note: 'Academic project. No public repository.',
    problem: 'Repeating the same website checks by hand is slow and easy to get wrong.',
    highlights: ['Navigation and form checks', 'UI element and functional checks', 'Python scripts with Selenium', 'Checks pages the way a user would'],
    details: {
      overview: 'A set of automated test workflows that check a website the way a real user would use it.',
      solution: 'Python and Selenium scripts that exercise navigation, forms, UI elements and functional behaviour automatically.',
      covers: [
        'Navigation: moving between pages and links',
        'Forms: filling in and submitting inputs',
        'UI elements: checking that key page elements are present and behave correctly',
        'Functional behaviour: confirming that features do what they should',
        'Scripts written in Python with Selenium, developed in PyCharm',
      ],
      skills: ['Test automation', 'Python scripting', 'Attention to quality'],
      builtWith: ['Python', 'Selenium', 'PyCharm'],
      footnote: 'Academic project. No public repository, and no coverage or defect figures are claimed.',
    },
  },
  {
    id: 'food',
    title: 'Online Food Booking System',
    kind: 'Web Development',
    categories: ['Web Development'],
    summary:
      'A cafeteria booking platform concept designed to streamline food ordering and reduce manual processes.',
    // Stack confirmed from the repository files (React front end, Flask API, MongoDB).
    tech: ['React', 'Python', 'Flask', 'MongoDB'],
    // Real screenshot of the app's home page, captured from the repository's code running locally.
    preview: { src: './screens/food-home.webp', w: 960, h: 600, position: 'center 40%', alt: 'Home screen of the Smart Dining Management app with options for Food Ordering, Table Reservation and About Us.' },
    github: 'https://github.com/Prafulla-Kumar-Gouda/Smart_Dining_Management',
    // Everything below was checked against the repository's code and package files.
    problem: 'Manual processes in cafeteria food ordering and table booking.',
    highlights: ['Sign-up, login and food ordering', 'Table reservation', 'Owner dashboard for orders', 'Customer feedback form'],
    details: {
      overview: 'A cafeteria booking platform concept to streamline food ordering and reduce manual processes, built as a React front end with a Flask API and a MongoDB database.',
      solution: 'A React front end and Flask API with MongoDB storage that handle sign-up and login, food orders, table reservations and an owner dashboard.',
      covers: [
        'Customer sign-up and login',
        'Food menu and online food ordering',
        'Table reservation',
        'An owner dashboard to manage food items, orders and reservations',
        'A customer feedback form',
        'Online payment (Cashfree sandbox) and SMS OTP (Twilio) integrations in the code',
      ],
      skills: ['Full-stack web development', 'REST API design', 'Database design'],
      builtWith: ['React', 'Python', 'Flask', 'MongoDB'],
      // Drawn from the repository's code. The repository has three commits and no written project notes, so no challenges are listed.
      learned: [
        'Connecting a React front end to a Flask REST API backed by MongoDB.',
        'Handling accounts securely: password hashing with bcrypt and token-based login with JWT.',
        'Integrating third-party services: SMS one-time passwords (Twilio) and payments (Cashfree sandbox).',
      ],
      limitations: [
        'Payments are wired to Cashfree\'s sandbox (test) environment, not live payments.',
        'One-time passwords are held in the server\'s memory, so they would not survive a restart or work across several servers.',
        'Concept project: it has not been deployed for real cafeteria use.',
      ],
      footnote: 'Public repository name: Smart_Dining_Management.',
    },
  },
]

// Everything below describes the featured project and was checked against the public repository.
export const featured = {
  problem:
    'Analysing a business dataset usually means doing several separate jobs by hand: cleaning the file, calculating KPIs, grouping customers, projecting sales and then explaining the results. This project brings those steps into one dashboard that starts from an uploaded CSV or Excel file.',
  caveat:
    'Which analyses appear depends on the uploaded data and the columns the platform can detect. It is a learning project, not a commercial product, and it does not claim to handle every dataset perfectly.',
  workflow: [
    { step: 'Upload dataset', detail: 'CSV or Excel file.' },
    { step: 'Detect columns', detail: 'Finds customers, products, dates, prices and quantities where possible.' },
    { step: 'Clean and validate', detail: 'Flags empty records, duplicates, invalid dates and unsuitable numbers.' },
    { step: 'Analyse', detail: 'KPIs, revenue trends, top products and customers, country revenue.' },
    { step: 'Segment customers', detail: 'RFM-style features with K-Means clustering.' },
    { step: 'Forecast sales', detail: 'Monthly history with Linear Regression.' },
    { step: 'Recommend and explain', detail: 'Recommendations and rule-based business insights.' },
  ],
  features: [
    { title: 'Universal dataset support', points: ['Reads CSV and Excel files.', 'Detects relevant business columns automatically where possible.'] },
    { title: 'Automated data cleaning', points: ['Identifies empty records and duplicate rows.', 'Handles invalid dates and unsuitable numeric values.'] },
    { title: 'Business analytics', points: ['Calculates business KPIs and revenue trends.', 'Ranks top products and customers, and shows country-level revenue.'] },
    { title: 'Customer segmentation', points: ['RFM-style features with K-Means clustering.', 'Groups customers such as VIP / loyal and at risk / inactive.'] },
    { title: 'Sales forecasting', points: ['Uses historical monthly sales and Linear Regression.', 'Needs suitable date and sales columns.'] },
    { title: 'Recommendations and insights', points: ['Customer, product and business recommendations.', 'Analytical, rule-based insights. No external LLM API is used.'] },
    { title: 'Interactive interface', points: ['Streamlit dashboard with currency options.', 'Dark and light presentation modes, plus an Analysis Tips guide.'] },
  ],
  methods: [
    {
      title: 'Statistical and analytical (no machine learning)',
      points: [
        'Business KPIs: revenue, customers, products and orders',
        'Monthly revenue trends, top products, top customers and country-wise revenue',
        'RFM feature engineering (recency, frequency, monetary value) per customer',
        'Product-pair analysis for products often bought together',
      ],
    },
    {
      title: 'Machine learning (scikit-learn)',
      points: [
        'K-Means clustering on standardised RFM features to form customer segments (four by default, fewer if there are too few customers)',
        'Linear Regression on monthly revenue to forecast future months',
      ],
    },
    {
      title: 'Rule-based insights (no external AI service)',
      points: [
        'Business insights and recommendations are generated by deterministic, explainable rules from the analytical, segmentation and forecast results',
        'No third-party LLM or AI API is called',
      ],
    },
  ],
  // Architecture as implemented: app.py (Streamlit UI) calls these modules in this order.
  pipeline: {
    before: [
      { title: 'Upload', detail: 'CSV, XLSX or XLS file in the Streamlit interface', file: 'app.py' },
      { title: 'Load and detect columns', detail: 'File checks, then business columns matched by name', file: 'modules/data_loader.py' },
      { title: 'Clean and validate', detail: 'Removes empty, duplicate and invalid rows; builds a cleaning report', file: 'modules/data_cleaner.py' },
      { title: 'Analyse', detail: 'KPIs, revenue trends, top products, customers and countries', file: 'modules/analytics.py' },
    ],
    branches: [
      { title: 'Segment customers', detail: 'RFM features, K-Means', file: 'modules/segmentation.py' },
      { title: 'Forecast sales', detail: 'Linear Regression on monthly revenue', file: 'modules/forecasting.py' },
      { title: 'Recommend', detail: 'Product pairs and customer recommendations', file: 'modules/recommendations.py' },
    ],
    after: [
      { title: 'Rule-based insights', detail: 'Explainable rules turn results into written insights', file: 'modules/ai_insights.py' },
      { title: 'Dashboard', detail: 'Tables and Streamlit charts; results kept in session state', file: 'app.py' },
    ],
  },
  // Drawn from the repository's code and commit history (8 to 22 Oct 2026).
  learned: [
    'Structuring an analysis workflow as separate, reusable modules: loading, cleaning, analytics, segmentation, forecasting, recommendations and insights.',
    'Handling inconsistent real-world data: validating the upload, cleaning it and reporting what was removed.',
    'Applying K-Means to RFM features and a Linear Regression forecast, and checking the forecast on a held-out month.',
    'Keeping an interactive Streamlit app responsive with session state.',
  ],
  challenges: [
    {
      challenge: 'The first version was built around one fixed dataset (Online Retail II).',
      solution: 'It was rebuilt as modules with column detection (names are normalised, then matched exactly and partially against known aliases), so files with different column names can be analysed.',
    },
    {
      challenge: 'Dashboard loading needed tuning (commits on 8 and 9 Oct 2026). Earlier versions used Streamlit caching.',
      solution: 'The current app keeps the uploaded data, cleaned data, detected columns and results in session state, so they are not recomputed on every interaction.',
    },
    {
      challenge: 'Not every dataset contains the columns each analysis needs.',
      solution: 'Analyses that need missing data show a "not available" message instead of failing, for example segmentation and forecasting.',
    },
  ],
  validation: [
    'File checks: rejects a missing upload, an unsupported file type or an empty dataset with a clear message (CSV, XLSX and XLS are supported).',
    'Cleaning report: removes empty rows and columns, duplicates, and rows with invalid dates, quantities or prices, and reports what was removed.',
    'Forecast check: with at least four months of data, the model is trained on earlier months and tested on the final month, reporting MAE and RMSE for that dataset.',
    'Testing: a smoke-test script runs detection, segmentation, forecasting, recommendations and insights end to end on a small sample dataset. It is not a full automated test suite.',
  ],
  limitations: [
    'Which analyses appear depends on the uploaded data and the columns the platform can detect; unusual column names may not be recognised.',
    'The forecast is a linear trend on monthly totals, so it does not model seasonality; it needs at least two months of data.',
    'Customer segmentation needs customer identifiers in the data.',
    'Insights are rule-based summaries, not generated analysis.',
    'It is a learning project; no commercial deployment or business impact is claimed.',
  ],
  next: [
    'Try seasonality-aware forecasting models alongside the linear trend.',
    'Add automated unit tests for the cleaning, segmentation and forecasting modules.',
    'Let users export the cleaned data and insight summaries.',
  ],
  stack: ['Python', 'Pandas', 'NumPy', 'Streamlit', 'Scikit-learn'],
  // Synthetic file made for demonstrations. Checked against the app's own modules: all seven business columns detected,
  // 23 messy rows cleaned out, 160 customers segmented and a three-month forecast produced.
  sample: {
    href: './sample-data/sample_sales_dataset.csv',
    file: 'sample_sales_dataset.csv',
    note: 'Synthetic data created for demonstration (about 3,000 rows, 12 months, 160 customers). It includes a few empty, duplicate and invalid rows on purpose, so the cleaning report has something to show.',
  },
  hostingNote: 'The demo runs on free hosting, so the first load can take a few seconds while the app wakes up.',
  screens: [
    { id: 'dashboard', label: 'Dashboard', src: './screens/dashboard.webp', w: 795, h: 782, alt: 'Streamlit home screen with dataset upload and a quick dataset review showing rows, columns and file type.' },
    { id: 'analytics', label: 'Business analytics', src: './screens/analytics.webp', w: 792, h: 1006, alt: 'Business analytics view of the platform with KPI and revenue analysis.' },
    { id: 'segmentation', label: 'Customer segmentation', src: './screens/segmentation.webp', w: 807, h: 935, alt: 'Customer segmentation view showing customer groups produced by K-Means clustering.' },
    { id: 'forecasting', label: 'Sales forecasting', src: './screens/forecasting.webp', w: 807, h: 806, alt: 'Sales forecasting view with historical and forecasted monthly revenue.' },
    { id: 'insights', label: 'Business insights', src: './screens/insights.webp', w: 797, h: 841, alt: 'Business insights view showing generated recommendations.' },
  ],
}
