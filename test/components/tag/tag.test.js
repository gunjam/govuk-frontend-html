import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { document, getExamples, renderHtml } from '../../helper.js'

describe('Tag', () => {
  let examples

  before(async () => {
    examples = await getExamples('tag')
  })

  it('outputs a <strong> element', async () => {
    document.body.innerHTML = await renderHtml('tag', examples.default)
    const $component = document.querySelector('.govuk-tag')

    equal($component.tagName, 'STRONG')
  })

  it('contains the content from the `text` option', async () => {
    document.body.innerHTML = await renderHtml('tag', examples.default)
    const $component = document.querySelector('.govuk-tag')

    equal($component.textContent.trim(), 'Alpha')
  })

  it('includes additional classes from the `classes` option', async () => {
    document.body.innerHTML = await renderHtml('tag', examples.grey)
    const $component = document.querySelector('.govuk-tag')

    ok([...$component.classList].includes('govuk-tag--grey'))
  })

  it('escapes HTML when using the `text` option', async () => {
    document.body.innerHTML = await renderHtml('tag', examples['html as text'])
    const $component = document.querySelector('.govuk-tag')

    equal($component.textContent.trim(), '<span>Alpha</span>')
  })

  it('does not escape HTML when using the `html` option', async () => {
    document.body.innerHTML = await renderHtml('tag', examples.html)
    const $component = document.querySelector('.govuk-tag')

    ok($component.innerHTML.includes('<span>Alpha</span>'))
  })

  it('sets any additional attributes based on the `attributes` option', async () => {
    document.body.innerHTML = await renderHtml('tag', examples.attributes)
    const $component = document.querySelector('.govuk-tag')

    equal($component.getAttribute('data-test'), 'attribute')
    equal($component.getAttribute('id'), 'my-tag')
  })
})
