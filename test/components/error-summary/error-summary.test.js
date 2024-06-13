import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Error-summary', () => {
  let examples

  before(async () => {
    examples = await getExamples('error-summary')
  })

  describe('default example', () => {
    it('has a child container with the role=alert attribute', async () => {
      const $ = await render('error-summary', examples.default)
      const childRoleAttr = $('.govuk-error-summary div:first-child').attr('role')

      equal(childRoleAttr, 'alert')
    })

    it('renders title text', async () => {
      const $ = await render('error-summary', examples.default)
      const summaryTitle = $('.govuk-error-summary__title').text().trim()

      equal(summaryTitle, 'There is a problem')
    })

    it('renders error list element', async () => {
      const $ = await render('error-summary', examples.default)
      const $errorList = $('.govuk-error-summary__list')

      equal($errorList.length, 1)
    })

    it('number of error items matches the number of items specified', async () => {
      const $ = await render('error-summary', examples.default)
      const errorList = $('.govuk-error-summary .govuk-error-summary__list li')

      equal(errorList.length, 2)
    })

    it('error list item is an anchor tag if href attribute is specified', async () => {
      const $ = await render('error-summary', examples.default)

      const errorItem = $('.govuk-error-summary .govuk-error-summary__list li:first-child')
      equal(errorItem.children().get(0).tagName, 'a')
    })

    it('render anchor tag href attribute is correctly', async () => {
      const $ = await render('error-summary', examples.default)

      const errorItem = $('.govuk-error-summary .govuk-error-summary__list li:first-child a')
      equal(errorItem.attr('href'), '#example-error-1')
    })
  })

  describe('custom options', () => {
    it('allows title text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('error-summary', examples['html as titleText'])

      const summaryTitle = $('.govuk-error-summary__title').html().trim()
      equal(summaryTitle, 'Alert, &lt;em&gt;alert&lt;/em&gt;')
    })

    it('allows title HTML to be passed un-escaped', async () => {
      const $ = await render('error-summary', examples['title html'])

      const summaryTitle = $('.govuk-error-summary__title').html().trim()
      equal(summaryTitle, 'Alert, <em>alert</em>')
    })

    it('renders description text', async () => {
      const $ = await render('error-summary', examples.description)
      const summaryDescription = $('.govuk-error-summary__body p').text().trim()

      equal(summaryDescription, 'Lorem ipsum')
    })

    it('allows description text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('error-summary', examples['html as descriptionText'])

      const summaryDescription = $('.govuk-error-summary__body p').html().trim()
      equal(summaryDescription, 'See errors below (&gt;)')
    })

    it('allows description HTML to be passed un-escaped', async () => {
      const $ = await render('error-summary', examples['description html'])

      const summaryDescription = $('.govuk-error-summary__body p').html().trim()
      equal(summaryDescription, 'See <span>errors</span> below')
    })

    it('allows additional classes to be added to the error-summary component', async () => {
      const $ = await render('error-summary', examples.classes)

      const $component = $('.govuk-error-summary')
      ok($component.hasClass('extra-class one-more-class'))
    })

    it('allows additional attributes to be added to the error-summary component', async () => {
      const $ = await render('error-summary', examples.attributes)

      const $component = $('.govuk-error-summary')
      equal($component.attr('first-attribute'), 'foo')
      equal($component.attr('second-attribute'), 'bar')
    })

    it("doesn't render the error list element if no errors are passed", async () => {
      const $ = await render('error-summary', examples['with description only'])
      const $errorList = $('.govuk-error-summary__list')

      equal($errorList.length, 0)
    })

    it('renders anchor tag with attributes', async () => {
      const $ = await render('error-summary', examples['error list with attributes'])

      const $component = $('.govuk-error-summary__list a')
      equal($component.attr('data-attribute'), 'my-attribute')
      equal($component.attr('data-attribute-2'), 'my-attribute-2')
    })

    it('renders error item text', async () => {
      const $ = await render('error-summary', examples['without links'])
      const errorItemText = $('.govuk-error-summary .govuk-error-summary__list li:first-child').text().trim()

      equal(errorItemText, 'Invalid username or password')
    })

    it('allows error item HTML to be passed un-escaped', async () => {
      const $ = await render('error-summary', examples['error list with html'])

      const errorItemText = $('.govuk-error-summary .govuk-error-summary__list li').html().trim()

      equal(errorItemText, 'The date your passport was issued <b>must</b> be in the past')
    })

    it('allows error item text to be passed whilst escaping HTML entities', async () => {
      const $ = await render('error-summary', examples['error list with html as text'])

      const errorItemText = $('.govuk-error-summary .govuk-error-summary__list li').html().trim()

      equal(errorItemText, 'Descriptive link to the &lt;b&gt;question&lt;/b&gt; with an error')
    })

    it('allows error item HTML inside "a" tag to be passed un-escaped', async () => {
      const $ = await render('error-summary', examples['error list with html link'])

      const errorItemText = $('.govuk-error-summary .govuk-error-summary__list li a').html().trim()

      equal(errorItemText, 'Descriptive link to the <b>question</b> with an error')
    })

    it('allows error item text inside "a" tag to be passed whilst escaping HTML entities', async () => {
      const $ = await render('error-summary', examples['error list with html as text link'])

      const errorItemText = $('.govuk-error-summary .govuk-error-summary__list li a').html().trim()

      equal(errorItemText, 'Descriptive link to the &lt;b&gt;question&lt;/b&gt; with an error')
    })

    it('allows to disable autofocus', async () => {
      const $ = await render('error-summary', examples['autofocus disabled'])

      const $component = $('.govuk-error-summary')
      equal($component.attr('data-disable-auto-focus'), 'true')
    })

    it('allows to explicitely enable autofocus', async () => {
      const $ = await render('error-summary', examples['autofocus explicitly enabled'])

      const $component = $('.govuk-error-summary')
      equal($component.attr('data-disable-auto-focus'), 'false')
    })
  })
})
