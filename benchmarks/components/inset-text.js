import benchmark from '../bench-component.js'

/** @typedef {import('../../components/inset-text/inset-text.js').insetTextConfig} insetTextConfig */

await benchmark({
  component: 'inset-text',

  /** @type {{ [option: string]: insetTextConfig }} */
  tests: {
    text: {
      text: 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.'
    },

    'with classes and id': {
      classes: 'class1 class2',
      id: 'my-text',
      text: 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.'
    },

    html: {
      html: '<p>It can take up to <strong>8 weeks</strong> to register a lasting power of attorney if there are no mistakes in the application.</p>'
    },

    'with attributes': {
      text: 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
      attributes: {
        'arial-label': 'label',
        'data-inset-text-type': 'continue'
      }
    }
  }
})
