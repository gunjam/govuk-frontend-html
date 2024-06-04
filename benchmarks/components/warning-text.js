import benchmark from '../bench-component.js'

/** @typedef {import('../../components/warning-text/warning-text.js').warningTextConfig} warningConfig */

await benchmark({
  component: 'warning-text',

  /** @type {{ [option: string]: warningConfig }} */
  tests: {
    text: {
      text: 'You can be fined up to £5,000 if you do not register.'
    },

    html: {
      html: 'You can be fined up to £5,000 if you do not <a href="#">register</a>.'
    },

    'with attributes': {
      text: 'You can be fined up to £5,000 if you do not register.',
      attributes: {
        'data-test-1': 'Test',
        'data-test-2': 'Test'
      }
    }
  }
})
