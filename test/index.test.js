import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import * as module from '../index.js'

describe('index.js', () => {
  it('exports govukBackLink()', async () => {
    const govukBackLink = await import('../components/back-link/back-link.js')
    deepEqual(module.govukBackLink, govukBackLink.default)
  })

  it('exports govukBreadcrumbs()', async () => {
    const govukBreadcrumbs = await import('../components/breadcrumbs/breadcrumbs.js')
    deepEqual(module.govukBreadcrumbs, govukBreadcrumbs.default)
  })

  it('exports govukButton()', async () => {
    const govukButton = await import('../components/button/button.js')
    deepEqual(module.govukButton, govukButton.default)
  })

  it('exports govukDetails()', async () => {
    const govukDetails = await import('../components/details/details.js')
    deepEqual(module.govukDetails, govukDetails.default)
  })

  it('exports govukErrorMessage()', async () => {
    const govukErrorMessage = await import('../components/error-message/error-message.js')
    deepEqual(module.govukErrorMessage, govukErrorMessage.default)
  })

  it('exports govukFieldset()', async () => {
    const govukFieldset = await import('../components/fieldset/fieldset.js')
    deepEqual(module.govukFieldset, govukFieldset.default)
  })

  it('exports govukHint()', async () => {
    const govukHint = await import('../components/hint/hint.js')
    deepEqual(module.govukHint, govukHint.default)
  })

  it('exports govukInput()', async () => {
    const govukInput = await import('../components/input/input.js')
    deepEqual(module.govukInput, govukInput.default)
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
