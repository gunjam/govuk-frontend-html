import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { document, getExamples, renderHtml } from '../../helper.js'

describe('back-link component', () => {
  let examples

  before(async () => {
    examples = await getExamples('back-link')
  })

  describe('by default', () => {
    let $component

    before(async () => {
      document.body.innerHTML = await renderHtml('back-link', examples.default)
      $component = document.querySelector('.govuk-back-link')
    })

    it('outputs a link', async () => {
      equal($component.tagName, 'A')
    })

    it('has an href of "#"', async () => {
      equal($component.getAttribute('href'), '#')
    })

    it('includes the text "Back"', async () => {
      equal($component.textContent.trim(), 'Back')
    })
  })

  it('includes additional classes from the `classes` option', async () => {
    document.body.innerHTML = await renderHtml('back-link', examples.classes)

    const $component = document.querySelector('.govuk-back-link')
    ok([...$component.classList].includes('app-back-link--custom-class'))
  })

  describe('the `href` option', () => {
    it('allows the link to be customised', async () => {
      document.body.innerHTML = await renderHtml('back-link', examples['with custom link'])

      const $component = document.querySelector('.govuk-back-link')
      equal($component.getAttribute('href'), '/home')
    })

    for (const href of ['', 0, false, null, undefined]) {
      it(`uses "#" for "${href}"`, async () => {
        document.body.innerHTML = await renderHtml('back-link', { context: { href } })
        const $component = document.querySelector('.govuk-back-link')

        equal($component.getAttribute('href'), '#')
      })
    }
  })

  describe('the `text` option', () => {
    it('allows the text to be customised', async () => {
      document.body.innerHTML = await renderHtml('back-link', examples['with custom text'])

      const $component = document.querySelector('.govuk-back-link')
      equal($component.textContent.trim(), 'Back to home')
    })

    it('escapes HTML', async () => {
      document.body.innerHTML = await renderHtml('back-link', examples['html as text'])

      const $component = document.querySelector('.govuk-back-link')
      equal($component.textContent.trim(), '<b>Home</b>')
    })

    for (const text of ['', 0, false, null, undefined]) {
      it(`displays "Back" for "${text}"`, async () => {
        document.body.innerHTML = await renderHtml('back-link', { context: { text } })
        const $component = document.querySelector('.govuk-back-link')

        equal($component.textContent.trim(), 'Back')
      })
    }
  })

  describe('the `html` option', () => {
    it('does not escape HTML', async () => {
      document.body.innerHTML = await renderHtml('back-link', examples.html)

      const $component = document.querySelector('.govuk-back-link')
      ok($component.innerHTML.includes('<b>Back</b>'))
    })

    for (const html of ['', 0, false, null, undefined]) {
      it(`displays "Back" for "${html}"`, async () => {
        document.body.innerHTML = await renderHtml('back-link', { context: { html } })
        const $component = document.querySelector('.govuk-back-link')

        equal($component.textContent.trim(), 'Back')
      })
    }
  })

  it('sets any additional attributes based on the `attributes` option', async () => {
    document.body.innerHTML = await renderHtml('back-link', examples.attributes)

    const $component = document.querySelector('.govuk-back-link')

    equal($component.getAttribute('data-test'), 'attribute')
    equal($component.getAttribute('aria-label'), 'Back to home')
  })
})
