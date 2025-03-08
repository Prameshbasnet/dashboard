import { combineReducers } from 'redux';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({
  posts: postsReducer
  // ...other reducers...
});

export default rootReducer;
