import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Add hint text to inputs and fieldsets
 * @param {hintConfig} params - Hint config options
 * @returns {string} Hint HTML
 * @example
 * ```javascript
 * govukHint({
 *   text: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, 'QQ 12 34 56 C'."
 * })
 * ```
 */
export default function govukHint(params) {
  const attributes = `${attribute('id', params.id)}${govukAttributes(params.attributes)}`
  return html`<div class="govuk-hint ${params.classes}"!${attributes}>!${params.html ?? html`${params.text}`}</div>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} hintConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the hint. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the hint. If `html` is provided, the `text` option will be ignored.
 * @property {string} [id] - Optional ID attribute to add to the hint span tag.
 * @property {string} [classes] - Classes to add to the hint span tag.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the hint span tag.
 */
