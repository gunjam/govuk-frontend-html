import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'
import govukButton from '../button/button.js'

/**
 * Allow users to accept or reject cookies which are not essential to making your service work.
 * @param {cookieBannerConfig} params - Cookie banner config options
 * @returns {string} Cookie banner HTML
 * @see {@link https://design-system.service.gov.uk/components/cookie-banner/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukCookieBanner({
 *   messages: [
 *     {
 *       headingText: 'Cookies on this government service',
 *       text: 'We use analytics cookies to help understand how users use our service.',
 *       actions: [
 *         {
 *           text: 'Accept analytics cookies',
 *           type: 'submit',
 *           name: 'cookies',
 *           value: 'accept'
 *         },
 *         {
 *           text: 'Reject analytics cookies',
 *           type: 'submit',
 *           name: 'cookies',
 *           value: 'reject'
 *         },
 *         {
 *           text: 'View cookie preferences',
 *           href: '/cookie-preferences'
 *         }
 *       ]
 *     }
 *   ]
 * })
 * ```
 */
export default function govukCookieBanner(params) {
  let classNames = 'govuk-cookie-banner'

  if (params.classes) {
    classNames += html` ${params.classes}`
  }

  let attributes = ' data-nosnippet role="region"'
  attributes += ` aria-label="${params.ariaLabel ? html`${params.ariaLabel}` : 'Cookie banner'}"`
  attributes += params.hidden ? ' hidden' : ''
  attributes += govukAttributes(params.attributes)

  let messages = ''
  for (const message of params.messages) {
    let actions = ''
    if (message.actions) {
      actions += '<div class="govuk-button-group">'

      for (const action of message.actions) {
        if (!action.href || action.type === 'button') {
          actions += govukButton({
            text: action.text,
            type: action.type ? action.type : 'button',
            name: action.name,
            value: action.value,
            classes: action.classes,
            href: action.href,
            attributes: action.attributes
          })
        } else {
          const extraClasses = action.classes ? html` ${action.classes}` : ''
          const attributes = govukAttributes(action.attributes)
          actions += html`<a class="govuk-link!${extraClasses}" href="${action.href}"!${attributes}>${action.text}</a>`
        }
      }
      actions += '</div>'
    }

    let attributes = ` ${attribute('role', message.role)}`
    attributes += govukAttributes(message.attributes)
    attributes += message.hidden ? ' hidden' : ''

    messages += `<div class="govuk-cookie-banner__message govuk-width-container!${message.classes ? html` ${message.classes}` : ''}"${attributes}>
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        ${message.headingHtml || message.headingText ? `
        <h2 class="govuk-cookie-banner__heading govuk-heading-m">
          ${message.headingHtml ?? html`${message.headingText}`}
        </h2>
        ` : ''}
        <div class="govuk-cookie-banner__content">
          ${message.html ?? (message.text ? html`<p class="govuk-body">${message.text}</p>` : '')}
        </div>
      </div>
    </div>
  </div>
  ${actions}`
  }

  return `<div class="${classNames}"${attributes}>
  ${messages}
</div>`
}

/**
 * @typedef {Object} actionsConfig
 * @property {string} text - The button or link text.
 * @property {string} [type] - The type of button – `"button"` or `"submit"`. If `href` is provided, set `type` to `"button"` render a link styled as a button.
 * @property {string} [href] - The `href` for a link. Set `type` to `"button"` and set `href` to render a link styled as a button.
 * @property {string} [name] - The name attribute for the button. Does not apply if you set `href`, which makes a link.
 * @property {string} [value] - The value attribute for the button. Does not apply if you set `href`, which makes a link.
 * @property {string} [classes] - The additional classes that you want to add to the button or link.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - The additional attributes that you want to add to the button or link. For example, data attributes.
 */

/**
 * @typedef {Object} messagesConfig
 * @property {string} [headingText] - The heading text that displays in the message. You can use any string with this option. If you set `headingHtml`, `headingText` is ignored.
 * @property {string} [headingHtml] - The heading HTML to use within the message. You can use any string with this option. If you set `headingHtml`, `headingText` is ignored. If you are not passing HTML, use `headingText`.
 * @property {string} text - The text for the main content within the message. You can use any string with this option. If you set `html`, `text` is not required and is ignored.
 * @property {string} html - The HTML for the main content within the message. You can use any string with this option. If you set `html`, `text` is not required and is ignored. If you are not passing HTML, use `text`.
 * @property {Array.<actionsConfig>} [actions] - The buttons and links that you want to display in the message. `actions` defaults to `"button"` unless you set `href`, which renders the action as a link.
 * @property {boolean} [hidden] - Defaults to `false`. If you set it to `true`, the message is hidden. You can use `hidden` for client-side implementations where the confirmation message HTML is present, but hidden on the page.
 * @property {string} [role] - Set `role` to `"alert"` on confirmation messages to allow assistive tech to automatically read the message. You will also need to move focus to the confirmation message using JavaScript you have written yourself.
 * @property {string} [classes] - The additional classes that you want to add to the message.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - The additional attributes that you want to add to the message. For example, data attributes.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} cookieBannerConfig
 * @property {string} [ariaLabel] - The text for the `aria-label` which labels the cookie banner region. This region applies to all messages that the cookie banner includes. For example, the cookie message and the confirmation message. Defaults to `"Cookie banner"`.
 * @property {boolean} [hidden] - Defaults to `false`. If you set this option to `true`, the whole cookie banner is hidden, including all messages within the banner. You can use `hidden` for client-side implementations where the cookie banner HTML is present, but hidden until the cookie banner is shown using JavaScript.
 * @property {string} [classes] - The additional classes that you want to add to the cookie banner.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - The additional attributes that you want to add to the cookie banner. For example, data attributes.
 * @property {Array.<messagesConfig>} messages - The different messages you can pass into the cookie banner. For example, the cookie message and the confirmation message.
 */
