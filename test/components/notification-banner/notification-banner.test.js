import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Notification-banner', () => {
  let examples

  before(async () => {
    examples = await getExamples('notification-banner')
  })

  describe('default example', () => {
    it('aria-labelledby attribute matches the title id', async () => {
      const $ = await render('notification-banner', examples.default)
      const ariaAttr = $('.govuk-notification-banner').attr('aria-labelledby')
      const titleId = $('.govuk-notification-banner__title').attr('id')

      equal(ariaAttr, titleId)
    })

    it('has role=region attribute', async () => {
      const $ = await render('notification-banner', examples.default)
      const $component = $('.govuk-notification-banner')

      equal($component.attr('role'), 'region')
    })

    it('has data-module attribute to initialise JavaScript', async () => {
      const $ = await render('notification-banner', examples.default)
      const $component = $('.govuk-notification-banner')

      equal($component.attr('data-module'), 'govuk-notification-banner')
    })

    it('renders header container', async () => {
      const $ = await render('notification-banner', examples.default)
      const $header = $('.govuk-notification-banner__header')

      ok($header.length)
    })

    it('renders default heading level', async () => {
      const $ = await render('notification-banner', examples.default)
      const $title = $('.govuk-notification-banner__title')

      equal($title.get(0).tagName, 'h2')
    })

    it('renders default title text', async () => {
      const $ = await render('notification-banner', examples.default)
      const $title = $('.govuk-notification-banner__title')

      equal($title.html().trim(), 'Important')
    })

    it('renders content', async () => {
      const $ = await render('notification-banner', examples.default)
      const $content = $('.govuk-notification-banner__heading')

      equal($content.html().trim(), 'This publication was withdrawn on 7 March 2014.')
    })
  })

  describe('custom options', () => {
    it('renders custom title', async () => {
      const $ = await render('notification-banner', examples['custom title'])
      const $title = $('.govuk-notification-banner__title')

      equal($title.html().trim(), 'Important information')
    })

    it('renders custom content', async () => {
      const $ = await render('notification-banner', examples['custom text'])
      const $content = $('.govuk-notification-banner__heading')

      equal($content.html().trim(), 'This publication was withdrawn on 7 March 2014.')
    })

    it('renders custom heading level', async () => {
      const $ = await render('notification-banner', examples['custom title heading level'])
      const $title = $('.govuk-notification-banner__title')

      equal($title.get(0).tagName, 'h3')
    })

    it('renders custom role', async () => {
      const $ = await render('notification-banner', examples['custom role'])
      const $component = $('.govuk-notification-banner')

      equal($component.attr('role'), 'banner')
    })

    it('renders aria-labelledby attribute matching the title id when role overridden to region', async () => {
      const $ = await render('notification-banner', examples['role=alert overridden to role=region, with type as success'])
      const ariaAttr = $('.govuk-notification-banner').attr('aria-labelledby')
      const titleId = $('.govuk-notification-banner__title').attr('id')

      equal(ariaAttr, titleId)
    })

    it('renders custom title id', async () => {
      const $ = await render('notification-banner', examples['custom title id'])
      const $title = $('.govuk-notification-banner__title')

      equal($title.attr('id'), 'my-id')
    })

    it('has an aria-labelledby attribute matching the title id', async () => {
      const $ = await render('notification-banner', examples['custom title id'])
      const ariaAttr = $('.govuk-notification-banner').attr('aria-labelledby')

      equal(ariaAttr, 'my-id')
    })

    it('adds data-disable-auto-focus="true" if disableAutoFocus is true', async () => {
      const $ = await render('notification-banner', examples['auto-focus disabled, with type as success'])

      const $component = $('.govuk-notification-banner')
      equal($component.attr('data-disable-auto-focus'), 'true')
    })

    it('adds data-disable-auto-focus="false" if disableAutoFocus is false', async () => {
      const $ = await render('notification-banner', examples['auto-focus explicitly enabled, with type as success'])

      const $component = $('.govuk-notification-banner')
      equal($component.attr('data-disable-auto-focus'), 'false')
    })

    it('renders classes', async () => {
      const $ = await render('notification-banner', examples.classes)

      const $component = $('.govuk-notification-banner')
      ok($component.hasClass('app-my-class'))
    })

    it('renders attributes', async () => {
      const $ = await render('notification-banner', examples.attributes)

      const $component = $('.govuk-notification-banner')
      equal($component.attr('my-attribute'), 'value')
    })
  })

  describe('html', () => {
    it('renders title as escaped html when passed as text', async () => {
      const $ = await render('notification-banner', examples['title html as text'])
      const $title = $('.govuk-notification-banner__title')

      equal($title.html().trim(), '&lt;span&gt;Important information&lt;/span&gt;')
    })

    it('renders title as html', async () => {
      const $ = await render('notification-banner', examples['title as html'])
      const $title = $('.govuk-notification-banner__title')

      equal($title.html().trim(), '<span>Important information</span>')
    })

    it('renders content as escaped html when passed as text', async () => {
      const $ = await render('notification-banner', examples['html as text'])
      const $content = $('.govuk-notification-banner__content')

      equal($content.html().trim(), `<p class="govuk-notification-banner__heading">&lt;span&gt;This publication was withdrawn on 7 March 2014.&lt;/span&gt;</p>`)
    })

    it('renders content as html', async () => {
      const $ = await render('notification-banner', examples['with text as html'])
      const $contentHtml = $('.govuk-notification-banner__content')

      equal(
        $contentHtml.html().trim(),
        `<h3 class="govuk-notification-banner__heading">
  This publication was withdrawn on 7 March 2014
</h3>
<p class="govuk-body">
  Archived and replaced by the <a href="#" class="govuk-notification-banner__link">new planning guidance</a> launched 6 March 2014 on an external website
</p>`
      )
    })
  })

  describe('when success type is passed', () => {
    it('renders with appropriate class', async () => {
      const $ = await render('notification-banner', examples['with type as success'])

      const $component = $('.govuk-notification-banner')
      ok($component.hasClass('govuk-notification-banner--success'))
    })

    it('has role=alert attribute', async () => {
      const $ = await render('notification-banner', examples['with type as success'])

      const $component = $('.govuk-notification-banner')
      equal($component.attr('role'), 'alert')
    })

    it('does render aria-labelledby', async () => {
      const $ = await render('notification-banner', examples['with type as success'])
      const $component = $('.govuk-notification-banner')

      equal($component.attr('aria-labelledby'), 'govuk-notification-banner-title')
    })

    it('renders a title id for aria-labelledby', async () => {
      const $ = await render('notification-banner', examples['with type as success'])
      const $component = $('.govuk-notification-banner__title')

      equal($component.attr('id'), 'govuk-notification-banner-title')
    })

    it('renders default success title text', async () => {
      const $ = await render('notification-banner', examples['with type as success'])
      const $title = $('.govuk-notification-banner__title')

      equal($title.html().trim(), 'Success')
    })

    it('renders custom title id and aria-labelledby', async () => {
      const $ = await render('notification-banner', examples['custom title id with type as success'])
      const $component = $('.govuk-notification-banner')
      const $title = $('.govuk-notification-banner__title')

      equal($component.attr('aria-labelledby'), 'my-id')
      equal($title.attr('id'), 'my-id')
    })
  })

  describe('when type that is invalid is passed', () => {
    it('has role=region attribute', async () => {
      const $ = await render('notification-banner', examples['with invalid type'])
      const $component = $('.govuk-notification-banner')

      equal($component.attr('role'), 'region')
    })

    it('aria-labelledby attribute matches the title id', async () => {
      const $ = await render('notification-banner', examples['with invalid type'])
      const ariaAttr = $('.govuk-notification-banner').attr('aria-labelledby')
      const titleId = $('.govuk-notification-banner__title').attr('id')

      equal(ariaAttr, titleId)
    })
  })
})
