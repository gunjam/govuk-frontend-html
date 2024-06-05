import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Label', () => {
  let examples

  before(async () => {
    examples = await getExamples('label')
  })

  describe('by default', () => {
    it('renders a label element', async () => {
      const $ = await render('label', examples.default)

      const $component = $('.govuk-label')
      equal($component.get(0).tagName, 'label')
    })

    it('does not output anything if no html or text is provided', async () => {
      const $ = await render('label', examples.empty)

      const $component = $('.govuk-label')

      equal($component.length, 0)
    })

    it('allows additional classes to be added to the component', async () => {
      const $ = await render('label', examples.classes)

      const $component = $('.govuk-label')
      ok($component.hasClass('extra-class one-more-class'))
    })

    it('renders label text', async () => {
      const $ = await render('label', examples.default)
      const labelText = $('.govuk-label').text().trim()

      equal(labelText, 'National Insurance number')
    })

    it('allows label text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('label', examples['html as text'])

      const labelText = $('.govuk-label').html().trim()
      equal(labelText, 'National Insurance number, &lt;em&gt;NINO&lt;/em&gt;')
    })

    it('allows label HTML to be passed un-escaped', async () => {
      const $ = await render('label', examples.html)

      const labelText = $('.govuk-label').html().trim()
      equal(labelText, 'National Insurance number <em>NINO</em>')
    })

    it('renders for attribute if specified', async () => {
      const $ = await render('label', examples.for)

      const labelForAttr = $('.govuk-label').attr('for')
      equal(labelForAttr, 'test-target-element')
    })

    it('can be nested inside an H1 using isPageHeading', async () => {
      const $ = await render('label', examples['as page heading l'])

      const $selector = $('h1 > .govuk-label')
      ok($selector.length)
    })

    it('allows additional attributes to be added to the component', async () => {
      const $ = await render('label', examples.attributes)

      const $component = $('.govuk-label')
      equal($component.attr('first-attribute'), 'foo')
      equal($component.attr('second-attribute'), 'bar')
    })
  })
})
