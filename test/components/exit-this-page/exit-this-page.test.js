import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Exit this page', () => {
  let examples

  before(async () => {
    examples = await getExamples('exit-this-page')
  })

  describe('default example', () => {
    it('renders the default example', async () => {
      const $ = await render('exit-this-page', examples.default)
      const $button = $('.govuk-exit-this-page').find('.govuk-button')

      ok($button.hasClass('govuk-button--warning'))
      ok($button.html().includes('<span class="govuk-visually-hidden">Emergency</span> Exit this page'))
      equal($button.attr('href'), '/full-page-examples/announcements')
      equal($button.attr('rel'), 'nofollow noreferrer')
    })
  })

  describe('Custom options', () => {
    it('renders with custom text', async () => {
      const $ = await render('exit-this-page', examples.testing)
      const $button = $('.govuk-exit-this-page').find('.govuk-button')

      ok($button.text().includes('Exit this test'))
    })

    it('renders with custom HTML', async () => {
      const $ = await render('exit-this-page', examples['testing-html'])
      const $button = $('.govuk-exit-this-page').find('.govuk-button')

      ok($button.html().includes('Exit <em>this</em> test'))
    })

    it('renders with a custom URL', async () => {
      const $ = await render('exit-this-page', examples.testing)
      const $button = $('.govuk-exit-this-page').find('.govuk-button')

      equal($button.attr('href'), 'https://www.test.co.uk')
    })

    it('renders with a custom id', async () => {
      const $ = await render('exit-this-page', examples.testing)
      const $component = $('.govuk-exit-this-page')

      equal($component.attr('id'), 'test-id')
    })

    it('renders with a custom class', async () => {
      const $ = await render('exit-this-page', examples.testing)
      const $component = $('.govuk-exit-this-page')

      ok($component.hasClass('test-class'))
    })

    it('renders with custom attributes', async () => {
      const $ = await render('exit-this-page', examples.testing)
      const $component = $('.govuk-exit-this-page')

      equal($component.attr('test-attribute'), 'true')
    })
  })

  describe('Translated', () => {
    it('renders with translation data attributes', async () => {
      const $ = await render('exit-this-page', examples.translated)
      const $component = $('.govuk-exit-this-page')

      equal($component.attr('data-i18n.activated'), 'Tudalen ymadael')
      equal($component.attr('data-i18n.timed-out'), "Wedi'i amseru")
      equal($component.attr('data-i18n.press-two-more-times'), "Pwyswch 'Shift' 2 gwaith arall")
      equal($component.attr('data-i18n.press-one-more-time'), "Pwyswch 'Shift' 1 mwy o amser")
    })
  })
})
