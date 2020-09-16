# Element Queries ![npm](https://img.shields.io/npm/v/element-queries?label=%20&style=for-the-badge)

![npm](https://img.shields.io/npm/v/element-queries?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/element-queries?label=gzip&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/daniandl/element-queries?style=flat-square)
![npm](https://img.shields.io/npm/dm/element-queries?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/daniandl/element-queries?logo=github&style=flat-square)

A modern approach to Element Queries using a ResizeObserver instead of relying on polling or user-interactions.
##### ⚠ Element Queries is in its early stages, I do not recommend using this in production yet.

## Installation

**Using NPM / Yarn**  
Use your favourite package manager to install `element-queries`.

```bash
$ npm install element-queries

$ yarn add element-queries
```

**Via script tag**  
You will find UMD bundles under the `dist/` directory. You can download the minified code and include it in your website's `<body>`.
 
Services like unpkg and jsDelivr can also be used, as long as you point to the correct file:  
**Unpkg:** `https://unpkg.com/element-queries@latest/dist/element-queries.min.js`  
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

/* You can change the attribute name via options */
.post[data-active-breakpoint="large"] h2 {
  font-size: 1.5rem;
}
```

**3.** Finally, create an instance of ElementQueries in your JavaScript code and let the magic begin. You can also pass custom options via an object.

```js
import ElementQueries from 'element-queries' // if using npm

const eq = new ElementQueries()

// ...or pass in custom options
const eq = new ElementQueries({
  htmlAttrBreakpoints: 'data-eq-bps',
  htmlAttrActive: 'data-active-breakpoint',
  // full list below...
})
```

#### That's it!
You are now using element queries on your website, now go make it look pretty!

##### Using a framework or adding elements dynamically after page load?
Element Queries will detect these automatically as they are added and observe them as long as they have valid breakpoints.
<!-- This can also be disabled via options. -->

<!-- ## How it works -->

## Options
These are options you can pass as an object when creating a new instance of `ElementQueries`.

**Property**|**Description**|**Default**|**Version**
:--|:--|:--|--:
`htmlAttrBreakpoints`|(String) The name of the HTML attribute you would like to write your breakpoints in.|`data-eq-breakpoints`|![npm](https://img.shields.io/badge/-v0.3.0+-orange?style=flat-square)
`htmlAttrActive`|(String) The name of the HTML attribute that you will use in your CSS selectors.|`data-eq-active`|![npm](https://img.shields.io/badge/-v0.3.0+-orange?style=flat-square)

<!-- `observeDom`|(Boolean) Whether the plugin should watch the DOM for new elements to observe.|`true`|  -->

## API

### watch(element) ![npm](https://img.shields.io/badge/-v0.3.0+-orange?style=flat-square)

* `element` {`HTMLElement`} A dom element you'd like to observe

Used to manually add an element to the observer. Must have valid breakpoints.

### update(elements) ![npm](https://img.shields.io/badge/-v0.3.0+-orange?style=flat-square)

* `elements` {`Array`} Array of DOM elements

Force-update the given elements according to their internal state. You should not have to use this.

### destroy() ![npm](https://img.shields.io/badge/-v0.3.0+-orange?style=flat-square)

Disconnects the ResizeObserver and DOM observer. Also flushes the internal elements reference.

### Class `ElementQueries`

**Parameters**  
* `options` {`Object`} Object containing valid configuration options

**Properties**  
*These are for internal use only but you are welcome to play around with them (at your own risk)*
* `opts` a frozen options object
* `observer` contains the ResizeObserver
* `elements` a WeakMap containing all elements that have are still actively being referenced

<!-- ## Motivation -->

## ⚠ Disclaimer

**This project is a bachelor project for my studies.**  
This means everything is subject to change unexpectedly. I cannot guarantee the future of this library or whether I will work in "the right direction" (at least until end of April 2021 🙂).

*I am, however, of course genuinely interested in this and aim to keep working on it afterwards, as I need this for my own projects.*

## Contributing

Pull requests are always welcome. For major changes, please open an issue first to discuss what you have in mind.  
Please keep the above disclaimer in mind regarding my decisions on changes.
