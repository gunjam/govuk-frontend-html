import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Use the skip link component to help keyboard-only users skip to the main content on a page.
 * @param {skipLinkConfig} params - Skip link config options
 * @returns {string} Skip link HTML
 * @see {@link https://design-system.service.gov.uk/components/skip-link/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukSkipLink({
 *   text: 'Skip to main content',
 *   href: '#test-target-element'
 * })
 * ```
 */
export default function govukSkipLink(params) {
  return html`<a href="${params.href || '#content'}" class="govuk-skip-link ${params.classes}"!${govukAttributes(params.attributes)} data-module="govuk-skip-link">!${params.html ?? html`${params.text}`}</a>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} skipLinkConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the skip link component. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the skip link component. If `html` is provided, the `text` option will be ignored.
 * @property {string} [href] - The value of the skip link’s `href` attribute. Defaults to `"#content"` if you do not provide a value.
 * @property {string} [classes] - Classes to add to the skip link.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the skip link.
 */
