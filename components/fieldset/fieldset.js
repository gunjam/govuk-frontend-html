import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Use the fieldset component to group related form inputs.
 * @param {fieldsetConfig} params - Fieldset config options
 * @returns {string} Fieldset HTML
 * @see {@link https://design-system.service.gov.uk/components/fieldset/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukFieldset({
 *   legend: {
 *     text: 'What is your address?'
 *   }
 * })
 * ```
 */
export default function govukFieldset(params) {
  let legend = ''

  if (params.legend?.html || params.legend?.text) {
    const content = params.legend.html ?? html`${params.legend.text}`
    legend += html`<legend class="govuk-fieldset__legend ${params.legend.classes}">
      !${params.legend.isPageHeading ? `<h1 class="govuk-fieldset__heading">${content}</h1>` : content}
    </legend>`
  }

  return html`<fieldset class="govuk-fieldset ${params.classes}"
  !${attribute('role', params.role)}
  !${attribute('aria-describedby', params.describedBy)}
  !${govukAttributes(params.attributes)}>
  !${legend}
  !${params.html}
</fieldset>
    `
}

/**
 * @typedef {Object} legendConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the legend. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the legend. If `html` is provided, the `text` option will be ignored.
 * @property {string} [classes] - Classes to add to the legend.
 * @property {boolean} [isPageHeading] - Whether the legend also acts as the heading for the page.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} fieldsetConfig
 * @property {string} [describedBy] - One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
 * @property {legendConfig} [legend] - The legend for the fieldset component.
 * @property {string} [classes] - Classes to add to the fieldset container.
 * @property {string} [role] - Optional ARIA role attribute.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the fieldset container.
 * @property {string} [html] - HTML to use/render within the fieldset element.
 */
