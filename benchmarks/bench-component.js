import { join } from 'node:path'
import { styleText } from 'node:util'
import { bench, compact, run, summary } from 'mitata'
import { print } from 'mitata/src/lib.mjs'
import nunjucks from 'nunjucks'
import { toCamelCase } from '../utils/text.js'

export default async function benchmark({ component, tests }) {
  const govukPath = join(import.meta.dirname, '../node_modules/govuk-frontend/dist')
  const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(govukPath))
  const { default: func } = await import(`../components/${component}/${component}.js`)
  const componentName = toCamelCase(`govuk-${component}`)
  const template = nunjucks.compile(
    `{% from "govuk/components/${component}/macro.njk" import ${componentName} %}
    {{ ${componentName}(params) }}`,
    nunjucksEnv
  )

  print(`\n${styleText('blue', componentName)}${styleText('cyan', '()')}\n`)

  compact(() => {
    const testArgs = { test: Object.keys(tests), params: Object.values(tests) }

    summary(() => {
      bench('ghtml - $test', function* (state) {
        const params = state.get('params')
        yield () => func(params)
      }).args(testArgs)

      bench('nunjucks - $test', function* (state) {
        const params = state.get('params')
        yield () => template.render({ params })
      }).args(testArgs)
    })
  })

  await run()
}
