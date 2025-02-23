import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BreathingSettings, VisualizationMethod} from '../types';

interface SettingsContextType {
  settings: BreathingSettings;
  updateSettings: (newSettings: Partial<BreathingSettings>) => Promise<void>;
  activeMethod: VisualizationMethod;
  setActiveMethod: (method: VisualizationMethod) => void;
}

const defaultSettings: BreathingSettings = {
  phaseDuration: 4,
  numberOfCycles: 4,
  enableSound: true,
  enableVoice: true,
  enableHaptics: true,
  enableVisuals: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [settings, setSettings] = useState<BreathingSettings>(defaultSettings);
  const [activeMethod, setActiveMethod] =
    useState<VisualizationMethod>('progress');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('breathingSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const updateSettings = async (newSettings: Partial<BreathingSettings>) => {
    const updatedSettings = {...settings, ...newSettings};
    setSettings(updatedSettings);
    try {
      await AsyncStorage.setItem(
        'breathingSettings',
        JSON.stringify(updatedSettings),
      );
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{settings, updateSettings, activeMethod, setActiveMethod}}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
