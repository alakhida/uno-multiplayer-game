export type CardColor = 'red' | 'yellow' | 'green' | 'blue' | 'wild';
export type CardValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'Skip' | 'Reverse' | 'DrawTwo' | 'Wild' | 'WildDrawFour';

export interface Card {
  id: string;
  color: CardColor;
  value: CardValue;
}

export interface Player {
  id: string;
  name: string;
  cards: Card[];
  cardCount: number;
  isActive: boolean;
  isHost: boolean;
}

export interface GameState {
  gameId: string;
  status: 'waiting' | 'active' | 'finished';
  players: Player[];
  currentPlayerIndex: number;
  discardPile: Card[];
  drawPile: Card[];
  currentColor?: CardColor;
  direction: 'clockwise' | 'counterclockwise';
  winner?: string;
  createdAt: number;
}

export interface GameRoom {
  roomId: string;
  hostId: string;
  playerCount: number;
  maxPlayers: number;
  status: 'open' | 'playing' | 'finished';
  createdAt: number;
}
