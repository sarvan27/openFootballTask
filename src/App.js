import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import HomePage from './component/HomePage';
import { createBrowserHistory } from 'history';

const store = configureStore();
const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HomePage />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
