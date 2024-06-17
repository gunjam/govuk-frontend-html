import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * The panel component is a visible container used on confirmation or results pages to highlight important content.
 * @param {panelConfig} params - Panel config options
 * @returns {string} Panel HTML
 * @see {@link https://design-system.service.gov.uk/components/panel/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukPanel({
 *   titleHtml: 'Application complete',
 *   text: 'Your reference number: HDJ2123F'
 * })
 * ```
 */
export default function govukPanel(params) {
  const headingLevel = params.headingLevel ? html`${params.headingLevel}` : 1

  return `<div class="govuk-panel govuk-panel--confirmation${params.classes ? html` ${params.classes}` : ''}"${govukAttributes(params.attributes)}>
  <h${headingLevel} class="govuk-panel__title">
    ${params.titleHtml ?? html`${params.titleText}`}
  </h${headingLevel}>
  ${params.html || params.text ? `<div class="govuk-panel__body">${params.html ?? html`${params.text}`}</div>` : ''}
</div>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} panelConfig
 * @property {string} titleText - If `titleHtml` is set, this is not required. Text to use within the panel. If `titleHtml` is provided, the `titleText` option will be ignored.
 * @property {string} titleHtml - If `titleText` is set, this is not required. HTML to use within the panel. If `titleHtml` is provided, the `titleText` option will be ignored.
 * @property {integer} [headingLevel] - Heading level, from `1` to `6`. Default is `1`.
 * @property {string} text - If `html` is set, this is not required. Text to use within the panel content. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the panel content. If `html` is provided, the `text` option will be ignored.
 * @property {string} [classes] - Classes to add to the panel container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the panel container.
 */
