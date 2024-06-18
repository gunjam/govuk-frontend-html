# Notification banner

Use a notification banner to tell the user about something they need to know about, but that’s not directly related to the page content.

## Usage

```javascript
import { govukNotificationBanner } from 'govuk-frontend-html'

const html = govukNotificationBanner({
  text: 'This publication was withdrawn on 7 March 2014.'
})
```

Find out when to use the Notification banner component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/notification-banner/)

## Notification banner options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | The text that displays in the notification banner. You can use any string with this option. If you set `html`, this option is not required and is ignored. |
| html | string | The HTML to use within the notification banner. You can use any string with this option. If you set `html`, `text` is not required and is ignored. |
| titleText | string | The title text that displays in the notification banner. You can use any string with this option. Use this option to set text that does not contain HTML. The available default values are 'Important', 'Success', and null:
- if you do not set `type`, `titleText` defaults to `"Important"`
- if you set `type` to `success`, `titleText` defaults to `"Success"`
- if you set `titleHtml`, this option is ignored
 |
| titleHtml | string | The title HTML to use within the notification banner. You can use any string with this option. Use this option to set text that contains HTML. If you set `titleHtml`, the `titleText` option is ignored. |
| titleHeadingLevel | string | Sets heading level for the title only. You can only use values between `1` and `6` with this option. The default is `2`. |
| type | string | The type of notification to render. You can use only `"success"` or `null` values with this option. If you set `type` to `"success"`, the notification banner sets `role` to `"alert"`. JavaScript then moves the keyboard focus to the notification banner when the page loads. If you do not set `type`, the notification banner sets `role` to `"region"`. |
| role | string | Overrides the value of the `role` attribute for the notification banner. Defaults to `"region"`. If you set `type` to `"success"`, `role` defaults to `"alert"`. |
| titleId | string | The `id` for the banner title, and the `aria-labelledby` attribute in the banner. Defaults to `"govuk-notification-banner-title"`. |
| disableAutoFocus | boolean | If you set `type` to `"success"`, or `role` to `"alert"`, JavaScript moves the keyboard focus to the notification banner when the page loads. To disable this behaviour, set `disableAutoFocus` to `true`. |
| classes | string | The classes that you want to add to the notification banner. |
| attributes | object | The HTML attributes that you want to add to the notification banner, for example, data attributes. |
