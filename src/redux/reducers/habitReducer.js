const initialState = {
    habits: [],
    currentHabit: null,
    loading: false,
    error: null,
  };
  
  const habitReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'HABITS_LOADING':
        return {
          ...state,
          loading: true,
        };
      case 'HABITS_LOADED':
        return {
          ...state,
          habits: action.payload,
          loading: false,
        };
      case 'HABIT_CREATED':
        return {
          ...state,
          habits: [...state.habits, action.payload],
          loading: false,
        };
      case 'HABIT_UPDATED':
        return {
          ...state,
          habits: state.habits.map(habit => 
            habit.id === action.payload.id ? action.payload : habit
          ),
          loading: false,
        };
      case 'HABIT_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default habitReducer;