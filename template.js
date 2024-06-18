import { html } from 'ghtml'
import govukFooter from './components/footer/footer.js'
import govukHeader from './components/header/header.js'
import govukSkipLink from './components/skip-link/skip-link.js'
import attribute from './utils/attribute.js'
import govukAttributes from './utils/govuk-attributes.js'

/**
 * Use this template to keep your pages consistent with the rest of GOV.UK.
 *
 * This page template combines the boilerplate markup and components needed for a basic GOV.UK page. It includes:
 *
 * * JavaScript that adds a .govuk-frontend-supported class, which is required by components with JavaScript behaviour
 * * the skip link, header and footer components
 * * the favicon, and other related theme icons
 *
 * @param {templateConfig} params - Template config options
 * @returns {string} Template HTML
 * @see {@link https://design-system.service.gov.uk/styles/page-template/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukTemplate({
 *   headHtml: '<link rel="stylesheet" href="/stylesheets/govuk-frontend.min.css">',
 *   contentHtml: '<h1 class="govuk-heading-xl">Default page template</h1>',
 *   bodyEndHtml: `<script type="module" src="/javascripts/govuk-frontend.min.js"></script>
 *     <script type="module">
 *       import { initAll } from '/javascripts/govuk-frontend.min.js'
 *       initAll()
 *     </script>`
 * })
 * ```
 */
export default function govukTemplate(params) {
  // Hardcoded value of $govuk-black
  const themeColor = params.themeColor ? html`${params.themeColor}` : '#0b0c0c'
  const assetPath = params.assetPath ? html`${params.assetPath}` : '/assets'

  return html`<!DOCTYPE html>
    <html lang="!${params.htmlLang ? html`${params.htmlLang}` : 'en'}" class="govuk-template!${params.htmlClasses ? html` ${params.htmlClasses}` : ''}">
    <head>
      <meta charset="utf-8">
      <title!${attribute('lang', params.pageTitleLang)}>!${params.pageTitle ? html`${params.pageTitle}` : 'GOV.UK - The best place to find government services and information'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
      <meta name="theme-color" content="!${themeColor}">

      !${
        params.headIconsHtml ??
        `<link rel="icon" sizes="48x48" href="${assetPath}/images/favicon.ico">
        <link rel="icon" sizes="any" href="${assetPath}/images/favicon.svg" type="image/svg+xml">
        <link rel="mask-icon" href="${assetPath}/images/govuk-icon-mask.svg" color="${themeColor}">
        <link rel="apple-touch-icon" href="${assetPath}/images/govuk-icon-180.png">
        <link rel="manifest" href="${assetPath}/manifest.json">`
      }

      !${params.headHtml}

      !${
        params.opengraphImageUrl || params.assetUrl
          ? // OpenGraph images needs to be absolute, so we need either a URL for the image or for assetUrl to be set
            `<meta property="og:image" content="${params.opengraphImageUrl ? html`${params.opengraphImageUrl}` : `${params.assetUrl}/images/govuk-opengraph-image.png`}">`
          : ''
      }

    </head>
    <body class="govuk-template__body!${params.bodyClasses ? html` ${params.bodyClasses}` : ''}"!${govukAttributes(params.bodyAttributes)}>
      <script!${attribute('nonce', params.cspNonce)}>document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');</script>
      !${params.bodyStartHtml}

      !${params.skipLinkHtml ?? govukSkipLink({ href: '#content', text: 'Skip to main content' })}

      !${params.headerHtml ?? govukHeader({})}

      !${
        params.mainHtml ??
        `<div class="govuk-width-container${params.containerClasses ? html` ${params.containerClasses}` : ''}">
        ${params.beforeContentHtml ?? ''}
        <main class="govuk-main-wrapper${params.mainClasses ? html` ${params.mainClasses}` : ''}" id="main-content"${attribute('lang', params.mainLang)}>
          ${params.contentHtml}
        </main>
      </div>`
      }

      !${params.footerHtml ?? govukFooter({})}

      !${params.bodyEndHtml}
    </body>
  </html>`
}

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} templateConfig
 * @property {string} [assetPath] - Specify a path to the {@link https://frontend.design-system.service.gov.uk/import-font-and-images-assets/ GOV.UK Frontend assets} (icons, images, font files).
 * @property {string} [assetUrl] - Set the domain for assets where an absolute URL is required, for example the Open Graph image.
 * @property {string} [beforeContentHtml] - Add content that needs to appear outside `<main>` element. For example: The {@link https://design-system.service.gov.uk/components/back-link/ back link} component, {@link https://design-system.service.gov.uk/components/breadcrumbs/ breadcrumbs} component, {@link https://design-system.service.gov.uk/components/phase-banner/ phase banner} component.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [bodyAttributes] - Add attributes to the `<body>` element. Add each attribute and its value in the `bodyAttributes` object.
 * @property {string} [bodyClasses] - Add a class to the <body> element.
 * @property {string} [bodyEndHtml] - Add content just before the closing `</body>` element.
 * @property {string} [bodyStartHtml] - Add content after the opening `<body>` element. For example: The {@link https://design-system.service.gov.uk/components/cookie-banner/ cookie banner} component.
 * @property {string} [containerClasses] - Add a class to the container. This is useful if you want to make the page wrapper a fixed width.
 * @property {string} [contentHtml] - Add content that needs to appear centered in the `<main>` element.
 * @property {string} [cspNonce] - Add a `nonce` attribute to the script for your content Security Policy (CSP). Provide a nonce that hostile actors cannot guess, as otherwise they can easily find a way around your CSP. However, you should use this attribute only if you’re not able to {@link https://frontend.design-system.service.gov.uk/import-javascript/#if-our-inline-javascript-snippet-is-blocked-by-a-content-security-policy include the hash for the inline scripts in your service’s CSP}.
 * @property {string} [footerHtml] - Override the default {@link https://design-system.service.gov.uk/components/footer/ footer} component.
 * @property {string} [headHtml] - Add additional items inside the `<head>` element. For example: `<meta name="description" content="My page description">`.
 * @property {string} [headerHtml] - Override the default {@link https://design-system.service.gov.uk/components/header/ header} component.
 * @property {string} [headIconsHtml] - Override the default icons used for GOV.UK branded pages. For example: `<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />`.
 * @property {string} [htmlClasses] - Add a class to the `<html>` element.
 * @property {string} [htmlLang] - Set the language of the whole document. If your `<title>` and `<main>` element are in a different language to the rest of the page, use `htmlLang` to set the language of the rest of the page.
 * @property {string} [mainHtml] - Override the main section of the page, which by default wraps the `<main>` element, `beforeContentHtml` block and `contentHtml` block.
 * @property {string} [mainClasses] - Add a class to the `<main>` element.
 * @property {string} [mainLang] - Set the language of the `<main>` element if it’s different to `htmlLang`.
 * @property {string} [opengraphImageUrl] - Set the URL for the Open Graph image meta tag. The URL must be absolute, including the protocol and domain name.
 * @property {string} [pageTitle] - Override the default page title (`<title>` element).
 * @property {string} [pageTitleLang] - Set the language of the `<title>` element if it’s different to `htmlLang`.
 * @property {string} [skipLinkHtml] - Override the default {@link https://design-system.service.gov.uk/components/skip-link/ skip link} component.
 * @property {string} [themeColor] - Set the {@link https://developer.chrome.com/blog/support-for-theme-color-in-chrome-39-for-android toolbar colour on some devices}.
 */
