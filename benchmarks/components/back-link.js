import benchmark from '../bench-component.js'

/** @typedef {import('../../components/back-link/back-link.js').backLinkConfig} backLinkConfig */

await benchmark({
  component: 'back-link',

  /** @type {{ [option: string]: backLinkConfig }} */
  tests: {
    text: {
      href: '/start',
      text: 'Go back to start page'
    },

    html: {
      html: 'Go back to <span>start page</span>'
    },

    'no text': {
      href: '/start'
    },

    'with attributes': {
      text: 'Go back to start page',
      classes: 'back-link',
      attributes: {
        'arial-label': 'back',
        'data-details': 'back'
      }
    }
  }
})
