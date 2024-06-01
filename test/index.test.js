import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import * as module from '../index.js'

describe('index.js', () => {
  it('exports govukButton()', async () => {
    const govukButton = await import('../components/button/button.js')
    deepEqual(module.govukButton, govukButton.default)
  })

  it('exports govukDetails()', async () => {
    const govukDetails = await import('../components/details/details.js')
    deepEqual(module.govukDetails, govukDetails.default)
  })

  it('exports govukHint()', async () => {
    const govukHint = await import('../components/hint/hint.js')
    deepEqual(module.govukHint, govukHint.default)
  })

  it('exports govukLabel()', async () => {
    const govukLabel = await import('../components/label/label.js')
    deepEqual(module.govukLabel, govukLabel.default)
  })

  it('exports govukSkipLink()', async () => {
    const govukSkipLink = await import('../components/skip-link/skip-link.js')
    deepEqual(module.govukSkipLink, govukSkipLink.default)
  })

  it('exports govukWarningText()', async () => {
    const govukWarningText = await import('../components/warning-text/warning-text.js')
    deepEqual(module.govukWarningText, govukWarningText.default)
  })
})
