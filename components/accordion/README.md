# Accordion

The accordion component lets users show and hide sections of related content on a page.

## Usage

```javascript
import { govukAccordion } from 'govuk-frontend-html'

const html = govukAccordion({
  id: 'accordion-default',
  items: [
    {
      heading: {
        text: 'Writing well for the web'
      },
      content: {
        html: '<p class="govuk-body">This is the content for Writing well for the web.</p>'
      }
    },
    {
      heading: {
        text: 'Writing well for specialists'
      },
      content: {
        html: '<p class="govuk-body">This is the content for Writing well for specialists.</p>'
      }
    },
    {
      heading: {
        text: 'Know your audience'
      },
      content: {
        html: '<p class="govuk-body">This is the content for Know your audience.</p>'
      }
    },
    {
      heading: {
        text: 'How people read'
      },
      content: {
        html: '<p class="govuk-body">This is the content for How people read.</p>'
      }
    }
  ]
})
```

Find out when to use the Accordion component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/accordion/)

## Accordion options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Must be unique across the domain of your service if `rememberExpanded` is `true` (as the expanded state of individual instances of the component persists across page loads using [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)). Used as an `id` in the HTML for the accordion as a whole, and also as a prefix for the `id`s of the section contents and the buttons that open them, so that those `id`s can be the target of `aria-control` attributes. |
| headingLevel | integer | Heading level, from `1` to `6`. Default is `2`. |
| classes | string | Classes to add to the accordion. |
| attributes | object | HTML attributes (for example data attributes) to add to the accordion. |
| rememberExpanded | boolean | Whether the expanded/collapsed state of the accordion should be saved when a user leaves the page and restored when they return. Default is `true`. |
| hideAllSectionsText | string | The text content of the 'Hide all sections' button at the top of the accordion when all sections are expanded. |
| hideSectionText | string | The text content of the 'Hide' button within each section of the accordion, which is visible when the section is expanded. |
| hideSectionAriaLabelText | string | Text made available to assistive technologies, like screen-readers, as the final part of the toggle's accessible name when the section is expanded. Defaults to `"Hide this section"`. |
| showAllSectionsText | string | The text content of the 'Show all sections' button at the top of the accordion when at least one section is collapsed. |
| showSectionText | string | The text content of the 'Show' button within each section of the accordion, which is visible when the section is collapsed. |
| showSectionAriaLabelText | string | Text made available to assistive technologies, like screen-readers, as the final part of the toggle's accessible name when the section is collapsed. Defaults to `"Show this section"`. |
| items | array | The sections within the accordion. |


### Options for `items` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| heading | object | The heading of each accordion section. |
| summary | object | The summary line of each accordion section. |
| content | object | The content of each accordion section. |
| expanded | boolean | Sets whether the section should be expanded when the page loads for the first time. Defaults to `false`. |


### Options for `heading` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. The heading text of each section. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. The heading HTML content of each section. The header is inside the HTML `<button>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. If `html` is provided, the `text` option will be ignored. |


### Options for `summary` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | The summary line text content of each section. If `html` is provided, the `text` option will be ignored. |
| html | string | The summary line HTML content of each section. The summary line is inside the HTML `<button>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. If `html` is provided, the `text` option will be ignored. |


### Options for `content` object

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | If `html` is set, this is not required. The text content of each section, which is hidden when the section is closed. If `html` is provided, the `text` option will be ignored. |
| html | string | If `text` is set, this is not required. The HTML content of each section, which is hidden when the section is closed. If `html` is provided, the `text` option will be ignored. |
