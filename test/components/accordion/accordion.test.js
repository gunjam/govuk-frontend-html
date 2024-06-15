import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Accordion', () => {
  let examples

  before(async () => {
    examples = await getExamples('accordion')
  })

  describe('default example', () => {
    it('renders with heading button text', async () => {
      const $ = await render('accordion', examples.default)
      const $componentHeadingButton = $('.govuk-accordion__section-button')

      equal($componentHeadingButton.html().trim(), 'Section A')
    })

    it('renders with content as text, wrapped in styled paragraph', async () => {
      const $ = await render('accordion', examples.default)
      const $componentContent = $('.govuk-accordion__section-content').first()

      ok($componentContent.find('p').hasClass('govuk-body'))
      equal($componentContent.text().trim(), 'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.')
    })

    it('renders with content as html', async () => {
      const $ = await render('accordion', examples.default)
      const $componentContent = $('.govuk-accordion__section-content').last()

      equal($componentContent.find('p.gvouk-body').length, 0)
      equal($componentContent.text().trim(), 'Example item 2')
    })

    it('renders with id', async () => {
      const $ = await render('accordion', examples.default)

      const $component = $('.govuk-accordion')
      equal($component.attr('id'), 'default-example')
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      const $ = await render('accordion', examples.classes)

      const $component = $('.govuk-accordion')
      ok($component.hasClass('myClass'))
    })

    it('renders with attributes', async () => {
      const $ = await render('accordion', examples.attributes)
      const $component = $('.govuk-accordion')
      equal($component.attr('data-attribute'), 'value')
    })

    it('renders with specified heading level', async () => {
      const $ = await render('accordion', examples['custom heading level'])
      const $componentHeading = $('.govuk-accordion__section-heading')

      equal($componentHeading.get(0).tagName, 'h3')
    })

    it('renders with heading button html', async () => {
      const $ = await render('accordion', examples['heading html'])
      const $componentHeadingButton = $('.govuk-accordion__section-button')

      equal($componentHeadingButton.html().trim(), '<span class="myClass">Section A</span>')
    })

    it('renders with section expanded class', async () => {
      const $ = await render('accordion', examples['with one section open'])
      const $componentSection = $('.govuk-accordion__section').first()

      ok($componentSection.hasClass('govuk-accordion__section--expanded'))
    })

    it('renders with summary', async () => {
      const $ = await render('accordion', examples['with additional descriptions'])
      const $componentSummary = $('.govuk-accordion__section-summary').first()

      equal($componentSummary.text().trim(), 'Additional description')
    })

    it('renders list without falsely values', async () => {
      const $ = await render('accordion', examples['with falsey values'])
      const $component = $('.govuk-accordion')
      const $items = $component.find('.govuk-accordion__section')

      equal($items.length, 2)
    })

    it('renders with localisation data attributes', async () => {
      const $ = await render('accordion', examples['with translations'])
      const $component = $('.govuk-accordion')

      equal($component.attr('data-i18n.hide-all-sections'), 'Collapse all sections')
      equal($component.attr('data-i18n.show-all-sections'), 'Expand all sections')
      equal($component.attr('data-i18n.hide-section'), 'Collapse')
      equal($component.attr('data-i18n.hide-section-aria-label'), 'Collapse this section')
      equal($component.attr('data-i18n.show-section'), 'Expand')
      equal($component.attr('data-i18n.show-section-aria-label'), 'Expand this section')
    })

    it('renders with remember expanded data attribute', async () => {
      const $ = await render('accordion', examples['with remember expanded off'])
      const $component = $('.govuk-accordion')

      equal($component.attr('data-remember-expanded'), 'false')
    })
  })
})
