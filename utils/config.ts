'use client';

import { SavedConfig, ConfigState } from '@/lib/types/config';
import { generateSessionId } from './helper';

const CONFIG_STORAGE_KEY = 'hubtel-ps-configs';

export const saveConfig = (config: ConfigState): SavedConfig => {
  const configs = loadConfigs();
  const timestamp = new Date().toISOString();
  
  const savedConfig: SavedConfig = {
    ...config,
    id: config.id || generateSessionId(), 
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const existingIndex = configs.findIndex(c => c.id === config.id);
  
  if (existingIndex >= 0) {
    configs[existingIndex] = savedConfig;
  } else {
    configs.push(savedConfig);
  }

  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configs));
  return savedConfig;
};

export const loadConfigs = (): SavedConfig[] => {
  const configsJson = localStorage.getItem(CONFIG_STORAGE_KEY);
  return configsJson ? JSON.parse(configsJson) : [];
};

export const deleteConfig = (id: string): void => {
  const configs = loadConfigs().filter(config => config.id !== id);
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configs));
};

export const getConfig = (id: string): SavedConfig | null => {
  const configs = loadConfigs();
  return configs.find(config => config.id === id) || null;
};