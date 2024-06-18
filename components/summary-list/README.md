# Summary list

Use a summary list to summarise information, for example, a user’s responses at the end of a form.

## Usage

```javascript
import { govukSummaryList } from 'govuk-frontend-html'

const html = govukSummaryList({
  rows: [
    {
      key: {
        text: 'Name'
      },
      value: {
        text: 'Firstname Lastname'
      }
    },
    {
      key: {
        text: 'Date of birth'
      },
      value: {
        text: '13/08/1980'
      }
    },
    {
      key: {
        text: 'Contact information'
      },
      value: {
        html: '<p class="govuk-body">\n  email@email.com\n</p>\n<p class="govuk-body">\n  Address line 1<br>\n  Address line 2<br>\n  Address line 3<br>\n  Address line 4<br>\n  Address line 5\n</p>\n'
      }
    }
  ]
})
```

Find out when to use the Summary list component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/summary-list/)

## Summary list options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| rows | array | The rows within the summary list component. |
| card | object | Can be used to wrap a summary card around the summary list component. If any of these options are present, a summary card will wrap around the summary list. |
| classes | string | Classes to add to the container. |
| attributes | object | HTML attributes (for example data attributes) to add to the container. |


### Options for `rows` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the row `div`. |
| key | object | The reference content (key) for each row item in the summary list component. |
| value | object | The value for each row item in the summary list component. |
| actions | object | The action link content for each row item in the summary list component. |


### Options for `key` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within each key. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within each key. If `html` is provided, the `text` option will be ignored. |
| classes | string | Classes to add to the key wrapper. |


### Options for `value` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within each value. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within each value. If `html` is provided, the `text` option will be ignored. |
| classes | string | Classes to add to the value wrapper. |


### Options for `actions` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| items | array | The action link items within the row item of the summary list component. |
| classes | string | Classes to add to the actions wrapper. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| href | string | The value of the link's `href` attribute for an action item. |
| text | string | If `html` is set, this is not required. Text to use within each action item. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within each action item. If `html` is provided, the `text` option will be ignored. |
| visuallyHiddenText | string | Actions rely on context from the surrounding content so may require additional accessible text. Text supplied to this option is appended to the end. Use `html` for more complicated scenarios. |
| classes | string | Classes to add to the action item. |
| attributes | object | HTML attributes (for example data attributes) to add to the action item. |


### Options for `card` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| title | object | Data for the summary card header. |
| actions | object | The action link content shown in the header of each summary card wrapped around the summary list component. |
| classes | string | Classes to add to the container. |
| attributes | object | HTML attributes (for example data attributes) to add to the container. |


### Options for `title` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to use within each title. If `html` is provided, the `text` option will be ignored. |
| html | string | Text to use within each title. If `html` is provided, the `text` option will be ignored. |
| headingLevel | integer | Heading level, from `1` to `6`. Default is `2`. |
| classes | string | Classes to add to the title wrapper. |


### Options for `actions` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| items | array | The action link items shown in the header within the summary card wrapped around the summary list component. |
| classes | string | Classes to add to the actions wrapper. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| href | string | The value of the link's `href` attribute for an action item. |
| text | string | If `html` is set, this is not required. Text to use within each action item. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within each action item. If `html` is provided, the `text` option will be ignored. |
| visuallyHiddenText | string | Actions rely on context from the surrounding content so may require additional accessible text. Text supplied to this option is appended to the end. Use `html` for more complicated scenarios. |
| classes | string | Classes to add to the action item. |
| attributes | object | HTML attributes (for example data attributes) to add to the action item. |
