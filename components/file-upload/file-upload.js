import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukErrorMessage from '../error-message/error-message.js'
import govukHint from '../hint/hint.js'
import govukLabel from '../label/label.js'

/**
 * Help users select and upload a file.
 *
 * You should only ask users to upload something if it’s critical to the delivery of your service.
 * @param {fileUploadConfig} params - File upload config options
 * @returns {string} File upload HTML
 * @see {@link https://design-system.service.gov.uk/components/file-upload/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukFileUpload({
 *   id: 'file-upload-1',
 *   name: 'file-upload-1',
 *   label: {
 *     text: 'Upload a file'
 *   }
 * })
 * ```
 */
export default function govukFileUpload(params) {
  // Add custom class names
  let classNames = 'govuk-file-upload'
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

  let hint
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

  let errorMessage
  if (params.errorMessage) {
    const errorId = `${params.id}-error`
    classNames += ' govuk-file-upload--error'
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

  return html`<div class="!${formGroupClassNames}"!${govukAttributes(params.formGroup?.attributes)}>
    !${label}
    !${hint}
    !${errorMessage}
    !${beforeInput}
    <input class="!${classNames}" id="${params.id}" name="${params.name}" type="file"
    !${attribute('value', params.value)}
    !${params.disabled ? ' disabled' : ''}
    !${attribute('aria-describedby', describedBy)}
    !${govukAttributes(params.attributes)}>
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
 * @property {beforeInputConfig} [beforeInput] - Content to add before the input used by the file upload component.
 * @property {afterInputConfig} [afterInput] - Content to add after the input used by the file upload component.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} fileUploadConfig
 * @property {string} name - The name of the input, which is submitted with the form data.
 * @property {string} id - The ID of the input.
 * @property {string} [value] - Optional initial value of the input.
 * @property {boolean} [disabled] - If `true`, file input will be disabled.
 * @property {string} [describedBy] - One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
 * @property {labelConfig} label - The label used by the file upload component.
 * @property {hintConfig} [hint] - Can be used to add a hint to the file upload component.
 * @property {errorMessageConfig} [errorMessage] - Can be used to add an error message to the file upload component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.
 * @property {formGroupConfig} [formGroup] - Additional options for the form group containing the file upload component.
 * @property {string} [classes] - Classes to add to the file upload component.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the file upload component.
 */
