import benchmark from '../bench-component.js'

/** @typedef {import('../../components/error-message/error-message.js').errorMessageConfig} errorConfig */

await benchmark({
  component: 'error-message',

  /** @type {{ [option: string]: errorConfig }} */
  tests: {
    text: {
      text: 'The date your passport was issued must be in the past'
    },

    'custom visually hidden text': {
      text: 'The date your passport was issued must be in the past',
      visuallyHiddenText: 'Big Error'
    },

    html: {
      html: '<strong>The date your passport was issued must be in the past</strong>'
    },

    'with attributes': {
      text: 'The date your passport was issued must be in the past',
      attributes: {
        'data-test-1': 'Test',
        'data-test-2': 'Test'
      }
    }
  }
})
