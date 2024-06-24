# Hint

Add hint text to inputs and fieldsets.

## Usage

```javascript
import { govukHint } from 'govuk-frontend-html'

const html = govukHint({
  text: 'It’s on your National Insurance card, benefit letter, payslip or P60. For example, "QQ 12 34 56 C".'
})
```



## Hint options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the hint. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the hint. If `html` is provided, the `text` option will be ignored. |
| id | string | Optional ID attribute to add to the hint span tag. |
| classes | string | Classes to add to the hint span tag. |
| attributes | object | HTML attributes (for example data attributes) to add to the hint span tag. |
