import { html } from 'ghtml'
import attribute from './attribute.js'

/**
 * Renders translated text into data attributes by translation key
 *
 * - Provide params.message for translation text, singular
 * - Provide params.messages for translation text by corresponding plural rule
 *
 * {@link https://cldr.unicode.org/index/cldr-spec/plural-rules}
 *
 * Helps reduce the boilerplate in component templates as they're quite verbose
 *
 * @private
 * @param {object} params - i18n macro params
 * @param {string} params.key - Translation key (kebab-case)
 * @param {string} [params.message] - Translation text, singular
 * @param {{ [pluralRule: string]: string }} [params.messages] - Translation text by corresponding plural rule (optional, overrides params.message)
 */
export default function govukI18nAttributes(params) {
  let messages = ''

  if (params.messages) {
    for (const [pluralRule, message] of Object.entries(params.messages)) {
      messages += html` data-i18n.${params.key}.${pluralRule}="${message}"`
    }
  } else if (params.message) {
    messages += html` data-i18n.${params.key}="${params.message}"`
  }

  return messages
}
