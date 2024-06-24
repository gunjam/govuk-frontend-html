# Date input

Use the date input component to help users enter a memorable date or one they can easily look up.

## Usage

```javascript
import { govukDateInput } from 'govuk-frontend-html'

const html = govukDateInput({
  id: 'passport-issued',
  namePrefix: 'passport-issued',
  fieldset: {
    legend: {
      text: 'When was your passport issued?'
    }
  },
  hint: {
    text: 'For example, 27 3 2007'
  }
})
```

Find out when to use the Date input component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/date-input/)

## Date input options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | This is used for the main component and to compose the ID attribute for each item. |
| namePrefix | string | Optional prefix. This is used to prefix each item `name`, separated by `-`. |
| items | array | The inputs within the date input component. |
| hint | object | Can be used to add a hint to a date input component. See [hint](../hint/README.md#hint-options). |
| errorMessage | object | Can be used to add an error message to the date input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. |
| formGroup | object | Additional options for the form group containing the date input component. |
| fieldset | object | Can be used to add a fieldset to the date input component. See [fieldset](../fieldset/README.md#fieldset-options). |
| classes | string | Classes to add to the date-input container. |
| attributes | object | HTML attributes (for example data attributes) to add to the date-input container. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Item-specific ID. If provided, it will be used instead of the generated ID. |
| name | string | Item-specific name attribute. |
| label | string | Item-specific label text. If provided, this will be used instead of `name` for item label text. See [label](../label/README.md#label-options). |
| value | string | If provided, it will be used as the initial value of the input. |
| autocomplete | string | Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html), for instance `"bday-day"`. See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of attributes that can be used. |
| pattern | string | Attribute to [provide a regular expression pattern](https://html.spec.whatwg.org/multipage/sec-forms.html#the-pattern-attribute), used to match allowed character combinations for the input value. |
| classes | string | Classes to add to date input item. |
| attributes | object | HTML attributes (for example data attributes) to add to the date input tag. |


### Options for `formGroup` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the form group (for example to show error state for the whole group). |
| attributes | object | HTML attributes (for example data attributes) to add to the form group. |
| beforeInputs | object | Content to add before the inputs used by the date input component. |
| afterInputs | object | Content to add after the inputs used by the date input component. |


### Options for `beforeInputs` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add before the inputs. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add before the inputs. If `html` is provided, the `text` option will be ignored. |


### Options for `afterInputs` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add after the inputs. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add after the inputs. If `html` is provided, the `text` option will be ignored. |
