import benchmark from '../bench-component.js'

/** @typedef {import('../../components/error-summary/error-summary.js').errorSummaryConfig} errorSummaryConfig */

await benchmark({
  component: 'error-summary',

  /** @type {{ [option: string]: errorSummaryConfig }} */
  tests: {
    'just title': {
      titleText: 'There is a problem'
    },

    'title and 2 errors': {
      titleText: 'There is a problem',
      errorList: [
        {
          text: 'Enter your full name',
          href: '#'
        },
        {
          text: 'The date your passport was issued must be in the past',
          href: '#'
        }
      ]
    },

    'title, descriptions and errors': {
      titleText: 'There is a problem',
      descriptionText: 'Check your errors',
      errorList: [
        {
          text: 'Enter your full name',
          href: '#'
        },
        {
          text: 'The date your passport was issued must be in the past',
          href: '#'
        }
      ]
    },

    'with attributes': {
      titleText: 'There is a problem',
      errorList: [
        {
          text: 'Enter your full name',
          href: '#'
        },
        {
          text: 'The date your passport was issued must be in the past',
          href: '#'
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-error-summary-type': 'continue'
      }
    }
  }
})
