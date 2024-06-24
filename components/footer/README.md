# Footer

The footer provides copyright, licensing and other information about your service.

## Usage

```javascript
import { govukFooter } from 'govuk-frontend-html'

const html = govukFooter({
  navigation: [
    {
      title: 'Coronavirus (COVID-19)',
      width: 'two-thirds',
      items: [
        {
          href: '/coronavirus',
          text: 'Coronavirus (COVID-19): guidance and support'
        }
      ]
    }
  ],
  meta: {
    items: [
      {
        href: '/help',
        text: 'Help'
      },
      {
        href: '/help/cookies',
        text: 'Cookies'
      }
    ],
    html: 'Built by the <a class="govuk-footer__link" href="#">Government Digital Service</a>'
  }
})
```

Find out when to use the Footer component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/footer/)

## Footer options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| meta | object | The meta section of the footer after any navigation, before the copyright and license information. |
| navigation | array | The navigation section of the footer before a section break and the copyright and license information. |
| contentLicence | object | The content licence information within the footer component. Defaults to Open Government Licence (OGL) v3 licence. |
| copyright | object | The copyright information in the footer component, this defaults to `"© Crown copyright"`. |
| containerClasses | string | Classes that can be added to the inner container, useful if you want to make the footer full width. |
| classes | string | Classes to add to the footer component container. |
| attributes | object | HTML attributes (for example data attributes) to add to the footer component container. |


### Options for `meta` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| visuallyHiddenTitle | string | Title for a meta item section. Defaults to `"Support links"`. |
| html | string | HTML to add to the meta section of the footer, which will appear below any links specified using meta `items`. |
| text | string | Text to add to the meta section of the footer, which will appear below any links specified using meta `items`. If meta `html` is specified, this option is ignored. |
| items | array | The meta `items` add content within a unordered list to the meta section of the footer component. These appear above any text or custom html in the meta section. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | List item text in the meta section of the footer. |
| href | string | List item link `href` attribute in the meta section of the footer. |
| attributes | object | HTML attributes (for example data attributes) to add to the anchor in the footer meta section. |


### Options for `navigation` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| title | string | Title for a section. |
| columns | integer | Amount of columns to display items in navigation section of the footer. |
| width | string | Width of each navigation section in the footer. You can pass any Design System grid width here – for example, `"one-third"`, `"two-thirds"` or `"one-half"`. Defaults to `"full"`. |
| items | array | The items within the navigation section of the footer component. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | List item text in the navigation section of the footer. |
| href | string | List item link `href` attribute in the navigation section of the footer. Both `text` and `href` attributes need to be present to create a link. |
| attributes | object | HTML attributes (for example data attributes) to add to the anchor in the footer navigation section. |


### Options for `contentLicence` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, the text for the Open Government Licence is used. |
| html | string | If `text` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, the text for the Open Government Licence is used. The content licence is inside a `<span>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. |


### Options for `copyright` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, `"© Crown copyright"` is used. |
| html | string | If `text` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, `"© Crown copyright"` is used. The copyright notice is inside an `<a>` element, so you can only use text formatting elements within it. |
