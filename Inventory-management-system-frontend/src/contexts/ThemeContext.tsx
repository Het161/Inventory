'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  displayDensity: 'compact' | 'comfortable' | 'spacious';
  setDisplayDensity: (density: 'compact' | 'comfortable' | 'spacious') => void;
  actualTheme: 'light' | 'dark'; // The resolved theme (auto becomes light/dark)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'auto'>('light');
  const [displayDensity, setDisplayDensityState] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Load from localStorage on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs);
        if (prefs.theme) setThemeState(prefs.theme);
        if (prefs.displayDensity) setDisplayDensityState(prefs.displayDensity);
      } catch (e) {
        console.error('Failed to parse preferences:', e);
      }
    }
  }, []);

  // Handle theme changes and auto detection
  useEffect(() => {
    let resolvedTheme: 'light' | 'dark' = 'light';

    if (theme === 'auto') {
      // Auto detect system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      resolvedTheme = isDark ? 'dark' : 'light';
    } else {
      resolvedTheme = theme;
    }

    setActualTheme(resolvedTheme);

    // Apply theme to document
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save to localStorage
    const savedPrefs = localStorage.getItem('userPreferences');
    const prefs = savedPrefs ? JSON.parse(savedPrefs) : {};
    localStorage.setItem('userPreferences', JSON.stringify({ ...prefs, theme, displayDensity }));
  }, [theme, displayDensity]);

  const setTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    setThemeState(newTheme);
  };

  const setDisplayDensity = (density: 'compact' | 'comfortable' | 'spacious') => {
    setDisplayDensityState(density);
    // Apply CSS variable for density
    document.documentElement.style.setProperty(
      '--spacing-multiplier',
      density === 'compact' ? '0.75' : density === 'spacious' ? '1.25' : '1'
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, displayDensity, setDisplayDensity, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
