import benchmark from '../bench-component.js'

/** @typedef {import('../../components/exit-this-page/exit-this-page.js').exitThisPageConfig} exitThisPageConfig */

await benchmark({
  component: 'exit-this-page',

  /** @type {{ [option: string]: exitThisPageConfig }} */
  tests: {
    'no options': {},

    'custom text, href and classes': {
      text: 'Exit this page',
      redirectUrl: 'https://bbc.co.uk/weather/',
      classes: 'govuk-js-exit-this-page-skiplink'
    },

    'all params': {
      text: 'Exit this page',
      redirectUrl: 'https://bbc.co.uk/weather/',
      classes: 'govuk-js-exit-this-page-skiplink',
      activatedText: 'Loading',
      html: 'HTML content',
      id: 'exit-this-page',
      pressOneMoreTimeText: 'Press one more time',
      pressTwoMoreTimesText: 'Press two more times',
      timedOutText: 'Exit this page expired',
      attributes: {
        rel: 'nofollow noreferrer'
      }
    },

    'with attributes': {
      attributes: {
        'arial-label': 'label',
        'data-exit-this-page-type': 'exit'
      }
    }
  }
})
