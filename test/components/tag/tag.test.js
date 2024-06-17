import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Tag', () => {
  let examples

  before(async () => {
    examples = await getExamples('tag')
  })

  describe('default example', () => {
    it('renders the default example with strong element and text', async () => {
      const $ = await render('tag', examples.default)

      const $component = $('.govuk-tag')
      equal($component.get(0).tagName, 'strong')
      ok($component.text().includes('Alpha'))
    })

    it('renders classes', async () => {
      const $ = await render('tag', examples.grey)

      const $component = $('.govuk-tag')
      ok($component.hasClass('govuk-tag--grey'))
    })
  })

  describe('custom options', () => {
    it('renders custom text', async () => {
      const $ = await render('tag', examples.grey)

      const $component = $('.govuk-tag')
      ok($component.html().includes('Grey'))
    })

    it('renders attributes', async () => {
      const $ = await render('tag', examples.attributes)

      const $component = $('.govuk-tag')
      equal($component.attr('data-test'), 'attribute')
      equal($component.attr('id'), 'my-tag')
    })
  })

  describe('html', () => {
    it('renders escaped html when passed to text', async () => {
      const $ = await render('tag', examples['html as text'])

      const $component = $('.govuk-tag')
      ok($component.html().includes('&lt;span&gt;Alpha&lt;/span&gt;'))
    })

    it('renders html', async () => {
      const $ = await render('tag', examples.html)

      const $component = $('.govuk-tag')
      ok($component.html().includes('<span>Alpha</span>'))
    })
  })
})
