import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukTag from '../tag/tag.js'

/**
 * Use the phase banner component to show users your service is still being worked on.
 *
 * Services hosted on a service.gov.uk domain must use the phase banner until they pass a live assessment.
 * @param {phaseBannerConfig} params - Phase banner config options
 * @returns {string} Phase banner HTML
 * @see {@link https://design-system.service.gov.uk/components/phase-banner/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukPhaseBanner({
 *   tag: {
 *     text: 'Alpha'
 *   },
 *   html: 'This is a new service - your <a href=\'#\' class=\'govuk-link\'>feedback</a> will help us to improve it.'
 * })
 * ```
 */
export default function govukPhaseBanner(params) {
  const tag = govukTag({
    text: params.tag?.text,
    html: params.tag?.html,
    classes: `govuk-phase-banner__content__tag${params.tag?.classes ? ` ${params.tag.classes}` : ''}`
  })

  return `<div class="govuk-phase-banner${params.classes ? html` ${params.classes}` : ''}"${govukAttributes(params.attributes)}>
  <p class="govuk-phase-banner__content">
    ${tag}
    <span class="govuk-phase-banner__text">
      ${params.html ?? html`${params.text}`}
    </span>
  </p>
</div>`
}

/**
 * @typedef {import('../tag/tag.js').tagConfig} tagConfig
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} phaseBannerConfig
 * @property {string} text - If `html` is set, this is not required. Text to use within the phase banner. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - If `text` is set, this is not required. HTML to use within the phase banner. If `html` is provided, the `text` option will be ignored.
 * @property {tagConfig} tag - The tag used by the phase banner component.
 * @property {string} [classes] - Classes to add to the phase banner container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the phase banner container.
 */
