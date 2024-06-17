import benchmark from '../bench-component.js'

/** @typedef {import('../../components/cookie-banner/cookie-banner.js').cookieBannerConfig} cookieBannerConfig */

await benchmark({
  component: 'cookie-banner',

  /** @type {{ [option: string]: cookieBannerConfig }} */
  tests: {
    'accept and reject buttons, cookies link': {
      ariaLabel: 'Cookies on [name of service]',
      messages: [
        {
          headingText: 'Cookies on [name of service]',
          html: `
            <p class="govuk-body">We use some essential cookies to make this service work.</p>
            <p class="govuk-body">We’d also like to use analytics cookies so we can understand how you use the service and make improvements.</p>
          `,
          actions: [
            {
              text: 'Accept analytics cookies',
              type: 'button'
            },
            {
              text: 'Reject analytics cookies',
              type: 'button'
            },
            {
              text: 'View cookies',
              href: '#'
            }
          ]
        }
      ]
    },

    'server side accepted cookies message': {
      ariaLabel: 'Cookies on [name of service]',
      messages: [
        {
          html: '<p class="govuk-body">You’ve accepted additional cookies. You can <a class="govuk-link" href="#">change your cookie settings</a> at any time.</p>',
          actions: [
            {
              text: 'Hide cookie message',
              type: 'submit',
              name: 'cookies[hide]',
              value: 'yes'
            }
          ]
        }
      ]
    },

    'with everything for client side js': {
      ariaLabel: 'Cookies on [name of service]',
      messages: [
        {
          headingText: 'Cookies on [name of service]',
          html: `
            <p class="govuk-body">We use some essential cookies to make this service work.</p>
            <p class="govuk-body">We’d like to set additional cookies so we can remember your settings, understand how people use the service and make improvements.</p>
          `,
          hidden: true,
          actions: [
            {
              text: 'Accept additional cookies',
              type: 'submit',
              name: 'cookies[additional]',
              value: 'yes'
            },
            {
              text: 'Reject additional cookies',
              type: 'submit',
              name: 'cookies[additional]',
              value: 'no'
            },
            {
              text: 'View cookies',
              href: '#'
            }
          ]
        },
        {
          html: '<p class="govuk-body">You’ve accepted additional cookies. You can <a class="govuk-link" href="#">change your cookie settings</a> at any time.</p>',
          actions: [
            {
              text: 'Hide cookie message',
              type: 'submit',
              name: 'cookies[hide]',
              value: 'yes'
            }
          ]
        },
        {
          html: '<p class="govuk-body">You’ve rejected additional cookies. You can <a class="govuk-link" href="#">change your cookie settings</a> at any time.</p>',
          actions: [
            {
              text: 'Hide cookie message',
              type: 'submit',
              name: 'cookies[hide]',
              value: 'yes'
            }
          ],
          hidden: true
        }
      ]
    },

    'with attributes': {
      ariaLabel: 'Cookies on [name of service]',
      messages: [
        {
          headingText: 'Cookies on [name of service]',
          html: `
            <p class="govuk-body">We use some essential cookies to make this service work.</p>
            <p class="govuk-body">We’d also like to use analytics cookies so we can understand how you use the service and make improvements.</p>
          `,
          actions: [
            {
              text: 'Accept analytics cookies',
              type: 'button'
            },
            {
              text: 'Reject analytics cookies',
              type: 'button'
            },
            {
              text: 'View cookies',
              href: '#'
            }
          ]
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-cookie-banner-type': 'continue'
      }
    }
  }
})
