# Details

Make a page easier to scan by letting users reveal more detailed information only if they need it.

## Usage

```javascript
import { govukDetails } from 'govuk-frontend-html'

const html = govukDetails({
  summaryText: 'Help with nationality',
  text: 'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you can’t provide your nationality, you’ll have to send copies of identity documents through the post.'
})
```

Find out when to use the Details component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/details/)

## Details options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| summaryText | string | If `summmaryHtml` is set, this is not required. Text to use within the summary element (the visible part of the details element). If `summaryHtml` is provided, the `summaryText` option will be ignored. |
| summaryHtml | string | If `summmaryText` is set, this is not required. HTML to use within the summary element (the visible part of the details element). If `summaryHtml` is provided, the `summaryText` option will be ignored. |
| text | string | If `html` is set, this is not required. Text to use within the disclosed part of the details element. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the disclosed part of the details element. If `html` is provided, the `text` option will be ignored. |
| id | string | ID to add to the details element. |
| open | boolean | If `true`, details element will be expanded. |
| classes | string | Classes to add to the `<details>` element. |
| attributes | object | HTML attributes (for example data attributes) to add to the `<details>` element. |
