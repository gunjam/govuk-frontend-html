# Warning text

Use the warning text component when you need to warn users about something important, such as legal consequences of an action, or lack of action, that they might take.

## Usage

```javascript
import { govukWarningText } from 'govuk-frontend-html'

const html = govukWarningText({
  text: 'You can be fined up to £5,000 if you don’t register.',
  iconFallbackText: 'Warning'
})
```

Find out when to use the Warning text component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/warning-text/)

## Warning text options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the warning text component. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the warning text component. If `html` is provided, the `text` option will be ignored. |
| iconFallbackText | string | The fallback text for the icon. Defaults to `"Warning"`. |
| classes | string | Classes to add to the warning text. |
| attributes | object | HTML attributes (for example data attributes) to add to the warning text. |
