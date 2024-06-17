import { html } from 'ghtml'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Use a notification banner to tell the user about something they need to know about, but that’s not directly related to the page content.
 * @param {notificationBannerConfig} params - Notification banner config options
 * @returns {string} Notification banner HTML
 * @see {@link https://design-system.service.gov.uk/components/notification-banner/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukNotificationBanner({
 *   text: 'This publication was withdrawn on 7 March 2014.'
 * })
 * ```
 */
export default function govukNotificationBanner(params) {
  const headingLevel = params.titleHeadingLevel ? html`${params.titleHeadingLevel}` : '2'
  const successBanner = params.type === 'success'
  const titleId = params.titleId ? html`${params.titleId}` : 'govuk-notification-banner-title'
  let classNames = 'govuk-notification-banner'
  let role
  let title

  if (params.classes) {
    classNames += html` ${params.classes}`
  }
  if (successBanner) {
    classNames += ' govuk-notification-banner--success'
  }

  if (params.role) {
    role = html`${params.role}`
  } else if (successBanner) {
    // If type is success, add `role="alert"` to prioritise the information in
    // the notification banner to users of assistive technologies.
    role = 'alert'
  } else {
    // Otherwise add `role="region"` to make the notification banner a landmark
    // to help users of assistive technologies to navigate to the banner.
    role = 'region'
  }

  if (params.titleHtml) {
    title = params.titleHtml
  } else if (params.titleText) {
    title = html`${params.titleText}`
  } else if (successBanner) {
    title = 'Success'
  } else {
    title = 'Important'
  }

  let attributes = `role="${role}"`
  attributes += ` aria-labelledby="${titleId}"`
  attributes += ' data-module="govuk-notification-banner"'
  attributes += attribute('data-disable-auto-focus', params.disableAutoFocus)
  attributes += govukAttributes(params.attributes)

  return `<div class="${classNames}"${attributes}>
  <div class="govuk-notification-banner__header">
    <h${headingLevel} class="govuk-notification-banner__title" id="${titleId}">
      ${title}
    </h${headingLevel}>
  </div>
  <div class="govuk-notification-banner__content">
    ${params.html ?? (params.text ? html`<p class="govuk-notification-banner__heading">${params.text}</p>` : '')}
  </div>
</div>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} notificationBannerConfig
 * @property {string} text - The text that displays in the notification banner. You can use any string with this option. If you set `html`, this option is not required and is ignored.
 * @property {string} html - The HTML to use within the notification banner. You can use any string with this option. If you set `html`, `text` is not required and is ignored.
 * @property {string} [titleText] - The title text that displays in the notification banner. You can use any string with this option. Use this option to set text that does not contain HTML. The available default values are 'Important', 'Success', and null:
- if you do not set `type`, `titleText` defaults to `"Important"`
- if you set `type` to `success`, `titleText` defaults to `"Success"`
- if you set `titleHtml`, this option is ignored

 * @property {string} [titleHtml] - The title HTML to use within the notification banner. You can use any string with this option. Use this option to set text that contains HTML. If you set `titleHtml`, the `titleText` option is ignored.
 * @property {string} [titleHeadingLevel] - Sets heading level for the title only. You can only use values between `1` and `6` with this option. The default is `2`.
 * @property {string} [type] - The type of notification to render. You can use only `"success"` or `null` values with this option. If you set `type` to `"success"`, the notification banner sets `role` to `"alert"`. JavaScript then moves the keyboard focus to the notification banner when the page loads. If you do not set `type`, the notification banner sets `role` to `"region"`.
 * @property {string} [role] - Overrides the value of the `role` attribute for the notification banner. Defaults to `"region"`. If you set `type` to `"success"`, `role` defaults to `"alert"`.
 * @property {string} [titleId] - The `id` for the banner title, and the `aria-labelledby` attribute in the banner. Defaults to `"govuk-notification-banner-title"`.
 * @property {boolean} [disableAutoFocus] - If you set `type` to `"success"`, or `role` to `"alert"`, JavaScript moves the keyboard focus to the notification banner when the page loads. To disable this behaviour, set `disableAutoFocus` to `true`.
 * @property {string} [classes] - The classes that you want to add to the notification banner.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - The HTML attributes that you want to add to the notification banner, for example, data attributes.
 */
