# File upload

Help users select and upload a file.

You should only ask users to upload something if it’s critical to the delivery of your service.

## Usage

```javascript
import { govukFileUpload } from 'govuk-frontend-html'

const html = govukFileUpload({
  id: 'file-upload-1',
  name: 'file-upload-1',
  label: {
    text: 'Upload a file'
  }
})
```

Find out when to use the File upload component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/file-upload/)

## File upload options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | string | The name of the input, which is submitted with the form data. |
| id | string | The ID of the input. |
| value | string | Optional initial value of the input. |
| disabled | boolean | If `true`, file input will be disabled. |
| describedBy | string | One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. |
| label | object | The label used by the file upload component. See [label](../component/label/README.md#label-options). |
| hint | object | Can be used to add a hint to the file upload component. See [hint](../component/hint/README.md#hint-options). |
| errorMessage | object | Can be used to add an error message to the file upload component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. |
| formGroup | object | Additional options for the form group containing the file upload component. |
| classes | string | Classes to add to the file upload component. |
| attributes | object | HTML attributes (for example data attributes) to add to the file upload component. |


### Options for `formGroup` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | string | Classes to add to the form group (for example to show error state for the whole group). |
| attributes | object | HTML attributes (for example data attributes) to add to the form group. |
| beforeInput | object | Content to add before the input used by the file upload component. |
| afterInput | object | Content to add after the input used by the file upload component. |


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
