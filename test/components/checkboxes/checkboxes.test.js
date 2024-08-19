import { equal, match, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, htmlWithClassName, render } from '../../helper.js'

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Checkboxes', () => {
  let examples

  before(async () => {
    examples = await getExamples('checkboxes')
  })

  it('render example with minimum required name and items', async () => {
    const $ = await render('checkboxes', examples.default)

    const $component = $('.govuk-checkboxes')

    const $firstInput = $component.find('.govuk-checkboxes__item:first-child input')
    const $firstLabel = $component.find('.govuk-checkboxes__item:first-child label')
    equal($firstInput.attr('name'), 'nationality')
    equal($firstInput.val(), 'british')
    ok($firstLabel.text().includes('British'))

    const $lastInput = $component.find('.govuk-checkboxes__item:last-child input')
    const $lastLabel = $component.find('.govuk-checkboxes__item:last-child label')
    equal($lastInput.attr('name'), 'nationality')
    equal($lastInput.val(), 'other')
    ok($lastLabel.text().includes('Citizen of another country'))
  })

  it('render example without falsy values', async () => {
    const $ = await render('checkboxes', examples['with falsy values'])

    const $component = $('.govuk-checkboxes')
    const $items = $component.find('.govuk-checkboxes__item')

    equal($items.length, 2)
  })

  it('render example with a divider and ‘None’ checkbox with exclusive behaviour', async () => {
    const $ = await render('checkboxes', examples['with divider and None'])

    const $component = $('.govuk-checkboxes')

    const $divider = $component.find('.govuk-checkboxes__divider').first()
    equal($divider.text().trim(), 'or')

    const $items = $component.find('.govuk-checkboxes__item')
    equal($items.length, 4)

    const $orItemInput = $items.last().find('input').first()
    equal($orItemInput.attr('data-behaviour'), 'exclusive')
  })

  it('render additional label classes', async () => {
    const $ = await render('checkboxes', examples['with label classes'])

    const $component = $('.govuk-checkboxes')
    const $label = $component.find('.govuk-checkboxes__item label')
    ok($label.hasClass('bold'))
  })

  it('render classes', async () => {
    const $ = await render('checkboxes', examples.classes)

    const $component = $('.govuk-checkboxes')

    ok($component.hasClass('app-checkboxes--custom-modifier'))
  })

  it('renders initial aria-describedby on fieldset', async () => {
    const $ = await render('checkboxes', examples['with fieldset describedBy'])

    const $fieldset = $('.govuk-fieldset')
    ok($fieldset.attr('aria-describedby').includes('test-target-element'))
  })

  it('render attributes', async () => {
    const $ = await render('checkboxes', examples.attributes)

    const $component = $('.govuk-checkboxes')

    equal($component.attr('data-attribute'), 'value')
    equal($component.attr('data-second-attribute'), 'second-value')
  })

  it('renders with a form group wrapper', async () => {
    const $ = await render('checkboxes', examples.default)

    const $formGroup = $('.govuk-form-group')
    ok($formGroup.length)
  })

  it('render a custom class on the form group', async () => {
    const $ = await render('checkboxes', examples['with optional form-group classes showing group error'])

    const $formGroup = $('.govuk-form-group')
    ok($formGroup.hasClass('govuk-form-group--error'))
  })

  describe('items', () => {
    it('render a matching label and input using name by default', async () => {
      const $ = await render('checkboxes', examples.default)

      const $component = $('.govuk-checkboxes')

      const $firstInput = $component.find('.govuk-checkboxes__item:first-child input')
      const $firstLabel = $component.find('.govuk-checkboxes__item:first-child label')
      equal($firstInput.attr('id'), 'nationality')
      equal($firstLabel.attr('for'), 'nationality')

      const $lastInput = $component.find('.govuk-checkboxes__item:last-child input')
      const $lastLabel = $component.find('.govuk-checkboxes__item:last-child label')
      equal($lastInput.attr('id'), 'nationality-3')
      equal($lastLabel.attr('for'), 'nationality-3')
    })

    it('render a matching label and input using custom idPrefix', async () => {
      const $ = await render('checkboxes', examples['with idPrefix'])

      const $component = $('.govuk-checkboxes')

      const $firstInput = $component.find('.govuk-checkboxes__item:first-child input')
      const $firstLabel = $component.find('.govuk-checkboxes__item:first-child label')
      equal($firstInput.attr('id'), 'nationality')
      equal($firstLabel.attr('for'), 'nationality')

      const $lastInput = $component.find('.govuk-checkboxes__item:last-child input')
      const $lastLabel = $component.find('.govuk-checkboxes__item:last-child label')
      equal($lastInput.attr('id'), 'nationality-2')
      equal($lastLabel.attr('for'), 'nationality-2')
    })

    it('render explicitly passed item ids', async () => {
      const $ = await render('checkboxes', examples['with id and name'])

      const $component = $('.govuk-checkboxes')

      const $lastInput = $component.find('.govuk-checkboxes__item:last-child input')
      equal($lastInput.attr('id'), 'with-id-and-name-3')

      const $firstInput = $component.find('.govuk-checkboxes__item:first-child input')
      const $firstLabel = $component.find('.govuk-checkboxes__item:first-child label')
      equal($firstInput.attr('id'), 'item_british')
      equal($firstLabel.attr('for'), 'item_british')
    })

    it('render explicitly passed item names', async () => {
      const $ = await render('checkboxes', examples['with id and name'])

      const $component = $('.govuk-checkboxes')

      const $lastInput = $component.find('.govuk-checkboxes__item:last-child input')
      equal($lastInput.attr('name'), 'custom-name-scottish')
    })

    it('render disabled', async () => {
      const $ = await render('checkboxes', examples['with disabled item'])

      const $component = $('.govuk-checkboxes')

      const $disabledInput = $component.find('.govuk-checkboxes__item:last-child input')
      equal($disabledInput.attr('disabled'), 'disabled')
    })

    it('render checked', async () => {
      const $ = await render('checkboxes', examples['with checked item'])

      const $component = $('.govuk-checkboxes')
      const $secondInput = $component.find('.govuk-checkboxes__item:nth-child(2) input')
      const $lastInput = $component.find('.govuk-checkboxes__item:last-child input')
      equal($secondInput.attr('checked'), 'checked')
      equal($lastInput.attr('checked'), 'checked')
    })

    it('checks the checkboxes in values', async () => {
      const $ = await render('checkboxes', examples['with pre-checked values'])

      const $component = $('.govuk-checkboxes')
      const $british = $component.find('input[value="british"]')
      equal($british.attr('checked'), 'checked')

      const $other = $component.find('input[value="other"]')
      equal($other.attr('checked'), 'checked')
    })

    it('allows item.checked to override values', async () => {
      const $ = await render('checkboxes', examples['item checked overrides values'])

      const $green = $('.govuk-checkboxes').find('input[value="green"]')
      equal($green.attr('checked'), undefined)
    })

    describe('when they include attributes', () => {
      it('renders the attributes', async () => {
        const $ = await render('checkboxes', examples['items with attributes'])

        const $component = $('.govuk-checkboxes')

        const $firstInput = $component.find('.govuk-checkboxes__item:first-child input')
        equal($firstInput.attr('data-attribute'), 'ABC')
        equal($firstInput.attr('data-second-attribute'), 'DEF')

        const $lastInput = $component.find('.govuk-checkboxes__item:last-child input')
        equal($lastInput.attr('data-attribute'), 'GHI')
        equal($lastInput.attr('data-second-attribute'), 'JKL')
      })
    })
  })

  describe('when a radio button includes a hint', () => {
    it('renders the hint text', async () => {
      const $ = await render('checkboxes', examples['with hints on items'])

      const $firstHint = $('.govuk-checkboxes__hint').first()
      ok($firstHint.text().trim().includes("You'll have a user ID if you've registered for Self Assessment or filed a tax return online before."))
    })

    it('renders the correct id attribute for the hint', async () => {
      const $ = await render('checkboxes', examples['with hints on items'])

      equal($('.govuk-checkboxes__hint').attr('id'), 'government-gateway-item-hint')
    })

    it('the input describedBy attribute matches the item hint id', async () => {
      const $ = await render('checkboxes', examples['with hints on items'])

      equal($('.govuk-checkboxes__input').attr('aria-describedby'), 'government-gateway-item-hint')
    })
  })

  describe('render conditionals', () => {
    it('hidden by default when not checked', async () => {
      const $ = await render('checkboxes', examples['with conditional items'])

      const $component = $('.govuk-checkboxes')

      const $firstConditional = $component.find('.govuk-checkboxes__conditional').first()
      ok($firstConditional.text().trim().includes('Email address'))
      ok($firstConditional.hasClass('govuk-checkboxes__conditional--hidden'))
    })
    it('visible by default when checked', async () => {
      const $ = await render('checkboxes', examples['with conditional item checked'])

      const $component = $('.govuk-checkboxes')

      const $firstConditional = $component.find('.govuk-checkboxes__conditional').first()
      ok($firstConditional.text().trim().includes('Email address'))
      equal($firstConditional.hasClass('govuk-checkboxes__conditional--hidden'), false)
    })

    it('visible when checked with pre-checked values', async () => {
      const $ = await render('checkboxes', examples['with pre-checked values'])

      const $component = $('.govuk-checkboxes')

      const $firstConditional = $component.find('.govuk-checkboxes__conditional').first()
      ok($firstConditional.text().trim().includes('Country'))
      equal($firstConditional.hasClass('govuk-checkboxes__conditional--hidden'), false)
    })

    it('with association to the input they are controlled by', async () => {
      const $ = await render('checkboxes', examples['with conditional items'])

      const $component = $('.govuk-checkboxes')

      const $lastInput = $component.find('.govuk-checkboxes__input').last()
      const $lastConditional = $component.find('.govuk-checkboxes__conditional').last()

      equal($lastInput.attr('data-aria-controls'), 'conditional-how-contacted-3')
      equal($lastConditional.attr('id'), 'conditional-how-contacted-3')
    })

    it('omits empty conditionals', async () => {
      const $ = await render('checkboxes', examples['empty conditional'])

      const $component = $('.govuk-checkboxes')
      equal($component.find('.govuk-checkboxes__conditional').length, 0)
    })

    it('does not associate checkboxes with empty conditionals', async () => {
      const $ = await render('checkboxes', examples['empty conditional'])

      const $input = $('.govuk-checkboxes__input').first()
      equal($input.attr('data-aria-controls'), undefined)
    })

    // Indentation in nunjucks can mutate the value of textareas, since
    // textarea value is defined between the html tags
    it('does not add space to the input value of textareas inside conditionals', async () => {
      const $ = await render('checkboxes', examples['textarea in conditional'])

      const $textarea = $('#conditional-textarea')
      equal($textarea.text(), 'test\n')
    })
  })

  describe('when they include an error message', () => {
    it('renders the error message', async () => {
      const $ = await render('checkboxes', examples['with error message'])

      equal(htmlWithClassName($, '.govuk-error-message'), `<p id="waste-error" class="govuk-error-message "> Please select an option</p>`)
    })

    it('uses the idPrefix for the error message id if provided', async () => {
      const $ = await render('checkboxes', examples['with error and idPrefix'])

      const errorMessageId = $('.govuk-error-message').attr('id')
      equal(errorMessageId, 'id-prefix-error')
    })

    it('falls back to using the name for the error message id', async () => {
      const $ = await render('checkboxes', examples['with error message'])

      const errorMessageId = $('.govuk-error-message').attr('id')
      equal(errorMessageId, 'waste-error')
    })

    it('associates the fieldset as "described by" the error message', async () => {
      const $ = await render('checkboxes', examples['with fieldset and error message'])

      const $fieldset = $('.govuk-fieldset')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedBy)
    })

    it('associates the fieldset as "described by" the error message and parent fieldset', async () => {
      const $ = await render('checkboxes', examples['with error message and fieldset describedBy'])

      const $fieldset = $('.govuk-fieldset')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedBy)
    })

    it('does not associate each input as "described by" the error message', async () => {
      const $ = await render('checkboxes', examples['with error message and hints on items'])

      const $inputs = $('input')

      $inputs.each((index, input) => {
        let expectedDescribedById = `waste-${index + 1}-item-hint`
        if (index === 0) {
          expectedDescribedById = 'waste-item-hint'
        }
        equal($(input).attr('aria-describedby'), expectedDescribedById)
      })
    })

    it('renders with a form group wrapper that has an error state', async () => {
      const $ = await render('checkboxes', examples['with error message'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('govuk-form-group--error'))
    })
  })

  describe('when the fieldset includes a hint', () => {
    it('renders the hint', async () => {
      const $ = await render('checkboxes', examples['multiple hints'])

      equal(
        htmlWithClassName($, '.govuk-hint'),
        `\
<div class="govuk-hint " id="example-multiple-hints-hint">If you have dual nationality, select all options that are relevant to you.</div>\
<div class="govuk-hint govuk-checkboxes__hint" id="example-multiple-hints-item-hint">Hint for british option here</div>\
<div class="govuk-hint govuk-checkboxes__hint" id="example-multiple-hints-3-item-hint">Hint for other option here</div>`
      )
    })

    it('associates the fieldset as "described by" the hint', async () => {
      const $ = await render('checkboxes', examples['with id and name'])

      const $fieldset = $('.govuk-fieldset')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`)
      match($fieldset.attr('aria-describedby'), describedBy)
    })

    it('associates the fieldset as "described by" the hint and parent fieldset', async () => {
      const $ = await render('checkboxes', examples['with fieldset describedBy'])

      const $fieldset = $('.govuk-fieldset')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedBy)
    })
  })

  describe('when they include both a hint and an error message', () => {
    it('associates the fieldset as described by both the hint and the error message', async () => {
      const $ = await render('checkboxes', examples['with error message and hint'])

      const $fieldset = $('.govuk-fieldset')

      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedByCombined)
    })

    it('associates the fieldset as described by the hint, error message and parent fieldset', async () => {
      const $ = await render('checkboxes', examples['with error, hint and fieldset describedBy'])

      const $fieldset = $('.govuk-fieldset')
      const hintId = $('.govuk-hint').attr('id')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($fieldset.attr('aria-describedby'), describedByCombined)
    })
  })

  describe('nested dependant components', () => {
    it('have correct nesting order', async () => {
      const $ = await render('checkboxes', examples['fieldset params'])

      const $component = $('.govuk-form-group > .govuk-fieldset > .govuk-checkboxes')
      ok($component.length)
    })

    it('passes through label params without breaking', async () => {
      const $ = await render('checkboxes', examples['label with attributes'])

      equal(
        htmlWithClassName($, '.govuk-checkboxes__label'),
        `\
<label class="govuk-label govuk-checkboxes__label" data-attribute="value" data-second-attribute="second-value" for="example-name">\
<b>Option 1</b></label>`
      )
    })

    it('passes through fieldset params without breaking', async () => {
      const $ = await render('checkboxes', examples['fieldset params'])

      equal(
        htmlWithClassName($, '.govuk-fieldset'),
        `\
<fieldset class="govuk-fieldset app-fieldset--custom-modifier" aria-describedby="example-name-error" data-attribute="value" data-second-attribute="second-value">
  <legend class="govuk-fieldset__legend ">
      What is your nationality?
    </legend>
  </fieldset>`
      )
    })

    it('passes through html fieldset params without breaking', async () => {
      const $ = await render('checkboxes', examples['fieldset html params'])

      equal(
        htmlWithClassName($, '.govuk-fieldset'),
        `\
<fieldset class="govuk-fieldset ">
  <legend class="govuk-fieldset__legend ">
      What is your <b>nationality</b>?
    </legend>
  </fieldset>`
      )
    })
  })

  describe('single checkbox without a fieldset', () => {
    it('adds aria-describedby to input if there is an error', async () => {
      const exampleName = "with single option set 'aria-describedby' on input"

      const $ = await render('checkboxes', examples[exampleName])
      const $input = $('input')

      ok($input.attr('aria-describedby').includes('t-and-c-error'))
    })

    it('adds aria-describedby to input if there is an error and parent fieldset', async () => {
      const exampleName = "with single option set 'aria-describedby' on input, and describedBy"

      const $ = await render('checkboxes', examples[exampleName])
      const $input = $('input')

      ok($input.attr('aria-describedby').includes('test-target-element t-and-c-error'))
    })
  })

  describe('single checkbox (with hint) without a fieldset', () => {
    it('adds aria-describedby to input if there is an error and a hint', async () => {
      const exampleName = "with single option (and hint) set 'aria-describedby' on input"

      const $ = await render('checkboxes', examples[exampleName])
      const $input = $('input')

      ok($input.attr('aria-describedby').includes('t-and-c-with-hint-error t-and-c-with-hint-item-hint'))
    })

    it('adds aria-describedby to input if there is an error, hint and parent fieldset', async () => {
      const exampleName = "with single option (and hint) set 'aria-describedby' on input, and describedBy"

      const $ = await render('checkboxes', examples[exampleName])
      const $input = $('input')

      ok($input.attr('aria-describedby').includes('test-target-element t-and-c-with-hint-error t-and-c-with-hint-item-hint'))
    })
  })
})
