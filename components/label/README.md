# Label

Label an input.

## Usage

```javascript
import { govukLabel } from 'govuk-frontend-html'

const html = govukLabel({
  text: 'National Insurance number'
})
```



## Label options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the label. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the label. If `html` is provided, the `text` option will be ignored. |
| for | string | The value of the `for` attribute, the ID of the input the label is associated with. |
| isPageHeading | boolean | Whether the label also acts as the heading for the page. |
| classes | string | Classes to add to the label tag. |
| attributes | object | HTML attributes (for example data attributes) to add to the label tag. |
