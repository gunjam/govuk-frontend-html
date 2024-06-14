import benchmark from '../bench-component.js'

/** @typedef {import('../../components/date-input/date-input.js').dateInputConfig} dateInputConfig */

await benchmark({
  component: 'date-input',

  /** @type {{ [option: string]: dateInputConfig }} */
  tests: {
    standard: {
      id: 'passport-issued',
      namePrefix: 'passport-issued',
      fieldset: {
        legend: {
          text: 'When was your passport issued?'
        }
      },
      hint: {
        text: 'For example, 27 3 2007'
      }
    },

    'with autocomplete': {
      id: 'dob',
      namePrefix: 'dob',
      fieldset: {
        legend: {
          text: 'What is your date of birth?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      hint: {
        text: 'For example, 31 3 1980'
      },
      items: [
        {
          name: 'day',
          classes: 'govuk-input--width-2',
          autocomplete: 'bday-day'
        },
        {
          name: 'month',
          classes: 'govuk-input--width-2',
          autocomplete: 'bday-month'
        },
        {
          name: 'year',
          classes: 'govuk-input--width-4',
          autocomplete: 'bday-year'
        }
      ]
    },

    'with error message': {
      id: 'passport-issued',
      namePrefix: 'passport-issued',
      fieldset: {
        legend: {
          text: 'When was your passport issued?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      hint: {
        text: 'For example, 27 3 2007'
      },
      errorMessage: {
        text: 'The date your passport was issued must be in the past'
      },
      items: [
        {
          classes: 'govuk-input--width-2 govuk-input--error',
          name: 'day',
          value: '6'
        },
        {
          classes: 'govuk-input--width-2 govuk-input--error',
          name: 'month',
          value: '3'
        },
        {
          classes: 'govuk-input--width-4 govuk-input--error',
          name: 'year',
          value: '2076'
        }
      ]
    },

    'with attributes': {
      id: 'passport-issued',
      namePrefix: 'passport-issued',
      fieldset: {
        legend: {
          text: 'When was your passport issued?'
        }
      },
      hint: {
        text: 'For example, 27 3 2007'
      },
      attributes: {
        'arial-label': 'label',
        'data-date-input-type': 'continue'
      }
    }
  }
})
