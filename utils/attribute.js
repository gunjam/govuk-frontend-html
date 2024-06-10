import { html } from 'ghtml'

/**
 * @param {string} name - name of attribute
 * @param {any} value - value of attribute
 * @return {string} HTML attribute string, eg: ` id="example"`
 */
export default function attribute(name, value) {
  return value === undefined ? '' : html` ${name}="${value}"`
}
