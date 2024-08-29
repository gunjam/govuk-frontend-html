import benchmark from '../bench-component.js'

/** @typedef {import('../../components/service-navigation/service-navigation.js').serviceNavigationConfig} serviceNavigationConfig */

await benchmark({
  component: 'service-navigation',

  /** @type {{ [option: string]: serviceNavigationConfig }} */
  tests: {
    'service name only': {
      serviceName: 'Service name',
      serviceUrl: '#'
    },

    navigation: {
      navigation: [
        {
          href: '#',
          text: 'Navigation item 1'
        },
        {
          href: '#',
          text: 'Navigation item 2',
          active: true
        },
        {
          href: '#',
          text: 'Navigation item 3'
        }
      ]
    },

    'service name and navigation': {
      serviceName: 'Service name',
      serviceUrl: '#',
      navigation: [
        {
          href: '#',
          text: 'Navigation item 1'
        },
        {
          href: '#',
          text: 'Navigation item 2',
          active: true
        },
        {
          href: '#',
          text: 'Navigation item 3'
        }
      ]
    },

    'with attributes': {
      serviceName: 'Service name',
      serviceUrl: '#',
      navigation: [
        {
          href: '#',
          text: 'Navigation item 1'
        },
        {
          href: '#',
          text: 'Navigation item 2',
          active: true
        },
        {
          href: '#',
          text: 'Navigation item 3'
        }
      ],
      attributes: {
        'aria-label': 'label',
        'data-service-navigation-type': 'this-service-nav'
      }
    }
  }
})
