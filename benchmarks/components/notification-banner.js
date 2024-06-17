import benchmark from '../bench-component.js'

/** @typedef {import('../../components/notification-banner/notification-banner.js').notificationBannerConfig} notificationBannerConfig */

await benchmark({
  component: 'notification-banner',

  /** @type {{ [option: string]: notificationBannerConfig }} */
  tests: {
    text: {
      text: 'There may be a delay in processing your application because of the coronavirus outbreak.'
    },

    html: {
      html: `
        <p class="govuk-notification-banner__heading">
          You have 7 days left to send your application.
          <a class="govuk-notification-banner__link" href="#">View application</a>.
        </p>
      `
    },

    'html success banner': {
      html: `
        <h3 class="govuk-notification-banner__heading">
          Training outcome recorded and trainee withdrawn
        </h3>
        <p class="govuk-body">Contact <a class="govuk-notification-banner__link" href="#">example@department.gov.uk</a> if you think there’s a problem.</p>
      `,
      type: 'success'
    },

    'with attributes': {
      text: 'There may be a delay in processing your application because of the coronavirus outbreak.'
    }
  }
})
