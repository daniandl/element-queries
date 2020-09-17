"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ElementQueries = _interopRequireDefault(require("./ElementQueries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ElementQueries["default"];
/** TODOs
 * TODO move this out of here :)
 * TODO allow passing breakpoint object to .watch() which overrides htmlAttrBreakpoints
 * TODO Support HTMLElement *AND* SVGElement
 * TODO disable if ResizeObserver isnt supported
 * NOTE general browser-support checks (MutationObserver, etc)
 * NOTE batching resize updates?
 * NOTE throttle observer?
 * NOTE debounce updates on a per-element basis?
 * NOTE use requestAnimationFrame on resize callback?
 * NOTE what do if user changes htmlAttrBreakpoints dynamically
 */

exports["default"] = _default;