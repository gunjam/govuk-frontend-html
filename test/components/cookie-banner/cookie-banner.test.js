import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Cookie Banner', () => {
  let examples

  before(async () => {
    examples = await getExamples('cookie-banner')
  })

  describe('question banner', () => {
    it('renders a heading', async () => {
      const $ = await render('cookie-banner', examples.default)

      const $heading = $('.govuk-cookie-banner__heading')
      equal($heading.text().trim(), 'Cookies on this government service')
    })

    it('renders heading as escaped html when passed as text', async () => {
      const $ = await render('cookie-banner', examples['heading html as text'])

      const $heading = $('.govuk-cookie-banner__heading')
      equal($heading.html().trim(), 'Cookies on &lt;span&gt;my service&lt;/span&gt;')
    })

    it('renders heading html', async () => {
      const $ = await render('cookie-banner', examples['heading html'])

      const $heading = $('.govuk-cookie-banner__heading')
      equal($heading.html().trim(), 'Cookies on <span>my service</span>')
    })

    it('renders main content text', async () => {
      const $ = await render('cookie-banner', examples.default)

      const $content = $('.govuk-cookie-banner__content')
      equal($content.text().trim(), 'We use analytics cookies to help understand how users use our service.')
    })

    it('renders main content html', async () => {
      const $ = await render('cookie-banner', examples.html)

      const $content = $('.govuk-cookie-banner__content')
      equal($content.html().trim(), '<p class="govuk-body">We use cookies in <span>our service</span>.</p>')
    })

    it('renders classes', async () => {
      const $ = await render('cookie-banner', examples.classes)

      const $banner = $('.govuk-cookie-banner .govuk-cookie-banner__message')

      ok($banner.hasClass('app-my-class'))
    })

    it('renders attributes', async () => {
      const $ = await render('cookie-banner', examples.attributes)

      const $banner = $('.govuk-cookie-banner .govuk-cookie-banner__message')

      equal($banner.attr('data-attribute'), 'my-value')
    })
  })

  describe('role and aria attributes', () => {
    it('has a role of region', async () => {
      const $ = await render('cookie-banner', examples.default)

      const $component = $('.govuk-cookie-banner')
      equal($component.attr('role'), 'region')
    })

    it('has a default aria-label', async () => {
      const $ = await render('cookie-banner', examples.default)

      const $component = $('.govuk-cookie-banner')
      equal($component.attr('aria-label'), 'Cookie banner')
    })

    it('renders a custom aria label', async () => {
      const $ = await render('cookie-banner', examples['custom aria label'])

      const $component = $('.govuk-cookie-banner')
      equal($component.attr('aria-label'), 'Cookies on GOV.UK')
    })
  })

  describe('confirmation banner', () => {
    it('role alert not set by default', async () => {
      const $ = await render('cookie-banner', examples.default)

      const $component = $('.govuk-cookie-banner')
      const $banner = $component.find('.govuk-cookie-banner__message')
      equal($banner.attr('role'), undefined)
    })

    it('sets role attribute when role provided', async () => {
      const $ = await render('cookie-banner', examples['accepted confirmation banner'])

      const $component = $('.govuk-cookie-banner')
      const $banner = $component.find('.govuk-cookie-banner__message')
      equal($banner.attr('role'), 'alert')
    })

    it('hides banner if hidden option set to true', async () => {
      const $ = await render('cookie-banner', examples.hidden)

      const $component = $('.govuk-cookie-banner__message')
      ok($component.attr('hidden'))
    })

    it('does not hide banner if hidden option set to false', async () => {
      const $ = await render('cookie-banner', examples['hidden false'])

      const $component = $('.govuk-cookie-banner__message')
      equal($component.attr('hidden'), undefined)
    })
  })

  describe('action', () => {
    it('renders as button by default', async () => {
      const $ = await render('cookie-banner', examples['default action'])

      const $actions = $('.govuk-cookie-banner .govuk-button')
      equal($actions.get(0).tagName, 'button')
    })

    it('renders as a link if href provided', async () => {
      const $ = await render('cookie-banner', examples.link)

      const $actions = $('.govuk-cookie-banner .govuk-link')
      equal($actions.get(0).tagName, 'a')
    })

    it('ignores other button options if href provided', async () => {
      const $ = await render('cookie-banner', examples['link with false button options'])

      const $actions = $('.govuk-cookie-banner .govuk-link')
      equal($actions.get(0).tagName, 'a')
      equal($actions.text(), 'This is a link')
      equal($actions.attr('href'), '/link')

      equal($actions.attr('value'), undefined)
      equal($actions.attr('name'), undefined)
    })

    it('renders as a link button if href and type=button provided', async () => {
      const $ = await render('cookie-banner', examples['link as a button'])

      const $actions = $('.govuk-cookie-banner .govuk-button')
      equal($actions.get(0).tagName, 'a')
      equal($actions.text().trim(), 'This is a link')
      equal($actions.attr('href'), '/link')
      equal($actions.attr('role'), 'button')
    })

    it('renders button text', async () => {
      const $ = await render('cookie-banner', examples['default action'])

      const $actions = $('.govuk-cookie-banner .govuk-button')
      equal($actions.text().trim(), 'This is a button')
    })

    it('renders button with custom type', async () => {
      const $ = await render('cookie-banner', examples.type)

      const $actions = $('.govuk-cookie-banner .govuk-button')
      equal($actions.attr('type'), 'button')
    })

    it('renders button with name', async () => {
      const $ = await render('cookie-banner', examples.default)

      const $actions = $('.govuk-cookie-banner .govuk-button')
      equal($actions.attr('name'), 'cookies')
    })

    it('renders button with value', async () => {
      const $ = await render('cookie-banner', examples.default)

      const $actions = $('.govuk-cookie-banner .govuk-button')
      equal($actions.attr('value'), 'accept')
    })

    it('renders button with additional classes', async () => {
      const $ = await render('cookie-banner', examples['button classes'])

      const $actions = $('.govuk-cookie-banner .govuk-button')
      equal($actions.attr('class'), 'govuk-button my-button-class app-button-class')
    })

    it('renders button with custom attributes', async () => {
      const $ = await render('cookie-banner', examples['button attributes'])

      const $actions = $('.govuk-cookie-banner .govuk-button')
      equal($actions.attr('data-button-attribute'), 'my-value')
    })

    it('renders link text and href', async () => {
      const $ = await render('cookie-banner', examples.link)

      const $actions = $('.govuk-cookie-banner .govuk-link')
      equal($actions.text(), 'This is a link')
      equal($actions.attr('href'), '/link')
    })

    it('renders link with additional classes', async () => {
      const $ = await render('cookie-banner', examples['link classes'])

      const $actions = $('.govuk-cookie-banner .govuk-link')
      equal($actions.attr('class'), 'govuk-link my-link-class app-link-class')
    })

    it('renders link with custom attributes', async () => {
      const $ = await render('cookie-banner', examples['link attributes'])

      const $actions = $('.govuk-cookie-banner .govuk-link')
      equal($actions.attr('data-link-attribute'), 'my-value')
    })
  })

  describe('client-side implementation example', () => {
    it('renders 3 banners', async () => {
      const $ = await render('cookie-banner', examples['client-side implementation'])

      const $actions = $('.govuk-cookie-banner__message')
      equal($actions.length, 3)
    })

    it('2 banners are hidden', async () => {
      const $ = await render('cookie-banner', examples['client-side implementation'])

      const $actions = $('.govuk-cookie-banner__message[hidden]')
      equal($actions.length, 2)
    })

    it('has a data-nosnippet attribute to hide it from search result snippets', async () => {
      const $ = await render('cookie-banner', examples['client-side implementation'])

      const $parentContainer = $('.govuk-cookie-banner')
      equal($parentContainer.attr('data-nosnippet'), '')
    })
  })

  describe('full cookie banner hidden', () => {
    it('HTML for 3 banners is present', async () => {
      const $ = await render('cookie-banner', examples['full banner hidden'])

      const $messages = $('.govuk-cookie-banner__message')
      equal($messages.length, 3)
    })

    it('parent banner is hidden', async () => {
      const $ = await render('cookie-banner', examples['full banner hidden'])

      const $cookieBanner = $('.govuk-cookie-banner[hidden]')
      equal($cookieBanner.length, 1)
    })

    it('adds classes to parent container when provided', async () => {
      const $ = await render('cookie-banner', examples['full banner hidden'])

      const $cookieBanner = $('.govuk-cookie-banner')
      ok($cookieBanner.hasClass('hide-cookie-banner'))
    })

    it('adds attributes to parent container when provided', async () => {
      const $ = await render('cookie-banner', examples['full banner hidden'])

      const $cookieBanner = $('.govuk-cookie-banner')
      equal($cookieBanner.attr('data-hide-cookie-banner'), 'true')
    })
  })
})
