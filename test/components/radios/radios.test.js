import { equal, match, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, htmlWithClassName, render } from '../../helper.js'

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Radios', () => {
  let examples

  before(async () => {
    examples = await getExamples('radios')
  })

  it('render example with minimum required name and items', async () => {
    const $ = await render('radios', examples.default)

    const $component = $('.govuk-radios')

    const $firstInput = $component.find('.govuk-radios__item:first-child input')
    const $firstLabel = $component.find('.govuk-radios__item:first-child label')
    equal($firstInput.attr('name'), 'example-default')
    equal($firstInput.val(), 'yes')
    ok($firstLabel.text().includes('Yes'))

    const $lastInput = $component.find('.govuk-radios__item:last-child input')
    const $lastLabel = $component.find('.govuk-radios__item:last-child label')
    equal($lastInput.attr('name'), 'example-default')
    equal($lastInput.val(), 'no')
    ok($lastLabel.text().includes('No'))
  })

  it('renders without falsy items', async () => {
    const $ = await render('radios', examples['with falsy items'])

    const $component = $('.govuk-radios')
    const $items = $component.find('.govuk-radios__item input')
    equal($items.length, 2)
  })

  it('render classes', async () => {
    const $ = await render('radios', examples.inline)

    const $component = $('.govuk-radios')

    ok($component.hasClass('govuk-radios--inline'))
  })

  it('renders initial aria-describedby on fieldset', async () => {
    const describedById = 'test-target-element'

    const $ = await render('radios', examples['fieldset with describedBy'])

    const $fieldset = $('.govuk-fieldset')
    equal($fieldset.attr('aria-describedby'), describedById)
  })

  it('render attributes', async () => {
    const $ = await render('radios', examples.attributes)

    const $component = $('.govuk-radios')

    equal($component.attr('data-attribute'), 'value')
    equal($component.attr('data-second-attribute'), 'second-value')
  })

  it('render a custom class on the form group', async () => {
    const $ = await render('radios', examples['with optional form-group classes showing group error'])

    const $formGroup = $('.govuk-form-group')
    ok($formGroup.hasClass('govuk-form-group--error'))
  })

  describe('items', () => {
    it('render a matching label and input using name by default', async () => {
      const $ = await render('radios', examples.default)

      const $component = $('.govuk-radios')

      const $firstInput = $component.find('.govuk-radios__item:first-child input')
      const $firstLabel = $component.find('.govuk-radios__item:first-child label')
      equal($firstInput.attr('id'), 'example-default')
      equal($firstLabel.attr('for'), 'example-default')

      const $lastInput = $component.find('.govuk-radios__item:last-child input')
      const $lastLabel = $component.find('.govuk-radios__item:last-child label')
      equal($lastInput.attr('id'), 'example-default-2')
      equal($lastLabel.attr('for'), 'example-default-2')
    })

    it('render a matching label and input using custom idPrefix', async () => {
      const $ = await render('radios', examples['with idPrefix'])

      const $component = $('.govuk-radios')

      const $firstInput = $component.find('.govuk-radios__item:first-child input')
      const $firstLabel = $component.find('.govuk-radios__item:first-child label')
      equal($firstInput.attr('id'), 'example-id-prefix')
      equal($firstLabel.attr('for'), 'example-id-prefix')

      const $lastInput = $component.find('.govuk-radios__item:last-child input')
      const $lastLabel = $component.find('.govuk-radios__item:last-child label')
      equal($lastInput.attr('id'), 'example-id-prefix-2')
      equal($lastLabel.attr('for'), 'example-id-prefix-2')
    })

    it('render disabled', async () => {
      const $ = await render('radios', examples['with disabled'])

      const $component = $('.govuk-radios')

      const $lastInput = $component.find('input[value="verify"]')
      equal($lastInput.attr('disabled'), 'disabled')
    })

    it('render checked', async () => {
      const $ = await render('radios', examples.prechecked)

      const $component = $('.govuk-radios')
      const $lastInput = $component.find('.govuk-radios__item:last-child input')
      equal($lastInput.attr('checked'), 'checked')
    })

    it('checks the radio that matches value', async () => {
      const $ = await render('radios', examples['prechecked using value'])

      const $component = $('.govuk-radios')
      const $lastInput = $component.find('input[value="no"]')
      equal($lastInput.attr('checked'), 'checked')
    })

    it('allows item.checked to override value', async () => {
      const $ = await render('radios', examples['item checked overrides value'])

      const $green = $('.govuk-radios').find('input[value="green"]')
      equal($green.attr('checked'), undefined)
    })

    describe('when they include attributes', () => {
      it('renders the attributes', async () => {
        const $ = await render('radios', examples['items with attributes'])

        const $component = $('.govuk-radios')

        const $firstInput = $component.find('.govuk-radios__item:first-child input')
        equal($firstInput.attr('data-attribute'), 'ABC')
        equal($firstInput.attr('data-second-attribute'), 'DEF')

        const $lastInput = $component.find('.govuk-radios__item:last-child input')
        equal($lastInput.attr('data-attribute'), 'GHI')
        equal($lastInput.attr('data-second-attribute'), 'JKL')
      })
    })

    describe('when they include a hint', () => {
      it('renders the hint text', async () => {
        const $ = await render('radios', examples['with hints on items'])

        ok($('.govuk-radios__hint').text().includes('You’ll have a user ID if you’ve registered for Self Assessment or filed a tax return online before.'))
      })

      it('renders the correct id attribute for the hint', async () => {
        const $ = await render('radios', examples['with hints on items'])

        equal($('.govuk-radios__hint').attr('id'), 'gateway-item-hint')
      })

      it('the input describedBy attribute matches the item hint id', async () => {
        const $ = await render('radios', examples['with hints on items'])

        equal($('.govuk-radios__input').attr('aria-describedby'), 'gateway-item-hint')
      })
    })

    describe('render conditionals', () => {
      it('hidden by default when not checked', async () => {
        const $ = await render('radios', examples['with conditional items'])

        const $component = $('.govuk-radios')

        const $hiddenConditional = $component.find('.govuk-radios__conditional').first()
        ok($hiddenConditional.text().includes('Email address'))
        ok($hiddenConditional.hasClass('govuk-radios__conditional--hidden'))
      })

      it('visible when checked because of checkedValue', async () => {
        const $ = await render('radios', examples['with conditional items and pre-checked value'])

        const $conditional = $('.govuk-radios__conditional').last()
        ok($conditional.text().includes('Mobile phone number'))
        equal($conditional.hasClass('govuk-radios__conditional--hidden'), false)
      })

      it('visible by default when checked', async () => {
        const $ = await render('radios', examples['with conditional item checked'])

        const $component = $('.govuk-radios')

        const $visibleConditional = $component.find('.govuk-radios__conditional').first()
        ok($visibleConditional.text().includes('Email'))
        equal($visibleConditional.hasClass('govuk-radios__conditional--hidden'), false)
      })

      it('with association to the input they are controlled by', async () => {
        const $ = await render('radios', examples['with conditional items'])

        const $component = $('.govuk-radios')

        const $firstInput = $component.find('.govuk-radios__input').first()
        const $firstConditional = $component.find('.govuk-radios__conditional').first()

        equal($firstInput.attr('data-aria-controls'), 'conditional-how-contacted')
        equal($firstConditional.attr('id'), 'conditional-how-contacted')
      })

      it('omits empty conditionals', async () => {
        const $ = await render('radios', examples['with empty conditional'])

        const $component = $('.govuk-radios')
        equal($component.find('.govuk-radios__conditional').length, 0)
      })

      it('does not associate radios with empty conditionals', async () => {
        const $ = await render('radios', examples['with empty conditional'])

        const $input = $('.govuk-radios__input').first()
        equal($input.attr('data-aria-controls'), undefined)
      })

      // Indentation in nunjucks can mutate the value of textareas, since
      // textarea value is defined between the html tags
      it('does not add space to the input value of textareas inside conditionals', async () => {
        const $ = await render('radios', examples['textarea in conditional'])

        const $textarea = $('#conditional-textarea')
        equal($textarea.text(), 'test\n')
      })
    })

    it('render divider', async () => {
      const $ = await render('radios', examples['with a divider'])

      const $component = $('.govuk-radios')
      const $divider = $component.find('.govuk-radios__divider')
      equal($divider.text(), 'or')
    })

    it('render additional label classes', async () => {
      const $ = await render('radios', examples['label with classes'])

      const $component = $('.govuk-radios')
      const $label = $component.find('.govuk-radios__item label')
      ok($label.hasClass('bold'))
    })

    it('renders with a form group wrapper', async () => {
      const $ = await render('radios', examples.default)

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.length)
    })
  })

  describe('when they include a hint', () => {
    it('renders the hint', async () => {
      const $ = await render('radios', examples['with hints on parent and items'])

      equal(
        htmlWithClassName($, '.govuk-hint'),
        `\
<div class="govuk-hint " id="example-multiple-hints-hint">This includes changing your last name or spelling your name differently.</div>\
<div class="govuk-hint govuk-radios__hint" id="example-multiple-hints-item-hint">Hint for yes option here</div>\
<div class="govuk-hint govuk-radios__hint" id="example-multiple-hints-2-item-hint">Hint for no option here</div>`
      )
    })

    it('associates the fieldset as "described by" the hint', async () => {
      const $ = await render('radios', examples['with hints on parent and items'])

      const $fieldset = $('.govuk-fieldset')

      equal($fieldset.attr('aria-describedby'), 'example-multiple-hints-hint')
    })

    it('associates the fieldset as "described by" the hint and parent fieldset', async () => {
      const $ = await render('radios', examples['with describedBy and hint'])
      const $fieldset = $('.govuk-fieldset')

      equal($fieldset.attr('aria-describedby'), 'test-target-element example-hint-describedby-hint')
    })
  })

  describe('when they include an error message', () => {
    it('renders the error message', async () => {
      const $ = await render('radios', examples['with error message'])

      equal(htmlWithClassName($, '.govuk-error-message'), `<p id="example-error-message-error" class="govuk-error-message "> Please select an option</p>`)
    })

    it('uses the idPrefix for the error message id if provided', async () => {
      const $ = await render('radios', examples['with error message and idPrefix'])
      const $errorMessage = $('.govuk-error-message')

      equal($errorMessage.attr('id'), 'id-prefix-error')
    })

    it('falls back to using the name for the error message id', async () => {
      const $ = await render('radios', examples['with error message'])

      const $errorMessage = $('.govuk-error-message')

      equal($errorMessage.attr('id'), 'example-error-message-error')
    })

    it('associates the fieldset as "described by" the error message', async () => {
      const $ = await render('radios', examples['with fieldset and error message'])

      const $fieldset = $('.govuk-fieldset')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedBy)
    })

    it('associates the fieldset as "described by" the error message and parent fieldset', async () => {
      const $ = await render('radios', examples['with fieldset, error message and describedBy'])

      const $fieldset = $('.govuk-fieldset')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedBy)
    })

    it('renders with a form group wrapper that has an error state', async () => {
      const $ = await render('radios', examples['with error message'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('govuk-form-group--error'))
    })
  })

  describe('when they include both a hint and an error message', () => {
    it('associates the fieldset as described by both the hint and the error message', async () => {
      const $ = await render('radios', examples['with hint and error message'])

      const $fieldset = $('.govuk-fieldset')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedByCombined)
    })

    it('associates the fieldset as described by the hint, error message and parent fieldset', async () => {
      const $ = await render('radios', examples['with hint, error message and describedBy'])

      const $fieldset = $('.govuk-fieldset')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedByCombined)
    })
  })

  describe('nested dependant components', () => {
    it('have correct nesting order', async () => {
      const $ = await render('radios', examples.inline)

      const $component = $('.govuk-form-group > .govuk-fieldset > .govuk-radios')
      ok($component.length)
    })

    it('passes through label params without breaking', async () => {
      const $ = await render('radios', examples['label with attributes'])

      equal(htmlWithClassName($, '.govuk-radios__label'), `<label class="govuk-label govuk-radios__label" data-attribute="value" data-second-attribute="second-value" for="with-label-attributes">Yes</label>`)
    })

    it('passes through fieldset params without breaking', async () => {
      const $ = await render('radios', examples['fieldset params'])

      equal(
        htmlWithClassName($, '.govuk-fieldset'),
        `\
<fieldset class="govuk-fieldset app-fieldset--custom-modifier" aria-describedby="example-fieldset-params-hint" data-attribute="value" data-second-attribute="second-value">
  <legend class="govuk-fieldset__legend ">
      Have you changed your name?
    </legend>
  </fieldset>`
      )
    })

    it('passes through html fieldset params without breaking', async () => {
      const $ = await render('radios', examples['fieldset with html'])

      equal(
        htmlWithClassName($, '.govuk-fieldset'),
        `\
<fieldset class="govuk-fieldset ">
  <legend class="govuk-fieldset__legend ">
      Have <b>you</b> changed your name?
    </legend>
  </fieldset>`
      )
    })
  })
})
