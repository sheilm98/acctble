const initialState = {
    friends: [],
    friendRequests: [],
    loading: false,
    error: null,
  };
  
  const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FRIENDS_LOADING':
        return {
          ...state,
          loading: true,
        };
      case 'FRIENDS_LOADED':
        return {
          ...state,
          friends: action.payload,
          loading: false,
        };
      case 'FRIEND_REQUESTS_LOADED':
        return {
          ...state,
          friendRequests: action.payload,
          loading: false,
        };
      case 'FRIEND_ADDED':
        return {
          ...state,
          friends: [...state.friends, action.payload],
          loading: false,
        };
      case 'FRIEND_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default friendsReducer;