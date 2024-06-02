import { equal } from 'node:assert/strict'
import childProcess from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, it } from 'node:test'
import { promisify } from 'node:util'

const exec = promisify(childProcess.exec)
const path = join(import.meta.dirname, '../../tools/scaffold.js')
const fixturesPath = join(import.meta.dirname, '../fixtures')

describe('scaffold component cli', async () => {
  const [button, header] = await Promise.all([
    readFile(join(fixturesPath, 'button.js'), { encoding: 'utf8' }),
    readFile(join(fixturesPath, 'header.js'), { encoding: 'utf8' })
  ])

  it('generates button .js', async () => {
    const { stdout } = await exec(`node ${path} button`)
    equal(stdout, button)
  })

  it('generates header .js, complex types and custom example', async () => {
    const { stdout } = await exec(`node ${path} header 'with service name'`)
    equal(stdout, header)
  })
})
