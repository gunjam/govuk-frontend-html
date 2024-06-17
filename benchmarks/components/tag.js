import benchmark from '../bench-component.js'

/** @typedef {import('../../components/tag/tag.js').tagConfig} tagConfig */

await benchmark({
  component: 'tag',

  /** @type {{ [option: string]: tagConfig }} */
  tests: {
    text: {
      text: 'Completed'
    },

    html: {
      html: '<strong>Completed</strong>'
    },

    'with attributes': {
      text: 'Completed',
      attributes: {
        'arial-label': 'label',
        'data-tag-type': 'continue'
      }
    }
  }
})
