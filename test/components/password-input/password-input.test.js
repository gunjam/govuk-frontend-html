import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Password input', () => {
  let examples

  before(async () => {
    examples = await getExamples('password-input')
  })

  describe('default example', () => {
    it('renders with id', async () => {
      const $ = await render('password-input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('id'), 'password-input')
    })

    it('renders with name', async () => {
      const $ = await render('password-input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('name'), 'password')
    })

    it('renders with type="password" by default', async () => {
      const $ = await render('password-input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('type'), 'password')
    })

    it('renders with autocomplete="current-password" by default', async () => {
      const $ = await render('password-input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('autocomplete'), 'current-password')
    })

    it('renders with spellcheck="false" by default', async () => {
      const $ = await render('password-input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('spellcheck'), 'false')
    })

    it('renders with autocapitalize="none" by default', async () => {
      const $ = await render('password-input', examples.default)

      const $component = $('.govuk-input')
      equal($component.attr('autocapitalize'), 'none')
    })

    it('renders with a form group wrapper', async () => {
      const $ = await render('password-input', examples.default)

      const $formGroup = $('.govuk-form-group')
      ok($formGroup.length)
    })

    it('renders with the input wrapper', async () => {
      const $ = await render('password-input', examples.default)

      const $wrapper = $('.govuk-form-group > .govuk-input__wrapper')
      ok($wrapper.length)
    })

    describe('toggle button', () => {
      it('renders with the toggle button', async () => {
        const $ = await render('password-input', examples.default)

        const $button = $('.govuk-form-group > .govuk-input__wrapper > .govuk-button')
        ok($button.length)
        ok($button.hasClass('govuk-button--secondary'))
      })

      it('renders the toggle button with initial text', async () => {
        const $ = await render('password-input', examples.default)

        const $button = $('.govuk-form-group > .govuk-input__wrapper > .govuk-button')
        ok($button.text().includes('Show'))
      })

      it('renders the toggle button with aria-label', async () => {
        const $ = await render('password-input', examples.default)

        const $button = $('.govuk-form-group > .govuk-input__wrapper > .govuk-button')
        equal($button.attr('aria-label'), 'Show password')
      })

      it('renders the toggle button with the correct aria-controls', async () => {
        const $ = await render('password-input', examples.default)

        const $component = $('.govuk-input')
        const $button = $('.govuk-form-group > .govuk-input__wrapper > .govuk-button')
        equal($button.attr('aria-controls'), $component.attr('id'))
      })

      it('renders the toggle button initially hidden', async () => {
        const $ = await render('password-input', examples.default)

        const $button = $('.govuk-form-group > .govuk-input__wrapper > .govuk-button')
        ok($button.attr('hidden'))
      })
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      const $ = await render('password-input', examples.classes)

      const $component = $('.govuk-input')
      ok($component.hasClass('app-input--custom-modifier'))
    })

    it('renders with value', async () => {
      const $ = await render('password-input', examples.value)

      const $component = $('.govuk-input')
      equal($component.val(), 'Hunter2')
    })

    it('renders with aria-describedby', async () => {
      const $ = await render('password-input', examples['with describedBy'])

      const $component = $('.govuk-input')
      ok($component.attr('aria-describedby').includes('test-target-element'))
    })

    it('renders with custom autocomplete value', async () => {
      const $ = await render('password-input', examples['with new-password autocomplete'])

      const $component = $('.govuk-input')
      equal($component.attr('autocomplete'), 'new-password')
    })

    it('renders with attributes', async () => {
      const $ = await render('password-input', examples.attributes)

      const $component = $('.govuk-input')
      equal($component.attr('data-attribute'), 'value')
      equal($component.attr('data-another'), 'ok')
    })

    it('renders with localisation data attributes', async () => {
      const $ = await render('password-input', examples['with translations'])
      const $component = $('[data-module]')

      equal($component.attr('data-i18n.show-password'), 'Datguddia')
      equal($component.attr('data-i18n.hide-password'), 'Cuddio')
      equal($component.attr('data-i18n.show-password-aria-label'), 'Datgelu cyfrinair')
      equal($component.attr('data-i18n.hide-password-aria-label'), 'Cuddio cyfrinair')
      equal($component.attr('data-i18n.password-shown-announcement'), 'Mae eich cyfrinair yn weladwy.')
      equal($component.attr('data-i18n.password-hidden-announcement'), "Mae eich cyfrinair wedi'i guddio.")
    })
  })
})
