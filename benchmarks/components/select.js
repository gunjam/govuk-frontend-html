import benchmark from '../bench-component.js'

/** @typedef {import('../../components/select/select.js').selectConfig} selectConfig */

await benchmark({
  component: 'select',

  /** @type {{ [option: string]: selectConfig }} */
  tests: {
    '4 items, 1 selected': {
      id: 'sort',
      name: 'sort',
      label: {
        text: 'Sort by'
      },
      items: [
        {
          value: 'published',
          text: 'Recently published'
        },
        {
          value: 'updated',
          text: 'Recently updated',
          selected: true
        },
        {
          value: 'views',
          text: 'Most views'
        },
        {
          value: 'comments',
          text: 'Most comments'
        }
      ]
    },

    '10 items with hint': {
      id: 'location',
      name: 'location',
      label: {
        text: 'Choose location'
      },
      hint: {
        text: 'This can be different to where you went before'
      },
      items: [
        {
          value: 'choose',
          text: 'Choose location',
          selected: true
        },
        {
          value: 'eastmidlands',
          text: 'East Midlands'
        },
        {
          value: 'eastofengland',
          text: 'East of England'
        },
        {
          value: 'london',
          text: 'London'
        },
        {
          value: 'northeast',
          text: 'North East'
        },
        {
          value: 'northwest',
          text: 'North West'
        },
        {
          value: 'southeast',
          text: 'South East'
        },
        {
          value: 'southwest',
          text: 'South West'
        },
        {
          value: 'westmidlands',
          text: 'West Midlands'
        },
        {
          value: 'yorkshire',
          text: 'Yorkshire and the Humber'
        }
      ]
    },

    '10 items with error message': {
      id: 'location',
      name: 'location',
      label: {
        text: 'Choose location'
      },
      hint: {
        text: 'This can be different to where you went before'
      },
      errorMessage: {
        text: 'Select a location'
      },
      items: [
        {
          value: 'choose',
          text: 'Choose location',
          selected: true
        },
        {
          value: 'eastmidlands',
          text: 'East Midlands'
        },
        {
          value: 'eastofengland',
          text: 'East of England'
        },
        {
          value: 'london',
          text: 'London'
        },
        {
          value: 'northeast',
          text: 'North East'
        },
        {
          value: 'northwest',
          text: 'North West'
        },
        {
          value: 'southeast',
          text: 'South East'
        },
        {
          value: 'southwest',
          text: 'South West'
        },
        {
          value: 'westmidlands',
          text: 'West Midlands'
        },
        {
          value: 'yorkshire',
          text: 'Yorkshire and the Humber'
        }
      ]
    },

    '4 items, with attributes': {
      id: 'sort',
      name: 'sort',
      label: {
        text: 'Sort by'
      },
      items: [
        {
          value: 'published',
          text: 'Recently published'
        },
        {
          value: 'updated',
          text: 'Recently updated',
          selected: true
        },
        {
          value: 'views',
          text: 'Most views'
        },
        {
          value: 'comments',
          text: 'Most comments'
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-select-type': 'continue'
      }
    }
  }
})
