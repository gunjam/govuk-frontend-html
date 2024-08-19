import { equal } from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import * as cheerio from 'cheerio'
import { computeAccessibleDescription, computeAccessibleName } from 'dom-accessibility-api'
import { JSDOM } from 'jsdom'

const { window } = new JSDOM(`<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html`)

const { document } = window

export { window, document }

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
  const html = component.default(config.context ?? config.fixture.options)
  return cheerio.load(html)
}

export async function renderHtml(name, config) {
  const component = await import(`../components/${name}/${name}.js`)
  return component.default(config.context ?? config.fixture.options)
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

export function hasAccessibleDescription($component, expectedAccessibleDescription) {
  const actualAccessibleDescription = computeAccessibleDescription($component)
  equal(actualAccessibleDescription, expectedAccessibleDescription)
}

export function hasAccessibleName($component, expectedAccessibleName) {
  const actualAccessibleName = computeAccessibleName($component)
  equal(actualAccessibleName, expectedAccessibleName)
}
