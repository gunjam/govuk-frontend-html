# Exit this page

Give users a way to quickly and safely exit a service, website or application.

For service journeys, you must use this component with the pattern to help a user [Exit a page quickly](https://design-system.service.gov.uk/patterns/exit-a-page-quickly/).

## Usage

```javascript
import { govukExitThisPage } from 'govuk-frontend-html'

const html = govukExitThisPage({
  text: 'Exit this page',
  href: 'https://bbc.co.uk/weather/'
})
```

Find out when to use the Exit this page component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/exit-this-page/)

## Exit this page options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | Text for the link. If `html` is provided, the `text` option will be ignored. Defaults to `"Emergency Exit this page"` with 'Emergency' visually hidden. |
| html | string | HTML for the link. If `html` is provided, the `text` option will be ignored. Defaults to `"Emergency Exit this page"` with 'Emergency' visually hidden. |
| redirectUrl | string | URL to redirect the current tab to. Defaults to `"https://www.bbc.co.uk/weather"`. |
| id | string | ID attribute to add to the exit this page container. |
| classes | string | Classes to add to the exit this page container. |
| attributes | object | HTML attributes (for example data attributes) to add to the exit this page container. |
| activatedText | string | Text announced by screen readers when Exit this Page has been activated via the keyboard shortcut. Defaults to `"Loading."`. |
| timedOutText | string | Text announced by screen readers when the keyboard shortcut has timed out without successful activation. Defaults to `"Exit this page expired."`. |
| pressTwoMoreTimesText | string | Text announced by screen readers when the user must press <kbd>Shift</kbd> two more times to activate the button. Defaults to `"Shift, press 2 more times to exit."`. |
| pressOneMoreTimeText | string | Text announced by screen readers when the user must press <kbd>Shift</kbd> one more time to activate the button. Defaults to `"Shift, press 1 more time to exit."`. |
