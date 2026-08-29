# UNO Multiplayer Game

A 2-4 player Uno card game clone for mobile built with React Native and Firebase for real-time multiplayer functionality.

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Firebase (Real-time Database + Authentication)
- **State Management**: Zustand
- **Navigation**: React Navigation

## Project Structure

```
src/
├── config/          # Firebase configuration
├── types/           # TypeScript type definitions
├── store/           # Zustand store for state management
├── utils/           # Game logic and card utilities
├── screens/         # Screen components
├── components/      # Reusable UI components
└── App.tsx          # Root component
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Go to Firebase Console and create a new project
2. Enable Authentication (Email/Password) and Realtime Database
3. Copy your Firebase config values
4. Create `.env` file with your Firebase credentials

### 3. Run the App

```bash
npm start
```

## Development Phases

- **Phase 1**: ✅ Core Setup (completed)
- **Phase 2**: Authentication Setup (in progress)
- **Phase 3**: Room Management
- **Phase 4**: Real-time Gameplay
- **Phase 5**: Polish & Testing

See `DEVELOPMENT_GUIDE.md` for detailed step-by-step instructions.
