/**
 * Capitalise first character
 * @param {string} input text
 * @returns {string} capitilised text
 */
export function capitalise(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

/**
 * Convert kebab case to camel case
 * @param {string} str
 * @returns {string}
 */
export function toCamelCase(str) {
  return str.split('-').reduce((a, b) => `${a}${capitalise(b)}`)
}

/**
 * Convert kebab case to spaced sentence, capitalisied first char
 * @param {string} str
 * @returns {string}
 */
export function toSpaced(str) {
  return capitalise(str)
    .split('-')
    .reduce((a, b) => `${a} ${b}`)
}
