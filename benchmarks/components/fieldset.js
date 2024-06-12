import benchmark from '../bench-component.js'

/** @typedef {import('../../components/fieldset/fieldset.js').fieldsetConfig} fieldsetConfig */

await benchmark({
  component: 'fieldset',

  /** @type {{ [option: string]: fieldsetConfig }} */
  tests: {
    'no legend': {
      html: '<p>Test</p>'
    },

    'with legend': {
      legend: {
        text: 'Legend text'
      },
      html: '<p>Test</p>'
    },

    'with heading legend': {
      legend: {
        text: 'Legend text',
        isPageHeading: true
      },
      html: '<p>Test</p>'
    },

    'with attributes': {
      legend: {
        text: 'Legend text'
      },
      html: '<p>Test</p>',
      attributes: {
        'arial-label': 'label',
        'data-fieldset-type': 'continue'
      }
    }
  }
})
