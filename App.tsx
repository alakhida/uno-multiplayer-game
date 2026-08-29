import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from './src/store/authStore';
import { authService } from './src/services/authService';

// Auth Screens
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';

// Game Screens
import { HomeScreen } from './src/screens/HomeScreen';
import { GameScreen } from './src/screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F2937' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { color: '#FFFFFF', fontWeight: '600' },
          cardStyle: { backgroundColor: '#1F2937' },
        }}
      >
        {user ? (
          // Game Screens (User is logged in)
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen}
              options={{ title: 'Game' }}
            />
          </>
        ) : (
          // Auth Screens (User is not logged in)
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
