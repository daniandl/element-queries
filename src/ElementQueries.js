import {
  BREAKPOINT_REGEX,
  removeWhitespace,
  flipObject,
  Errors,
} from './utils'

const DEFAULT_OPTS = {
  htmlAttrBreakpoints: 'data-eq-breakpoints',
  htmlAttrActive: 'data-eq-active',
}

export default class ElementQueries {
  constructor(opts) {
    this.opts = Object.freeze({ ...DEFAULT_OPTS, ...opts })

    this.observer = new ResizeObserver(this.onResize.bind(this))
    this.elements = new WeakMap()

    // wait for document load
    if (/complete|interactive|loaded/.test(document.readyState)) {
      this.onDocumentLoad()
    } else {
      document.addEventListener('DOMContentLoaded', this.onDocumentLoad.bind(this), { once: true })
    }
  }

  // Internal
  onDocumentLoad() {
    this.init()

    this.domObserver = new MutationObserver(this.onDomMutation.bind(this))
    this.domObserver.observe(document.body, { childList: true, subtree: true })
  }

  init() {
    const elements = document.querySelectorAll(`[${this.opts.htmlAttrBreakpoints}]`)

    for (const element of elements) {
      try {
        this.watch(element)
      } catch (error) {
        console.error(error, element)
      }
    }
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
          const rect = element.getBoundingClientRect()
          width = rect.width
          height = rect.height
        }

        const elementsEntry = this.elements.get(element)
        this.elements.set(element, { ...elementsEntry, ...{ width, height } })
        toUpdate.add(element)
      }
    }

    this.update([...toUpdate])
  }

  onDomMutation(mutations) {
    // eslint-disable-next-line no-var
    for (var i = mutations.length - 1; i >= 0; i--) {
      if (mutations[i].addedNodes.length) {
        // eslint-disable-next-line no-var
        for (var k = mutations[i].addedNodes.length - 1; k >= 0; k--) {
          const element = mutations[i].addedNodes[k]
          if (
            element instanceof HTMLElement
            && element.hasAttribute(this.opts.htmlAttrBreakpoints)
          ) {
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
    const elements = document.querySelectorAll(`[${this.opts.htmlAttrBreakpoints}]`)

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
   * @param {HTMLElement} element The DOM element you would like to watch
   */
  watch(element) {
    if (!element || !(element instanceof HTMLElement)) throw new Error(Errors.INVALID_ELEMENT)
    if (!element.hasAttribute(this.opts.htmlAttrBreakpoints)) {
      throw new Error(Errors.BREAKPOINTS_MISSING)
    }

    const breakpointString = removeWhitespace(element.getAttribute(this.opts.htmlAttrBreakpoints))
    const breakpointMatches = [...breakpointString.matchAll(BREAKPOINT_REGEX)]

    if (!breakpointMatches.length) throw new Error(Errors.BREAKPOINTS_MISSING)

    const breakpoints = breakpointMatches.reduce((acc, match) => {
      if (!match[1] || !match[2]) return acc

      acc[match[1]] = +match[2]
      return acc
    }, {})

    this.elements.set(element, { breakpoints })
    this.observer.observe(element, { box: 'border-box' })
  }

  /**
   * Manually remove an element from the observer and element reference
   * @param {HTMLElement} element The DOM element you would like to remove
   * @returns {Boolean} Whether the element has been removed successfully
   */
  unwatch(element) {
    if (!element || !(element instanceof HTMLElement)) throw new Error(Errors.INVALID_ELEMENT)

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
      || !elements.every(el => el instanceof HTMLElement)
    ) throw new Error(Errors.INVALID_ELEMENTS)

    // eslint-disable-next-line no-var
    for (var i = elements.length - 1; i >= 0; i--) {
      const element = elements[i]

      const entry = this.elements.get(element)
      if (entry && entry.breakpoints) {
        const { width } = entry
        let active = null

        const bpsFlipped = flipObject(entry.breakpoints)
        const bpWidths = Object.values(entry.breakpoints).sort() // sort ASC
        const bpLargest = bpWidths[bpWidths.length - 1]

        if (width >= bpLargest) {
          active = bpsFlipped[bpLargest]
        } else if (width > bpWidths[0]) {
          for (let k = 0; k < bpWidths.length; k++) {
            const bpWidth = bpWidths[k]

            if (width >= bpWidth) {
              active = bpsFlipped[bpWidth]
            }
          }
        }

        if (active) {
          element.setAttribute(this.opts.htmlAttrActive, active)
          continue
        }
      }

      element.removeAttribute(this.opts.htmlAttrActive)
    }
  }

  /**
   * Disconnects all observers and clears element references
   */
  destroy() {
    if (this.observer) this.observer.disconnect()
    if (this.domObserver) this.domObserver.disconnect()

    this.elements = new WeakMap()
  }
}
