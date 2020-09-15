// Constants
export const BREAKPOINT_REGEX = /([_A-z]+[A-z0-9-_]+):(\d+)/g

export const Errors = {
  INVALID_ELEMENT: 'Please provide a HTMLElement',
  INVALID_ELEMENTS: 'Please provide an array of HTMLElements',
  BREAKPOINTS_MISSING: 'No breakpoints found on element',
}

// Functions
export const removeWhitespace = str => str.replace(/ /g, '')
export const flipObject = o => Object.entries(o)
  .reduce((r, [k, v]) => Object.assign(r, { [v]: k }), {})
