import { join } from 'node:path'
import { bench, group, run } from 'mitata'
import nunjucks from 'nunjucks'

export default async function benchmark({ component, tests }) {
  const govukPath = join(import.meta.dirname, '../node_modules/govuk-frontend/dist')
  const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(govukPath))
  const componentName = `govuk${component[0].toUpperCase()}${component.slice(1)}`
  const { default: func } = await import(`../components/${component}/${component}.js`)

  const template = nunjucks.compile(
    `{% from "govuk/components/${component}/macro.njk" import ${componentName} %}
    {{ ${componentName}(params) }}`,
    nunjucksEnv
  )

  group({ name: 'ghtml', summary: false }, () => {
    for (const [name, params] of Object.entries(tests)) {
      bench(`${componentName} - ${name}`, () => {
        func(params)
      })
    }
  })

  group({ name: 'nunjucks', summary: false }, () => {
    for (const [name, params] of Object.entries(tests)) {
      bench(`${componentName} - ${name}`, () => {
        template.render({ params })
      })
    }
  })

  await run()
}
