import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('header', () => {
  let examples

  before(async () => {
    examples = await getExamples('header')
  })

  describe('custom options', () => {
    it('renders attributes correctly', async () => {
      const $ = await render('header', examples.attributes)

      const $component = $('.govuk-header')
      equal($component.attr('data-test-attribute'), 'value')
      equal($component.attr('data-test-attribute-2'), 'value-2')
    })

    it('renders classes', async () => {
      const $ = await render('header', examples.classes)

      const $component = $('.govuk-header')
      ok($component.hasClass('app-header--custom-modifier'))
    })

    it('renders custom container classes', async () => {
      const $ = await render('header', examples['full width'])

      const $component = $('.govuk-header')
      const $container = $component.find('.govuk-header__container')

      ok(
        $container.hasClass('govuk-header__container--full-width')
      )
    })

    it('renders custom navigation classes', async () => {
      const $ = await render('header', examples['full width with navigation'])

      const $component = $('.govuk-header')
      const $container = $component.find('.govuk-header__navigation')

      ok($container.hasClass('govuk-header__navigation--end'))
    })

    it('renders home page URL', async () => {
      const $ = await render('header', examples['custom homepage url'])

      const $component = $('.govuk-header')
      const $homepageLink = $component.find('.govuk-header__link--homepage')
      equal($homepageLink.attr('href'), '/')
    })
  })

  describe('with product name', () => {
    it('renders product name', async () => {
      const $ = await render('header', examples['with product name'])

      const $component = $('.govuk-header')
      const $productName = $component.find('.govuk-header__product-name')
      equal($productName.text().trim(), 'Product Name')
    })
  })

  describe('with service name', () => {
    it('renders service name', async () => {
      const $ = await render('header', examples['with service name'])

      const $component = $('.govuk-header')
      const $serviceName = $component.find('.govuk-header__service-name')
      equal($serviceName.text().trim(), 'Service Name')
    })

    it('wraps the service name with a link when a url is provided', async () => {
      const $ = await render('header', examples['with service name'])

      const $component = $('.govuk-header')
      const $serviceName = $component.find('.govuk-header__service-name')
      equal($serviceName.get(0).tagName, 'a')
      equal($serviceName.attr('href'), '/components/header')
    })

    it('does not use a link when no service url is provided', async () => {
      const $ = await render(
        'header',
        examples['with service name but no service url']
      )

      const $component = $('.govuk-header')
      const $serviceName = $component.find('.govuk-header__service-name')
      equal($serviceName.get(0).tagName, 'span')
      equal($serviceName.attr('href'), undefined)
    })
  })

  describe('with navigation', () => {
    it('renders navigation', async () => {
      const $ = await render('header', examples['with navigation'])

      const $component = $('.govuk-header')
      const $list = $component.find('ul.govuk-header__navigation-list')
      const $items = $list.find('li.govuk-header__navigation-item')
      const $firstItem = $items.find('a.govuk-header__link:first-child')
      equal($items.length, 4)
      equal($firstItem.attr('href'), '#1')
      ok($firstItem.text().includes('Navigation item 1'))
    })

    it('renders navigation default label correctly', async () => {
      const $ = await render('header', examples['with navigation'])

      const $component = $('.govuk-header')
      const $nav = $component.find('nav')

      equal($nav.attr('aria-label'), 'Menu')
    })

    it('renders navigation label correctly when custom menu button text is set', async () => {
      const $ = await render('header', examples['with custom menu button text'])

      const $component = $('.govuk-header')
      const $nav = $component.find('nav')

      equal($nav.attr('aria-label'), 'Dewislen')
    })

    it('allows navigation label to be customised', async () => {
      const $ = await render('header', examples['with custom navigation label'])

      const $component = $('.govuk-header')
      const $nav = $component.find('nav')

      equal($nav.attr('aria-label'), 'Custom navigation label')
    })

    it('renders navigation label and menu button text when these are both set', async () => {
      const $ = await render(
        'header',
        examples['with custom navigation label and custom menu button text']
      )

      const $component = $('.govuk-header')
      const $nav = $component.find('nav')
      const $button = $component.find('.govuk-header__menu-button')

      equal($nav.attr('aria-label'), 'Custom navigation label')
      equal($button.text().trim(), 'Custom menu button text')
    })

    it('renders navigation with active item', async () => {
      const $ = await render('header', examples['with navigation'])

      const $activeItem = $('li.govuk-header__navigation-item:first-child')
      ok(
        $activeItem.hasClass('govuk-header__navigation-item--active')
      )
    })

    it('allows navigation item text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('header', examples['navigation item with html as text'])

      const $navigationLink = $('.govuk-header__navigation-item a')
      ok($navigationLink.html().includes(
        '&lt;em&gt;Navigation item 1&lt;/em&gt;'
      ))
    })

    it('allows navigation item HTML to be passed un-escaped', async () => {
      const $ = await render('header', examples['navigation item with html'])

      const $navigationLink = $('.govuk-header__navigation-item a')
      ok($navigationLink.html().includes('<em>Navigation item 1</em>'))
    })

    it('renders navigation item with text without a link', async () => {
      const $ = await render(
        'header',
        examples['navigation item with text without link']
      )

      const $navigationItem = $('.govuk-header__navigation-item')
      equal($navigationItem.html().trim(), 'Navigation item 1')
    })

    it('renders navigation item with html without a link', async () => {
      const $ = await render(
        'header',
        examples['navigation item with html without link']
      )

      const $navigationItem = $('.govuk-header__navigation-item')
      ok($navigationItem.html().includes('<em>Navigation item 1</em>'))
    })

    it('renders navigation item anchor with attributes', async () => {
      const $ = await render('header', examples['navigation item with attributes'])

      const $navigationLink = $('.govuk-header__navigation-item a')
      equal($navigationLink.attr('data-attribute'), 'my-attribute')
      equal($navigationLink.attr('data-attribute-2'), 'my-attribute-2')
    })

    describe('menu button', () => {
      it('has an explicit type="button" so it does not act as a submit button', async () => {
        const $ = await render('header', examples['with navigation'])

        const $button = $('.govuk-header__menu-button')

        equal($button.attr('type'), 'button')
      })
      it('has a hidden attribute on load so that it does not show an unusable button without js', async () => {
        const $ = await render('header', examples['with navigation'])

        const $button = $('.govuk-header__menu-button')

        ok($button.attr('hidden'))
      })
      it('allows label to be customised', async () => {
        const $ = await render('header', examples['with custom menu button label'])

        const $button = $('.govuk-header__menu-button')

        equal($button.attr('aria-label'), 'Custom button label')
      })
      it('renders default text correctly', async () => {
        const $ = await render('header', examples['with navigation'])

        const $button = $('.govuk-header__menu-button')

        equal($button.text().trim(), 'Menu')
      })
      it('allows text to be customised', async () => {
        const $ = await render('header', examples['with custom menu button text'])

        const $button = $('.govuk-header__menu-button')

        equal($button.text().trim(), 'Dewislen')
      })
    })
  })

  for (const { message, exampleName } of [
    { message: 'without navigation', exampleName: 'default' },
    { message: 'with empty navigation', exampleName: 'empty navigation array' }
  ]) {
    describe(message, () => {
      let $

      before(async () => {
        $ = await render('summary-list', examples[exampleName])
      })

      it('does not include a menu button', async () => {
        equal($('.govuk-header__menu-button').length, 0)
      })

      it('does not include a <nav> element', async () => {
        equal($('nav').length, 0)
      })

      it('does not include a govuk-header__content wrapper', async () => {
        equal($('.govuk-header__content').length, 0)
      })
    })
  }

  describe('SVG logo', () => {
    let $
    let $svg

    before(async () => {
      $ = await render('header', examples.default)
      $svg = $('.govuk-header__logotype')
    })

    it('defaults to Tudor crown', async () => {
      equal($svg.attr('viewBox'), '0 0 148 30')
    })

    it('sets focusable="false" so that IE does not treat it as an interactive element', async () => {
      equal($svg.attr('focusable'), 'false')
    })

    it('sets role="img" so that assistive technologies do not treat it as an embedded document', async () => {
      equal($svg.attr('role'), 'img')
    })

    it('sets aria-label so that assistive technologies have an accessible name to fall back to', async () => {
      equal($svg.attr('aria-label'), 'GOV.UK')
    })

    it('has an embedded <title> element to serve as alternative text', async () => {
      ok($svg.html().includes('<title>GOV.UK</title>'))
    })

    it("uses the St Edward's Crown if useTudorCrown is false", async () => {
      $ = await render('header', examples["with St Edward's crown"])
      $svg = $('.govuk-header__logotype')

      equal($svg.attr('viewBox'), '0 0 152 30')
    })
  })
})
