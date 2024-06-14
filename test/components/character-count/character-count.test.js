import { equal, match, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, htmlWithClassName, render } from '../../helper.js'

const WORD_BOUNDARY = '\\b'

describe('Character count', () => {
  let examples

  before(async () => {
    examples = await getExamples('character-count')
  })

  describe('default example', () => {
    it('renders with id', async () => {
      const $ = await render('character-count', examples.default)

      const $component = $('.govuk-js-character-count')
      equal($component.attr('id'), 'more-detail')
    })

    it('renders with name', async () => {
      const $ = await render('character-count', examples.default)

      const $component = $('.govuk-js-character-count')
      equal($component.attr('name'), 'more-detail')
    })

    it('renders with default number of rows', async () => {
      const $ = await render('character-count', examples.default)

      const $component = $('.govuk-js-character-count')
      equal($component.attr('rows'), '5')
    })
  })

  describe('custom options', () => {
    it('renders with classes', async () => {
      const $ = await render('character-count', examples.classes)

      const $component = $('.govuk-js-character-count')
      ok($component.hasClass('app-character-count--custom-modifier'))
    })

    it('renders with rows', async () => {
      const $ = await render('character-count', examples['with custom rows'])

      const $component = $('.govuk-js-character-count')
      equal($component.attr('rows'), '8')
    })

    it('renders with value', async () => {
      const $ = await render('character-count', examples['with default value'])

      const $component = $('.govuk-js-character-count')
      equal($component.text(), '221B Baker Street\nLondon\nNW1 6XE\n')
    })

    it('renders with attributes', async () => {
      const $ = await render('character-count', examples.attributes)

      const $component = $('.govuk-js-character-count')
      equal($component.attr('data-attribute'), 'my data value')
    })

    it('renders with formGroup', async () => {
      const $ = await render('character-count', examples['formGroup with classes'])

      const $component = $('.govuk-form-group')
      ok($component.hasClass('app-character-count--custom-modifier'))
    })
  })

  describe('count message', () => {
    it('renders with the amount of characters expected', async () => {
      const $ = await render('character-count', examples.default)

      const $countMessage = $('.govuk-character-count__message')
      ok($countMessage.text().includes('You can enter up to 10 characters'))
    })

    it('renders with the amount of words expected', async () => {
      const $ = await render('character-count', examples['with word count'])

      const $countMessage = $('.govuk-character-count__message')
      ok($countMessage.text().includes('You can enter up to 10 words'))
    })

    it('is associated with the textarea', async () => {
      const $ = await render('character-count', examples.default)

      const $textarea = $('.govuk-js-character-count')
      const countMessageId = $('.govuk-character-count__message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${countMessageId}${WORD_BOUNDARY}`)

      match($textarea.attr('aria-describedby'), describedBy)
    })

    it('renders with custom classes', async () => {
      const $ = await render('character-count', examples['custom classes on countMessage'])

      const $countMessage = $('.govuk-character-count__message')
      ok($countMessage.hasClass('app-custom-count-message'))
    })
  })

  describe('when it has the spellcheck attribute', () => {
    it('renders the textarea with spellcheck attribute set to true', async () => {
      const $ = await render('character-count', examples['spellcheck enabled'])

      const $component = $('.govuk-character-count .govuk-textarea')
      equal($component.attr('spellcheck'), 'true')
    })

    it('renders the textarea with spellcheck attribute set to false', async () => {
      const $ = await render('character-count', examples['spellcheck disabled'])

      const $component = $('.govuk-character-count .govuk-textarea')
      equal($component.attr('spellcheck'), 'false')
    })

    it('renders the textarea without spellcheck attribute by default', async () => {
      const $ = await render('character-count', examples.default)

      const $component = $('.govuk-character-count .govuk-textarea')
      equal($component.attr('spellcheck'), undefined)
    })
  })

  describe('when it includes a hint', () => {
    it('renders with hint', async () => {
      const $ = await render('character-count', examples['with hint'])

      equal(
        htmlWithClassName($, '.govuk-hint'),
        `\
<div class="govuk-hint " id="with-hint-hint">\
Don't include personal or financial information, eg your National Insurance number or credit card details.\
</div>\
<div class="govuk-hint govuk-character-count__message" id="with-hint-info">\
You can enter up to 10 characters\
</div>`
      )
    })

    it('associates the character count as "described by" the hint', async () => {
      const $ = await render('character-count', examples['with hint'])

      const $textarea = $('.govuk-js-character-count')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`)

      match($textarea.attr('aria-describedby'), describedBy)
    })
  })

  describe('when it includes an error message', () => {
    it('renders with error message', async () => {
      const $ = await render('character-count', examples['with default value exceeding limit'])

      equal(htmlWithClassName($, '.govuk-error-message'), `<p id="exceeding-characters-error" class="govuk-error-message "> Please do not exceed the maximum allowed limit</p>`)
    })

    it('associates the character-count as "described by" the error message', async () => {
      const $ = await render('character-count', examples['with default value exceeding limit'])

      const $component = $('.govuk-js-character-count')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(`${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`)

      match($component.attr('aria-describedby'), describedBy)
    })

    it('adds the error class to the character-count', async () => {
      const $ = await render('character-count', examples['with default value exceeding limit'])

      const $component = $('.govuk-js-character-count')
      ok($component.hasClass('govuk-textarea--error'))
    })

    it('renders with classes', async () => {
      const $ = await render('character-count', examples['custom classes with error message'])

      const $component = $('.govuk-js-character-count')
      ok($component.hasClass('app-character-count--custom-modifier'))
    })
  })

  describe('with dependant components', () => {
    it('have correct nesting order', async () => {
      const $ = await render('character-count', examples['with default value exceeding limit'])

      const $component = $('.govuk-form-group > .govuk-js-character-count')
      ok($component.length)
    })

    it('renders with label', async () => {
      const $ = await render('character-count', examples.default)

      equal(htmlWithClassName($, '.govuk-label'), `<label class="govuk-label " for="more-detail">Can you provide more detail?</label>`)
    })

    it('renders label with "for" attribute reffering the character count "id"', async () => {
      const $ = await render('character-count', examples.default)

      const $label = $('.govuk-label')
      equal($label.attr('for'), 'more-detail')
    })
  })

  describe('with threshold', () => {
    it('hides the count to start with', async () => {
      const $ = await render('character-count', examples['with threshold'])

      const $component = $('.govuk-character-count')
      equal($component.attr('data-threshold'), '75')
    })
  })

  describe('with custom textarea description', () => {
    it('allows customisation of the textarea description', async () => {
      const $ = await render('character-count', examples['with custom textarea description'])

      const message = $('.govuk-character-count__message').text().trim()
      equal(message, 'Gallwch ddefnyddio hyd at 10 nod')
    })
  })

  describe('translations', () => {
    it('renders with translation data attributes', async () => {
      const $ = await render('character-count', examples['with translations'])

      const $component = $('[data-module]')

      for (const [attributeName, expectedValue] of Object.entries({
        'data-i18n.characters-under-limit.one': 'One character to go',
        'data-i18n.characters-under-limit.other': '%{count} characters to go',
        'data-i18n.characters-at-limit': 'Zero characters left',
        'data-i18n.characters-over-limit.one': 'One character too many',
        'data-i18n.characters-over-limit.other': '%{count} characters too many',
        'data-i18n.words-under-limit.one': 'One word to go',
        'data-i18n.words-under-limit.other': '%{count} words to go',
        'data-i18n.words-at-limit': 'Zero words left',
        'data-i18n.words-over-limit.one': 'One word too many',
        'data-i18n.words-over-limit.other': '%{count} words too many'
      })) {
        equal($component.attr(attributeName), expectedValue)
      }
    })
  })

  describe('when neither maxlength nor maxwords are set', () => {
    describe('with textarea description set', () => {
      // If the template has no maxwords or maxlength to go for
      // it needs to pass down any textarea description to the JavaScript
      // so it can inject the limit it may have received at instantiation
      it('renders the textarea description as a data attribute', async () => {
        const $ = await render('character-count', examples['when neither maxlength nor maxwords are set'])

        // Fallback hint is passed as data attribute
        const $component = $('[data-module]')
        equal($component.attr('data-i18n.textarea-description.other'), 'No more than %{count} characters')

        // No content is set as the accessible description cannot be interpolated on the backend
        // It'll be up to the JavaScript to fill it in
        const $countMessage = $('.govuk-character-count__message')
        match($countMessage.html(), /^\s*$/) // The macro outputs linebreaks around the hint itself
      })
    })

    describe('without textarea description', () => {
      it('does not render a textarea description data attribute', async () => {
        const $ = await render('character-count', examples['when neither maxlength/maxwords nor textarea description are set'])

        const $component = $('[data-module]')
        equal($component.attr('data-i18n.textarea-description.other'), undefined)
      })
    })
  })
})
