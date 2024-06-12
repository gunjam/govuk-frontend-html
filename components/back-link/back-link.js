import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

export default function govukBackLink(params) {
  return html`<a href="${params.href || '#'}" class="govuk-back-link !${params.classes}" !${govukAttributes(params.attributes)}>
    !${params.html ?? (html`${params.text}` || 'Back')}
  </a>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} backLinkConfig
 * @property {string} [text] - Text to use within the back link component. If `html` is provided, the `text` option will be ignored. Defaults to `"Back"`.
 * @property {string} [html] - HTML to use within the back link component. If `html` is provided, the `text` option will be ignored. Defaults to `"Back"`.
 * @property {string} href - The value of the link's `href` attribute.
 * @property {string} [classes] - Classes to add to the anchor tag.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the anchor tag.
 */
