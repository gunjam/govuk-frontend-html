import govukAttributes from '../../utils/govuk-attributes.js'
import govukI18nAttributes from '../../utils/i18n.js'
import govukHint from '../hint/hint.js'
import govukTextarea from '../textarea/textarea.js'

/**
 * Help users know how much text they can enter when there is a limit on the number of characters.
 * @param {characterCountConfig} params - Character count config options
 * @returns {string} Character count HTML
 * @see {@link https://design-system.service.gov.uk/components/character-count/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukCharacterCount({
 *   name: 'more-detail',
 *   id: 'more-detail',
 *   maxlength: 10,
 *   label: {
 *     text: 'Can you provide more detail?'
 *   }
 * })
 * ```
 */
export default function govukCharacterCount(params) {
  // If the limit is set in JavaScript, we won't be able to interpolate the message
  // until JavaScript, so we only set a text if the `maxlength` or `maxwords` options
  // were provided to the macro.
  const hasNoLimit = !params.maxwords && !params.maxlength
  const textareaDescriptionLength = params.maxwords ?? params.maxlength
  const textareaDescriptionText = params.textareaDescriptionText ?? `You can enter up to %{count} ${params.maxwords ? 'words' : 'characters'}`
  const textareaDescriptionTextNoLimit = !hasNoLimit ? textareaDescriptionText.replace('%{count}', textareaDescriptionLength) : ''

  let countMessageHtml = govukHint({
    text: textareaDescriptionTextNoLimit,
    id: `${params.id}-info`,
    classes: `govuk-character-count__message${params.countMessage?.classes ? ` ${params.countMessage.classes}` : ''}`
  })

  if (params.formGroup?.afterInput) {
    countMessageHtml += params.formGroup.afterInput.html ?? params.formGroup.afterInput.text
  }

  let attributesHtml = govukAttributes({
    'data-module': 'govuk-character-count',
    'data-maxlength': {
      value: params.maxlength,
      optional: true
    },
    'data-threshold': {
      value: params.threshold,
      optional: true
    },
    'data-maxwords': {
      value: params.maxwords,
      optional: true
    }
  })

  // Without maxlength or maxwords, we can't guess if the component will count words or characters.
  // We can't guess a default textarea description to be interpolated in JavaScript
  // once the maximum gets configured there.
  // So we only add the attribute if a textarea description was explicitely provided.
  if (hasNoLimit && params.textareaDescriptionText) {
    attributesHtml += govukI18nAttributes({
      key: 'textarea-description',
      messages: { other: params.textareaDescriptionText }
    })
  }

  attributesHtml += govukI18nAttributes({
    key: 'characters-under-limit',
    messages: params.charactersUnderLimitText
  })

  attributesHtml += govukI18nAttributes({
    key: 'characters-at-limit',
    message: params.charactersAtLimitText
  })

  attributesHtml += govukI18nAttributes({
    key: 'characters-over-limit',
    messages: params.charactersOverLimitText
  })

  attributesHtml += govukI18nAttributes({
    key: 'words-under-limit',
    messages: params.wordsUnderLimitText
  })

  attributesHtml += govukI18nAttributes({
    key: 'words-at-limit',
    message: params.wordsAtLimitText
  })

  attributesHtml += govukI18nAttributes({
    key: 'words-over-limit',
    messages: params.wordsOverLimitText
  })

  // Append form group attributes onto attributes set above
  if (params.formGroup?.attributes) {
    attributesHtml += govukAttributes(params.formGroup.attributes)
  }

  return govukTextarea({
    id: params.id,
    name: params.name,
    describedBy: `${params.id}-info`,
    rows: params.rows,
    spellcheck: params.spellcheck,
    value: params.value,
    formGroup: {
      classes: `govuk-character-count${params.formGroup?.classes ? ` ${params.formGroup.classes}` : ''}`,
      attributes: attributesHtml,
      beforeInput: params.formGroup?.beforeInput,
      afterInput: {
        html: countMessageHtml
      }
    },
    classes: `govuk-js-character-count${params.classes ? ` ${params.classes}` : ''}`,
    label: {
      html: params.label?.html,
      text: params.label?.text,
      classes: params.label?.classes,
      isPageHeading: params.label?.isPageHeading,
      attributes: params.label?.attributes,
      for: params.id
    },
    hint: params.hint,
    errorMessage: params.errorMessage,
    attributes: params.attributes
  })
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
 * @typedef {Object} countMessageConfig
 * @property {string} [classes] - Classes to add to the count message.
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
 * @property {beforeInputConfig} [beforeInput] - Content to add before the textarea used by the character count component.
 * @property {afterInputConfig} [afterInput] - Content to add after the textarea used by the character count component.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} characterCountConfig
 * @property {string} id - The ID of the textarea.
 * @property {string} name - The name of the textarea, which is submitted with the form data.
 * @property {string} [rows] - Optional number of textarea rows (default is 5 rows).
 * @property {string} [value] - Optional initial value of the textarea.
 * @property {string} maxlength - If `maxwords` is set, this is not required. The maximum number of characters. If `maxwords` is provided, the `maxlength` option will be ignored.
 * @property {string} maxwords - If `maxlength` is set, this is not required. The maximum number of words. If `maxwords` is provided, the `maxlength` option will be ignored.
 * @property {string} [threshold] - The percentage value of the limit at which point the count message is displayed. If this attribute is set, the count message will be hidden by default.
 * @property {labelConfig} label - The label used by the character count component.
 * @property {hintConfig} [hint] - Can be used to add a hint to the character count component.
 * @property {errorMessageConfig} [errorMessage] - Can be used to add an error message to the character count component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.
 * @property {formGroupConfig} [formGroup] - Additional options for the form group containing the character count component.
 * @property {string} [classes] - Classes to add to the textarea.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the textarea.
 * @property {boolean} [spellcheck] - Optional field to enable or disable the `spellcheck` attribute on the character count.
 * @property {countMessageConfig} [countMessage] - Additional options for the count message used by the character count component.
 * @property {string} [textareaDescriptionText] - Message made available to assistive technologies to describe that the component accepts only a limited amount of content. It is visible on the page when JavaScript is unavailable. The component will replace the `%{count}` placeholder with the value of the `maxlength` or `maxwords` parameter.
 * @property {string} [charactersUnderLimitText] - Message displayed when the number of characters is under the configured maximum, `maxlength`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of remaining characters. This is a [pluralised list of messages](https://frontend.design-system.service.gov.uk/localise-govuk-frontend).
 * @property {string} [charactersAtLimitText] - Message displayed when the number of characters reaches the configured maximum, `maxlength`. This message is displayed visually and through assistive technologies.
 * @property {string} [charactersOverLimitText] - Message displayed when the number of characters is over the configured maximum, `maxlength`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of characters above the maximum. This is a [pluralised list of messages](https://frontend.design-system.service.gov.uk/localise-govuk-frontend).
 * @property {string} [wordsUnderLimitText] - Message displayed when the number of words is under the configured maximum, `maxwords`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of remaining words. This is a [pluralised list of messages](https://frontend.design-system.service.gov.uk/localise-govuk-frontend).
 * @property {string} [wordsAtLimitText] - Message displayed when the number of words reaches the configured maximum, `maxwords`. This message is displayed visually and through assistive technologies.
 * @property {string} [wordsOverLimitText] - Message displayed when the number of words is over the configured maximum, `maxwords`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of characters above the maximum. This is a [pluralised list of messages](https://frontend.design-system.service.gov.uk/localise-govuk-frontend).
 */
