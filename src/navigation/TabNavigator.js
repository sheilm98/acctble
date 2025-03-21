import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import HabitDetailScreen from '../screens/habits/HabitDetailScreen';
import CreateHabitScreen from '../screens/habits/CreateHabitScreen';
import CheckInScreen from '../screens/habits/CheckInScreen';
import VerificationScreen from '../screens/habits/VerificationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import FriendsScreen from '../screens/social/FriendsScreen';
import LeaderboardScreen from '../screens/social/LeaderboardScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Habits' }} />
    <Stack.Screen name="HabitDetail" component={HabitDetailScreen} options={({ route }) => ({ title: route.params?.habitTitle || 'Habit Details' })} />
    <Stack.Screen name="CreateHabit" component={CreateHabitScreen} options={{ title: 'Create New Habit' }} />
    <Stack.Screen name="CheckIn" component={CheckInScreen} options={{ title: 'Check-in' }} />
    <Stack.Screen name="Verification" component={VerificationScreen} options={{ title: 'Verify Activity' }} />
  </Stack.Navigator>
);

const SocialStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Friends" component={FriendsScreen} options={{ title: 'Friends' }} />
    <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'Leaderboard' }} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SocialTab') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'NotificationsTab') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'ProfileTab') {
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
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ 
          title: 'Home',
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="SocialTab" 
        component={SocialStack} 
        options={{ 
          title: 'Social',
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="NotificationsTab" 
        component={NotificationsScreen} 
        options={{ 
          title: 'Notifications'
        }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStack} 
        options={{ 
          title: 'Profile',
          headerShown: false
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;