import { bench, run } from 'mitata'
import govukAttributes from '../../utils/govuk-attributes.js'

bench('govukAttributes - empty', () => {
  govukAttributes()
})

bench('govukAttributes - string', () => {
  govukAttributes(' class="test"')
})

bench('govukAttributes - object', () => {
  govukAttributes({
    id: 'test',
    title: 'thing',
    'aria-label': 'label'
  })
})

bench('govukAttributes - object with optionals', () => {
  govukAttributes({
    id: {
      optional: false,
      value: 'test'
    },
    disabled: {
      optional: true,
      value: true
    },
    checked: {
      optional: true,
      value: true
    }
  })
})

await run()
