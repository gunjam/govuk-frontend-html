import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Tabs', () => {
  let examples

  before(async () => {
    examples = await getExamples('tabs')
  })

  describe('default example', () => {
    it('renders the first tab selected', async () => {
      const $ = await render('tabs', examples.default)

      const $tab = $('[href="#past-day"]').parent()
      ok($tab.hasClass('govuk-tabs__list-item--selected'))
    })

    it('hides all but the first panel', async () => {
      const $ = await render('tabs', examples.default)

      ok($('#past-week').hasClass('govuk-tabs__panel--hidden'))
      ok($('#past-month').hasClass('govuk-tabs__panel--hidden'))
      ok($('#past-year').hasClass('govuk-tabs__panel--hidden'))
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      const $ = await render('tabs', examples.classes)

      const $component = $('.govuk-tabs')
      ok($component.hasClass('app-tabs--custom-modifier'))
    })

    it('renders with id', async () => {
      const $ = await render('tabs', examples.id)

      const $component = $('.govuk-tabs')
      equal($component.attr('id'), 'my-tabs')
    })

    it('allows custom title text to be passed', async () => {
      const $ = await render('tabs', examples.title)

      const content = $('.govuk-tabs__title').html().trim()
      equal(content, 'Custom title for Contents')
    })

    it('renders with attributes', async () => {
      const $ = await render('tabs', examples.attributes)

      const $component = $('.govuk-tabs')
      equal($component.attr('data-attribute'), 'my data value')
    })
  })

  describe('items', () => {
    it("doesn't render a list if items is not defined", async () => {
      const $ = await render('tabs', examples['no item list'])

      const $component = $('.govuk-tabs')
      equal($component.find('.govuk-tabs__list').length, 0)
    })

    it("doesn't render a list if items is empty", async () => {
      const $ = await render('tabs', examples['empty item list'])

      const $component = $('.govuk-tabs')
      equal($component.find('.govuk-tabs__list').length, 0)
    })

    it('render a matching tab and panel using item id', async () => {
      const $ = await render('tabs', examples.default)

      const $component = $('.govuk-tabs')

      const $firstTab = $component.find('.govuk-tabs__list-item:first-child .govuk-tabs__tab')
      const $firstPanel = $component.find('.govuk-tabs__panel')
      equal($firstTab.attr('href'), '#past-day')
      equal($firstPanel.attr('id'), 'past-day')
    })

    it('render without falsy values', async () => {
      const $ = await render('tabs', examples['with falsy values'])

      const $component = $('.govuk-tabs')

      const $items = $component.find('.govuk-tabs__list-item')
      equal($items.length, 2)
    })

    it('render a matching tab and panel using custom idPrefix', async () => {
      const $ = await render('tabs', examples.idPrefix)

      const $component = $('.govuk-tabs')

      const $firstTab = $component.find('.govuk-tabs__list-item:first-child .govuk-tabs__tab')
      const $firstPanel = $component.find('.govuk-tabs__panel')
      equal($firstTab.attr('href'), '#custom-1')
      equal($firstPanel.attr('id'), 'custom-1')
    })

    it('render the label', async () => {
      const $ = await render('tabs', examples.default)

      const $component = $('.govuk-tabs')

      const $firstTab = $component.find('.govuk-tabs__list-item:first-child .govuk-tabs__tab')
      equal($firstTab.text().trim(), 'Past day')
    })

    it('render with panel content as text, wrapped in styled paragraph', async () => {
      const $ = await render('tabs', examples.default)
      const $component = $('.govuk-tabs')
      const $lastTab = $component.find('.govuk-tabs__panel').last()

      ok($lastTab.find('p').hasClass('govuk-body'))
      equal($lastTab.text().trim(), 'There is no data for this year yet, check back later')
    })

    it('render escaped html when passed to text content', async () => {
      const $ = await render('tabs', examples['html as text'])

      const $component = $('.govuk-tabs')

      const $firstPanel = $component.find('.govuk-tabs__panel .govuk-body')
      equal($firstPanel.html().trim(), '&lt;p&gt;Panel 1 content&lt;/p&gt;')
    })

    it('render html when passed to content', async () => {
      const $ = await render('tabs', examples.html)

      const $component = $('.govuk-tabs')

      const $firstPanel = $component.find('.govuk-tabs__panel')
      equal($firstPanel.html().trim(), '<p>Panel 1 content</p>')
    })

    it('render a tab anchor with attributes', async () => {
      const $ = await render('tabs', examples['item with attributes'])

      const $tabItemLink = $('.govuk-tabs__tab')
      equal($tabItemLink.attr('data-attribute'), 'my-attribute')
      equal($tabItemLink.attr('data-attribute-2'), 'my-attribute-2')
    })

    it('render a tab panel with attributes', async () => {
      const $ = await render('tabs', examples['panel with attributes'])

      const $tabPanelItems = $('.govuk-tabs__panel')
      equal($tabPanelItems.attr('data-attribute'), 'my-attribute')
      equal($tabPanelItems.attr('data-attribute-2'), 'my-attribute-2')
    })
  })
})
