import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Button', () => {
  let examples

  before(async () => {
    examples = await getExamples('button')
  })

  describe('default example', () => {
    it('renders the default example', async () => {
      const $ = await render('button', examples.default)

      const $component = $('.govuk-button')
      equal($component.get(0).tagName, 'button')
      ok($component.text().includes('Save and continue'))
    })
  })

  describe('custom options', () => {
    it('renders with attributes', async () => {
      const $ = await render('button', examples.attributes)

      const $component = $('.govuk-button')
      equal($component.attr('aria-controls'), 'test-target-element')
      equal($component.attr('data-tracking-dimension'), '123')
    })

    it('renders with classes', async () => {
      const $ = await render('button', examples.classes)

      const $component = $('.govuk-button')
      ok($component.hasClass('app-button--custom-modifier'))
    })

    it('renders with disabled', async () => {
      const $ = await render('button', examples.disabled)

      const $component = $('.govuk-button')
      equal($component.attr('aria-disabled'), 'true')
      equal($component.attr('disabled'), 'disabled')
    })

    it('renders with name', async () => {
      const $ = await render('button', examples.name)

      const $component = $('.govuk-button')
      equal($component.attr('name'), 'start-now')
    })

    it('renders with id', async () => {
      const $ = await render('button', examples.id)

      const $component = $('.govuk-button')
      equal($component.attr('id'), 'submit')
    })

    it('renders with value', async () => {
      const $ = await render('button', examples.value)

      const $component = $('.govuk-button')
      equal($component.attr('value'), 'start')
    })

    it('renders with type', async () => {
      const $ = await render('button', examples.type)

      const $component = $('.govuk-button')
      equal($component.attr('type'), 'button')
    })

    it('renders with html', async () => {
      const $ = await render('button', examples.html)

      const $component = $('.govuk-button')
      ok($component.html().includes('Start <em>now</em>'))
    })

    describe('preventDoubleClick', () => {
      it('does not render the attribute if not set', async () => {
        const $ = await render('button', examples['no data-prevent-double-click'])

        const $component = $('.govuk-button')
        equal($component.attr('data-prevent-double-click'), undefined)
      })

      it('renders with preventDoubleClick attribute set to true', async () => {
        const $ = await render('button', examples['prevent double click'])

        const $component = $('.govuk-button')
        equal($component.attr('data-prevent-double-click'), 'true')
      })

      it('renders with preventDoubleClick attribute set to false', async () => {
        const $ = await render('button', examples["don't prevent double click"])

        const $component = $('.govuk-button')
        equal($component.attr('data-prevent-double-click'), 'false')
      })
    })
  })

  describe('link', () => {
    it('renders with anchor, href and an accessible role of button', async () => {
      const $ = await render('button', examples['explicit link'])

      const $component = $('.govuk-button')
      equal($component.get(0).tagName, 'a')
      equal($component.attr('href'), '/')
      equal($component.attr('role'), 'button')
      ok($component.text().includes('Continue'))
    })

    it('renders with hash href if no href passed', async () => {
      const $ = await render('button', examples['no href'])

      const $component = $('.govuk-button')
      equal($component.attr('href'), '#')
    })

    it('renders with attributes', async () => {
      const $ = await render('button', examples['link attributes'])

      const $component = $('.govuk-button')
      equal($component.attr('aria-controls'), 'test-target-element')
      equal($component.attr('data-tracking-dimension'), '123')
    })

    it('renders with classes', async () => {
      const $ = await render('button', examples['link classes'])

      const $component = $('.govuk-button')
      ok($component.hasClass('app-button--custom-modifier'))
    })
  })

  describe('with explicit input button set by "element"', () => {
    it('renders with anchor, href and an accessible role of button', async () => {
      const $ = await render('button', examples.input)

      const $component = $('.govuk-button')
      equal($component.get(0).tagName, 'input')
      equal($component.attr('type'), 'submit')
    })

    it('renders with attributes', async () => {
      const $ = await render('button', examples['input attributes'])

      const $component = $('.govuk-button')
      equal($component.attr('aria-controls'), 'test-target-element')
      equal($component.attr('data-tracking-dimension'), '123')
    })

    it('renders with classes', async () => {
      const $ = await render('button', examples['input classes'])

      const $component = $('.govuk-button')
      ok($component.hasClass('app-button--custom-modifier'))
    })

    it('renders with disabled', async () => {
      const $ = await render('button', examples['input disabled'])

      const $component = $('.govuk-button')
      equal($component.attr('aria-disabled'), 'true')
      equal($component.attr('disabled'), 'disabled')
    })

    it('renders with name', async () => {
      const $ = await render('button', examples.input)

      const $component = $('.govuk-button')
      equal($component.attr('name'), 'start-now')
    })

    it('renders with type', async () => {
      const $ = await render('button', examples['input type'])

      const $component = $('.govuk-button')
      equal($component.attr('type'), 'button')
    })
  })

  describe('implicitly as no "element" param is set', () => {
    it('renders a link if you pass an href', async () => {
      const $ = await render('button', examples.link)

      const $component = $('.govuk-button')
      equal($component.get(0).tagName, 'a')
    })

    it("renders a button if you don't pass anything", async () => {
      const $ = await render('button', examples['no type'])

      const $component = $('.govuk-button')
      equal($component.get(0).tagName, 'button')
    })
  })

  describe('Start button', () => {
    it('renders a svg', async () => {
      const $ = await render('button', examples['start link'])

      const $component = $('.govuk-button .govuk-button__start-icon')
      equal($component.get(0).tagName, 'svg')
    })
  })
})
