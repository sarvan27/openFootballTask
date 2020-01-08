import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './reducers/index';
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [ routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore(initialState) {
  const store = createStore(reducers(history), initialState,
    composeEnhancers(applyMiddleware(...middlewares)));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export {history};