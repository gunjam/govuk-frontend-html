import { deepEqual, equal, ok } from 'node:assert/strict'
import crypto from 'node:crypto'
import { describe, it } from 'node:test'
import * as cheerio from 'cheerio'
import { HtmlValidate } from 'html-validate/node'
import govukTemplate from '../template.js'

const validateHtml = new HtmlValidate({
  extends: ['html-validate:document'],
  rules: {
    // Allow optional subresource integrity (SRI)
    'require-sri': 'off'
  }
})

describe('Template', () => {
  describe('with default nunjucks configuration', () => {
    it('should not have any whitespace before the doctype', () => {
      const output = govukTemplate({})
      equal(output.charAt(0), '<')
    })
  })

  describe('with nunjucks block trimming enabled', () => {
    it('should not have any whitespace before the doctype', () => {
      const output = govukTemplate({})
      equal(output.charAt(0), '<')
    })
  })

  describe('<html>', () => {
    it('defaults to lang="en"', () => {
      const $ = cheerio.load(govukTemplate({}))
      equal($('html').attr('lang'), 'en')
    })

    it('can have a custom lang set using htmlLang', () => {
      const $ = cheerio.load(
        govukTemplate({
          htmlLang: 'zu'
        })
      )

      equal($('html').attr('lang'), 'zu')
    })

    it('can have custom classes added using htmlClasses', () => {
      const $ = cheerio.load(
        govukTemplate({
          htmlClasses: 'my-custom-class'
        })
      )

      ok($('html').hasClass('my-custom-class'))
    })

    it('renders valid HTML', () => {
      const output = govukTemplate({
        htmlClasses: 'my-custom-class'
      })

      ok(validateHtml.validateStringSync(output))
    })
  })

  describe('<head>', () => {
    it('can have custom social media icons specified using the headIcons block', () => {
      const $ = cheerio.load(
        govukTemplate({
          headIconsHtml: '<link rel="govuk-icon" href="/images/ytf-icon.png">'
        })
      )

      // Build a list of the rel values of all links with a rel ending 'icon'
      const icons = $('link[rel$="icon"]')
        .map((_, link) => $(link).attr('rel'))
        .get()
      deepEqual(icons, ['govuk-icon'])
    })

    it('can have additional content added to the <head> using the head block', () => {
      const $ = cheerio.load(
        govukTemplate({
          headHtml: '<meta property="foo" content="bar">'
        })
      )

      equal($('head meta[property="foo"]').attr('content'), 'bar')
    })

    it('uses a default assets path of /assets', () => {
      const $ = cheerio.load(govukTemplate({}))
      const $icon = $('link[rel="icon"][sizes="48x48"]')

      equal($icon.attr('href'), '/assets/images/favicon.ico')
    })

    it('can have the assets path overridden using assetPath', () => {
      const $ = cheerio.load(
        govukTemplate({
          assetPath: '/whatever'
        })
      )
      const $icon = $('link[rel="icon"][sizes="48x48"]')

      equal($icon.attr('href'), '/whatever/images/favicon.ico')
    })

    describe('favicons', () => {
      it('has an .ico icon', () => {
        const $ = cheerio.load(govukTemplate({}))
        const $icon = $('link[rel="icon"][href$=".ico"]')

        equal($icon.attr('sizes'), '48x48')
        equal($icon.attr('href'), '/assets/images/favicon.ico')
      })

      it('has an .svg icon', () => {
        const $ = cheerio.load(govukTemplate({}))
        const $icon = $('link[rel="icon"][href$=".svg"]')

        equal($icon.attr('sizes'), 'any')
        equal($icon.attr('href'), '/assets/images/favicon.svg')
      })

      it('has a mask-icon', () => {
        const $ = cheerio.load(govukTemplate({}))
        const $icon = $('link[rel="mask-icon"]')

        equal($icon.attr('color'), '#0b0c0c')
        equal($icon.attr('href'), '/assets/images/govuk-icon-mask.svg')
      })

      it('has an apple-touch-icon', () => {
        const $ = cheerio.load(govukTemplate({}))
        const $icon = $('link[rel="apple-touch-icon"]')

        equal($icon.attr('href'), '/assets/images/govuk-icon-180.png')
      })

      it('has a linked web manifest file', () => {
        const $ = cheerio.load(govukTemplate({}))
        const $icon = $('link[rel="manifest"]')

        equal($icon.attr('href'), '/assets/manifest.json')
      })
    })

    describe('opengraph image', () => {
      it('is not included if neither assetUrl nor opengraphImageUrl are set', () => {
        const $ = cheerio.load(govukTemplate({}))
        const $ogImage = $('meta[property="og:image"]')

        equal($ogImage.length, 0)
      })

      it('is included using default path and filename if assetUrl is set', () => {
        const $ = cheerio.load(
          govukTemplate({
            assetUrl: 'https://foo.com/my-assets'
          })
        )

        const $ogImage = $('meta[property="og:image"]')

        equal(
          $ogImage.attr('content'),
          'https://foo.com/my-assets/images/govuk-opengraph-image.png'
        )
      })

      it('is included if opengraphImageUrl is set', () => {
        const $ = cheerio.load(
          govukTemplate({
            opengraphImageUrl: 'https://foo.com/custom/og-image.png'
          })
        )

        const $ogImage = $('meta[property="og:image"]')

        equal($ogImage.attr('content'), 'https://foo.com/custom/og-image.png')
      })
    })

    describe('<meta name="theme-color">', () => {
      it('has a default content of #0b0c0c', () => {
        const $ = cheerio.load(govukTemplate({}))
        equal($('meta[name="theme-color"]').attr('content'), '#0b0c0c')
      })

      it('can be overridden using themeColor', () => {
        const $ = cheerio.load(
          govukTemplate({
            themeColor: '#ff69b4'
          })
        )

        equal($('meta[name="theme-color"]').attr('content'), '#ff69b4')
      })
    })

    // These tests use a select that specifically looks for a <title> within the <head> of the page
    // to prevent them from matching <title> elements within embedded SVGs.
    describe('<title>', () => {
      const expectedTitle = 'GOV.UK - The best place to find government services and information'

      it(`defaults to '${expectedTitle}'`, () => {
        const $ = cheerio.load(govukTemplate({}))
        equal($('head > title').text(), expectedTitle)
      })

      it('can be overridden using the pageTitle block', () => {
        const $ = cheerio.load(
          govukTemplate({
            pageTitle: 'Foo'
          })
        )

        equal($('head > title').text(), 'Foo')
      })

      it('does not have a lang attribute by default', () => {
        const $ = cheerio.load(govukTemplate({}))
        equal($('head > title').attr('lang'), undefined)
      })

      it('can have a lang attribute specified using pageTitleLang', () => {
        const $ = cheerio.load(
          govukTemplate({
            pageTitleLang: 'zu'
          })
        )

        equal($('head > title').attr('lang'), 'zu')
      })
    })
  })

  describe('<body>', () => {
    it('can have custom classes added using bodyClasses', () => {
      const $ = cheerio.load(
        govukTemplate({
          bodyClasses: 'custom-body-class'
        })
      )

      ok($('body').hasClass('custom-body-class'))
    })

    it('can have custom attributes added using bodyAttributes', () => {
      const $ = cheerio.load(
        govukTemplate({
          bodyAttributes: { 'data-foo': 'bar' }
        })
      )

      equal($('body').attr('data-foo'), 'bar')
    })

    it('can have additional content added after the opening tag using bodyStart block', () => {
      const $ = cheerio.load(
        govukTemplate({
          bodyStartHtml: '<div>bodyStart</div>'
        })
      )

      equal($('body > div:first-of-type').text(), 'bodyStart')
    })

    it('can have additional content added before the closing tag using bodyEnd block', () => {
      const $ = cheerio.load(
        govukTemplate({
          bodyEndHtml: '<div>bodyEnd</div>'
        })
      )

      equal($('body > div:last-of-type').text(), 'bodyEnd')
    })

    describe('inline script that adds "js-enabled" and "govuk-frontend-supported" classes', () => {
      it('should match the hash published in docs', () => {
        const $ = cheerio.load(govukTemplate({}))
        const script = $('body > script').first().html()

        // Create a base64 encoded hash of the contents of the script tag
        const hash = crypto.createHash('sha256').update(script).digest('base64')

        // A change to the inline script would be a breaking change, and it would also require
        // updating the hash published in https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#if-your-javascript-isn-t-working-properly
        equal(`sha256-${hash}`, 'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw=')
      })

      it('should not have a nonce attribute by default', () => {
        const $ = cheerio.load(govukTemplate({}))
        const scriptTag = $('body > script').first()

        equal(scriptTag.attr('nonce'), undefined)
      })

      it('should have a nonce attribute when nonce is provided', () => {
        const $ = cheerio.load(
          govukTemplate({
            cspNonce: 'abcdef'
          })
        )

        const scriptTag = $('body > script').first()

        equal(scriptTag.attr('nonce'), 'abcdef')
      })
    })

    describe('skip link', () => {
      it('can be overridden using the skipLink block', () => {
        const $ = cheerio.load(
          govukTemplate({
            skipLinkHtml: '<div class="my-skip-link">skipLink</div>'
          })
        )

        equal($('.my-skip-link').length, 1)
        equal($('.govuk-skip-link').length, 0)
      })
    })

    describe('header', () => {
      it('can be overridden using the header block', () => {
        const $ = cheerio.load(
          govukTemplate({
            headerHtml: '<div class="my-header">header</div>'
          })
        )

        equal($('.my-header').length, 1)
        equal($('.govuk-header').length, 0)
      })
    })

    describe('<main>', () => {
      it('can have custom classes added using mainClasses', () => {
        const $ = cheerio.load(
          govukTemplate({
            mainClasses: 'custom-main-class'
          })
        )

        ok($('main').hasClass('custom-main-class'))
      })

      it('does not have a lang attribute by default', () => {
        const $ = cheerio.load(govukTemplate({}))
        equal($('main').attr('lang'), undefined)
      })

      it('can have a lang attribute specified using mainLang', () => {
        const $ = cheerio.load(
          govukTemplate({
            mainLang: 'zu'
          })
        )

        equal($('main').attr('lang'), 'zu')
      })

      it('can be overridden using the main block', () => {
        const $ = cheerio.load(
          govukTemplate({
            mainHtml: '<main class="my-main">header</main>'
          })
        )

        equal($('main').length, 1)
        ok($('main').hasClass('my-main'))
      })

      it('can have content injected before it using the beforeContent block', () => {
        const $ = cheerio.load(
          govukTemplate({
            beforeContentHtml: '<div class="before-content">beforeContent</div>'
          })
        )

        ok($('.before-content').next().is('main'))
      })

      it('can have content specified using the content block', () => {
        const $ = cheerio.load(
          govukTemplate({
            contentHtml: 'Foo'
          })
        )

        equal($('main').text().trim(), 'Foo')
      })
    })

    describe('footer', () => {
      it('can be overridden using the footer block', () => {
        const $ = cheerio.load(
          govukTemplate({
            footerHtml: '<div class="my-footer">footer</div>'
          })
        )

        equal($('.my-footer').length, 1)
        equal($('.govuk-footer').length, 0)
      })
    })
  })
})
