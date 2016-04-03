import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import routes from 'routes';
import promiseMiddleware from 'lib/promiseMiddleware';
import immutifyState from 'lib/immutifyState';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const initialState = immutifyState(window.__INITIAL_STATE__);

const reducer = combineReducers(reducers);
export const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

render(
  <Provider store={ store }>
    <Router children={ routes } history={ browserHistory } />
  </Provider>,
  document.getElementById('react-view')
);

