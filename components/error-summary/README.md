# Error summary

Use this component at the top of a page to summarise any errors a user has made.

When a user makes an error, you must show both an error summary and an [error message](https://design-system.service.gov.uk/components/error-message/) next to each answer that contains an error.

## Usage

```javascript
import { govukErrorSummary } from 'govuk-frontend-html'

const html = govukErrorSummary({
  titleText: 'There is a problem',
  errorList: [
    {
      text: 'The date your passport was issued must be in the past',
      href: '#example-error-1'
    },
    {
      text: 'Enter a postcode, like AA1 1AA',
      href: '#example-error-2'
    }
  ]
})
```

Find out when to use the Error summary component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/error-summary/)

## Error summary options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| titleText | string | If `titleHtml` is set, this is not required. Text to use for the heading of the error summary block. If `titleHtml` is provided, `titleText` will be ignored. |
| titleHtml | string | If `titleText` is set, this is not required. HTML to use for the heading of the error summary block. If `titleHtml` is provided, `titleText` will be ignored. |
| descriptionText | string | Text to use for the description of the errors. If you set `descriptionHtml`, the component will ignore `descriptionText`. |
| descriptionHtml | string | HTML to use for the description of the errors. If you set this option, the component will ignore `descriptionText`. |
| errorList | array | A list of errors to include in the error summary. |
| disableAutoFocus | boolean | Prevent moving focus to the error summary when the page loads. |
| classes | string | Classes to add to the error-summary container. |
| attributes | object | HTML attributes (for example data attributes) to add to the error-summary container. |


### Options for `errorList` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| href | string | Href attribute for the error link item. If provided item will be an anchor. |
| text | string | If `html` is set, this is not required. Text for the error link item. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML for the error link item. If `html` is provided, the `text` option will be ignored. |
| attributes | object | HTML attributes (for example data attributes) to add to the error link anchor. |
