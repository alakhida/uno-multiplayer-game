import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authService.register(email, password, username);
      console.log('Registration successful');
      setUser(authService.getCurrentUser());
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the game</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#9CA3AF"
            value={username}
            onChangeText={setUsername}
            editable={!loading}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#9CA3AF"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#374151',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4B5563',
    fontSize: 16,
  },
  error: {
    color: '#EF4444',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  link: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
});
