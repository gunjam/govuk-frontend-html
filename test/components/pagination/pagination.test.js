import { equal, ok } from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { getExamples, render } from '../../helper.js'

describe('Pagination', () => {
  let examples

  before(async () => {
    examples = await getExamples('pagination')
  })

  describe('default examples', () => {
    it('renders the correct URLs for each link', async () => {
      const $ = await render('pagination', examples.default)
      const $previous = $('.govuk-pagination__prev .govuk-pagination__link')
      const $next = $('.govuk-pagination__next .govuk-pagination__link')
      const $firstNumber = $('.govuk-pagination__item:first-child .govuk-pagination__link')
      const $secondNumber = $('.govuk-pagination__item:nth-child(2) .govuk-pagination__link')
      const $thirdNumber = $('.govuk-pagination__item:last-child .govuk-pagination__link')

      equal($previous.attr('href'), '/previous')
      equal($next.attr('href'), '/next')
      equal($firstNumber.attr('href'), '/page/1')
      equal($secondNumber.attr('href'), '/page/2')
      equal($thirdNumber.attr('href'), '/page/3')
    })

    it('renders the correct number within each pagination item', async () => {
      const $ = await render('pagination', examples.default)
      const $firstNumber = $('.govuk-pagination__item:first-child')
      const $secondNumber = $('.govuk-pagination__item:nth-child(2)')
      const $thirdNumber = $('.govuk-pagination__item:last-child')

      equal($firstNumber.text().trim(), '1')
      equal($secondNumber.text().trim(), '2')
      equal($thirdNumber.text().trim(), '3')
    })

    // The current item is marked up with a visually hidden span and an aria-hidden span side by side
    // Instead of the aria-label solution used for the links in the pagination because of issues caused
    // by aria-label on non-interactive elements like li's
    it('marks up the current item correctly', async () => {
      const $ = await render('pagination', examples.default)
      const $currentNumber = $('.govuk-pagination__item--current')
      const $currentNumberLink = $currentNumber.find('.govuk-pagination__link')

      equal($currentNumberLink.attr('aria-current'), 'page')
    })

    it('marks up pagination items as ellipses when specified', async () => {
      const $ = await render('pagination', examples['with many pages'])
      const $firstEllipsis = $('.govuk-pagination__item:nth-child(2).govuk-pagination__item--ellipses')

      ok($firstEllipsis)
      // Test for the unicode character of &ctdot;
      equal($firstEllipsis.text().trim(), '\u22ef')
    })
  })

  describe('with custom text, labels and landmarks', () => {
    it('renders a custom navigation landmark', async () => {
      const $ = await render('pagination', examples['with custom navigation landmark'])
      const $nav = $('.govuk-pagination')

      equal($nav.attr('aria-label'), 'search')
    })

    it('renders custom pagination item and prev/next link text', async () => {
      const $ = await render('pagination', examples['with custom link and item text'])
      const $previous = $('.govuk-pagination__prev')
      const $next = $('.govuk-pagination__next')
      const $firstNumber = $('.govuk-pagination__item:first-child')
      const $secondNumber = $('.govuk-pagination__item:nth-child(2)')
      const $thirdNumber = $('.govuk-pagination__item:last-child')

      equal($previous.text().trim(), 'Previous page')
      equal($next.text().trim(), 'Next page')
      equal($firstNumber.text().trim(), 'one')
      equal($secondNumber.text().trim(), 'two')
      equal($thirdNumber.text().trim(), 'three')
    })

    it('renders custom accessible labels for pagination items', async () => {
      const $ = await render('pagination', examples['with custom accessible labels on item links'])
      const $firstNumber = $('.govuk-pagination__item:first-child .govuk-pagination__link')
      const $secondNumber = $('.govuk-pagination__item:nth-child(2) .govuk-pagination__link')
      const $thirdNumber = $('.govuk-pagination__item:last-child .govuk-pagination__link')

      equal($firstNumber.attr('aria-label'), '1st page')
      equal($secondNumber.attr('aria-label'), '2nd page (you are currently on this page)')
      equal($thirdNumber.attr('aria-label'), '3rd page')
    })
  })

  describe('previous and next links', () => {
    it('applies the correct rel attribute to each link so that they communicate to search engines the intent of the links', async () => {
      const $ = await render('pagination', examples.default)
      const $previous = $('.govuk-pagination__prev .govuk-pagination__link')
      const $next = $('.govuk-pagination__next .govuk-pagination__link')

      equal($previous.attr('rel'), 'prev')
      equal($next.attr('rel'), 'next')
    })

    it('sets aria-hidden="true" to each link so that they are ignored by assistive technology', async () => {
      const $ = await render('pagination', examples.default)
      const $previousSvg = $('.govuk-pagination__icon--prev')
      const $nextSvg = $('.govuk-pagination__icon--next')

      equal($previousSvg.attr('aria-hidden'), 'true')
      equal($nextSvg.attr('aria-hidden'), 'true')
    })

    it('sets focusable="false" so that IE does not treat it as an interactive element', async () => {
      const $ = await render('pagination', examples.default)
      const $previousSvg = $('.govuk-pagination__icon--prev')
      const $nextSvg = $('.govuk-pagination__icon--next')

      equal($previousSvg.attr('focusable'), 'false')
      equal($nextSvg.attr('focusable'), 'false')
    })
  })

  describe('prev/next only view', () => {
    it('changes the display to prev/next only if no items are provided', async () => {
      const $ = await render('pagination', examples['with prev and next only'])
      const $blockNav = $('.govuk-pagination--block')
      const $previous = $('.govuk-pagination__prev')
      const $next = $('.govuk-pagination__next')

      ok($blockNav)
      ok($previous)
      ok($next)
    })

    it('applies labels when provided', async () => {
      const $ = await render('pagination', examples['with prev and next only and labels'])
      const $prevLabel = $('.govuk-pagination__prev .govuk-pagination__link-label')
      const $nextLabel = $('.govuk-pagination__next .govuk-pagination__link-label')

      equal($prevLabel.text(), 'Paying VAT and duty')
      equal($nextLabel.text(), 'Registering an imported vehicle')
    })

    // This is for when pagination is in block mode but there isn't a label
    // We apply a decoration class and add a hover state to the main link text instead
    // of the label so that there's a clear underline hover state on the link
    it('adds the decoration class to the link title if no label is present', async () => {
      const $ = await render('pagination', examples['with prev and next only'])
      const $decoratedPreviousLinkTitle = $('.govuk-pagination__prev .govuk-pagination__link-title--decorated')
      const $decoratedNextLinkTitle = $('.govuk-pagination__next .govuk-pagination__link-title--decorated')

      ok($decoratedPreviousLinkTitle)
      ok($decoratedNextLinkTitle)
    })
  })

  describe('custom classes and attributes', () => {
    it('renders with custom additional classes', async () => {
      const $ = await render('pagination', examples['with custom classes'])

      ok($('.govuk-pagination').hasClass('my-custom-class'))
    })

    it('renders with custom attributes', async () => {
      const $ = await render('pagination', examples['with custom attributes'])
      const $nav = $('.govuk-pagination')

      equal($nav.attr('data-attribute-1'), 'value-1')
      equal($nav.attr('data-attribute-2'), 'value-2')
    })
  })
})
