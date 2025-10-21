// src/features/settings/settingsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { local } from "../../lib/storage/local";

const SETTINGS_STORAGE_KEY = "madgem_settings";

/**
 * Carica impostazioni da localStorage
 */
const loadSettings = () => {
  const saved = local.get(SETTINGS_STORAGE_KEY);
  return saved || {};
};

/**
 * Stato iniziale
 */
const initialState = {
  // Tema
  theme: "light", // 'light' | 'dark'

  // Lingua
  language: "it", // 'it' | 'en'

  // Preferenze AI
  model: "madgem", // 'madgem' | 'madgem-fast'

  // UI
  animations: true,
  soundEffects: false,

  // Privacy
  saveHistory: true,

  // Carica settings salvate
  ...loadSettings(),
};

/**
 * Settings Slice
 */
const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    /**
     * Cambia tema
     */
    setTheme: (state, action) => {
      state.theme = action.payload;
      local.set(SETTINGS_STORAGE_KEY, state);
    },

    /**
     * Cambia lingua
     */
    setLanguage: (state, action) => {
      state.language = action.payload;
      local.set(SETTINGS_STORAGE_KEY, state);
    },

    /**
     * Cambia modello AI
     */
    setModel: (state, action) => {
      state.model = action.payload;
      local.set(SETTINGS_STORAGE_KEY, state);
    },

    /**
     * Toggle animazioni
     */
    toggleAnimations: (state) => {
      state.animations = !state.animations;
      local.set(SETTINGS_STORAGE_KEY, state);
    },

    /**
     * Toggle effetti sonori
     */
    toggleSoundEffects: (state) => {
      state.soundEffects = !state.soundEffects;
      local.set(SETTINGS_STORAGE_KEY, state);
    },

    /**
     * Toggle salvataggio storico
     */
    toggleSaveHistory: (state) => {
      state.saveHistory = !state.saveHistory;
      local.set(SETTINGS_STORAGE_KEY, state);
    },

    /**
     * Reset tutte le impostazioni
     */
    resetSettings: (state) => {
      const defaults = {
        theme: "light",
        language: "it",
        model: "madgem",
        animations: true,
        soundEffects: false,
        saveHistory: true,
      };

      Object.assign(state, defaults);
      local.set(SETTINGS_STORAGE_KEY, defaults);
    },
  },
});

/**
 * Export actions
 */
export const {
  setTheme,
  setLanguage,
  setModel,
  toggleAnimations,
  toggleSoundEffects,
  toggleSaveHistory,
  resetSettings,
} = settingsSlice.actions;

/**
 * Selectors
 */
export const selectTheme = (state) => state.settings?.theme || "light";
export const selectLanguage = (state) => state.settings?.language || "it";
export const selectModel = (state) => state.settings?.model || "madgem";
export const selectAnimations = (state) => state.settings?.animations ?? true;
export const selectSoundEffects = (state) =>
  state.settings?.soundEffects ?? false;
export const selectSaveHistory = (state) => state.settings?.saveHistory ?? true;
export const selectAllSettings = (state) => state.settings || initialState;

/**
 * Export reducer
 */
export default settingsSlice.reducer;
