import benchmark from '../bench-component.js'

/** @typedef {import('../../components/summary-list/summary-list.js').summaryListConfig} summaryListConfig */

await benchmark({
  component: 'summary-list',

  /** @type {{ [option: string]: summaryListConfig }} */
  tests: {
    'standard list': {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Sarah Philips'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '5 January 1978'
          }
        },
        {
          key: {
            text: 'Address'
          },
          value: {
            html: '72 Guild Street<br>London<br>SE23 6FH'
          }
        },
        {
          key: {
            text: 'Contact details'
          },
          value: {
            html: '<p class="govuk-body">07700 900457</p><p class="govuk-body">sarah.phillips@example.com</p>'
          }
        }
      ]
    },

    '4 rows, 1 with no action, 1 with two': {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Sarah Philips'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '5 January 1978'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'date of birth'
              }
            ]
          }
        },
        {
          key: {
            text: 'Address'
          },
          value: {
            html: '72 Guild Street<br>London<br>SE23 6FH'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'address'
              }
            ]
          }
        },
        {
          key: {
            text: 'Contact details'
          },
          value: {
            html: '<p class="govuk-body">07700 900457</p><p class="govuk-body">sarah.phillips@example.com</p>'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Add',
                visuallyHiddenText: 'contact details'
              },
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'contact details'
              }
            ]
          }
        }
      ]
    },

    'summary card': {
      card: {
        title: {
          text: 'Lead tenant'
        }
      },
      rows: [
        {
          key: {
            text: 'Age'
          },
          value: {
            html: '38'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'age'
              }
            ]
          }
        },
        {
          key: {
            text: 'Nationality'
          },
          value: {
            html: 'UK national resident in UK'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'nationality'
              }
            ]
          }
        },
        {
          key: {
            text: 'Working situation'
          },
          value: {
            html: 'Part time – less than 30 hours a week'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'working situation'
              }
            ]
          }
        }
      ]
    },

    'standard with attributes': {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Sarah Philips'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '5 January 1978'
          }
        },
        {
          key: {
            text: 'Address'
          },
          value: {
            html: '72 Guild Street<br>London<br>SE23 6FH'
          }
        },
        {
          key: {
            text: 'Contact details'
          },
          value: {
            html: '<p class="govuk-body">07700 900457</p><p class="govuk-body">sarah.phillips@example.com</p>'
          }
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-summary-list-type': 'continue'
      }
    }
  }
})
