import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Service Navigation', () => {
  let examples

  before(async () => {
    examples = await getExamples('service-navigation')
  })

  it('renders the container as a <div> if a service name is missing', async () => {
    const $ = await render('service-navigation', examples.default)
    const tagName = $('.govuk-service-navigation').get(0).tagName

    equal(tagName.toLowerCase(), 'div')
  })

  describe('custom options', () => {
    it('renders attributes correctly', async () => {
      const $ = await render('service-navigation', examples.attributes)
      const $component = $('.govuk-service-navigation')

      equal($component.attr('data-foo'), 'bar')
      equal($component.attr('data-pika'), 'chu')
    })

    it('renders classes correctly', async () => {
      const $ = await render('service-navigation', examples.classes)
      const $component = $('.govuk-service-navigation')

      ok($component.hasClass('app-my-curious-custom-class'))
    })
  })

  describe('with navigation', () => {
    it('renders navigation', async () => {
      const $ = await render('service-navigation', examples.default)
      const $component = $('.govuk-service-navigation')

      const $nav = $component.find('nav.govuk-service-navigation__wrapper')
      const $list = $nav.find('ul.govuk-service-navigation__list')
      const $items = $list.find('li.govuk-service-navigation__item')
      const $firstItem = $items.find('a.govuk-service-navigation__link:first-child')

      ok($nav)
      ok($list)
      equal($items.length, 4)
      equal($firstItem.attr('href'), '#/1')
      ok($firstItem.text().includes('Navigation item 1'))
    })

    it('renders navigation items containing HTML', async () => {
      const $ = await render('service-navigation', examples['with HTML navigation items'])

      const $list = $('ul.govuk-service-navigation__list')
      const $items = $list.find('li.govuk-service-navigation__item')
      const $firstItem = $items.find('a.govuk-service-navigation__link:first-child')

      equal($firstItem.html().trim(), '<em>Navigation item 1</em>')
    })

    it('renders default navigation label', async () => {
      const $ = await render('service-navigation', examples.default)
      const $component = $('.govuk-service-navigation')

      const $nav = $component.find('nav.govuk-service-navigation__wrapper')

      equal($nav.attr('aria-label'), 'Menu')
    })

    it('renders the default navigation ID', async () => {
      const $ = await render('service-navigation', examples.default)
      const $component = $('.govuk-service-navigation')

      const $nav = $component.find('.govuk-service-navigation__list')
      const $navToggle = $component.find('.govuk-service-navigation__toggle')

      const navId = $nav.attr('id')

      equal(navId, 'navigation')
      equal($navToggle.attr('aria-controls'), navId)
    })

    describe('custom options', () => {
      it('renders custom navigation classes', async () => {
        const $ = await render('service-navigation', examples['with custom navigation classes'])
        const $component = $('.govuk-service-navigation')

        const $nav = $component.find('nav.govuk-service-navigation__wrapper')

        ok($nav.hasClass('app-my-neat-navigation-class'))
      })

      it('renders custom navigation label', async () => {
        const $ = await render('service-navigation', examples['with custom navigation label'])
        const $component = $('.govuk-service-navigation')

        const $nav = $component.find('nav.govuk-service-navigation__wrapper')

        equal($nav.attr('aria-label'), 'Main navigation')
      })

      it('renders custom navigation ID', async () => {
        const $ = await render('service-navigation', examples['with custom navigation ID'])
        const $component = $('.govuk-service-navigation')

        const $nav = $component.find('.govuk-service-navigation__list')
        const $navToggle = $component.find('.govuk-service-navigation__toggle')

        const navId = $nav.attr('id')

        equal(navId, 'main-nav')
        equal($navToggle.attr('aria-controls'), navId)
      })
    })

    describe('toggle button', () => {
      it('renders the navigation toggle button', async () => {
        const $ = await render('service-navigation', examples.default)
        const $component = $('.govuk-service-navigation')

        const $navToggle = $component.find('.govuk-service-navigation__toggle')

        equal($navToggle.length, 1)
        equal($navToggle.get(0).tagName, 'button')
        equal($navToggle.attr('type'), 'button')
      })

      it('renders the navigation toggle button hidden by default', async () => {
        const $ = await render('service-navigation', examples.default)
        const $component = $('.govuk-service-navigation')

        const $navToggle = $component.find('.govuk-service-navigation__toggle')

        ok($navToggle.attr('hidden'))
      })

      describe('toggle label', () => {
        it("doesn't render the label by default", async () => {
          const $ = await render('service-navigation', examples.default)
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find('.govuk-service-navigation__toggle')

          equal($navToggle.attr('aria-label'), undefined)
        })

        it('does not render the label if the specified label is the same as the text', async () => {
          const $ = await render('service-navigation', examples['with identical navigation toggle text and label'])
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find('.govuk-service-navigation__toggle')

          equal($navToggle.text().trim(), 'Enter the NavZone')
          equal($navToggle.attr('aria-label'), undefined)
        })

        it('renders custom label', async () => {
          const $ = await render('service-navigation', examples['with custom navigation toggle label'])
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find('.govuk-service-navigation__toggle')

          equal($navToggle.attr('aria-label'), 'Enter the NavZone')
        })
      })

      describe('toggle text', () => {
        it('renders default text', async () => {
          const $ = await render('service-navigation', examples.default)
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find('.govuk-service-navigation__toggle')

          equal($navToggle.text().trim(), 'Menu')
        })

        it('renders custom text', async () => {
          const $ = await render('service-navigation', examples['with custom navigation toggle text'])
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find('.govuk-service-navigation__toggle')

          equal($navToggle.text().trim(), 'Enter the NavZone')
        })

        it('bubbles custom text to the navigation label', async () => {
          const $ = await render('service-navigation', examples['with custom navigation toggle text'])
          const $component = $('.govuk-service-navigation')

          const $nav = $component.find('nav.govuk-service-navigation__wrapper')
          const $navToggle = $component.find('.govuk-service-navigation__toggle')

          const navLabel = $nav.attr('aria-label')
          const navToggleText = $navToggle.text().trim()

          equal(navToggleText, 'Enter the NavZone')
          equal(navLabel, navToggleText)
        })

        it("does not bubble custom text to the navigation label if it's been customised", async () => {
          const $ = await render('service-navigation', examples['with custom navigation toggle text and navigation label'])
          const $component = $('.govuk-service-navigation')

          const $nav = $component.find('nav.govuk-service-navigation__wrapper')
          const $navToggle = $component.find('.govuk-service-navigation__toggle')

          const navLabel = $nav.attr('aria-label')
          const navToggleText = $navToggle.text().trim()

          equal(navLabel, 'The NavZone')
          equal(navToggleText, 'Enter the NavZone')
        })
      })
    })

    describe('non-linked navigation items', () => {
      it('renders text passed without a link', async () => {
        const $ = await render('service-navigation', examples['with non-link navigation items'])

        const $navItem = $('.govuk-service-navigation__item:first-child')
        const $navLink = $navItem.find('a')
        const $navText = $navItem.find('.govuk-service-navigation__text')

        equal($navLink.length, 0)
        equal($navText.length, 1)
        equal($navText.text().trim(), 'Navigation item 1')
      })

      it('renders HTML passed without a link', async () => {
        const $ = await render('service-navigation', examples['with non-link navigation items'])

        const $navItem = $('.govuk-service-navigation__item:nth-child(2)')
        const $navLink = $navItem.find('a')
        const $navText = $navItem.find('.govuk-service-navigation__text')

        equal($navLink.length, 0)
        equal($navText.length, 1)
        equal($navText.html().trim(), '<em>Navigation item 2</em>')
      })
    })

    describe('active and current items', () => {
      it('renders navigation with an active item', async () => {
        const $ = await render('service-navigation', examples['with navigation with an active item'])

        const $activeItem = $('li.govuk-service-navigation__item:nth-child(2)')
        const $activeLink = $activeItem.find('a')
        const $activeFallback = $activeItem.find('strong')

        equal($activeLink.attr('aria-current'), 'true')
        equal($activeFallback.length, 1)
      })

      it('renders navigation with a current item', async () => {
        const $ = await render('service-navigation', examples['with navigation with a current item'])

        const $activeItem = $('li.govuk-service-navigation__item:nth-child(2)')
        const $activeLink = $activeItem.find('a')
        const $activeFallback = $activeItem.find('strong')

        equal($activeLink.attr('aria-current'), 'page')
        equal($activeFallback.length, 1)
      })
    })
  })

  describe('with service name', () => {
    it('renders the service name', async () => {
      const $ = await render('service-navigation', examples['with service name'])
      const $component = $('.govuk-service-navigation')

      const $serviceName = $component.find('.govuk-service-navigation__service-name')

      equal($serviceName.get(0).tagName, 'span')
      equal($serviceName.text().trim(), 'Service name')
    })

    it('wraps the service name with a link when a url is provided', async () => {
      const $ = await render('service-navigation', examples['with service link'])
      const $component = $('.govuk-service-navigation')

      const $serviceName = $component.find('.govuk-service-navigation__service-name')
      const $serviceLink = $serviceName.find('.govuk-service-navigation__link')

      equal($serviceLink.length, 1)
      equal($serviceLink.get(0).tagName, 'a')
      equal($serviceLink.attr('href'), '#/')
    })

    it('does not use a link when no service url is provided', async () => {
      const $ = await render('service-navigation', examples['with service name'])
      const $component = $('.govuk-service-navigation')

      const $serviceName = $component.find('.govuk-service-navigation__service-name')
      const $serviceLink = $serviceName.find('.govuk-service-navigation__link')

      equal($serviceLink.length, 0)
    })

    describe('<section> wrapper', () => {
      it('renders the container as a <section> if a service name is present', async () => {
        const $ = await render('service-navigation', examples['with service name'])
        const tagName = $('.govuk-service-navigation').get(0).tagName

        equal(tagName.toLowerCase(), 'section')
      })

      it('renders default aria-label on the <section>', async () => {
        const $ = await render('service-navigation', examples['with service name'])
        const $component = $('.govuk-service-navigation')

        equal($component.attr('aria-label'), 'Service information')
      })

      it('renders custom aria-label on the <section>', async () => {
        const $ = await render('service-navigation', examples['with custom aria-label'])
        const $component = $('.govuk-service-navigation')

        equal($component.attr('aria-label'), 'Service name and nav')
      })
    })
  })

  describe('slots', () => {
    it('inserts HTML from the `start` slot in the right place', async () => {
      const $ = await render('service-navigation', examples['with slotted content'])

      // Expected to be first thing in the inner container
      const $slottedElement = $('.govuk-width-container > :first-child')

      equal($slottedElement.prop('outerHTML'), '<div>[start]</div>')
    })

    it('inserts HTML from the `end` slot in the right place', async () => {
      const $ = await render('service-navigation', examples['with slotted content'])

      // Expected to be last thing in the inner container
      const $slottedElement = $('.govuk-width-container > :last-child')

      equal($slottedElement.prop('outerHTML'), '<div>[end]</div>')
    })

    it('renders the component as a <section> if `start` or `end` slots are used', async () => {
      const $ = await render('service-navigation', examples['with slotted content'])
      const tagName = $('.govuk-service-navigation').get(0).tagName

      equal(tagName.toLowerCase(), 'section')
    })

    it('inserts HTML from the `navigationStart` slot in the right place', async () => {
      const $ = await render('service-navigation', examples['with slotted content'])

      // Expected to be first thing in the nav list
      const $slottedElement = $('.govuk-service-navigation__list > :first-child')

      equal($slottedElement.prop('outerHTML'), '<li>[navigation start]</li>')
    })

    it('inserts HTML from the `navigationEnd` slot in the right place', async () => {
      const $ = await render('service-navigation', examples['with slotted content'])

      // Expected to be first thing in the nav list
      const $slottedElement = $('.govuk-service-navigation__list > :last-child')

      equal($slottedElement.prop('outerHTML'), '<li>[navigation end]</li>')
    })

    it('renders the <nav> if `navigationStart` or `navigationEnd` slots are used', async () => {
      const $ = await render('service-navigation', examples['with slotted content'])
      const $component = $('.govuk-service-navigation')
      const $nav = $component.find('nav.govuk-service-navigation__wrapper')
      const $list = $nav.find('ul.govuk-service-navigation__list')

      ok($nav)
      ok($list)
    })
  })
})
