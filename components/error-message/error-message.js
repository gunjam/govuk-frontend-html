import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Follow the {@link https://design-system.service.gov.uk/patterns/validation/ validation pattern} and show an error message when there is a validation error. In the error message explain what went wrong and how to fix it.
 * @param {errorMessageConfig} params - Error message config options
 * @returns {string} Error message HTML
 * @see {@link https://design-system.service.gov.uk/components/error-message/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukErrorMessage({
 *   text: 'The date your passport was issued must be in the past'
 * })
 * ```
 */
export default function govukErrorMessage(params) {
  let content = params.html ?? html`${params.text}`
  let hiddenText = 'Error'

  if (typeof params.visuallyHiddenText === 'string') {
    hiddenText = html`${params.visuallyHiddenText}`
  }
  if (hiddenText) {
    content = `<span class="govuk-visually-hidden">${hiddenText}:</span> ${content}`
  }

  return html`<p!${attribute('id', params.id)} class="govuk-error-message ${params.classes}"!${govukAttributes(params.attributes)}>!${content}</p>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} errorMessageConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the error message. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the error message. If `html` is provided, the `text` option will be ignored.
 * @property {string} [id] - ID attribute to add to the error message `<p>` tag.
 * @property {string} [classes] - Classes to add to the error message `<p>` tag.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the error message `<p>` tag.
 * @property {string} [visuallyHiddenText] - A visually hidden prefix used before the error message. Defaults to `"Error"`.
 */
