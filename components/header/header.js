import { join } from 'node:path'
import { html } from 'ghtml'
import { includeFile } from 'ghtml/includeFile.js'
import attribute from '../../utils/attribute.js'
import govukAttributes from '../../utils/govuk-attributes.js'

const GOVUK_ST_EDWARDS_CROWN = includeFile(join(import.meta.dirname, './govuk-st-edwards-crown.svg'))
const GOVUK_TUDOR_CROWN = includeFile(join(import.meta.dirname, './govuk-tudor-crown.svg'))

/**
 * The GOV.UK header shows users that they are on GOV.UK and which service they are using.
 * @param {headerConfig} params - Header config options
 * @returns {string} Header HTML
 * @see {@link https://design-system.service.gov.uk/components/header/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukHeader({
 *   homepageUrl: 'https://gov.uk',
 *   serviceName: 'Service name',
 *   serviceUrl: '/'
 * })
 * ```
 */
export default function govukHeader(params) {
  const menuButtonText = params.menuButtonText ?? 'Menu'
  const menuButtonLabel = params.menuButtonLabel ?? menuButtonText

  let navigation = ''
  let serviceName = ''

  // Add service name if specified
  if (params.serviceName) {
    serviceName += params.serviceUrl
      ? html`<a href="${params.serviceUrl}" class="govuk-header__link govuk-header__service-name">${params.serviceName}</a>`
      : html`<span class="govuk-header__service-name">${params.serviceName}</span>`
  }

  // Build navigation if items supplied
  if (params.navigation?.length > 0) {
    const label = params.navigationLabel ?? menuButtonText
    const menuLabel = menuButtonLabel !== menuButtonText
      ? attribute('aria-label', menuButtonLabel)
      : ''

    let navigationItems = ''

    for (const item of params.navigation) {
      if (item.html || item.text) {
        let linkOpen = ''
        let linkClose = ''

        if (item.href) {
          linkOpen += html`<a class="govuk-header__link" href="${item.href}"!${govukAttributes(item.attributes)}>`
          linkClose += '</a>'
        }

        navigationItems += `<li class="govuk-header__navigation-item${item.active ? ' govuk-header__navigation-item--active' : ''}">
          ${linkOpen}${item.html ?? html` ${item.text}`}${linkClose}
        </li>`
      }
    }

    navigation += html`<nav aria-label="${label}" class="govuk-header__navigation ${params.navigationClasses}">
      <button type="button" class="govuk-header__menu-button govuk-js-header-toggle" aria-controls="navigation" !${menuLabel} hidden>
        ${menuButtonText}
      </button>
      <ul id="navigation" class="govuk-header__navigation-list">
        !${navigationItems}
      </ul>
    </nav>`
  }

  return html`<header class="govuk-header ${params.classes}" data-module="govuk-header"!${govukAttributes(params.attributes)}>
  <div class="govuk-header__container!${params.containerClasses ? html` ${params.containerClasses}` : ' govuk-width-container'}">
    <div class="govuk-header__logo">
      <a href="${params.homepageUrl ?? '/'}" class="govuk-header__link govuk-header__link--homepage">
        !${params.useTudorCrown === false ? GOVUK_ST_EDWARDS_CROWN : GOVUK_TUDOR_CROWN}
        <span class="govuk-header__product-name">
          ${params.productName}
        </span>
      </a>
    </div>
    !${serviceName || navigation ? `<div class="govuk-header__content">${serviceName}${navigation}</div>` : ''}
  </div>
</header>`
}

/**
 * @typedef {Object} navigationConfig
 * @property {string} text - Text for the navigation item. If `html` is provided, the `text` option will be ignored.
 * @property {string} html - HTML for the navigation item. If `html` is provided, the `text` option will be ignored.
 * @property {string} [href] - URL of the navigation item anchor.
 * @property {boolean} [active] - Flag to mark the navigation item as active or not.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the navigation item anchor.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} headerConfig
 * @property {string} [homepageUrl] - The URL of the homepage. Defaults to `"/"`.
 * @property {string} [productName] - Product name, used when the product name follows on directly from ‘GOV.UK’. For example, GOV.UK Pay or GOV.UK Design System. In most circumstances, you should use `serviceName`.
 * @property {string} [serviceName] - The name of your service, included in the header.
 * @property {string} [serviceUrl] - URL for the service name anchor.
 * @property {Array.<navigationConfig>} [navigation] - Can be used to add navigation to the header component.
 * @property {string} [navigationClasses] - Classes for the navigation section of the header.
 * @property {string} [navigationLabel] - Text for the `aria-label` attribute of the navigation. Defaults to the same value as `menuButtonText`.
 * @property {string} [menuButtonLabel] - Text for the `aria-label` attribute of the button that opens the mobile navigation, if there is a mobile navigation menu.
 * @property {string} [menuButtonText] - Text of the button that opens the mobile navigation menu, if there is a mobile navigation menu. There is no enforced character limit, but there is a limited display space so keep text as short as possible. By default, this is set to 'Menu'.
 * @property {string} [containerClasses] - Classes for the container, useful if you want to make the header fixed width.
 * @property {string} [classes] - Classes to add to the header container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the header container.
 * @property {boolean} [useTudorCrown] - Deprecated. If `true`, uses the Tudor crown from King Charles III's royal cypher. Otherwise, uses the St. Edward's crown. Default is `true`.
 */
