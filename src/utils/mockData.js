// src/utils/mockData.js
// export const MOCK_HABITS = [
//     {
//       habitId: "habit1",
//       title: "Morning Workout",
//       description: "30-minute exercise routine",
//       frequency: {
//         type: "weekly",
//         daysOfWeek: [1, 3, 5],
//       },
//       streak: 7,
//       accountabilityBuddies: [
//         {
//           userId: "user2",
//           name: "Jane Doe",
//           status: "active"
//         }
//       ]
//     },
//     // Add more mock habits
//   ];
  
//   export const MOCK_FRIENDS = [
//     {
//       userId: "user2",
//       name: "Jane Doe",
//       profilePicture: "https://via.placeholder.com/150",
//     },
//     // Add more mock friends
//   ];



  // Mock data for the prototype

export const MOCK_USER = {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    profilePicture: 'https://via.placeholder.com/150',
    points: 1250,
    level: 5,
    achievements: [
      { id: 'a1', title: 'First Habit', description: 'Created your first habit' },
      { id: 'a2', title: 'Streak Master', description: 'Maintained a 7-day streak' }
    ]
  };
  
  export const MOCK_HABITS = [
    {
      id: 'habit1',
      title: 'Morning Workout',
      description: '30-minute exercise routine',
      category: 'Fitness',
      frequency: {
        type: 'weekly',
        daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
      },
      startDate: '2025-03-01',
      streak: 12,
      longestStreak: 15,
      completedCount: 24,
      missedCount: 3,
      accountabilityBuddies: [
        {
          userId: 'user2',
          name: 'Jane Doe',
          status: 'active',
          isAlternate: false
        }
      ],
      points: 240,
      active: true
    },
    {
      id: 'habit2',
      title: 'Read for 30 minutes',
      description: 'Read a non-fiction book',
      category: 'Learning',
      frequency: {
        type: 'daily',
      },
      startDate: '2025-02-15',
      streak: 7,
      longestStreak: 21,
      completedCount: 32,
      missedCount: 5,
      accountabilityBuddies: [
        {
          userId: 'user3',
          name: 'Bob Smith',
          status: 'active',
          isAlternate: false
        }
      ],
      points: 320,
      active: true
    }
  ];
  
  export const MOCK_FRIENDS = [
    {
      id: 'user2',
      name: 'Jane Doe',
      profilePicture: 'https://via.placeholder.com/150',
      points: 1800,
      level: 7,
    },
    {
      id: 'user3',
      name: 'Bob Smith',
      profilePicture: 'https://via.placeholder.com/150',
      points: 950,
      level: 4,
    },
    {
      id: 'user4',
      name: 'Alice Johnson',
      profilePicture: 'https://via.placeholder.com/150',
      points: 2100,
      level: 8,
    }
  ];
  
  export const MOCK_NOTIFICATIONS = [
    {
      id: 'notif1',
      type: 'verification_request',
      title: 'Verification Request',
      message: 'Jane Doe needs verification for Morning Workout',
      timestamp: '2025-03-20T15:30:00',
      read: false,
      data: {
        habitId: 'habit1',
        checkInId: 'checkin1',
        userId: 'user2'
      }
    },
    {
      id: 'notif2',
      type: 'verification_complete',
      title: 'Verification Complete',
      message: 'Bob verified your Reading habit check-in',
      timestamp: '2025-03-19T18:45:00',
      read: true,
      data: {
        habitId: 'habit2',
        checkInId: 'checkin2'
      }
    },
    {
      id: 'notif3',
      type: 'streak_milestone',
      title: 'New Streak Milestone!',
      message: 'You reached a 10-day streak for Morning Workout',
      timestamp: '2025-03-18T09:15:00',
      read: true,
      data: {
        habitId: 'habit1'
      }
    }
  ];
  
  export const MOCK_CHECKINS = [
    {
      id: 'checkin1',
      habitId: 'habit1',
      timestamp: '2025-03-20T08:30:00',
      status: 'pending',
      photoUrl: 'https://via.placeholder.com/300',
      locationData: {
        latitude: 34.052235,
        longitude: -118.243683,
        locationName: 'LA Fitness Downtown'
      }
    },
    {
      id: 'checkin2',
      habitId: 'habit2',
      timestamp: '2025-03-19T21:15:00',
      status: 'verified',
      photoUrl: 'https://via.placeholder.com/300',
      locationData: {
        latitude: 34.059235,
        longitude: -118.253683,
        locationName: 'Home'
      },
      verifiedBy: 'user3',
      verificationTimestamp: '2025-03-19T21:45:00',
      buddyNotes: 'Great job with your reading!'
    }
  ];
  
  export const MOCK_LEADERBOARD = [
    { id: 'user5', name: 'Michael Jordan', points: 3200, level: 12 },
    { id: 'user4', name: 'Alice Johnson', points: 2100, level: 8 },
    { id: 'user6', name: 'Sarah Williams', points: 1950, level: 7 },
    { id: 'user2', name: 'Jane Doe', points: 1800, level: 7 },
    { id: 'user1', name: 'John Doe', points: 1250, level: 5 },
    { id: 'user3', name: 'Bob Smith', points: 950, level: 4 },
    { id: 'user7', name: 'David Brown', points: 780, level: 3 },
  ];