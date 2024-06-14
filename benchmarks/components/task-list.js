import benchmark from '../bench-component.js'

/** @typedef {import('../../components/task-list/task-list.js').taskListConfig} taskListConfig */

await benchmark({
  component: 'task-list',

  /** @type {{ [option: string]: taskListConfig }} */
  tests: {
    'one task with text status': {
      idPrefix: 'company-details',
      items: [
        {
          title: {
            text: 'Company Directors'
          },
          href: '#',
          status: {
            text: 'Completed'
          }
        }
      ]
    },

    'fice tasks, 4 with tag status and 1 hint': {
      idPrefix: 'company-details',
      items: [
        {
          title: {
            text: 'Company Directors'
          },
          href: '#',
          status: {
            text: 'Completed'
          }
        },
        {
          title: {
            text: 'Registered company details'
          },
          href: '#',
          status: {
            tag: {
              text: 'Incomplete',
              classes: 'govuk-tag--blue'
            }
          }
        },
        {
          title: {
            text: 'Financial history'
          },
          hint: {
            text: 'Include 5 years of the company’s relevant financial information.'
          },
          href: '#',
          status: {
            tag: {
              text: 'Incomplete',
              classes: 'govuk-tag--blue'
            }
          }
        },
        {
          title: {
            text: 'Business plan'
          },
          href: '#',
          status: {
            tag: {
              text: 'Incomplete',
              classes: 'govuk-tag--blue'
            }
          }
        },
        {
          title: {
            text: 'References'
          },
          href: '#',
          status: {
            tag: {
              text: 'Incomplete',
              classes: 'govuk-tag--blue'
            }
          }
        }
      ]
    },

    'with attributes': {
      idPrefix: 'company-details',
      items: [
        {
          title: {
            text: 'Company Directors'
          },
          href: '#',
          status: {
            text: 'Completed'
          }
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-task-list-type': 'continue'
      }
    }
  }
})
