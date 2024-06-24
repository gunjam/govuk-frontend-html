# Pagination

Help users navigate forwards and backwards through a series of pages. For example, search results or guidance that’s divided into multiple website pages – like [the GOV.UK mainstream guide format](https://prototype-kit.service.gov.uk/v12/docs/templates/mainstream-guide).

## Usage

```javascript
import { govukPagination } from 'govuk-frontend-html'

const html = govukPagination({
  previous: {
    href: '/previous'
  },
  next: {
    href: '/next'
  },
  items: [
    {
      number: 1,
      href: '/page/1'
    },
    {
      number: 2,
      href: '/page/2',
      current: true
    },
    {
      number: 3,
      href: '/page/3'
    }
  ]
})
```

Find out when to use the Pagination component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/pagination/)

## Pagination options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| items | array | The items within the pagination component. |
| previous | object | A link to the previous page, if there is a previous page. |
| next | object | A link to the next page, if there is a next page. |
| landmarkLabel | string | The label for the navigation landmark that wraps the pagination. Defaults to `"Pagination"`. |
| classes | string | The classes you want to add to the pagination `nav` parent. |
| attributes | object | The HTML attributes (for example, data attributes) you want to add to the pagination `nav` parent. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| number | string | The pagination item text – usually a page number. |
| visuallyHiddenText | string | The visually hidden label (for the pagination item) which will be applied to an `aria-label` and announced by screen readers on the pagination item link. Should include page number. |
| href | string | The link's URL. |
| current | boolean | Set to `true` to indicate the current page the user is on. |
| ellipsis | boolean | Use this option if you want to specify an ellipsis at a given point between numbers. If you set this option as `true`, any other options for the item are ignored. |
| attributes | object | The HTML attributes (for example, data attributes) you want to add to the anchor. |


### Options for `previous` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | The text content of the link to the previous page. Defaults to `"Previous page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored. |
| html | string | The HTML content of the link to the previous page. Defaults to `"Previous page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored. |
| labelText | string | The optional label that goes underneath the link to the previous page, providing further context for the user about where the link goes. |
| href | string | The previous page's URL. |
| attributes | object | The HTML attributes (for example, data attributes) you want to add to the anchor. |


### Options for `next` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | The text content of the link to the next page. Defaults to `"Next page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored. |
| html | string | The HTML content of the link to the next page. Defaults to `"Next page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored. |
| labelText | string | The optional label that goes underneath the link to the next page, providing further context for the user about where the link goes. |
| href | string | The next page's URL. |
| attributes | object | The HTML attributes (for example, data attributes) you want to add to the anchor. |
