import benchmark from '../bench-component.js'

/** @typedef {import('../../components/label/label.js').labelConfig} labelConfig */

await benchmark({
  component: 'label',

  /** @type {{ [option: string]: labelConfig }} */
  tests: {
    text: {
      text: 'National insurance number'
    },

    html: {
      html: '<strong>National insurance number</strong>'
    },

    'page heading': {
      text: 'What is your date of birth?',
      classes: 'govuk-label--xl',
      isPageHeading: true
    },

    'with attributes': {
      text: 'Favourite colour',
      attributes: {
        'data-test-1': 'Test',
        'data-test-2': 'Test'
      }
    }
  }
})
