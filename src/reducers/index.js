import { combineReducers } from 'redux';
import users from './users';
import common from './common';
export default combineReducers({
    users: users,
    default: common
  });