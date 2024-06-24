# Task list

The task list component displays all the tasks a user needs to do, and allows users to easily identify which ones are done and which they still need to do.

## Usage

```javascript
import { govukTaskList } from 'govuk-frontend-html'

const html = govukTaskList({
  items: [
    {
      title: {
        text: 'Company Directors'
      },
      href: '#',
      status: {
        text: 'Completed'
      }
    },
    {
      title: {
        text: 'Registered company details'
      },
      href: '#',
      status: {
        tag: {
          text: 'Incomplete',
          classes: 'govuk-tag--blue'
        }
      }
    },
    {
      title: {
        text: 'Business plan'
      },
      href: '#',
      status: {
        tag: {
          text: 'Incomplete',
          classes: 'govuk-tag--blue'
        }
      }
    }
  ]
})
```

Find out when to use the Task list component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/task-list/)

## Task list options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| items | array | The items for each task within the task list component. |
| classes | string | Classes to add to the `ul` container for the task list. |
| attributes | object | HTML attributes (for example data attributes) to add to the `ul` container for the task list. |
| idPrefix | string | Optional prefix. This is used to prefix the `id` attribute for the task list item tag and hint, separated by `-`. Defaults to `"task-list"`. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| title | object | The main title for the task within the task list component. |
| hint | object | Can be used to add a hint to each task within the task list component. See [hint](../hint/README.md#hint-options). |
| status | object | The status for each task within the task list component. |
| href | string | The value of the link’s `href` attribute for the task list item. |
| classes | string | Classes to add to the item `div`. |


### Options for `title` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to use within the title. If `html` is provided, the `text` argument will be ignored. |
| html | string | HTML to use within the title. If `html` is provided, the `text` argument will be ignored. |
| classes | string | Classes to add to the title wrapper. |


### Options for `hint` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to use within the hint. If `html` is provided, the `text` argument will be ignored. |
| html | string | HTML to use within the hint. If `html` is provided, the `text` argument will be ignored. |


### Options for `status` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| tag | object | Can be used to add a tag to the status of the task within the task list component. See [tag](../tag/README.md#tag-options). |
| text | string | Text to use for the status, as an alternative to using a tag. If `html` or `tag` is provided, the `text` argument will be ignored. |
| html | string | HTML to use for the status, as an alternative to using a tag. If `html` or `tag` is provided, the `text` argument will be ignored. |
| classes | string | Classes to add to the status container. |
