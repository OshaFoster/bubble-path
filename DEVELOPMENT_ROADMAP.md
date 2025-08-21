# Bubble Path Development Roadmap

## Current Status
- Working bubble game with animations and hint system
- Single screen with 550+ lines of code
- Basic game progression through multiple configs
- Ready for scaling to 100+ games

## Immediate Code Cleanup (Before Scaling)

### 1. Component Separation
- [ ] Extract `DriftingBubble` → `components/DriftingBubble.tsx`
- [ ] Extract `HintBubble` → `components/HintBubble.tsx`
- [ ] Create `components/GameScreen.tsx` for main game logic
- [ ] Move shared styles to `styles/gameStyles.ts`

### 2. Custom Hooks for State Management
- [ ] Create `hooks/useGameState.ts` (current game, transitions, completion)
- [ ] Create `hooks/useHintSystem.ts` (hint timer, auto-complete logic)
- [ ] Create `hooks/useBubbleAnimation.ts` (position, movement logic)
- [ ] Create `hooks/useProgressTracking.ts` (games completed counter)

### 3. Game Configuration Refactor
- [ ] Split game configs by difficulty: `data/easy/`, `data/medium/`, `data/hard/`
- [ ] Convert to JSON format for easier management
- [ ] Add TypeScript interfaces for game configs
- [ ] Create validation schema for game structure

### 4. Performance Optimizations
- [ ] Add `React.memo()` to bubble components
- [ ] Use `useMemo()` for expensive calculations (`getBottomConfig`)
- [ ] Consider virtualization for future game selection screens
- [ ] Extract animation configurations to constants

## User Flow Implementation

### Minimal Auth Flow
- [ ] Create `app/login.tsx` (simple email/password or Apple/Google)
- [ ] Add `contexts/AuthContext.tsx` for auth state
- [ ] Update `app/_layout.tsx` with auth check
- [ ] Implement purchase verification integration

### Progress Tracking
- [ ] Add games completed counter to UI
- [ ] Integrate counter increment in `handleGameComplete()`
- [ ] Persist progress to AsyncStorage (temporary)
- [ ] Add progress display component

## Firebase Backend Integration

### Authentication Setup
- [ ] Install Firebase SDK (`firebase`, `@react-native-firebase/app`, `@react-native-firebase/auth`)
- [ ] Configure Firebase project
- [ ] Implement Apple Sign-In integration
- [ ] Implement Google Sign-In integration
- [ ] Add anonymous auth fallback

### Database Structure
```javascript
// Users collection
users/{userId}: {
  email: string,
  displayName: string,
  purchaseVerified: boolean,
  createdAt: timestamp,
  lastActive: timestamp
}

// Progress collection
progress/{userId}: {
  currentLevel: number,
  completedGames: number[],
  totalGamesCompleted: number,
  totalPlayTime: number,
  achievements: string[],
  streaks: object,
  lastPlayed: timestamp
}

// Analytics collection (optional)
sessions/{sessionId}: {
  userId: string,
  gameId: number,
  startTime: timestamp,
  endTime: timestamp,
  completed: boolean,
  hintsUsed: number
}
```

### Firebase Features to Implement
- [ ] Real-time progress sync
- [ ] Offline data caching with Firestore
- [ ] Cloud Functions for game progression validation
- [ ] Firebase Analytics for user behavior
- [ ] Push notifications for re-engagement
- [ ] Remote Config for game difficulty tuning

### Advanced Features (Future)
- [ ] Leaderboards with Firestore queries
- [ ] Social features (share progress)
- [ ] Daily challenges with Cloud Functions
- [ ] A/B testing with Remote Config
- [ ] Crash reporting with Crashlytics

## File Structure (Target)
```
app/
  _layout.tsx              // Auth routing logic
  login.tsx               // Authentication screen
  (tabs)/
    index.tsx             // Main game screen (simplified)
    progress.tsx          // Progress/stats screen
    
components/
  game/
    DriftingBubble.tsx
    HintBubble.tsx
    GameScreen.tsx
  ui/
    ProgressCounter.tsx
    LoadingScreen.tsx

hooks/
  useGameState.ts
  useHintSystem.ts
  useBubbleAnimation.ts
  useProgressTracking.ts
  useFirebaseAuth.ts

data/
  easy/
    games-1-20.json
  medium/
    games-21-60.json
  hard/
    games-61-100.json

contexts/
  AuthContext.tsx
  GameContext.tsx

services/
  firebase.ts
  gameLoader.ts
  progressSync.ts

types/
  game.ts
  user.ts
  progress.ts
```

## Priority Order
1. **Component separation** (makes everything else easier)
2. **Custom hooks** (cleaner state management)
3. **Progress tracking** (core feature)
4. **Auth implementation** (user accounts)
5. **Firebase integration** (backend sync)
6. **Game config scaling** (100+ games)
7. **Performance optimizations** (smooth experience)

## Notes
- Keep current game logic intact during refactoring
- Test each refactor step to avoid breaking animations
- Firebase offers generous free tier, perfect for MVP
- Consider Expo EAS Build for Firebase native module integration
- Implement offline-first approach for better UX