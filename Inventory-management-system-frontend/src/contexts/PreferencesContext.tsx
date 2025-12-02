'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Preferences {
  theme: string;
  currency: string;
  language: string;
  dateFormat: string;
  timezone: string;
  numberFormat: string;
  displayDensity: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  lowStockAlerts: boolean;
  weekStart: string;
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (newPrefs: Partial<Preferences>) => void;
}

const defaultPreferences: Preferences = {
  theme: 'light',
  currency: 'USD',
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  timezone: 'Asia/Kolkata',
  numberFormat: 'comma',
  displayDensity: 'comfortable',
  emailNotifications: true,
  pushNotifications: false,
  lowStockAlerts: true,
  weekStart: 'monday',
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const updatePreferences = (newPrefs: Partial<Preferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPrefs };
      localStorage.setItem('userPreferences', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return context;
}
