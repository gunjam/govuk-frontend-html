# Button

Use the button component to help users carry out an action like starting an application or saving their information.

## Usage

```javascript
import { govukButton } from 'govuk-frontend-html'

const html = govukButton({
  text: 'Save and continue'
})
```

Find out when to use the Button component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/button/)

## Button options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| element | string | HTML element for the button component – `input`, `button` or `a`. In most cases you will not need to set this as it will be configured automatically if `href` is provided. This parameter will be removed in the next major version. |
| text | string | If `html` is set, this is not required. Text for the `input`, `button` or `a` element. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `"button"` unless `href` is also set, or it has already been defined. |
| html | string | If `text` is set, this is not required. HTML for the `button` or `a` element only. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `"button"` unless `href` is also set, or it has already been defined. This option has no effect if `element` is set to `"input"`. |
| name | string | Name for the `input` or `button`. This has no effect on `a` elements. |
| type | string | Type for the `input` or `button` element – `"button"`, `"submit"` or `"reset"`. Defaults to `"submit"`. This has no effect on `a` elements. |
| value | string | Value for the `button` element only. This has no effect on `a` or `input` elements. |
| disabled | boolean | Whether the button component should be disabled. For `input` and `button` elements, `disabled` and `aria-disabled` attributes will be set automatically. This has no effect on `a` elements. |
| href | string | The URL that the button component should link to. If this is set, `element` will be automatically set to `"a"` if it has not already been defined. |
| classes | string | Classes to add to the button component. |
| attributes | object | HTML attributes (for example data attributes) to add to the button component. |
| preventDoubleClick | boolean | Prevent accidental double clicks on submit buttons from submitting forms multiple times. |
| isStartButton | boolean | Use for the main call to action on your service's start page. |
| id | string | The ID of the button. |
