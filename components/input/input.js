import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukErrorMessage from '../error-message/error-message.js'
import govukHint from '../hint/hint.js'
import govukLabel from '../label/label.js'

/**
 * Get HTML for input prefix/suffix
 * @param {prefixConfig | suffixConfig} affix - param options for affix
 * @param {'prefix' | 'suffix'} type - type of affix
 */
function affixItem(affix, type) {
  return html`<div class="govuk-input__!${type} ${affix.classes}" aria-hidden="true"!${govukAttributes(affix.attributes)}>!${affix.html ?? html`${affix.text}`}</div>`
}

/**
 * Use the text input component when you need to let users enter text that’s no longer than a single line, such as their name or phone number.
 * @param {inputConfig} params - Input config options
 * @returns {string} Input HTML
 * @see {@link https://design-system.service.gov.uk/components/text-input/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukInput({
 *   label: {
 *     text: 'National Insurance number'
 *   },
 *   id: 'input-example',
 *   name: 'test-name'
 * })
 * ```
 */
export default function govukInput(params) {
  const inputId = html`${params.id}`

  // Set classes for this component
  let classNames = 'govuk-input'
  let formGroupClassNames = 'govuk-form-group'
  let errorMessage = ''
  let hint = ''

  // Set up custom classes
  if (params.classes) {
    classNames += html` ${params.classes}`
  }
  if (params.formGroup?.classes) {
    formGroupClassNames += html` ${params.formGroup.classes}`
  }

  // a record of other elements that we need to associate with the input using
  // aria-describedby – for example hints or error messages
  let describedBy = params.describedBy ? html`${params.describedBy}` : ''

  // Optional hint element
  if (params.hint) {
    const hintId = `${inputId}-hint`
    describedBy += ` ${hintId}`
    hint = govukHint({ id: hintId, ...params.hint })
  }

  // Optional error message
  if (params.errorMessage) {
    const errorId = `${inputId}-error`

    // Update classes to include error class
    classNames += ' govuk-input--error'
    formGroupClassNames += ' govuk-form-group--error'
    describedBy += ` ${errorId}`
    errorMessage = govukErrorMessage({ id: errorId, ...params.errorMessage })
  }

  // Build <input> element setting all necessary attributes
  let inputElement = `<input class="${classNames}"`
  inputElement += ` id="${inputId}"`
  inputElement += attribute('name', params.name)
  inputElement += attribute('type', params.type ?? 'text')
  inputElement += attribute('spellcheck', typeof params.spellcheck === 'boolean' ? params.spellcheck : undefined)
  inputElement += attribute('value', params.value)
  inputElement += params.disabled === true ? ' disabled' : ''
  inputElement += attribute('aria-describedby', describedBy || undefined)
  inputElement += attribute('autocomplete', params.autocomplete)
  inputElement += attribute('autocapitalize', params.autocapitalize)
  inputElement += attribute('pattern', params.pattern)
  inputElement += attribute('inputmode', params.inputmode)
  inputElement += `${govukAttributes(params.attributes)}>`

  // Input <label> element
  const label = govukLabel({ for: inputId, ...params.label })

  // Do we need input prefixes or suffixes
  let beforeInput = ''
  let afterInput = ''

  if (params.formGroup?.beforeInput && (params.formGroup.beforeInput.text || params.formGroup.beforeInput.html)) {
    beforeInput += params.formGroup.beforeInput.html ?? html`${params.formGroup.beforeInput.text}`
  }
  if (params.prefix && (params.prefix.text || params.prefix.html)) {
    beforeInput += affixItem(params.prefix, "prefix")
  }
  if (params.suffix && (params.suffix.text || params.suffix.html)) {
    afterInput += affixItem(params.suffix, "suffix")
  }
  if (params.formGroup?.afterInput && (params.formGroup.afterInput.text || params.formGroup.afterInput.html)) {
    afterInput += params.formGroup.afterInput.html ?? html`${params.formGroup.afterInput.text}`
  }
  if (beforeInput || afterInput) {
    beforeInput = html`<div class="govuk-input__wrapper ${params.inputWrapper?.classes}"!${govukAttributes(params.inputWrapper?.attributes)}>!${beforeInput}`
    afterInput += '</div>'
  }

  return `<div class="${formGroupClassNames}"${govukAttributes(params.formGroup?.attributes)}>
  ${label}
  ${hint}
  ${errorMessage}
  ${beforeInput}
  ${inputElement}
  ${afterInput}
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
 * @typedef {Object} inputWrapperConfig
 * @property {string} [classes] - Classes to add to the wrapping element.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the wrapping element.
 */

/**
 * @typedef {Object} afterInputConfig
 * @property {string} text - Text to add after the input. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add after the input. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} beforeInputConfig
 * @property {string} text - Text to add before the input. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add before the input. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} formGroupConfig
 * @property {string} [classes] - Classes to add to the form group (for example to show error state for the whole group).
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the form group.
 * @property {beforeInputConfig} [beforeInput] - Content to add before the input used by the text input component.
 * @property {afterInputConfig} [afterInput] - Content to add after the input used by the text input component.
 */

/**
 * @typedef {Object} suffixConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the suffix. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the suffix. If `html` is provided, the `text` option will be ignored.
 * @property {string} [classes] - Classes to add to the suffix element.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the suffix element.
 */

/**
 * @typedef {Object} prefixConfig
 * @property {string} text - Required. If `html` is set, this is not required. Text to use within the prefix. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - Required. If `text` is set, this is not required. HTML to use within the prefix. If `html` is provided, the `text` option will be ignored.
 * @property {string} [classes] - Classes to add to the prefix.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the prefix element.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} inputConfig
 * @property {string} id - The ID of the input.
 * @property {string} name - The name of the input, which is submitted with the form data.
 * @property {string} [type] - Type of input control to render, for example, a password input control. Defaults to `"text"`.
 * @property {string} [inputmode] - Optional value for [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).
 * @property {string} [value] - Optional initial value of the input.
 * @property {boolean} [disabled] - If `true`, input will be disabled.
 * @property {string} [describedBy] - One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
 * @property {labelConfig} label - The label used by the text input component.
 * @property {hintConfig} [hint] - Can be used to add a hint to a text input component.
 * @property {errorMessageConfig} [errorMessage] - Can be used to add an error message to the text input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.
 * @property {prefixConfig} [prefix] - Can be used to add a prefix to the text input component.
 * @property {suffixConfig} [suffix] - Can be used to add a suffix to the text input component.
 * @property {formGroupConfig} [formGroup] - Additional options for the form group containing the text input component.
 * @property {string} [classes] - Classes to add to the input.
 * @property {string} [autocomplete] - Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html), for instance "postal-code" or "username". See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of attributes that can be used.
 * @property {string} [pattern] - Attribute to [provide a regular expression pattern](https://html.spec.whatwg.org/multipage/sec-forms.html#the-pattern-attribute), used to match allowed character combinations for the input value.
 * @property {boolean} [spellcheck] - Optional field to enable or disable the `spellcheck` attribute on the input.
 * @property {string} [autocapitalize] - Optional field to enable or disable autocapitalisation of user input. See [autocapitalization](https://html.spec.whatwg.org/multipage/interaction.html#autocapitalization) for a full list of values that can be used.
 * @property {inputWrapperConfig} [inputWrapper] - If any of `prefix`, `suffix`, `formGroup.beforeInput` or `formGroup.afterInput` have a value, a wrapping element is added around the input and inserted content. This object allows you to customise that wrapping element.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the input.
 */
