import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * The breadcrumbs component helps users to understand where they are within a website’s structure and move between levels.
 * @param {breadcrumbsConfig} params - Breadcrumbs config options
 * @returns {string} Breadcrumbs HTML
 * @see {@link https://design-system.service.gov.uk/components/breadcrumbs/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukBreadcrumbs({
 *   items: [
 *     {
 *       text: 'Section',
 *       href: '/section'
 *     },
 *     {
 *       text: 'Sub-section',
 *       href: '/section/sub-section'
 *     }
 *   ]
 * })
 * ```
 */
export default function govukBreadcrumbs(params) {
  // Set classes for this component
  let classNames = 'govuk-breadcrumbs'
  if (params.classes) {
    classNames += html` ${params.classes}`
  }
  if (params.collapseOnMobile) {
    classNames += ' govuk-breadcrumbs--collapse-on-mobile'
  }

  let breadcrumbs = `<div class="${classNames}"${govukAttributes(params.attributes)}>
  <ol class="govuk-breadcrumbs__list">`

  for (const item of params.items) {
    if (item.href) {
      breadcrumbs += html`<li class="govuk-breadcrumbs__list-item">
      <a class="govuk-breadcrumbs__link" href="${item.href}"!${govukAttributes(item.attributes)}>!${item.html ?? html`${item.text}`}</a>
    </li>`
    } else {
      breadcrumbs += `<li class="govuk-breadcrumbs__list-item" aria-current="page">${item.html ?? html`${item.text}`}</li>`
    }
  }

  return `${breadcrumbs}
  </ol>
</div>`
}

/**
 * @typedef {Object} itemsConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the breadcrumbs item. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the breadcrumbs item. If `html` is provided, the `text` option will be ignored.
 * @property {string} [href] - Link for the breadcrumbs item. If not specified, breadcrumbs item is a normal list item.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the individual crumb.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} breadcrumbsConfig
 * @property {Array.<itemsConfig>} items - The items within breadcrumbs.
 * @property {string} [classes] - Classes to add to the breadcrumbs container.
 * @property {boolean} [collapseOnMobile] - When true, the breadcrumbs will collapse to the first and last item only on tablet breakpoint and below.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the breadcrumbs container.
 */
