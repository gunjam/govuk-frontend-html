import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { parseArgs, styleText } from 'node:util'
import { toCamelCase, toSpaced } from '../utils/text.js'

const PACKAGE_JSON_PATH = join(import.meta.dirname, '../package.json')

const GOVUK_COMPONENTS_PATH = join(
  import.meta.dirname,
  '../node_modules/govuk-frontend/dist/govuk/components/'
)

/**
 * Get the version of the currently installed govuk-frontend package
 * @returns {Promise<string>} version
 */
async function getFrontendVersion() {
  const file = await readFile(PACKAGE_JSON_PATH, { encoding: 'utf8' })
  const installedVersion = JSON.parse(file).devDependencies['govuk-frontend']
  return `v${installedVersion}`
}

/**
 * Remove any `it()` test blocks that contain `callBlock:`, we don't support it
 * @param {string} test - test javascript file as a string
 * @returns {string} test with removed caller tests
 */
function sliceOutCallerTest(test) {
  const index = test.indexOf('callBlock:')
  let without = test

  if (index > -1) {
    const itIndex = test.slice(0, index).lastIndexOf('it(')
    const untilIt = test.slice(0, itIndex)

    const [, indentation] = untilIt.match(/( +)$/)
    const closing = `\n${indentation}})`

    const endIndex = test.slice(index).indexOf(closing) + index + closing.length + 1
    without = test.slice(0, itIndex - indentation.length - 1) + test.slice(endIndex)

    return sliceOutCallerTest(without)
  }

  return without
}

/**
 * Convert govuk component test file from test to node test runner/assert
 * @param {string} testJs - test javascript file as a string
 * @returns {string} converted js
 */
