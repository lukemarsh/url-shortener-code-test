import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import App from './containers/App';

import './styles.css';

const initialState = {};
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider {...{ store, history }}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
