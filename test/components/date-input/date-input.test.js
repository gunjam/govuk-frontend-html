import { equal, match, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, htmlWithClassName, render } from '../../helper.js'

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Date input', () => {
  let examples

  before(async () => {
    examples = await getExamples('date-input')
  })

  describe('default example', () => {
    it('renders with id', async () => {
      const $ = await render('date-input', examples.default)

      const $component = $('.govuk-date-input')
      equal($component.attr('id'), 'dob')
    })

    it('renders default inputs', async () => {
      const $ = await render('date-input', examples.default)

      const $items = $('.govuk-date-input__item')
      equal($items.length, 3)
    })

    it('renders item with capitalised label text', async () => {
      const $ = await render('date-input', examples.default)

      const $firstItems = $('.govuk-date-input__item:first-child')
      equal($firstItems.text().trim(), 'Day')
    })

    it('renders inputs with type="text"', async () => {
      const $ = await render('date-input', examples.default)

      const $firstInput = $('.govuk-date-input__item:first-child input')
      equal($firstInput.attr('type'), 'text')
    })

    it('renders inputs with inputmode="numeric"', async () => {
      const $ = await render('date-input', examples.default)

      const $firstInput = $('.govuk-date-input__item:first-child input')
      equal($firstInput.attr('inputmode'), 'numeric')
    })

    it('renders item with implicit class for label', async () => {
      const $ = await render('date-input', examples.default)

      const $firstItems = $('.govuk-date-input__item:first-child label')
      ok($firstItems.hasClass('govuk-date-input__label'))
    })

    it('renders item with implicit class for input', async () => {
      const $ = await render('date-input', examples.default)

      const $firstItems = $('.govuk-date-input__item:first-child input')
      ok($firstItems.hasClass('govuk-date-input__input'))
    })

    it('renders with a form group wrapper', async () => {
      const $ = await render('date-input', examples.default)

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.length)
    })
  })

  describe('items', () => {
    it('renders defaults when an empty item array is provided', async () => {
      const $ = await render('date-input', examples['with empty items'])

      const $items = $('.govuk-date-input__item')
      equal($items.length, 3)
    })

    it('renders with default items', async () => {
      const $ = await render('date-input', examples.default)

      const $items = $('.govuk-date-input__item')
      const $firstItemInput = $('.govuk-date-input:first-child .govuk-date-input__input')

      equal($items.length, 3)
      equal($firstItemInput.attr('name'), 'day')
    })

    it('renders item with suffixed name for input', async () => {
      const $ = await render('date-input', examples['complete question'])

      const $firstItems = $('.govuk-date-input__item:first-child input')
      equal($firstItems.attr('name'), 'dob-day')
    })

    it('renders items with id', async () => {
      const $ = await render('date-input', examples['with id on items'])

      const $firstItems = $('.govuk-date-input__item:first-child input')
      equal($firstItems.attr('id'), 'day')
    })

    it('renders item with suffixed id for input', async () => {
      const $ = await render('date-input', examples['suffixed id'])

      const $firstItems = $('.govuk-date-input__item:first-child input')
      equal($firstItems.attr('id'), 'my-date-input-day')
    })

    it('renders items with value', async () => {
      const $ = await render('date-input', examples['with values'])

      const $lastItems = $('.govuk-date-input__item:last-child input')
      equal($lastItems.val(), '2018')
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      const $ = await render('date-input', examples.classes)

      const $component = $('.govuk-date-input')
      ok($component.hasClass('app-date-input--custom-modifier'))
    })

    it('renders with attributes', async () => {
      const $ = await render('date-input', examples.attributes)

      const $component = $('.govuk-date-input')
      equal($component.attr('data-attribute'), 'my data value')
    })

    it('renders with item attributes', async () => {
      const $ = await render('date-input', examples['with input attributes'])

      const $input1 = $('.govuk-date-input__item:nth-of-type(1) input')
      const $input2 = $('.govuk-date-input__item:nth-of-type(2) input')
      const $input3 = $('.govuk-date-input__item:nth-of-type(3) input')

      equal($input1.attr('data-example-day'), 'day')
      equal($input2.attr('data-example-month'), 'month')
      equal($input3.attr('data-example-year'), 'year')
    })

    it('renders items with name', async () => {
      const $ = await render('date-input', examples['with nested name'])

      const $firstItems = $('.govuk-date-input__item:first-child input')
      equal($firstItems.attr('name'), 'day[dd]')
    })

    it('renders inputs with custom pattern attribute', async () => {
      const $ = await render('date-input', examples['custom pattern'])

      const $firstInput = $('.govuk-date-input__item:first-child input')
      equal($firstInput.attr('pattern'), '[0-8]*')
    })

    it('renders inputs with custom inputmode="text"', async () => {
      const $ = await render('date-input', examples['custom inputmode'])

      const $firstInput = $('.govuk-date-input__item:first-child input')
      equal($firstInput.attr('inputmode'), 'text')
    })

    it('renders with a form group wrapper that has extra classes', async () => {
      const $ = await render('date-input', examples['with optional form-group classes'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('extra-class'))
    })
  })

  describe('when it includes a hint', () => {
    it('renders the hint', async () => {
      const $ = await render('date-input', examples['complete question'])
      equal(htmlWithClassName($, '.govuk-hint'), `<div class="govuk-hint " id="dob-hint">For example, 31 3 1980</div>`)
    })

    it('associates the fieldset as "described by" the hint', async () => {
      const $ = await render('date-input', examples['complete question'])

      const $fieldset = $('.govuk-fieldset')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedBy)
    })

    it('associates the fieldset as "described by" the hint and parent fieldset', async () => {
      const $ = await render('date-input', examples['with hint and describedBy'])

      const $fieldset = $('.govuk-fieldset')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedBy)
    })
  })

  describe('when it includes an error message', () => {
    it('renders the error message', async () => {
      const $ = await render('date-input', examples['with errors only'])
      equal(htmlWithClassName($, '.govuk-error-message'), `<p id="dob-errors-error" class="govuk-error-message "> Error message goes here</p>`)
    })

    it('uses the id as a prefix for the error message id', async () => {
      const $ = await render('date-input', examples['with errors only'])

      const $errorMessage = $('.govuk-error-message')

      equal($errorMessage.attr('id'), 'dob-errors-error')
    })

    it('associates the fieldset as "described by" the error message', async () => {
      const $ = await render('date-input', examples['with errors only'])

      const $fieldset = $('.govuk-fieldset')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedBy)
    })

    it('associates the fieldset as "described by" the error message and parent fieldset', async () => {
      const $ = await render('date-input', examples['with error and describedBy'])

      const $fieldset = $('.govuk-fieldset')

      ok($fieldset.attr('aria-describedby').includes('test-target-element dob-errors-error'))
    })

    it('renders with a form group wrapper that has an error state', async () => {
      const $ = await render('date-input', examples['with errors only'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('govuk-form-group--error'))
    })
  })

  describe('when they include both a hint and an error message', () => {
    it('sets the `group` role on the fieldset to force JAWS18 to announce the hint and error message', async () => {
      const $ = await render('date-input', examples['with errors and hint'])

      const $fieldset = $('.govuk-fieldset')

      equal($fieldset.attr('role'), 'group')
    })

    it('associates the fieldset as described by both the hint and the error message', async () => {
      const $ = await render('date-input', examples['with errors and hint'])

      const $fieldset = $('.govuk-fieldset')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedByCombined)
    })

    it('associates the fieldset as described by the hint, error message and parent fieldset', async () => {
      const $ = await render('date-input', examples['with errors and hint'])

      const $fieldset = $('.govuk-fieldset')

      ok($fieldset.attr('aria-describedby').includes('dob-errors-hint dob-errors-error'))
    })
  })

  describe('nested dependant components', () => {
    it('have correct nesting order', async () => {
      const $ = await render('date-input', examples['complete question'])

      const $component = $('.govuk-form-group > .govuk-fieldset > .govuk-date-input')
      ok($component.length)
    })

    it('passes through label params without breaking', async () => {
      const $ = await render('date-input', examples.default)

      equal(
        htmlWithClassName($, '.govuk-date-input__label'),
        `\
<label class="govuk-label govuk-date-input__label" for="dob-day">Day</label>\
<label class="govuk-label govuk-date-input__label" for="dob-month">Month</label>\
<label class="govuk-label govuk-date-input__label" for="dob-year">Year</label>`
      )
    })

    it('passes through fieldset params without breaking', async () => {
      const $ = await render('date-input', examples['complete question'])

      equal(
        htmlWithClassName($, '.govuk-fieldset'),
        `\
<fieldset class="govuk-fieldset " role="group" aria-describedby="dob-hint">
  <legend class="govuk-fieldset__legend ">
      What is your date of birth?
    </legend>
${'  '}
</fieldset>`
      )
    })
  })

  it('passes through html fieldset params without breaking', async () => {
    const $ = await render('date-input', examples['fieldset html'])

    equal(
      htmlWithClassName($, '.govuk-fieldset'),
      `\
<fieldset class="govuk-fieldset " role="group">
  <legend class="govuk-fieldset__legend ">
      What is your <b>date of birth</b>?
    </legend>
${'  '}
</fieldset>`
    )
  })

  it('can have classes for individual items', async () => {
    const $ = await render('date-input', examples['items with classes'])

    const $dayInput = $('[name="day"]')
    const $monthInput = $('[name="month"]')
    const $yearInput = $('[name="year"]')
    ok($dayInput.hasClass('app-date-input__day'))
    ok($monthInput.hasClass('app-date-input__month'))
    ok($yearInput.hasClass('app-date-input__year'))
  })

  it('does not set classes as undefined if none are defined', async () => {
    const $ = await render('date-input', examples['items without classes'])

    const $dayInput = $('[name="day"]')
    const $monthInput = $('[name="month"]')
    const $yearInput = $('[name="year"]')
    equal($dayInput.hasClass('undefined'), false)
    equal($monthInput.hasClass('undefined'), false)
    equal($yearInput.hasClass('undefined'), false)
  })

  describe('when it includes autocomplete attributes', () => {
    it('renders the autocomplete attribute', async () => {
      const $ = await render('date-input', examples['with autocomplete values'])

      const $firstItems = $('.govuk-date-input__item:first-child input')
      equal($firstItems.attr('autocomplete'), 'bday-day')
    })
  })
})
