import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Use a summary list to summarise information, for example, a user’s responses at the end of a form.
 * @param {summaryListConfig} params - Summary list config options
 * @returns {string} Summary list HTML
 * @see {@link https://design-system.service.gov.uk/components/summary-list/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukSummaryList({
 *   rows: [
 *     {
 *       key: {
 *         text: 'Name'
 *       },
 *       value: {
 *         text: 'Firstname Lastname'
 *       }
 *     },
 *     {
 *       key: {
 *         text: 'Date of birth'
 *       },
 *       value: {
 *         text: '13/08/1980'
 *       }
 *     },
 *     {
 *       key: {
 *         text: 'Contact information'
 *       },
 *       value: {
 *         html: '<p class=\'govuk-body\'>\n  email@email.com\n</p>\n<p class=\'govuk-body\'>\n  Address line 1<br>\n  Address line 2<br>\n  Address line 3<br>\n  Address line 4<br>\n  Address line 5\n</p>\n'
 *       }
 *     }
 *   ]
 * })
 * ```
 */
export default function govukSummaryList(params) {
  function actionLink(action, cardTitle) {
    const actionText = action.html ?? html`${action.text}`

    let hiddenText = ''

    if (action.visuallyHiddenText || cardTitle) {
      hiddenText += '<span class="govuk-visually-hidden">'
      hiddenText += action.visuallyHiddenText ? html`${action.visuallyHiddenText} ` : ''
      hiddenText += cardTitle ? `(${cardTitle.html ?? html`${cardTitle.text}`})` : ''
      hiddenText += '</span>'
    }

    return html`<a class="govuk-link ${action.classes}" href="${action.href}"!${govukAttributes(action.attributes)}>
      !${actionText} !${hiddenText}
    </a>`
  }

  function summaryCard(params, summaryList) {
    const headingLevel = params.title?.headingLevel ? html`${params.title?.headingLevel}` : '2'

    const title = params.title
      ? html`<h!${headingLevel} class="govuk-summary-card__title ${params.title.classes}">
        !${params.title.html ?? html`${params.title.text}`}
      </h!${headingLevel}>`
      : ''

    let actions = ''

    if (params.actions?.items?.length > 0) {
      if (params.actions.items.length === 1) {
        actions += html`<div class="govuk-summary-card__actions ${params.actions.classes}">
          !${actionLink(params.actions.items[0], params.title)}
        </div>`
      } else {
        actions += html`<ul class="govuk-summary-card__actions ${params.actions.classes}">`

        for (const action of params.actions.items) {
          actions += `<li class="govuk-summary-card__action">
            ${actionLink(action, params.title)}
          </li>`
        }
        actions += '</ul>'
      }
    }

    return html`<div class="govuk-summary-card ${params.classes}"!${govukAttributes(params.attributes)}>
      <div class="govuk-summary-card__title-wrapper">
        !${title}
        !${actions}
      </div>
      <div class="govuk-summary-card__content">
        !${summaryList}
      </div>
    </div>`
  }

  // Determine if we need 2 or 3 columns
  let anyRowHasActions = false
  for (const row of params.rows) {
    anyRowHasActions = row?.actions?.items?.length > 0 || anyRowHasActions
  }

  let summaryList = html`<dl class="govuk-summary-list ${params.classes}"!${govukAttributes(params.attributes)}>`

  for (const row of params.rows) {
    if (row) {
      // If this row has no actions but other rows do, add class
      const noActions = anyRowHasActions && !row.actions?.items?.length ? ' govuk-summary-list__row--no-actions' : ''
      summaryList += html`<div class="govuk-summary-list__row!${noActions} ${row.classes}">
        <dt class="govuk-summary-list__key ${row.key.classes}">
          !${row.key?.html ?? html`${row.key?.text}`}
        </dt>
        <dd class="govuk-summary-list__value ${row.value.classes}">
          !${row.value?.html ?? html`${row.value?.text}`}
        </dd>`

      if (row.actions?.items?.length) {
        summaryList += html`<dd class="govuk-summary-list__actions ${row.actions.classes}">`

        if (row.actions.items.length === 1) {
          summaryList += actionLink(row.actions.items[0], params.card?.title)
        } else {
          summaryList += '<ul class="govuk-summary-list__actions-list">'

          for (const action of row.actions.items) {
            summaryList += `<li class="govuk-summary-list__actions-list-item">
              ${actionLink(action, params.card?.title)}
            </li>`
          }
          summaryList += '</ul>'
        }
        summaryList += '</dd>'
      }
      summaryList += '</div>'
    }
  }
  summaryList += '</dl>'

  if (params.card) {
    return summaryCard(params.card, summaryList)
  }
  return summaryList
}

/**
 * @typedef {Object} itemsConfig
 * @property {string} href - The value of the link's `href` attribute for an action item.
 * @property {string} text - If `html` is set, this is not required. Text to use within each action item. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within each action item. If `html` is provided, the `text` option will be ignored.
 * @property {string} [visuallyHiddenText] - Actions rely on context from the surrounding content so may require additional accessible text. Text supplied to this option is appended to the end. Use `html` for more complicated scenarios.
 * @property {string} [classes] - Classes to add to the action item.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the action item.
 */

/**
 * @typedef {Object} actionsConfig
 * @property {Array.<itemsConfig>} [items] - The action link items shown in the header within the summary card wrapped around the summary list component.
 * @property {string} [classes] - Classes to add to the actions wrapper.
 */

/**
 * @typedef {Object} titleConfig
 * @property {string} [text] - Text to use within each title. If `html` is provided, the `text` option will be ignored.
 * @property {string} [html] - Text to use within each title. If `html` is provided, the `text` option will be ignored.
 * @property {integer} [headingLevel] - Heading level, from `1` to `6`. Default is `2`.
 * @property {string} [classes] - Classes to add to the title wrapper.
 */

/**
 * @typedef {Object} cardConfig
 * @property {titleConfig} [title] - Data for the summary card header.
 * @property {actionsConfig} [actions] - The action link content shown in the header of each summary card wrapped around the summary list component.
 * @property {string} [classes] - Classes to add to the container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the container.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {string} href - The value of the link's `href` attribute for an action item.
 * @property {string} text - If `html` is set, this is not required. Text to use within each action item. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within each action item. If `html` is provided, the `text` option will be ignored.
 * @property {string} [visuallyHiddenText] - Actions rely on context from the surrounding content so may require additional accessible text. Text supplied to this option is appended to the end. Use `html` for more complicated scenarios.
 * @property {string} [classes] - Classes to add to the action item.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the action item.
 */

/**
 * @typedef {Object} actionsConfig
 * @property {Array.<itemsConfig>} [items] - The action link items within the row item of the summary list component.
 * @property {string} [classes] - Classes to add to the actions wrapper.
 */

/**
 * @typedef {Object} valueConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within each value. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within each value. If `html` is provided, the `text` option will be ignored.
 * @property {string} [classes] - Classes to add to the value wrapper.
 */

/**
 * @typedef {Object} keyConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within each key. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within each key. If `html` is provided, the `text` option will be ignored.
 * @property {string} [classes] - Classes to add to the key wrapper.
 */

/**
 * @typedef {Object} rowsConfig
 * @property {string} [classes] - Classes to add to the row `div`.
 * @property {keyConfig} key - The reference content (key) for each row item in the summary list component.
 * @property {valueConfig} value - The value for each row item in the summary list component.
 * @property {actionsConfig} [actions] - The action link content for each row item in the summary list component.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} summaryListConfig
 * @property {Array.<rowsConfig>} rows - The rows within the summary list component.
 * @property {cardConfig} [card] - Can be used to wrap a summary card around the summary list component. If any of these options are present, a summary card will wrap around the summary list.
 * @property {string} [classes] - Classes to add to the container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the container.
 */
