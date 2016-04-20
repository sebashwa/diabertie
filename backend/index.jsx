import express from 'express';
import app from './api';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import { Provider } from 'react-redux';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';
import path from 'path';

import { setBotName } from '../frontend/actions/SettingsActions';
import promiseMiddleware from '../frontend/lib/promiseMiddleware';
import * as reducers from '../frontend/reducers';
import routes from '../frontend/routes';

app.use(express.static(path.dirname(process.mainModule.filename)));

app.use((req, res) => {
  const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const componentHTML = renderToString(InitialView);

      store.dispatch(setBotName(process.env.TELEGRAM_BOT_NAME));
      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>diabertie</title>

          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/frontend.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    res.end(renderView());
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('--> Serving app from: ' + PORT);
});
