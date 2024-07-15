import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Breadcrumbs', () => {
  let examples

  before(async () => {
    examples = await getExamples('breadcrumbs')
  })

  describe('default example', () => {
    let $component
    let $list
    let $listItems

    before(async () => {
      const $ = await render('breadcrumbs', examples.default)

      $component = $('.govuk-breadcrumbs')
      $list = $('ol.govuk-breadcrumbs__list')
      $listItems = $('li.govuk-breadcrumbs__list-item')
    })

    it('renders as a nav element', async () => {
      equal($component.get(0).tagName.toLowerCase(), 'nav')
    })

    it('renders with default aria-label', async () => {
      equal($component.attr('aria-label'), 'Breadcrumb')
    })

    it('includes an ordered list', async () => {
      ok($component.find($list))
    })

    it('includes 2 list items within the list', async () => {
      equal($listItems.length, 2)
    })

    for (const { index, expectedText, expectedHref } of [
      { index: 0, expectedText: 'Section', expectedHref: '/section' },
      {
        index: 1,
        expectedText: 'Sub-section',
        expectedHref: '/section/sub-section'
      }
    ]) {
      describe(`the ${expectedText} breadcrumb`, () => {
        it(`includes the text "${expectedText}"`, async () => {
          equal($listItems.eq(index).eq(0).text().trim(), expectedText)
        })

        it('includes a link with the class govuk-breadcrumbs__link', async () => {
          ok($listItems.eq(index).find('a').hasClass('govuk-breadcrumbs__link'))
        })

        it(`includes a link with the href "${expectedHref}"`, async () => {
          equal($listItems.eq(index).find('a').attr('href'), expectedHref)
        })
      })
    }
  })

  describe('when the last breadcrumb is the current page', () => {
    let $lastItem

    before(async () => {
      const $ = await render('breadcrumbs', examples['with last breadcrumb as current page'])

      $lastItem = $('.govuk-breadcrumbs__list-item:last-child')
    })

    it('includes the current page as the last list item', async () => {
      equal($lastItem.eq(0).text().trim(), 'Travel abroad')
    })

    it('does not link the last list item', async () => {
      equal($lastItem.find('a').length, 0)
    })

    it('sets the aria-current attribute to "page"', async () => {
      equal($lastItem.attr('aria-current'), 'page')
    })
  })

  describe('custom options', () => {
    it('escapes HTML when using the `text` option', async () => {
      const $ = await render('breadcrumbs', examples['html as text'])
      const $item = $('.govuk-breadcrumbs__list-item')

      equal($item.eq(0).text().trim(), '<span>Section 1</span>')
    })

    it('escapes HTML when using the `text` option without a link', async () => {
      const $ = await render('breadcrumbs', examples['html as text'])
      const $item = $('.govuk-breadcrumbs__list-item:nth-child(2)')

      equal($item.eq(0).text().trim(), '<span>Section 2</span>')
    })

    it('does not escape HTML when using the `html` option', async () => {
      const $ = await render('breadcrumbs', examples.html)
      const $item = $('.govuk-breadcrumbs__list-item')

      ok($item.eq(0).html().includes('<em>Section 1</em>'))
    })

    it('does not escape HTML when using the `html` option without a link', async () => {
      const $ = await render('breadcrumbs', examples.html)
      const $item = $('.govuk-breadcrumbs__list-item:nth-child(2)')

      ok($item.eq(0).html().includes('<em>Section 2</em>'))
    })

    it('sets any additional attributes on the link based on the `item.attributes` option', async () => {
      const $ = await render('breadcrumbs', examples['item attributes'])
      const $breadcrumbLink = $('.govuk-breadcrumbs__link')

      equal($breadcrumbLink.attr('data-attribute'), 'my-attribute')
      equal($breadcrumbLink.attr('data-attribute-2'), 'my-attribute-2')
    })

    it('includes additional classes from the `classes` option', async () => {
      const $ = await render('breadcrumbs', examples.classes)

      const $component = $('.govuk-breadcrumbs')
      ok($component.hasClass('app-breadcrumbs--custom-modifier'))
    })

    it('adds the `--collapse-on-mobile` modifier class if `collapseOnMobile` is true', async () => {
      const $ = await render('breadcrumbs', examples['with collapse on mobile'])

      const $component = $('.govuk-breadcrumbs')
      ok($component.hasClass('govuk-breadcrumbs--collapse-on-mobile'))
    })

    it('sets any additional attributes based on the `attributes` option', async () => {
      const $ = await render('breadcrumbs', examples.attributes)

      const $component = $('.govuk-breadcrumbs')
      equal($component.attr('id'), 'my-navigation')
      equal($component.attr('data-foo'), 'bar')
    })

    it('renders with a custom aria-label', async () => {
      const $ = await render('breadcrumbs', examples['custom label'])

      const $component = $('.govuk-breadcrumbs')
      equal($component.attr('aria-label'), 'Briwsion bara')
    })
  })
})
