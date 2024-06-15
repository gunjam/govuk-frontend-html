import benchmark from '../bench-component.js'

/** @typedef {import('../../components/table/table.js').tableConfig} tableConfig */

await benchmark({
  component: 'table',

  /** @type {{ [option: string]: tableConfig }} */
  tests: {
    'one row two columns': {
      rows: [
        [
          {
            text: 'January'
          },
          {
            text: '£95'
          }
        ]
      ]
    },

    'one row two columns, head and caption': {
      caption: 'Months and rates',
      captionClasses: 'govuk-table__caption--l',
      firstCellIsHeader: true,
      head: [
        {
          text: 'Month you apply'
        },
        {
          text: 'Rate for vehicles'
        }
      ],
      rows: [
        [
          {
            text: 'January'
          },
          {
            text: '£95'
          }
        ],
        [
          {
            text: 'February'
          },
          {
            text: '£55'
          }
        ],
        [
          {
            text: 'March'
          },
          {
            text: '£125'
          }
        ]
      ]
    },

    'with attributes': {
      attributes: {
        'arial-label': 'label',
        'data-table-type': 'table'
      },
      rows: [
        [
          {
            text: 'January'
          },
          {
            text: '£95'
          }
        ]
      ]
    }
  }
})
