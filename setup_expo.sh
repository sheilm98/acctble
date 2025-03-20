#!/bin/bash

# Create a new Expo project
npx create-expo-app HabitBuddyApp
cd HabitBuddyApp

# Install necessary dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install redux react-redux redux-thunk @reduxjs/toolkit axios
npm install expo-camera expo-location expo-status-bar
npm install @react-native-async-storage/async-storage

# Create the file structure
mkdir -p src/{assets/{icons,images},components,constants,navigation,redux/{actions,reducers,slices},screens/{auth,habits,home,notifications,profile,social},services,utils}

# Create base files with minimal content
touch src/constants/{Colors.js,Layout.js,Theme.js}
touch src/navigation/{AppNavigator.js,AuthNavigator.js,TabNavigator.js}
touch src/redux/{store.js,actions/index.js,reducers/index.js}
touch src/services/{api.js,auth.js,habits.js,storage.js}
touch src/utils/{dateHelpers.js,mockData.js,permissions.js,validation.js}

# Create component files
touch src/components/{Button.js,CheckInCard.js,FriendItem.js,HabitCard.js,LeaderboardItem.js,LoadingSpinner.js,NotificationItem.js,PhotoPreview.js,ProgressBar.js}

# Create screen files
touch src/screens/auth/{LoginScreen.js,OnboardingScreen.js,RegisterScreen.js,WelcomeScreen.js}
touch src/screens/habits/{CheckInScreen.js,CreateHabitScreen.js,HabitDetailScreen.js,VerificationScreen.js}
touch src/screens/home/HomeScreen.js
touch src/screens/notifications/NotificationsScreen.js
touch src/screens/profile/{ProfileScreen.js,SettingsScreen.js}
touch src/screens/social/{FriendsScreen.js,LeaderboardScreen.js}

echo "Project structure created successfully!"