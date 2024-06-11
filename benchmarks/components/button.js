import benchmark from '../bench-component.js'

/** @typedef {import('../../components/button/button.js').buttonConfig} buttonConfig */

await benchmark({
  component: 'button',

  /** @type {{ [option: string]: buttonConfig }} */
  tests: {
    'start now link': {
      text: 'Start now',
      href: '/start',
      isStartButton: true
    },

    input: {
      text: 'Continue',
      element: 'input',
      disabled: true
    },

    button: {
      text: 'Continue',
      preventDoubleClick: true
    },

    'with attributes': {
      text: 'Continue',
      attributes: {
        'arial-label': 'label',
        'data-button-type': 'continue'
      }
    }
  }
})
