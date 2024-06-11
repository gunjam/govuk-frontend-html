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

/**
 * Get the raw HTML representation of a component, and remove any other
 * child elements that do not match the component.
 * Relies on B.E.M naming ensuring that child components relating to a component
 * are namespaced.
 *
 * @param {import('cheerio').CheerioAPI} $ - requires an instance of cheerio (jQuery) that includes the
 *   rendered component.
 * @param {string} className - the top level class 'Block' in B.E.M terminology
 * @returns {string} returns HTML
 */
export function htmlWithClassName($, className) {
  const $component = $(className)
  const classSelector = className.replace('.', '')
  // Remove all other elements that do not match this component
  $component.find(`[class]:not([class^=${classSelector}])`).remove()
  return $.html($component)
}
