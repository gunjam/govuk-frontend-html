# Input

Use the text input component when you need to let users enter text that’s no longer than a single line, such as their name or phone number.

## Usage

```javascript
import { govukInput } from 'govuk-frontend-html'

const html = govukInput({
  label: {
    text: 'National Insurance number'
  },
  id: 'input-example',
  name: 'test-name'
})
```

Find out when to use the Input component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/input/)

## Input options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | The ID of the input. |
| name | string | The name of the input, which is submitted with the form data. |
| type | string | Type of input control to render, for example, a password input control. Defaults to `"text"`. |
| inputmode | string | Optional value for [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode). |
| value | string | Optional initial value of the input. |
| disabled | boolean | If `true`, input will be disabled. |
| describedBy | string | One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. |
| label | object | The label used by the text input component. See [label](../label/README.md#label-options). |
| hint | object | Can be used to add a hint to a text input component. See [hint](../hint/README.md#hint-options). |
| errorMessage | object | Can be used to add an error message to the text input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. |
| prefix | object | Can be used to add a prefix to the text input component. |
| suffix | object | Can be used to add a suffix to the text input component. |
| formGroup | object | Additional options for the form group containing the text input component. |
| classes | string | Classes to add to the input. |
| autocomplete | string | Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html), for instance "postal-code" or "username". See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of attributes that can be used. |
| pattern | string | Attribute to [provide a regular expression pattern](https://html.spec.whatwg.org/multipage/sec-forms.html#the-pattern-attribute), used to match allowed character combinations for the input value. |
| spellcheck | boolean | Optional field to enable or disable the `spellcheck` attribute on the input. |
| autocapitalize | string | Optional field to enable or disable autocapitalisation of user input. See [autocapitalization](https://html.spec.whatwg.org/multipage/interaction.html#autocapitalization) for a full list of values that can be used. |
| inputWrapper | object | If any of `prefix`, `suffix`, `formGroup.beforeInput` or `formGroup.afterInput` have a value, a wrapping element is added around the input and inserted content. This object allows you to customise that wrapping element. |
| attributes | object | HTML attributes (for example data attributes) to add to the input. |


### Options for `prefix` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Required. If `html` is set, this is not required. Text to use within the prefix. If `html` is provided, the `text` option will be ignored. |
| html | string | Required. If `text` is set, this is not required. HTML to use within the prefix. If `html` is provided, the `text` option will be ignored. |
| classes | string | Classes to add to the prefix. |
| attributes | object | HTML attributes (for example data attributes) to add to the prefix element. |


### Options for `suffix` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the suffix. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the suffix. If `html` is provided, the `text` option will be ignored. |
| classes | string | Classes to add to the suffix element. |
| attributes | object | HTML attributes (for example data attributes) to add to the suffix element. |


### Options for `formGroup` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the form group (for example to show error state for the whole group). |
| attributes | object | HTML attributes (for example data attributes) to add to the form group. |
| beforeInput | object | Content to add before the input used by the text input component. |
| afterInput | object | Content to add after the input used by the text input component. |


### Options for `beforeInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add before the input. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add before the input. If `html` is provided, the `text` option will be ignored. |


### Options for `afterInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add after the input. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add after the input. If `html` is provided, the `text` option will be ignored. |


### Options for `inputWrapper` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the wrapping element. |
| attributes | object | HTML attributes (for example data attributes) to add to the wrapping element. |
