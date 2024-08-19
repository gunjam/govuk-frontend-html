import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { document, getExamples, renderHtml } from '../../helper.js'

describe('Accordion', () => {
  let examples

  before(async () => {
    examples = await getExamples('accordion')
  })

  describe('default example', () => {
    before(async () => {
      document.body.innerHTML = await renderHtml('accordion', examples.default)
    })

    it('renders with heading button text', async () => {
      const $componentHeadingButton = document.querySelector('.govuk-accordion__section-button')

      equal($componentHeadingButton.textContent.trim(), 'Section A')
    })

    it('renders with content as text, wrapped in styled paragraph', async () => {
      const $componentContent = document.querySelector('.govuk-accordion__section-content')
      const $paragraph = $componentContent.querySelector('p')

      ok([...$paragraph.classList].includes('govuk-body'))
      equal($componentContent.textContent.trim(), 'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.')
    })

    it('renders with content as html', async () => {
      const $componentContent = document.querySelector('.govuk-accordion__section:last-child .govuk-accordion__section-content')

      equal($componentContent.querySelector('p'), null)
      equal($componentContent.textContent.trim(), 'Example item 2')
    })

    it('renders with id', async () => {
      const $component = document.querySelector('.govuk-accordion')

      equal($component.getAttribute('id'), 'default-example')
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      document.body.innerHTML = await renderHtml('accordion', examples.classes)
      const $component = document.querySelector('.govuk-accordion')

      ok([...$component.classList].includes('myClass'))
    })

    it('renders with attributes', async () => {
      document.body.innerHTML = await renderHtml('accordion', examples.attributes)
      const $component = document.querySelector('.govuk-accordion')

      equal($component.getAttribute('data-attribute'), 'value')
    })

    it('renders with specified heading level', async () => {
      document.body.innerHTML = await renderHtml('accordion', examples['custom heading level'])
      const $componentHeading = document.querySelector('.govuk-accordion__section-heading')

      equal($componentHeading.tagName, 'H3')
    })

    it('renders with heading button html', async () => {
      document.body.innerHTML = await renderHtml('accordion', examples['heading html'])
      const $componentHeadingButton = document.querySelector('.govuk-accordion__section-button')

      ok($componentHeadingButton.innerHTML.includes('<span class="myClass">Section A</span>'))
    })

    it('renders with section expanded class', async () => {
      document.body.innerHTML = await renderHtml('accordion', examples['with one section open'])
      const $componentSection = document.querySelector('.govuk-accordion__section')

      ok([...$componentSection.classList].includes('govuk-accordion__section--expanded'))
    })

    it('renders with summary', async () => {
      document.body.innerHTML = await renderHtml('accordion', examples['with additional descriptions'])
      const $componentSummary = document.querySelector('.govuk-accordion__section-summary')

      equal($componentSummary.textContent.trim(), 'Additional description')
    })

    it('renders list without falsy values', async () => {
      document.body.innerHTML = await renderHtml('accordion', examples['with falsy values'])
      const $sections = document.querySelectorAll('.govuk-accordion__section')

      equal($sections.length, 2)
    })

    it('renders with localisation data attributes', async () => {
      document.body.innerHTML = await renderHtml('accordion', examples['with translations'])
      const $component = document.querySelector('.govuk-accordion')

      equal($component.getAttribute('data-i18n.hide-all-sections'), 'Collapse all sections')

      equal($component.getAttribute('data-i18n.show-all-sections'), 'Expand all sections')

      equal($component.getAttribute('data-i18n.hide-section'), 'Collapse')
      equal($component.getAttribute('data-i18n.hide-section-aria-label'), 'Collapse this section')

      equal($component.getAttribute('data-i18n.show-section'), 'Expand')
      equal($component.getAttribute('data-i18n.show-section-aria-label'), 'Expand this section')
    })

    it('renders with remember expanded data attribute', async () => {
      document.body.innerHTML = await renderHtml('accordion', examples['with remember expanded off'])
      const $component = document.querySelector('.govuk-accordion')

      equal($component.getAttribute('data-remember-expanded'), 'false')
    })
  })
})
