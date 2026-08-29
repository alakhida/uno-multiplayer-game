import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';

interface AuthError {
  code: string;
  message: string;
}

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export const authService = {
  // Register new user with email and password
  async register(email: string, password: string, displayName: string): Promise<AuthUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName,
      };
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  // Login user with email and password
  async login(email: string, password: string): Promise<AuthUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  // Logout current user
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // Get current user as AuthUser
  getCurrentAuthUser(): AuthUser | null {
    const user = auth.currentUser;
    if (!user) return null;
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  },
};

// Error handler function
function handleAuthError(error: any): AuthError {
  let message = 'An authentication error occurred';
  
  switch (error.code) {
    case 'auth/email-already-in-use':
      message = 'Email is already in use';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address';
      break;
    case 'auth/weak-password':
      message = 'Password is too weak (min 6 characters)';
      break;
    case 'auth/user-not-found':
      message = 'User not found';
      break;
    case 'auth/wrong-password':
      message = 'Incorrect password';
      break;
    case 'auth/too-many-requests':
      message = 'Too many failed login attempts. Try again later.';
      break;
    default:
      message = error.message || 'An error occurred';
  }
  
  return {
    code: error.code || 'unknown',
    message,
  };
}
