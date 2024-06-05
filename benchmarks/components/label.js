import benchmark from '../bench-component.js'

await benchmark({
  component: 'label',
  tests: {
    'label text': {
      text: 'National insurance number'
    },
    'label html': {
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
