import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card as CardType } from '../types';
import { getColorStyle } from '../utils/cardUtils';

interface CardComponentProps {
  card: CardType;
  small?: boolean;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  card,
  small = false,
}) => {
  const color = getColorStyle(card.color);
  const size = small ? 50 : 80;
  const fontSize = small ? 12 : 18;

  return (
    <View
      style={[
        styles.card,
        {
          width: size,
          height: size * 1.4,
          backgroundColor: color,
        },
      ]}
    >
      <Text style={[styles.cardValue, { fontSize }]}>{card.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    marginHorizontal: 4,
  },
  cardValue: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
