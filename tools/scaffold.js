import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { styleText } from 'node:util'

const GOVUK_COMPONENTS_PATH = join(
  import.meta.dirname,
  '../node_modules/govuk-frontend/dist/govuk/components/'
)

/**
 * Capitalise first character
 * @param {string} str
 * @returns {string}
 */
function capitalise(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

/**
 * Convert kebab case to camel case
 * @param {string} str
 * @returns {string}
 */
function toCamelCase(str) {
  return str.split('-').reduce((a, b) => `${a}${capitalise(b)}`)
}

/**
 * Convert kebab case to spaced sentence, capitalisied first char
 * @param {string} str
 * @returns {string}
 */
function toSpaced(str) {
  return capitalise(str)
    .split('-')
    .reduce((a, b) => `${a} ${b}`)
}

/**
 * Convert govuk test fixture example to `@example` block
 * @param {string} functionName - name of function, eg: `'govukButton'`
 * @param {object} options - `fixtures.fixtures[].options`
 * @returns {string}
 */
function getExample(functionName, options) {
  let example = ` * @example
 * \`\`\`javascript
 * ${functionName}({\n`

  const json = JSON.stringify(options, null, '  ')

  for (const line of json.split('\n').slice(1, -1)) {
    example += ` * ${line}\n`
  }

  example = example.replaceAll(/"([^"]+)":/g, '$1:').replaceAll(/"/g, `'`)

  return `${example} * })\n * \`\`\``
}

/**
 * Generate jsDoc typeDefs from govuk component macro-options JSON
 * @param {string} type - name of component options type, eg: `'buttonConfig'`
 * @param {Array} options - component macro options JSON from govuk-frontend
 * @param {string} [defs=''] - for recursion, don't use
 * @returns {string} jsDoc typeDefs string
 */
function getTypeDefs(type, options, defs = '') {
  const lead = `/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.\n`

  let def = defs.length === 0 ? lead : '/**\n'
  def += ` * @typedef {Object} ${type}\n`

  for (const option of options) {
    // We don't support nunjucks specific features
    if (option.name === 'caller' || option.type.startsWith('nunjucks')) {
      continue
    }

    let type = option.type

    // Standard type for attribtues object passed to govukAttributes()
    if (option.name === 'attributes') {
      type = '{ [attribute: string]: string | { value: string, optional?: boolean } } | string'
    }

    // If the option has params it's a complex type, eg: object/array
    if (option.params) {
      const name = toCamelCase(`${option.name}-config`)
      const subDef = getTypeDefs(name, option.params, def)
      def = `${subDef}\n\n${def}`
      type = option.type === 'array' ? `Array.<${name}>` : name
    }

    def += ` * @property {${type}} `
    def += option.required ? option.name : `[${option.name}]`
    def += ` - ${option.description}\n`
  }

  def += ' */'

  return def
}

/**
 * Load component JSON from govuk-frontent
 * @param {string} component - component name, eg: `'button'`
 * @param {'fixtures'|'macro-options'} type - type of json
 * @returns {Promise.<Object>}
 */
async function getComponentJson(component, type) {
  const path = join(GOVUK_COMPONENTS_PATH, component, `${type}.json`)
  return JSON.parse(await readFile(path, { encoding: 'utf8' }))
}

/**
 * Get styled error message text
 * @param {string} msg - error message
 * @param {Array.<string>} list - list of correct items
 * @returns {string}
 */
function errorMsg(msg, list) {
  const errorTxt = styleText(['red', 'bold'], '[Error]')
  const listTxt = list.map((i) => styleText('yellow', `"${i}"`)).join('\n ')
  const msgTxt = styleText('bold', msg)
  return `${errorTxt} ${msgTxt} \n ${listTxt}\n`
}

/**
 * Get a list of all existing components in govuk-frontend
 * @returns {Promise.<Array.<string>>}
 */
async function getComponentList() {
  const files = await readdir(GOVUK_COMPONENTS_PATH, { withFileTypes: true })
  return files.filter((file) => file.isDirectory()).map((file) => file.name)
}

/**
 * Build a scaffolded JavaScript file with types and empty component function
 * @param {string} component - component name, eg: `'button'`
 * @param {string} [example='default'] - test example name, eg: `'default'`
 * @returns {Promise.<string>} scaffolded component JavaScript
 */
async function makeComponent(component, example = 'default') {
  const availableComponents = await getComponentList()

  // End process with error code if trying to generate code for a component
  // that does not exist in govuk-frontent
  if (!availableComponents.includes(component)) {
    const msg = errorMsg(`no component "${component}", must be one of:`, availableComponents)
    process.stderr.write(msg)
    process.exit(1)
  }

  // Load macro options and test fixtures JSON from govuk-frontend npm package
  const [options, fixtures] = await Promise.all([
    getComponentJson(component, 'macro-options'),
    getComponentJson(component, 'fixtures')
  ])

  // Test example component parameters used to generated `@example` jsDoc
  const foundExample = fixtures.fixtures.find((f) => f.name === example)

  // End process with error code if specifiy a test example that does not exist
  if (!foundExample) {
    const list = fixtures.fixtures.map((f) => f.name)
    const msg = errorMsg(`no example "${example}", must be one of:`, list)
    process.stderr.write(msg)
    process.exit(1)
  }

  const componentName = toSpaced(component)
  const functionName = toCamelCase(`govuk-${component}`)
  const configName = toCamelCase(`${component}-config`)

  return `import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * ${componentName} component
 * @param {${configName}} params - ${componentName} config options
 * @returns {string} ${componentName} HTML
 * @see {@link https://design-system.service.gov.uk/components/${component}/ GOV.UK Design System}
${getExample(functionName, foundExample.options)}
 */
export default function ${functionName}(params) {

}

${getTypeDefs(configName, options)}
`
}

/**
 * Generate scaffolded component javascript from the command line
 * @example
 * ```bash
 * node tools/scaffold.js button > components/button/button.js
 * ```
 */
async function run() {
  const js = await makeComponent(...process.argv.slice(2))
  process.stdout.write(js)
  process.exit(0)
}

run()
