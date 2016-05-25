'use strict';

// MUST BE THE FIRST IMPORT
import {polyfill, MODERN_2016} from 'trixion/polyfill';

// this will polyfill any missing feature
// and will invoke callback when its safe to run feature rich code (your app)

polyfill(MODERN_2016, () => {
  require('./app');
});
