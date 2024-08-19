import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Summary list', () => {
  let examples

  before(async () => {
    examples = await getExamples('summary-list')
  })

  describe('custom options', () => {
    it('renders classes', async () => {
      const $ = await render('summary-list', examples['no-border'])

      const $component = $('.govuk-summary-list')
      ok($component.hasClass('govuk-summary-list--no-border'))
    })

    it('renders with attributes', async () => {
      const $ = await render('summary-list', examples.attributes)

      const $component = $('.govuk-summary-list')
      equal($component.attr('data-attribute-1'), 'value-1')
      equal($component.attr('data-attribute-2'), 'value-2')
    })
  })

  describe('rows', () => {
    it('renders list without falsy values', async () => {
      const $ = await render('summary-list', examples['with falsy values'])

      const $component = $('.govuk-summary-list')
      const $row = $component.find('.govuk-summary-list__row')
      equal($row.length, 2)
    })

    it('renders classes', async () => {
      const $ = await render('summary-list', examples['rows with classes'])

      const $component = $('.govuk-summary-list')
      const $row = $component.find('.govuk-summary-list__row')
      ok($row.hasClass('app-custom-class'))
    })

    describe('keys', () => {
      it('renders text', async () => {
        const $ = await render('summary-list', examples.default)

        const $component = $('.govuk-summary-list')
        const $key = $component.find('dt.govuk-summary-list__key')

        ok($key.html().includes('Name'))
      })

      it('renders html', async () => {
        const $ = await render('summary-list', examples['key with html'])

        const $component = $('.govuk-summary-list')
        const $key = $component.find('dt.govuk-summary-list__key')

        ok($key.html().includes('<b>Name</b>'))
      })

      it('renders classes', async () => {
        const $ = await render('summary-list', examples['key with classes'])

        const $component = $('.govuk-summary-list')
        const $key = $component.find('dt.govuk-summary-list__key')
        ok($key.hasClass('app-custom-class'))
      })
    })

    describe('values', () => {
      it('renders text', async () => {
        const $ = await render('summary-list', examples.default)

        const $component = $('.govuk-summary-list')
        const $value = $component.find('dd.govuk-summary-list__value')

        ok($value.html().includes('Firstname Lastname'))
      })

      it('renders html', async () => {
        const $ = await render('summary-list', examples['value with html'])

        const $component = $('.govuk-summary-list')
        const $value = $component.find('dd.govuk-summary-list__value')

        ok($value.html().includes('<span>email@email.com</span>'))
      })

      it('renders classes', async () => {
        const $ = await render('summary-list', examples['overridden-widths'])

        const $component = $('.govuk-summary-list')
        const $value = $component.find('dd.govuk-summary-list__value')
        ok($value.hasClass('govuk-!-width-one-quarter'))
      })
    })

    describe('actions', () => {
      it('renders href', async () => {
        const $ = await render('summary-list', examples['actions href'])

        const $component = $('.govuk-summary-list')
        const $actionLink = $component.find('.govuk-summary-list__actions > a')

        equal($actionLink.attr('href'), 'https://www.gov.uk')
      })

      it('renders text', async () => {
        const $ = await render('summary-list', examples['with actions'])

        const $component = $('.govuk-summary-list')
        const $actionLink = $component.find('.govuk-summary-list__actions > a')

        ok($actionLink.text().trim().includes('Change date of birth'))
      })

      it('renders html', async () => {
        const $ = await render('summary-list', examples['actions with html'])

        const $component = $('.govuk-summary-list')
        const $actionLink = $component.find('.govuk-summary-list__actions > a')

        ok($actionLink.html().includes('Edit<span class="visually-hidden"> name</span>'))
      })

      it('allows the visually hidden prefix to be removed and then manually added with HTML', async () => {
        const $ = await render('summary-list', examples.translated)

        const $component = $('.govuk-summary-list')
        const $actionLink = $component.find('.govuk-summary-list__actions > a')

        ok($actionLink.html().includes('Golygu<span class="govuk-visually-hidden"> dyddiad geni</span>'))
      })

      it('renders custom accessible name', async () => {
        const $ = await render('summary-list', examples['with actions'])

        const $component = $('.govuk-summary-list')
        const $actionLink = $component.find('.govuk-summary-list__actions > a')
        ok($actionLink.text().trim().includes('Change date of birth'))
      })

      it('renders classes', async () => {
        const $ = await render('summary-list', examples['actions with classes'])

        const $component = $('.govuk-summary-list')
        const $actionList = $component.find('.govuk-summary-list__actions')

        ok($actionList.hasClass('app-custom-class'))
      })

      it('renders attributes', async () => {
        const $ = await render('summary-list', examples['actions with attributes'])

        const $component = $('.govuk-summary-list')
        const $actionLink = $component.find('.govuk-summary-list__actions > a')

        equal($actionLink.attr('data-test-attribute'), 'value')
        equal($actionLink.attr('data-test-attribute-2'), 'value-2')
      })

      it('renders a single anchor with one action', async () => {
        const $ = await render('summary-list', examples['single action with anchor'])

        const $component = $('.govuk-summary-list')
        const $action = $component.find('.govuk-summary-list__actions > a')

        equal($action.html().trim(), 'First action')
      })

      it('renders a list with mutliple actions', async () => {
        const $ = await render('summary-list', examples['with some actions'])

        const $component = $('.govuk-summary-list')
        const $actionList = $component.find('.govuk-summary-list__actions')
        const $secondAction = $actionList.find('.govuk-summary-list__actions-list-item:last-child')

        equal($secondAction.text().trim(), 'Delete name')
      })

      it('renders classes on actions', async () => {
        const $ = await render('summary-list', examples['classes on items'])

        const $component = $('.govuk-summary-list')
        const $action = $component.find('.govuk-summary-list__actions > a')

        ok($action.hasClass('govuk-link--no-visited-state'))
      })

      it('skips the action column when no array is provided', async () => {
        const $ = await render('summary-list', examples.default)

        const $component = $('.govuk-summary-list')
        const $action = $component.find('.govuk-summary-list__actions')

        equal($action.length, 0)
      })

      it('skips the action column when no items are in the array provided', async () => {
        const $ = await render('summary-list', examples['empty items array'])

        const $component = $('.govuk-summary-list')
        const $action = $component.find('.govuk-summary-list__actions')

        equal($action.length, 0)
      })

      describe('when only some rows have actions', () => {
        let $
        let $component

        before(async () => {
          $ = await render('summary-list', examples['with some actions'])
          $component = $('.govuk-summary-list')
        })

        it('does not add no-actions modifier class to rows with actions', async () => {
          // The first row has actions
          const $firstRow = $component.find('.govuk-summary-list__row:first-child')
          equal($firstRow.hasClass('govuk-summary-list__row--no-actions'), false)
        })

        it('adds no-actions modifier class to rows without actions', async () => {
          // The second row does not have actions
          const $secondRow = $component.find('.govuk-summary-list__row:nth-child(2)')
          ok($secondRow.hasClass('govuk-summary-list__row--no-actions'))
        })
      })

      describe('when no rows have actions', () => {
        let $
        let $component

        before(async () => {
          $ = await render('summary-list', examples.default)
          $component = $('.govuk-summary-list')
        })

        it('does not add no-actions modifier class to any of the rows', async () => {
          // The first row has actions
          const $rows = $component.find('.govuk-summary-list__row')
          equal($rows.hasClass('govuk-summary-list__row--no-actions'), false)
        })
      })
    })
  })

  describe('summary card', () => {
    // We only test if the actions are present in the summary card and if the logic
    // for single actions works, not the function of the actions themselves.
    // This is because the card actions use the same _actionLink macro that the
    // list actions do.
    // This is already tested in depth in the 'actions' describe above.
    describe('actions', () => {
      it('renders actions', async () => {
        const $ = await render('summary-list', examples['as a summary card with actions'])

        const $actionItems = $('.govuk-summary-card__action')
        equal($actionItems.length, 2)
      })

      it('does not render a list if only one action is present', async () => {
        const $ = await render('summary-list', examples['summary card with only 1 action'])

        const $singleAction = $('.govuk-summary-card__actions > a')
        const $actionItems = $('.govuk-summary-card__action')
        equal($actionItems.length, 0)
        equal($singleAction.text().trim(), 'My lonely action (Undergraduate teaching assistant)')
      })
    })

    describe('title', () => {
      it('renders with a text title', async () => {
        const $ = await render('summary-list', examples['as a summary card with a text header'])

        const $title = $('.govuk-summary-card__title')
        ok($title.text().includes('Undergraduate teaching assistant'))
      })

      it('renders with a html title', async () => {
        const $ = await render('summary-list', examples['as a summary card with a html header'])

        const $title = $('.govuk-summary-card__title')
        ok($title.html().includes('<em>Undergraduate teaching assistant</em>'))
      })

      it('renders with a custom heading level', async () => {
        const $ = await render('summary-list', examples['as a summary card with a custom header level'])

        const $title = $('.govuk-summary-card__title')
        equal($title.get(0).tagName, 'h3')
      })
    })

    describe('custom options', () => {
      it('renders custom classes on the summary card', async () => {
        const $ = await render('summary-list', examples['summary card with custom classes'])

        const $list = $('.govuk-summary-list')
        const $card = $('.govuk-summary-card')
        equal($list.hasClass('custom-class'), false)
        ok($card.hasClass('custom-class'))
      })

      it('renders with attributes on the summary card', async () => {
        const $ = await render('summary-list', examples['summary card with custom attributes'])

        const $list = $('.govuk-summary-list')
        const $card = $('.govuk-summary-card')
        equal($list.attr('data-attribute-1'), undefined)
        equal($list.attr('data-attribute-2'), undefined)
        equal($card.attr('data-attribute-1'), 'value-1')
        equal($card.attr('data-attribute-2'), 'value-2')
      })
    })
  })
})