function convertTest(testJs) {
  const converted = sliceOutCallerTest(testJs)
    .replaceAll('beforeAll', 'before')
    .replaceAll('before(() => {', 'before(async () => {')
    .replaceAll('= render(', '= await render(')
    .replaceAll(
      /( *)describe\.each\(\[([^)]+)]\)\('\$message', \({ exampleName \}\) => \{([\S\s]+)^ {2}\}\)\n\n/gm,
      (_, p1, p2, p3) => {
        const indented = p3
          .split('\n')
          .join(`\n${p1}`)
          .replaceAll(/\n +\n/g, '\n\n')
        return `${p1}for (const { message, exampleName } of [${p2}]) {\n${p1}  describe(message, () => {${indented}${p1}})\n${p1}}\n\n`
      }
    )
    .replaceAll(/it\(([^S^s]*.+[^S^s]*), \(\) => \{/g, 'it($1, async () => {')
    .replaceAll(/expect\((\n*\s*.*\n*\s*)\)\.toContain\(([^)]+)\)/g, 'ok($1.includes($2))')
    .replaceAll(/expect\((\n*\s*.*\n*\s*)\)\.toBeUndefined\(\)/g, 'equal($1, undefined)')
    .replaceAll(/expect\((\n*\s*.*\n*\s*)\)\.toBeTruthy\(\)/g, 'ok($1)')
    .replaceAll(/expect\((\n*\s*.*\n*\s*)\)\.toBeFalsy\(\)/g, 'equal($1, undefined)')
    .replaceAll(/expect\((\n*\s*.*\n*\s*)\)\.toBe\(([^)]+)\)/g, 'equal($1, $2)')
    .replaceAll(/expect\((\n*\s*.*\n*\s*)\)\.toHaveLength\((\d+)\)/g, 'equal($1.length, $2)')
    .replaceAll(/expect\((\n*\s*.*\n*\s*)\)\.toEqual\(\[/g, 'deepEqual($1, [')
    .replaceAll(
      /expect\((\n*\s*.*\n*\s*)\)\.toMatch\(\n*\s*('[^)]+')\n*\s*\)/g,
      'ok($1.includes($2))'
    )
    .replaceAll(/expect\((\n*\s*.*\n*\s*)\)\.toMatch\(([^)]+)\)/g, 'match($1, $2)')
    .replaceAll(
      /expect\((\n*\s*.*\n*\s*)\)\.not\.toContain\(([^)]+)\)/g,
      'equal($1.includes($2), false)'
    )

  const assertions = []
  const helpers = ['getExamples', 'render']

  if (/deepEqual\(/.test(converted)) {
    assertions.push('deepEqual')
  }
  if (/equal\(/.test(converted)) {
    assertions.push('equal')
  }
  if (/match\(/.test(converted)) {
    assertions.push('match')
  }
  if (/ok\(/.test(converted)) {
    assertions.push('ok')
  }
  if (/htmlWithClassName/.test(converted)) {
    helpers.push('htmlWithClassName')
  }

  helpers.sort()

  const imports = `import { ${assertions.join(', ')} } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { ${helpers.join(', ')} } from '../../helper.js'`

  return converted
    .replace(`const { render } = require('@govuk-frontend/helpers/nunjucks')`, imports)
    .replace(`const { getExamples } = require('@govuk-frontend/lib/components')\n`, '')
    .replace(`const { htmlWithClassName } = require('@govuk-frontend/helpers/tests')\n`, '')
}

/**
 * GET the test for a component from GitHub (limited to the currently
 * installed version of govuk-frontend).
 * @param {string} component - the name of the component
 * @returns {Promise<string>} test js
 */
async function fetchTest(component) {
  const version = await getFrontendVersion()
  const url = `https://raw.githubusercontent.com/alphagov/govuk-frontend/${version}/packages/govuk-frontend/src/govuk/components/${component}/template.test.js`
  const res = await fetch(url)
  return res.text()
}

/**
 * Create a component test and write it to disk
 * @param {string} component - the name of the component
 */
async function createTest(component, dirPath) {
  const testJs = await fetchTest(component)
  const converted = convertTest(testJs)
  const filePath = join(dirPath, `${component}.test.js`)

  await mkdir(dirPath, { recursive: true })
  await writeFile(filePath, converted)
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
async function makeComponent(component, example, dirPath) {
  // Load macro options and test fixtures JSON from govuk-frontend npm package
  const [options, fixtures] = await Promise.all([
    getComponentJson(component, 'macro-options'),
    getComponentJson(component, 'fixtures')
  ])

  // Get the test example parameters used to generated `@example` jsDoc
  const foundExample = fixtures.fixtures.find((f) => f.name === example)

  // End process with error code if the test example does not exist
  if (!foundExample) {
    const list = fixtures.fixtures.map((f) => f.name)
    const msg = errorMsg(`no example "${example}", must be one of:`, list)
    process.stderr.write(msg)
    process.exit(1)
  }

  const filePath = join(dirPath, `${component}.js`)

  let componentJs = ''

  // Attempt to load any existing component JS file
  try {
    componentJs = await readFile(filePath, { encoding: 'utf8' })
  } catch (err) {
    await mkdir(dirPath, { recursive: true })
  }

  const componentName = toSpaced(component)
  const functionName = toCamelCase(`govuk-${component}`)
  const configName = toCamelCase(`${component}-config`)

  // jsDoc for component function
  const functionDoc = `/**
 * ${componentName} component
 * @param {${configName}} params - ${componentName} config options
 * @returns {string} ${componentName} HTML
 * @see {@link https://design-system.service.gov.uk/components/${component}/ GOV.UK Design System}
${getExample(functionName, foundExample.options)}
 */`

  // jsDoc for component input config
  const configTypes = getTypeDefs(configName, options)

  // Component file already exists, so just update its types
  if (componentJs) {
    componentJs = componentJs
      .replace(/\/\*\*\n( \* .+\n)+ \*\/\nexport default/, `${functionDoc}\nexport default`)
      .replace(/(\/\*\*\n( \*.*\n)+ \*\/\n+)+$/, `${configTypes}\n`)
  } else {
    componentJs += `import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

${functionDoc}
export default function ${functionName}(params) {

}

${configTypes}
`
  }

  await writeFile(filePath, componentJs)
}

async function run() {
  // Parse out the CLI args
  const { values, positionals } = parseArgs({
    args: process.argv,
    allowPositionals: true,
    options: {
      'test-path': {
        type: 'string',
        default: join(import.meta.dirname, '../test/components')
      },
      'component-path': {
        type: 'string',
        default: join(import.meta.dirname, '../components')
      }
    }
  })

  // 0, 1 indexed items will be node and the filename
  const [component, example = 'default'] = positionals.slice(2)
  const testPath = join(values['test-path'], component)
  const componentPath = join(values['component-path'], component)

  // Fetch complete list of available govuk-frontend components
  const availableComponents = await getComponentList()

  // End process with error code if trying to generate code for a component
  // that does not exist in govuk-frontend
  if (!availableComponents.includes(component)) {
    const msg = errorMsg(`no component "${component}", must be one of:`, availableComponents)
    process.stderr.write(msg)
    process.exit(1)
  }

  // Create files and write to disk
  await Promise.all([
    makeComponent(component, example, componentPath),
    createTest(component, testPath)
  ])
}

// node ./tools/scaffold componentName exampleName
run()
