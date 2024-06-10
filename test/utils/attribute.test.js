import { equal } from 'node:assert/strict'
import { describe, it } from 'node:test'
import attribute from '../../utils/attribute.js'

describe('attribute', () => {
  it('render attribute if value is not undefined', () => {
    equal(attribute('id', 'test'), ' id="test"')
    equal(attribute('id', true), ' id="true"')
    equal(attribute('id', false), ' id="false"')
    equal(attribute('id', 0), ' id="0"')
    equal(attribute('id', 1), ' id="1"')
  })

  it('render empty attribute if value is empty string or null', () => {
    equal(attribute('id', null), ' id=""')
    equal(attribute('id', ''), ' id=""')
  })

  it('escape HTML in input strings', () => {
    equal(attribute('id', '<>'), ' id="&#60;&#62;"')
    equal(attribute('<>', 'test'), ' &#60;&#62;="test"')
  })

  it('returns empty string if value is undefined', () => {
    equal(attribute('id', undefined), '')
  })
})
