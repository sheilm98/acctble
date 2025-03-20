// App.js - Navigation Structure
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import store from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Auth Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OnboardingScreen from './screens/OnboardingScreen';

// Main App Screens
import HomeScreen from './screens/HomeScreen';
import HabitDetailScreen from './screens/HabitDetailScreen';
import CreateHabitScreen from './screens/CreateHabitScreen';
import CheckInScreen from './screens/CheckInScreen';
import VerificationScreen from './screens/VerificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import FriendsScreen from './screens/FriendsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SettingsScreen from './screens/SettingsScreen';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    </AuthStack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="HomeTab" component={HomeScreen} options={{ title: 'My Habits' }} />
      <MainStack.Screen name="HabitDetail" component={HabitDetailScreen} options={({ route }) => ({ title: route.params.habitTitle })} />
      <MainStack.Screen name="CreateHabit" component={CreateHabitScreen} options={{ title: 'Create New Habit' }} />
      <MainStack.Screen name="CheckIn" component={CheckInScreen} options={{ title: 'Check-in' }} />
    </MainStack.Navigator>
  );
}

function SocialNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="FriendsTab" component={FriendsScreen} options={{ title: 'Friends' }} />
      <MainStack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'Leaderboard' }} />
    </MainStack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'My Profile' }} />
      <MainStack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </MainStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Social') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4CAF50',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Social" component={SocialNavigator} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error('Failed to get token', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {userToken ? <MainTabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>
  );
}
