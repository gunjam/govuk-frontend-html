import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Warning text component
 * @param {warningTextConfig} params - Warning text config options
 * @returns {string} Warning text HTML
 * @see {@link https://design-system.service.gov.uk/components/warning-text/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukWarningText({
 *   text: 'You can be fined up to £5,000 if you don’t register.',
 *   iconFallbackText: 'Warning'
 * })
 * ```
 */
export default function govukWarningText(params) {
  return html`<div class="govuk-warning-text ${params.classes}"!${govukAttributes(params.attributes)}>
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">${params.iconFallbackText ?? 'Warning'}</span>
    !${params.html ?? html`${params.text}`}
  </strong>
</div>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} warningTextConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the warning text component. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the warning text component. If `html` is provided, the `text` option will be ignored.
 * @property {string} [iconFallbackText] - The fallback text for the icon. Defaults to `"Warning"`.
 * @property {string} [classes] - Classes to add to the warning text.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the warning text.
 */
