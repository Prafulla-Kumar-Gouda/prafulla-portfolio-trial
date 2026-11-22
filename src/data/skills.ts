// Core stack shown above the category tabs so recruiters see the essentials first.
export const coreSkills = ['Python', 'SQL', 'Pandas', 'NumPy', 'Exploratory Data Analysis (EDA)'] as const

export const skillGroups = [
  { title: 'Programming and Query Languages', items: ['Python', 'SQL', 'R'] },
  { title: 'Data Analysis and Statistics', items: ['Pandas', 'NumPy', 'Statistical Analysis', 'Exploratory Data Analysis (EDA)'] },
  { title: 'Data Visualization and Business Intelligence', items: ['Microsoft Power BI', 'Tableau', 'Microsoft Excel', 'Matplotlib', 'Seaborn', 'Data Visualization', 'Business Intelligence', 'KPI Analysis'] },
  { title: 'Big Data and Databases', items: ['PySpark', 'Apache Spark', 'SQL', 'MongoDB'] },
  { title: 'Development and Testing Tools', items: ['Git', 'GitHub', 'Visual Studio Code', 'PyCharm', 'Google Colab', 'Selenium', 'Automated Website Testing'] },
  { title: 'Digital Marketing and Web Technologies', items: ['HTML', 'CSS', 'JavaScript', 'Search Engine Optimization (SEO)', 'Social Media Marketing (SMM)', 'Google Analytics', 'Google Search Console', 'Google Ads', 'SEMrush', 'Ahrefs', 'Canva', 'Keyword Research', 'Backlink Analysis', 'Performance Tracking'] },
  { title: 'Professional Skills', items: ['Leadership', 'Teamwork', 'Problem-Solving', 'Communication', 'Discipline', 'Coordination', 'Event Management'] },
] as const

// Where the main skills are actually used. Each line was checked against the project code or the owner's project
// description. SQL is deliberately absent: none of the listed projects uses a SQL database.
export const skillEvidence = [
  { skills: 'Python · Pandas · NumPy', project: 'AI Business Intelligence', use: 'Pandas cleaning and grouping for KPIs and trends; NumPy log-scaling of RFM features' },
  { skills: 'scikit-learn', project: 'AI Business Intelligence', use: 'K-Means customer segments, Linear Regression forecast' },
  { skills: 'Streamlit', project: 'AI Business Intelligence', use: 'The deployed interactive application' },
  { skills: 'EDA · Matplotlib · Seaborn · PySpark', project: 'Weather Data Analysis', use: 'Rainfall and seasonal trend analysis' },
  { skills: 'Python · Selenium', project: 'Website Testing Automation', use: 'Automated navigation, form and UI checks' },
  { skills: 'React · Flask · MongoDB', project: 'Online Food Booking System', use: 'Ordering, reservations and owner dashboard' },
] as const
