# Phase banner

Use the phase banner component to show users your service is still being worked on.

Services hosted on a service.gov.uk domain must use the phase banner until they pass a live assessment.

## Usage

```javascript
import { govukPhaseBanner } from 'govuk-frontend-html'

const html = govukPhaseBanner({
  tag: {
    text: 'Alpha'
  },
  html: 'This is a new service - your <a href="#" class="govuk-link">feedback</a> will help us to improve it.'
})
```

Find out when to use the Phase banner component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/phase-banner/)

## Phase banner options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. Text to use within the phase banner. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. HTML to use within the phase banner. If `html` is provided, the `text` option will be ignored. |
| tag | object | The tag used by the phase banner component. See [tag](../component/tag/README.md#tag-options). |
| classes | string | Classes to add to the phase banner container. |
| attributes | object | HTML attributes (for example data attributes) to add to the phase banner container. |
