# Select

The select component should only be used as a last resort in public-facing services because research shows that some users find selects very difficult to use.

## Usage

```javascript
import { govukSelect } from 'govuk-frontend-html'

const html = govukSelect({
  id: 'sort',
  name: 'sort',
  label: {
    text: 'Sort by'
  },
  items: [
    {
      value: 'published',
      text: 'Recently published'
    },
    {
      value: 'updated',
      text: 'Recently updated',
      selected: true
    },
    {
      value: 'views',
      text: 'Most views'
    },
    {
      value: 'comments',
      text: 'Most comments'
    }
  ]
})
```

Find out when to use the Select component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/select/)

## Select options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | ID for each select box. |
| name | string | Name property for the select. |
| items | array | The items within the select component. |
| value | string | Value for the option which should be selected. Use this as an alternative to setting the `selected` option on each individual item. |
| disabled | boolean | If `true`, select box will be disabled. Use the `disabled` option on each individual item to only disable certain options. |
| describedBy | string | One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. |
| label | object | The label used by the select component. See [label](../component/label/README.md#label-options). |
| hint | object | Can be used to add a hint to the select component. See [hint](../component/hint/README.md#hint-options). |
| errorMessage | object | Can be used to add an error message to the select component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. |
| formGroup | object | Additional options for the form group containing the select component. |
| classes | string | Classes to add to the select. |
| attributes | object | HTML attributes (for example data attributes) to add to the select. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | string | Value for the option. If this is omitted, the value is taken from the text content of the option element. |
| text | string | Text for the option item. |
| selected | boolean | Whether the option should be selected when the page loads. Takes precedence over the top-level `value` option. |
| disabled | boolean | Sets the option item as disabled. |
| attributes | object | HTML attributes (for example data attributes) to add to the option. |


### Options for `formGroup` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the form group (for example to show error state for the whole group). |
| attributes | object | HTML attributes (for example data attributes) to add to the form group. |
| beforeInput | object | Content to add before the select used by the select component. |
| afterInput | object | Content to add after the select used by the select component. |


### Options for `beforeInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add before the select. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add before the select. If `html` is provided, the `text` option will be ignored. |


### Options for `afterInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add after the select. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add after the select. If `html` is provided, the `text` option will be ignored. |
