# Element Queries

![npm](https://img.shields.io/npm/v/element-queries?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/daniandl/element-queries?style=flat-square)
![npm](https://img.shields.io/npm/dm/element-queries?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/daniandl/element-queries?logo=github&style=flat-square)

A modern approach to element queries using a ResizeObserver instead of relying on polling or user-interactions.

- **Performant**: No polling/loops due to native ResizeObserver use
- **Small**: under 2kb (minified + gzip)
- **Easy to use**: doesn't introduce new syntax + simple API
- **Customizable**: change naming conventions to your liking

This readme reflects the functionality of the **current major version (1.x.x)**

#### **Browser Support**

Due to ResizeObserver, Internet Explorer is not supported at all.
You can use a polyfill but I cannot guarantee anything.  
*More specific information will come soon.*

#### Update regarding native implementation
It seems we are finally getting closer to a native implementation of element queries in browsers!  
https://web.dev/new-responsive/#responsive-to-the-container  

## Installation

**Using NPM / Yarn**  
Use your favourite package manager to install `element-queries`.

```bash
$ npm install --save element-queries

$ yarn add element-queries
```

**Via script tag**  
You will find UMD bundles under the `dist/` directory. You can download the minified code and include it in your website's `<body>`.
 
Also available via:  
**jsDelivr:** `https://cdn.jsdelivr.net/npm/element-queries@latest/dist/element-queries.min.js`  

(`ElementQueries` will be available under the `window` object)

<!-- ## Browser support -->

## Usage

Using Element Queries is easy, you can get going in three steps.  

**1.** First, start out by defining breakpoints on your HTML elements:

```html
<article class="post" data-eq-breakpoints="small: 300, medium: 600, large: 900">
  <img class="full-width" src="./img/post1-header.jpg" />
  <h2>My first post!</h2>
  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
</article>

<!-- You can use whatever breakpoint names you like -->
<div data-eq-breakpoints="sm: 300, md: 600, lg: 900">...</div>

<!-- breakpoints based on element height -->
<div data-eq-height-breakpoints="sm: 50, md: 200, lg: 500">...</div>

<!-- Change the attribute name via options -->
<div data-bps="xs: 300, sm: 600, md: 900">...</div>
```

**2.** Set up your breakpoints in your stylesheets. Your elements will be given a `data-eq-active` attribute, which you can match with CSS selectors.

```css
.post[data-eq-active="small"] h2 {
  font-size: .75rem;
}

.post[data-eq-active="medium"] h2 {
  font-size: 1rem;
}

/* breakpoints based on element height */
.post[data-eq-height-active="large"] h2 {
  font-size: 1.5rem;
}

/* You can change the attribute name via options */
.post[data-active-bp="large"] h2 {
  font-size: 1.5rem;
}
```

**3.** Finally, create an instance of Element Queries in your JavaScript code and let the magic begin. You can also pass custom options via an object.

```js
import ElementQueries from 'element-queries' // if using a package manager

const eq = new ElementQueries()

// ...or pass in custom options
const eq = new ElementQueries({
  htmlAttrBreakpoints: 'data-eq-bps',
  htmlAttrActive: 'data-active-breakpoint',
  // full list below...
})
```

**That's it!** You are now using element queries on your website, now go make it look pretty!

<!-- ## How it works -->

## FAQ

#### My elements are added dynamically/after page load (ie. framework), will this pick them up?
Element Queries will detect these automatically as they are added and observe them as long as they have valid breakpoints.
You can also turn this off and write your own wrapper by using the `.watch()` and `.unwatch()` methods.

#### What type of elements can I put breakpoints on?
The library technically supports all elements the `ResizeObserver` can watch. This means `HTMLElements` and `SVGElements` (path, rect, etc.. - *not the `<svg>` tag*).

## Options
These are options you can pass as an object when creating a new instance of `ElementQueries`.

**Property**|**Description**|**Default**|**Version**
:--|:--|:--|--:
`htmlAttrBreakpoints`|(String) The name of the HTML attribute you would like to write your breakpoints in.|`data-eq-breakpoints`|![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)
`htmlAttrHeightBreakpoints`|(String) Same as above, for height.|`data-eq-height-breakpoints`|![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)
`htmlAttrActive`|(String) The name of the HTML attribute that you will use in your CSS selectors.|`data-eq-active`|![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)
`htmlAttrHeightActive`|(String) Same as above, for height.|`data-eq-height-active`|![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)
`observeDom`|(Boolean) Whether the plugin should watch the DOM for new elements to observe.|`true`|![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)

## API

### watch(element, [breakpoints]) ![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)

* `element` {`HTMLElement`} A dom element you'd like to observe
* `[breakpoints]` {`Object`} an optional breakpoints object to use instead of html attributes.

Used to manually add an element to the observer. Must have valid breakpoints.  
Custom breakpoints format: `{ width: { small: 250, ...}, height: {...} }`  
(Only one is *required*)

### unwatch(element) ![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)

* `element` {`HTMLElement`} The DOM element you would like to remove
* @returns {`Boolean`}  Whether the element has been removed successfully

Manually remove an element from the observer and element reference.

### update(elements) ![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)

* `elements` {`Array`} Array of DOM elements

Force-update the given elements according to their internal state. You should not have to use this.

### query() ![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)

Finds all elements with breakpoints (according to `htmlAttrBreakpoints` option) and watches them.

### destroy() ![npm](https://img.shields.io/badge/-v1.0+-orange?style=flat-square)

Disconnects the ResizeObserver and DOM observer. Also flushes the internal elements reference.

### Class `ElementQueries`

**Parameters**  
* `options` {`Object`} Object containing valid configuration options

**Properties**  
*These are for internal use only but you are welcome to play around with them (at your own risk)*
* `opts` a frozen options object
* `observer` contains the ResizeObserver
* `domObserver` contains the MutationObserver (if enabled)
* `elements` a WeakMap containing all elements that are still actively being referenced

## Contributing

Pull requests are always welcome. For major changes, please open an issue first to discuss what you have in mind.
