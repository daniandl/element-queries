import {
  BREAKPOINT_REGEX,
  DEFAULT_OPTS,
  Errors,
  removeWhitespace,
  flipObject,
  isValidElement,
} from './utils'

const DIRECTION_TO_ACTIVE_ATTR = {
  width: 'htmlAttrActive',
  height: 'htmlAttrHeightActive',
}

export default class ElementQueries {
  constructor(opts) {
    this.initialized = false
    this.opts = Object.freeze({ ...DEFAULT_OPTS, ...opts })

    this.observer = new ResizeObserver(this.onResize.bind(this))
    this.elements = new WeakMap()

    // wait for document load
    if (/complete|interactive|loaded/.test(document.readyState)) {
      this.init()
    } else {
      document.addEventListener('DOMContentLoaded', this.init.bind(this), { once: true })
    }
  }

  // Internal
  init() {
    if (this.initialized) throw new Error(Errors.ALREADY_INIT)
    this.initialized = true

    if (this.opts.observeDom) {
      this.domObserver = new MutationObserver(this.onDomMutation.bind(this))
      this.domObserver.observe(document.body, { childList: true, subtree: true })
    }

    this.query()
  }

  onResize(entries) {
    const toUpdate = new Set()

    // eslint-disable-next-line no-var
    for (var i = entries.length - 1; i >= 0; i--) {
      const { target: element, borderBoxSize } = entries[i]

      if (this.elements.has(element)) {
        let width
        let height

        if (borderBoxSize && borderBoxSize[0]) {
          width = borderBoxSize[0].inlineSize
          height = borderBoxSize[0].blockSize
        } else {
          // fallback for Safari
          const rect = element instanceof SVGElement
            ? element.getBBox()
            : element.getBoundingClientRect()

          width = rect.width
          height = rect.height
        }

        const entry = this.elements.get(element)
        this.elements.set(element, { ...entry, ...{ width, height } })
        toUpdate.add(element)
      }
    }

    this.update([...toUpdate])
  }

  onDomMutation(mutations) {
    const { htmlAttrBreakpoints, htmlAttrHeightBreakpoints } = this.opts

    // eslint-disable-next-line no-var
    for (var i = mutations.length - 1; i >= 0; i--) {
      if (mutations[i].addedNodes.length) {
        // eslint-disable-next-line no-var
        for (var k = mutations[i].addedNodes.length - 1; k >= 0; k--) {
          const element = mutations[i].addedNodes[k]

          const hasBreakpoints = element.getAttributeNames()
            .some(attr => [htmlAttrBreakpoints, htmlAttrHeightBreakpoints].includes(attr))

          if (isValidElement(element) && hasBreakpoints) {
            try {
              this.watch(element)
            } catch (e) {
              console.error(e, element)
            }
          }
        }
      }
    }
  }

  // Methods & Helpers

  /**
   * Finds all elements with breakpoints and watches them
   */
  query() {
    const { htmlAttrBreakpoints, htmlAttrHeightBreakpoints } = this.opts

    const attrs = [htmlAttrBreakpoints, htmlAttrHeightBreakpoints]
    const elements = document.querySelectorAll(attrs.map(i => `[${i}]`).join(','))

    console.log(elements)

    for (const element of elements) {
      try {
        this.watch(element)
      } catch (error) {
        console.error(error, element)
      }
    }
  }

  /**
   * Watch an element manually
   * @param {HTMLElement, SVGElement} element The DOM element you would like to watch
   */
  watch(element) {
    const { htmlAttrBreakpoints, htmlAttrHeightBreakpoints } = this.opts

    if (!element || !isValidElement(element)) {
      throw new Error(Errors.INVALID_ELEMENT)
    }

    const breakpointAttrs = {
      width: element.getAttribute(htmlAttrBreakpoints),
      height: element.getAttribute(htmlAttrHeightBreakpoints),
    }

    if (!Object.values(breakpointAttrs).filter(Boolean).length) {
      throw new Error(Errors.BREAKPOINTS_MISSING)
    }

    const breakpoints = Object.entries(breakpointAttrs).reduce((acc, [k, v]) => {
      if (!v) return acc

      const matches = [...removeWhitespace(v).matchAll(BREAKPOINT_REGEX)]
      if (!matches) return acc

      acc[k] = matches.reduce((accumulator, match) => {
        if (!match[1] || !match[2]) return accumulator

        accumulator[match[1]] = +match[2]
        return accumulator
      }, {})

      return acc
    }, {})

    if (!Object.values(breakpoints).filter(Boolean).length) {
      throw new Error(Errors.BREAKPOINTS_MISSING)
    }

    this.elements.set(element, { breakpoints })
    this.observer.observe(element, { box: 'border-box' })
  }

  /**
   * Manually remove an element from the observer and element reference
   * @param {HTMLElement, SVGElement} element The DOM element you would like to remove
   * @returns {Boolean} Whether the element has been removed successfully
   */
  unwatch(element) {
    if (!element || !isValidElement(element)) throw new Error(Errors.INVALID_ELEMENT)

    this.elements.delete(element)
    this.observer.unobserve(element)

    return this.elements.has(element)
  }

  /**
   * Updates the given elements according to their internal state (eq.elements)
   * @param {Array} elements Array of DOM elements
   */
  update(elements) {
    if (
      !elements
      || !Array.isArray(elements)
      || !elements.length
      || !elements.every(el => isValidElement(el))
    ) throw new Error(Errors.INVALID_ELEMENTS)

    // eslint-disable-next-line no-var
    for (var i = elements.length - 1; i >= 0; i--) {
      const element = elements[i]

      const entry = this.elements.get(element)
      if (!entry || !ElementQueries.hasBreakpoints(entry)) return

      const activeBreakpoints = Object.entries(entry.breakpoints).reduce((acc, [k, bps]) => {
        acc[k] = ElementQueries.getActiveBreakpoint(entry[k], bps)
        return acc
      }, {})

      for (const [k, active] of Object.entries(activeBreakpoints)) {
        if (active) {
          element.setAttribute(this.opts[DIRECTION_TO_ACTIVE_ATTR[k]], active)
        } else {
          element.removeAttribute(this.opts[DIRECTION_TO_ACTIVE_ATTR[k]])
        }
      }
    }
  }

  /**
   * Disconnects all observers and clears element references
   */
  destroy() {
    if (this.observer) this.observer.disconnect()
    if (this.domObserver) this.domObserver.disconnect()

    this.initialized = false
    this.elements = new WeakMap()
  }

  // internal

  static hasBreakpoints(entry) {
    return Object.values(entry.breakpoints).filter(Boolean).length > 0
  }

  static getActiveBreakpoint(value, bps) {
    const breakpoints = { ...bps, ...flipObject(bps) }
    const sortedBreakpoints = Object.values(bps).sort() // sort ASC
    const largestBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1]

    if (value >= largestBreakpoint) {
      return breakpoints[largestBreakpoint]
    }

    let active = null
    if (value > sortedBreakpoints[0]) {
      for (let k = 0; k < sortedBreakpoints.length; k++) {
        const breakpointVal = sortedBreakpoints[k]

        if (value >= breakpointVal) {
          active = breakpoints[breakpointVal]
        }
      }
    }

    return active
  }
}
