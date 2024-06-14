import { equal, match, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, htmlWithClassName, render } from '../../helper.js'

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Select', () => {
  let examples

  before(async () => {
    examples = await getExamples('select')
  })

  describe('by default', () => {
    it('renders with id', async () => {
      const $ = await render('select', examples.default)

      const $component = $('.govuk-select')
      equal($component.attr('id'), 'select-1')
    })

    it('renders with name', async () => {
      const $ = await render('select', examples.default)

      const $component = $('.govuk-select')
      equal($component.attr('name'), 'select-1')
    })

    it('renders with items', async () => {
      const $ = await render('select', examples.default)
      const $items = $('.govuk-select option')
      equal($items.length, 3)
    })

    it('includes the value attribute', async () => {
      const $ = await render('select', examples.default)

      const $firstItem = $('.govuk-select option:first-child')
      equal($firstItem.attr('value'), '1')
    })

    it('includes the value attribute when the value option is an empty string', async () => {
      const $ = await render('select', examples['with falsey values'])

      const $firstItem = $('.govuk-select option:nth(0)')
      equal($firstItem.attr('value'), '')
    })

    it('includes the value attribute when the value option is false', async () => {
      const $ = await render('select', examples['with falsey values'])

      const $secondItem = $('.govuk-select option:nth(1)')
      equal($secondItem.attr('value'), 'false')
    })

    it('includes the value attribute when the value option is 0', async () => {
      const $ = await render('select', examples['with falsey values'])

      const $thirdItem = $('.govuk-select option:nth(2)')
      equal($thirdItem.attr('value'), '0')
    })

    it('omits the value attribute if no value option is provided', async () => {
      const $ = await render('select', examples['without values'])

      const $firstItem = $('.govuk-select option:first-child')
      // Ideally we'd test for $firstItem.attr('value') == undefined but it's
      // broken in Cheerio – https://github.com/cheeriojs/cheerio/issues/3237
      equal($firstItem.toString().includes('value'), false)
    })

    it('renders item with text', async () => {
      const $ = await render('select', examples.default)

      const $firstItem = $('.govuk-select option:first-child')
      equal($firstItem.text(), 'GOV.UK frontend option 1')
    })

    it('renders item with selected', async () => {
      const $ = await render('select', examples.default)

      const $selectedItem = $('.govuk-select option:nth-child(2)')
      ok($selectedItem.attr('selected'))
    })

    it('selects options using selected value', async () => {
      const $ = await render('select', examples['with selected value'])

      const $selectedItem = $('option[value="2"]')
      ok($selectedItem.attr('selected'))
    })

    it('selects options with implicit value using selected value', async () => {
      const $ = await render('select', examples['without values with selected value'])

      const $selectedItem = $("option:contains('Green')")
      ok($selectedItem.attr('selected'))
    })

    it('allows item.selected to override value', async () => {
      const $ = await render('select', examples['item selected overrides value'])

      const $selectedItem = $('option[value="green"]')
      equal($selectedItem.attr('selected'), undefined)
    })

    it('renders item with disabled', async () => {
      const $ = await render('select', examples.default)

      const $disabledItem = $('.govuk-select option:last-child')
      ok($disabledItem.attr('disabled'))
    })

    it('renders with a form group wrapper', async () => {
      const $ = await render('select', examples.default)

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.length)
    })

    it('renders with a form group wrapper that has extra classes', async () => {
      const $ = await render('select', examples['with optional form-group classes'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('extra-class'))
    })

    it('renders without falsely items', async () => {
      const $ = await render('select', examples['with falsey items'])

      const $items = $('.govuk-select option')
      equal($items.length, 2)
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      const $ = await render('select', examples['with full width override'])

      const $component = $('.govuk-select')
      ok($component.hasClass('govuk-!-width-full'))
    })

    it('renders with aria-describedby', async () => {
      const $ = await render('select', examples['with describedBy'])

      const $component = $('.govuk-select')
      ok($component.attr('aria-describedby').includes('test-target-element'))
    })

    it('renders with attributes', async () => {
      const $ = await render('select', examples.attributes)

      const $component = $('.govuk-select')
      equal($component.attr('data-attribute'), 'my data value')
    })

    it('renders with attributes on items', async () => {
      const $ = await render('select', examples['attributes on items'])

      const $component = $('.govuk-select')

      const $firstInput = $component.find('option:first-child')
      equal($firstInput.attr('data-attribute'), 'ABC')
      equal($firstInput.attr('data-second-attribute'), 'DEF')

      const $secondInput = $component.find('option:last-child')
      equal($secondInput.attr('data-attribute'), 'GHI')
      equal($secondInput.attr('data-second-attribute'), 'JKL')
    })
  })

  describe('when it includes a hint', () => {
    it('renders the hint', async () => {
      const $ = await render('select', examples.hint)

      equal(htmlWithClassName($, '.govuk-hint'), `<div class="govuk-hint " id="select-with-hint-hint">Hint text goes here</div>`)
    })

    it('associates the select as "described by" the hint', async () => {
      const $ = await render('select', examples.hint)

      const $select = $('.govuk-select')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`)

      match($select.attr('aria-describedby'), describedBy)
    })

    it('associates the select as "described by" the hint and parent fieldset', async () => {
      const $ = await render('select', examples['hint and describedBy'])

      const $select = $('.govuk-select')

      ok($select.attr('aria-describedby').includes('test-target-element'))
    })
  })

  describe('when it includes an error message', () => {
    it('renders with error message', async () => {
      const $ = await render('select', examples.error)

      equal(htmlWithClassName($, '.govuk-error-message'), `<p id="select-with-error-error" class="govuk-error-message "> Error message</p>`)
    })

    it('associates the select as "described by" the error message', async () => {
      const $ = await render('select', examples.error)

      const $input = $('.govuk-select')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`)

      match($input.attr('aria-describedby'), describedBy)
    })

    it('associates the select as "described by" the error message and parent fieldset', async () => {
      const $ = await render('select', examples['error and describedBy'])

      const $input = $('.govuk-select')

      ok($input.attr('aria-describedby').includes('test-target-element'))
    })

    it('adds the error class to the select', async () => {
      const $ = await render('select', examples.error)

      const $component = $('.govuk-select')
      ok($component.hasClass('govuk-select--error'))
    })

    it('renders with a form group wrapper that has an error state', async () => {
      const $ = await render('select', examples.error)

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('govuk-form-group--error'))
    })
  })

  describe('when it includes both a hint and an error message', () => {
    it('associates the select as described by both the hint and the error message', async () => {
      const $ = await render('select', examples['with hint text and error message'])

      const $component = $('.govuk-select')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedByCombined)
    })

    it('associates the select as described by the hint, error message and parent fieldset', async () => {
      const $ = await render('select', examples['with hint text and error message'])

      const $component = $('.govuk-select')

      ok($component.attr('aria-describedby').includes('select-2-hint select-2-error'))
    })
  })

  describe('with dependant components', () => {
    it('have correct nesting order', async () => {
      const $ = await render('select', examples['with hint text and error message'])

      const $component = $('.govuk-form-group > .govuk-select')
      ok($component.length)
    })

    it('renders with label', async () => {
      const $ = await render('select', examples.default)

      equal(htmlWithClassName($, '.govuk-label'), `<label class="govuk-label " for="select-1">Label text goes here</label>`)
    })

    it('renders label with "for" attribute reffering the select "id"', async () => {
      const $ = await render('select', examples.default)

      const $label = $('.govuk-label')
      equal($label.attr('for'), 'select-1')
    })
  })
})
