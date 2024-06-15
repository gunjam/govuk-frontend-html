import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Use the table component to make information easier to compare and scan for users.
 * @param {tableConfig} params - Table config options
 * @returns {string} Table HTML
 * @see {@link https://design-system.service.gov.uk/components/table/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukTable({
 *   rows: [
 *     [
 *       {
 *         text: 'January'
 *       },
 *       {
 *         text: '£85',
 *         format: 'numeric'
 *       },
 *       {
 *         text: '£95',
 *         format: 'numeric'
 *       }
 *     ],
 *     [
 *       {
 *         text: 'February'
 *       },
 *       {
 *         text: '£75',
 *         format: 'numeric'
 *       },
 *       {
 *         text: '£55',
 *         format: 'numeric'
 *       }
 *     ],
 *     [
 *       {
 *         text: 'March'
 *       },
 *       {
 *         text: '£165',
 *         format: 'numeric'
 *       },
 *       {
 *         text: '£125',
 *         format: 'numeric'
 *       }
 *     ]
 *   ]
 * })
 * ```
 */
export default function govukTable(params) {
  let caption = ''
  if (params.caption) {
    const classes = params.captionClasses ? html` ${params.captionClasses}` : ''
    caption = html`<caption class="govuk-table__caption!${classes}">${params.caption}</caption>`
  }

  let head = ''
  if (params.head) {
    head += '<thead class="govuk-table__head">'
    head += '<tr class="govuk-table__row">'

    for (const item of params.head) {
      let classes = 'govuk-table__header'
      if (item.format) {
        classes += html` govuk-table__header--${item.format}`
      }
      if (item.classes) {
        classes += html` ${item.classes}`
      }
      const attributes = `${attribute('colspan', item.colspan)}${attribute('rowspan', item.rowspan)}${govukAttributes(item.attributes)}`
      head += `<th scope="col" class="${classes}"${attributes}>${item.html ?? html`${item.text}`}</th>`
    }

    head += '</tr>'
    head += '</thead>'
  }

  let body = '<tbody class="govuk-table__body">'
  for (const row of params.rows) {
    if (row) {
      let firstCell = true
      body += '<tr class="govuk-table__row">'
      for (const cell of row) {
        const classes = cell.classes ? html` ${cell.classes}` : ''
        const attributes = `${attribute('colspan', cell.colspan)}${attribute('rowspan', cell.rowspan)}${govukAttributes(cell.attributes)}`
        const content = cell.html ?? html`${cell.text}`

        if (firstCell && params.firstCellIsHeader) {
          body += `<th scope="row" class="govuk-table__header${classes}"${attributes}>${content}</th>`
        } else {
          const formatClass = cell.format ? html` govuk-table__cell--${cell.format}` : ''
          body += `<td class="govuk-table__cell${formatClass}${classes}"${attributes}>${content}</td>`
        }

        firstCell = false
      }
      body += '</tr>'
    }
  }
  body += '</tbody>'

  return `<table class="govuk-table${params.classes ? html` ${params.classes}` : ''}"${govukAttributes(params.attributes)}>
  ${caption}
  ${head}
  ${body}
  </table>`
}

/**
 * @typedef {Object} headConfig
 * @property {string} [text] - If `html` is set, this is not required. Text for table head cells. If `html` is provided, the `text` option will be ignored.
 * @property {string} [html] - If `text` is set, this is not required. HTML for table head cells. If `html` is provided, the `text` option will be ignored.
 * @property {'numeric'} [format] - Specify format of a cell. Currently we only use "numeric".
 * @property {string} [classes] - Classes to add to the table head cell.
 * @property {integer} [colspan] - Specify how many columns a cell extends.
 * @property {integer} [rowspan] - Specify how many rows a cell extends.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the table cell.
 */

/**
 * @typedef {Object} rowsConfig
 * @property {string} text - If `html` is set, this is not required. Text for cells in table rows. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML for cells in table rows. If `html` is provided, the `text` option will be ignored.
 * @property {'numeric'} [format] - Specify format of a cell. Currently we only use "numeric".
 * @property {string} [classes] - Classes to add to the table row cell.
 * @property {integer} [colspan] - Specify how many columns a cell extends.
 * @property {integer} [rowspan] - Specify how many rows a cell extends.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the table cell.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} tableConfig
 * @property {Array.<Array.<rowsConfig>>} rows - The rows within the table component.
 * @property {Array.<headConfig>} [head] - Can be used to add a row of table header cells (`<th>`) at the top of the table component.
 * @property {string} [caption] - Caption text.
 * @property {string} [captionClasses] - Classes for caption text size. Classes should correspond to the available typography heading classes.
 * @property {boolean} [firstCellIsHeader] - If set to `true`, the first cell in each row will be a table header (`<th>`).
 * @property {string} [classes] - Classes to add to the table container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the table container.
 */
