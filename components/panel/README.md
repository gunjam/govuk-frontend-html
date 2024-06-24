# Panel

The panel component is a visible container used on confirmation or results pages to highlight important content.

## Usage

```javascript
import { govukPanel } from 'govuk-frontend-html'

const html = govukPanel({
  titleHtml: 'Application complete',
  text: 'Your reference number: HDJ2123F'
})
```

Find out when to use the Panel component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/panel/)

## Panel options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| titleText | string | If `titleHtml` is set, this is not required. Text to use within the panel. If `titleHtml` is provided, the `titleText` option will be ignored. |
| titleHtml | string | If `titleText` is set, this is not required. HTML to use within the panel. If `titleHtml` is provided, the `titleText` option will be ignored. |
| headingLevel | integer | Heading level, from `1` to `6`. Default is `1`. |
| text | string | If `html` is set, this is not required. Text to use within the panel content. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the panel content. If `html` is provided, the `text` option will be ignored. |
| classes | string | Classes to add to the panel container. |
| attributes | object | HTML attributes (for example data attributes) to add to the panel container. |
