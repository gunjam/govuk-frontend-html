# Password input

Help users to create and enter passwords.

## Usage

```javascript
import { govukPasswordInput } from 'govuk-frontend-html'

const html = govukPasswordInput({
  label: {
    text: 'Password'
  },
  id: 'password-input',
  name: 'password'
})
```

Find out when to use the Password input component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/password-input/)

## Password input options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | The ID of the input. |
| name | string | The name of the input, which is submitted with the form data. |
| value | string | Optional initial value of the input. |
| disabled | boolean | If `true`, input will be disabled. |
| describedBy | string | One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. |
| label | object | The label used by the text input component. See [label](../label/README.md#label-options). |
| hint | object | Can be used to add a hint to a text input component. See [hint](../hint/README.md#hint-options). |
| errorMessage | object | Can be used to add an error message to the text input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. |
| formGroup | object | Additional options for the form group containing the text input component. |
| classes | string | Classes to add to the input. |
| autocomplete | string | Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html). See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of values that can be used. Default is `"current-password"`. |
| attributes | object | HTML attributes (for example data attributes) to add to the input. |
| showPasswordText | string | Button text when the password is hidden. Defaults to `"Show"`. |
| hidePasswordText | string | Button text when the password is visible. Defaults to `"Hide"`. |
| showPasswordAriaLabelText | string | Button text exposed to assistive technologies, like screen readers, when the password is hidden. Defaults to `"Show password"`. |
| hidePasswordAriaLabelText | string | Button text exposed to assistive technologies, like screen readers, when the password is visible. Defaults to `"Hide password"`. |
| passwordShownAnnouncementText | string | Announcement made to screen reader users when their password has become visible in plain text. Defaults to `"Your password is visible"`. |
| passwordHiddenAnnouncementText | string | Announcement made to screen reader users when their password has been obscured and is not visible. Defaults to `"Your password is hidden"`. |
| button | object | Optional object allowing customisation of the toggle button. |


### Options for `formGroup` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the form group (for example to show error state for the whole group). |
| attributes | object | HTML attributes (for example data attributes) to add to the form group. |
| beforeInput | object | Content to add before the input used by the text input component. |
| afterInput | object | Content to add after the input used by the text input component. |


### Options for `beforeInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add before the input. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add before the input. If `html` is provided, the `text` option will be ignored. |


### Options for `afterInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add after the input. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add after the input. If `html` is provided, the `text` option will be ignored. |


### Options for `button` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the button. |
