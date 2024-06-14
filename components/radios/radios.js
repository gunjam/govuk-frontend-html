import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukErrorMessage from '../error-message/error-message.js'
import govukFieldset from '../fieldset/fieldset.js'
import govukHint from '../hint/hint.js'
import govukLabel from '../label/label.js'

/**
 * Create a radio item with label and optional hint or conditional content
 * @param {radiosConfig} params - The govukRadio() options
 * @param {itemsConfig} item - the radio item options
 * @param {string} idPrefix - prefix for radio ID
 * @param {number} index - the index of the radio item (starts at 1)
 * @return {string} radio item HTML
 */
function radioItem(params, item, idPrefix, index) {
  if (item.divider) {
    return html`<div class="govuk-radios__divider">${item.divider}</div>`
  }

  // If the user explicitly sets an id, use this instead of the regular
  // idPrefix. The first id should not have a number suffix so it's easy to
  // link to from the error summary component.
  const itemId = item.id ?? `${idPrefix}${index > 1 ? `-${index}` : ''}`
  const conditionalId = html`conditional-${itemId}`

  const isChecked = item.checked ?? (item.value === params.value)
  const hasHint = item.hint?.text || item.hint?.html
  const itemHintId = `${itemId}-item-hint`

  const label = govukLabel({
    html: item.html,
    text: item.text,
    classes: `govuk-radios__label${item.label?.classes ? ` ${item.label.classes}` : ''}`,
    attributes: item.label?.attributes,
    for: itemId
  })

  const hint = hasHint
    ? govukHint({
      id: itemHintId,
      classes: `govuk-radios__hint${item.hint.classes ? ` ${item.hint.classes}` : ''}`,
      attributes: item.hint.attributes,
      html: item.hint.html,
      text: item.hint.text
    })
    : ''

  const conditionalHtml = item.conditional?.html
    ? html`<div class="govuk-radios__conditional!${isChecked ? '' : ' govuk-radios__conditional--hidden'}" id="!${conditionalId}">
    !${item.conditional.html}
  </div>`
    : ''

  return html`<div class="govuk-radios__item">
    <input class="govuk-radios__input" id="${itemId}" name="${params.name}" type="radio" value="${item.value}"
      !${isChecked ? ' checked' : ''}
      !${item.disabled ? ' disabled' : ''}
      !${item.conditional?.html ? html`data-aria-controls="!${conditionalId}"` : ''}
      !${hasHint ? html`aria-describedby="${itemHintId}"` : ''}
      !${govukAttributes(item.attributes)}>
      !${label}
      !${hint}
      !${conditionalHtml}
  </div>`
}

/**
 * Use the radios component when users can only select one option from a list.
 * @param {radiosConfig} params - Radios config options
 * @returns {string} Radios HTML
 * @see {@link https://design-system.service.gov.uk/components/radios/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukRadios({
 *   name: 'whereDoYouLive',
 *   fieldset: {
 *     legend: {
 *       text: 'Where do you live?',
 *       isPageHeading: true,
 *       classes: 'govuk-fieldset__legend--l'
 *     }
 *   },
 *   items: [
 *     {
 *       value: 'england',
 *       text: 'England'
 *     },
 *     {
 *       value: 'scotland',
 *       text: 'Scotland'
 *     },
 *     {
 *       value: 'wales',
 *       text: 'Wales'
 *     },
 *     {
 *       value: 'northern-ireland',
 *       text: 'Northern Ireland'
 *     }
 *   ]
 * })
 * ```
 */
export default function govukRadios(params) {
  // If an id 'prefix' is not passed, fall back to using the name attribute
  // instead. We need this for error messages and hints as well
  const idPrefix = params.idPrefix ?? params.name

  // a record of other elements that we need to associate with the input using
  // aria-describedby – for example hints or error messages
  let describedBy = params.fieldset?.describedBy

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

  innerHtml += html`<div class="govuk-radios ${params.classes}"!${govukAttributes(params.attributes)} data-module="govuk-radios">`

  if (params.formGroup?.beforeInputs) {
    innerHtml += params.formGroup.beforeInputs.html ?? html`${params.formGroup.beforeInputs.text}`
  }

  let index = 1
  for (const item of params.items) {
    if (item) {
      innerHtml += radioItem(params, item, idPrefix, index++)
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
 * @property {string} html - The HTML to reveal when the radio is checked.
 */

/**
 * @typedef {Object} labelConfig
 * @property {string} [classes] - Classes to add to the label tag.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the label tag.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within each radio item label. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within each radio item label. If `html` is provided, the `text` option will be ignored.
 * @property {string} [id] - Specific ID attribute for the radio item. If omitted, then `idPrefix` string will be applied.
 * @property {string} value - Value for the radio input.
 * @property {labelConfig} [label] - Subset of options for the label used by each radio item within the radios component.
 * @property {hintConfig} [hint] - Can be used to add a hint to each radio item within the radios component.
 * @property {string} [divider] - Divider text to separate radio items, for example the text `"or"`.
 * @property {boolean} [checked] - Whether the radio should be checked when the page loads. Takes precedence over the top-level `value` option.
 * @property {conditionalConfig} [conditional] - Provide additional content to reveal when the radio is checked.
 * @property {boolean} [disabled] - If `true`, radio will be disabled.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the radio input tag.
 */

/**
 * @typedef {Object} afterInputsConfig
 * @property {string} text - Text to add after all radio items. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add after all radio items. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} beforeInputsConfig
 * @property {string} text - Text to add before all radio items. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add before all radio items. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} formGroupConfig
 * @property {string} [classes] - Classes to add to the form group (for example to show error state for the whole group).
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the form group.
 * @property {beforeInputsConfig} [beforeInputs] - Content to add before all radio items within the checkboxes component.
 * @property {afterInputsConfig} [afterInputs] - Content to add after all radio items within the checkboxes component.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} radiosConfig
 * @property {fieldsetConfig} [fieldset] - The fieldset used by the radios component.
 * @property {hintConfig} [hint] - Can be used to add a hint to the radios component.
 * @property {errorMessageConfig} [errorMessage] - Can be used to add an error message to the radios component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.
 * @property {formGroupConfig} [formGroup] - Additional options for the form group containing the radios component.
 * @property {string} [idPrefix] - Optional prefix. This is used to prefix the `id` attribute for each radio input, hint and error message, separated by `-`. Defaults to the `name` option value.
 * @property {string} name - Name attribute for the radio items.
 * @property {Array.<itemsConfig>} items - The radio items within the radios component.
 * @property {string} [value] - The value for the radio which should be checked when the page loads. Use this as an alternative to setting the `checked` option on each individual item.
 * @property {string} [classes] - Classes to add to the radio container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the radio input tag.
 */
