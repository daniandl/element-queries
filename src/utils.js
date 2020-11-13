// Constants
export const BREAKPOINT_REGEX = /([_A-z]+[A-z0-9-_]+):(\d+)/g

export const Errors = {
  NOT_SUPPORTED: 'Element Queries is not supported by this browser.',
  NOT_SUPPORTED_OBSERVE: 'The "observeDom" option is not supported by this browser.',
  INVALID_ELEMENT: 'Please provide an HTML or SVG element.',
  INVALID_ELEMENTS: 'Please provide an array of valid elements (HTML/SVG).',
  BREAKPOINTS_MISSING: 'No breakpoints found on element.',
  BREAKPOINTS_INVALID: 'Invalid breakpoint overrides provided.',
  ALREADY_INIT: 'This instance is already initialized, please .destroy() it first.',
  DOM_OBSERVE_CONFLICT: 'You are using custom breakpoint overrides with the "obserDom" option enabled. This can have negative side-effects.',
}

export const DEFAULT_OPTS = {
  htmlAttrBreakpoints: 'data-eq-breakpoints',
  htmlAttrActive: 'data-eq-active',
  htmlAttrHeightBreakpoints: 'data-eq-height-breakpoints',
  htmlAttrHeightActive: 'data-eq-height-active',
  observeDom: true,
}

// Functions
export const removeWhitespace = str => str.replace(/ /g, '')

export const flipObject = o => Object.entries(o)
  .reduce((r, [k, v]) => Object.assign(r, { [v]: k }), {})

export const isValidElement = el => (
  el instanceof HTMLElement
  || (el instanceof SVGElement && !(el instanceof SVGSVGElement))
)

export const prefixLog = str => `[Element Queries] ${str}`
