import benchmark from '../bench-component.js'

/** @typedef {import('../../components/panel/panel.js').panelConfig} panelConfig */

await benchmark({
  component: 'panel',

  /** @type {{ [option: string]: panelConfig }} */
  tests: {
    'title and html content': {
      titleText: 'Application complete',
      html: 'Your reference number<br><strong>HDJ2123F</strong>'
    },

    'title and text content': {
      titleText: 'Application complete',
      text: 'Your reference number HDJ2123F'
    },

    'with attributes': {
      titleText: 'Application complete',
      html: 'Your reference number<br><strong>HDJ2123F</strong>'
    }
  }
})
