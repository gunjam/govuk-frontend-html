import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukErrorMessage from '../error-message/error-message.js'
import govukFieldset from '../fieldset/fieldset.js'
import govukHint from '../hint/hint.js'
import govukLabel from '../label/label.js'

/**
 * Create a checkbox item with label and optional hint or conditional content
 * @param {checkboxesConfig} params - The govukCheckboxes() options
 * @param {itemsConfig} item - the checkbox item options
 * @param {string} idPrefix - prefix for checkbox ID
 * @param {number} index - the index of the checkbox item (starts at 1)
 * @return {string} start icon SVG
 */
function checkboxItem(params, item, idPrefix, hasFieldset, describedBy, index) {
  if (item.divider) {
    return html`<div class="govuk-checkboxes__divider">${item.divider}</div>`
  }

  // If the user explicitly sets an id, use this instead of the regular
  // idPrefix. The first id should not have a number suffix so it's easy to
  // link to from the error summary component.
  const itemId = item.id ?? `${idPrefix}${index > 1 ? `-${index}` : ''}`
  const itemName = item.name ?? params.name
  const conditionalId = html`conditional-${itemId}`

  const isChecked = item.checked ?? params.values?.includes(item.value)
  const hasHint = item.hint?.text || item.hint?.html
  const itemHintId = `${itemId}-item-hint`

  let itemDescribedBy = hasFieldset ? '' : describedBy

  if (hasHint) {
    itemDescribedBy = itemDescribedBy ? `${itemDescribedBy} ${itemHintId}` : itemHintId
  }

  const label = govukLabel({
    html: item.html,
    text: item.text,
    classes: `govuk-checkboxes__label${item.label?.classes ? ` ${item.label.classes}` : ''}`,
    attributes: item.label?.attributes,
    for: itemId
  })

  const hint = hasHint
    ? govukHint({
      id: itemHintId,
      classes: `govuk-checkboxes__hint${item.hint.classes ? ` ${item.hint.classes}` : ''}`,
      attributes: item.hint.attributes,
      html: item.hint.html,
      text: item.hint.text
    })
    : ''

  const conditionalHtml = item.conditional?.html
    ? html`<div class="govuk-checkboxes__conditional!${isChecked ? '' : ' govuk-checkboxes__conditional--hidden'}" id="!${conditionalId}">
    !${item.conditional.html}
  </div>`
    : ''

  return html`<div class="govuk-checkboxes__item">
    <input class="govuk-checkboxes__input" id="${itemId}" name="${itemName}" type="checkbox" value="${item.value}"
      !${isChecked ? ' checked' : ''}
      !${item.disabled ? ' disabled' : ''}
      !${item.conditional?.html ? html`data-aria-controls="!${conditionalId}"` : ''}
      !${attribute('data-behaviour', item.behaviour)}
      !${attribute('aria-describedby', itemDescribedBy)}
      !${govukAttributes(item.attributes)}>
      !${label}
      !${hint}
      !${conditionalHtml}
  </div>`
}

/**
 * Let users select one or more options by using the checkboxes component.
 * @param {checkboxesConfig} params - checkboxes config options
 * @returns {string} checkboxes HTML
 * @see {@link https://design-system.service.gov.uk/components/checkboxes/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukcheckboxes({
 *   name: "waste",
 *   fieldset: {
 *     legend: {
 *       text: "Which types of waste do you transport?",
 *       isPageHeading: true,
 *       classes: "govuk-fieldset__legend--l"
 *     }
 *   },
 *   hint: {
 *     text: "Select all that apply."
 *   },
 *   items: [
 *     {
 *       value: "carcasses",
 *       text: "Waste from animal carcasses"
 *     },
 *     {
 *       value: "mines",
 *       text: "Waste from mines or quarries"
 *     },
 *     {
 *       value: "farm",
 *       text: "Farm or agricultural waste"
 *     }
 *   ]
 * })
 * ```
 */
