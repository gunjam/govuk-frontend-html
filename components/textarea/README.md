# Textarea

Use the textarea component when you need to let users enter an amount of text that’s longer than a single line.

## Usage

```javascript
import { govukTextarea } from 'govuk-frontend-html'

const html = govukTextarea({
  name: 'more-detail',
  id: 'more-detail',
  label: {
    text: 'Can you provide more detail?'
  }
})
```

Find out when to use the Textarea component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/textarea/)

## Textarea options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | The ID of the textarea. |
| name | string | The name of the textarea, which is submitted with the form data. |
| spellcheck | boolean | Optional field to enable or disable the `spellcheck` attribute on the textarea. |
| rows | string | Optional number of textarea rows (default is 5 rows). |
| value | string | Optional initial value of the textarea. |
| disabled | boolean | If `true`, textarea will be disabled. |
| describedBy | string | One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. |
| label | object | The label used by the textarea component. See [label](../component/label/README.md#label-options). |
| hint | object | Can be used to add a hint to the textarea component. See [hint](../component/hint/README.md#hint-options). |
| errorMessage | object | Can be used to add an error message to the textarea component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. |
| formGroup | object | Additional options for the form group containing the textarea component. |
| classes | string | Classes to add to the textarea. |
| autocomplete | string | Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html), for example `"street-address"`. See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of attributes that can be used. |
| attributes | object | HTML attributes (for example data attributes) to add to the textarea. |


### Options for `formGroup` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the form group (for example to show error state for the whole group). |
| attributes | object | HTML attributes (for example data attributes) to add to the form group. |
| beforeInput | object | Content to add before the textarea used by the textarea component. |
| afterInput | object | Content to add after the textarea used by the textarea component. |


### Options for `beforeInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add before the textarea. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add before the textarea. If `html` is provided, the `text` option will be ignored. |


### Options for `afterInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add after the textarea. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add after the textarea. If `html` is provided, the `text` option will be ignored. |
