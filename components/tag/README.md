# Tag

Use the tag component to show users the status of something.

## Usage

```javascript
import { govukTag } from 'govuk-frontend-html'

const html = govukTag({
  text: 'Alpha'
})
```

Find out when to use the Tag component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/tag/)

## Tag options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the tag component. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the tag component. If `html` is provided, the `text` option will be ignored. |
| classes | string | Classes to add to the tag. |
| attributes | object | HTML attributes (for example data attributes) to add to the tag. |
