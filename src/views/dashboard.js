'use strict';

import {$, DOM, Link, back} from 'trixion';


export default {
  render() {

    let linkText = "Go to: Home";

    return (
      DOM.div({},
        DOM.h1(null, "Dashboard"),
        $(Link, {to: '/'}, linkText),
        DOM.div({
          onClick: () => back()
        }, "Back")
      )
    );
  }
};
