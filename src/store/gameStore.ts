import { create } from 'zustand';
import { GameState, Player, Card } from '../types';

interface GameStore {
  gameState: GameState | null;
  currentPlayerId: string | null;
  setGameState: (state: GameState) => void;
  setCurrentPlayerId: (id: string) => void;
  updatePlayerCards: (playerId: string, cards: Card[]) => void;
  setCurrentPlayerIndex: (index: number) => void;
  updateDiscardPile: (cards: Card[]) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: null,
  currentPlayerId: null,
  setGameState: (state) => set({ gameState: state }),
  setCurrentPlayerId: (id) => set({ currentPlayerId: id }),
  updatePlayerCards: (playerId, cards) =>
    set((state) => {
      if (!state.gameState) return {};
      return {
        gameState: {
          ...state.gameState,
          players: state.gameState.players.map((p) =>
            p.id === playerId ? { ...p, cards, cardCount: cards.length } : p
          ),
        },
      };
    }),
  setCurrentPlayerIndex: (index) =>
    set((state) => {
      if (!state.gameState) return {};
      return {
        gameState: {
          ...state.gameState,
          currentPlayerIndex: index,
        },
      };
    }),
  updateDiscardPile: (cards) =>
    set((state) => {
      if (!state.gameState) return {};
      return {
        gameState: {
          ...state.gameState,
          discardPile: cards,
        },
      };
    }),
  resetGame: () => set({ gameState: null, currentPlayerId: null }),
}));
