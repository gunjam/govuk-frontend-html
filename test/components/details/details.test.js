import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Details', () => {
  let examples

  before(async () => {
    examples = await getExamples('details')
  })

  it('renders a details element', async () => {
    const $ = await render('details', examples.default)

    const $component = $('.govuk-details')
    equal($component.get(0).tagName, 'details')
  })

  it('renders with a custom id', async () => {
    const $ = await render('details', examples.id)

    const $component = $('.govuk-details')
    equal($component.attr('id'), 'my-details-element')
  })

  it('is collapsed by default', async () => {
    const $ = await render('details', examples.default)

    const $component = $('.govuk-details')
    equal($component.attr('open'), undefined)
  })

  it('can be opened by default', async () => {
    const $ = await render('details', examples.expanded)

    const $component = $('.govuk-details')
    ok($component.attr('open'))
  })

  it('includes a nested summary', async () => {
    const $ = await render('details', examples.default)

    // Look for the summary element _within_ the details element
    const $summary = $('.govuk-details .govuk-details__summary')
    equal($summary.get(0).tagName, 'summary')
  })

  it('allows text to be passed whilst escaping HTML entities', async () => {
    const $ = await render('details', examples['html as text'])

    const detailsText = $('.govuk-details__text').html().trim()
    equal(detailsText, 'More about the greater than symbol (&gt;)')
  })

  it('allows HTML to be passed un-escaped', async () => {
    const $ = await render('details', examples.html)

    const detailsText = $('.govuk-details__text').html().trim()
    equal(detailsText, 'More about <b>bold text</b>')
  })

  it('allows summary text to be passed whilst escaping HTML entities', async () => {
    const $ = await render('details', examples['summary html as text'])

    const detailsText = $('.govuk-details__summary-text').html().trim()
    equal(detailsText, 'The greater than symbol (&gt;) is the best')
  })

  it('allows summary HTML to be passed un-escaped', async () => {
    const $ = await render('details', examples['summary html'])

    const detailsText = $('.govuk-details__summary-text').html().trim()
    equal(detailsText, 'Use <b>bold text</b> sparingly')
  })

  it('allows additional classes to be added to the details element', async () => {
    const $ = await render('details', examples.classes)

    const $component = $('.govuk-details')
    ok($component.hasClass('some-additional-class'))
  })

  it('allows additional attributes to be added to the details element', async () => {
    const $ = await render('details', examples.attributes)

    const $component = $('.govuk-details')
    equal($component.attr('data-some-data-attribute'), 'i-love-data')
    equal($component.attr('another-attribute'), 'foo')
  })
})
