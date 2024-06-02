import { equal, rejects } from 'node:assert/strict'
import childProcess from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, it } from 'node:test'
import { promisify, styleText } from 'node:util'

const exec = promisify(childProcess.exec)
const path = join(import.meta.dirname, '../../tools/scaffold.js')
const fixturesPath = join(import.meta.dirname, '../fixtures')

const redBold = (str) => styleText(['red', 'bold'], str)
const yellow = (str) => styleText('yellow', str)
const bold = (str) => styleText('bold', str)

describe('scaffold component cli', async () => {
  const [button, details, header] = await Promise.all([
    readFile(join(fixturesPath, 'button.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'details.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'header.js'), { encoding: 'utf8' })
  ])

  it('generates button .js', async () => {
    const { stdout } = await exec(`node ${path} button`)
    equal(stdout, button)
  })

  it('generates details .js, does not include `caller` param', async () => {
    const { stdout } = await exec(`node ${path} details`)
    equal(stdout, details)
  })

  it('generates header .js, complex types and custom example', async () => {
    const { stdout } = await exec(`node ${path} header 'with service name'`)
    equal(stdout, header)
  })

  it('errors for unknown component', async () => {
    const errMsg = `${redBold('[Error]')} ${bold('no component "bad", must be one of:')}`
    const list = yellow(`"accordion"
 "back-link"
 "breadcrumbs"
 "button"
 "character-count"
 "checkboxes"
 "cookie-banner"
 "date-input"
 "details"
 "error-message"
 "error-summary"
 "exit-this-page"
 "fieldset"
 "file-upload"
 "footer"
 "header"
 "hint"
 "input"
 "inset-text"
 "label"
 "notification-banner"
 "pagination"
 "panel"
 "password-input"
 "phase-banner"
 "radios"
 "select"
 "skip-link"
 "summary-list"
 "table"
 "tabs"
 "tag"
 "task-list"
 "textarea"
 "warning-text"`)
    await rejects(() => exec(`node ${path} bad`), {
      stderr: `${errMsg} \n ${list}\n`
    })
  })

  it('errors for unknown fixtures test example', async () => {
    const errMsg = `${redBold('[Error]')} ${bold('no example "bad", must be one of:')}`
    const list = yellow(`"default"
 "disabled"
 "link"
 "start"
 "start link"
 "input"
 "input disabled"
 "prevent double click"
 "with active state"
 "with hover state"
 "with focus state"
 "secondary"
 "secondary disabled"
 "secondary link"
 "warning"
 "warning disabled"
 "warning link"
 "inverse"
 "inverse disabled"
 "inverse link"
 "inverse start"
 "attributes"
 "link attributes"
 "input attributes"
 "classes"
 "link classes"
 "input classes"
 "name"
 "type"
 "input type"
 "explicit link"
 "no href"
 "value"
 "html"
 "no type"
 "no data-prevent-double-click"
 "don't prevent double click"
 "id"`)
    await rejects(() => exec(`node ${path} button bad`), {
      stderr: `${errMsg} \n ${list}\n`
    })
  })
})
