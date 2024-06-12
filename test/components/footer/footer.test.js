import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('footer', () => {
  let examples

  before(async () => {
    examples = await getExamples('footer')
  })

  it('renders attributes correctly', async () => {
    const $ = await render('footer', examples.attributes)

    const $component = $('.govuk-footer')
    equal($component.attr('data-test-attribute'), 'value')
    equal($component.attr('data-test-attribute-2'), 'value-2')
  })

  it('renders classes', async () => {
    const $ = await render('footer', examples.classes)

    const $component = $('.govuk-footer')
    ok($component.hasClass('app-footer--custom-modifier'))
  })

  it('renders custom container classes', async () => {
    const $ = await render('footer', examples['with container classes'])

    const $component = $('.govuk-footer')
    const $container = $component.find('.govuk-width-container')

    ok($container.hasClass('app-width-container'))
  })

  describe('meta', () => {
    it('renders heading', async () => {
      const $ = await render('footer', examples['with meta'])

      const $component = $('.govuk-footer')
      const $heading = $component.find('h2.govuk-visually-hidden')
      equal($heading.text(), 'Items')
    })

    it('renders default heading when none supplied', async () => {
      const $ = await render('footer', examples['with empty meta'])

      const $component = $('.govuk-footer')
      const $heading = $component.find('h2.govuk-visually-hidden')
      equal($heading.text(), 'Support links')
    })

    it("doesn't render footer link list when no items are provided", async () => {
      const $ = await render('footer', examples['with empty meta items'])

      equal($('.govuk-footer__inline-list').length, 0)
    })

    it('renders links', async () => {
      const $ = await render('footer', examples['with meta'])

      const $list = $('ul.govuk-footer__inline-list')
      const $items = $list.find('li.govuk-footer__inline-list-item')
      const $firstItem = $items.find('a.govuk-footer__link:first-child')
      equal($items.length, 3)
      equal($firstItem.attr('href'), '#1')
      ok($firstItem.text().includes('Item 1'))
    })

    it('renders custom meta text', async () => {
      const $ = await render('footer', examples['with custom meta'])

      const $custom = $('.govuk-footer__meta-custom')
      ok($custom.text().includes('GOV.UK Prototype Kit v7.0.1'))
    })

    it('renders custom meta html as text', async () => {
      const $ = await render('footer', examples['meta html as text'])

      const $custom = $('.govuk-footer__meta-custom')
      ok($custom.text().includes('GOV.UK Prototype Kit <strong>v7.0.1</strong>'))
    })

    it('renders custom meta html', async () => {
      const $ = await render('footer', examples['with meta html'])

      const $custom = $('.govuk-footer__meta-custom')
      ok($custom.text().includes('GOV.UK Prototype Kit v7.0.1'))
    })

    it('renders attributes on meta links', async () => {
      const $ = await render('footer', examples['with meta item attributes'])

      const $metaLink = $('.govuk-footer__meta .govuk-footer__link')
      equal($metaLink.attr('data-attribute'), 'my-attribute')
      equal($metaLink.attr('data-attribute-2'), 'my-attribute-2')
    })
  })

  describe('navigation', () => {
    it('no items displayed when no item array is provided', async () => {
      const $ = await render('footer', examples['with empty navigation'])

      equal($('.govuk-footer__navigation').length, 0)
    })

    it('renders headings', async () => {
      const $ = await render('footer', examples['with navigation'])

      const $firstSection = $('.govuk-footer__section:first-child')
      const $lastSection = $('.govuk-footer__section:last-child')
      const $firstHeading = $firstSection.find('h2.govuk-footer__heading')
      const $lastHeading = $lastSection.find('h2.govuk-footer__heading')
      equal($firstHeading.text(), 'Two column list')
      equal($lastHeading.text(), 'Single column list')
    })

    it('renders lists of links', async () => {
      const $ = await render('footer', examples['with navigation'])

      const $list = $('ul.govuk-footer__list')
      const $items = $list.find('li.govuk-footer__list-item')
      const $firstItem = $items.find('a.govuk-footer__link:first-child')
      equal($items.length, 9)
      equal($firstItem.attr('href'), '#1')
      ok($firstItem.text().includes('Navigation item 1'))
    })

    it('renders attributes on links', async () => {
      const $ = await render('footer', examples['with navigation item attributes'])

      const $navigationLink = $('.govuk-footer__list .govuk-footer__link')
      equal($navigationLink.attr('data-attribute'), 'my-attribute')
      equal($navigationLink.attr('data-attribute-2'), 'my-attribute-2')
    })

    it('renders lists in columns', async () => {
      const $ = await render('footer', examples['with navigation'])

      const $list = $('ul.govuk-footer__list')
      ok($list.hasClass('govuk-footer__list--columns-2'))
    })

    it('renders one-column section full width by default', async () => {
      const $ = await render('footer', examples['with default width navigation (one column)'])

      const $section = $('.govuk-footer__section')
      ok($section.hasClass('govuk-grid-column-full'))
    })

    it('renders two-column section full width by default', async () => {
      const $ = await render('footer', examples['with default width navigation (two columns)'])

      const $section = $('.govuk-footer__section')
      ok($section.hasClass('govuk-grid-column-full'))
    })

    it('renders section custom width when width specified', async () => {
      const $ = await render('footer', examples['with navigation'])

      const $section = $('.govuk-footer__section')
      ok($section.hasClass('govuk-grid-column-two-thirds'))
    })
  })

  describe('section break', () => {
    it('renders when there is a navigation', async () => {
      const $ = await render('footer', examples['with navigation'])

      const $sectionBreak = $('hr.govuk-footer__section-break')
      ok($sectionBreak.length)
    })

    it('renders nothing when there is only meta', async () => {
      const $ = await render('footer', examples['with meta'])

      const $sectionBreak = $('hr.govuk-footer__section-break')
      equal($sectionBreak.length, 0)
    })
  })

  describe('content licence', () => {
    it('is visible', async () => {
      const $ = await render('footer', examples.default)

      const $licenceMessage = $('.govuk-footer__licence-description')
      ok($licenceMessage.text().includes('Open Government Licence v3.0'))
    })

    it('can be customised with `text` parameter', async () => {
      const $ = await render('footer', examples['with custom text content licence and copyright notice'])

      const $licenceMessage = $('.govuk-footer__licence-description')
      ok($licenceMessage.text().includes('Drwydded y Llywodraeth Agored v3.0'))
    })

    it('can be customised with `html` parameter', async () => {
      const $ = await render('footer', examples['with custom HTML content licence and copyright notice'])

      const $licenceMessage = $('.govuk-footer__licence-description')
      ok($licenceMessage.html().includes('<a class="govuk-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/" rel="license">Drwydded y Llywodraeth Agored v3.0</a>'))
    })

    it('escapes HTML in the `text` parameter', async () => {
      const $ = await render('footer', examples['with HTML passed as text content'])

      const $licenceMessage = $('.govuk-footer__licence-description')
      ok($licenceMessage.html().includes('&lt;a class="govuk-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/" rel="license"&gt;Drwydded y Llywodraeth Agored v3.0&lt;/a&gt;'))
    })
  })

  describe('crown copyright', () => {
    it('is visible', async () => {
      const $ = await render('footer', examples.default)

      const $copyrightMessage = $('.govuk-footer__copyright-logo')
      ok($copyrightMessage.text().includes('© Crown copyright'))
    })

    it('can be customised with `text` parameter', async () => {
      const $ = await render('footer', examples['with custom text content licence and copyright notice'])

      const $copyrightMessage = $('.govuk-footer__copyright-logo')
      ok($copyrightMessage.text().includes('© Hawlfraint y Goron'))
    })

    it('can be customised with `html` parameter', async () => {
      const $ = await render('footer', examples['with custom HTML content licence and copyright notice'])

      const $copyrightMessage = $('.govuk-footer__copyright-logo')
      ok($copyrightMessage.html().includes('<span>Hawlfraint y Goron</span>'))
    })

    it('escapes HTML in the `text` parameter', async () => {
      const $ = await render('footer', examples['with HTML passed as text content'])

      const $copyrightMessage = $('.govuk-footer__copyright-logo')
      ok($copyrightMessage.html().includes('&lt;span&gt;Hawlfraint y Goron&lt;/span&gt;'))
    })
  })
})
