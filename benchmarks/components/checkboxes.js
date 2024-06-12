import govukInput from '../../components/input/input.js'
import benchmark from '../bench-component.js'

/** @typedef {import('../../components/checkboxes/checkboxes.js').checkboxesConfig} checkboxesConfig */

await benchmark({
  component: 'checkboxes',

  /** @type {{ [option: string]: checkboxesConfig }} */
  tests: {
    'single checkbox': {
      items: [
        {
          text: 'I agree',
          name: 'agree',
          value: 'true'
        }
      ]
    },

    'three checkboxes with legend and hint': {
      name: 'waste',
      fieldset: {
        legend: {
          text: 'Which types of waste do you transport?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      hint: {
        text: 'Select all that apply.'
      },
      items: [
        {
          value: 'carcasses',
          text: 'Waste from animal carcasses'
        },
        {
          value: 'mines',
          text: 'Waste from mines or quarries'
        },
        {
          value: 'farm',
          text: 'Farm or agricultural waste'
        }
      ]
    },

    'four checkboxes, legend, hint and divider': {
      name: 'countries',
      fieldset: {
        legend: {
          text: 'Will you be travelling to any of these countries?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      hint: {
        text: 'Select all countries that apply'
      },
      items: [
        {
          value: 'france',
          text: 'France'
        },
        {
          value: 'portugal',
          text: 'Portugal'
        },
        {
          value: 'spain',
          text: 'Spain'
        },
        {
          divider: 'or'
        },
        {
          value: 'none',
          text: 'No, I will not be travelling to any of these countries',
          behaviour: 'exclusive'
        }
      ]
    },

    'four checkboxes, legend, divider and error message': {
      name: 'countries',
      fieldset: {
        legend: {
          text: 'Will you be travelling to any of these countries?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      errorMessage: {
        text: 'Select countries you will be travelling to, or select ‘No, I will not be travelling to any of these countries’'
      },
      items: [
        {
          value: 'france',
          text: 'France',
          checked: true
        },
        {
          value: 'portugal',
          text: 'Portugal'
        },
        {
          value: 'spain',
          text: 'Spain'
        },
        {
          divider: 'or'
        },
        {
          value: 'none',
          text: 'No, I will not be travelling to any of these countries',
          checked: true,
          behaviour: 'exclusive'
        }
      ]
    },

    'with conditional content': {
      name: 'contact',
      fieldset: {
        legend: {
          text: 'How would you like to be contacted?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      hint: {
        text: 'Select all options that are relevant to you.'
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
          value: 'text message',
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

    'with attributes': {
      name: 'waste',
      fieldset: {
        legend: {
          text: 'Which types of waste do you transport?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      hint: {
        text: 'Select all that apply.'
      },
      items: [
        {
          value: 'carcasses',
          text: 'Waste from animal carcasses'
        },
        {
          value: 'mines',
          text: 'Waste from mines or quarries'
        },
        {
          value: 'farm',
          text: 'Farm or agricultural waste'
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-checkboxes-type': 'continue'
      }
    }
  }
})
