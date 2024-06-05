import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Don't touch me!
 */
function test() {
  return 'test'
}

/**
 * Button component
 * @param {buttonConfig} params - Button config options
 * @returns {string} Button HTML
 * @see {@link https://design-system.service.gov.uk/components/button/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukButton({
 *   text: 'Save and continue'
 * })
 * ```
 */
export default function govukButton(params) {
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} buttonConfig
 * @property {string} [element] - HTML element for the button component – `input`, `button` or `a`. In most cases you will not need to set this as it will be configured automatically if `href` is provided. This parameter will be removed in the next major version.
 * @property {string} text - If `html` is set, this is not required. Text for the `input`, `button` or `a` element. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `"button"` unless `href` is also set, or it has already been defined.
 * @property {string} html - If `text` is set, this is not required. HTML for the `button` or `a` element only. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `"button"` unless `href` is also set, or it has already been defined. This option has no effect if `element` is set to `"input"`.
 * @property {string} [name] - Name for the `input` or `button`. This has no effect on `a` elements.
 * @property {string} [type] - Type for the `input` or `button` element – `"button"`, `"submit"` or `"reset"`. Defaults to `"submit"`. This has no effect on `a` elements.
 * @property {string} [value] - Value for the `button` element only. This has no effect on `a` or `input` elements.
 * @property {boolean} [disabled] - Whether the button component should be disabled. For `input` and `button` elements, `disabled` and `aria-disabled` attributes will be set automatically. This has no effect on `a` elements.
 * @property {string} [href] - The URL that the button component should link to. If this is set, `element` will be automatically set to `"a"` if it has not already been defined.
 * @property {string} [classes] - Classes to add to the button component.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the button component.
 * @property {boolean} [preventDoubleClick] - Prevent accidental double clicks on submit buttons from submitting forms multiple times.
 * @property {boolean} [isStartButton] - Use for the main call to action on your service's start page.
 * @property {string} [id] - The ID of the button.
 */
