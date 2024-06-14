import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'
import { capitalise } from '../../utils/text.js'
import govukErrorMessage from '../error-message/error-message.js'
import govukFieldset from '../fieldset/fieldset.js'
import govukHint from '../hint/hint.js'
import govukInput from '../input/input.js'

/**
 * Use the date input component to help users enter a memorable date or one they can easily look up.
 * @param {dateInputConfig} params - Date input config options
 * @returns {string} Date input HTML
 * @see {@link https://design-system.service.gov.uk/components/date-input/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukDateInput({
 *   id: "passport-issued",
 *   namePrefix: "passport-issued",
 *   fieldset: {
 *     legend: {
 *       text: "When was your passport issued?"
 *     }
 *   },
 *   hint: {
 *     text: "For example, 27 3 2007"
 *   }
 * })
 * ```
 */
export default function govukDateInput(params) {
  // custom classes
  let classNames = 'govuk-date-input'
  if (params.classes) {
    classNames += html` ${params.classes}`
  }

  // custom formgroup classes
  let formGroupClassNames = 'govuk-form-group'
  if (params.formGroup?.classes) {
    formGroupClassNames += html` ${params.formGroup.classes}`
  }

  // a record of other elements that we need to associate with the input using
  // aria-describedby – for example hints or error messages.
  let describedBy = params.fieldset?.describedBy

  // if no input items use default day/month/year
  const dateInputItems =
    params.items?.length > 0
      ? params.items
      : [
        {
          name: 'day',
          classes: 'govuk-input--width-2'
        },
        {
          name: 'month',
          classes: 'govuk-input--width-2'
        },
        {
          name: 'year',
          classes: 'govuk-input--width-4'
        }
      ]

  // Capture the HTML so we can optionally nest it in a fieldset
  let innerHtml = ''

  if (params.hint) {
    const hintId = `${params.id}-hint`
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
    const errorId = `${params.id}-error`
    formGroupClassNames += ' govuk-form-group--error'
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

  let beforeInputs = ''
  if (params.formGroup?.beforeInputs) {
    beforeInputs += params.formGroup.beforeInputs.html ?? html`${params.formGroup.beforeInputs.text}`
  }

  const afterInputs = ''
  if (params.formGroup?.afterInputs) {
    beforeInputs += params.formGroup.afterInputs.html ?? html`${params.formGroup.afterInputs.text}`
  }

  let inputs = ''
  for (const item of dateInputItems) {
    inputs += `<div class="govuk-date-input__item">
      ${govukInput({
      label: {
        text: item.label ?? capitalise(item.name),
        classes: 'govuk-date-input__label'
      },
      id: item.id ?? `${params.id}-${item.name}`,
      classes: `govuk-date-input__input ${item.classes ?? ''}`,
      name: params.namePrefix ? `${params.namePrefix}-${item.name}` : item.name,
      value: item.value,
      type: 'text',
      inputmode: item.inputmode ?? 'numeric',
      autocomplete: item.autocomplete,
      pattern: item.pattern,
      attributes: item.attributes
    })}
    </div>`
  }

  innerHtml += `<div class="${classNames}"${govukAttributes(params.attributes)}${attribute('id', params.id)}>
    ${beforeInputs}
    ${inputs}
    ${afterInputs}
  </div>`

  return `<div class="${formGroupClassNames}"${govukAttributes(params.formGroup?.attributes)}>
    ${
    // We override the fieldset's role to 'group' because otherwise JAWS does not
    // announce the description for a fieldset comprised of text inputs, but
    // adding the role to the fieldset always makes the output overly verbose for
    // radio buttons or checkboxes.
    params.fieldset ? govukFieldset({
      describedBy: describedBy,
      classes: params.fieldset.classes,
      role: 'group',
      attributes: params.fieldset.attributes,
      legend: params.fieldset.legend,
      html: innerHtml
    }) : innerHtml}
</div>`
}

/**
 * @typedef {import('../fieldset/fieldset.js').fieldsetConfig} fieldsetConfig
 */

/**
 * @typedef {import('../hint/hint.js').hintConfig} hintConfig
 */

/**
 * @typedef {import('../error-message/error-message.js').errorMessageConfig} errorMessageConfig
 */

/**
 * @typedef {Object} afterInputsConfig
 * @property {string} text - Text to add after the inputs. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add after the inputs. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} beforeInputsConfig
 * @property {string} text - Text to add before the inputs. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML to add before the inputs. If `html` is provided, the `text` option will be ignored.
 */

/**
 * @typedef {Object} formGroupConfig
 * @property {string} [classes] - Classes to add to the form group (for example to show error state for the whole group).
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the form group.
 * @property {beforeInputsConfig} [beforeInputs] - Content to add before the inputs used by the date input component.
 * @property {afterInputsConfig} [afterInputs] - Content to add after the inputs used by the date input component.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {string} [id] - Item-specific ID. If provided, it will be used instead of the generated ID.
 * @property {string} name - Item-specific name attribute.
 * @property {string} [label] - Item-specific label text. If provided, this will be used instead of `name` for item label text.
 * @property {string} [value] - If provided, it will be used as the initial value of the input.
 * @property {string} [autocomplete] - Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html), for instance `"bday-day"`. See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of attributes that can be used.
 * @property {string} [pattern] - Attribute to [provide a regular expression pattern](https://html.spec.whatwg.org/multipage/sec-forms.html#the-pattern-attribute), used to match allowed character combinations for the input value.
 * @property {string} [classes] - Classes to add to date input item.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the date input tag.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} dateInputConfig
 * @property {string} id - This is used for the main component and to compose the ID attribute for each item.
 * @property {string} [namePrefix] - Optional prefix. This is used to prefix each item `name`, separated by `-`.
 * @property {Array.<itemsConfig>} [items] - The inputs within the date input component.
 * @property {hintConfig} [hint] - Can be used to add a hint to a date input component.
 * @property {errorMessageConfig} [errorMessage] - Can be used to add an error message to the date input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.
 * @property {formGroupConfig} [formGroup] - Additional options for the form group containing the date input component.
 * @property {fieldsetConfig} [fieldset] - Can be used to add a fieldset to the date input component.
 * @property {string} [classes] - Classes to add to the date-input container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the date-input container.
 */
