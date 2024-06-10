import { bench, run } from 'mitata'
import govukAttributes from '../../utils/govuk-attributes.js'

bench('attributes - empty', () => {
  govukAttributes()
})

bench('attributes - string', () => {
  govukAttributes(' class="test"')
})

bench('attributes - object', () => {
  govukAttributes({
    id: 'test',
    title: 'thing',
    'aria-label': 'label'
  })
})

bench('attributes - object with optionals', () => {
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
