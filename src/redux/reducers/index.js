import { combineReducers } from 'redux';
import authReducer from './authReducer';
import habitReducer from './habitReducer';
import friendsReducer from './friendsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  habits: habitReducer,
  friends: friendsReducer,
});

export default rootReducer;