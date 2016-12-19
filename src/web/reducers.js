import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import global from '../core/reducer';

const rootReducer = combineReducers({
  global,
  routing: routerReducer
});

export default rootReducer;
