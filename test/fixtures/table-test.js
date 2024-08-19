import { deepEqual, equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Table', () => {
  let examples

  before(async () => {
    examples = await getExamples('table')
  })

  it('can have additional classes', async () => {
    const $ = await render('table', examples.classes)

    ok($('.govuk-table').hasClass('custom-class-goes-here'))
  })

  it('can have additional attributes', async () => {
    const $ = await render('table', examples.attributes)

    equal($('.govuk-table').attr('data-foo'), 'bar')
  })

  // =========================================================
  // Captions
  // =========================================================

  describe('captions', () => {
    it('can have custom text', async () => {
      const $ = await render('table', examples['table with head and caption'])
      const $caption = $('.govuk-table__caption')

      equal($caption.text(), 'Caption 1: Months and rates')
    })

    it('can have additional classes', async () => {
      const $ = await render('table', examples['table with head and caption'])
      const $caption = $('.govuk-table__caption')

      ok($caption.hasClass('govuk-table__caption--m'))
    })
  })

  // =========================================================
  // Column headers
  // =========================================================

  describe('column headers', () => {
    it('can be specified', async () => {
      const args = examples['table with head']
      const $ = await render('table', args)

      const headings = $('.govuk-table')
        .find('thead tr th')
        .map((_, e) => $(e).text())
        .get()

      deepEqual(headings, [
        'Month you apply',
        'Rate for bicycles',
        'Rate for vehicles'
      ])
    })

    it('have HTML escaped when passed as text', async () => {
      const $ = await render('table', examples['html as text'])

      const $th = $('.govuk-table thead tr th')

      equal($th.html(), 
        'Foo &lt;script&gt;hacking.do(1337)&lt;/script&gt;'
      )
    })

    it('allow HTML when passed as HTML', async () => {
      const $ = await render('table', examples.html)

      const $th = $('.govuk-table thead tr th')

      equal($th.html(), 'Foo <span>bar</span>')
    })

    it('can have a format specified', async () => {
      const $ = await render('table', examples['table with head'])

      const $th = $('.govuk-table thead tr th')

      ok($th.hasClass('govuk-table__header--numeric'))
    })

    it('can have additional classes', async () => {
      const $ = await render('table', examples['head with classes'])

      const $th = $('.govuk-table thead tr th')

      ok($th.hasClass('my-custom-class'))
    })

    it('can have rowspan specified', async () => {
      const $ = await render('table', examples['head with rowspan and colspan'])

      const $th = $('.govuk-table thead tr th')

      equal($th.attr('rowspan'), '2')
    })

    it('can have colspan specified', async () => {
      const $ = await render('table', examples['head with rowspan and colspan'])

      const $th = $('.govuk-table thead tr th')

      equal($th.attr('colspan'), '2')
    })

    it('can have additional attributes', async () => {
      const $ = await render('table', examples['head with attributes'])

      const $th = $('.govuk-table thead tr th')

      equal($th.attr('data-fizz'), 'buzz')
    })
  })

  // =========================================================
  // Row headers
  // =========================================================

  describe('row headers', () => {
    describe('when firstCellIsHeader is false', () => {
      it('are not included', async () => {
        const $ = await render('table', examples.default)

        const cells = $('.govuk-table')
          .find('tbody tr td')
          .map((_, e) => $(e).text())
          .get()

        deepEqual(cells, [
          'January',
          '£85',
          '£95',
          'February',
          '£75',
          '£55',
          'March',
          '£165',
          '£125'
        ])
      })
    })

    describe('when firstCellIsHeader is true', () => {
      it('are included', async () => {
        const $ = await render('table', examples['with firstCellIsHeader true'])

        const headings = $('.govuk-table')
          .find('tbody tr th')
          .map((_, e) => $(e).text())
          .get()

        deepEqual(headings, ['January', 'February', 'March'])
      })

      it('have HTML escaped when passed as text', async () => {
        const $ = await render(
          'table',
          examples['firstCellIsHeader with html as text']
        )

        const $th = $('.govuk-table tbody tr th')

        equal($th.html(), 
          'Foo &lt;script&gt;hacking.do(1337)&lt;/script&gt;'
        )
      })

      it('allow HTML when passed as HTML', async () => {
        const $ = await render('table', examples['firstCellIsHeader with html'])

        const $th = $('.govuk-table tbody tr th')

        equal($th.html(), 'Foo <span>bar</span>')
      })

      it('are associated with their rows using scope="row"', async () => {
        const $ = await render('table', examples['with firstCellIsHeader true'])

        const $th = $('.govuk-table').find('tbody tr th')

        equal($th.attr('scope'), 'row')
      })

      it('have the govuk-table__header class', async () => {
        const $ = await render('table', examples['with firstCellIsHeader true'])

        const $th = $('.govuk-table').find('tbody tr th')

        ok($th.hasClass('govuk-table__header'))
      })

      it('can have additional classes', async () => {
        const $ = await render('table', examples['firstCellIsHeader with classes'])

        const $th = $('.govuk-table').find('tbody tr th')

        ok($th.hasClass('my-custom-class'))
      })

      it('can have rowspan specified', async () => {
        const $ = await render(
          'table',
          examples['firstCellIsHeader with rowspan and colspan']
        )

        const $th = $('.govuk-table').find('tbody tr th')

        equal($th.attr('rowspan'), '2')
      })

      it('can have colspan specified', async () => {
        const $ = await render(
          'table',
          examples['firstCellIsHeader with rowspan and colspan']
        )

        const $th = $('.govuk-table').find('tbody tr th')

        equal($th.attr('colspan'), '2')
      })

      it('can have additional attributes', async () => {
        const $ = await render('table', examples['firstCellIsHeader with attributes'])

        const $th = $('.govuk-table').find('tbody tr th')

        equal($th.attr('data-fizz'), 'buzz')
      })
    })
  })

  // =========================================================
  // Cells
  // =========================================================

  describe('cells', () => {
    it('can be specified', async () => {
      const $ = await render('table', examples.default)

      const cells = $('.govuk-table')
        .find('tbody tr')
        .map((_, tr) => {
          return [
            $(tr)
              .find('td')
              .map((_, td) => $(td).text())
              .get()
          ]
        })
        .get()

      deepEqual(cells, [
        ['January', '£85', '£95'],
        ['February', '£75', '£55'],
        ['March', '£165', '£125']
      ])
    })

    it('can be skipped when falsy', async () => {
      const $ = await render('table', examples['with falsy items'])

      const cells = $('.govuk-table')
        .find('tbody tr')
        .map((_, tr) => {
          return [
            $(tr)
              .find('td')
              .map((_, td) => $(td).text())
              .get()
          ]
        })
        .get()

      deepEqual(cells, [
        ['A', '1'],
        ['B', '2'],
        ['C', '3']
      ])
    })

    it('have HTML escaped when passed as text', async () => {
      const $ = await render('table', examples['html as text'])

      const $td = $('.govuk-table td')

      equal($td.html(), 
        'Foo &lt;script&gt;hacking.do(1337)&lt;/script&gt;'
      )
    })

    it('allow HTML when passed as HTML', async () => {
      const $ = await render('table', examples.html)

      const $td = $('.govuk-table td')

      equal($td.html(), 'Foo <span>bar</span>')
    })

    it('can have a format specified', async () => {
      const $ = await render('table', examples.default)

      const $td = $('.govuk-table td')

      ok($td.hasClass('govuk-table__cell--numeric'))
    })

    it('can have additional classes', async () => {
      const $ = await render('table', examples['rows with classes'])

      const $td = $('.govuk-table td')

      ok($td.hasClass('my-custom-class'))
    })

    it('can have rowspan specified', async () => {
      const $ = await render('table', examples['rows with rowspan and colspan'])

      const $td = $('.govuk-table td')

      equal($td.attr('rowspan'), '2')
    })

    it('can have colspan specified', async () => {
      const $ = await render('table', examples['rows with rowspan and colspan'])

      const $td = $('.govuk-table td')

      equal($td.attr('colspan'), '2')
    })

    it('can have additional attributes', async () => {
      const $ = await render('table', examples['rows with attributes'])

      const $td = $('.govuk-table td')

      equal($td.attr('data-fizz'), 'buzz')
    })
  })
})
