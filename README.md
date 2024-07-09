# govuk-frontend-html

[![Coverage Status](https://coveralls.io/repos/github/gunjam/govuk-frontend-html/badge.svg?branch=main)](https://coveralls.io/github/gunjam/govuk-frontend-html?branch=main)

`govuk-frontend-html` is a port of [govuk-frontend](https://github.com/alphagov/govuk-frontend) from nunjucks to plain JS functions, with the intention of providing a higher performance and more portable implementation which can be used anywhere within node.js and in any templating language that can execute a native JS function.

All of the [GOV.UK Design system](https://design-system.service.gov.uk/) components have been implemented with a govuk-frontend compatible API, where each function takes the same object parameters as their nunjucks counterpart.

> [!IMPORTANT]
> `govuk-frontend-html` does not include client side JS or styles, so you will also need to install govuk-frontend.

## Installation

```
npm install govuk-frontend-html
```

## Usage

All GOV.UK Design System components are importable and can be called with and options object to receive an HTML string:

```javascript
import { govukButton } from 'govuk-frontend-html'

const buttonHtml = govukButton({
  text: 'Start now',
  isStartButton: true
})

console.log(buttonHtml)
// <button type="submit" class="govuk-button govuk-button--start" data-module="govuk-button">
//   Start now
//   <svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
//     <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"/>
//   </svg>
// </button>
```

Example of a simple [fastify](https://fastify.dev/) server using [fastify-html](https://github.com/mcollina/fastify-html):

```javascript
import { join } from 'node:path'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import fastifyHtml from 'fastify-html'
import { govukButton, govukTemplate } from 'govuk-frontend-html'

const app = fastify({ logger: true })

app.register(fastifyStatic, {
  root: join(import.meta.dirname, './node_modules/govuk-frontend/dist/govuk/')
})

await app.register(fastifyHtml)

app.addLayout((inner, reply) =>
  govukTemplate({
    assetPath: '/assets',
    headHtml: '<link href="/govuk-frontend.min.css" rel="stylesheet">',
    contentHtml: inner,
    bodyEndHtml: `<script type="module" src="/govuk-frontend.min.js"></script>
  <script type="module">
  import { initAll } from '/govuk-frontend.min.js'
  initAll()
  </script>`
  })
)

app.get('/', async (req, reply) => {
  const startButton = govukButton({
    classes: 'govuk-!-margin-top-2 govuk-!-margin-bottom-8',
    text: 'Start now',
    isStartButton: true
  })

  return reply.html`
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">Apply online for a UK passport</h1>
        <p class="govuk-body">You can apply for, renew, replace or update your passport and pay for it online.</p>
        !${startButton}
      </div>
    </div>
  `
})

await app.listen({ port: 3_000 })
```

### Components

* [Accordion](./components/accordion/README.md)
* [Back link](./components/back-link/README.md)
* [Breadcrumbs](./components/breadcrumbs/README.md)
* [Button](./components/button/README.md)
* [Character count](./components/character-count/README.md)
* [Checkboxes](./components/checkboxes/README.md)
* [Cookie banner](./components/cookie-banner/README.md)
* [Date input](./components/date-input/README.md)
* [Details](./components/details/README.md)
* [Error message](./components/error-message/README.md)
* [Error summary](./components/error-summary/README.md)
* [Exit this page](./components/exit-this-page/README.md)
* [Fieldset](./components/fieldset/README.md)
* [File upload](./components/file-upload/README.md)
* [Footer](./components/footer/README.md)
* [Header](./components/header/README.md)
* [Hint](./components/hint/README.md)
* [Input](./components/input/README.md)
* [Inset text](./components/inset-text/README.md)
* [Label](./components/label/README.md)
* [Notification banner](./components/notification-banner/README.md)
* [Pagination](./components/pagination/README.md)
* [Panel](./components/panel/README.md)
* [Password input](./components/password-input/README.md)
* [Phase banner](./components/phase-banner/README.md)
* [Radios](./components/radios/README.md)
* [Select](./components/select/README.md)
* [Skip link](./components/skip-link/README.md)
* [Summary list](./components/summary-list/README.md)
* [Table](./components/table/README.md)
* [Tabs](./components/tabs/README.md)
* [Tag](./components/tag/README.md)
* [Task list](./components/task-list/README.md)
* [Textarea](./components/textarea/README.md)
* [Warning text](./components/warning-text/README.md)

## Performance

The performance of each component is significantly faster than the govuk-frontend nunjucks alternatives, for example `govukButton()`:

```
cpu: Apple M1 Pro
runtime: node v22.3.0 (arm64-darwin)

benchmark            time (avg)             (min … max)       p75       p99      p999
------------------------------------------------------- -----------------------------
• govuk-frontend-html
------------------------------------------------------- -----------------------------
start now link      120 ns/iter       (106 ns … 471 ns)    128 ns    159 ns    249 ns
input             93.48 ns/iter     (81.46 ns … 219 ns)    102 ns    126 ns    161 ns
button              161 ns/iter       (142 ns … 348 ns)    170 ns    210 ns    341 ns
with attributes     249 ns/iter       (223 ns … 352 ns)    255 ns    292 ns    310 ns

• nunjucks
------------------------------------------------------- -----------------------------
start now link    5'505 ns/iter   (4'666 ns … 3'417 µs)  5'083 ns 10'042 ns    118 µs
input             5'051 ns/iter   (4'865 ns … 5'398 ns)  5'122 ns  5'327 ns  5'398 ns
button            5'323 ns/iter   (5'111 ns … 5'593 ns)  5'400 ns  5'574 ns  5'593 ns
with attributes   8'346 ns/iter   (8'059 ns … 8'826 ns)  8'460 ns  8'756 ns  8'826 ns
```
