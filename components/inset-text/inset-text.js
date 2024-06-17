import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Use the inset text component to differentiate a block of text from the content that surrounds it, for example:
 * * quotes
 * * examples
 * * additional information about the page
 * @param {insetTextConfig} params - Inset text config options
 * @returns {string} Inset text HTML
 * @see {@link https://design-system.service.gov.uk/components/inset-text/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukInsetText({
 *   text: 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.'
 * })
 * ```
 */
export default function govukInsetText(params) {
  return `<div${attribute('id', params.id)} class="govuk-inset-text${params.classes ? html` ${params.classes}` : ''}"${govukAttributes(params.attributes)}>
  ${params.html ?? html`${params.text}`}
</div>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} insetTextConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the inset text component. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the inset text component. If `html` is provided, the `text` option will be ignored.
 * @property {string} [id] - ID attribute to add to the inset text container.
 * @property {string} [classes] - Classes to add to the inset text container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the inset text container.
 */
