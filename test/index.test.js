import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import * as module from '../index.js'

describe('index.js', () => {
  it('exports govukAccordion()', async () => {
    const govukAccordion = await import('../components/accordion/accordion.js')
    deepEqual(module.govukAccordion, govukAccordion.default)
  })

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

  it('exports govukCharacterCount()', async () => {
    const govukCharacterCount = await import('../components/character-count/character-count.js')
    deepEqual(module.govukCharacterCount, govukCharacterCount.default)
  })

  it('exports govukCheckboxes()', async () => {
    const govukCheckboxes = await import('../components/checkboxes/checkboxes.js')
    deepEqual(module.govukCheckboxes, govukCheckboxes.default)
  })

  it('exports govukCookieBanner()', async () => {
    const govukCookieBanner = await import('../components/cookie-banner/cookie-banner.js')
    deepEqual(module.govukCookieBanner, govukCookieBanner.default)
  })

  it('exports govukDateInput()', async () => {
    const govukDateInput = await import('../components/date-input/date-input.js')
    deepEqual(module.govukDateInput, govukDateInput.default)
  })

  it('exports govukDetails()', async () => {
    const govukDetails = await import('../components/details/details.js')
    deepEqual(module.govukDetails, govukDetails.default)
  })

  it('exports govukErrorMessage()', async () => {
    const govukErrorMessage = await import('../components/error-message/error-message.js')
    deepEqual(module.govukErrorMessage, govukErrorMessage.default)
  })

  it('exports govukErrorSummary()', async () => {
    const govukErrorSummary = await import('../components/error-summary/error-summary.js')
    deepEqual(module.govukErrorSummary, govukErrorSummary.default)
  })

  it('exports govukExitThisPage()', async () => {
    const govukExitThisPage = await import('../components/exit-this-page/exit-this-page.js')
    deepEqual(module.govukExitThisPage, govukExitThisPage.default)
  })

  it('exports govukFieldset()', async () => {
    const govukFieldset = await import('../components/fieldset/fieldset.js')
    deepEqual(module.govukFieldset, govukFieldset.default)
  })

  it('exports govukFileUpload()', async () => {
    const govukFileUpload = await import('../components/file-upload/file-upload.js')
    deepEqual(module.govukFileUpload, govukFileUpload.default)
  })

  it('exports govukFooter()', async () => {
    const govukFooter = await import('../components/footer/footer.js')
    deepEqual(module.govukFooter, govukFooter.default)
  })

  it('exports govukHeader()', async () => {
    const govukHeader = await import('../components/header/header.js')
    deepEqual(module.govukHeader, govukHeader.default)
  })

  it('exports govukHint()', async () => {
    const govukHint = await import('../components/hint/hint.js')
    deepEqual(module.govukHint, govukHint.default)
  })

  it('exports govukInput()', async () => {
    const govukInput = await import('../components/input/input.js')
    deepEqual(module.govukInput, govukInput.default)
  })

  it('exports govukInsetText()', async () => {
    const govukInsetText = await import('../components/inset-text/inset-text.js')
    deepEqual(module.govukInsetText, govukInsetText.default)
  })

  it('exports govukLabel()', async () => {
    const govukLabel = await import('../components/label/label.js')
    deepEqual(module.govukLabel, govukLabel.default)
  })

  it('exports govukNotificationBanner()', async () => {
    const govukNotificationBanner = await import(
      '../components/notification-banner/notification-banner.js'
    )
    deepEqual(module.govukNotificationBanner, govukNotificationBanner.default)
  })

  it('exports govukPagination()', async () => {
    const govukPagination = await import('../components/pagination/pagination.js')
    deepEqual(module.govukPagination, govukPagination.default)
  })

  it('exports govukPanel()', async () => {
    const govukPanel = await import('../components/panel/panel.js')
    deepEqual(module.govukPanel, govukPanel.default)
  })

  it('exports govukPasswordInput()', async () => {
    const govukPasswordInput = await import('../components/password-input/password-input.js')
    deepEqual(module.govukPasswordInput, govukPasswordInput.default)
  })

  it('exports govukPhaseBanner()', async () => {
    const govukPhaseBanner = await import('../components/phase-banner/phase-banner.js')
    deepEqual(module.govukPhaseBanner, govukPhaseBanner.default)
  })

  it('exports govukRadios()', async () => {
    const govukRadios = await import('../components/radios/radios.js')
    deepEqual(module.govukRadios, govukRadios.default)
  })

  it('exports govukSelect()', async () => {
    const govukSelect = await import('../components/select/select.js')
    deepEqual(module.govukSelect, govukSelect.default)
  })

  it('exports govukSkipLink()', async () => {
    const govukSkipLink = await import('../components/skip-link/skip-link.js')
    deepEqual(module.govukSkipLink, govukSkipLink.default)
  })

  it('exports govukSummaryList()', async () => {
    const govukSummaryList = await import('../components/summary-list/summary-list.js')
    deepEqual(module.govukSummaryList, govukSummaryList.default)
  })

  it('exports govukTable()', async () => {
    const govukTable = await import('../components/table/table.js')
    deepEqual(module.govukTable, govukTable.default)
  })

  it('exports govukTabs()', async () => {
    const govukTabs = await import('../components/tabs/tabs.js')
    deepEqual(module.govukTabs, govukTabs.default)
  })

  it('exports govukTag()', async () => {
    const govukTag = await import('../components/tag/tag.js')
    deepEqual(module.govukTag, govukTag.default)
  })

  it('exports govukTaskList()', async () => {
    const govukTaskList = await import('../components/task-list/task-list.js')
    deepEqual(module.govukTaskList, govukTaskList.default)
  })

  it('exports govukTemplate()', async () => {
    const govukTemplate = await import('../template.js')
    deepEqual(module.govukTemplate, govukTemplate.default)
  })

  it('exports govukTextarea()', async () => {
    const govukTextarea = await import('../components/textarea/textarea.js')
    deepEqual(module.govukTextarea, govukTextarea.default)
  })

  it('exports govukWarningText()', async () => {
    const govukWarningText = await import('../components/warning-text/warning-text.js')
    deepEqual(module.govukWarningText, govukWarningText.default)
  })
})
