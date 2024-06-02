import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Make a page easier to scan by letting users reveal more detailed information only if they need it.
 * @param {detailsConfig} params - Details config options
 * @returns {string} Details HTML
 * @see {@link https://design-system.service.gov.uk/components/details/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukDetails({
 *   summaryText: 'Help with nationality',
 *   text: 'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you can’t provide your nationality, you’ll have to send copies of identity documents through the post.'
 * })
 * ```
 */
export default function govukDetails(params) {
  return html`<details!${attribute('id', params.id)} class="govuk-details ${params.classes}"!${govukAttributes(params.attributes)}!${params.open ? ' open' : ''}>
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      !${params.summaryHtml ?? html`${params.summaryText}`}
    </span>
  </summary>
  <div class="govuk-details__text">
    !${params.html ?? html`${params.text}`}
  </div>
</details>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} detailsConfig
 * @property {string} summaryText - If `summmaryHtml` is set, this is not required. Text to use within the summary element (the visible part of the details element). If `summaryHtml` is provided, the `summaryText` option will be ignored.
 * @property {string} summaryHtml - If `summmaryText` is set, this is not required. HTML to use within the summary element (the visible part of the details element). If `summaryHtml` is provided, the `summaryText` option will be ignored.
 * @property {string} text - If `html` is set, this is not required. Text to use within the disclosed part of the details element. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the disclosed part of the details element. If `html` is provided, the `text` option will be ignored.
 * @property {string} [id] - ID to add to the details element.
 * @property {boolean} [open] - If `true`, details element will be expanded.
 * @property {string} [classes] - Classes to add to the `<details>` element.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the `<details>` element.
 */
