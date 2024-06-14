import benchmark from '../bench-component.js'

/** @typedef {import('../../components/character-count/character-count.js').characterCountConfig} characterCountConfig */

await benchmark({
  component: 'character-count',

  /** @type {{ [option: string]: characterCountConfig }} */
  tests: {
    simple: {
      id: 'label-as-page-heading',
      name: 'labelAsPageHeading',
      maxlength: 200,
      label: {
        text: 'Describe the nature of your event'
      }
    },

    'with label as page heading and hint': {
      name: 'withHint',
      id: 'with-hint',
      maxlength: 200,
      label: {
        text: 'Can you provide more detail?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      hint: {
        text: 'Do not include personal or financial information like your National Insurance number or credit card details.'
      }
    },

    'with heading label, hint and error message': {
      id: 'exceeding-characters',
      name: 'exceeding',
      maxlength: 350,
      value:
        'A content designer works on the end-to-end journey of a service to help users complete their goal and government deliver a policy intent. Their work may involve the creation of, or change to, a transaction, product or single piece of content that stretches across digital and offline channels. They make sure appropriate content is shown to a user in the right place and in the best format.',
      label: {
        text: 'Enter a job description',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      errorMessage: {
        text: 'Job description must be 350 characters or less'
      }
    },

    'with attributes': {
      id: 'label-as-page-heading',
      name: 'labelAsPageHeading',
      maxlength: 200,
      label: {
        text: 'Describe the nature of your event'
      },
      attributes: {
        'arial-label': 'label',
        'data-character-count-type': 'continue'
      }
    }
  }
})
