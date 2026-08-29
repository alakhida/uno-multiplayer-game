# UNO Multiplayer Game - Development Guide

## Overview

This guide walks you through building a 2-4 player Uno game step-by-step. The project uses React Native + Expo for mobile, Firebase for backend, and Zustand for state management.

## Phase 1: Core Setup ✅ COMPLETED

You now have:
- React Native project with Expo
- Firebase configuration setup
- TypeScript types (Card, Player, GameState)
- Game utilities (card deck, shuffling, validation)
- Zustand store for state management
- Basic screen components
- Card rendering component

## Phase 2: Authentication (NEXT STEP)

### Step 1: Install Auth Service

Create `src/services/authService.ts`:

```typescript
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

export const authService = {
  async register(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async logout(): Promise<void> {
    await signOut(auth);
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser(): User | null {
    return auth.currentUser;
  },
};
```

### Step 2: Create Auth Store

Create `src/store/authStore.ts`:

```typescript
import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
```

### Step 3: Build Login & Register Screens

Create `src/screens/LoginScreen.tsx` and `src/screens/RegisterScreen.tsx` with email/password forms.

### Step 4: Set Up Navigation

Update your root `App.tsx` to conditionally show auth or game screens based on user login state.

## Phase 3: Room Management

- Create game rooms
- Join existing rooms
- Lobby with player list
- Start game logic

## Phase 4: Real-time Gameplay

- Firebase listeners for live updates
- Card play synchronization
- Turn-based action handling
- Win condition checking

## Phase 5: Polish & Testing

- UI animations
- Sound effects
- Error handling
- Performance optimization

## Quick Commands

```bash
# Start development
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Firebase Setup Checklist

- [ ] Create Firebase project
- [ ] Enable Authentication
- [ ] Enable Realtime Database
- [ ] Set database rules
- [ ] Add Firebase config to `.env`

## Next: Implement Authentication!

Start with the auth service and login screen. Test it works before moving to room management.
