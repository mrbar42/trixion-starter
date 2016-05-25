'use strict';

import {$, DOM, Link, back} from 'trixion';


export default {
  render() {

    let linkText = "Go to: Dashboard";

    return (
      DOM.div({},
        DOM.h1(null, "Home"),
        $(Link, {to: '/dashboard'}, linkText),
        DOM.div({
          onClick: () => back()
        }, "Back")
      )
    );
  }
};

