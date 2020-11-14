"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixLog = exports.isValidElement = exports.flipObject = exports.removeWhitespace = exports.DEFAULT_OPTS = exports.Errors = exports.BREAKPOINT_REGEX = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Constants
var BREAKPOINT_REGEX = /([_A-z]+[A-z0-9-_]+):(\d+)/g;
exports.BREAKPOINT_REGEX = BREAKPOINT_REGEX;
var Errors = {
  NOT_SUPPORTED: 'Element Queries is not supported by this browser.',
  NOT_SUPPORTED_OBSERVE: 'The "observeDom" option is not supported by this browser.',
  INVALID_ELEMENT: 'Please provide an HTML or SVG element.',
  INVALID_ELEMENTS: 'Please provide an array of valid elements (HTML/SVG).',
  BREAKPOINTS_MISSING: 'No breakpoints found on element.',
  BREAKPOINTS_INVALID: 'Invalid breakpoint overrides provided.',
  ALREADY_INIT: 'This instance is already initialized, please .destroy() it first.',
  DOM_OBSERVE_CONFLICT: 'You are using custom breakpoint overrides with the "obserDom" option enabled. This can have negative side-effects.'
};
exports.Errors = Errors;
var DEFAULT_OPTS = {
  htmlAttrBreakpoints: 'data-eq-breakpoints',
  htmlAttrActive: 'data-eq-active',
  htmlAttrHeightBreakpoints: 'data-eq-height-breakpoints',
  htmlAttrHeightActive: 'data-eq-height-active',
  observeDom: true
}; // Functions

exports.DEFAULT_OPTS = DEFAULT_OPTS;

var removeWhitespace = function removeWhitespace(str) {
  return str.replace(/ /g, '');
};

exports.removeWhitespace = removeWhitespace;

var flipObject = function flipObject(o) {
  return Object.entries(o).reduce(function (r, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return Object.assign(r, _defineProperty({}, v, k));
  }, {});
};

exports.flipObject = flipObject;

var isValidElement = function isValidElement(el) {
  return el instanceof HTMLElement || el instanceof SVGElement && !(el instanceof SVGSVGElement);
};

exports.isValidElement = isValidElement;

var prefixLog = function prefixLog(str) {
  return "[Element Queries] ".concat(str);
};

exports.prefixLog = prefixLog;