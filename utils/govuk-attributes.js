import { html } from 'ghtml'

/**
 * Renders component attributes as string
 * By default or using `optional: false`, attributes render as ` name="value"`
 * Using `optional: true`, attributes with empty (`null`, `undefined` or `false`) values are omitted
 * Using `optional: true`, attributes with `true` (boolean) values render `name` only without value
 *
 * {@link https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML}
 *
 * @example
 * Output attribute ` aria-hidden="true"` when `true` (boolean) or `"true"` (string)
 *
 * ```javascript
 * govukAttributes({
 *   'aria-hidden': true
 * })
 * ```
 *
 * Renders component attributes as string
 *
 * By default or using `optional: false`, attributes render as ` name="value"`
 * Using `optional: true`, attributes with empty (`null`, `undefined` or `false`) values are omitted
 * Using `optional: true`, attributes with `true` (boolean) values render `name` only without value
 *
 * {@link https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML}
 *
 * @example
 * Output attribute ` aria-hidden="true"` when `true` (boolean) or `"true"` (string)
 *
 * ```javascript
 * govukAttributes({
 *   'aria-hidden': true
 * })
 * ```
 *
 * @example
 * Output attribute ` aria-hidden="false"` when `false` (boolean) or `"false"` (string)
 *
 * ```javascript
 * govukAttributes({
 *   'aria-hidden': false
 * })
 * ```
 *
 * @example
 * Output attribute ` hidden=""` when `null`, `undefined` or empty `""` (string)
 *
 * ```javascript
 * govukAttributes({
 *   'hidden': undefined
 * })
 * ```
 *
 * @example
 * Output attribute ` hidden` as boolean attribute when optional and `true`
 *
 * ```javascript
 * govukAttributes({
 *   hidden: {
 *     value: true,
 *     optional: true
 *   }
 * })
 * ```
 *
 * @example
 * Output empty string when optional and `null`, `undefined` or `false`
 *
 * ```javascript
 * govukAttributes({
 *   hidden: {
 *     value: undefined,
 *     optional: true
 *   }
 * })
 * ```
 *
 * @private
 * @param {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} attributes - Component attributes param
 */
export default function govukAttributes(attributes) {
  // Default attributes output
  if (typeof attributes === 'string') {
    return attributes
  }

  let attributesHtml = ''

  if (typeof attributes !== 'object') {
    return attributesHtml
  }

  // Append attribute name/value pairs
  for (const [name, value] of Object.entries(attributes)) {
    // Set default attribute options
    const options =
      typeof value === 'object'
        ? value
        : {
            value,
            optional: false
          }

    // Output ` name` only (no value) for boolean attributes
    if (options.optional === true && options.value === true) {
      attributesHtml += html` ${name}`
      // Skip optional empty attributes or output ` name="value"` pair by default
    } else if ((options.optional === true && options.value !== undefined && options.value !== null && options.value !== false) || options.optional !== true) {
      attributesHtml += html` ${name}="${options.value}"`
    }
  }

  return attributesHtml
}
