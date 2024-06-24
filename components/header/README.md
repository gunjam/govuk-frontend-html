# Header

The GOV.UK header shows users that they are on GOV.UK and which service they are using.

## Usage

```javascript
import { govukHeader } from 'govuk-frontend-html'

const html = govukHeader({
  homepageUrl: 'https://gov.uk',
  serviceName: 'Service name',
  serviceUrl: '/'
})
```

Find out when to use the Header component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/header/)

## Header options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| homepageUrl | string | The URL of the homepage. Defaults to `"/"`. |
| productName | string | Product name, used when the product name follows on directly from ‘GOV.UK’. For example, GOV.UK Pay or GOV.UK Design System. In most circumstances, you should use `serviceName`. |
| serviceName | string | The name of your service, included in the header. |
| serviceUrl | string | URL for the service name anchor. |
| navigation | array | Can be used to add navigation to the header component. |
| navigationClasses | string | Classes for the navigation section of the header. |
| navigationLabel | string | Text for the `aria-label` attribute of the navigation. Defaults to the same value as `menuButtonText`. |
| menuButtonLabel | string | Text for the `aria-label` attribute of the button that opens the mobile navigation, if there is a mobile navigation menu. |
| menuButtonText | string | Text of the button that opens the mobile navigation menu, if there is a mobile navigation menu. There is no enforced character limit, but there is a limited display space so keep text as short as possible. By default, this is set to 'Menu'. |
| containerClasses | string | Classes for the container, useful if you want to make the header fixed width. |
| classes | string | Classes to add to the header container. |
| attributes | object | HTML attributes (for example data attributes) to add to the header container. |
| useTudorCrown | boolean | Deprecated. If `true`, uses the Tudor crown from King Charles III's royal cypher. Otherwise, uses the St. Edward's crown. Default is `true`. |


### Options for `navigation` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text for the navigation item. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML for the navigation item. If `html` is provided, the `text` option will be ignored. |
| href | string | URL of the navigation item anchor. |
| active | boolean | Flag to mark the navigation item as active or not. |
| attributes | object | HTML attributes (for example data attributes) to add to the navigation item anchor. |
