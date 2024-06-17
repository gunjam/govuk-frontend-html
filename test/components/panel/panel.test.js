import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Panel', () => {
  let examples

  before(async () => {
    examples = await getExamples('panel')
  })

  describe('default example', () => {
    it('renders title text', async () => {
      const $ = await render('panel', examples.default)
      const panelTitle = $('.govuk-panel__title').text().trim()

      equal(panelTitle, 'Application complete')
    })

    it('renders title as h1 (as the default heading level)', async () => {
      const $ = await render('panel', examples.default)
      const panelTitleHeadingLevel = $('.govuk-panel__title')[0].name

      equal(panelTitleHeadingLevel, 'h1')
    })

    it('renders body text', async () => {
      const $ = await render('panel', examples.default)
      const panelBodyText = $('.govuk-panel__body').text().trim()

      equal(panelBodyText, 'Your reference number: HDJ2123F')
    })

    it('doesnt render panel body if no body text is passed', async () => {
      const $ = await render('panel', examples['title with no body text'])
      const panelBody = $('.govuk-panel__body').length

      equal(panelBody, 0)
    })
  })

  describe('custom options', () => {
    it('allows title text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('panel', examples['title html as text'])

      const panelTitle = $('.govuk-panel__title').html().trim()
      equal(panelTitle, 'Application &lt;strong&gt;not&lt;/strong&gt; complete')
    })

    it('renders title as specified heading level', async () => {
      const $ = await render('panel', examples['custom heading level'])
      const panelTitleHeadingLevel = $('.govuk-panel__title')[0].name

      equal(panelTitleHeadingLevel, 'h2')
    })

    it('allows title HTML to be passed un-escaped', async () => {
      const $ = await render('panel', examples['title html'])

      const panelTitle = $('.govuk-panel__title').html().trim()
      equal(panelTitle, 'Application <strong>not</strong> complete')
    })

    it('allows body text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('panel', examples['body html as text'])

      const panelBodyText = $('.govuk-panel__body').html().trim()
      equal(panelBodyText, 'Your reference number&lt;br&gt;&lt;strong&gt;HDJ2123F&lt;/strong&gt;')
    })

    it('allows body HTML to be passed un-escaped', async () => {
      const $ = await render('panel', examples['body html'])

      const panelBodyText = $('.govuk-panel__body').html().trim()
      equal(panelBodyText, 'Your reference number<br><strong>HDJ2123F</strong>')
    })

    it('allows additional classes to be added to the component', async () => {
      const $ = await render('panel', examples.classes)

      const $component = $('.govuk-panel')
      ok($component.hasClass('extra-class one-more-class'))
    })

    it('allows additional attributes to be added to the component', async () => {
      const $ = await render('panel', examples.attributes)

      const $component = $('.govuk-panel')
      equal($component.attr('first-attribute'), 'foo')
      equal($component.attr('second-attribute'), 'bar')
    })
  })
})
