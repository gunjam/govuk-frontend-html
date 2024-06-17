import benchmark from '../bench-component.js'

/** @typedef {import('../../components/phase-banner/phase-banner.js').phaseBannerConfig} phaseBannerConfig */

await benchmark({
  component: 'phase-banner',

  /** @type {{ [option: string]: phaseBannerConfig }} */
  tests: {
    'alpha banner with html': {
      tag: {
        text: 'Alpha'
      },
      html: 'This is a new service. Help us improve it and <a class="govuk-link" href="#">give your feedback by email</a>.'
    },

    'alpha banner with text': {
      tag: {
        text: 'Alpha'
      },
      text: 'This is a new service.'
    },

    'with attributes': {
      tag: {
        text: 'Alpha'
      },
      html: 'This is a new service. Help us improve it and <a class="govuk-link" href="#">give your feedback by email</a>.',
      attributes: {
        'arial-label': 'label',
        'data-phase-banner-type': 'continue'
      }
    }
  }
})
