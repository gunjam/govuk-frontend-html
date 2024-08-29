# Service navigation

Service navigation helps users understand that they’re using your service and lets them navigate around your service.

## Usage

```javascript
import { govukServiceNavigation } from 'govuk-frontend-html'

const html = govukServiceNavigation({
  serviceName: 'Service name',
  serviceUrl: '#',
  navigation: [
    {
      href: '#',
      text: 'Navigation item 1'
    },
    {
      href: '#',
      text: 'Navigation item 2',
      active: true
    },
    {
      href: '#',
      text: 'Navigation item 3'
    }
  ]
})
```

Find out when to use the Service navigation component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/service-navigation/)

## Service navigation options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the service navigation container. |
| attributes | object | HTML attributes (for example, data attributes) to add to the service navigation container. |
| ariaLabel | string | The text for the `aria-label` which labels the service navigation container when a service name is included. Defaults to `"Service information"`. |
| menuButtonText | string | The text of the mobile navigation menu toggle. |
| menuButtonLabel | string | The screen reader label for the mobile navigation menu toggle. Defaults to the same value as `menuButtonText` if not specified. |
| navigationLabel | string | The screen reader label for the mobile navigation menu. Defaults to the same value as `menuButtonText` if not specified. |
| navigationId | string | The ID used to associate the mobile navigation toggle with the navigation menu. Defaults to `navigation`. |
| navigationClasses | string | Classes to add to the navigation menu container. |
| serviceName | string | The name of your service. |
| serviceUrl | string | The homepage of your service. |
| navigation | array | Used to add navigation to the service header. |
| slots | object | Specified points for injecting custom HTML into the service header. |


### Options for `navigation` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| current | boolean | If `true`, indicates that the user is currently on this page. This takes precedence over `active`. |
| active | boolean | If `true`, indicates that the user is within this group of pages in the navigation hierarchy. |
| html | string | HTML for the navigation item. If `html` is provided, the `text` option will be ignored. |
| text | string | Text for the navigation item. If `html` is provided, the `text` option will be ignored. |
| href | string | URL of the navigation item anchor. |
| attributes | object | HTML attributes (for example data attributes) to add to the navigation item anchor. |


### Options for `slots` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| start | string | HTML injected at the start of the service header container. |
| end | string | HTML injected at the end of the service header container. |
| navigationStart | string | HTML injected before the first list item in the navigation list. Requires `navigation` to be set. |
| navigationEnd | string | HTML injected after the last list item in the navigation list. Requires `navigation` to be set. |
