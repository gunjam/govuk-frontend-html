import { join } from 'node:path'
import { html } from 'ghtml'
import { includeFile } from 'ghtml/includeFile.js'
import govukAttributes from '../../utils/govuk-attributes.js'

const LICENCE_LOGO = includeFile(join(import.meta.dirname, './licence.svg'))

/**
 * The footer provides copyright, licensing and other information about your service.
 * @param {footerConfig} params - Footer config options
 * @returns {string} Footer HTML
 * @see {@link https://design-system.service.gov.uk/components/footer/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukFooter({
 *   navigation: [
 *     {
 *        title: 'Coronavirus (COVID-19)',
 *        width: 'two-thirds',
 *        items: [
 *          {
 *            href: '/coronavirus',
 *            text: 'Coronavirus (COVID-19): guidance and support'
 *          }
 *        ]
 *      }
 *   ],
 *   meta: {
 *     items: [
 *       {
 *         href: '/help',
 *         text: 'Help'
 *       },
 *       {
 *         href: '/help/cookies',
 *         text: 'Cookies'
 *       }
 *     ],
 *     html: 'Built by the <a class="govuk-footer__link" href="#">Government Digital Service</a>'
 *   }
 * })
 * ```
 */
export default function govukFooter(params) {
  let contentLicence = `All content is available under the
  <a
    class="govuk-footer__link"
    href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
    rel="license"
  >Open Government Licence v3.0</a>, except where otherwise stated`
  let copyright = '© Crown copyright'
  let navigation = ''
  let meta = ''

  if (params.navigation?.length > 0) {
    navigation += '<div class="govuk-footer__navigation">'

    for (const nav of params.navigation) {
      const width = nav.width ? html`${nav.width}` : 'full'
      navigation += html`<div class="govuk-footer__section govuk-grid-column-!${width}">
  <h2 class="govuk-footer__heading govuk-heading-m">${nav.title}</h2>`

      if (nav.items?.length > 0) {
        navigation += html`<ul class="govuk-footer__list govuk-footer__list--columns-${nav.columns}">`

        for (const item of nav.items) {
          if (item.href && item.text) {
            navigation += html`<li class="govuk-footer__list-item">
              <a class="govuk-footer__link" href="${item.href}"
                !${govukAttributes(item.attributes)}>
                ${item.text}
              </a>
            </li>`
          }
        }
        navigation += '</ul>'
      }
      navigation += '</div>'
    }
    navigation += '</div><hr class="govuk-footer__section-break">'
  }

  if (params.meta) {
    const title = params.meta.visuallyHiddenTitle ? html`${params.meta.visuallyHiddenTitle}` : 'Support links'
    meta += `<h2 class="govuk-visually-hidden">${title}</h2>`

    if (params.meta.items?.length > 0) {
      meta += '<ul class="govuk-footer__inline-list">'

      for (const item of params.meta.items) {
        meta += html`<li class="govuk-footer__inline-list-item">
          <a class="govuk-footer__link" href="${item.href}"!${govukAttributes(item.attributes)}>
            ${item.text}
          </a>
        </li>`
      }
      meta += '</ul>'
    }
    if (params.meta.text || params.meta.html) {
      meta += `<div class="govuk-footer__meta-custom">
        ${params.meta.html ?? html`${params.meta.text}`}
      </div>`
    }
  }

  if (params.contentLicence?.html || params.contentLicence?.text) {
    contentLicence = params.contentLicence.html ?? html`${params.contentLicence.text}`
  }

  if (params.copyright?.html || params.copyright?.text) {
    copyright = params.copyright.html ?? html`${params.copyright.text}`
  }

  return html`<footer class="govuk-footer ${params.classes}"!${govukAttributes(params.attributes)}>
  <div class="govuk-width-container ${params.containerClasses}">
    !${navigation}
    <div class="govuk-footer__meta">
      <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
        !${meta}
        !${LICENCE_LOGO}
        <span class="govuk-footer__licence-description">
          !${contentLicence}
        </span>
      </div>
      <div class="govuk-footer__meta-item">
        <a
          class="govuk-footer__link govuk-footer__copyright-logo"
          href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
        >
        !${copyright}
        </a>
      </div>
    </div>
  </div>
</footer>`
}

/**
 * @typedef {Object} copyrightConfig
 * @property {string} [text] - If `html` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, `"© Crown copyright"` is used.
 * @property {string} [html] - If `text` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, `"© Crown copyright"` is used. The copyright notice is inside an `<a>` element, so you can only use text formatting elements within it.
 */

/**
 * @typedef {Object} contentLicenceConfig
 * @property {string} [text] - If `html` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, the text for the Open Government Licence is used.
 * @property {string} [html] - If `text` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, the text for the Open Government Licence is used. The content licence is inside a `<span>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {string} text - List item text in the navigation section of the footer.
 * @property {string} href - List item link `href` attribute in the navigation section of the footer. Both `text` and `href` attributes need to be present to create a link.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the anchor in the footer navigation section.
 */

/**
 * @typedef {Object} navigationConfig
 * @property {string} title - Title for a section.
 * @property {integer} [columns] - Amount of columns to display items in navigation section of the footer.
 * @property {string} [width] - Width of each navigation section in the footer. You can pass any Design System grid width here – for example, `"one-third"`, `"two-thirds"` or `"one-half"`. Defaults to `"full"`.
 * @property {Array.<itemsConfig>} [items] - The items within the navigation section of the footer component.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {string} text - List item text in the meta section of the footer.
 * @property {string} href - List item link `href` attribute in the meta section of the footer.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the anchor in the footer meta section.
 */

/**
 * @typedef {Object} metaConfig
 * @property {string} [visuallyHiddenTitle] - Title for a meta item section. Defaults to `"Support links"`.
 * @property {string} [html] - HTML to add to the meta section of the footer, which will appear below any links specified using meta `items`.
 * @property {string} [text] - Text to add to the meta section of the footer, which will appear below any links specified using meta `items`. If meta `html` is specified, this option is ignored.
 * @property {Array.<itemsConfig>} [items] - The meta `items` add content within a unordered list to the meta section of the footer component. These appear above any text or custom html in the meta section.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} footerConfig
 * @property {metaConfig} [meta] - The meta section of the footer after any navigation, before the copyright and license information.
 * @property {Array.<navigationConfig>} [navigation] - The navigation section of the footer before a section break and the copyright and license information.
 * @property {contentLicenceConfig} [contentLicence] - The content licence information within the footer component. Defaults to Open Government Licence (OGL) v3 licence.
 * @property {copyrightConfig} [copyright] - The copyright information in the footer component, this defaults to `"© Crown copyright"`.
 * @property {string} [containerClasses] - Classes that can be added to the inner container, useful if you want to make the footer full width.
 * @property {string} [classes] - Classes to add to the footer component container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the footer component container.
 */
