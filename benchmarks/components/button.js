import { bench, run } from 'mitata'
import govukButton from '../../components/button/button.js'

bench('govukButton - start now link', () => {
  govukButton({
    text: 'Start now',
    href: '/start',
    isStartButton: true
  })
})

bench('govukButton - input', () => {
  govukButton({
    text: 'Continue',
    element: 'input',
    disabled: true
  })
})

bench('govukButton - button', () => {
  govukButton({
    text: 'Continue',
    preventDoubleClick: true
  })
})

bench('govukButton - with attributes', () => {
  govukButton({
    text: 'Continue',
    attributes: {
      'arial-label': 'label',
      'data-button-type': 'continue'
    }
  })
})

await run()
