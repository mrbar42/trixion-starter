'use strict';

import {DOM} from 'trixion';


export default {
  render({user}) {
    return (
      DOM.div({},
        DOM.h3(null, "This is the profile of:"),
        DOM.h1(null, user || "Unknown")
      )
    );
  }
};
