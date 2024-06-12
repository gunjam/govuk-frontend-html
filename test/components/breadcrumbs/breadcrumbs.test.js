import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Breadcrumbs', () => {
  let examples

  before(async () => {
    examples = await getExamples('breadcrumbs')
  })

  describe('default example', () => {
    it('renders with items', async () => {
      const $ = await render('breadcrumbs', examples.default)

      const $items = $('.govuk-breadcrumbs__list-item')
      equal($items.length, 2)
    })

    it('renders 2 items', async () => {
      const $ = await render('breadcrumbs', examples.default)
      const $items = $('.govuk-breadcrumbs__list-item')
      equal($items.length, 2)
    })

    it('renders item with anchor', async () => {
      const $ = await render('breadcrumbs', examples.default)

      const $anchor = $('.govuk-breadcrumbs__list-item a').first()
      equal($anchor.get(0).tagName, 'a')
      equal($anchor.attr('class'), 'govuk-breadcrumbs__link')
      equal($anchor.attr('href'), '/section')
      equal($anchor.text(), 'Section')
    })
  })

  describe('custom options', () => {
    it('renders item with text', async () => {
      const $ = await render('breadcrumbs', examples['with last breadcrumb as current page'])

      const $item = $('.govuk-breadcrumbs__list-item').last()
      equal($item.text(), 'Travel abroad')
    })

    it('renders item with escaped entities in text', async () => {
      const $ = await render('breadcrumbs', examples['html as text'])

      const $item = $('.govuk-breadcrumbs__list-item')
      equal($item.html(), '&lt;span&gt;Section 1&lt;/span&gt;')
    })

    it('renders item with html', async () => {
      const $ = await render('breadcrumbs', examples.html)

      const $item = $('.govuk-breadcrumbs__list-item').first()
      equal($item.html(), '<em>Section 1</em>')
    })

    it('renders item with html inside anchor', async () => {
      const $ = await render('breadcrumbs', examples.html)

      const $anchor = $('.govuk-breadcrumbs__list-item a').last()
      equal($anchor.html(), '<em>Section 2</em>')
    })

    it('renders item anchor with attributes', async () => {
      const $ = await render('breadcrumbs', examples['item attributes'])

      const $breadcrumbLink = $('.govuk-breadcrumbs__link')
      equal($breadcrumbLink.attr('data-attribute'), 'my-attribute')
      equal($breadcrumbLink.attr('data-attribute-2'), 'my-attribute-2')
    })

    it('renders with classes', async () => {
      const $ = await render('breadcrumbs', examples.classes)

      const $component = $('.govuk-breadcrumbs')
      ok($component.hasClass('app-breadcrumbs--custom-modifier'))
    })

    it('renders with attributes', async () => {
      const $ = await render('breadcrumbs', examples.attributes)

      const $component = $('.govuk-breadcrumbs')
      equal($component.attr('id'), 'my-navigation')
      equal($component.attr('role'), 'navigation')
    })

    it('renders item as collapse on mobile if specified', async () => {
      const $ = await render('breadcrumbs', examples['with collapse on mobile'])

      const $component = $('.govuk-breadcrumbs')
      ok($component.hasClass('govuk-breadcrumbs--collapse-on-mobile'))
    })

    it('renders with inverted colours if specified', async () => {
      const $ = await render('breadcrumbs', examples.inverse)

      const $component = $('.govuk-breadcrumbs')
      ok($component.hasClass('govuk-breadcrumbs--inverse'))
    })
  })
})
