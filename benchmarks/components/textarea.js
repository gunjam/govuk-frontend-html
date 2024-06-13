import benchmark from '../bench-component.js'

/** @typedef {import('../../components/textarea/textarea.js').textareaConfig} textareaConfig */

await benchmark({
  component: 'textarea',

  /** @type {{ [option: string]: textareaConfig }} */
  tests: {
    simple: {
      name: 'moreDetail',
      id: 'more-detail',
      label: {
        text: 'Can you provide more detail?'
      }
    },

    'page heading label and hint': {
      name: 'moreDetail',
      id: 'more-detail',
      label: {
        text: 'Can you provide more detail?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      hint: {
        text: 'Do not include personal or financial information, like your National Insurance number or credit card details.'
      }
    },

    'page heading label, hint and error message': {
      name: 'moreDetail',
      id: 'more-detail',
      label: {
        text: 'Can you provide more detail?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      hint: {
        text: 'Do not include personal or financial information, like your National Insurance number or credit card details.'
      },
      errorMessage: {
        text: 'Enter more detail'
      }
    },

    'with attributes': {
      name: 'moreDetail',
      id: 'more-detail',
      label: {
        text: 'Can you provide more detail?'
      },
      attributes: {
        'arial-label': 'label',
        'data-textarea-type': 'continue'
      }
    }
  }
})
