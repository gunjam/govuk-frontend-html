# Checkboxes

Let users select one or more options by using the checkboxes component.

## Usage

```javascript
import { govukCheckboxes } from 'govuk-frontend-html'

const html = govukCheckboxes({
  name: 'waste',
  fieldset: {
    legend: {
      text: 'Which types of waste do you transport?',
      isPageHeading: true,
      classes: 'govuk-fieldset__legend--l'
    }
  },
  hint: {
    text: 'Select all that apply.'
  },
  items: [
    {
      value: 'carcasses',
      text: 'Waste from animal carcasses'
    },
    {
      value: 'mines',
      text: 'Waste from mines or quarries'
    },
    {
      value: 'farm',
      text: 'Farm or agricultural waste'
    }
  ]
})
```

Find out when to use the Checkboxes component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/checkboxes/)

## Checkboxes options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| describedBy | string | One or more element IDs to add to the input `aria-describedby` attribute without a fieldset, used to provide additional descriptive information for screenreader users. |
| fieldset | object | Can be used to add a fieldset to the checkboxes component. See [fieldset](../fieldset/README.md#fieldset-options). |
| hint | object | Can be used to add a hint to the checkboxes component. See [hint](../hint/README.md#hint-options). |
| errorMessage | object | Can be used to add an error message to the checkboxes component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. |
| formGroup | object | Additional options for the form group containing the checkboxes component. |
| idPrefix | string | Optional prefix. This is used to prefix the `id` attribute for each checkbox item input, hint and error message, separated by `-`. Defaults to the `name` option value. |
| name | string | Name attribute for all checkbox items. |
| items | array | The checkbox items within the checkboxes component. |
| values | array | Array of values for checkboxes which should be checked when the page loads. Use this as an alternative to setting the `checked` option on each individual item. |
| classes | string | Classes to add to the checkboxes container. |
| attributes | object | HTML attributes (for example data attributes) to add to the anchor tag. |


### Options for `formGroup` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the form group (for example to show error state for the whole group). |
| attributes | object | HTML attributes (for example data attributes) to add to the form group. |
| beforeInputs | object | Content to add before all checkbox items within the checkboxes component. |
| afterInputs | object | Content to add after all checkbox items within the checkboxes component. |


### Options for `beforeInputs` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add before all checkbox items. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add before all checkbox items. If `html` is provided, the `text` option will be ignored. |


### Options for `afterInputs` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add after all checkbox items. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add after all checkbox items. If `html` is provided, the `text` option will be ignored. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within each checkbox item label. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within each checkbox item label. If `html` is provided, the `text` option will be ignored. |
| id | string | Specific ID attribute for the checkbox item. If omitted, then component global `idPrefix` option will be applied. |
| name | string | Specific name for the checkbox item. If omitted, then component global `name` string will be applied. |
| value | string | Value for the checkbox input. |
| label | object | Subset of options for the label used by each checkbox item within the checkboxes component. See [label](../label/README.md#label-options). |
| hint | object | Can be used to add a hint to each checkbox item within the checkboxes component. See [hint](../hint/README.md#hint-options). |
| divider | string | Divider text to separate checkbox items, for example the text `"or"`. |
| checked | boolean | Whether the checkbox should be checked when the page loads. Takes precedence over the top-level `values` option. |
| conditional | object | Provide additional content to reveal when the checkbox is checked. |
| behaviour | string | If set to `"exclusive"`, implements a 'None of these' type behaviour via JavaScript when checkboxes are clicked. |
| disabled | boolean | If `true`, checkbox will be disabled. |
| attributes | object | HTML attributes (for example data attributes) to add to the checkbox input tag. |


### Options for `label` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the label tag. |
| attributes | object | HTML attributes (for example data attributes) to add to the label tag. |


### Options for `conditional` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| html | string | The HTML to reveal when the checkbox is checked. |
