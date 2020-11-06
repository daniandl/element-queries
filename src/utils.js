// Constants
export const BREAKPOINT_REGEX = /([_A-z]+[A-z0-9-_]+):(\d+)/g

export const Errors = {
  INVALID_ELEMENT: 'Please provide an HTML or SVG element.',
  INVALID_ELEMENTS: 'Please provide an array of valid elements (HTML/SVG).',
  BREAKPOINTS_MISSING: 'No breakpoints found on element.',
  ALREADY_INIT: 'This instance is already initialized, please .destroy() it first.',
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
