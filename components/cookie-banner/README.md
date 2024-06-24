# Cookie banner

Allow users to accept or reject cookies which are not essential to making your service work.

## Usage

```javascript
import { govukCookieBanner } from 'govuk-frontend-html'

const html = govukCookieBanner({
  messages: [
    {
      headingText: 'Cookies on this government service',
      text: 'We use analytics cookies to help understand how users use our service.',
      actions: [
        {
          text: 'Accept analytics cookies',
          type: 'submit',
          name: 'cookies',
          value: 'accept'
        },
        {
          text: 'Reject analytics cookies',
          type: 'submit',
          name: 'cookies',
          value: 'reject'
        },
        {
          text: 'View cookie preferences',
          href: '/cookie-preferences'
        }
      ]
    }
  ]
})
```

Find out when to use the Cookie banner component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/cookie-banner/)

## Cookie banner options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| ariaLabel | string | The text for the `aria-label` which labels the cookie banner region. This region applies to all messages that the cookie banner includes. For example, the cookie message and the confirmation message. Defaults to `"Cookie banner"`. |
| hidden | boolean | Defaults to `false`. If you set this option to `true`, the whole cookie banner is hidden, including all messages within the banner. You can use `hidden` for client-side implementations where the cookie banner HTML is present, but hidden until the cookie banner is shown using JavaScript. |
| classes | string | The additional classes that you want to add to the cookie banner. |
| attributes | object | The additional attributes that you want to add to the cookie banner. For example, data attributes. |
| messages | array | The different messages you can pass into the cookie banner. For example, the cookie message and the confirmation message. |


### Options for `messages` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| headingText | string | The heading text that displays in the message. You can use any string with this option. If you set `headingHtml`, `headingText` is ignored. |
| headingHtml | string | The heading HTML to use within the message. You can use any string with this option. If you set `headingHtml`, `headingText` is ignored. If you are not passing HTML, use `headingText`. |
| text | string | The text for the main content within the message. You can use any string with this option. If you set `html`, `text` is not required and is ignored. |
| html | string | The HTML for the main content within the message. You can use any string with this option. If you set `html`, `text` is not required and is ignored. If you are not passing HTML, use `text`. |
| actions | array | The buttons and links that you want to display in the message. `actions` defaults to `"button"` unless you set `href`, which renders the action as a link. |
| hidden | boolean | Defaults to `false`. If you set it to `true`, the message is hidden. You can use `hidden` for client-side implementations where the confirmation message HTML is present, but hidden on the page. |
| role | string | Set `role` to `"alert"` on confirmation messages to allow assistive tech to automatically read the message. You will also need to move focus to the confirmation message using JavaScript you have written yourself. |
| classes | string | The additional classes that you want to add to the message. |
| attributes | object | The additional attributes that you want to add to the message. For example, data attributes. |


### Options for `actions` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | The button or link text. |
| type | string | The type of button – `"button"` or `"submit"`. If `href` is provided, set `type` to `"button"` render a link styled as a button. |
| href | string | The `href` for a link. Set `type` to `"button"` and set `href` to render a link styled as a button. |
| name | string | The name attribute for the button. Does not apply if you set `href`, which makes a link. |
| value | string | The value attribute for the button. Does not apply if you set `href`, which makes a link. |
| classes | string | The additional classes that you want to add to the button or link. |
| attributes | object | The additional attributes that you want to add to the button or link. For example, data attributes. |
