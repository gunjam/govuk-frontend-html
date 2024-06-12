import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('fieldset', () => {
  let examples

  before(async () => {
    examples = await getExamples('fieldset')
  })

  it('creates a fieldset', async () => {
    const $ = await render('fieldset', examples.default)

    const $component = $('fieldset.govuk-fieldset')
    ok($component.get(0).tagName.includes('fieldset'))
  })

  it('includes a legend element which captions the fieldset', async () => {
    const $ = await render('fieldset', examples.default)

    const $legend = $('.govuk-fieldset__legend')
    equal($legend.get(0).tagName, 'legend')
  })

  it('nests the legend within the fieldset', async () => {
    const $ = await render('fieldset', examples.default)

    const $legend = $('.govuk-fieldset__legend')
    equal($legend.parent().get(0).tagName, 'fieldset')
  })

  it('allows you to set the legend text', async () => {
    const $ = await render('fieldset', examples.default)

    const $legend = $('.govuk-fieldset__legend')
    equal($legend.text().trim(), 'What is your address?')
  })

  it('allows you to set the aria-describedby attribute', async () => {
    const $ = await render('fieldset', examples['with describedBy'])

    const $component = $('.govuk-fieldset')
    equal($component.attr('aria-describedby'), 'test-target-element')
  })

  it('escapes HTML in the text argument', async () => {
    const $ = await render('fieldset', examples['html as text'])

    const $legend = $('.govuk-fieldset__legend')
    ok($legend.html().includes('&lt;b&gt;your&lt;/b&gt;'))
  })

  it('does not escape HTML in the html argument', async () => {
    const $ = await render('fieldset', examples.html)

    const $legend = $('.govuk-fieldset__legend')
    ok($legend.html().includes('<b>your</b>'))
  })

  it('nests the legend text in an H1 if the legend is a page heading', async () => {
    const $ = await render('fieldset', examples['as page heading l'])

    const $headingInsideLegend = $('.govuk-fieldset__legend > h1')
    equal($headingInsideLegend.text().trim(), 'What is your address?')
  })

  it('renders html when passed as fieldset content', async () => {
    const $ = await render('fieldset', examples['html fieldset content'])

    equal($('.govuk-fieldset .my-content').text().trim(), 'This is some content to put inside the fieldset')
  })

  it('can have additional classes on the legend', async () => {
    const $ = await render('fieldset', examples['legend classes'])

    const $legend = $('.govuk-fieldset__legend')
    ok($legend.hasClass('my-custom-class'))
  })

  it('can have additional classes on the fieldset', async () => {
    const $ = await render('fieldset', examples.classes)

    const $component = $('.govuk-fieldset')
    ok($component.hasClass('app-fieldset--custom-modifier'))
  })

  it('can have an explicit role', async () => {
    const $ = await render('fieldset', examples.role)

    const $component = $('.govuk-fieldset')
    equal($component.attr('role'), 'group')
  })

  it('can have additional attributes', async () => {
    const $ = await render('fieldset', examples.attributes)

    const $component = $('.govuk-fieldset')
    equal($component.attr('data-attribute'), 'value')
  })
})
