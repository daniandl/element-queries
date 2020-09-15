"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementQueries = void 0;

var _utils = require("./utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_OPTS = {
  htmlAttrBreakpoints: 'data-eq-breakpoints',
  htmlAttrActive: 'data-eq-active'
};

var ElementQueries = /*#__PURE__*/function () {
  function ElementQueries(opts) {
    var _this = this;

    _classCallCheck(this, ElementQueries);

    this.opts = Object.freeze(_objectSpread(_objectSpread({}, DEFAULT_OPTS), opts));
    this.observer = new ResizeObserver(this.onResize.bind(this));
    this.elements = new WeakMap();
    document.addEventListener('DOMContentLoaded', function () {
      _this.init();

      _this.domObserver = new MutationObserver(_this.onDomMutation.bind(_this));

      _this.domObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }, {
      once: true
    });
  } // Internal


  _createClass(ElementQueries, [{
    key: "init",
    value: function init() {
      var elements = document.querySelectorAll("[".concat(this.opts.htmlAttrBreakpoints, "]"));

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
            var rect = element.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
          }

          var elementsEntry = this.elements.get(element);
          this.elements.set(element, _objectSpread(_objectSpread({}, elementsEntry), {
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
      // eslint-disable-next-line no-var
      for (var i = mutations.length - 1; i >= 0; i--) {
        if (mutations[i].addedNodes.length) {
          // eslint-disable-next-line no-var
          for (var k = mutations[i].addedNodes.length - 1; k >= 0; k--) {
            var element = mutations[i].addedNodes[k];

            if (element instanceof HTMLElement && element.hasAttribute(this.opts.htmlAttrBreakpoints)) {
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
     * Watch an element manually
     * @param {HTMLElement} element The DOM element you would like to watch
     */

  }, {
    key: "watch",
    value: function watch(element) {
      if (!element || !(element instanceof HTMLElement)) throw new Error(_utils.Errors.INVALID_ELEMENT);

      if (!element.hasAttribute(this.opts.htmlAttrBreakpoints)) {
        throw new Error(_utils.Errors.BREAKPOINTS_MISSING);
      }

      var breakpointString = (0, _utils.removeWhitespace)(element.getAttribute(this.opts.htmlAttrBreakpoints));

      var breakpointMatches = _toConsumableArray(breakpointString.matchAll(_utils.BREAKPOINT_REGEX));

      if (!breakpointMatches.length) throw new Error(_utils.Errors.BREAKPOINTS_MISSING);
      var breakpoints = breakpointMatches.reduce(function (acc, match) {
        if (!match[1] || !match[2]) return acc;
        acc[match[1]] = +match[2];
        return acc;
      }, {});
      this.elements.set(element, {
        breakpoints: breakpoints
      });
      this.observer.observe(element, {
        box: 'border-box'
      });
    }
    /**
     * Updates the given elements according to their internal state (eq.elements)
     * @param {Array} elements Array of DOM elements
     */

  }, {
    key: "update",
    value: function update(elements) {
      if (!elements || !Array.isArray(elements) || !elements.length || !elements.every(function (el) {
        return el instanceof HTMLElement;
      })) throw new Error(_utils.Errors.INVALID_ELEMENTS); // eslint-disable-next-line no-var

      for (var i = elements.length - 1; i >= 0; i--) {
        var element = elements[i];
        var entry = this.elements.get(element);

        if (entry && entry.breakpoints) {
          var width = entry.width;
          var active = null;
          var bpsFlipped = (0, _utils.flipObject)(entry.breakpoints);
          var bpWidths = Object.values(entry.breakpoints).sort(); // sort ASC

          var bpLargest = bpWidths[bpWidths.length - 1];

          if (width >= bpLargest) {
            active = bpsFlipped[bpLargest];
          } else if (width > bpWidths[0]) {
            for (var k = 0; k < bpWidths.length; k++) {
              var bpWidth = bpWidths[k];

              if (width >= bpWidth) {
                active = bpsFlipped[bpWidth];
              }
            }
          }

          if (active) {
            element.setAttribute(this.opts.htmlAttrActive, active);
            continue;
          }
        }

        element.removeAttribute(this.opts.htmlAttrActive);
      }
    }
    /**
     * Disconnects all observers and clears element references
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.observer.disconnect();
      this.domObserver.disconnect();
      this.elements = new WeakMap();
    }
  }]);

  return ElementQueries;
}();

exports.ElementQueries = ElementQueries;