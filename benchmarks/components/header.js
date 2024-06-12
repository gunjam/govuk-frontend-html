import benchmark from '../bench-component.js'

/** @typedef {import('../../components/header/header.js').headerConfig} headerConfig */

await benchmark({
  component: 'header',

  /** @type {{ [option: string]: headerConfig }} */
  tests: {
    'no service name or navigation': {
      homepageUrl: '#'
    },

    'with service name': {
      homepageUrl: '#',
      serviceName: 'Service name',
      serviceUrl: '#'
    },

    'with service name and navigation': {
      homepageUrl: '#',
      serviceName: 'Service name',
      serviceUrl: '#',
      navigation: [
        {
          href: '#',
          text: 'Navigation item 1',
          active: true
        },
        {
          href: '#',
          text: 'Navigation item 2'
        },
        {
          href: '#',
          text: 'Navigation item 3'
        },
        {
          href: '#',
          text: 'Navigation item 4'
        }
      ]
    },

    'with attributes': {
      homepageUrl: '#',
      serviceName: 'Service name',
      serviceUrl: '#',
      attributes: {
        'arial-label': 'label',
        'data-header-type': 'continue'
      }
    }
  }
})
