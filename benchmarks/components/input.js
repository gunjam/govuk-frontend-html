import benchmark from '../bench-component.js'

/** @typedef {import('../../components/input/input.js').inputConfig} inputConfig */

await benchmark({
  component: 'input',

  /** @type {{ [option: string]: inputConfig }} */
  tests: {
    'simple with label': {
      label: {
        text: 'National Insurance number'
      },
      id: 'input-example',
      name: 'test-name'
    },

    'with hint, label and error message': {
      label: {
        text: 'National Insurance number'
      },
      hint: {
        text: 'It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.'
      },
      errorMessage: {
        text: 'Enter a Natnoional Insurance number in the correct format'
      },
      id: 'input-example',
      name: 'test-name'
    },

    'with prefix and suffix': {
      label: {
        text: 'Cost per item, in pounds'
      },
      id: 'input-with-prefix-suffix',
      name: 'cost',
      prefix: {
        text: '£'
      },
      suffix: {
        text: 'per item'
      }
    },

    'with attributes': {
      id: 'with-attributes',
      name: 'with-attributes',
      label: {
        text: 'With attributes'
      },
      attributes: {
        'data-attribute': 'my data value',
        'data-test': 'test'
      }
    }
  }
})
