import benchmark from '../bench-component.js'

/** @typedef {import('../../components/breadcrumbs/breadcrumbs.js').breadcrumbsConfig} breadcrumbsConfig */

await benchmark({
  component: 'breadcrumbs',

  /** @type {{ [option: string]: breadcrumbsConfig }} */
  tests: {
    'three links': {
      items: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Passports, travel and living abroad',
          href: '/passports-travel-living-abroad'
        },
        {
          text: 'Travel abroad',
          href: '/travel-abroad'
        }
      ]
    },

    'custom classes, collapsible on mobile': {
      classes: 'custom',
      collapseOnMobile: true,
      items: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Passports, travel and living abroad',
          href: '/passports-travel-living-abroad'
        },
        {
          text: 'Travel abroad',
          href: '/travel-abroad'
        }
      ]
    },

    'with attributes': {
      items: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Passports, travel and living abroad',
          href: '/passports-travel-living-abroad'
        },
        {
          text: 'Travel abroad',
          href: '/travel-abroad'
        }
      ],
      attributes: {
        'arial-label': 'breadcrumbs',
        'data-breadcrumbs': 'breadcrumbs'
      }
    }
  }
})
