import { equal, rejects } from 'node:assert/strict'
import childProcess from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, before, describe, it } from 'node:test'
import { promisify, styleText } from 'node:util'

const exec = promisify(childProcess.exec)
const path = join(import.meta.dirname, '../../tools/scaffold.js')
const fixturesPath = join(import.meta.dirname, '../fixtures')

const redBold = (str) => styleText(['red', 'bold'], str)
const yellow = (str) => styleText('yellow', str)
const bold = (str) => styleText('bold', str)

const tmpDir = process.env.TMP_DIR || tmpdir()

let tmp = ''

// Create temp dir to store produced commit details json file
before(async () => {
  tmp = await mkdtemp(join(tmpDir, 'scaffold'))
})

after(async () => rm(tmp, { recursive: true }))

describe('scaffold component cli', async () => {
  const [
    button,
    buttonToUpdate,
    buttonUpdated,
    buttonTest,
    details,
    detailsTest,
    header,
    headerTest,
    table,
    tableTest
  ] = await Promise.all([
    readFile(join(fixturesPath, 'button.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'button-to-update.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'button-updated.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'button-test.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'details.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'details-test.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'header.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'header-test.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'table.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'table-test.js'), { encoding: 'utf8' })
  ])

  it('generates button.js', async () => {
    await exec(`node ${path} --test-path=${tmp} --component-path=${tmp} button`)
    const [component, test] = await Promise.all([
      readFile(`${tmp}/button/button.js`, { encoding: 'utf8' }),
      readFile(`${tmp}/button/button.test.js`, { encoding: 'utf8' })
    ])
    equal(component, button)
    equal(test, buttonTest)
  })

  it('update button.js types', async () => {
    await writeFile(join(tmp, 'button', 'button.js'), buttonToUpdate)
    await exec(`node ${path} --test-path=${tmp} --component-path=${tmp} button`)
    const updatedButton = await readFile(`${tmp}/button/button.js`, { encoding: 'utf8' })
    equal(updatedButton, buttonUpdated)
  })

  it('generates details.js, does not include `caller` param', async () => {
    await exec(`node ${path} --test-path=${tmp} --component-path=${tmp} details`)
    const [component, test] = await Promise.all([
      readFile(`${tmp}/details/details.js`, { encoding: 'utf8' }),
      readFile(`${tmp}/details/details.test.js`, { encoding: 'utf8' })
    ])
    equal(component, details)
    equal(test, detailsTest)
  })

  it('generates header.js, complex types & describe.each() replacement', async () => {
    await exec(`node ${path} --test-path=${tmp} --component-path=${tmp} header`)
    const [component, test] = await Promise.all([
      readFile(`${tmp}/header/header.js`, { encoding: 'utf8' }),
      readFile(`${tmp}/header/header.test.js`, { encoding: 'utf8' })
    ])
    equal(component, header)
    equal(test, headerTest)
  })

  it('generates table.js, custom example & array comparisons', async () => {
    await exec(`node ${path} --test-path=${tmp} --component-path=${tmp} table "table with head"`)
    const [component, test] = await Promise.all([
      readFile(`${tmp}/table/table.js`, { encoding: 'utf8' }),
      readFile(`${tmp}/table/table.test.js`, { encoding: 'utf8' })
    ])
    equal(component, table)
    equal(test, tableTest)
  })

  it('errors for unknown component', async () => {
    const errMsg = `${redBold('[Error]')} ${bold('no component "bad", must be one of:')}`
    const list = [
      '"accordion"',
      '"back-link"',
      '"breadcrumbs"',
      '"button"',
      '"character-count"',
      '"checkboxes"',
      '"cookie-banner"',
      '"date-input"',
      '"details"',
      '"error-message"',
      '"error-summary"',
      '"exit-this-page"',
      '"fieldset"',
      '"file-upload"',
      '"footer"',
      '"header"',
      '"hint"',
      '"input"',
      '"inset-text"',
      '"label"',
      '"notification-banner"',
      '"pagination"',
      '"panel"',
      '"password-input"',
      '"phase-banner"',
      '"radios"',
      '"select"',
      '"service-navigation"',
      '"skip-link"',
      '"summary-list"',
      '"table"',
      '"tabs"',
      '"tag"',
      '"task-list"',
      '"textarea"',
      '"warning-text"'
    ]
      .map((i) => yellow(i))
      .join('\n ')

    await rejects(() => exec(`node ${path} bad`), {
      stderr: `${errMsg} \n ${list}\n`
    })
  })

  it('errors for unknown fixtures test example', async () => {
    const errMsg = `${redBold('[Error]')} ${bold('no example "bad", must be one of:')}`
    const list = [
      '"default"',
      '"disabled"',
      '"link"',
      '"start"',
      '"start link"',
      '"input"',
      '"input disabled"',
      '"prevent double click"',
      '"with active state"',
      '"with hover state"',
      '"with focus state"',
      '"secondary"',
      '"secondary disabled"',
      '"secondary link"',
      '"warning"',
      '"warning disabled"',
      '"warning link"',
      '"inverse"',
      '"inverse disabled"',
      '"inverse link"',
      '"inverse start"',
      '"attributes"',
      '"link attributes"',
      '"input attributes"',
      '"classes"',
      '"link classes"',
      '"input classes"',
      '"name"',
      '"type"',
      '"input type"',
      '"explicit link"',
      '"no href"',
      '"value"',
      '"html"',
      '"no type"',
      '"no data-prevent-double-click"',
      '"don\'t prevent double click"',
      '"id"'
    ]
      .map((i) => yellow(i))
      .join('\n ')

    await rejects(() => exec(`node ${path} button bad`), {
      stderr: `${errMsg} \n ${list}\n`
    })
  })
})
