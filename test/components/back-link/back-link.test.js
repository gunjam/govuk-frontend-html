import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('back-link component', () => {
  let examples

  before(async () => {
    examples = await getExamples('back-link')
  })

  it('renders the default example with an anchor, href and text correctly', async () => {
    const $ = await render('back-link', examples.default)

    const $component = $('.govuk-back-link')
    equal($component.get(0).tagName, 'a')
    equal($component.attr('href'), '#')
    equal($component.text(), 'Back')
  })

  it('renders classes correctly', async () => {
    const $ = await render('back-link', examples.classes)

    const $component = $('.govuk-back-link')
    ok($component.hasClass('app-back-link--custom-class'))
  })

  it('renders custom text correctly', async () => {
    const $ = await render('back-link', examples['with custom text'])

    const $component = $('.govuk-back-link')
    equal($component.html(), 'Back to home')
  })

  it('renders escaped html when passed to text', async () => {
    const $ = await render('back-link', examples['html as text'])

    const $component = $('.govuk-back-link')
    equal($component.html(), '&lt;b&gt;Home&lt;/b&gt;')
  })

  it('renders html correctly', async () => {
    const $ = await render('back-link', examples.html)

    const $component = $('.govuk-back-link')
    equal($component.html(), '<b>Back</b>')
  })

  it('renders default text correctly', async () => {
    const $ = await render('back-link', examples.default)

    const $component = $('.govuk-back-link')
    equal($component.html(), 'Back')
  })

  it('renders attributes correctly', async () => {
    const $ = await render('back-link', examples.attributes)

    const $component = $('.govuk-back-link')
    equal($component.attr('data-test'), 'attribute')
    equal($component.attr('aria-label'), 'Back to home')
  })

  it('renders with inverted colours if specified', async () => {
    const $ = await render('back-link', examples.inverse)

    const $component = $('.govuk-back-link')
    ok($component.hasClass('govuk-back-link--inverse'))
  })
})
