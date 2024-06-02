import { equal } from 'node:assert/strict'
import { describe, it } from 'node:test'
import govukAttributes from '../../utils/govuk-attributes.js'

describe('govukAttributes', () => {
  it('renders a single attribute', () => {
    const attributes = govukAttributes({
      'data-attribute': 'value'
    })

    // Note the starting space so we ensure it doesn't stick to possible other previous attributes
    equal(attributes, ' data-attribute="value"')
  })

  it('renders multiple attributes', () => {
    const attributes = govukAttributes({
      'data-attribute': 'value',
      'data-second-attribute': 'second-value',
      'data-third-attribute': {
        type: 'string',
        value: 'third-value'
      }
    })

    equal(
      attributes,
      ' data-attribute="value" data-second-attribute="second-value" data-third-attribute="third-value"'
    )
  })

  it('renders attribute values as strings by default', () => {
    const attributes = govukAttributes({
      viewBox: '0 0 15 13',
      focusable: false,
      'aria-hidden': true
    })

    // Note that `aria-hidden` and `focusable` are not converted to boolean attributes
    equal(attributes, ' viewBox="0 0 15 13" focusable="false" aria-hidden="true"')
  })

  it('renders attribute values as strings when `optional` not set', () => {
    const attributes = govukAttributes({
      viewBox: '0 0 15 13',
      focusable: {
        value: false
      },
      'aria-hidden': {
        value: true
      }
    })

    // Note that `aria-hidden` and `focusable` are not converted to boolean attributes
    equal(attributes, ' viewBox="0 0 15 13" focusable="false" aria-hidden="true"')
  })

  it('renders attribute values as strings when `optional: false`', () => {
    const attributes = govukAttributes({
      // Treat null and undefined values as not provided
      'example-empty-1': {
        value: undefined,
        optional: false
      },
      'example-empty-2': {
        value: null,
        optional: false
      },

      // But watch out for intentionally falsy values
      // https://github.com/alphagov/govuk-frontend/issues/4669
      'example-falsy-1': {
        value: '',
        optional: false
      },
      'example-falsy-2': {
        value: 0,
        optional: false
      },

      // Except false, always stringify unless optional
      'example-falsy-3': {
        value: false,
        optional: false
      }
    })

    // Note that all non-optional values are rendered to strings by Nunjucks,
    // even true/false which only become boolean attributes when optional
    equal(
      attributes,
      ' example-empty-1="" example-empty-2="" example-falsy-1="" example-falsy-2="0" example-falsy-3="false"'
    )
  })

  it('skip attribute when falsy with `optional: true` and null, undefined or false', () => {
    const attributes = govukAttributes({
      // Treat null and undefined values as not provided
      'example-empty-1': {
        value: undefined,
        optional: true
      },
      'example-empty-2': {
        value: null,
        optional: true
      },

      // But watch out for intentionally falsy values
      // https://github.com/alphagov/govuk-frontend/issues/4669
      'example-falsy-1': {
        value: '',
        optional: true
      },
      'example-falsy-2': {
        value: 0,
        optional: true
      },

      // Except false, we remove `false` boolean attributes
      'example-falsy-3': {
        value: false,
        optional: true
      }
    })

    // Note that null, undefined and false are skipped, intentionally falsy values are preserved
    equal(attributes, ' example-falsy-1="" example-falsy-2="0"')
  })

  it('renders attribute when (string) `"true"` with `optional: true` as strings`', () => {
    const attributes = govukAttributes({
      type: 'radio',
      checked: {
        value: 'true',
        optional: true
      }
    })

    // Note that `checked` defaults to a string value unless strictly a boolean
    equal(attributes, ' type="radio" checked="true"')
  })

  it('renders attribute when (string) `"false"` with `optional: true` as strings', () => {
    const attributes = govukAttributes({
      type: 'radio',
      checked: {
        value: 'false',
        optional: true
      }
    })

    // Note that `checked` defaults to a string value unless strictly a boolean
    equal(attributes, ' type="radio" checked="false"')
  })

  it('renders attribute when (boolean) `true` with `optional: true` as boolean attribute', () => {
    const attributes = govukAttributes({
      type: 'radio',
      checked: {
        value: true,
        optional: true
      }
    })

    // Note that `checked` has no value is, e.g. `<input type="radio" checked>`
    equal(attributes, ' type="radio" checked')
  })

  it('skip attribute when (boolean) `false` with `optional: true` as boolean attribute', () => {
    const attributes = govukAttributes({
      type: 'radio',
      checked: {
        value: false,
        optional: true
      }
    })

    // Note that `checked` is removed when false
    equal(attributes, ' type="radio"')
  })

  it('outputs attributes if already stringified', () => {
    const attributes = govukAttributes(' data-attribute="value"')

    equal(attributes, ' data-attribute="value"')
  })

  it('outputs nothing if there are no attributes', () => {
    const attributes = govukAttributes({})

    equal(attributes, '')
  })
})
