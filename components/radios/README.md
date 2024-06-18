# Radios

Use the radios component when users can only select one option from a list.

## Usage

```javascript
import { govukRadios } from 'govuk-frontend-html'

const html = govukRadios({
  name: 'whereDoYouLive',
  fieldset: {
    legend: {
      text: 'Where do you live?',
      isPageHeading: true,
      classes: 'govuk-fieldset__legend--l'
    }
  },
  items: [
    {
      value: 'england',
      text: 'England'
    },
    {
      value: 'scotland',
      text: 'Scotland'
    },
    {
      value: 'wales',
      text: 'Wales'
    },
    {
      value: 'northern-ireland',
      text: 'Northern Ireland'
    }
  ]
})
```

Find out when to use the Radios component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/radios/)

## Radios options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| fieldset | object | The fieldset used by the radios component. See [fieldset](../component/fieldset/README.md#fieldset-options). |
| hint | object | Can be used to add a hint to the radios component. See [hint](../component/hint/README.md#hint-options). |
| errorMessage | object | Can be used to add an error message to the radios component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. |
| formGroup | object | Additional options for the form group containing the radios component. |
| idPrefix | string | Optional prefix. This is used to prefix the `id` attribute for each radio input, hint and error message, separated by `-`. Defaults to the `name` option value. |
| name | string | Name attribute for the radio items. |
| items | array | The radio items within the radios component. |
| value | string | The value for the radio which should be checked when the page loads. Use this as an alternative to setting the `checked` option on each individual item. |
| classes | string | Classes to add to the radio container. |
| attributes | object | HTML attributes (for example data attributes) to add to the radio input tag. |


### Options for `formGroup` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the form group (for example to show error state for the whole group). |
| attributes | object | HTML attributes (for example data attributes) to add to the form group. |
| beforeInputs | object | Content to add before all radio items within the checkboxes component. |
| afterInputs | object | Content to add after all radio items within the checkboxes component. |


### Options for `beforeInputs` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add before all radio items. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add before all radio items. If `html` is provided, the `text` option will be ignored. |


### Options for `afterInputs` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add after all radio items. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add after all radio items. If `html` is provided, the `text` option will be ignored. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within each radio item label. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within each radio item label. If `html` is provided, the `text` option will be ignored. |
| id | string | Specific ID attribute for the radio item. If omitted, then `idPrefix` string will be applied. |
| value | string | Value for the radio input. |
| label | object | Subset of options for the label used by each radio item within the radios component. See [label](../component/label/README.md#label-options). |
| hint | object | Can be used to add a hint to each radio item within the radios component. See [hint](../component/hint/README.md#hint-options). |
| divider | string | Divider text to separate radio items, for example the text `"or"`. |
| checked | boolean | Whether the radio should be checked when the page loads. Takes precedence over the top-level `value` option. |
| conditional | object | Provide additional content to reveal when the radio is checked. |
| disabled | boolean | If `true`, radio will be disabled. |
| attributes | object | HTML attributes (for example data attributes) to add to the radio input tag. |


### Options for `label` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the label tag. |
| attributes | object | HTML attributes (for example data attributes) to add to the label tag. |


### Options for `conditional` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| html | string | The HTML to reveal when the radio is checked. |
