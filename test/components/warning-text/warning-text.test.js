import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Warning text', () => {
  let examples

  before(async () => {
    examples = await getExamples('warning-text')
  })

  describe('default example', () => {
    it('renders with text', async () => {
      const $ = await render('warning-text', examples.default)

      const $component = $('.govuk-warning-text')
      ok($component.text().includes('You can be fined up to £5,000 if you don’t register.'))
    })

    it('renders with default assistive text', async () => {
      const $ = await render('warning-text', examples.default)

      const $assistiveText = $('.govuk-visually-hidden')
      equal($assistiveText.text(), 'Warning')
    })

    it('hides the icon from screen readers using the aria-hidden attribute', async () => {
      const $ = await render('warning-text', examples.default)

      const $icon = $('.govuk-warning-text__icon')
      equal($icon.attr('aria-hidden'), 'true')
    })
  })

  describe('custom options', () => {
    it('renders classes', async () => {
      const $ = await render('warning-text', examples.classes)

      const $component = $('.govuk-warning-text')
      ok($component.hasClass('govuk-warning-text--custom-class'))
    })

    it('renders custom assistive text', async () => {
      const $ = await render('warning-text', examples['icon fallback text only'])

      const $assistiveText = $('.govuk-visually-hidden')
      ok($assistiveText.html().includes('Some custom fallback text'))
    })

    it('renders attributes', async () => {
      const $ = await render('warning-text', examples.attributes)

      const $component = $('.govuk-warning-text')
      equal($component.attr('data-test'), 'attribute')
      equal($component.attr('id'), 'my-warning-text')
    })
  })

  describe('html', () => {
    it('renders escaped html when passed to text', async () => {
      const $ = await render('warning-text', examples['html as text'])

      const $component = $('.govuk-warning-text')
      ok($component.html().includes('&lt;span&gt;Some custom warning text&lt;/span&gt;'))
    })

    it('renders html', async () => {
      const $ = await render('warning-text', examples.html)

      const $component = $('.govuk-warning-text')
      ok($component.html().includes('<span>Some custom warning text</span>'))
    })
  })
})
