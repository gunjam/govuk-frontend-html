import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * The tabs component lets users navigate between related sections of content, displaying one section at a time.
 * @param {tabsConfig} params - Tabs config options
 * @returns {string} Tabs HTML
 * @see {@link https://design-system.service.gov.uk/components/tabs/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukTabs({
 *   items: [
 *     {
 *       label: 'Past day',
 *       id: 'past-day',
 *       panel: {
 *         html: '<h2 class="govuk-heading-l">Past day</h2>'
 *       }
 *     },
 *     {
 *       label: 'Past week',
 *       id: 'past-week',
 *       panel: {
 *         html: '<h2 class="govuk-heading-l">Past week</h2>'
 *       }
 *     },
 *     {
 *       label: 'Past month',
 *       id: 'past-month',
 *       panel: {
 *         html: '<h2 class="govuk-heading-l">Past month</h2>'
 *       }
 *     },
 *     {
 *       label: 'Past year',
 *       id: 'past-year',
 *       panel: {
 *         text: 'There is no data for this year yet, check back later'
 *       }
 *     }
 *   ]
 * })
 * ```
 */
export default function govukTabs(params) {
  let tabs = ''
  let panels = ''

  if (params.items?.length > 0) {
    const idPrefix = params.idPrefix ? html`${params.idPrefix}` : ''
    tabs += '<ul class="govuk-tabs__list">'

    let index = 0
    for (const item of params.items) {
      if (item) {
        index++
        const tabPanelId = item.id ?? `${idPrefix}-${index}`

        tabs += html`<li class="govuk-tabs__list-item!${index === 1 ? ' govuk-tabs__list-item--selected' : ''}">
          <a class="govuk-tabs__tab" href="#!${tabPanelId}"
            !${govukAttributes(item.attributes)}>
            ${item.label}
          </a>
        </li>`

        panels += `<div class="govuk-tabs__panel${index > 1 ? ' govuk-tabs__panel--hidden' : ''}" id="${tabPanelId}"${govukAttributes(item.panel.attributes)}>
        ${item.panel?.html ?? (item.panel?.text ? html`<p class="govuk-body">${item.panel.text}</p>` : '')}
      </div>`
      }
    }
    tabs += '</ul>'
  }

  return html`<div!${attribute('id', params.id)} class="govuk-tabs ${params.classes}"!${govukAttributes(params.attributes)} data-module="govuk-tabs">
  <h2 class="govuk-tabs__title">
    !${params.title ? html`${params.title}` : 'Contents'}
  </h2>
  !${tabs}
  !${panels}
</div>`
}

/**
 * @typedef {Object} panelConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within each tab panel. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within each tab panel. If `html` is provided, the `text` option will be ignored.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the tab panel.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {string} id - Specific ID attribute for the tab item. If omitted, then `idPrefix` string is required instead.
 * @property {string} label - The text label of a tab item.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the tab.
 * @property {panelConfig} panel - The contents of each tab within the tabs component. This is referenced as a panel.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} tabsConfig
 * @property {string} [id] - This is used for the main component and to compose the ID attribute for each item.
 * @property {string} [idPrefix] - Optional prefix. This is used to prefix the `id` attribute for each tab item and panel, separated by `-`.
 * @property {string} [title] - Title for the tabs table of contents.
 * @property {Array.<itemsConfig>} items - The individual tabs within the tabs component.
 * @property {string} [classes] - Classes to add to the tabs component.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the tabs component.
 */
