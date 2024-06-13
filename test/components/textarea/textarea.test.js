import { equal, match, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, htmlWithClassName, render } from '../../helper.js'

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Textarea', () => {
  let examples

  before(async () => {
    examples = await getExamples('textarea')
  })

  describe('default example', () => {
    it('renders with id', async () => {
      const $ = await render('textarea', examples.default)

      const $component = $('.govuk-textarea')
      equal($component.attr('id'), 'more-detail')
    })

    it('renders with name', async () => {
      const $ = await render('textarea', examples.default)

      const $component = $('.govuk-textarea')
      equal($component.attr('name'), 'more-detail')
    })

    it('renders with default number of rows', async () => {
      const $ = await render('textarea', examples.default)

      const $component = $('.govuk-textarea')
      equal($component.attr('rows'), '5')
    })

    it('renders with a form group wrapper', async () => {
      const $ = await render('textarea', examples.default)

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.length)
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      const $ = await render('textarea', examples.classes)

      const $component = $('.govuk-textarea')
      ok($component.hasClass('app-textarea--custom-modifier'))
    })

    it('renders with value', async () => {
      const $ = await render('textarea', examples['with default value'])

      const $component = $('.govuk-textarea')
      equal($component.text(), '221B Baker Street\nLondon\nNW1 6XE\n')
    })

    it('renders with attributes', async () => {
      const $ = await render('textarea', examples.attributes)

      const $component = $('.govuk-textarea')
      equal($component.attr('data-attribute'), 'my data value')
    })

    it('renders with aria-describedby', async () => {
      const $ = await render('textarea', examples['with describedBy'])

      const $component = $('.govuk-textarea')
      equal($component.attr('aria-describedby'), 'test-target-element')
    })

    it('renders with rows', async () => {
      const $ = await render('textarea', examples['with custom rows'])

      const $component = $('.govuk-textarea')
      equal($component.attr('rows'), '8')
    })

    it('renders with a form group wrapper that has extra classes', async () => {
      const $ = await render('textarea', examples['with optional form-group classes'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('extra-class'))
    })
  })

  describe('when it has the spellcheck attribute', () => {
    it('renders with spellcheck attribute set to true', async () => {
      const $ = await render('textarea', examples['with spellcheck enabled'])

      const $component = $('.govuk-textarea')
      equal($component.attr('spellcheck'), 'true')
    })

    it('renders with spellcheck attribute set to false', async () => {
      const $ = await render('textarea', examples['with spellcheck disabled'])

      const $component = $('.govuk-textarea')
      equal($component.attr('spellcheck'), 'false')
    })

    it('renders without spellcheck attribute by default', async () => {
      const $ = await render('textarea', examples.default)

      const $component = $('.govuk-textarea')
      equal($component.attr('spellcheck'), undefined)
    })
  })

  describe('when it includes a hint', () => {
    it('renders with hint', async () => {
      const $ = await render('textarea', examples['with hint'])

      equal(htmlWithClassName($, '.govuk-hint'), `<div class="govuk-hint " id="more-detail-hint">Don't include personal or financial information, eg your National Insurance number or credit card details.</div>`)
    })

    it('associates the textarea as "described by" the hint', async () => {
      const $ = await render('textarea', examples['with hint'])

      const $textarea = $('.govuk-textarea')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`)

      match($textarea.attr('aria-describedby'), describedBy)
    })

    it('associates the textarea as "described by" the hint and parent fieldset', async () => {
      const $ = await render('textarea', examples['with hint and described by'])

      const $textarea = $('.govuk-textarea')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WORD_BOUNDARY}`)

      match($textarea.attr('aria-describedby'), describedBy)
    })
  })

  describe('when it includes an error message', () => {
    it('renders with error message', async () => {
      const $ = await render('textarea', examples['with error message'])

      equal(htmlWithClassName($, '.govuk-error-message'), `<p id="no-ni-reason-error" class="govuk-error-message "> You must provide an explanation</p>`)
    })

    it('associates the textarea as "described by" the error message', async () => {
      const $ = await render('textarea', examples['with error message'])

      const $component = $('.govuk-textarea')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedBy)
    })

    it('associates the textarea as "described by" the error message and parent fieldset', async () => {
      const $ = await render('textarea', examples['with error message and described by'])

      const $component = $('.govuk-textarea')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedBy)
    })

    it('adds the error class to the textarea', async () => {
      const $ = await render('textarea', examples['with error message'])

      const $component = $('.govuk-textarea')
      ok($component.hasClass('govuk-textarea--error'))
    })

    it('renders with a form group wrapper that has an error state', async () => {
      const $ = await render('textarea', examples['with error message'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('govuk-form-group--error'))
    })
  })

  describe('when it includes both a hint and an error message', () => {
    it('associates the textarea as described by both the hint and the error message', async () => {
      const $ = await render('textarea', examples['with hint and error message'])

      const $component = $('.govuk-textarea')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedByCombined)
    })

    it('associates the textarea as described by the hint, error message and parent fieldset', async () => {
      const $ = await render('textarea', examples['with hint, error message and described by'])

      const $component = $('.govuk-textarea')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedByCombined)
    })
  })

  describe('with dependant components', () => {
    it('have correct nesting order', async () => {
      const $ = await render('textarea', examples.default)

      const $component = $('.govuk-form-group > .govuk-textarea')
      ok($component.length)
    })

    it('renders with label', async () => {
      const $ = await render('textarea', examples.default)

      equal(htmlWithClassName($, '.govuk-label'), `<label class="govuk-label " for="more-detail">Can you provide more detail?</label>`)
    })

    it('renders label with "for" attribute reffering the textarea "id"', async () => {
      const $ = await render('textarea', examples.default)

      const $label = $('.govuk-label')
      equal($label.attr('for'), 'more-detail')
    })

    it('renders label as page heading', async () => {
      const $ = await render('textarea', examples['with label as page heading'])

      const $label = $('.govuk-label')
      ok($('.govuk-label-wrapper'))
      equal($label.attr('for'), 'textarea-with-page-heading')
    })
  })

  describe('when it includes an autocomplete attribute', () => {
    it('renders the autocomplete attribute', async () => {
      const $ = await render('textarea', examples['with autocomplete attribute'])

      const $component = $('.govuk-textarea')
      equal($component.attr('autocomplete'), 'street-address')
    })
  })
})
