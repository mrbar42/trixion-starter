/* globals __DEV__ */
'use strict';

// This file doesn't gets hot reloaded
// its better to put global resources in routes
import {
  Router,
  render,
  $
} from 'trixion';

import routes from './routes';

const root = document.getElementById('app');
let renderer = routes => render($(Router, {routes}), root);

// Normal render
if (!__DEV__) {
  renderer(routes);
}
// Dev render
else {
  // refresh app routes on file change
  module.hot.accept('./routes', () => renderer(require('./routes').default));

  renderer(routes);
}
