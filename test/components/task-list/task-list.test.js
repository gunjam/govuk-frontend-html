import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Task List', () => {
  let examples

  before(async () => {
    examples = await getExamples('task-list')
  })

  it('renders the default example', async () => {
    const $ = await render('task-list', examples.default)

    const $component = $('.govuk-task-list')
    equal($component.get(0).tagName, 'ul')
  })

  it('allows for custom classes on the root of the component', async () => {
    const $ = await render('task-list', examples['custom classes'])

    const $component = $('.govuk-task-list')
    ok($component.hasClass('custom-class-on-component'))
  })

  it('allows for custom classes on each task', async () => {
    const $ = await render('task-list', examples['custom classes'])

    const $listItem = $('.govuk-task-list__item')
    ok($listItem.hasClass('custom-class-on-task'))
  })

  it('allows for custom classes on each status', async () => {
    const $ = await render('task-list', examples['custom classes'])

    const $status = $('.govuk-task-list__status')
    ok($status.hasClass('custom-class-on-status'))
  })

  it('allows for custom attributes', async () => {
    const $ = await render('task-list', examples['custom attributes'])

    const $component = $('.govuk-task-list')
    equal($component.attr('data-custom-attribute'), 'custom-value')
  })

  describe('when a task has an href set', () => {
    let $component

    before(async () => {
      const $ = await render('task-list', examples.default)
      $component = $('.govuk-task-list')
    })

    it('wraps the task title in a link', async () => {
      const $itemLink = $component.find('a.govuk-task-list__link')
      equal($itemLink.attr('href'), '#')
    })

    it('adds a with-link modifier class to the task', async () => {
      const $itemLink = $component.find('.govuk-task-list__item')
      ok($itemLink.hasClass('govuk-task-list__item--with-link'))
    })

    it('associates the task name link with the status using aria', async () => {
      const $itemLink = $component.find('.govuk-task-list__link')
      const $statusWithId = $component.find(`#${$itemLink.attr('aria-describedby')}`)

      ok($statusWithId.text().includes('Completed'))
    })

    it('applies title classes to the link', async () => {
      const $ = await render('task-list', examples['custom classes'])

      const $itemWithLink = $('.govuk-task-list__item:first-child')
      const $itemWithLinkTitle = $itemWithLink.find('.govuk-task-list__link')
      ok($itemWithLinkTitle.hasClass('custom-class-on-linked-title'))
    })

    it('escapes the title when passed as text', async () => {
      const $ = await render('task-list', examples['html passed as text'])

      const $itemWithLink = $('.govuk-task-list__item:first-child')
      const $itemWithLinkTitle = $itemWithLink.find('.govuk-task-list__link')
      equal($itemWithLinkTitle.text().trim(), '<strong>Linked Title</strong>')
    })

    it('allows HTML in the title when passed as html', async () => {
      const $ = await render('task-list', examples.html)

      const $itemWithLink = $('.govuk-task-list__item:first-child')
      const $itemWithLinkTitle = $itemWithLink.find('.govuk-task-list__link')
      equal($itemWithLinkTitle.html().trim(), '<strong>Linked Title</strong>')
    })
  })

  describe('when a task does not have an href set', () => {
    it('does not link the task title', async () => {
      const $ = await render('task-list', examples['example with hint text and additional states'])

      const $itemWithNoLink = $('.govuk-task-list__item:last-child')
      const $itemWithNoLinkTitle = $itemWithNoLink.find('div')
      ok($itemWithNoLinkTitle.text().includes('Payment'))
    })

    it('applies title classes to the title wrapper div', async () => {
      const $ = await render('task-list', examples['custom classes'])

      const $itemWithNoLink = $('.govuk-task-list__item:last-child')
      const $itemWithNoLinkTitle = $itemWithNoLink.find('.govuk-task-list__name-and-hint div')
      ok($itemWithNoLinkTitle.hasClass('custom-class-on-unlinked-title'))
    })

    it('escapes the title when passed as text', async () => {
      const $ = await render('task-list', examples['html passed as text'])

      const $itemWithoutLink = $('.govuk-task-list__item:last-child')
      const $itemWithoutLinkTitle = $itemWithoutLink.find('.govuk-task-list__name-and-hint')
      ok($itemWithoutLinkTitle.text().includes('<strong>Unlinked Title</strong>'))
    })

    it('allows HTML in the title when passed as html', async () => {
      const $ = await render('task-list', examples.html)

      const $itemWithoutLink = $('.govuk-task-list__item:last-child')
      const $itemWithoutLinkTitle = $itemWithoutLink.find('.govuk-task-list__name-and-hint')
      ok($itemWithoutLinkTitle.html().includes('<strong>Unlinked Title</strong>'))
    })
  })

  describe('when a task has a tag status', () => {
    it('escapes the tag when passed as text', async () => {
      const $ = await render('task-list', examples['html passed as text'])

      const $tag = $('.govuk-tag')
      ok($tag.text().includes('<strong>Tag</strong>'))
    })

    it('allows HTML in the tag when passed as html', async () => {
      const $ = await render('task-list', examples.html)

      const $tag = $('.govuk-tag')
      ok($tag.html().includes('<strong>Tag</strong>'))
    })

    it('allows for custom classes on tags', async () => {
      const $ = await render('task-list', examples['custom classes'])

      const $tag = $('.govuk-task-list__status .govuk-tag')
      ok($tag.hasClass('custom-class-on-tag'))
    })

    it('allows for custom attributes on tags', async () => {
      const $ = await render('task-list', examples['custom attributes'])

      const $component = $('.govuk-tag')
      equal($component.attr('data-tag-attribute'), 'tag-value')
    })
  })

  describe('when a task has a non-tag status', () => {
    it('escapes the status when passed as text', async () => {
      const $ = await render('task-list', examples['html passed as text'])

      const $status = $('.govuk-task-list__status')
      ok($status.text().includes('<strong>Status</strong>'))
    })

    it('allows HTML in the tag when passed as html', async () => {
      const $ = await render('task-list', examples.html)

      const $status = $('.govuk-task-list__status')
      ok($status.html().includes('<strong>Status</strong>'))
    })
  })

  describe('when a task has a hint', () => {
    let $component

    before(async () => {
      const $ = await render('task-list', examples['example with hint text and additional states'])
      $component = $('.govuk-task-list')
    })

    it('renders the hint', async () => {
      const $hintText = $component.find('.govuk-task-list__hint')
      ok($hintText.text().includes('Ensure the plan covers objectives, strategies, sales, marketing and financial forecasts.'))
    })

    it('associates the hint text with the task link using aria', async () => {
      const $hintText = $component.find('.govuk-task-list__hint')
      equal($hintText.attr('id'), 'task-list-3-hint')

      const $itemAssociatedWithHint = $component.find(`.govuk-task-list__link[aria-describedby~="${$hintText.attr('id')}"]`)
      ok($itemAssociatedWithHint.text().includes('Business plan'))
    })

    it('escapes the hint when passed as text', async () => {
      const $ = await render('task-list', examples['html passed as text'])

      const $hint = $('.govuk-task-list__hint')
      ok($hint.text().includes('<strong>Hint</strong>'))
    })

    it('allows HTML in the hint when passed as html', async () => {
      const $ = await render('task-list', examples.html)

      const $hint = $('.govuk-task-list__hint')
      ok($hint.html().includes('<strong>Hint</strong>'))
    })
  })

  describe('when a custom idPrefix is used', () => {
    let $component

    before(async () => {
      const $ = await render('task-list', examples['custom id prefix'])
      $component = $('.govuk-task-list')
    })

    it('uses the id prefix for the hint id', async () => {
      const $hint = $component.find('.govuk-task-list__hint')
      equal($hint.attr('id'), 'my-custom-id-1-hint')
    })

    it('uses the id prefix for the status', async () => {
      const $hint = $component.find('.govuk-task-list__status')
      equal($hint.attr('id'), 'my-custom-id-1-status')
    })

    it('uses the id prefix for the aria-describedby association', async () => {
      const $hint = $component.find('.govuk-task-list__link')
      equal($hint.attr('aria-describedby'), 'my-custom-id-1-hint my-custom-id-1-status')
    })
  })
})
