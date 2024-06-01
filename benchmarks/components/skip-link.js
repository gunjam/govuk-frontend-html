import benchmark from '../bench-component.js'

/** @typedef {import('../../components/skip-link/skip-link.js').skipLinkConfig} skipLinkConfig */

await benchmark({
  component: 'skip-link',

  /** @type {{ [option: string]: skipLinkConfig }} */
  tests: {
    'text with href': {
      text: 'Skip to main content',
      href: '#main-content'
    },

    'with attributes': {
      text: 'Skip to main content',
      href: '#main-content',
      attributes: {
        'data-test-1': 'Test',
        'data-test-2': 'Test'
      }
    }
  }
})
