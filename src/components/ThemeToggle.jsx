/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, cycleTheme, resolvedTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <svg 
            className="w-5 h-5 transition-transform duration-300 rotate-0" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        );
      case 'dark':
        return (
          <svg 
            className="w-5 h-5 transition-transform duration-300 rotate-0" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        );
      case 'system':
        return (
          <svg 
            className="w-5 h-5 transition-transform duration-300 rotate-0" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="theme-toggle group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-50/10 dark:bg-zinc-800/80 light:bg-white/80 ring-1 ring-inset ring-zinc-50/10 dark:ring-zinc-700/50 light:ring-zinc-200 backdrop-blur-xl transition-all duration-300 hover:ring-sky-400/50 hover:bg-zinc-50/20 dark:hover:bg-zinc-700/80 active:scale-95"
      aria-label={`Current theme: ${theme}. Click to change.`}
      title={`Theme: ${getLabel()}`}
    >
      <span className="relative flex items-center justify-center w-5 h-5 text-zinc-400 dark:text-zinc-300 light:text-zinc-600 group-hover:text-sky-400 transition-colors duration-300">
        {getIcon()}
      </span>
      <span className="text-xs font-medium text-zinc-400 dark:text-zinc-300 light:text-zinc-600 group-hover:text-sky-400 transition-colors duration-300 hidden sm:block">
        {getLabel()}
      </span>
      
      {/* Indicator dot */}
      <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full transition-colors duration-300 ${
        theme === 'light' ? 'bg-amber-400' : 
        theme === 'dark' ? 'bg-indigo-400' : 
        'bg-emerald-400'
      }`} />
    </button>
  );
};

export default ThemeToggle;
