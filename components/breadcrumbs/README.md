# Breadcrumbs

The breadcrumbs component helps users to understand where they are within a website’s structure and move between levels.

## Usage

```javascript
import { govukBreadcrumbs } from 'govuk-frontend-html'

const html = govukBreadcrumbs({
  items: [
    {
      text: 'Section',
      href: '/section'
    },
    {
      text: 'Sub-section',
      href: '/section/sub-section'
    }
  ]
})
```

Find out when to use the Breadcrumbs component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/breadcrumbs/)

## Breadcrumbs options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| items | array | The items within breadcrumbs. |
| classes | string | Classes to add to the breadcrumbs container. |
| collapseOnMobile | boolean | When true, the breadcrumbs will collapse to the first and last item only on tablet breakpoint and below. |
| attributes | object | HTML attributes (for example data attributes) to add to the breadcrumbs container. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the breadcrumbs item. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the breadcrumbs item. If `html` is provided, the `text` option will be ignored. |
| href | string | Link for the breadcrumbs item. If not specified, breadcrumbs item is a normal list item. |
| attributes | object | HTML attributes (for example data attributes) to add to the individual crumb. |
