# Back link

Use the back link component to help users go back to the previous page in a multi-page transaction.

## Usage

```javascript
import { govukBackLink } from 'govuk-frontend-html'

const html = govukBackLink({
  text: 'Go back to details page',
  href: '/test-page'
})
```

Find out when to use the Back link component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/back-link/)

## Back link options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to use within the back link component. If `html` is provided, the `text` option will be ignored. Defaults to `"Back"`. |
| html | string | HTML to use within the back link component. If `html` is provided, the `text` option will be ignored. Defaults to `"Back"`. |
| href | string | The value of the link's `href` attribute. |
| classes | string | Classes to add to the anchor tag. |
| attributes | object | HTML attributes (for example data attributes) to add to the anchor tag. |
