// Constants
export const BREAKPOINT_REGEX = /([_A-z]+[A-z0-9-_]+):(\d+)/g

export const Errors = {
  INVALID_ELEMENT: 'Please provide a HTMLElement',
  INVALID_ELEMENTS: 'Please provide an array of HTMLElements',
  BREAKPOINTS_MISSING: 'No breakpoints found on element',
  ALREADY_INIT: 'This instance is already initialized, please .destroy() it first.',
}

export const DEFAULT_OPTS = {
  htmlAttrBreakpoints: 'data-eq-breakpoints',
  htmlAttrActive: 'data-eq-active',
}

// Functions
export const removeWhitespace = str => str.replace(/ /g, '')
export const flipObject = o => Object.entries(o)
  .reduce((r, [k, v]) => Object.assign(r, { [v]: k }), {})
