import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Error message', () => {
  let examples

  before(async () => {
    examples = await getExamples('error-message')
  })

  it('renders with a custom id', async () => {
    const $ = await render('error-message', examples.id)

    const $component = $('.govuk-error-message')
    equal($component.attr('id'), 'my-error-message-id')
  })

  it('allows additional classes to specified', async () => {
    const $ = await render('error-message', examples.classes)

    const $component = $('.govuk-error-message')
    ok($component.hasClass('custom-class'))
  })

  it('allows text to be passed whilst escaping HTML entities', async () => {
    const $ = await render('error-message', examples['html as text'])

    const content = $('.govuk-error-message').html().trim()
    ok(content.includes('Unexpected &gt; in body'))
  })

  it('allows summary HTML to be passed un-escaped', async () => {
    const $ = await render('error-message', examples.html)

    const content = $('.govuk-error-message').html().trim()
    ok(content.includes('Unexpected <b>bold text</b> in body copy'))
  })

  it('allows additional attributes to be specified', async () => {
    const $ = await render('error-message', examples.attributes)

    const $component = $('.govuk-error-message')
    equal($component.attr('data-test'), 'attribute')
    equal($component.attr('id'), 'my-error-message')
  })

  it('includes a visually hidden "Error" prefix by default', async () => {
    const $ = await render('error-message', examples.default)

    const $component = $('.govuk-error-message')
    equal($component.text().trim(), 'Error: Error message about full name goes here')
  })

  it('allows the visually hidden prefix to be customised', async () => {
    const $ = await render('error-message', examples['with visually hidden text'])

    const $component = $('.govuk-error-message')
    equal($component.text().trim(), 'Gwall: Rhowch eich enw llawn')
  })

  it('allows the visually hidden prefix to be removed', async () => {
    const $ = await render('error-message', examples['visually hidden text removed'])

    const $component = $('.govuk-error-message')
    equal($component.text().trim(), 'There is an error on line 42')
  })

  it('allows the visually hidden prefix to be removed and then manually added with HTML', async () => {
    const $ = await render('error-message', examples.translated)

    const $component = $('.govuk-error-message')
    ok($component.html().trim().includes('<span class="govuk-visually-hidden">Gwall:</span> Neges gwall am yr enw llawn yn mynd yma'))
  })
})
