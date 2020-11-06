"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./utils");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DIRECTION_TO_ACTIVE_ATTR = {
  width: 'htmlAttrActive',
  height: 'htmlAttrHeightActive'
};

var ElementQueries = /*#__PURE__*/function () {
  function ElementQueries(opts) {
    _classCallCheck(this, ElementQueries);

    if (!('ResizeObserver' in window)) {
      // not throwing to avoid breaking client's apps
      console.error(_utils.Errors.NOT_SUPPORTED);
      return;
    }

    this.initialized = false;
    this.opts = Object.freeze(_objectSpread(_objectSpread({}, _utils.DEFAULT_OPTS), opts));
    this.observer = new ResizeObserver(this.onResize.bind(this));
    this.elements = new WeakMap(); // wait for document load

    if (/complete|interactive|loaded/.test(document.readyState)) {
      this.init();
    } else {
      document.addEventListener('DOMContentLoaded', this.init.bind(this), {
        once: true
      });
    }
  } // Internal


  _createClass(ElementQueries, [{
    key: "init",
    value: function init() {
      if (this.initialized) throw new Error(_utils.Errors.ALREADY_INIT);
      this.initialized = true;

      if (this.opts.observeDom) {
        if (!('MutationObserver' in window)) {
          console.error(_utils.Errors.NOT_SUPPORTED_OBSERVE);
        } else {
          this.domObserver = new MutationObserver(this.onDomMutation.bind(this));
          this.domObserver.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      }

      this.query();
    }
  }, {
    key: "onResize",
    value: function onResize(entries) {
      var toUpdate = new Set(); // eslint-disable-next-line no-var

      for (var i = entries.length - 1; i >= 0; i--) {
        var _entries$i = entries[i],
            element = _entries$i.target,
            borderBoxSize = _entries$i.borderBoxSize;

        if (this.elements.has(element)) {
          var width = void 0;
          var height = void 0;

          if (borderBoxSize && borderBoxSize[0]) {
            width = borderBoxSize[0].inlineSize;
            height = borderBoxSize[0].blockSize;
          } else {
            // fallback for Safari
            var rect = element instanceof SVGElement ? element.getBBox() : element.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
          }

          var entry = this.elements.get(element);
          this.elements.set(element, _objectSpread(_objectSpread({}, entry), {
            width: width,
            height: height
          }));
          toUpdate.add(element);
        }
      }

      this.update(_toConsumableArray(toUpdate));
    }
  }, {
    key: "onDomMutation",
    value: function onDomMutation(mutations) {
      var _this$opts = this.opts,
          htmlAttrBreakpoints = _this$opts.htmlAttrBreakpoints,
          htmlAttrHeightBreakpoints = _this$opts.htmlAttrHeightBreakpoints; // eslint-disable-next-line no-var

      for (var i = mutations.length - 1; i >= 0; i--) {
        if (mutations[i].addedNodes.length) {
          // eslint-disable-next-line no-var
          for (var k = mutations[i].addedNodes.length - 1; k >= 0; k--) {
            var element = mutations[i].addedNodes[k];
            var hasBreakpoints = element.getAttributeNames().some(function (attr) {
              return [htmlAttrBreakpoints, htmlAttrHeightBreakpoints].includes(attr);
            });

            if ((0, _utils.isValidElement)(element) && hasBreakpoints) {
              try {
                this.watch(element);
              } catch (e) {
                console.error(e, element);
              }
            }
          }
        }
      }
    } // Methods & Helpers

    /**
     * Finds all elements with breakpoints and watches them
     */

  }, {
    key: "query",
    value: function query() {
      var _this$opts2 = this.opts,
          htmlAttrBreakpoints = _this$opts2.htmlAttrBreakpoints,
          htmlAttrHeightBreakpoints = _this$opts2.htmlAttrHeightBreakpoints;
      var attrs = [htmlAttrBreakpoints, htmlAttrHeightBreakpoints];
      var elements = document.querySelectorAll(attrs.map(function (i) {
        return "[".concat(i, "]");
      }).join(','));
      console.log(elements);

      var _iterator = _createForOfIteratorHelper(elements),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var element = _step.value;

          try {
            this.watch(element);
          } catch (error) {
            console.error(error, element);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * Watch an element manually
     * @param {HTMLElement, SVGElement} element The DOM element you would like to watch
     */

  }, {
    key: "watch",
    value: function watch(element) {
      var _this$opts3 = this.opts,
          htmlAttrBreakpoints = _this$opts3.htmlAttrBreakpoints,
          htmlAttrHeightBreakpoints = _this$opts3.htmlAttrHeightBreakpoints;

      if (!element || !(0, _utils.isValidElement)(element)) {
        throw new Error(_utils.Errors.INVALID_ELEMENT);
      }

      var breakpointAttrs = {
        width: element.getAttribute(htmlAttrBreakpoints),
        height: element.getAttribute(htmlAttrHeightBreakpoints)
      };

      if (!Object.values(breakpointAttrs).filter(Boolean).length) {
        throw new Error(_utils.Errors.BREAKPOINTS_MISSING);
      }

      var breakpoints = Object.entries(breakpointAttrs).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        if (!v) return acc;

        var matches = _toConsumableArray((0, _utils.removeWhitespace)(v).matchAll(_utils.BREAKPOINT_REGEX));

        if (!matches) return acc;
        acc[k] = matches.reduce(function (accumulator, match) {
          if (!match[1] || !match[2]) return accumulator;
          accumulator[match[1]] = +match[2];
          return accumulator;
        }, {});
        return acc;
      }, {});

      if (!Object.values(breakpoints).filter(Boolean).length) {
        throw new Error(_utils.Errors.BREAKPOINTS_MISSING);
      }

      this.elements.set(element, {
        breakpoints: breakpoints
      });
      this.observer.observe(element, {
        box: 'border-box'
      });
    }
    /**
     * Manually remove an element from the observer and element reference
     * @param {HTMLElement, SVGElement} element The DOM element you would like to remove
     * @returns {Boolean} Whether the element has been removed successfully
     */

  }, {
    key: "unwatch",
    value: function unwatch(element) {
      if (!element || !(0, _utils.isValidElement)(element)) throw new Error(_utils.Errors.INVALID_ELEMENT);
      this.elements["delete"](element);
      this.observer.unobserve(element);
      return this.elements.has(element);
    }
    /**
     * Updates the given elements according to their internal state (eq.elements)
     * @param {Array} elements Array of DOM elements
     */

  }, {
    key: "update",
    value: function update(elements) {
      var _this = this;

      if (!elements || !Array.isArray(elements) || !elements.length || !elements.every(function (el) {
        return (0, _utils.isValidElement)(el);
      })) throw new Error(_utils.Errors.INVALID_ELEMENTS); // eslint-disable-next-line no-var

      var _loop = function _loop() {
        var element = elements[i];

        var entry = _this.elements.get(element);

        if (!entry || !ElementQueries.hasBreakpoints(entry)) return {
          v: void 0
        };
        var activeBreakpoints = Object.entries(entry.breakpoints).reduce(function (acc, _ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              k = _ref4[0],
              bps = _ref4[1];

          acc[k] = ElementQueries.getActiveBreakpoint(entry[k], bps);
          return acc;
        }, {});

        for (var _i2 = 0, _Object$entries = Object.entries(activeBreakpoints); _i2 < _Object$entries.length; _i2++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
              k = _Object$entries$_i[0],
              active = _Object$entries$_i[1];

          if (active) {
            element.setAttribute(_this.opts[DIRECTION_TO_ACTIVE_ATTR[k]], active);
          } else {
            element.removeAttribute(_this.opts[DIRECTION_TO_ACTIVE_ATTR[k]]);
          }
        }
      };

      for (var i = elements.length - 1; i >= 0; i--) {
        var _ret = _loop();

        if (_typeof(_ret) === "object") return _ret.v;
      }
    }
    /**
     * Disconnects all observers and clears element references
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this.observer) this.observer.disconnect();
      if (this.domObserver) this.domObserver.disconnect();
      this.initialized = false;
      this.elements = new WeakMap();
    } // internal

  }], [{
    key: "hasBreakpoints",
    value: function hasBreakpoints(entry) {
      return Object.values(entry.breakpoints).filter(Boolean).length > 0;
    }
  }, {
    key: "getActiveBreakpoint",
    value: function getActiveBreakpoint(value, bps) {
      var breakpoints = _objectSpread(_objectSpread({}, bps), (0, _utils.flipObject)(bps));

      var sortedBreakpoints = Object.values(bps).sort(); // sort ASC

      var largestBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1];

      if (value >= largestBreakpoint) {
        return breakpoints[largestBreakpoint];
      }

      var active = null;

      if (value > sortedBreakpoints[0]) {
        for (var k = 0; k < sortedBreakpoints.length; k++) {
          var breakpointVal = sortedBreakpoints[k];

          if (value >= breakpointVal) {
            active = breakpoints[breakpointVal];
          }
        }
      }

      return active;
    }
  }]);

  return ElementQueries;
}();

exports["default"] = ElementQueries;