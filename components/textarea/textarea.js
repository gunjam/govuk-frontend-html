import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukErrorMessage from '../error-message/error-message.js'
import govukHint from '../hint/hint.js'
import govukLabel from '../label/label.js'

/**
 * Use the textarea component when you need to let users enter an amount of text that’s longer than a single line.
 * @param {textareaConfig} params - Textarea config options
 * @returns {string} Textarea HTML
 * @see {@link https://design-system.service.gov.uk/components/textarea/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukTextarea({
 *   name: 'more-detail',
 *   id: 'more-detail',
 *   label: {
 *     text: 'Can you provide more detail?'
 *   }
 * })
 * ```
 */
export default function govukTextarea(params) {
  let formGroupclassNames = 'govuk-form-group'
  let classNames = 'govuk-textarea'

  // Custom classes
  if (params.formGroup?.classes) {
    formGroupclassNames += html` ${params.formGroup.classes}`
  }
  if (params.classes) {
    classNames += html` ${params.classes}`
  }

  // a record of other elements that we need to associate with the input using
  // aria-describedby – for example hints or error messages
  let describedBy = params.describedBy

  // textarea label
  const label = params.label
    ? govukLabel({
      html: params.label.html,
      text: params.label.text,
      classes: params.label.classes,
      isPageHeading: params.label.isPageHeading,
      attributes: params.label.attributes,
      for: params.id
    })
    : ''

  // Optionally render textarea hint
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

  // Optionally render error message
  let errorMessage = ''
  if (params.errorMessage) {
    const errorId = `${params.id}-error`
    describedBy = describedBy ? `${describedBy} ${errorId}` : errorId
    formGroupclassNames += ' govuk-form-group--error'
    classNames += ' govuk-textarea--error'

    errorMessage += govukErrorMessage({
      id: errorId,
      classes: params.errorMessage.classes,
      attributes: params.errorMessage.attributes,
      html: params.errorMessage.html,
      text: params.errorMessage.text,
      visuallyHiddenText: params.errorMessage.visuallyHiddenText
    })
  }

  // Content before and after `<textarea>`
  const beforeInput = params.formGroup?.beforeInput?.html ?? html`${params.formGroup?.beforeInput?.text}`
  const afterInput = params.formGroup?.afterInput?.html ?? html`${params.formGroup?.afterInput?.text}`

  // <textarea> attributes
  let attributes = `class="${classNames}"`
  attributes += attribute('id', params.id)
  attributes += attribute('name', params.name)
  attributes += ` rows="${params.rows ? html`${params.rows}` : '5'}"`
  attributes += params.spellcheck === false || params.spellcheck === true ? `spellcheck="${params.spellcheck}"` : ''
  attributes += params.disabled ? ' disabled' : ''
  attributes += attribute('aria-describedby', describedBy)
  attributes += params.autocomplete ? html` autocomplete="${params.autocomplete}"` : ''
  attributes += govukAttributes(params.attributes)

  return html`<div class="!${formGroupclassNames}"!${govukAttributes(params.formGroup?.attributes)}>
  !${label}
  !${hint}
  !${errorMessage}
  !${beforeInput}
  <textarea !${attributes}>${params.value}</textarea>
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
 * @property {string} text - Text to add after the textarea. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add after the textarea. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} beforeInputConfig
 * @property {string} text - Text to add before the textarea. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add before the textarea. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} formGroupConfig
 * @property {string} [classes] - Classes to add to the form group (for example to show error state for the whole group).
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the form group.
 * @property {beforeInputConfig} [beforeInput] - Content to add before the textarea used by the textarea component.
 * @property {afterInputConfig} [afterInput] - Content to add after the textarea used by the textarea component.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} textareaConfig
 * @property {string} id - The ID of the textarea.
 * @property {string} name - The name of the textarea, which is submitted with the form data.
 * @property {boolean} [spellcheck] - Optional field to enable or disable the `spellcheck` attribute on the textarea.
 * @property {string} [rows] - Optional number of textarea rows (default is 5 rows).
 * @property {string} [value] - Optional initial value of the textarea.
 * @property {boolean} [disabled] - If `true`, textarea will be disabled.
 * @property {string} [describedBy] - One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
 * @property {labelConfig} label - The label used by the textarea component.
 * @property {hintConfig} [hint] - Can be used to add a hint to the textarea component.
 * @property {errorMessageConfig} [errorMessage] - Can be used to add an error message to the textarea component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.
 * @property {formGroupConfig} [formGroup] - Additional options for the form group containing the textarea component.
 * @property {string} [classes] - Classes to add to the textarea.
 * @property {string} [autocomplete] - Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html), for example `"street-address"`. See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of attributes that can be used.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the textarea.
 */
