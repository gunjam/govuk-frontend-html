import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { document, getExamples, renderHtml } from '../../helper.js'

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
      document.body.innerHTML = await renderHtml('breadcrumbs', examples.default)

      $component = document.querySelector('.govuk-breadcrumbs')
      $list = document.querySelector('ol.govuk-breadcrumbs__list')
      $listItems = document.querySelectorAll('li.govuk-breadcrumbs__list-item')
    })

    it('renders as a nav element', async () => {
      equal($component.tagName.toLowerCase(), 'nav')
    })

    it('renders with default aria-label', async () => {
      equal($component.getAttribute('aria-label'), 'Breadcrumb')
    })

    it('includes an ordered list', async () => {
      ok($component.contains($list))
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
          equal($listItems[index].textContent.trim(), expectedText)
        })

        it('includes a link with the class govuk-breadcrumbs__link', async () => {
          ok([...$listItems[index].querySelector('a').classList].includes('govuk-breadcrumbs__link'))
        })

        it(`includes a link with the href "${expectedHref}"`, async () => {
          equal($listItems[index].querySelector('a').getAttribute('href'), expectedHref)
        })
      })
    }
  })

  describe('when the last breadcrumb is the current page', () => {
    let $lastItem

    before(async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples['with last breadcrumb as current page'])

      $lastItem = document.querySelector('.govuk-breadcrumbs__list-item:last-child')
    })

    it('includes the current page as the last list item', async () => {
      equal($lastItem.textContent.trim(), 'Travel abroad')
    })

    it('does not link the last list item', async () => {
      equal($lastItem.querySelector('a'), null)
    })

    it('sets the aria-current attribute to "page"', async () => {
      equal($lastItem.getAttribute('aria-current'), 'page')
    })
  })

  describe('custom options', () => {
    it('escapes HTML when using the `text` option', async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples['html as text'])
      const $item = document.querySelector('.govuk-breadcrumbs__list-item')

      equal($item.textContent.trim(), '<span>Section 1</span>')
    })

    it('escapes HTML when using the `text` option without a link', async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples['html as text'])
      const $item = document.querySelector('.govuk-breadcrumbs__list-item:nth-child(2)')

      equal($item.textContent.trim(), '<span>Section 2</span>')
    })

    it('does not escape HTML when using the `html` option', async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples.html)
      const $item = document.querySelector('.govuk-breadcrumbs__list-item')

      ok($item.innerHTML.includes('<em>Section 1</em>'))
    })

    it('does not escape HTML when using the `html` option without a link', async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples.html)
      const $item = document.querySelector('.govuk-breadcrumbs__list-item:nth-child(2)')

      ok($item.innerHTML.includes('<em>Section 2</em>'))
    })

    it('sets any additional attributes on the link based on the `item.attributes` option', async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples['item attributes'])
      const $breadcrumbLink = document.querySelector('.govuk-breadcrumbs__link')

      equal($breadcrumbLink.getAttribute('data-attribute'), 'my-attribute')
      equal($breadcrumbLink.getAttribute('data-attribute-2'), 'my-attribute-2')
    })

    it('includes additional classes from the `classes` option', async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples.classes)

      const $component = document.querySelector('.govuk-breadcrumbs')
      ok([...$component.classList].includes('app-breadcrumbs--custom-modifier'))
    })

    it('adds the `--collapse-on-mobile` modifier class if `collapseOnMobile` is true', async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples['with collapse on mobile'])

      const $component = document.querySelector('.govuk-breadcrumbs')
      ok([...$component.classList].includes('govuk-breadcrumbs--collapse-on-mobile'))
    })

    it('sets any additional attributes based on the `attributes` option', async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples.attributes)

      const $component = document.querySelector('.govuk-breadcrumbs')
      equal($component.getAttribute('id'), 'my-navigation')
      equal($component.getAttribute('data-foo'), 'bar')
    })

    it('renders with a custom aria-label', async () => {
      document.body.innerHTML = await renderHtml('breadcrumbs', examples['custom label'])

      const $component = document.querySelector('.govuk-breadcrumbs')
      equal($component.getAttribute('aria-label'), 'Briwsion bara')
    })
  })
})
