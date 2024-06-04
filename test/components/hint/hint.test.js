import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Hint', () => {
  let examples

  before(async () => {
    examples = await getExamples('hint')
  })

  describe('by default', () => {
    it('renders with text', async () => {
      const $ = await render('hint', examples.default)

      const content = $('.govuk-hint').text()
      equal(content, "\n  It's on your National Insurance card, benefit letter, payslip or P60.\nFor example, 'QQ 12 34 56 C'.\n\n")
    })

    it('renders with classes', async () => {
      const $ = await render('hint', examples.classes)

      const $component = $('.govuk-hint')
      ok($component.hasClass('app-hint--custom-modifier'))
    })

    it('renders with id', async () => {
      const $ = await render('hint', examples.id)

      const $component = $('.govuk-hint')
      equal($component.attr('id'), 'my-hint')
    })

    it('allows text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('hint', examples['html as text'])

      const content = $('.govuk-hint').html().trim()
      equal(content, 'Unexpected &lt;strong&gt;bold text&lt;/strong&gt; in body')
    })

    it('allows HTML to be passed un-escaped', async () => {
      const $ = await render('hint', examples['with html'])

      const content = $('.govuk-hint').html().trim()
      equal(
        content,
        `\
It's on your National Insurance card, benefit letter, payslip or <a class="govuk-link" href="#">P60</a>.
For example, 'QQ 12 34 56 C'.`
      )
    })

    it('renders with attributes', async () => {
      const $ = await render('hint', examples.attributes)

      const $component = $('.govuk-hint')
      equal($component.attr('data-attribute'), 'my data value')
    })
  })
})
