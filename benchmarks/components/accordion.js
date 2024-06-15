import benchmark from '../bench-component.js'

/** @typedef {import('../../components/accordion/accordion.js').accordionConfig} accordionConfig */

await benchmark({
  component: 'accordion',

  /** @type {{ [option: string]: accordionConfig }} */
  tests: {
    'one item': {
      id: 'accordion-default',
      items: [
        {
          heading: {
            text: 'Writing well for the web'
          },
          content: {
            html: '<p class="govuk-body">This is the content for Writing well for the web.</p>'
          }
        }
      ]
    },

    'four items': {
      id: 'accordion-default',
      items: [
        {
          heading: {
            text: 'Writing well for the web'
          },
          content: {
            html: '<p class="govuk-body">This is the content for Writing well for the web.</p>'
          }
        },
        {
          heading: {
            text: 'Writing well for specialists'
          },
          content: {
            html: '<p class="govuk-body">This is the content for Writing well for specialists.</p>'
          }
        },
        {
          heading: {
            text: 'Know your audience'
          },
          content: {
            html: '<p class="govuk-body">This is the content for Know your audience.</p>'
          }
        },
        {
          heading: {
            text: 'How people read'
          },
          content: {
            html: '<p class="govuk-body">This is the content for How people read.</p>'
          }
        }
      ]
    },

    'four items with summaries and more content': {
      id: 'accordion-with-summary-sections',
      items: [
        {
          heading: {
            text: 'Understanding agile project management'
          },
          summary: {
            text: 'Introductions, methods, core features.'
          },
          content: {
            html: `<ul class="govuk-list">
                <li>
                  <a class="govuk-link" href="#">Agile and government services: an introduction</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Agile methods: an introduction</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Core principles of agile</a>
                </li>
            </ul>`
          }
        },
        {
          heading: {
            text: 'Working with agile methods'
          },
          summary: {
            text: 'Workspaces, tools and techniques, user stories, planning.'
          },
          content: {
            html: `<ul class="govuk-list">
                <li>
                  <a class="govuk-link" href="#">Creating an agile working environment</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Agile tools and techniques</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Set up a team wall</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Writing user stories</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Planning in agile</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Deciding on priorities</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Developing a roadmap</a>
                </li>
            </ul>`
          }
        },
        {
          heading: {
            text: 'Governing agile services'
          },
          summary: {
            text: 'Principles, measuring progress, spending money.'
          },
          content: {
            html: `<ul class="govuk-list">
                <li>
                  <a class="govuk-link" href="#">Governance principles for agile service delivery</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Measuring and reporting progress</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Spend controls: check if you need approval to spend money on a service</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Spend controls: apply for approval to spend money on a service</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Spend controls: the new pipeline process</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Working across organisational boundaries</a>
                </li>
            </ul>`
          }
        },
        {
          heading: {
            text: 'Phases of an agile project'
          },
          summary: {
            text: 'Discovery, alpha, beta, live and retirement.'
          },
          content: {
            html: `<ul class="govuk-list">
                <li>
                  <a class="govuk-link" href="#">How the discovery phase works</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">How the alpha phase works</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">How the beta phase works</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">How the live phase works</a>
                </li>
                <li>
                  <a class="govuk-link" href="#">Retiring your service</a>
                </li>
            </ul>`
          }
        }
      ]
    },

    'with attributes': {
      id: 'accordion-default',
      items: [
        {
          heading: {
            text: 'Writing well for the web'
          },
          content: {
            html: '<p class="govuk-body">This is the content for Writing well for the web.</p>'
          }
        },
        {
          heading: {
            text: 'Writing well for specialists'
          },
          content: {
            html: '<p class="govuk-body">This is the content for Writing well for specialists.</p>'
          }
        },
        {
          heading: {
            text: 'Know your audience'
          },
          content: {
            html: '<p class="govuk-body">This is the content for Know your audience.</p>'
          }
        },
        {
          heading: {
            text: 'How people read'
          },
          content: {
            html: '<p class="govuk-body">This is the content for How people read.</p>'
          }
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-accordion-type': 'accordion'
      }
    }
  }
})
