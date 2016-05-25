'use strict';

import {DOM, $} from 'trixion';
import NavigationBar from 'src/components/navigation-bar';

export default ({children}) => {
  return DOM.div(null,
    $(NavigationBar),
    // nested routes would be under children
    children
  );
};