export default function govukcheckboxes(params) {
  // If an id 'prefix' is not passed, fall back to using the name attribute
  // instead. We need this for error messages and hints as well
  const idPrefix = params.idPrefix ?? params.name

  // a record of other elements that we need to associate with the input using
  // aria-describedby – for example hints or error messages
  let describedBy = params.fieldset?.describedBy ?? params.describedBy

  // fieldset is false by default
  const hasFieldset = typeof params.fieldset === 'object'

  // Capture the HTML so we can optionally nest it in a fieldset
  let innerHtml = ''

  if (params.hint) {
    const hintId = `${idPrefix}-hint`
    describedBy = describedBy ? `${describedBy} ${hintId}` : hintId

    innerHtml += govukHint({
      id: hintId,
      classes: params.hint.classes,
      attributes: params.hint.attributes,
      html: params.hint.html,
      text: params.hint.text
    })
  }

  if (params.errorMessage) {
    const errorId = `${idPrefix}-error`
    describedBy = describedBy ? `${describedBy} ${errorId}` : errorId

    innerHtml += govukErrorMessage({
      id: errorId,
      classes: params.errorMessage.classes,
      attributes: params.errorMessage.attributes,
      html: params.errorMessage.html,
      text: params.errorMessage.text,
      visuallyHiddenText: params.errorMessage.visuallyHiddenText
    })
  }

  innerHtml += html`<div class="govuk-checkboxes ${params.classes}"!${govukAttributes(params.attributes)} data-module="govuk-checkboxes">`

  if (params.formGroup?.beforeInputs) {
    innerHtml += params.formGroup.beforeInputs.html ?? html`${params.formGroup.beforeInputs.text}`
  }

  let index = 1
  for (const item of params.items) {
    if (item) {
      innerHtml += checkboxItem(params, item, idPrefix, hasFieldset, describedBy, index++)
    }
  }

  if (params.formGroup?.afterInputs) {
    innerHtml += params.formGroup.afterInputs.html ?? html`${params.formGroup.afterInputs.text}`
  }

  // Wrap in a fieldset if set
  if (hasFieldset) {
    innerHtml = govukFieldset({
      describedBy: describedBy,
      classes: params.fieldset.classes,
      attributes: params.fieldset.attributes,
      legend: params.fieldset.legend,
      html: innerHtml
    })
  }

  return html`<div class="govuk-form-group!${params.errorMessage ? ' govuk-form-group--error' : ''} ${params.formGroup?.classes}"
    !${govukAttributes(params.formGroup?.attributes)}>
    !${innerHtml}
  </div>`
}

/**
 * @typedef {import('../error-message/error-message.js').errorMessageConfig} errorMessageConfig
 */

/**
 * @typedef {import('../fieldset/fieldset.js').fieldsetConfig} fieldsetConfig
 */

/**
 * @typedef {import('../hint/hint.js').hintConfig} hintConfig
 */

/**
 * @typedef {Object} conditionalConfig
 * @property {string} html - The HTML to reveal when the checkbox is checked.
 */

/**
 * @typedef {Object} labelConfig
 * @property {string} [classes] - Classes to add to the label tag.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the label tag.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within each checkbox item label. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within each checkbox item label. If `html` is provided, the `text` option will be ignored.
 * @property {string} [id] - Specific ID attribute for the checkbox item. If omitted, then component global `idPrefix` option will be applied.
 * @property {string} [name] - Specific name for the checkbox item. If omitted, then component global `name` string will be applied.
 * @property {string} value - Value for the checkbox input.
 * @property {labelConfig} [label] - Subset of options for the label used by each checkbox item within the checkboxes component.
 * @property {hintConfig} [hint] - Can be used to add a hint to each checkbox item within the checkboxes component.
 * @property {string} [divider] - Divider text to separate checkbox items, for example the text `"or"`.
 * @property {boolean} [checked] - Whether the checkbox should be checked when the page loads. Takes precedence over the top-level `values` option.
 * @property {conditionalConfig} [conditional] - Provide additional content to reveal when the checkbox is checked.
 * @property {string} [behaviour] - If set to `"exclusive"`, implements a 'None of these' type behaviour via JavaScript when checkboxes are clicked.
 * @property {boolean} [disabled] - If `true`, checkbox will be disabled.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the checkbox input tag.
 */

/**
 * @typedef {Object} afterInputsConfig
 * @property {string} text - Text to add after all checkbox items. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add after all checkbox items. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} beforeInputsConfig
 * @property {string} text - Text to add before all checkbox items. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add before all checkbox items. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} formGroupConfig
 * @property {string} [classes] - Classes to add to the form group (for example to show error state for the whole group).
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the form group.
 * @property {beforeInputsConfig} [beforeInputs] - Content to add before all checkbox items within the checkboxes component.
 * @property {afterInputsConfig} [afterInputs] - Content to add after all checkbox items within the checkboxes component.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} checkboxesConfig
 * @property {string} [describedBy] - One or more element IDs to add to the input `aria-describedby` attribute without a fieldset, used to provide additional descriptive information for screenreader users.
 * @property {fieldsetConfig} [fieldset] - Can be used to add a fieldset to the checkboxes component.
 * @property {hintConfig} [hint] - Can be used to add a hint to the checkboxes component.
 * @property {errorConfig} [errorMessage] - Can be used to add an error message to the checkboxes component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.
 * @property {formGroupConfig} [formGroup] - Additional options for the form group containing the checkboxes component.
 * @property {string} [idPrefix] - Optional prefix. This is used to prefix the `id` attribute for each checkbox item input, hint and error message, separated by `-`. Defaults to the `name` option value.
 * @property {string} name - Name attribute for all checkbox items.
 * @property {Array.<itemsConfig>} items - The checkbox items within the checkboxes component.
 * @property {array} [values] - Array of values for checkboxes which should be checked when the page loads. Use this as an alternative to setting the `checked` option on each individual item.
 * @property {string} [classes] - Classes to add to the checkboxes container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the anchor tag.
 */
