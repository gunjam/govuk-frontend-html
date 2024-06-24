# Character count

Help users know how much text they can enter when there is a limit on the number of characters.

## Usage

```javascript
import { govukCharacterCount } from 'govuk-frontend-html'

const html = govukCharacterCount({
  name: 'moreDetail',
  id: 'more-detail',
  maxlength: 200,
  label: {
    text: 'Can you provide more detail?',
    classes: 'govuk-label--l',
    isPageHeading: true
  },
  hint: {
    text: 'Do not include personal or financial information like your National Insurance number or credit card details.'
  }
})
```

Find out when to use the Character count component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/character-count/)

## Character count options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | The ID of the textarea. |
| name | string | The name of the textarea, which is submitted with the form data. |
| rows | string | Optional number of textarea rows (default is 5 rows). |
| value | string | Optional initial value of the textarea. |
| maxlength | string | If `maxwords` is set, this is not required. The maximum number of characters. If `maxwords` is provided, the `maxlength` option will be ignored. |
| maxwords | string | If `maxlength` is set, this is not required. The maximum number of words. If `maxwords` is provided, the `maxlength` option will be ignored. |
| threshold | string | The percentage value of the limit at which point the count message is displayed. If this attribute is set, the count message will be hidden by default. |
| label | object | The label used by the character count component. See [label](../label/README.md#label-options). |
| hint | object | Can be used to add a hint to the character count component. See [hint](../hint/README.md#hint-options). |
| errorMessage | object | Can be used to add an error message to the character count component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. |
| formGroup | object | Additional options for the form group containing the character count component. |
| classes | string | Classes to add to the textarea. |
| attributes | object | HTML attributes (for example data attributes) to add to the textarea. |
| spellcheck | boolean | Optional field to enable or disable the `spellcheck` attribute on the character count. |
| countMessage | object | Additional options for the count message used by the character count component. |
| textareaDescriptionText | string | Message made available to assistive technologies to describe that the component accepts only a limited amount of content. It is visible on the page when JavaScript is unavailable. The component will replace the `%{count}` placeholder with the value of the `maxlength` or `maxwords` parameter. |
| charactersUnderLimitText | object | Message displayed when the number of characters is under the configured maximum, `maxlength`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of remaining characters. This is a [pluralised list of messages](https://frontend.design-system.service.gov.uk/localise-govuk-frontend). |
| charactersAtLimitText | string | Message displayed when the number of characters reaches the configured maximum, `maxlength`. This message is displayed visually and through assistive technologies. |
| charactersOverLimitText | object | Message displayed when the number of characters is over the configured maximum, `maxlength`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of characters above the maximum. This is a [pluralised list of messages](https://frontend.design-system.service.gov.uk/localise-govuk-frontend). |
| wordsUnderLimitText | object | Message displayed when the number of words is under the configured maximum, `maxwords`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of remaining words. This is a [pluralised list of messages](https://frontend.design-system.service.gov.uk/localise-govuk-frontend). |
| wordsAtLimitText | string | Message displayed when the number of words reaches the configured maximum, `maxwords`. This message is displayed visually and through assistive technologies. |
| wordsOverLimitText | object | Message displayed when the number of words is over the configured maximum, `maxwords`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of characters above the maximum. This is a [pluralised list of messages](https://frontend.design-system.service.gov.uk/localise-govuk-frontend). |


### Options for `formGroup` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the form group (for example to show error state for the whole group). |
| attributes | object | HTML attributes (for example data attributes) to add to the form group. |
| beforeInput | object | Content to add before the textarea used by the character count component. |
| afterInput | object | Content to add after the textarea used by the character count component. |


### Options for `beforeInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add before the textarea. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add before the textarea. If `html` is provided, the `text` option will be ignored. |


### Options for `afterInput` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text to add after the textarea. If `html` is provided, the `text` option will be ignored. |
| html | string | HTML to add after the textarea. If `html` is provided, the `text` option will be ignored. |


### Options for `countMessage` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the count message. |
