import { useMemo } from 'react';
import type { UserProgressMap } from '../types';

interface ContributionGraphProps {
  userProgress: UserProgressMap;
}

// Get color class based on count
function getColorClass(count: number, isDark: boolean): string {
  if (count === 0) return isDark ? 'bg-slate-800' : 'bg-slate-100';
  if (count === 1) return isDark ? 'bg-emerald-900' : 'bg-emerald-200';
  if (count <= 3) return isDark ? 'bg-emerald-700' : 'bg-emerald-400';
  return isDark ? 'bg-emerald-500' : 'bg-emerald-600';
}

// Format date for display
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Get the date string key (YYYY-MM-DD) for grouping
function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function ContributionGraph({ userProgress }: ContributionGraphProps) {
  // Aggregate completions by date
  const { completionsByDate, legacyCount } = useMemo(() => {
    const byDate: Record<string, number> = {};
    let legacy = 0;

    for (const progress of Object.values(userProgress)) {
      if (progress.completed && progress.completedAt) {
        if (progress.completedAt === 'legacy') {
          legacy++;
        } else {
          const dateKey = progress.completedAt.split('T')[0];
          byDate[dateKey] = (byDate[dateKey] || 0) + 1;
        }
      }
    }

    return { completionsByDate: byDate, legacyCount: legacy };
  }, [userProgress]);

  // Generate grid data for the current calendar year (Jan 1 - Dec 31)
  const { weeks, months } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();
    
    // Start from January 1st of current year
    const jan1 = new Date(currentYear, 0, 1);
    
    // Find the Sunday on or before January 1st (to start the grid on Sunday)
    const startDate = new Date(jan1);
    const jan1DayOfWeek = jan1.getDay(); // 0 = Sunday
    startDate.setDate(jan1.getDate() - jan1DayOfWeek);
    
    // End on December 31st of current year
    const dec31 = new Date(currentYear, 11, 31);
    
    // Find the Saturday on or after December 31st (to complete the last week)
    const endDate = new Date(dec31);
    const dec31DayOfWeek = dec31.getDay();
    if (dec31DayOfWeek < 6) {
      endDate.setDate(dec31.getDate() + (6 - dec31DayOfWeek));
    }
    
    const weeksData: Array<Array<{ date: Date; count: number; dateKey: string; isCurrentYear: boolean }>> = [];
    const monthsData: Array<{ label: string; weekIndex: number }> = [];
    
    let currentDate = new Date(startDate);
    let currentMonth = -1;
    let weekIndex = 0;
    
    while (currentDate <= endDate) {
      const weekData: Array<{ date: Date; count: number; dateKey: string; isCurrentYear: boolean }> = [];
      
      for (let day = 0; day < 7; day++) {
        const dateKey = getDateKey(currentDate);
        const count = completionsByDate[dateKey] || 0;
        const isCurrentYear = currentDate.getFullYear() === currentYear;
        
        // Track month changes for labels (only for current year)
        if (isCurrentYear && currentDate.getMonth() !== currentMonth) {
          currentMonth = currentDate.getMonth();
          monthsData.push({
            label: currentDate.toLocaleDateString('en-US', { month: 'short' }),
            weekIndex: weekIndex,
          });
        }
        
        weekData.push({
          date: new Date(currentDate),
          count,
          dateKey,
          isCurrentYear,
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      weeksData.push(weekData);
      weekIndex++;
    }
    
    return { weeks: weeksData, months: monthsData };
  }, [completionsByDate]);

  // Calculate total completions (excluding legacy)
  const totalTracked = useMemo(() => {
    return Object.values(completionsByDate).reduce((sum, count) => sum + count, 0);
  }, [completionsByDate]);

  // Detect theme
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] shadow-lg">
      {/* Month labels */}
      <div className="flex mb-1 ml-8 text-xs text-[var(--text-muted)]">
        {months.map((month, idx) => (
          <div
            key={`${month.label}-${idx}`}
            className="absolute"
            style={{ left: `${month.weekIndex * 13 + 32}px` }}
          >
            {month.label}
          </div>
        ))}
      </div>
      
      {/* Grid with day labels */}
      <div className="flex gap-0.5 mt-4 relative">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1 text-xs text-[var(--text-muted)]">
          <div className="h-[10px]"></div>
          <div className="h-[10px] text-[9px] leading-[10px]">Mon</div>
          <div className="h-[10px]"></div>
          <div className="h-[10px] text-[9px] leading-[10px]">Wed</div>
          <div className="h-[10px]"></div>
          <div className="h-[10px] text-[9px] leading-[10px]">Fri</div>
          <div className="h-[10px]"></div>
        </div>
        
        {/* Weeks */}
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-0.5">
            {week.map((day, dayIdx) => {
              const isToday = getDateKey(new Date()) === day.dateKey;
              const isFuture = day.date > new Date();
              const isOutsideYear = !day.isCurrentYear;
              
              return (
                <div
                  key={dayIdx}
                  className={`
                    w-[10px] h-[10px] rounded-sm transition-colors
                    ${isFuture || isOutsideYear ? 'opacity-20' : ''}
                    ${isToday ? 'ring-1 ring-[var(--text-muted)]' : ''}
                    ${getColorClass((isFuture || isOutsideYear) ? 0 : day.count, isDark)}
                  `}
                  title={day.isCurrentYear ? `${formatDate(day.date)}: ${day.count} problem${day.count !== 1 ? 's' : ''}` : ''}
                />
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Legend and stats */}
      <div className="flex items-center justify-between mt-3 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-3">
          <span className="font-medium text-[var(--text-secondary)]">{new Date().getFullYear()}</span>
          <span>{totalTracked} problems this year</span>
          {legacyCount > 0 && (
            <span className="text-[var(--text-muted)]">
              + {legacyCount} before tracking
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className={`w-[10px] h-[10px] rounded-sm ${getColorClass(0, isDark)}`} />
          <div className={`w-[10px] h-[10px] rounded-sm ${getColorClass(1, isDark)}`} />
          <div className={`w-[10px] h-[10px] rounded-sm ${getColorClass(2, isDark)}`} />
          <div className={`w-[10px] h-[10px] rounded-sm ${getColorClass(4, isDark)}`} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
