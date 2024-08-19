import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukTag from '../tag/tag.js'

/**
 * The task list component displays all the tasks a user needs to do, and allows users to easily identify which ones are done and which they still need to do.
 * @param {taskListConfig} params - Task list config options
 * @returns {string} Task list HTML
 * @see {@link https://design-system.service.gov.uk/components/task-list/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukTaskList({
 *   items: [
 *     {
 *       title: {
 *         text: 'Company Directors'
 *       },
 *       href: '#',
 *       status: {
 *         text: 'Completed'
 *       }
 *     },
 *     {
 *       title: {
 *         text: 'Registered company details'
 *       },
 *       href: '#',
 *       status: {
 *         tag: {
 *           text: 'Incomplete',
 *           classes: 'govuk-tag--blue'
 *         }
 *       }
 *     },
 *     {
 *       title: {
 *         text: 'Business plan'
 *       },
 *       href: '#',
 *       status: {
 *         tag: {
 *           text: 'Incomplete',
 *           classes: 'govuk-tag--blue'
 *         }
 *       }
 *     }
 *   ]
 * })
 * ```
 */
export default function govukTaskList(params) {
  const idPrefix = params.idPrefix ? html`${params.idPrefix}` : 'task-list'

  let items = ''
  let index = 0

  for (const item of params.items) {
    if (item) {
      index++
      const hintId = `${idPrefix}-${index}-hint`
      const statusId = `${idPrefix}-${index}-status`

      items += `<li class="govuk-task-list__item${item.href ? ' govuk-task-list__item--with-link' : ''}${item.classes ? html` ${item.classes}` : ''}">
        <div class="govuk-task-list__name-and-hint">
          ${item.href
          ? `<a class="govuk-link govuk-task-list__link${item.title?.classes ? html` ${item.title.classes}` : ''}" href="${html`${item.href}`}" aria-describedby="${item.hint ? `${hintId} ` : ''}${statusId}">
          ${item.title?.html ?? html` ${item.title?.text}`}
          </a>`
          : `<div${item.title?.classes ? html` class="${item.title.classes}"` : ''}>
            ${item.title?.html ?? html` ${item.title?.text}`}
          </div>`
        }
          ${item.hint
          ? `<div id="${hintId}" class="govuk-task-list__hint">
            ${item.hint?.html ?? html` ${item.hint?.text}`}
          </div>`
          : ''
        }
        </div>
        <div class="govuk-task-list__status${item.status?.classes ? html` ${item.status.classes}` : ''}" id="${statusId}">
          ${item.status?.tag ? govukTag(item.status.tag) : item.status?.html ?? html` ${item.status?.text}`}
        </div>
      </li>`
    }
  }

  return `<ul class="govuk-task-list${params.classes ? html` ${params.classes}` : ''}"${govukAttributes(params.attributes)}>
    ${items}
  </ul>`
}

/**
 * @typedef {import('../tag/tag.js').tagConfig} tagConfig
 */

/**
 * @typedef {Object} statusConfig
 * @property {tagConfig} [tag] - Can be used to add a tag to the status of the task within the task list component.
 * @property {string} [text] - Text to use for the status, as an alternative to using a tag. If `html` or `tag` is provided, the `text` argument will be ignored.
 * @property {string} [html] - HTML to use for the status, as an alternative to using a tag. If `html` or `tag` is provided, the `text` argument will be ignored.
 * @property {string} [classes] - Classes to add to the status container.
 */

/**
 * @typedef {Object} hintConfig
 * @property {string} text - Text to use within the hint. If `html` is provided, the `text` argument will be ignored.
 * @property {string} html - HTML to use within the hint. If `html` is provided, the `text` argument will be ignored.
 */

/**
 * @typedef {Object} titleConfig
 * @property {string} text - Text to use within the title. If `html` is provided, the `text` argument will be ignored.
 * @property {string} html - HTML to use within the title. If `html` is provided, the `text` argument will be ignored.
 * @property {string} [classes] - Classes to add to the title wrapper.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {titleConfig} title - The main title for the task within the task list component.
 * @property {hintConfig} [hint] - Can be used to add a hint to each task within the task list component.
 * @property {statusConfig} status - The status for each task within the task list component.
 * @property {string} [href] - The value of the link’s `href` attribute for the task list item.
 * @property {string} [classes] - Classes to add to the item `div`.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} taskListConfig
 * @property {Array.<itemsConfig>} items - The items for each task within the task list component.
 * @property {string} [classes] - Classes to add to the `ul` container for the task list.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the `ul` container for the task list.
 * @property {string} [idPrefix] - Optional prefix. This is used to prefix the `id` attribute for the task list item tag and hint, separated by `-`. Defaults to `"task-list"`.
 */
