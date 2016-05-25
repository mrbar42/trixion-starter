'use strict';

import {DOM} from 'trixion';

import {baseClass} from './style.styl';
export default {
  render() {
    return DOM.div({className: baseClass},
      DOM.div({className: baseClass + '-logo'}, "Logo"),
      "Nav bar"
    );
  }
};
