import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Use this component at the top of a page to summarise any errors a user has made.
 *
 * When a user makes an error, you must show both an error summary and an {@link https://design-system.service.gov.uk/components/error-message/ error message} next to each answer that contains an error.
 * @param {errorSummaryConfig} params - Error summary config options
 * @returns {string} Error summary HTML
 * @see {@link https://design-system.service.gov.uk/components/error-summary/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukErrorSummary({
 *   titleText: 'There is a problem',
 *   errorList: [
 *     {
 *       text: 'The date your passport was issued must be in the past',
 *       href: '#example-error-1'
 *     },
 *     {
 *       text: 'Enter a postcode, like AA1 1AA',
 *       href: '#example-error-2'
 *     }
 *   ]
 * })
 * ```
 */
export default function govukErrorSummary(params) {
  let classNames = 'govuk-error-summary'

  // Add custom class names
  if (params.classes) {
    classNames += html` ${params.classes}`
  }

  // Build `<ul>` list of error items
  let errorList = ''
  if (params.errorList?.length > 0) {
    errorList += '<ul class="govuk-list govuk-error-summary__list">'

    for (const item of params.errorList) {
      const content = item.html ?? html`${item.text}`
      errorList += '<li>'
      errorList += item.href
        ? html`<a href="${item.href}"!${govukAttributes(item.attributes)}>!${content}</a>`
        : content

      errorList += '</li>'
    }
    errorList += '</ul>'
  }

  const hasDescription = params.descriptionHtml || params.descriptionText

  // Keep the role="alert" in a seperate child container to prevent a race
  // condition between the focusing js at the alert, resulting in information
  // getting missed in screen reader announcements.
  return `<div class="${classNames}"${attribute('data-disable-auto-focus', params.disableAutoFocus)}${govukAttributes(params.attributes)} data-module="govuk-error-summary">
    <div role="alert">
      <h2 class="govuk-error-summary__title">
        ${params.titleHtml ?? html`${params.titleText}`}
      </h2>
      <div class="govuk-error-summary__body">
        ${hasDescription ? `<p>${params.descriptionHtml ?? html`${params.descriptionText}`}</p>` : ''}
        ${errorList}
      </div>
    </div>
  </div>`
}

/**
 * @typedef {Object} errorListConfig
 * @property {string} [href] - Href attribute for the error link item. If provided item will be an anchor.
 * @property {string} text - If `html` is set, this is not required. Text for the error link item. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML for the error link item. If `html` is provided, the `text` option will be ignored.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the error link anchor.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} errorSummaryConfig
 * @property {string} titleText - If `titleHtml` is set, this is not required. Text to use for the heading of the error summary block. If `titleHtml` is provided, `titleText` will be ignored.
 * @property {string} titleHtml - If `titleText` is set, this is not required. HTML to use for the heading of the error summary block. If `titleHtml` is provided, `titleText` will be ignored.
 * @property {string} [descriptionText] - Text to use for the description of the errors. If you set `descriptionHtml`, the component will ignore `descriptionText`.
 * @property {string} [descriptionHtml] - HTML to use for the description of the errors. If you set this option, the component will ignore `descriptionText`.
 * @property {Array.<errorListConfig>} [errorList] - A list of errors to include in the error summary.
 * @property {boolean} [disableAutoFocus] - Prevent moving focus to the error summary when the page loads.
 * @property {string} [classes] - Classes to add to the error-summary container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the error-summary container.
 */
