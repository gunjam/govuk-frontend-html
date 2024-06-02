import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import * as cheerio from 'cheerio'

export async function getExamples(component) {
  const path = join(
    import.meta.dirname,
    '../node_modules/govuk-frontend/dist/govuk/components/',
    component,
    'fixtures.json'
  )

  const { fixtures } = JSON.parse(await readFile(path, { encoding: 'utf8' }))

  const examples = {}

  for (const fixture of fixtures) {
    examples[fixture.name] = {
      context: fixture.options,
      fixture
    }
  }

  return examples
}

export async function render(name, config) {
  const component = await import(`../components/${name}/${name}.js`)
  const html = component.default(config.fixture.options)
  return cheerio.load(html)
}
