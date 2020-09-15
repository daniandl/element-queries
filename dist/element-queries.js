(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ElementQueries.js":
/*!*******************************!*\
  !*** ./src/ElementQueries.js ***!
  \*******************************/
/*! exports provided: ElementQueries */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ElementQueries\", function() { return ElementQueries; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\nconst DEFAULT_OPTS = {\n  htmlAttrBreakpoints: 'data-eq-breakpoints',\n  htmlAttrActive: 'data-eq-active',\n}\n\nclass ElementQueries {\n  constructor(opts) {\n    this.opts = Object.freeze({ ...DEFAULT_OPTS, ...opts })\n\n    this.observer = new ResizeObserver(this.onResize.bind(this))\n    this.elements = new WeakMap()\n\n    document.addEventListener('DOMContentLoaded', () => {\n      this.init()\n\n      this.domObserver = new MutationObserver(this.onDomMutation.bind(this))\n      this.domObserver.observe(document.body, { childList: true, subtree: true })\n    }, { once: true })\n  }\n\n  // Internal\n  init() {\n    const elements = document.querySelectorAll(`[${this.opts.htmlAttrBreakpoints}]`)\n\n    for (const element of elements) {\n      try {\n        this.watch(element)\n      } catch (error) {\n        console.error(error, element)\n      }\n    }\n  }\n\n  onResize(entries) {\n    const toUpdate = new Set()\n\n    // eslint-disable-next-line no-var\n    for (var i = entries.length - 1; i >= 0; i--) {\n      const { target: element, borderBoxSize } = entries[i]\n\n      if (this.elements.has(element)) {\n        let width\n        let height\n\n        if (borderBoxSize && borderBoxSize[0]) {\n          width = borderBoxSize[0].inlineSize\n          height = borderBoxSize[0].blockSize\n        } else {\n          // fallback for Safari\n          const rect = element.getBoundingClientRect()\n          width = rect.width\n          height = rect.height\n        }\n\n        const elementsEntry = this.elements.get(element)\n        this.elements.set(element, { ...elementsEntry, ...{ width, height } })\n        toUpdate.add(element)\n      }\n    }\n\n    this.update([...toUpdate])\n  }\n\n  onDomMutation(mutations) {\n    // eslint-disable-next-line no-var\n    for (var i = mutations.length - 1; i >= 0; i--) {\n      if (mutations[i].addedNodes.length) {\n        // eslint-disable-next-line no-var\n        for (var k = mutations[i].addedNodes.length - 1; k >= 0; k--) {\n          const element = mutations[i].addedNodes[k]\n          if (\n            element instanceof HTMLElement\n            && element.hasAttribute(this.opts.htmlAttrBreakpoints)\n          ) {\n            try {\n              this.watch(element)\n            } catch (e) {\n              console.error(e, element)\n            }\n          }\n        }\n      }\n    }\n  }\n\n  // Methods & Helpers\n  /**\n   * Watch an element manually\n   * @param {HTMLElement} element The DOM element you would like to watch\n   */\n  watch(element) {\n    if (!element || !(element instanceof HTMLElement)) throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].INVALID_ELEMENT)\n    if (!element.hasAttribute(this.opts.htmlAttrBreakpoints)) {\n      throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].BREAKPOINTS_MISSING)\n    }\n\n    const breakpointString = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"removeWhitespace\"])(element.getAttribute(this.opts.htmlAttrBreakpoints))\n    const breakpointMatches = [...breakpointString.matchAll(_utils__WEBPACK_IMPORTED_MODULE_0__[\"BREAKPOINT_REGEX\"])]\n\n    if (!breakpointMatches.length) throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].BREAKPOINTS_MISSING)\n\n    const breakpoints = breakpointMatches.reduce((acc, match) => {\n      if (!match[1] || !match[2]) return acc\n\n      acc[match[1]] = +match[2]\n      return acc\n    }, {})\n\n    this.elements.set(element, { breakpoints })\n    this.observer.observe(element, { box: 'border-box' })\n  }\n\n  /**\n   * Updates the given elements according to their internal state (eq.elements)\n   * @param {Array} elements Array of DOM elements\n   */\n  update(elements) {\n    if (\n      !elements\n      || !Array.isArray(elements)\n      || !elements.length\n      || !elements.every(el => el instanceof HTMLElement)\n    ) throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].INVALID_ELEMENTS)\n\n    // eslint-disable-next-line no-var\n    for (var i = elements.length - 1; i >= 0; i--) {\n      const element = elements[i]\n\n      const entry = this.elements.get(element)\n      if (entry && entry.breakpoints) {\n        const { width } = entry\n        let active = null\n\n        const bpsFlipped = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"flipObject\"])(entry.breakpoints)\n        const bpWidths = Object.values(entry.breakpoints).sort() // sort ASC\n        const bpLargest = bpWidths[bpWidths.length - 1]\n\n        if (width >= bpLargest) {\n          active = bpsFlipped[bpLargest]\n        } else if (width > bpWidths[0]) {\n          for (let k = 0; k < bpWidths.length; k++) {\n            const bpWidth = bpWidths[k]\n\n            if (width >= bpWidth) {\n              active = bpsFlipped[bpWidth]\n            }\n          }\n        }\n\n        if (active) {\n          element.setAttribute(this.opts.htmlAttrActive, active)\n          continue\n        }\n      }\n\n      element.removeAttribute(this.opts.htmlAttrActive)\n    }\n  }\n\n  /**\n   * Disconnects all observers and clears element references\n   */\n  destroy() {\n    this.observer.disconnect()\n    this.domObserver.disconnect()\n    this.elements = new WeakMap()\n  }\n}\n\n\n//# sourceURL=webpack:///./src/ElementQueries.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: ElementQueries */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ElementQueries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ElementQueries */ \"./src/ElementQueries.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ElementQueries\", function() { return _ElementQueries__WEBPACK_IMPORTED_MODULE_0__[\"ElementQueries\"]; });\n\n\n\n/** TODOs\n * TODO move this out of here :)\n * TODO allow passing breakpoint object to .watch() which overrides htmlAttrBreakpoints\n * TODO Support HTMLElement *AND* SVGElement\n * TODO disable if ResizeObserver isnt supported\n * NOTE general browser-support checks (MutationObserver, etc)\n * NOTE batching resize updates?\n * NOTE throttle observer?\n * NOTE debounce updates on a per-element basis?\n * NOTE use requestAnimationFrame on resize callback?\n * NOTE what do if user changes htmlAttrBreakpoints dynamically\n */\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: BREAKPOINT_REGEX, Errors, removeWhitespace, flipObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BREAKPOINT_REGEX\", function() { return BREAKPOINT_REGEX; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Errors\", function() { return Errors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeWhitespace\", function() { return removeWhitespace; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flipObject\", function() { return flipObject; });\n// Constants\nconst BREAKPOINT_REGEX = /([_A-z]+[A-z0-9-_]+):(\\d+)/g\n\nconst Errors = {\n  INVALID_ELEMENT: 'Please provide a HTMLElement',\n  INVALID_ELEMENTS: 'Please provide an array of HTMLElements',\n  BREAKPOINTS_MISSING: 'No breakpoints found on element',\n}\n\n// Functions\nconst removeWhitespace = str => str.replace(/ /g, '')\nconst flipObject = o => Object.entries(o)\n  .reduce((r, [k, v]) => Object.assign(r, { [v]: k }), {})\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });
});