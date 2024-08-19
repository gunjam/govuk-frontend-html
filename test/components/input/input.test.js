import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { document, getExamples, hasAccessibleDescription, hasAccessibleName, renderHtml } from '../../helper.js'

describe('Input', () => {
  let examples

  before(async () => {
    examples = await getExamples('input')
  })

  describe('default example', () => {
    let $component
    let $label

    before(async () => {
      document.body.innerHTML = await renderHtml('input', examples.default)
      $component = document.querySelector('.govuk-input')
      $label = document.querySelector('.govuk-label')
    })

    it('sets the `id` attribute based on the `id` option', () => {
      equal($component.getAttribute('id'), 'input-example')
    })

    it('sets the `name` attribute based on the `name` option', () => {
      equal($component.getAttribute('name'), 'test-name')
    })

    it('sets the `type` attribute to a default value of "text"', () => {
      equal($component.getAttribute('type'), 'text')
    })

    it('includes a form group wrapper', () => {
      const $formGroup = document.querySelector('.govuk-form-group')

      ok($formGroup.contains($formGroup))
      ok($formGroup.contains($component))
    })

    it('includes a label', () => {
      ok($label.contains($label))
    })

    it('the input is named by the label', () => {
      hasAccessibleName($component, $label.textContent.trim())
    })

    it('does not include the input wrapper', () => {
      const $wrapper = document.querySelector('.govuk-form-group > .govuk-input__wrapper')

      equal($wrapper, null)
    })

    for (const attribute of ['autocapitalize', 'autocomplete', 'disabled', 'inputmode', 'pattern', 'spellcheck']) {
      it(`does not set the "${attribute}" attribute`, () => {
        equal($component.hasAttribute(attribute), false)
      })
    }
  })

  describe('custom options', () => {
    it('includes additional classes from the `classes` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples.classes)

      const $component = document.querySelector('.govuk-input')
      ok([...$component.classList].includes('app-input--custom-modifier'))
    })

    it('sets the `type` attribute based on the `type` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['custom type'])

      const $component = document.querySelector('.govuk-input')
      equal($component.getAttribute('type'), 'number')
    })

    it('sets the `pattern` attribute based on the `pattern` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with pattern attribute'])

      const $component = document.querySelector('.govuk-input')
      equal($component.getAttribute('pattern'), '[0-9]*')
    })

    it('sets the `value` attribute based on the `value` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples.value)

      const $component = document.querySelector('.govuk-input')
      equal($component.value, 'QQ 12 34 56 C')
    })

    it('sets the `value` attribute based on a `value` of 0', async () => {
      document.body.innerHTML = await renderHtml('input', examples['zero value'])

      const $component = document.querySelector('.govuk-input')
      equal($component.value, '0')
    })

    it('sets the `aria-describedby` attribute based on the `describedBy` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with describedBy'])

      const $component = document.querySelector('.govuk-input')
      equal($component.getAttribute('aria-describedby'), 'test-target-element')
    })

    it('sets any additional attributes based on the `attributes` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples.attributes)

      const $component = document.querySelector('.govuk-input')
      equal($component.getAttribute('data-attribute'), 'my data value')
    })

    it('includes additional classes from the `formGroup.classes` option on the form group', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with optional form-group classes'])

      const $formGroup = document.querySelector('.govuk-form-group')
      ok([...$formGroup.classList].includes('extra-class'))
    })
  })

  describe('when a hint is passed', () => {
    let $component
    let $hint

    before(async () => {
      document.body.innerHTML = await renderHtml('input', examples['with hint text'])

      $component = document.querySelector('.govuk-input')
      $hint = document.querySelector('.govuk-hint')
    })

    it('includes the hint', async () => {
      ok($hint.contains($hint))
    })

    it('associates the input as described by the hint', async () => {
      hasAccessibleDescription($component, $hint.textContent.trim())
    })

    it('associates the input as described by both the hint and the `describedBy` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['hint with describedBy'])

      const $additionalDescription = document.createElement('p')
      $additionalDescription.id = 'test-target-element'
      $additionalDescription.textContent = 'Additional description'
      document.body.appendChild($additionalDescription)

      const $input = document.querySelector('.govuk-input')
      const $hint = document.querySelector('.govuk-hint')

      hasAccessibleDescription($input, [$additionalDescription, $hint].map((el) => el.textContent.trim()).join(' '))
    })
  })

  describe('when an error message is passed', () => {
    let $component
    let $errorMessage

    before(async () => {
      document.body.innerHTML = await renderHtml('input', examples['with error message'])

      $component = document.querySelector('.govuk-input')
      $errorMessage = document.querySelector('.govuk-error-message')
    })

    it('includes the error message', async () => {
      ok($errorMessage.contains($errorMessage))
    })

    it('associates the input as described by the error message', async () => {
      hasAccessibleDescription($component, $errorMessage.textContent.trim())
    })

    it('associates the input as described by the error message and the `describedBy` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['error with describedBy'])

      const $additionalDescription = document.createElement('p')
      $additionalDescription.id = 'test-target-element'
      $additionalDescription.textContent = 'Additional description'
      document.body.appendChild($additionalDescription)

      const $input = document.querySelector('.govuk-input')
      const $errorMessage = document.querySelector('.govuk-error-message')

      hasAccessibleDescription($input, [$additionalDescription, $errorMessage].map((el) => el.textContent.trim()).join(' '))
    })

    it('includes the error modifier class on the input', async () => {
      ok([...$component.classList].includes('govuk-input--error'))
    })

    it('includes the error modifier class on the form group wrapper', async () => {
      const $formGroup = document.querySelector('.govuk-form-group')

      ok([...$formGroup.classList].includes('govuk-form-group--error'))
    })
  })

  describe('when both a hint and an error message are passed', () => {
    it('associates the input as described by both the hint and the error message', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with error and hint'])

      const $component = document.querySelector('.govuk-input')
      const $errorMessage = document.querySelector('.govuk-error-message')
      const $hint = document.querySelector('.govuk-hint')

      hasAccessibleDescription($component, [$hint, $errorMessage].map((el) => el.textContent.trim()).join(' '))
    })

    it('associates the input as described by the hint, error message and the `describedBy` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with error, hint and describedBy'])

      const $additionalDescription = document.createElement('p')
      $additionalDescription.id = 'test-target-element'
      $additionalDescription.textContent = 'Additional description'
      document.body.appendChild($additionalDescription)

      const $component = document.querySelector('.govuk-input')
      const $errorMessage = document.querySelector('.govuk-error-message')
      const $hint = document.querySelector('.govuk-hint')

      hasAccessibleDescription($component, [$additionalDescription, $hint, $errorMessage].map((el) => el.textContent.trim()).join(' '))
    })
  })

  describe('when the `spellcheck` option is set', () => {
    it('sets the `spellcheck` attribute to "true" if the option is true', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with spellcheck enabled'])

      const $component = document.querySelector('.govuk-input')
      equal($component.getAttribute('spellcheck'), 'true')
    })

    it('sets the `spellcheck` attribute to "false" if the option is false', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with spellcheck disabled'])

      const $component = document.querySelector('.govuk-input')
      equal($component.getAttribute('spellcheck'), 'false')
    })
  })

  describe('when the `autocapitalize` option is set', () => {
    it('sets the `autocapitalize` attribute based on the option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with autocapitalize turned off'])

      const $component = document.querySelector('.govuk-input')
      equal($component.getAttribute('autocapitalize'), 'none')
    })
  })

  describe('when the `autocomplete` option is set', () => {
    it('sets the `autocomplete` attribute based on the option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with autocomplete attribute'])

      const $component = document.querySelector('.govuk-input')
      equal($component.getAttribute('autocomplete'), 'postal-code')
    })
  })

  describe('when the `inputmode` option is set', () => {
    it('sets the `inputmode` attribute based on the option', async () => {
      document.body.innerHTML = await renderHtml('input', examples.inputmode)

      const $component = document.querySelector('.govuk-input')
      equal($component.getAttribute('inputmode'), 'decimal')
    })
  })

  describe('when the `disabled` option is set', () => {
    it('disables the input', async () => {
      document.body.innerHTML = await renderHtml('input', examples.disabled)

      const $component = document.querySelector('.govuk-input')
      ok($component.disabled)
    })
  })

  describe('when it includes a prefix', () => {
    let $wrapper
    let $prefix

    before(async () => {
      document.body.innerHTML = await renderHtml('input', examples['with prefix'])

      $wrapper = document.querySelector('.govuk-input__wrapper')
      $prefix = document.querySelector('.govuk-input__prefix')
    })

    it('renders the input wrapper', async () => {
      ok($wrapper.contains($wrapper))
    })

    it('renders the prefix inside the wrapper', async () => {
      ok($wrapper.contains($prefix))
    })

    it('renders the text in the prefix', async () => {
      equal($prefix.textContent.trim(), '£')
    })

    it('hides the prefix from screen readers using `aria-hidden`', async () => {
      equal($prefix.getAttribute('aria-hidden'), 'true')
    })

    it('escapes HTML entities when using the `text` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with prefix with html as text'])
      const $prefix = document.querySelector('.govuk-input__prefix')

      equal($prefix.textContent.trim(), '<span>£</span>')
    })

    it('allows HTML to be passed when using the `html` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with prefix with html'])
      const $prefix = document.querySelector('.govuk-input__prefix')

      ok($prefix.innerHTML.includes('<span>£</span>'))
    })

    it('includes additional classes from the `prefix.classes` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with prefix with classes'])
      const $prefix = document.querySelector('.govuk-input__prefix')

      ok([...$prefix.classList].includes('app-input__prefix--custom-modifier'))
    })

    it('sets additional attributes from the `prefix.attributes` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with prefix with attributes'])
      const $prefix = document.querySelector('.govuk-input__prefix')

      equal($prefix.getAttribute('data-attribute'), 'value')
    })
  })

  describe('when it includes a suffix', () => {
    let $wrapper
    let $suffix

    before(async () => {
      document.body.innerHTML = await renderHtml('input', examples['with suffix'])

      $wrapper = document.querySelector('.govuk-input__wrapper')
      $suffix = document.querySelector('.govuk-input__suffix')
    })

    it('renders the input wrapper', async () => {
      ok($wrapper.contains($wrapper))
    })

    it('renders the suffix inside the wrapper', async () => {
      ok($wrapper.contains($suffix))
    })

    it('renders the text in the suffix', async () => {
      equal($suffix.textContent.trim(), 'kg')
    })

    it('hides the suffix from screen readers using `aria-hidden`', async () => {
      equal($suffix.getAttribute('aria-hidden'), 'true')
    })

    it('escapes HTML entities when using the `text` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with suffix with html as text'])
      const $suffix = document.querySelector('.govuk-input__suffix')

      equal($suffix.textContent.trim(), '<span>kg</span>')
    })

    it('allows HTML to be passed when using the `html` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with suffix with html'])
      const $suffix = document.querySelector('.govuk-input__suffix')

      ok($suffix.innerHTML.includes('<span>kg</span>'))
    })

    it('includes additional classes from the `prefix.classes` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with prefix with classes'])
      const $prefix = document.querySelector('.govuk-input__prefix')

      ok([...$prefix.classList].includes('app-input__prefix--custom-modifier'))
    })

    it('sets additional attributes from the `prefix.attributes` option', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with prefix with attributes'])
      const $prefix = document.querySelector('.govuk-input__prefix')

      equal($prefix.getAttribute('data-attribute'), 'value')
    })
  })

  describe('when it includes both a prefix and a suffix', () => {
    it('renders the prefix before the suffix', async () => {
      document.body.innerHTML = await renderHtml('input', examples['with prefix and suffix'])

      ok(document.contains(document.querySelector('.govuk-input__prefix ~ .govuk-input__suffix')))
    })
  })

  describe('when it includes the input wrapper', () => {
    let $wrapper

    before(async () => {
      document.body.innerHTML = await renderHtml('input', examples['with customised input wrapper'])
      $wrapper = document.querySelector('.govuk-input__wrapper')
    })

    it('includes additional classes from the `inputWrapper.classes` option', async () => {
      ok([...$wrapper.classList].includes('app-input-wrapper--custom-modifier'))
    })

    it('renders the input wrapper with custom attributes', async () => {
      equal($wrapper.getAttribute('data-attribute'), 'value')
    })
  })
})
