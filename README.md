# trixion-starter

this project is a companion kit to [trixion](https://github.com/mrbar42/trixion). 

its purpose is to be both a demonstration of trixion usage,  
and also to turbo charge you next project.

with a matching spirit to trixion's one, this is relatively light weight project. 

## How to use

1. get latest [release](https://github.com/mrbar42/trixion/releases) tar.gz/zip
2. `npm install`
3. npm run dev
4. open browser at `localhost:4040`
5. start working


## Project structure

project-root
├─┬ src
│ ├── assets/         - static files that will be included in dist folder
│ ├── components/     - components with their specific styles
│ ├── logic/          - put here your business logic, selectors, actions etc
│ ├── styles/         - anything that is related to styling globally goes here
│ │ └── icons/        - any .svg file that you'll place here will be added to your icon font as ai-iconname
│ ├── ui/             - folders for reusable ui components that are generic app wise such as buttons, titles, boxes etc
│ ├── views/          - entry points to your app - your routes main components should go here
│ ├── app.js          - app main file - rendering
│ ├── entry.js        - webpack entry point that check if polyfill is needed and calls app.js
│ └── routes.js       - app routes
└── dist - your project build files goes here

## npm scripts

  - start   - build and start production server on dist folder. port 8080
  - build   - production build of the app to dist folder 
  - dev     - start dev server in-memory with hot-reload enabled. port 4040
  - profile - get production bundle profile. saved as stats.json [read more](https://github.com/mrbar42/trixion/blob/master/docs/DEPENDENCIES.md#method-4---analyze-your-bundle)  
  **important** this profile contains your entire code - take it into account 
  
  
# Features

## Hashed bundle

all of the output files of webpack are hashed including you main js entry point.  
the main js bundle and the main css file are appended to `src/assets/index.html` automatically  
using [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) plugin.  
the plugin also supports variables and more advances usage.

###### why do i need hashing for?
adding hash to your files allows you to safely increase caching configuration to days/weeks and even months  
 without the risk of making a change that will not propagate to users due to browser caching/cdn.

**__Example:__**
 
you can run `npm run build` and look in `dist/index.html` to see that these both resources were added to your page.

added to head
```html
<link href="/css/app-d9de602fafc32fe1e01a.css" rel="stylesheet"></head>
```

added to body
```html
<script type="text/javascript" src="/js/app-d9de602fafc32fe1e01a.js"></script></body>
```


## styling convention

there is a lot of debate on the correct way to write styles.  
the offered way in this project is as follows:

1. the chosen processor is [stylus](https://github.com/stylus/stylus).  
if you are used to scss you can pretty much keep writing styles as you do.
2. global style resides in `src/styles/app.styl`
3. component specific styles are in `style.styl` next to the component js code.  
there is a feature in css-loader that allows random assignment of classNames like so:

style.styl || scss || css
```styl
:local(.baseClass) {
    &-nested {
      color: red;
      
      &:hover {
        color: blue;
      }    
    }
}
```

```javascript
  import {baseClass} from 'trixion';
  import {baseClass} from './style.styl';
  
  // DEV: baseClass = 'baseClass-KIHGF' 
  // PRODUCTION: baseClass = 'KIHGF'
   
   export default () => (
      DOM.div({className: baseClass},
        DOM.div({className: baseClass + '-nested'})
      )
   );
```


4. global reusable classes resides in [`src/styles/helpers.styl`](https://github.com/mrbar42/trixion/blob/master/src/styles/helpers.styl) and are imported like any other module:

```javascript
import {DOM} from 'trixion';
import {responsiveImage} from 'src/styles/helpers.styl';

export default ({imgSrc}) => (
  DOM.img({
        className: responsiveImage,
        src: imgSrc
      });
);
```

## package redirection

to allow working with modules that requires react - an alias has been set in webpack's config  
  so that calling importing `react` or `react-dom` or `preact` will actually call trixion which  
  provides the same api for compatibility purposes.

  even so... preact is different from react in several features like refs, warnings etc...
  
## src module

to ease importing of your own code, another alias has been added so that `src` can be imported directly.   
this will prevent relative path mess and will simplify accessing different parts of you modules.
 
```javascript
import {Icon} from 'src/ui/icon';

import {loginSelector} from 'src/logic/selectors';
```

**hack** - if you want your IDE to recognize the files using this method you can place a symlink of src in node_modules.  
this might irritate you npm - but you might want it anyway.
  
bash command (from project root)
    ln -s src node_modules/

## font icons

there is an automated font icon creation that is loaded automatically using webpack [fontgen-loader](https://github.com/DragonsInn/fontgen-loader).
every svg you'll place under `src/styles/icons` will be added to the font icons set.

simply add the className `ai-iconname` to use your icon.

given: src/styles/icons/user.svg -> className: 'ai-user'
```javascript
const Icon = ({icon}) => DOM.i({className: 'ai-' + icon});
```


  
