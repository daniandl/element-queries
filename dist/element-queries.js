(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ElementQueries"] = factory();
	else
		root["ElementQueries"] = factory();
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ElementQueries; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\nconst DIRECTION_TO_ACTIVE_ATTR = {\n  width: 'htmlAttrActive',\n  height: 'htmlAttrHeightActive',\n}\n\nclass ElementQueries {\n  constructor(opts) {\n    if (!('ResizeObserver' in window)) {\n      // not throwing to avoid breaking client's apps\n      console.error(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"prefixLog\"])(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].NOT_SUPPORTED))\n      return\n    }\n\n    this.initialized = false\n    this.opts = Object.freeze({ ..._utils__WEBPACK_IMPORTED_MODULE_0__[\"DEFAULT_OPTS\"], ...opts })\n\n    this.observer = new ResizeObserver(this.onResize.bind(this))\n    this.elements = new WeakMap()\n\n    // wait for document load\n    if (/complete|interactive|loaded/.test(document.readyState)) {\n      this.init()\n    } else {\n      document.addEventListener('DOMContentLoaded', this.init.bind(this), { once: true })\n    }\n  }\n\n  // Internal\n  init() {\n    if (this.initialized) throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].ALREADY_INIT)\n    this.initialized = true\n\n    if (this.opts.observeDom) {\n      if (!('MutationObserver' in window)) {\n        console.error(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"prefixLog\"])(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].NOT_SUPPORTED_OBSERVE))\n      } else {\n        this.domObserver = new MutationObserver(this.onDomMutation.bind(this))\n        this.domObserver.observe(document.body, { childList: true, subtree: true })\n      }\n    }\n\n    this.query()\n  }\n\n  onResize(entries) {\n    const toUpdate = new Set()\n\n    // eslint-disable-next-line no-var\n    for (var i = entries.length - 1; i >= 0; i--) {\n      const { target: element, borderBoxSize } = entries[i]\n\n      if (this.elements.has(element)) {\n        let width\n        let height\n\n        if (borderBoxSize && borderBoxSize[0]) {\n          width = borderBoxSize[0].inlineSize\n          height = borderBoxSize[0].blockSize\n        } else {\n          // fallback for Safari\n          const rect = element instanceof SVGElement\n            ? element.getBBox()\n            : element.getBoundingClientRect()\n\n          width = rect.width\n          height = rect.height\n        }\n\n        const entry = this.elements.get(element)\n        this.elements.set(element, { ...entry, ...{ width, height } })\n        toUpdate.add(element)\n      }\n    }\n\n    this.update([...toUpdate])\n  }\n\n  onDomMutation(mutations) {\n    const { htmlAttrBreakpoints, htmlAttrHeightBreakpoints } = this.opts\n\n    // eslint-disable-next-line no-var\n    for (var i = mutations.length - 1; i >= 0; i--) {\n      if (mutations[i].addedNodes.length) {\n        // eslint-disable-next-line no-var\n        for (var k = mutations[i].addedNodes.length - 1; k >= 0; k--) {\n          const element = mutations[i].addedNodes[k]\n\n          const hasBreakpoints = element.getAttributeNames()\n            .some(attr => [htmlAttrBreakpoints, htmlAttrHeightBreakpoints].includes(attr))\n\n          if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isValidElement\"])(element) && hasBreakpoints) {\n            try {\n              this.watch(element)\n            } catch (error) {\n              console.error(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"prefixLog\"])(error), element)\n            }\n          }\n        }\n      }\n    }\n  }\n\n  // Methods & Helpers\n\n  /**\n   * Finds all elements with breakpoints and watches them\n   */\n  query() {\n    const { htmlAttrBreakpoints, htmlAttrHeightBreakpoints } = this.opts\n\n    const attrs = [htmlAttrBreakpoints, htmlAttrHeightBreakpoints]\n    const elements = document.querySelectorAll(attrs.map(i => `[${i}]`).join(','))\n\n    for (const element of elements) {\n      try {\n        this.watch(element)\n      } catch (error) {\n        console.error(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"prefixLog\"])(error), element)\n      }\n    }\n  }\n\n  /**\n   * Watch an element manually\n   * @param {HTMLElement, SVGElement} element The DOM element you would like to watch\n   * @param {Object} [bps] breakpoints to use instead of looking in html attributes\n   */\n  watch(element, bps = null) {\n    if (!element || !Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isValidElement\"])(element)) {\n      throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].INVALID_ELEMENT)\n    }\n\n    if (bps) {\n      if (this.opts.observeDom) {\n        console.warn(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"prefixLog\"])(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].DOM_OBSERVE_CONFLICT))\n      }\n\n      if (typeof bps !== 'object' || (!bps.width && !bps.height)) {\n        throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].BREAKPOINTS_INVALID)\n      }\n    }\n\n    const breakpoints = bps || this.getBreakpointsFromAttrs(element)\n\n    if (!Object.values(breakpoints).filter(Boolean).length) {\n      throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].BREAKPOINTS_MISSING)\n    }\n\n    this.elements.set(element, { breakpoints })\n    this.observer.observe(element, { box: 'border-box' })\n  }\n\n  /**\n   * Manually remove an element from the observer and element reference\n   * @param {HTMLElement, SVGElement} element The DOM element you would like to remove\n   * @returns {Boolean} Whether the element has been removed successfully\n   */\n  unwatch(element) {\n    if (!element || !Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isValidElement\"])(element)) throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].INVALID_ELEMENT)\n\n    this.elements.delete(element)\n    this.observer.unobserve(element)\n\n    return this.elements.has(element)\n  }\n\n  /**\n   * Updates the given elements according to their internal state (eq.elements)\n   * @param {Array} elements Array of DOM elements\n   */\n  update(elements) {\n    if (\n      !elements\n      || !Array.isArray(elements)\n      || !elements.length\n      || !elements.every(el => Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isValidElement\"])(el))\n    ) throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].INVALID_ELEMENTS)\n\n    // eslint-disable-next-line no-var\n    for (var i = elements.length - 1; i >= 0; i--) {\n      const element = elements[i]\n\n      const entry = this.elements.get(element)\n      if (!entry || !ElementQueries.hasBreakpoints(entry)) return\n\n      const activeBreakpoints = Object.entries(entry.breakpoints).reduce((acc, [k, bps]) => {\n        acc[k] = ElementQueries.getActiveBreakpoint(entry[k], bps)\n        return acc\n      }, {})\n\n      for (const [k, active] of Object.entries(activeBreakpoints)) {\n        if (active) {\n          element.setAttribute(this.opts[DIRECTION_TO_ACTIVE_ATTR[k]], active)\n        } else {\n          element.removeAttribute(this.opts[DIRECTION_TO_ACTIVE_ATTR[k]])\n        }\n      }\n    }\n  }\n\n  /**\n   * Disconnects all observers and clears element references\n   */\n  destroy() {\n    if (this.observer) this.observer.disconnect()\n    if (this.domObserver) this.domObserver.disconnect()\n\n    this.initialized = false\n    this.elements = new WeakMap()\n  }\n\n  // internal\n\n  getBreakpointsFromAttrs(element) {\n    const { htmlAttrBreakpoints, htmlAttrHeightBreakpoints } = this.opts\n\n    const breakpointAttrs = {\n      width: element.getAttribute(htmlAttrBreakpoints),\n      height: element.getAttribute(htmlAttrHeightBreakpoints),\n    }\n\n    if (!Object.values(breakpointAttrs).filter(Boolean).length) {\n      throw new Error(_utils__WEBPACK_IMPORTED_MODULE_0__[\"Errors\"].BREAKPOINTS_MISSING)\n    }\n\n    return Object.entries(breakpointAttrs).reduce((acc, [k, v]) => {\n      if (!v) return acc\n\n      const matches = [...Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"removeWhitespace\"])(v).matchAll(_utils__WEBPACK_IMPORTED_MODULE_0__[\"BREAKPOINT_REGEX\"])]\n      if (!matches) return acc\n\n      acc[k] = matches.reduce((accumulator, match) => {\n        if (!match[1] || !match[2]) return accumulator\n\n        accumulator[match[1]] = +match[2]\n        return accumulator\n      }, {})\n\n      return acc\n    }, {})\n  }\n\n  static hasBreakpoints(entry) {\n    return Object.values(entry.breakpoints).filter(Boolean).length > 0\n  }\n\n  static getActiveBreakpoint(value, bps) {\n    const breakpoints = { ...bps, ...Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"flipObject\"])(bps) }\n    const sortedBreakpoints = Object.values(bps).sort() // sort ASC\n    const largestBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1]\n\n    if (value >= largestBreakpoint) {\n      return breakpoints[largestBreakpoint]\n    }\n\n    let active = null\n    if (value > sortedBreakpoints[0]) {\n      for (let k = 0; k < sortedBreakpoints.length; k++) {\n        const breakpointVal = sortedBreakpoints[k]\n\n        if (value >= breakpointVal) {\n          active = breakpoints[breakpointVal]\n        }\n      }\n    }\n\n    return active\n  }\n}\n\n\n//# sourceURL=webpack://ElementQueries/./src/ElementQueries.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ElementQueries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ElementQueries */ \"./src/ElementQueries.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_ElementQueries__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n//# sourceURL=webpack://ElementQueries/./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: BREAKPOINT_REGEX, Errors, DEFAULT_OPTS, removeWhitespace, flipObject, isValidElement, prefixLog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BREAKPOINT_REGEX\", function() { return BREAKPOINT_REGEX; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Errors\", function() { return Errors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_OPTS\", function() { return DEFAULT_OPTS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeWhitespace\", function() { return removeWhitespace; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flipObject\", function() { return flipObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isValidElement\", function() { return isValidElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"prefixLog\", function() { return prefixLog; });\n// Constants\nconst BREAKPOINT_REGEX = /([_A-z]+[A-z0-9-_]+):(\\d+)/g\n\nconst Errors = {\n  NOT_SUPPORTED: 'Element Queries is not supported by this browser.',\n  NOT_SUPPORTED_OBSERVE: 'The \"observeDom\" option is not supported by this browser.',\n  INVALID_ELEMENT: 'Please provide an HTML or SVG element.',\n  INVALID_ELEMENTS: 'Please provide an array of valid elements (HTML/SVG).',\n  BREAKPOINTS_MISSING: 'No breakpoints found on element.',\n  BREAKPOINTS_INVALID: 'Invalid breakpoint overrides provided.',\n  ALREADY_INIT: 'This instance is already initialized, please .destroy() it first.',\n  DOM_OBSERVE_CONFLICT: 'You are using custom breakpoint overrides with the \"obserDom\" option enabled. This can have negative side-effects.',\n}\n\nconst DEFAULT_OPTS = {\n  htmlAttrBreakpoints: 'data-eq-breakpoints',\n  htmlAttrActive: 'data-eq-active',\n  htmlAttrHeightBreakpoints: 'data-eq-height-breakpoints',\n  htmlAttrHeightActive: 'data-eq-height-active',\n  observeDom: true,\n}\n\n// Functions\nconst removeWhitespace = str => str.replace(/ /g, '')\n\nconst flipObject = o => Object.entries(o)\n  .reduce((r, [k, v]) => Object.assign(r, { [v]: k }), {})\n\nconst isValidElement = el => (\n  el instanceof HTMLElement\n  || (el instanceof SVGElement && !(el instanceof SVGSVGElement))\n)\n\nconst prefixLog = str => `[Element Queries] ${str}`\n\n\n//# sourceURL=webpack://ElementQueries/./src/utils.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack://ElementQueries/multi_./src/index.js?");

/***/ })

/******/ })["default"];
});