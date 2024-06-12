import benchmark from '../bench-component.js'

/** @typedef {import('../../components/footer/footer.js').footerConfig} footerConfig */

await benchmark({
  component: 'footer',

  /** @type {{ [option: string]: footerConfig }} */
  tests: {
    'no extras': {},

    'with custom text content licence and copyright notice': {
      contentLicence: {
        text: 'Mae’r holl gynnwys ar gael dan Drwydded y Llywodraeth Agored v3.0, ac eithrio lle nodir yn wahanol'
      },
      copyright: {
        text: '© Hawlfraint y Goron'
      }
    },

    'with meta': {
      meta: {
        visuallyHiddenTitle: 'Items',
        items: [
          {
            href: '#1',
            text: 'Item 1'
          },
          {
            href: '#2',
            text: 'Item 2'
          },
          {
            href: '#3',
            text: 'Item 3'
          }
        ]
      }
    },

    'with navigation': {
      navigation: [
        {
          title: 'Two column list',
          width: 'two-thirds',
          columns: 2,
          items: [
            {
              href: '#1',
              text: 'Navigation item 1'
            },
            {
              href: '#2',
              text: 'Navigation item 2'
            },
            {
              href: '#3',
              text: 'Navigation item 3'
            },
            {
              href: '#4',
              text: 'Navigation item 4'
            },
            {
              href: '#5',
              text: 'Navigation item 5'
            },
            {
              href: '#6',
              text: 'Navigation item 6'
            }
          ]
        },
        {
          title: 'Single column list',
          width: 'one-third',
          items: [
            {
              href: '#1',
              text: 'Navigation item 1'
            },
            {
              href: '#2',
              text: 'Navigation item 2'
            },
            {
              href: '#3',
              text: 'Navigation item 3'
            }
          ]
        }
      ]
    },

    'full GDS example': {
      navigation: [
        {
          title: 'Coronavirus (COVID-19)',
          width: 'two-thirds',
          items: [
            {
              href: '/coronavirus',
              text: 'Coronavirus (COVID-19): guidance and support'
            }
          ]
        },
        {
          title: 'Brexit',
          width: 'one-third',
          items: [
            {
              href: '/brexit',
              text: 'Check what you need to do'
            }
          ]
        },
        {
          title: 'Services and information',
          width: 'two-thirds',
          columns: 2,
          items: [
            {
              href: '/browse/benefits',
              text: 'Benefits'
            },
            {
              href: '/browse/births-deaths-marriages',
              text: 'Births, deaths, marriages and care'
            },
            {
              href: '/browse/business',
              text: 'Business and self-employed'
            },
            {
              href: '/browse/childcare-parenting',
              text: 'Childcare and parenting'
            },
            {
              href: '/browse/citizenship',
              text: 'Citizenship and living in the UK'
            },
            {
              href: '/browse/justice',
              text: 'Crime, justice and the law'
            },
            {
              href: '/browse/disabilities',
              text: 'Disabled people'
            },
            {
              href: '/browse/driving',
              text: 'Driving and transport'
            },
            {
              href: '/browse/education',
              text: 'Education and learning'
            },
            {
              href: '/browse/employing-people',
              text: 'Employing people'
            },
            {
              href: '/browse/environment-countryside',
              text: 'Environment and countryside'
            },
            {
              href: '/browse/housing-local-services',
              text: 'Housing and local services'
            },
            {
              href: '/browse/tax',
              text: 'Money and tax'
            },
            {
              href: '/browse/abroad',
              text: 'Passports, travel and living abroad'
            },
            {
              href: '/browse/visas-immigration',
              text: 'Visas and immigration'
            },
            {
              href: '/browse/working',
              text: 'Working, jobs and pensions'
            }
          ]
        },
        {
          title: 'Departments and policy',
          width: 'one-third',
          items: [
            {
              href: '/government/how-government-works',
              text: 'How government works'
            },
            {
              href: '/government/organisations',
              text: 'Departments'
            },
            {
              href: '/world',
              text: 'Worldwide'
            },
            {
              href: '/government/policies',
              text: 'Policies'
            },
            {
              href: '/government/publications',
              text: 'Publications'
            },
            {
              href: '/government/announcements',
              text: 'Announcements'
            }
          ]
        }
      ],
      meta: {
        items: [
          {
            href: '/help',
            text: 'Help'
          },
          {
            href: '/help/cookies',
            text: 'Cookies'
          },
          {
            href: '/contact',
            text: 'Contact'
          },
          {
            href: '/help/terms-conditions',
            text: 'Terms and conditions'
          },
          {
            href: '/cymraeg',
            text: 'Rhestr o Wasanaethau Cymraeg'
          }
        ],
        html: 'Built by the <a class="govuk-footer__link" href="#">Government Digital Service</a>'
      }
    }
  }
})
