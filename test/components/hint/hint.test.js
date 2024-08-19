import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { document, getExamples, renderHtml } from '../../helper.js'

describe('Hint', () => {
  let examples

  before(async () => {
    examples = await getExamples('hint')
  })

  it('contains the hint text', async () => {
    document.body.innerHTML = await renderHtml('hint', examples.default)

    const $component = document.querySelector('.govuk-hint')
    equal($component.textContent.trim(), "It's on your National Insurance card, benefit letter, payslip or P60.\nFor example, 'QQ 12 34 56 C'.")
  })

  it('includes additional classes from the `classes` option', async () => {
    document.body.innerHTML = await renderHtml('hint', examples.classes)

    const $component = document.querySelector('.govuk-hint')
    ok([...$component.classList].includes('app-hint--custom-modifier'))
  })

  it('does not include an `id` attribute if the `id` option is not set', async () => {
    document.body.innerHTML = await renderHtml('hint', examples.default)

    const $component = document.querySelector('.govuk-hint')
    equal($component.hasAttribute('id'), false)
  })

  it('sets the `id` attribute based on the `id` option', async () => {
    document.body.innerHTML = await renderHtml('hint', examples.id)

    const $component = document.querySelector('.govuk-hint')
    equal($component.getAttribute('id'), 'my-hint')
  })

  it('escapes HTML when using the `text` option', async () => {
    document.body.innerHTML = await renderHtml('hint', examples['html as text'])

    const $component = document.querySelector('.govuk-hint')
    equal($component.textContent.trim(), 'Unexpected <strong>bold text</strong> in body')
  })

  it('does not escape HTML when using the `html` option', async () => {
    document.body.innerHTML = await renderHtml('hint', examples['with html'])

    const $component = document.querySelector('.govuk-hint')
    ok($component.innerHTML.includes('It\'s on your National Insurance card, benefit letter, payslip or <a class="govuk-link" href="#">P60</a>.\nFor example, \'QQ 12 34 56 C\'.'))
  })

  it('sets any additional attributes based on the `attributes` option', async () => {
    document.body.innerHTML = await renderHtml('hint', examples.attributes)

    const $component = document.querySelector('.govuk-hint')
    equal($component.getAttribute('data-attribute'), 'my data value')
  })
})
