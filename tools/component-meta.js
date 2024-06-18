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
 * Load component JSON from govuk-frontent
 * @param {string} component - component name, eg: `'button'`
 * @param {'fixtures'|'macro-options'} type - type of json
 * @returns {Promise.<Object>}
 */
export async function getComponentMeta(component) {
  const path = join(COMPONENTS_PATH, component, 'meta.json')
  return JSON.parse(await readFile(path, { encoding: 'utf8' }))
}

/**
 * Load component JSON from govuk-frontent
 * @param {string} component - component name, eg: `'button'`
 * @param {'fixtures'|'macro-options'} type - type of json
 * @returns {Promise.<Object>}
 */
export async function getComponentOptions(component, type) {
  const path = join(GOVUK_COMPONENTS_PATH, component, 'macro-options.json')
  return JSON.parse(await readFile(path, { encoding: 'utf8' }))
}

/**
 * Load component JSON from govuk-frontent
 * @param {string} component - component name, eg: `'button'`
 * @param {'fixtures'|'macro-options'} type - type of json
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
