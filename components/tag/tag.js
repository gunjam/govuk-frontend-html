import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Use the tag component to show users the status of something.
 * @param {tagConfig} params - Tag config options
 * @returns {string} Tag HTML
 * @see {@link https://design-system.service.gov.uk/components/tag/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukTag({
 *   text: 'Alpha'
 * })
 * ```
 */
export default function govukTag(params) {
  return `<strong class="govuk-tag${params.classes ? html` ${params.classes}` : ''}"${govukAttributes(params.attributes)}>
  ${params.html ?? html`${params.text}`}
</strong>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} tagConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the tag component. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the tag component. If `html` is provided, the `text` option will be ignored.
 * @property {string} [classes] - Classes to add to the tag.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the tag.
 */
