import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const COMPONENTS_PATH = join(import.meta.dirname, '../components')

const GOVUK_COMPONENTS_PATH = join(
  import.meta.dirname,
  '../node_modules/govuk-frontend/dist/govuk/components/'
)

const PACKAGE_JSON_PATH = join(import.meta.dirname, '../package.json')

/**
 * Get the version of the currently installed govuk-frontend package
 * @returns {Promise<string>} version
 */
export async function getFrontendVersion() {
  const file = await readFile(PACKAGE_JSON_PATH, { encoding: 'utf8' })
  const installedVersion = JSON.parse(file).devDependencies['govuk-frontend']
  return `v${installedVersion}`
}

/**
 * Get component description and example options used in the project
 * @param {string} component - component name, eg: `'button'`
 * @returns {Promise.<Object>}
 */
export async function getComponentMeta(component) {
  const path = join(COMPONENTS_PATH, component, 'meta.json')
  return JSON.parse(await readFile(path, { encoding: 'utf8' }))
}

/**
 * Load macro options JSON from govuk-frontend
 * @param {string} component - component name, eg: `'button'`
 * @returns {Promise.<Array.<macroOptions>>}
 */
export async function getComponentOptions(component) {
  const path = join(GOVUK_COMPONENTS_PATH, component, 'macro-options.json')
  return JSON.parse(await readFile(path, { encoding: 'utf8' }))
}

/**
 * Load test fixtures JSON from govuk-frontend
 * @param {string} component - component name, eg: `'button'`
 * @returns {Promise.<Object>}
 */
export async function getComponentFixtures(component) {
  const path = join(GOVUK_COMPONENTS_PATH, component, 'fixtures.json')
  return JSON.parse(await readFile(path, { encoding: 'utf8' })).fixtures
}

/**
 * Get a list of all existing components in govuk-frontend
 * @returns {Promise.<Array.<string>>}
 */
export async function getComponentList() {
  const files = await readdir(GOVUK_COMPONENTS_PATH, { withFileTypes: true })
  return files.filter((file) => file.isDirectory()).map((file) => file.name)
}

/**
 * @typedef {Object} macroOptions
 * @property {string} name - The name of the parameter
 * @property {string} type - The type of the parameter
 * @property {boolean} required - Whether the paramter is required
 * @property {string} description - A description of what the parameter does
 * @property {Array.<macroOptions>} [params] - If type is object, the properties of that param
 */
