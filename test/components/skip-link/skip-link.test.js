import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Skip link', () => {
  let examples

  before(async () => {
    examples = await getExamples('skip-link')
  })

  describe('default example', () => {
    it('renders text', async () => {
      const $ = await render('skip-link', examples.default)

      const $component = $('.govuk-skip-link')
      equal($component.html(), 'Skip to main content')
    })

    it('renders default href', async () => {
      const $ = await render('skip-link', examples['no href'])

      const $component = $('.govuk-skip-link')
      equal($component.attr('href'), '#content')
    })
  })

  describe('custom options', () => {
    it('renders href', async () => {
      const $ = await render('skip-link', examples['custom href'])

      const $component = $('.govuk-skip-link')
      equal($component.attr('href'), '#custom')
    })

    it('renders text', async () => {
      const $ = await render('skip-link', examples['custom text'])

      const $component = $('.govuk-skip-link')
      equal($component.html(), 'skip')
    })

    it('renders escaped html in text', async () => {
      const $ = await render('skip-link', examples['html as text'])

      const $component = $('.govuk-skip-link')
      equal($component.html(), '&lt;p&gt;skip&lt;/p&gt;')
    })

    it('renders html', async () => {
      const $ = await render('skip-link', examples.html)

      const $component = $('.govuk-skip-link')
      equal($component.html(), '<p>skip</p>')
    })

    it('renders classes', async () => {
      const $ = await render('skip-link', examples.classes)

      const $component = $('.govuk-skip-link')
      ok($component.hasClass('app-skip-link--custom-class'))
    })

    it('renders attributes', async () => {
      const $ = await render('skip-link', examples.attributes)

      const $component = $('.govuk-skip-link')
      equal($component.attr('data-test'), 'attribute')
      equal($component.attr('aria-label'), 'Skip to content')
    })

    it('renders a data-module attribute to initialise JavaScript', async () => {
      const $ = await render('skip-link', examples.default)

      const $component = $('.govuk-skip-link')

      equal($component.attr('data-module'), 'govuk-skip-link')
    })
  })
})
