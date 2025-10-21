// src/app/hooks.js
import { useDispatch, useSelector } from "react-redux";

/**
 * Hook personalizzato per useDispatch
 * Typed dispatch per TypeScript (futuro)
 */
export const useAppDispatch = () => useDispatch();

/**
 * Hook personalizzato per useSelector
 * Typed selector per TypeScript (futuro)
 */
export const useAppSelector = useSelector;

/**
 * Hook per le azioni della chat
 * Semplifica l'uso delle actions più comuni
 */
export const useChatActions = () => {
  const dispatch = useAppDispatch();

  return {
    sendMessage: (message) => dispatch(sendMessageThunk(message)),
    clearMessages: () => dispatch(clearMessages()),
    clearError: () => dispatch(clearError()),
  };
};

// Import delle actions (da aggiungere dopo)
import {
  sendMessageThunk,
  clearMessages,
  clearError,
} from "../features/chat/chatSlice";
