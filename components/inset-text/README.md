# Inset text

Use the inset text component to differentiate a block of text from the content that surrounds it, for example:
 * quotes
 * examples
 * additional information about the page

## Usage

```javascript
import { govukInsetText } from 'govuk-frontend-html'

const html = govukInsetText({
  text: 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.'
})
```

Find out when to use the Inset text component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/inset-text/)

## Inset text options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the inset text component. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the inset text component. If `html` is provided, the `text` option will be ignored. |
| id | string | ID attribute to add to the inset text container. |
| classes | string | Classes to add to the inset text container. |
| attributes | object | HTML attributes (for example data attributes) to add to the inset text container. |
