import benchmark from '../bench-component.js'

/** @typedef {import('../../components/password-input/password-input.js').passwordInputConfig} passwordInputConfig */

await benchmark({
  component: 'password-input',

  /** @type {{ [option: string]: passwordInputConfig }} */
  tests: {
    simple: {
      label: {
        text: 'Password'
      },
      id: 'password-input',
      name: 'password'
    },

    'with error message': {
      label: {
        text: 'Password'
      },
      id: 'password-input-with-error-message',
      name: 'password-input-with-error-message',
      errorMessage: {
        text: 'Enter a password'
      }
    },

    'with attributes': {
      label: {
        text: 'Password'
      },
      id: 'password-input',
      name: 'password',
      attributes: {
        'arial-label': 'label',
        'data-password-input-type': 'password'
      }
    }
  }
})
