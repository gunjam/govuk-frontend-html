# Tabs

The tabs component lets users navigate between related sections of content, displaying one section at a time.

## Usage

```javascript
import { govukTabs } from 'govuk-frontend-html'

const html = govukTabs({
  items: [
    {
      label: 'Past day',
      id: 'past-day',
      panel: {
        html: '<h2 class="govuk-heading-l">Past day</h2>'
      }
    },
    {
      label: 'Past week',
      id: 'past-week',
      panel: {
        html: '<h2 class="govuk-heading-l">Past week</h2>'
      }
    },
    {
      label: 'Past month',
      id: 'past-month',
      panel: {
        html: '<h2 class="govuk-heading-l">Past month</h2>'
      }
    },
    {
      label: 'Past year',
      id: 'past-year',
      panel: {
        text: 'There is no data for this year yet, check back later'
      }
    }
  ]
})
```

Find out when to use the Tabs component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/tabs/)

## Tabs options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | This is used for the main component and to compose the ID attribute for each item. |
| idPrefix | string | Optional prefix. This is used to prefix the `id` attribute for each tab item and panel, separated by `-`. |
| title | string | Title for the tabs table of contents. |
| items | array | The individual tabs within the tabs component. |
| classes | string | Classes to add to the tabs component. |
| attributes | object | HTML attributes (for example data attributes) to add to the tabs component. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Specific ID attribute for the tab item. If omitted, then `idPrefix` string is required instead. |
| label | string | The text label of a tab item. See [label](../label/README.md#label-options). |
| attributes | object | HTML attributes (for example data attributes) to add to the tab. |
| panel | object | The contents of each tab within the tabs component. This is referenced as a panel. |


### Options for `panel` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within each tab panel. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within each tab panel. If `html` is provided, the `text` option will be ignored. |
| attributes | object | HTML attributes (for example data attributes) to add to the tab panel. |
