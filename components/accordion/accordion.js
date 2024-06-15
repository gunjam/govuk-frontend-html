import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukI18nAttributes from '../../utils/i18n.js'

/**
 * The accordion component lets users show and hide sections of related content on a page.
 * @param {accordionConfig} params - Accordion config options
 * @returns {string} Accordion HTML
 * @see {@link https://design-system.service.gov.uk/components/accordion/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukAccordion({
 *   id: 'default-example',
 *   items: [
 *     {
 *       heading: {
 *         text: 'Section A'
 *       },
 *       content: {
 *         text: 'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.'
 *       }
 *     },
 *     {
 *       heading: {
 *         text: 'Section B'
 *       },
 *       content: {
 *         html: '<ul class=\'govuk-list govuk-list--bullet\'><li>Example item 2</li></ul>\n'
 *       }
 *     }
 *   ]
 * })
 * ```
 */
export default function govukAccordion(params) {
  const id = html`${params.id}`
  const headingLevel = params.headingLevel ? html`${params.headingLevel}` : '2'

  let attributes = `class="govuk-accordion${params.classes ? html` ${params.classes}` : ''}"`
  attributes += ' data-module="govuk-accordion"'
  attributes += ` id="${id}"`

  attributes += govukI18nAttributes({
    key: 'hide-all-sections',
    message: params.hideAllSectionsText
  })

  attributes += govukI18nAttributes({
    key: 'hide-section',
    message: params.hideSectionText
  })

  attributes += govukI18nAttributes({
    key: 'hide-section-aria-label',
    message: params.hideSectionAriaLabelText
  })

  attributes += govukI18nAttributes({
    key: 'show-all-sections',
    message: params.showAllSectionsText
  })

  attributes += govukI18nAttributes({
    key: 'show-section',
    message: params.showSectionText
  })

  attributes += govukI18nAttributes({
    key: 'show-section-aria-label',
    message: params.showSectionAriaLabelText
  })

  attributes += attribute('data-remember-expanded', params.rememberExpanded)
  attributes += govukAttributes(params.attributes)

  let items = ''
  let index = 0
  for (const item of params.items) {
    if (item) {
      index++
      items += `<div class="govuk-accordion__section${item.expanded ? ' govuk-accordion__section--expanded' : ''}">
    <div class="govuk-accordion__section-header">
      <h${headingLevel} class="govuk-accordion__section-heading">
        <span class="govuk-accordion__section-button" id="${id}-heading-${index}">
          ${item.heading?.html ?? html`${item.heading?.text}`}
        </span>
      </h!${headingLevel}>
      ${item.summary?.html || item.summary?.text ?
          `<div class="govuk-accordion__section-summary govuk-body" id="${id}-summary-${index}">
            ${item.summary.html ?? html`${item.summary.text}`}
          </div>` : ''}
    </div>
    <div id="${id}-content-${index}" class="govuk-accordion__section-content">
      ${item.content?.html ?? html`<p class="govuk-body">${item.content?.text}</p>`}
    </div>
  </div>`
    }
  }

  return `<div ${attributes}>${items}</div>`
}

/**
 * @typedef {Object} contentConfig
 * @property {string} text - If `html` is set, this is not required. The text content of each section, which is hidden when the section is closed. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. The HTML content of each section, which is hidden when the section is closed. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} summaryConfig
 * @property {string} [text] - The summary line text content of each section. If `html` is provided, the `text` option will be ignored.
 * @property {string} [html] - The summary line HTML content of each section. The summary line is inside the HTML `<button>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} headingConfig
 * @property {string} text - If `html` is set, this is not required. The heading text of each section. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. The heading HTML content of each section. The header is inside the HTML `<button>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {headingConfig} heading - The heading of each accordion section.
 * @property {summaryConfig} [summary] - The summary line of each accordion section.
 * @property {contentConfig} content - The content of each accordion section.
 * @property {boolean} [expanded] - Sets whether the section should be expanded when the page loads for the first time. Defaults to `false`.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} accordionConfig
 * @property {string} id - Must be unique across the domain of your service if `rememberExpanded` is `true` (as the expanded state of individual instances of the component persists across page loads using [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)). Used as an `id` in the HTML for the accordion as a whole, and also as a prefix for the `id`s of the section contents and the buttons that open them, so that those `id`s can be the target of `aria-control` attributes.
 * @property {integer} [headingLevel] - Heading level, from `1` to `6`. Default is `2`.
 * @property {string} [classes] - Classes to add to the accordion.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the accordion.
 * @property {boolean} [rememberExpanded] - Whether the expanded/collapsed state of the accordion should be saved when a user leaves the page and restored when they return. Default is `true`.
 * @property {string} [hideAllSectionsText] - The text content of the 'Hide all sections' button at the top of the accordion when all sections are expanded.
 * @property {string} [hideSectionText] - The text content of the 'Hide' button within each section of the accordion, which is visible when the section is expanded.
 * @property {string} [hideSectionAriaLabelText] - Text made available to assistive technologies, like screen-readers, as the final part of the toggle's accessible name when the section is expanded. Defaults to `"Hide this section"`.
 * @property {string} [showAllSectionsText] - The text content of the 'Show all sections' button at the top of the accordion when at least one section is collapsed.
 * @property {string} [showSectionText] - The text content of the 'Show' button within each section of the accordion, which is visible when the section is collapsed.
 * @property {string} [showSectionAriaLabelText] - Text made available to assistive technologies, like screen-readers, as the final part of the toggle's accessible name when the section is collapsed. Defaults to `"Show this section"`.
 * @property {Array.<itemsConfig>} items - The sections within the accordion.
 */
