import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukButton from '../button/button.js'

/**
 * Give users a way to quickly and safely exit a service, website or application.
 *
 * For service journeys, you must use this component with the pattern to help a user {@link https://design-system.service.gov.uk/patterns/exit-a-page-quickly/ Exit a page quickly}.
 * @param {exitThisPageConfig} params - Exit this page config options
 * @returns {string} Exit this page HTML
 * @see {@link https://design-system.service.gov.uk/components/exit-this-page/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukExitThisPage({
 *   text: 'Exit this page',
 *   href: 'https://bbc.co.uk/weather/'
 * })
 * ```
 */
export default function govukExitThisPage(params) {
  let attributes = attribute('id', params.id)
  attributes += ` class="govuk-exit-this-page${params.classes ? html` ${params.classes}` : ''}"`
  attributes += ' data-module="govuk-exit-this-page"'
  attributes += govukAttributes(params.attributes)
  attributes += attribute('data-i18n.activated', params.activatedText)
  attributes += attribute('data-i18n.timed-out', params.timedOutText)
  attributes += attribute('data-i18n.press-two-more-times', params.pressTwoMoreTimesText)
  attributes += attribute('data-i18n.press-one-more-time', params.pressOneMoreTimeText)

  return `<div${attributes}>
  ${govukButton({
    html: (params.html || params.text) ? params.html : '<span class="govuk-visually-hidden">Emergency</span> Exit this page',
    text: params.text,
    classes: 'govuk-button--warning govuk-exit-this-page__button govuk-js-exit-this-page-button',
    href: params.redirectUrl ?? 'https://www.bbc.co.uk/weather',
    attributes: {
      rel: "nofollow noreferrer"
    }
  })}
</div>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} exitThisPageConfig
 * @property {string} [text] - Text for the link. If `html` is provided, the `text` option will be ignored. Defaults to `"Emergency Exit this page"` with 'Emergency' visually hidden.
 * @property {string} [html] - HTML for the link. If `html` is provided, the `text` option will be ignored. Defaults to `"Emergency Exit this page"` with 'Emergency' visually hidden.
 * @property {string} [redirectUrl] - URL to redirect the current tab to. Defaults to `"https://www.bbc.co.uk/weather"`.
 * @property {string} [id] - ID attribute to add to the exit this page container.
 * @property {string} [classes] - Classes to add to the exit this page container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the exit this page container.
 * @property {string} [activatedText] - Text announced by screen readers when Exit this Page has been activated via the keyboard shortcut. Defaults to `"Loading."`.
 * @property {string} [timedOutText] - Text announced by screen readers when the keyboard shortcut has timed out without successful activation. Defaults to `"Exit this page expired."`.
 * @property {string} [pressTwoMoreTimesText] - Text announced by screen readers when the user must press <kbd>Shift</kbd> two more times to activate the button. Defaults to `"Shift, press 2 more times to exit."`.
 * @property {string} [pressOneMoreTimeText] - Text announced by screen readers when the user must press <kbd>Shift</kbd> one more time to activate the button. Defaults to `"Shift, press 1 more time to exit."`.
 */
