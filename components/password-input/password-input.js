import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukI18nAttributes from '../../utils/i18n.js'
import govukButton from '../button/button.js'
import govukInput from '../input/input.js'

/**
 * Help users to create and enter passwords.
 * @param {passwordInputConfig} params - Password input config options
 * @returns {string} Password input HTML
 * @see {@link https://design-system.service.gov.uk/components/password-input/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukPasswordInput({
 *   label: {
 *     text: 'Password'
 *   },
 *   id: 'password-input',
 *   name: 'password'
 * })
 * ```
 */
export default function govukPasswordInput(params) {
  let attributesHtml = ' data-module="govuk-password-input"'

  attributesHtml += govukI18nAttributes({
    key: 'show-password',
    message: params.showPasswordText
  })

  attributesHtml += govukI18nAttributes({
    key: 'hide-password',
    message: params.hidePasswordText
  })

  attributesHtml += govukI18nAttributes({
    key: 'show-password-aria-label',
    message: params.showPasswordAriaLabelText
  })

  attributesHtml += govukI18nAttributes({
    key: 'hide-password-aria-label',
    message: params.hidePasswordAriaLabelText
  })

  attributesHtml += govukI18nAttributes({
    key: 'password-shown-announcement',
    message: params.passwordShownAnnouncementText
  })

  attributesHtml += govukI18nAttributes({
    key: 'password-hidden-announcement',
    message: params.passwordHiddenAnnouncementText
  })

  attributesHtml += govukAttributes(params.formGroup?.attributes)

  let buttonHtml = govukButton({
    type: 'button',
    classes: `govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle${params.button?.classes ? `${params.button.classes}` : ''}`,
    text: params.showPasswordText ?? 'Show',
    attributes: {
      'aria-controls': params.id,
      'aria-label': params.showPasswordAriaLabelText ?? 'Show password',
      hidden: {
        value: true,
        optional: true
      }
    }
  })

  if (params.formGroup?.afterInput) {
    buttonHtml += params.formGroup.afterInput.html ?? html`${params.formGroup.afterInput.text}`
  }

  return govukInput({
    formGroup: {
      classes: `govuk-password-input${params.formGroup?.classes ? ` ${params.formGroup.classes}` : ''}`,
      attributes: attributesHtml,
      beforeInput: params.formGroup?.beforeInput,
      afterInput: {
        html: buttonHtml
      }
    },
    inputWrapper: {
      classes: 'govuk-password-input__wrapper'
    },
    label: params.label,
    hint: params.hint,
    classes: `govuk-password-input__input govuk-js-password-input-input${params.classes ? ` ${params.classes}` : ''}`,
    errorMessage: params.errorMessage,
    id: params.id,
    name: params.name,
    type: 'password',
    spellcheck: false,
    autocapitalize: 'none',
    autocomplete: params.autocomplete ?? 'current-password',
    value: params.value,
    disabled: params.disabled,
    describedBy: params.describedBy,
    attributes: params.attributes
  })
}

/**
 * @typedef {Object} buttonConfig
 * @property {string} [classes] - Classes to add to the button.
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
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} passwordInputConfig
 * @property {string} id - The ID of the input.
 * @property {string} name - The name of the input, which is submitted with the form data.
 * @property {string} [value] - Optional initial value of the input.
 * @property {boolean} [disabled] - If `true`, input will be disabled.
 * @property {string} [describedBy] - One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
 * @property {object} label - The label used by the text input component.
 * @property {object} [hint] - Can be used to add a hint to a text input component.
 * @property {object} [errorMessage] - Can be used to add an error message to the text input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.
 * @property {formGroupConfig} [formGroup] - Additional options for the form group containing the text input component.
 * @property {string} [classes] - Classes to add to the input.
 * @property {string} [autocomplete] - Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html). See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of values that can be used. Default is `"current-password"`.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the input.
 * @property {string} [showPasswordText] - Button text when the password is hidden. Defaults to `"Show"`.
 * @property {string} [hidePasswordText] - Button text when the password is visible. Defaults to `"Hide"`.
 * @property {string} [showPasswordAriaLabelText] - Button text exposed to assistive technologies, like screen readers, when the password is hidden. Defaults to `"Show password"`.
 * @property {string} [hidePasswordAriaLabelText] - Button text exposed to assistive technologies, like screen readers, when the password is visible. Defaults to `"Hide password"`.
 * @property {string} [passwordShownAnnouncementText] - Announcement made to screen reader users when their password has become visible in plain text. Defaults to `"Your password is visible"`.
 * @property {string} [passwordHiddenAnnouncementText] - Announcement made to screen reader users when their password has been obscured and is not visible. Defaults to `"Your password is hidden"`.
 * @property {buttonConfig} [button] - Optional object allowing customisation of the toggle button.
 */
