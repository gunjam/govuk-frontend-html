import { equal, match, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, htmlWithClassName, render } from '../../helper.js'

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Input', () => {
  let examples

  before(async () => {
    examples = await getExamples('input')
  })

  describe('default example', () => {
    it('renders with id', async () => {
      const $ = await render('input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('id'), 'input-example')
    })

    it('renders with name', async () => {
      const $ = await render('input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('name'), 'test-name')
    })

    it('renders with type="text" by default', async () => {
      const $ = await render('input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('type'), 'text')
    })

    it('renders with a form group wrapper', async () => {
      const $ = await render('input', examples.default)

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.length)
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      const $ = await render('input', examples.classes)

      const $component = $('.govuk-input')
      ok($component.hasClass('app-input--custom-modifier'))
    })

    it('allows you to override the type', async () => {
      const $ = await render('input', examples['custom type'])

      const $component = $('.govuk-input')
      equal($component.attr('type'), 'number')
    })

    it('renders with pattern attribute', async () => {
      const $ = await render('input', examples['with pattern attribute'])

      const $component = $('.govuk-input')
      equal($component.attr('pattern'), '[0-9]*')
    })

    it('renders with value', async () => {
      const $ = await render('input', examples.value)

      const $component = $('.govuk-input')
      equal($component.val(), 'QQ 12 34 56 C')
    })

    it('renders with zero value', async () => {
      const $ = await render('input', examples['zero value'])

      const $component = $('.govuk-input')
      equal($component.val(), '0')
    })

    it('renders with aria-describedby', async () => {
      const $ = await render('input', examples['with describedBy'])

      const $component = $('.govuk-input')
      equal($component.attr('aria-describedby'), 'test-target-element')
    })

    it('renders with attributes', async () => {
      const $ = await render('input', examples.attributes)

      const $component = $('.govuk-input')
      equal($component.attr('data-attribute'), 'my data value')
    })

    it('renders with a form group wrapper that has extra classes', async () => {
      const $ = await render('input', examples['with optional form-group classes'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('extra-class'))
    })

    it("doesn't render the input wrapper", async () => {
      const $ = await render('input', examples.default)

      const $wrapper = $('.govuk-form-group > .govuk-input__wrapper')
      equal($wrapper.length, 0)
    })
  })

  describe('when it includes a hint', () => {
    it('renders the hint', async () => {
      const $ = await render('input', examples['with hint text'])

      equal(htmlWithClassName($, '.govuk-hint'), `<div class="govuk-hint " id="input-with-hint-text-hint">It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.</div>`)
    })

    it('associates the input as "described by" the hint', async () => {
      const $ = await render('input', examples['with hint text'])

      const $input = $('.govuk-input')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`)

      match($input.attr('aria-describedby'), describedBy)
    })

    it('associates the input as "described by" the hint and parent fieldset', async () => {
      const $ = await render('input', examples['hint with describedBy'])

      const $input = $('.govuk-input')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WORD_BOUNDARY}`)

      match($input.attr('aria-describedby'), describedBy)
    })
  })

  describe('when it includes an error message', () => {
    it('renders the error message', async () => {
      const $ = await render('input', examples['with error message'])

      equal(htmlWithClassName($, '.govuk-error-message'), `<p id="input-with-error-message-error" class="govuk-error-message "> Error message goes here</p>`)
    })

    it('associates the input as "described by" the error message', async () => {
      const $ = await render('input', examples['with error message'])

      const $input = $('.govuk-input')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`)

      match($input.attr('aria-describedby'), describedBy)
    })

    it('associates the input as "described by" the error message and parent fieldset', async () => {
      const $ = await render('input', examples['error with describedBy'])

      const $input = $('.govuk-input')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($input.attr('aria-describedby'), describedBy)
    })

    it('includes the error class on the input', async () => {
      const $ = await render('input', examples['with error message'])

      const $component = $('.govuk-input')
      ok($component.hasClass('govuk-input--error'))
    })

    it('renders with a form group wrapper that has an error state', async () => {
      const $ = await render('input', examples['with error message'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('govuk-form-group--error'))
    })
  })

  describe('when it has the spellcheck attribute', () => {
    it('renders with spellcheck attribute set to true', async () => {
      const $ = await render('input', examples['with spellcheck enabled'])

      const $component = $('.govuk-input')
      equal($component.attr('spellcheck'), 'true')
    })

    it('renders with spellcheck attribute set to false', async () => {
      const $ = await render('input', examples['with spellcheck disabled'])

      const $component = $('.govuk-input')
      equal($component.attr('spellcheck'), 'false')
    })

    it('renders without spellcheck attribute by default', async () => {
      const $ = await render('input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('spellcheck'), undefined)
    })
  })

  describe('when it has the autocapitalize attribute', () => {
    it('renders without autocapitalize attribute by default', async () => {
      const $ = await render('input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('autocapitalize'), undefined)
    })

    it('renders with autocapitalize attribute when set', async () => {
      const $ = await render('input', examples['with autocapitalize turned off'])

      const $component = $('.govuk-input')
      equal($component.attr('autocapitalize'), 'none')
    })
  })

  describe('when it includes both a hint and an error message', () => {
    it('associates the input as described by both the hint and the error message', async () => {
      const $ = await render('input', examples['with error and hint'])

      const $component = $('.govuk-input')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedByCombined)
    })

    it('associates the input as described by the hint, error message and parent fieldset', async () => {
      const $ = await render('input', examples['with error, hint and describedBy'])

      const $component = $('.govuk-input')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedByCombined)
    })
  })

  describe('with dependant components', () => {
    it('have correct nesting order', async () => {
      const $ = await render('input', examples.default)

      const $component = $('.govuk-form-group > .govuk-input')
      ok($component.length)
    })

    it('renders with label', async () => {
      const $ = await render('input', examples.default)

      equal(htmlWithClassName($, '.govuk-label'), `<label class="govuk-label " for="input-example">National Insurance number</label>`)
    })

    it('renders label with "for" attribute reffering the input "id"', async () => {
      const $ = await render('input', examples.default)

      const $label = $('.govuk-label')
      equal($label.attr('for'), 'input-example')
    })
  })

  describe('when it includes an autocomplete attribute', () => {
    it('renders the autocomplete attribute', async () => {
      const $ = await render('input', examples['with autocomplete attribute'])

      const $component = $('.govuk-input')
      equal($component.attr('autocomplete'), 'postal-code')
    })
  })

  describe('when it includes an inputmode', () => {
    it('renders with an inputmode attached to the input', async () => {
      const $ = await render('input', examples.inputmode)

      const $component = $('.govuk-form-group > .govuk-input')
      equal($component.attr('inputmode'), 'decimal')
    })
  })

  describe('when it includes a prefix', () => {
    it('renders the input wrapper', async () => {
      const $ = await render('input', examples['with prefix'])

      const $wrapper = $('.govuk-form-group > .govuk-input__wrapper')
      ok($wrapper.length)
    })

    it('renders the prefix inside the wrapper', async () => {
      const $ = await render('input', examples['with prefix'])

      const $prefix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__prefix')
      ok($prefix.length)
    })

    it('renders the text in the prefix', async () => {
      const $ = await render('input', examples['with prefix'])

      const $prefix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__prefix')

      equal($prefix.html(), '£')
    })

    it('allows prefix text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('input', examples['with prefix with html as text'])

      const $prefix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__prefix')

      equal($prefix.html(), '&lt;span&gt;£&lt;/span&gt;')
    })

    it('allows prefix HTML to be passed un-escaped', async () => {
      const $ = await render('input', examples['with prefix with html'])

      const $prefix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__prefix')

      equal($prefix.html(), '<span>£</span>')
    })

    it('hides the prefix from screen readers using the aria-hidden attribute', async () => {
      const $ = await render('input', examples['with prefix'])

      const $prefix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__prefix')
      equal($prefix.attr('aria-hidden'), 'true')
    })

    it('renders with classes', async () => {
      const $ = await render('input', examples['with prefix with classes'])

      const $prefix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__prefix')
      ok($prefix.hasClass('app-input__prefix--custom-modifier'))
    })

    it('renders with attributes', async () => {
      const $ = await render('input', examples['with prefix with attributes'])

      const $prefix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__prefix')
      equal($prefix.attr('data-attribute'), 'value')
    })
  })

  describe('when it includes a suffix', () => {
    it('renders the input wrapper', async () => {
      const $ = await render('input', examples['with suffix'])

      const $wrapper = $('.govuk-form-group > .govuk-input__wrapper')
      ok($wrapper.length)
    })

    it('renders the suffix inside the wrapper', async () => {
      const $ = await render('input', examples['with suffix'])

      const $suffix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__suffix')
      ok($suffix.length)
    })

    it('renders the text in the prefix', async () => {
      const $ = await render('input', examples['with prefix'])

      const $prefix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__prefix')

      equal($prefix.html(), '£')
    })

    it('allows suffix text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('input', examples['with suffix with html as text'])

      const $suffix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__suffix')

      equal($suffix.html(), '&lt;span&gt;kg&lt;/span&gt;')
    })

    it('allows suffix HTML to be passed un-escaped', async () => {
      const $ = await render('input', examples['with suffix with html'])

      const $suffix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__suffix')

      equal($suffix.html(), '<span>kg</span>')
    })

    it('hides the suffix from screen readers using the aria-hidden attribute', async () => {
      const $ = await render('input', examples['with suffix'])

      const $suffix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__suffix')
      equal($suffix.attr('aria-hidden'), 'true')
    })

    it('renders with classes', async () => {
      const $ = await render('input', examples['with suffix with classes'])

      const $suffix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__suffix')
      ok($suffix.hasClass('app-input__suffix--custom-modifier'))
    })

    it('renders with attributes', async () => {
      const $ = await render('input', examples['with suffix with attributes'])

      const $suffix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__suffix')
      equal($suffix.attr('data-attribute'), 'value')
    })
  })

  describe('when it includes both a prefix and a suffix', () => {
    it('renders the prefix before the suffix', async () => {
      const $ = await render('input', examples['with prefix and suffix'])

      const $prefixBeforeSuffix = $('.govuk-form-group > .govuk-input__wrapper > .govuk-input__prefix ~ .govuk-input__suffix')
      ok($prefixBeforeSuffix.length)
    })
  })

  describe('when it includes the input wrapper', () => {
    it('renders the input wrapper with custom classes', async () => {
      const $ = await render('input', examples['with customised input wrapper'])

      const $wrapper = $('.govuk-form-group > .govuk-input__wrapper')
      ok($wrapper.hasClass('app-input-wrapper--custom-modifier'))
    })

    it('renders the input wrapper with custom attributes', async () => {
      const $ = await render('input', examples['with customised input wrapper'])

      const $wrapper = $('.govuk-form-group > .govuk-input__wrapper')
      equal($wrapper.attr('data-attribute'), 'value')
    })
  })
})
