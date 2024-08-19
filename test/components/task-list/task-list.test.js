import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { document, getExamples, hasAccessibleDescription, renderHtml } from '../../helper.js'

describe('Task List', () => {
  let examples

  before(async () => {
    examples = await getExamples('task-list')
  })

  it('renders the default example', async () => {
    document.body.innerHTML = await renderHtml('task-list', examples.default)

    const $component = document.querySelector('.govuk-task-list')
    equal($component.tagName, 'UL')
  })

  describe('when custom classes are passed', () => {
    let $component

    before(async () => {
      document.body.innerHTML = await renderHtml('task-list', examples['custom classes'])
      $component = document.querySelector('.govuk-task-list')
    })

    it('includes additional classes from the `classes` option on the root', async () => {
      ok([...$component.classList].includes('custom-class-on-component'))
    })

    it('includes additional classes from the `item.classes` option on the item', async () => {
      const $listItem = $component.querySelector('.govuk-task-list__item')
      ok([...$listItem.classList].includes('custom-class-on-task'))
    })

    it('includes additional classes from the `item.status.classes` option on the status', async () => {
      const $status = $component.querySelector('.govuk-task-list__status')
      ok([...$status.classList].includes('custom-class-on-status'))
    })

    describe('when a task has a tag status', () => {
      it('allows for custom classes on tags', async () => {
        const $tag = document.querySelector('.govuk-task-list__status .govuk-tag')
        ok([...$tag.classList].includes('custom-class-on-tag'))
      })
    })

    describe('when a task has an href set', () => {
      it('includes classes from the `item.title.classes` option on the link', async () => {
        const $itemWithLink = $component.querySelector('.govuk-task-list__item:first-child')
        const $link = $itemWithLink.querySelector('.govuk-task-list__link')

        ok([...$link.classList].includes('custom-class-on-linked-title'))
      })
    })

    describe('when a task does not have an href set', () => {
      it('includes classes from the `item.title.classes` option on the wrapper div', async () => {
        const $itemWithoutLink = $component.querySelector('.govuk-task-list__item:last-child')
        const $wrapper = $itemWithoutLink.querySelector('.govuk-task-list__name-and-hint div')

        ok([...$wrapper.classList].includes('custom-class-on-unlinked-title'))
      })
    })
  })

  it('sets any additional attributes based on the `attributes` option', async () => {
    document.body.innerHTML = await renderHtml('task-list', examples['custom attributes'])

    const $component = document.querySelector('.govuk-task-list')
    equal($component.getAttribute('data-custom-attribute'), 'custom-value')
  })

  it('sets any additional attributes on tags based on `item.status.tag.attributes` option', async () => {
    document.body.innerHTML = await renderHtml('task-list', examples['custom attributes'])

    const $component = document.querySelector('.govuk-tag')
    equal($component.getAttribute('data-tag-attribute'), 'tag-value')
  })

  describe('when a task has an href set', () => {
    let $item
    let $itemLink

    before(async () => {
      document.body.innerHTML = await renderHtml('task-list', examples.default)
      $item = document.querySelector('.govuk-task-list__item')
      $itemLink = document.querySelector('a.govuk-task-list__link')
    })

    it('wraps the task title in a link', async () => {
      equal($itemLink.getAttribute('href'), '#')
    })

    it('adds a with-link modifier class to the task', async () => {
      ok([...$item.classList].includes('govuk-task-list__item--with-link'))
    })

    it('associates the task name link with the status using aria', async () => {
      hasAccessibleDescription($itemLink, 'Completed')
    })
  })

  describe('when a task does not have an href set', () => {
    it('does not link the task title', async () => {
      document.body.innerHTML = await renderHtml('task-list', examples['example with hint text and additional states'])

      const $itemWithNoLink = document.querySelector('.govuk-task-list__item:last-child')

      equal($itemWithNoLink.querySelector('a'), null)
    })
  })

  describe('when using the `text` option', () => {
    before(async () => {
      document.body.innerHTML = await renderHtml('task-list', examples['html passed as text'])
    })

    describe('when a task has an href set', () => {
      it('escapes HTML in the link', async () => {
        const $itemWithLink = document.querySelector('.govuk-task-list__item:first-child')
        const $link = $itemWithLink.querySelector('.govuk-task-list__link')
        equal($link.textContent.trim(), '<strong>Linked Title</strong>')
      })
    })

    describe('when a task does not have an href set', () => {
      it('escapes the title', async () => {
        const $itemWithoutLink = document.querySelector('.govuk-task-list__item:last-child')
        const $title = $itemWithoutLink.querySelector('.govuk-task-list__name-and-hint')

        equal($title.textContent.trim(), '<strong>Unlinked Title</strong>')
      })
    })

    describe('when a task has a tag status', () => {
      it('escapes HTML in the tag', async () => {
        const $tag = document.querySelector('.govuk-tag')
        equal($tag.textContent.trim(), '<strong>Tag</strong>')
      })
    })

    describe('when a task has a non-tag status', () => {
      it('escapes HTML in the status', async () => {
        const $status = document.querySelector('.govuk-task-list__status')
        equal($status.textContent.trim(), '<strong>Status</strong>')
      })
    })

    it('escapes HTML in the hint', async () => {
      const $hint = document.querySelector('.govuk-task-list__hint')
      equal($hint.textContent.trim(), '<strong>Hint</strong>')
    })
  })

  describe('when using the `html` option', () => {
    before(async () => {
      document.body.innerHTML = await renderHtml('task-list', examples.html)
    })

    describe('when a task has an href set', () => {
      it('does not escape HTML in the link', async () => {
        const $itemWithLink = document.querySelector('.govuk-task-list__item:first-child')
        const $link = $itemWithLink.querySelector('.govuk-task-list__link')

        ok($link.innerHTML.includes('<strong>Linked Title</strong>'))
      })
    })

    describe('when a task does not have an href set', () => {
      it('does not escape HTML in the title', async () => {
        const $itemWithoutLink = document.querySelector('.govuk-task-list__item:last-child')
        const $title = $itemWithoutLink.querySelector('.govuk-task-list__name-and-hint')

        ok($title.innerHTML.includes('<strong>Unlinked Title</strong>'))
      })
    })

    describe('when a task has a tag status', () => {
      it('does not escape HTML in the tag', async () => {
        const $tag = document.querySelector('.govuk-tag')
        ok($tag.innerHTML.includes('<strong>Tag</strong>'))
      })
    })

    describe('when a task has a non-tag status', () => {
      it('does not escape HTML in the status', async () => {
        const $status = document.querySelector('.govuk-task-list__status')
        ok($status.innerHTML.includes('<strong>Status</strong>'))
      })
    })

    it('does not escape HTML in the hint', async () => {
      const $hint = document.querySelector('.govuk-task-list__hint')
      ok($hint.innerHTML.includes('<strong>Hint</strong>'))
    })
  })

  describe('when a task has a hint', () => {
    let $component

    before(async () => {
      document.body.innerHTML = await renderHtml('task-list', examples['example with hint text and additional states'])
      $component = document.querySelector('.govuk-task-list')
    })

    it('renders the hint', async () => {
      const $hintText = $component.querySelector('.govuk-task-list__hint')
      equal($hintText.textContent.trim(), 'Ensure the plan covers objectives, strategies, sales, marketing and financial forecasts.')
    })

    it('associates the hint text and the status with the task link', async () => {
      const $task = $component.querySelector('.govuk-task-list__item:nth-child(3)')

      const $link = $task.querySelector('.govuk-task-list__link')
      const $hint = $task.querySelector('.govuk-task-list__hint')
      const $status = $task.querySelector('.govuk-task-list__status')

      hasAccessibleDescription($link, [$hint, $status].map((el) => el.textContent.trim()).join(' '))
    })
  })

  describe('when a custom idPrefix is used', () => {
    let $component

    before(async () => {
      document.body.innerHTML = await renderHtml('task-list', examples['custom id prefix'])
      $component = document.querySelector('.govuk-task-list')
    })

    it('uses the id prefix for the hint id', async () => {
      const $hint = $component.querySelector('.govuk-task-list__hint')
      equal($hint.getAttribute('id'), 'my-custom-id-1-hint')
    })

    it('uses the id prefix for the status', async () => {
      const $status = $component.querySelector('.govuk-task-list__status')
      equal($status.getAttribute('id'), 'my-custom-id-1-status')
    })

    it('uses the id prefix for the aria-describedby association', async () => {
      const $link = $component.querySelector('.govuk-task-list__link')
      ok($link.hasAttribute('aria-describedby'))
    })
  })

  it('omits empty items from the task list', async () => {
    document.body.innerHTML = await renderHtml('task-list', examples['with empty values'])

    equal(document.querySelectorAll('.govuk-task-list__item').length, 2)
  })
})
