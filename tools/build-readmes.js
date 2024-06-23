import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { capitalise, toCamelCase, toSpaced } from '../utils/text.js'
import { getComponentList, getComponentMeta, getComponentOptions } from './component-meta.js'

// A list of components that do no have GOV.UK Design System pages, they're
// only called internally by other components.
const internalComponents = new Set(['fieldset', 'hint', 'label'])

/**
 * Generate markdown javascript example of importing and calling a component
 * @param {string} functionName - the name of the component function
 * @param {object} exampleParams - the component params object to use in the example
 * @returns {string} the example
 */
function getExample(functionName, exampleParams) {
  let example = `import { ${functionName} } from 'govuk-frontend-html'

const html = ${functionName}({
`

  const json = JSON.stringify(exampleParams, null, '  ')

  for (const line of json.split('\n').slice(1, -1)) {
    example += `${line}\n`
  }

  example = example
    .replaceAll(/"([^"]+)":/g, '$1:')
    .replaceAll(/: "(.+)"(,)?\n/g, `: '$1'$2\n`)
    .replaceAll(/\\"/g, '"')

  return `${example}})`
}

/**
 * Generate a markdown table of component paramater options
 * @param {Array<object>} options - component macro options JSON from govuk-frontend
 * @param {string} [heading=''] - for recursion, don't use
 * @returns {string} markdown table string
 */
function getParamsTable(options, heading = '') {
  let def = `${heading}
| Name | Type | Description |
| ---- | ---- | ----------- |
`

  let subDef = ''

  for (const option of options) {
    // We don't support nunjucks specific features
    if (option.name === 'caller' || option.type.startsWith('nunjucks')) {
      continue
    }

    // If the option has params it's a complex type, eg: object/array
    if (option.params) {
      const optionsHeading = `### Options for \`${option.name}\` object\n`
      subDef += getParamsTable(option.params, optionsHeading)
    }

    let description = option.description
    switch (option.name) {
      case 'label':
        description += ' See [label](../label/README.md#label-options).'
        break
      case 'hint':
        description += ' See [hint](../hint/README.md#hint-options).'
        break
      case 'fieldset':
        description += ' See [fieldset](../fieldset/README.md#fieldset-options).'
        break
      case 'tag':
        description += ' See [tag](../tag/README.md#tag-options).'
    }

    def += `| ${option.name} | ${option.type} | ${description} |\n`
  }

  return `${def}\n\n${subDef}`
}

/**
 * Generate componet README.md files in each component directory from
 * govuk-frontend meta data files.
 * @returns {Promise}
 */
async function createReadmes() {
  const components = await getComponentList()

  const componentInfoReads = components.map(async (component) => {
    const [options, meta] = await Promise.all([
      getComponentOptions(component),
      getComponentMeta(component)
    ])
    return {
      name: component,
      description: meta.description,
      example: meta.example,
      options
    }
  })

  const meta = await Promise.all(componentInfoReads)
  const readmes = new Map()

  for (const { name, description, example, options } of meta) {
    const functionName = toCamelCase(`govuk-${name}`)
    const componentName = toSpaced(name)
    const capitilisedName = capitalise(componentName)

    const link =
      internalComponents.has(name) === false
        ? `Find out when to use the ${componentName} component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/${name}/)`
        : ''

    const content = `# ${capitilisedName}

${description}

## Usage

\`\`\`javascript
${getExample(functionName, example)}
\`\`\`

${link}

## ${capitilisedName} options

> [!CAUTION]
> If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

${getParamsTable(options).trim()}
`

    readmes.set(name, content)
  }

  await Promise.all(
    readmes.entries().map(([name, readme]) => {
      const path = join(import.meta.dirname, '../components', name, 'README.md')
      return writeFile(path, readme)
    })
  )
}

createReadmes()
