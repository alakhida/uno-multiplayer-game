import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>UNO</Text>
        <Text style={styles.welcome}>
          Welcome, {user?.displayName || 'Player'}!
        </Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Room</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.buttonText}>Join Room</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.buttonText}>Play vs AI</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcome: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
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
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
