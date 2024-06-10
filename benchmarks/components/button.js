import benchmark from '../bench-component.js'

await benchmark({
  component: 'button',
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
