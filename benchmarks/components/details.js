import benchmark from '../bench-component.js'

/** @typedef {import('../../components/details/details.js').detailsConfig} detailsConfig */

await benchmark({
  component: 'details',

  /** @type {{ [option: string]: detailsConfig }} */
  tests: {
    text: {
      summaryText: 'Help with nationality',
      text: 'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.'
    },

    'html with id': {
      id: 'nationality-details-block',
      summaryHtml: 'Help with <strong>nationality</strong>',
      html: 'We need to know your <a href="#">nationality</a> so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.'
    },

    'with attributes': {
      summaryText: 'Help with nationality',
      text: 'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.',
      classes: 'my-details',
      attributes: {
        'arial-label': 'details',
        'data-details': 'details'
      }
    }
  }
})
