import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { ContributionGraph } from './ContributionGraph';
import { AuthModal } from './AuthModal';

// Data Sync Button with Popover
function DataSyncButton() {
  const { exportData, importData, restoreBackup, hasBackup } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Clear status after a delay
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleExport = () => {
    exportData();
    setStatus({ type: 'success', message: 'Data exported!' });
    setIsOpen(false);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await importData(file);
    
    if (result.success) {
      if (result.warnings && result.warnings.length > 0) {
        setStatus({ type: 'warning', message: `Imported with warnings: ${result.warnings[0]}` });
      } else {
        setStatus({ type: 'success', message: 'Data imported successfully!' });
      }
    } else {
      setStatus({ type: 'error', message: result.error || 'Import failed' });
    }

    // Reset file input
    e.target.value = '';
    setIsOpen(false);
  };

  const handleRestore = () => {
    const success = restoreBackup();
    if (success) {
      setStatus({ type: 'success', message: 'Backup restored!' });
    } else {
      setStatus({ type: 'error', message: 'No backup found' });
    }
    setIsOpen(false);
  };

  const backupExists = hasBackup();

  return (
    <div className="relative">
      {/* Sync Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        title="Import / Export Data"
        className="relative w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--text-muted)] flex items-center justify-center transition-all duration-300 hover:shadow-md"
        aria-label="Import or export data"
        aria-expanded={isOpen}
      >
        {/* Sync/Cloud icon */}
        <svg 
          className="w-5 h-5 text-[var(--text-secondary)]" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" 
          />
        </svg>
      </button>

      {/* Status Toast */}
      {status && (
        <div className="absolute top-full right-0 mt-2 px-3 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] shadow-lg text-sm font-medium text-[var(--text-primary)] z-50 animate-fade-in flex items-center gap-2 whitespace-nowrap">
          {/* Status Icon */}
          {status.type === 'success' && (
            <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {status.type === 'warning' && (
            <svg className="w-4 h-4 text-amber-500 dark:text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )}
          {status.type === 'error' && (
            <svg className="w-4 h-4 text-rose-500 dark:text-rose-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <span>{status.message}</span>
        </div>
      )}

      {/* Popover */}
      {isOpen && !status && (
        <div 
          ref={popoverRef}
          className="absolute top-full right-0 mt-2 w-48 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-xl shadow-lg z-50 animate-fade-in overflow-hidden"
        >
          <div className="p-2 space-y-1">
            {/* Export Button */}
            <button
              onClick={handleExport}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Export Data
            </button>

            {/* Import Button */}
            <button
              onClick={handleImportClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Import Data
            </button>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Restore Backup - only shown if backup exists */}
            {backupExists && (
              <>
                <div className="border-t border-[var(--border-color)] my-1" />
                <button
                  onClick={handleRestore}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Restore Backup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function UserMenuButton() {
  const { user, signOut } = useAuth();
  const { syncStatus } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!user) return null;

  const initial = (user.email?.[0] ?? '?').toUpperCase();

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
        title={user.email ?? 'Account'}
      >
        {initial}
        {syncStatus === 'error' && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-[var(--bg-elevated)]" />
        )}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full right-0 mt-2 w-56 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-xl shadow-lg z-50 animate-fade-in overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-[var(--border-color)]">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.email}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {syncStatus === 'syncing' ? 'Syncing...' : syncStatus === 'error' ? 'Sync error' : 'Synced'}
            </p>
          </div>
          <div className="p-2">
            <button
              onClick={() => { signOut(); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { settings, toggleTheme, stats, userProgress } = useApp();
  const { user, loading: authLoading } = useAuth();
  const [showGraph, setShowGraph] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const handleMouseEnter = () => {
    // Add delay to prevent accidental triggers
    hoverTimeoutRef.current = setTimeout(() => {
      setShowGraph(true);
    }, 200);
  };
  
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowGraph(false);
  };
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
    <>
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
          <div className="flex items-center gap-2">
            {/* NeetCode-style Segmented Progress Bar with hover popup */}
            <div 
              className="relative hidden sm:block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] cursor-pointer hover:border-[var(--text-muted)] transition-colors">
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
              
              {/* Contribution Graph Popup - positioned to allow hovering onto it */}
              {showGraph && (
                <div className="absolute top-full right-0 pt-2 z-50 animate-fade-in">
                  <ContributionGraph userProgress={userProgress} />
                </div>
              )}
            </div>

            {/* Data Sync Button */}
            <DataSyncButton />

            {/* Auth: Sign In button or User menu */}
            {!authLoading && (
              user ? (
                <UserMenuButton />
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="h-10 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--text-muted)] flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )
            )}

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
    <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
