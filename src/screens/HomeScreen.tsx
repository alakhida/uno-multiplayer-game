import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UNO</Text>
      <Text style={styles.subtitle}>Multiplayer Card Game</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateRoom')}
      >
        <Text style={styles.buttonText}>Create Room</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('JoinRoom')}
      >
        <Text style={styles.buttonText}>Join Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  title: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
