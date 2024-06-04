import benchmark from '../bench-component.js'

/** @typedef {import('../../components/hint/hint.js').hintConfig} hintConfig */

await benchmark({
  component: 'hint',

  /** @type {{ [option: string]: hintConfig }} */
  tests: {
    text: {
      text: 'It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.'
    },

    'html with id': {
      html: 'It’s on your <strong>bank statement</strong>',
      id: 'hint'
    },

    'with attributes': {
      text: 'Must be between 6 and 8 digits long',
      classes: 'my-hint',
      attributes: {
        'arial-label': 'label',
        'data-hint': 'hint'
      }
    }
  }
})
