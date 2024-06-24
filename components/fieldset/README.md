# Fieldset

Use the fieldset component to group related form inputs.

## Usage

```javascript
import { govukFieldset } from 'govuk-frontend-html'

const html = govukFieldset({
  legend: {
    text: 'What is your address?'
  }
})
```



## Fieldset options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| describedBy | string | One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. |
| legend | object | The legend for the fieldset component. |
| classes | string | Classes to add to the fieldset container. |
| role | string | Optional ARIA role attribute. |
| attributes | object | HTML attributes (for example data attributes) to add to the fieldset container. |
| html | string | HTML to use/render within the fieldset element. |


### Options for `legend` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the legend. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the legend. If `html` is provided, the `text` option will be ignored. |
| classes | string | Classes to add to the legend. |
| isPageHeading | boolean | Whether the legend also acts as the heading for the page. |
