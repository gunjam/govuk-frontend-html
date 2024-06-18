# Error message

Follow the [validation pattern](https://design-system.service.gov.uk/patterns/validation/) and show an error message when there is a validation error. In the error message explain what went wrong and how to fix it.

## Usage

```javascript
import { govukErrorMessage } from 'govuk-frontend-html'

const html = govukErrorMessage({
  text: 'The date your passport was issued must be in the past'
})
```

Find out when to use the Error message component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/error-message/)

## Error message options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the error message. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the error message. If `html` is provided, the `text` option will be ignored. |
| id | string | ID attribute to add to the error message `<p>` tag. |
| classes | string | Classes to add to the error message `<p>` tag. |
| attributes | object | HTML attributes (for example data attributes) to add to the error message `<p>` tag. |
| visuallyHiddenText | string | A visually hidden prefix used before the error message. Defaults to `"Error"`. |
