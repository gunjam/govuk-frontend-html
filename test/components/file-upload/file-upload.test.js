import { equal, match, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, htmlWithClassName, render } from '../../helper.js'

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('File upload', () => {
  let examples

  before(async () => {
    examples = await getExamples('file-upload')
  })

  describe('default example', () => {
    it('renders with id', async () => {
      const $ = await render('file-upload', examples.default)

      const $component = $('.govuk-file-upload')
      equal($component.attr('id'), 'file-upload-1')
    })

    it('renders with name', async () => {
      const $ = await render('file-upload', examples.default)

      const $component = $('.govuk-file-upload')
      equal($component.attr('name'), 'file-upload-1')
    })

    it('renders with a form group wrapper', async () => {
      const $ = await render('file-upload', examples.default)

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.length)
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      const $ = await render('file-upload', examples.classes)

      const $component = $('.govuk-file-upload')
      ok($component.hasClass('app-file-upload--custom-modifier'))
    })

    it('renders with value', async () => {
      const $ = await render('file-upload', examples['with value'])

      const $component = $('.govuk-file-upload')
      equal($component.val(), 'C:\\fakepath\\myphoto.jpg')
    })

    it('renders with aria-describedby', async () => {
      const $ = await render('file-upload', examples['with describedBy'])

      const $component = $('.govuk-file-upload')
      ok($component.attr('aria-describedby').includes('test-target-element'))
    })

    it('renders with attributes', async () => {
      const $ = await render('file-upload', examples.attributes)

      const $component = $('.govuk-file-upload')
      equal($component.attr('accept'), '.jpg, .jpeg, .png')
    })

    it('renders with a form group wrapper that has extra classes', async () => {
      const $ = await render('file-upload', examples['with optional form-group classes'])

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('extra-class'))
    })
  })

  describe('when it includes a hint', () => {
    it('renders with hint', async () => {
      const $ = await render('file-upload', examples['with hint text'])

      equal(
        htmlWithClassName($, '.govuk-hint'),
        `\
<div class="govuk-hint " id="file-upload-2-hint">\
Your photo may be in your Pictures, Photos, Downloads or Desktop folder. Or in an app like iPhoto.\
</div>`
      )
    })

    it('associates the input as "described by" the hint', async () => {
      const $ = await render('file-upload', examples['with hint text'])

      const $component = $('.govuk-file-upload')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedBy)
    })

    it('associates the input as "described by" the hint and parent fieldset', async () => {
      const $ = await render('file-upload', examples['with hint and describedBy'])

      const $component = $('.govuk-file-upload')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedBy)
    })
  })

  describe('when it includes an error message', () => {
    it('renders with error message', async () => {
      const $ = await render('file-upload', examples.error)

      equal(htmlWithClassName($, '.govuk-error-message'), `<p id="file-upload-with-error-error" class="govuk-error-message "> Error message</p>`)
    })

    it('associates the input as "described by" the error message', async () => {
      const $ = await render('file-upload', examples.error)

      const $component = $('.govuk-file-upload')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedBy)
    })

    it('associates the input as "described by" the error message and parent fieldset', async () => {
      const $ = await render('file-upload', examples['with error and describedBy'])

      const $component = $('.govuk-file-upload')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}test-target-element${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedBy)
    })

    it('includes the error class on the component', async () => {
      const $ = await render('file-upload', examples.error)

      const $component = $('.govuk-file-upload')
      ok($component.hasClass('govuk-file-upload--error'))
    })

    it('renders with a form group wrapper that has an error state', async () => {
      const $ = await render('file-upload', examples.error)

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.hasClass('govuk-form-group--error'))
    })
  })

  describe('when it includes both a hint and an error message', () => {
    it('associates the input as described by both the hint and the error message', async () => {
      const $ = await render('file-upload', examples['with error message and hint'])

      const $component = $('.govuk-file-upload')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedByCombined)
    })

    it('associates the input as described by the hint, error message and parent fieldset', async () => {
      const describedById = 'test-target-element'

      const $ = await render('file-upload', examples['with error, describedBy and hint'])

      const $component = $('.govuk-file-upload')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(`${WORD_BOUNDARY}${describedById}${WHITESPACE}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedByCombined)
    })
  })

  describe('with dependant components', () => {
    it('have correct nesting order', async () => {
      const $ = await render('file-upload', examples.error)

      const $component = $('.govuk-form-group > .govuk-file-upload')
      ok($component.length)
    })

    it('renders with label', async () => {
      const $ = await render('file-upload', examples.default)

      equal(htmlWithClassName($, '.govuk-label'), `<label class="govuk-label " for="file-upload-1">Upload a file</label>`)
    })

    it('renders label with "for" attribute reffering the file-upload "id"', async () => {
      const $ = await render('file-upload', examples.default)

      const $label = $('.govuk-label')
      equal($label.attr('for'), 'file-upload-1')
    })
  })
})
