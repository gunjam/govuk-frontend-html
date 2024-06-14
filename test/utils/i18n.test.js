import { equal } from 'node:assert/strict'
import { describe, it } from 'node:test'
import govukI18nAttributes from '../../utils/i18n.js'

describe('govukI18nAttributes', () => {
  it('renders a single plural type', () => {
    const attributes = govukI18nAttributes({
      key: 'translation-key',
      messages: {
        other: 'You have %{count} characters remaining.'
      }
    })

    // Note the starting space so we ensure it doesn't stick to possible other previous attributes
    equal(attributes, ' data-i18n.translation-key.other="You have %{count} characters remaining."')
  })

  it('renders multiple plural types', () => {
    const attributes = govukI18nAttributes({
      key: 'translation-key',
      messages: {
        other: 'You have %{count} characters remaining.',
        one: 'One character remaining'
      }
    })

    equal(
      attributes,
      ' data-i18n.translation-key.other="You have %{count} characters remaining." data-i18n.translation-key.one="One character remaining"'
    )
  })

  it('outputs nothing if there are no translations', () => {
    const attributes = govukI18nAttributes({
      key: 'translation-key'
    })

    equal(attributes, '')
  })
})
