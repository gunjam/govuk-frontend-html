import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukErrorMessage from '../error-message/error-message.js'
import govukHint from '../hint/hint.js'
import govukLabel from '../label/label.js'

/**
 * The select component should only be used as a last resort in public-facing services because research shows that some users find selects very difficult to use.
 * @param {selectConfig} params - Select config options
 * @returns {string} Select HTML
 * @see {@link https://design-system.service.gov.uk/components/select/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukSelect({
 *   id: "sort",
 *   name: "sort",
 *   label: {
 *     text: "Sort by"
 *   },
 *   items: [
 *     {
 *       value: "published",
 *       text: "Recently published"
 *     },
 *     {
 *       value: "updated",
 *       text: "Recently updated",
 *       selected: true
 *     },
 *     {
 *       value: "views",
 *       text: "Most views"
 *     },
 *     {
 *       value: "comments",
 *       text: "Most comments"
 *     }
 *   ]
 * })
 * ```
 */
export default function govukSelect(params) {
  // Add custom class names
  let classNames = 'govuk-select'
  if (params.classes) {
    classNames += html` ${params.classes}`
  }

  // custom formgroup classes
  let formGroupClassNames = 'govuk-form-group'
  if (params.formGroup?.classes) {
    formGroupClassNames += html` ${params.formGroup.classes}`
  }

  // a record of other elements that we need to associate with the input using
  // aria-describedby – for example hints or error messages
  let describedBy = params.describedBy

  const label = params.label ? govukLabel({
    html: params.label.html,
    text: params.label.text,
    classes: params.label.classes,
    isPageHeading: params.label.isPageHeading,
    attributes: params.label.attributes,
    for: params.id
  }) : ''

  let hint = ''
  if (params.hint) {
    const hintId = `${params.id}-hint`
    describedBy = describedBy ? `${describedBy} ${hintId}` : hintId

    hint += govukHint({
      id: hintId,
      classes: params.hint.classes,
      attributes: params.hint.attributes,
      html: params.hint.html,
      text: params.hint.text
    })
  }

  let errorMessage = ''
  if (params.errorMessage) {
    const errorId = `${params.id}-error`
    classNames += ' govuk-select--error'
    formGroupClassNames += ' govuk-form-group--error'
    describedBy = describedBy ? `${describedBy} ${errorId}` : errorId

    errorMessage += govukErrorMessage({
      id: errorId,
      classes: params.errorMessage.classes,
      attributes: params.errorMessage.attributes,
      html: params.errorMessage.html,
      text: params.errorMessage.text,
      visuallyHiddenText: params.errorMessage.visuallyHiddenText
    })
  }

  let beforeInput = ''
  if (params.formGroup?.beforeInput) {
    beforeInput += params.formGroup.beforeInput.html ?? html`${params.formGroup.beforeInput.text}`
  }

  let afterInput = ''
  if (params.formGroup?.afterInput) {
    afterInput += params.formGroup.afterInput.html ?? html`${params.formGroup.afterInput.text}`
  }

  let options = ''
  if (params.items) {
    for (const item of params.items) {
      if (item) {
        // Allow selecting by text content (the value for an option when no value
        // attribute is specified).
        const effectiveValue = item.value ?? item.text
        const selected = item.selected ?? (params.value !== undefined && params.value === effectiveValue)
        options += `<option${attribute('value', item.value)}${selected ? ' selected' : ''}${item.disabled ? ' disabled' : ''}${govukAttributes(item.attributes)}>`
        options += html`${item.text}`
        options += '</option>'
      }
    }
  }

  return html`<div class="!${formGroupClassNames}"!${govukAttributes(params.formGroup?.attributes)}>
  !${label}
  !${hint}
  !${errorMessage}
  !${beforeInput}
  <select class="!${classNames}" id="${params.id}" name="${params.name}"!${params.disabled ? ' disabled' : ''}!${attribute('aria-describedby', describedBy)}!${govukAttributes(params.attributes)}>
    !${options}
  </select>
  !${afterInput}
</div>`
}

/**
 * @typedef {import('../label/label.js').labelConfig} labelConfig
 */

/**
 * @typedef {import('../hint/hint.js').hintConfig} hintConfig
 */

/**
 * @typedef {import('../error-message/error-message.js').errorMessageConfig} errorMessageConfig
 */

/**
 * @typedef {Object} afterInputConfig
 * @property {string} text - Text to add after the select. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add after the select. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} beforeInputConfig
 * @property {string} text - Text to add before the select. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add before the select. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} formGroupConfig
 * @property {string} [classes] - Classes to add to the form group (for example to show error state for the whole group).
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the form group.
 * @property {beforeInputConfig} [beforeInput] - Content to add before the select used by the select component.
 * @property {afterInputConfig} [afterInput] - Content to add after the select used by the select component.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {string} [value] - Value for the option. If this is omitted, the value is taken from the text content of the option element.
 * @property {string} text - Text for the option item.
 * @property {boolean} [selected] - Whether the option should be selected when the page loads. Takes precedence over the top-level `value` option.
 * @property {boolean} [disabled] - Sets the option item as disabled.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the option.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} selectConfig
 * @property {string} id - ID for each select box.
 * @property {string} name - Name property for the select.
 * @property {Array.<itemsConfig>} items - The items within the select component.
 * @property {string} [value] - Value for the option which should be selected. Use this as an alternative to setting the `selected` option on each individual item.
 * @property {boolean} [disabled] - If `true`, select box will be disabled. Use the `disabled` option on each individual item to only disable certain options.
 * @property {string} [describedBy] - One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
 * @property {labelConfig} label - The label used by the select component.
 * @property {hintConfig} [hint] - Can be used to add a hint to the select component.
 * @property {errorMessageConfig} [errorMessage] - Can be used to add an error message to the select component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.
 * @property {formGroupConfig} [formGroup] - Additional options for the form group containing the select component.
 * @property {string} [classes] - Classes to add to the select.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the select.
 */
