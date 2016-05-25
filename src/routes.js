'use strict';

import Loader from 'slackers/loader-gears';

// import main style and icons
import 'src/styles/app.styl';
import 'src/styles/app.font';

// import views
import Index from 'src/views/index';
import Home from 'src/views/home';

export default [
  {
    path: '/',
    component: Index,
    loader: Loader,
    children: [
      {
        // no path = default route
        component: Home
      },
      {
        path: '/dashboard',
        onEnter(navigate, props) {
          // get user status from somewhere
          let isLoggedIn = true;
          if (!isLoggedIn) navigate('/');
        },
        componentAsync(cb) {
          // simulate lazy load delay for demonstration purposes
          setTimeout(() => {
            require.ensure([], require => cb(require('src/views/dashboard').default), 'views/dashboard');
          }, 1000);
        }
      },
      {
        path: '/profile/:user',
        loader: null, // disable loader explicitly
        onEnterAsync(done, navigate, props) {
          // param value is stored in
          // props.user
          // callback when done async tasks
          setTimeout(done, 0);
        },
        componentAsync(cb) {
          require.ensure([], require => cb(require('src/views/profile').default), 'views/profile');
        }
      }
    ]
  },
  {
    path: '*',
    componentAsync: cb => {
      require.ensure([], require => cb(require('slackers/not-found')), 'views/not-found');
    }
  }
];
