# Table

Use the table component to make information easier to compare and scan for users.

## Usage

```javascript
import { govukTable } from 'govuk-frontend-html'

const html = govukTable({
  rows: [
    [
      {
        text: 'January'
      },
      {
        text: '£85',
        format: 'numeric'
      },
      {
        text: '£95',
        format: 'numeric'
      }
    ],
    [
      {
        text: 'February'
      },
      {
        text: '£75',
        format: 'numeric'
      },
      {
        text: '£55',
        format: 'numeric'
      }
    ],
    [
      {
        text: 'March'
      },
      {
        text: '£165',
        format: 'numeric'
      },
      {
        text: '£125',
        format: 'numeric'
      }
    ]
  ]
})
```

Find out when to use the Table component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/table/)

## Table options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| rows | array | The rows within the table component. |
| head | array | Can be used to add a row of table header cells (`<th>`) at the top of the table component. |
| caption | string | Caption text. |
| captionClasses | string | Classes for caption text size. Classes should correspond to the available typography heading classes. |
| firstCellIsHeader | boolean | If set to `true`, the first cell in each row will be a table header (`<th>`). |
| classes | string | Classes to add to the table container. |
| attributes | object | HTML attributes (for example data attributes) to add to the table container. |


### Options for `rows` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text for cells in table rows. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML for cells in table rows. If `html` is provided, the `text` option will be ignored. |
| format | string | Specify format of a cell. Currently we only use "numeric". |
| classes | string | Classes to add to the table row cell. |
| colspan | integer | Specify how many columns a cell extends. |
| rowspan | integer | Specify how many rows a cell extends. |
| attributes | object | HTML attributes (for example data attributes) to add to the table cell. |


### Options for `head` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text for table head cells. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML for table head cells. If `html` is provided, the `text` option will be ignored. |
| format | string | Specify format of a cell. Currently we only use "numeric". |
| classes | string | Classes to add to the table head cell. |
| colspan | integer | Specify how many columns a cell extends. |
| rowspan | integer | Specify how many rows a cell extends. |
| attributes | object | HTML attributes (for example data attributes) to add to the table cell. |
