import { useApp } from '../context/AppContext';

export function Header() {
  const { settings, toggleTheme, stats } = useApp();
  const isDark = settings.theme === 'dark';
  
  // Get stats for each difficulty
  const easyTotal = stats.byDifficulty.Easy.total;
  const easyCompleted = stats.byDifficulty.Easy.completed;
  const mediumTotal = stats.byDifficulty.Medium.total;
  const mediumCompleted = stats.byDifficulty.Medium.completed;
  const hardTotal = stats.byDifficulty.Hard.total;
  const hardCompleted = stats.byDifficulty.Hard.completed;
  
  const total = stats.total || 1;
  
  // Calculate width percentages based on total problems in each difficulty
  const easyWidthPercent = (easyTotal / total) * 100;
  const mediumWidthPercent = (mediumTotal / total) * 100;
  const hardWidthPercent = (hardTotal / total) * 100;
  
  // Calculate fill percentages within each difficulty section
  const easyFillPercent = easyTotal > 0 ? (easyCompleted / easyTotal) * 100 : 0;
  const mediumFillPercent = mediumTotal > 0 ? (mediumCompleted / mediumTotal) * 100 : 0;
  const hardFillPercent = hardTotal > 0 ? (hardCompleted / hardTotal) * 100 : 0;

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* Logo Icon - theme aware */}
            <div className="relative">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10' 
                  : 'bg-gradient-to-br from-cyan-500 to-sky-500 border border-white/20'
              }`}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  {/* Double brackets << >> */}
                  {/* Left outer bracket */}
                  <path 
                    d="M6 5L2 12L6 19" 
                    stroke={isDark ? "white" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isDark ? "0.25" : "0.5"}
                  />
                  {/* Left inner bracket */}
                  <path 
                    d="M10 5L6 12L10 19" 
                    stroke={isDark ? "#0ea5e9" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Right inner bracket */}
                  <path 
                    d="M14 5L18 12L14 19" 
                    stroke={isDark ? "#0ea5e9" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Right outer bracket */}
                  <path 
                    d="M18 5L22 12L18 19" 
                    stroke={isDark ? "white" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isDark ? "0.25" : "0.5"}
                  />
                </svg>
              </div>
              {/* Subtle glow behind icon */}
              <div className={`absolute inset-0 w-9 h-9 rounded-xl blur-xl -z-10 ${
                isDark ? 'bg-cyan-500 opacity-20' : 'bg-cyan-400 opacity-30'
              }`} />
            </div>
            
            {/* Brand Name */}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight gradient-text">
                Beast Code
              </h1>
              <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider -mt-0.5">
                NeetCode 150 without categories
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* NeetCode-style Segmented Progress Bar */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)]">
              {/* Progress bar with difficulty sections */}
              <div 
                className="w-72 h-3 rounded-full overflow-hidden flex"
                title={`Easy: ${easyCompleted}/${easyTotal} | Medium: ${mediumCompleted}/${mediumTotal} | Hard: ${hardCompleted}/${hardTotal}`}
              >
                {/* Easy section - green */}
                <div 
                  className="h-full bg-emerald-500/20 dark:bg-emerald-500/20 relative overflow-hidden"
                  style={{ width: `${easyWidthPercent}%` }}
                >
                  <div 
                    className="absolute inset-y-0 left-0 bg-emerald-500 dark:bg-emerald-400 transition-all duration-500"
                    style={{ width: `${easyFillPercent}%` }}
                  />
                </div>
                
                {/* Medium section - amber/yellow */}
                <div 
                  className="h-full bg-amber-500/20 dark:bg-amber-500/20 relative overflow-hidden"
                  style={{ width: `${mediumWidthPercent}%` }}
                >
                  <div 
                    className="absolute inset-y-0 left-0 bg-amber-500 dark:bg-amber-400 transition-all duration-500"
                    style={{ width: `${mediumFillPercent}%` }}
                  />
                </div>
                
                {/* Hard section - red/rose */}
                <div 
                  className="h-full bg-rose-500/20 dark:bg-rose-500/20 relative overflow-hidden"
                  style={{ width: `${hardWidthPercent}%` }}
                >
                  <div 
                    className="absolute inset-y-0 left-0 bg-rose-500 dark:bg-rose-400 transition-all duration-500"
                    style={{ width: `${hardFillPercent}%` }}
                  />
                </div>
              </div>
              
              {/* Count */}
              <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">
                {stats.completed}<span className="text-[var(--text-muted)] font-normal">/{stats.total}</span>
              </span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--text-muted)] flex items-center justify-center transition-all duration-300 hover:shadow-md group"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {/* Sun icon */}
              <svg 
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  isDark 
                    ? 'opacity-100 rotate-0 scale-100 text-amber-400' 
                    : 'opacity-0 -rotate-90 scale-50 text-amber-500'
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              
              {/* Moon icon */}
              <svg 
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  isDark 
                    ? 'opacity-0 rotate-90 scale-50 text-slate-400' 
                    : 'opacity-100 rotate-0 scale-100 text-slate-600'
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
