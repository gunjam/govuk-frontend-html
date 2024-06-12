import govukInput from '../../components/input/input.js'
import benchmark from '../bench-component.js'

/** @typedef {import('../../components/radios/radios.js').radiosConfig} radiosConfig */

await benchmark({
  component: 'radios',

  /** @type {{ [option: string]: radiosConfig }} */
  tests: {
    'four radios': {
      name: 'whereDoYouLive',
      fieldset: {
        legend: {
          text: 'Where do you live?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'england',
          text: 'England'
        },
        {
          value: 'scotland',
          text: 'Scotland'
        },
        {
          value: 'wales',
          text: 'Wales'
        },
        {
          value: 'northern-ireland',
          text: 'Northern Ireland'
        }
      ]
    },

    'with fieldset and radio hints': {
      name: 'signIn',
      fieldset: {
        legend: {
          text: 'How do you want to sign in?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      hint: {
        text: 'You’ll need an account to prove your identity and complete your Self Assessment.'
      },
      items: [
        {
          value: 'government-gateway',
          text: 'Sign in with Government Gateway',
          hint: {
            text: 'You’ll have a user ID if you’ve registered for Self Assessment or filed a tax return online before.'
          }
        },
        {
          value: 'govuk-one-login',
          text: 'Sign in with GOV.UK One Login',
          hint: {
            text: 'If you don’t have a GOV.UK One Login, you can create one.'
          }
        }
      ]
    },

    'with divider': {
      name: 'whereDoYouLive',
      fieldset: {
        legend: {
          text: 'Where do you live?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'england',
          text: 'England'
        },
        {
          value: 'scotland',
          text: 'Scotland'
        },
        {
          value: 'wales',
          text: 'Wales'
        },
        {
          value: 'northern-ireland',
          text: 'Northern Ireland'
        },
        {
          divider: 'or'
        },
        {
          value: 'abroad',
          text: 'I am a British citizen living abroad'
        }
      ]
    },

    'with conditional content': {
      name: 'contact',
      fieldset: {
        legend: {
          text: 'How would you prefer to be contacted?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      hint: {
        text: 'Select one option.'
      },
      items: [
        {
          value: 'email',
          text: 'Email',
          conditional: {
            html: govukInput({
              id: 'contact-by-email',
              name: 'contactByEmail',
              type: 'email',
              autocomplete: 'email',
              spellcheck: false,
              classes: 'govuk-!-width-one-third',
              label: {
                text: 'Email address'
              }
            })
          }
        },
        {
          value: 'phone',
          text: 'Phone',
          conditional: {
            html: govukInput({
              id: 'contact-by-phone',
              name: 'contactByPhone',
              type: 'tel',
              autocomplete: 'tel',
              classes: 'govuk-!-width-one-third',
              label: {
                text: 'Phone number'
              }
            })
          }
        },
        {
          value: 'text',
          text: 'Text message',
          conditional: {
            html: govukInput({
              id: 'contact-by-text',
              name: 'contactByText',
              type: 'tel',
              autocomplete: 'tel',
              classes: 'govuk-!-width-one-third',
              label: {
                text: 'Mobile phone number'
              }
            })
          }
        }
      ]
    },

    'with error message': {
      name: 'whereDoYouLive',
      fieldset: {
        legend: {
          text: 'Where do you live?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'england',
          text: 'England'
        },
        {
          value: 'scotland',
          text: 'Scotland'
        },
        {
          value: 'wales',
          text: 'Wales'
        },
        {
          value: 'northern-ireland',
          text: 'Northern Ireland'
        }
      ],
      errorMessage: {
        text: 'Select the country where you live'
      }
    },

    'with attributes': {
      name: 'whereDoYouLive',
      fieldset: {
        legend: {
          text: 'Where do you live?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'england',
          text: 'England'
        },
        {
          value: 'scotland',
          text: 'Scotland'
        },
        {
          value: 'wales',
          text: 'Wales'
        },
        {
          value: 'northern-ireland',
          text: 'Northern Ireland'
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-radios-type': 'continue'
      }
    }
  }
})
