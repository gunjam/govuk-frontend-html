# Skip link

Use the skip link component to help keyboard-only users skip to the main content on a page.

## Usage

```javascript
import { govukSkipLink } from 'govuk-frontend-html'

const html = govukSkipLink({
  text: 'Skip to main content',
  href: '#test-target-element'
})
```

Find out when to use the Skip link component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/skip-link/)

## Skip link options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the skip link component. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the skip link component. If `html` is provided, the `text` option will be ignored. |
| href | string | The value of the skip link’s `href` attribute. Defaults to `"#content"` if you do not provide a value. |
| classes | string | Classes to add to the skip link. |
| attributes | object | HTML attributes (for example data attributes) to add to the skip link. |
