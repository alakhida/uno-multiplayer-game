import { Card, CardColor, CardValue } from '../types';

const COLORS: CardColor[] = ['red', 'yellow', 'green', 'blue'];
const NUMBER_VALUES: CardValue[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ACTION_VALUES: CardValue[] = ['Skip', 'Reverse', 'DrawTwo'];
const WILD_VALUES: CardValue[] = ['Wild', 'WildDrawFour'];

export const createUnoDeck = (): Card[] => {
  const deck: Card[] = [];
  let cardId = 0;

  COLORS.forEach((color) => {
    deck.push({
      id: `${cardId++}`,
      color,
      value: '0',
    });

    NUMBER_VALUES.slice(1).forEach((value) => {
      deck.push(
        {
          id: `${cardId++}`,
          color,
          value,
        },
        {
          id: `${cardId++}`,
          color,
          value,
        }
      );
    });

    ACTION_VALUES.forEach((value) => {
      deck.push(
        {
          id: `${cardId++}`,
          color,
          value,
        },
        {
          id: `${cardId++}`,
          color,
          value,
        }
      );
    });
  });

  for (let i = 0; i < 4; i++) {
    deck.push({
      id: `${cardId++}`,
      color: 'wild',
      value: 'Wild',
    });
    deck.push({
      id: `${cardId++}`,
      color: 'wild',
      value: 'WildDrawFour',
    });
  }

  return deck;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const isValidMove = (
  playedCard: Card,
  topCard: Card,
  currentColor?: CardColor
): boolean => {
  if (playedCard.color === 'wild') {
    return true;
  }

  if (currentColor) {
    if (playedCard.color === currentColor) return true;
  }

  return playedCard.color === topCard.color || playedCard.value === topCard.value;
};

export const getColorStyle = (color: CardColor): string => {
  const colorMap: Record<CardColor, string> = {
    red: '#EF4444',
    yellow: '#FBBF24',
    green: '#22C55E',
    blue: '#3B82F6',
    wild: '#000000',
  };
  return colorMap[color];
};
