import benchmark from '../bench-component.js'

/** @typedef {import('../../components/tabs/tabs.js').tabsConfig} tabsConfig */

await benchmark({
  component: 'tabs',

  /** @type {{ [option: string]: tabsConfig }} */
  tests: {
    'one tab': {
      items: [
        {
          label: 'Tab 1',
          id: 'tab-1',
          panel: {
            html: '<p>Body content 1</p>'
          }
        }
      ]
    },

    '2 tabs': {
      items: [
        {
          label: 'Tab 1',
          id: 'tab-1',
          panel: {
            html: '<p>Body content 1</p>'
          }
        },
        {
          label: 'Tab 2',
          id: 'tab-2',
          panel: {
            html: '<p>Body content 2</p>'
          }
        }
      ]
    },

    '5 tabs': {
      items: [
        {
          label: 'Tab 1',
          id: 'tab-1',
          panel: {
            html: '<p>Body content 1</p>'
          }
        },
        {
          label: 'Tab 2',
          id: 'tab-2',
          panel: {
            html: '<p>Body content 2</p>'
          }
        },
        {
          label: 'Tab 3',
          id: 'tab-3',
          panel: {
            html: '<p>Body content 3</p>'
          }
        },
        {
          label: 'Tab 4',
          id: 'tab-4',
          panel: {
            html: '<p>Body content 4</p>'
          }
        },
        {
          label: 'Tab 5',
          id: 'tab-5',
          panel: {
            html: '<p>Body content 5</p>'
          }
        }
      ]
    },

    'with attributes': {
      items: [
        {
          label: 'Tab 1',
          id: 'tab-1',
          panel: {
            html: '<p>Body content 1</p>'
          }
        },
        {
          label: 'Tab 2',
          id: 'tab-2',
          panel: {
            html: '<p>Body content 2</p>'
          }
        },
        {
          label: 'Tab 3',
          id: 'tab-3',
          panel: {
            html: '<p>Body content 3</p>'
          }
        },
        {
          label: 'Tab 4',
          id: 'tab-4',
          panel: {
            html: '<p>Body content 4</p>'
          }
        },
        {
          label: 'Tab 5',
          id: 'tab-5',
          panel: {
            html: '<p>Body content 5</p>'
          }
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-tabs-type': 'continue'
      }
    }
  }
})
