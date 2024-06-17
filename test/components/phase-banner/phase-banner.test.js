import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, htmlWithClassName, render } from '../../helper.js'

describe('Phase banner', () => {
  let examples

  before(async () => {
    examples = await getExamples('phase-banner')
  })

  describe('by default', () => {
    it('allows additional classes to be added to the component', async () => {
      const $ = await render('phase-banner', examples.classes)

      const $component = $('.govuk-phase-banner')
      ok($component.hasClass('extra-class one-more-class'))
    })

    it('renders banner text', async () => {
      const $ = await render('phase-banner', examples.text)
      const phaseBannerText = $('.govuk-phase-banner__text').text().trim()

      equal(phaseBannerText, 'This is a new service – your feedback will help us to improve it')
    })

    it('allows body text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('phase-banner', examples['html as text'])

      const phaseBannerText = $('.govuk-phase-banner__text').html().trim()
      equal(phaseBannerText, 'This is a new service - your &lt;a href="#" class="govuk-link"&gt;feedback&lt;/a&gt; will help us to improve it.')
    })

    it('allows body HTML to be passed un-escaped', async () => {
      const $ = await render('phase-banner', examples.default)

      const phaseBannerText = $('.govuk-phase-banner__text').html().trim()
      equal(phaseBannerText, 'This is a new service - your <a href="#" class="govuk-link">feedback</a> will help us to improve it.')
    })

    it('allows additional attributes to be added to the component', async () => {
      const $ = await render('phase-banner', examples.attributes)

      const $component = $('.govuk-phase-banner')
      equal($component.attr('first-attribute'), 'foo')
      equal($component.attr('second-attribute'), 'bar')
    })
  })

  describe('with dependant components', () => {
    it('renders the tag component text', async () => {
      const $ = await render('phase-banner', examples.default)

      equal(
        htmlWithClassName($, '.govuk-phase-banner__content__tag'),
        `\
<strong class="govuk-tag govuk-phase-banner__content__tag">
  Alpha
</strong>`
      )
    })

    it('renders the tag component html', async () => {
      const $ = await render('phase-banner', examples['tag html'])

      equal(
        htmlWithClassName($, '.govuk-phase-banner__content__tag'),
        `\
<strong class="govuk-tag govuk-phase-banner__content__tag">
  <em>Alpha</em>
</strong>`
      )
    })

    it('renders the tag component classes', async () => {
      const $ = await render('phase-banner', examples['tag classes'])

      equal(
        htmlWithClassName($, '.govuk-phase-banner__content__tag'),
        `\
<strong class="govuk-tag govuk-phase-banner__content__tag govuk-tag--grey">
  Alpha
</strong>`
      )
    })
  })
})
