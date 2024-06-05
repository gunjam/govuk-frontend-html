import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Label an input
 * @param {labelConfig} params - Label config options
 * @returns {string} Label HTML
 * @example
 * ```javascript
 * govukLabel({
 *   text: 'National Insurance number'
 * })
 * ```
 */
export default function govukLabel(params) {
  let labelHtml = ''

  if (params.html || params.text) {
    const attributes = `${govukAttributes(params.attributes)}${attribute('for', params.for)}`
    labelHtml = html`<label class="govuk-label ${params.classes}"!${attributes}>!${params.html ?? html`${params.text}`}</label>`
  }

  if (params.isPageHeading) {
    labelHtml = `<h1 class="govuk-label-wrapper">\n  ${labelHtml}\n</h1>`
  }

  return labelHtml
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} labelConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the label. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the label. If `html` is provided, the `text` option will be ignored.
 * @property {string} [for] - The value of the `for` attribute, the ID of the input the label is associated with.
 * @property {boolean} [isPageHeading] - Whether the label also acts as the heading for the page.
 * @property {string} [classes] - Classes to add to the label tag.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the label tag.
 */
