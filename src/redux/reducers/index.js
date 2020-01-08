import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import openFootballReducers from './openFootballReducers';

export default (history) => combineReducers({
  router: connectRouter(history),
  openFB: openFootballReducers
});