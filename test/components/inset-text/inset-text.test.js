import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Inset text', () => {
  let examples

  before(async () => {
    examples = await getExamples('inset-text')
  })

  describe('by default', () => {
    it('renders with classes', async () => {
      const $ = await render('inset-text', examples.classes)

      const $component = $('.govuk-inset-text')
      ok($component.hasClass('app-inset-text--custom-modifier'))
    })

    it('renders with id', async () => {
      const $ = await render('inset-text', examples.id)

      const $component = $('.govuk-inset-text')
      equal($component.attr('id'), 'my-inset-text')
    })

    it('allows text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('inset-text', examples['html as text'])

      const content = $('.govuk-inset-text').html().trim()
      equal(content, 'It can take &lt;b&gt;up to 8 weeks&lt;/b&gt; to register a lasting power of attorney if there are no mistakes in the application.')
    })

    it('allows HTML to be passed un-escaped', async () => {
      const $ = await render('inset-text', examples['with html'])

      const mainContent = $('.govuk-inset-text .govuk-body:first-child').text().trim()

      const warningContent = $('.govuk-inset-text .govuk-warning-text__text').text().trim()

      equal(mainContent, 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.')

      equal(
        warningContent,
        `Warning
    You can be fined up to £5,000 if you don’t register.`
      )
    })

    it('renders with attributes', async () => {
      const $ = await render('inset-text', examples.attributes)

      const $component = $('.govuk-inset-text')
      equal($component.attr('data-attribute'), 'my data value')
    })
  })
})
