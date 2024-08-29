import { html } from 'ghtml'
import govukAttributes from '../../utils/govuk-attributes.js'

/**
 * Service navigation helps users understand that they’re using your service and lets them navigate around your service
 * @param {serviceNavigationConfig} params - Service navigation config options
 * @returns {string} Service navigation HTML
 * @see {@link https://design-system.service.gov.uk/components/service-navigation/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukServiceNavigation({
 *   serviceName: 'Service name',
 *   serviceUrl: '#',
 *   navigation: [
 *     {
 *       href: '#',
 *       text: 'Navigation item 1'
 *     },
 *     {
 *       href: '#',
 *       text: 'Navigation item 2',
 *       active: true
 *     },
 *     {
 *       href: '#',
 *       text: 'Navigation item 3'
 *     }
 *   ]
 * })
 * ```
 */
export default function govukServiceNavigation(params) {
  const menuButtonText = params.menuButtonText ? html`${params.menuButtonText}` : 'Menu'
  const navigationId = params.navigationId ? html`${params.navigationId}` : 'navigation'

  let commonAttributes = `class="govuk-service-navigation${params.classes ? html` ${params.classes}` : ''}"`
  commonAttributes += ' data-module="govuk-service-navigation"'
  commonAttributes += govukAttributes(params.attributes)

  let serviceName = ''
  if (params.serviceName) {
    serviceName += '<span class="govuk-service-navigation__service-name">'

    if (params.serviceUrl) {
      serviceName += html`<a href="${params.serviceUrl}" class="govuk-service-navigation__link">
        ${params.serviceName}
      </a>`
    } else {
      serviceName += html`<span class="govuk-service-navigation__text">
        ${params.serviceName}
      </span>`
    }

    serviceName += '</span>'
  }

  let navigation = ''
  if (params.navigation?.length > 0 || params.slots?.navigationStart || params.slots?.navigationEnd) {
    const navigationLabel = params.navigationLabel ? html`${params.navigationLabel}` : menuButtonText;
    const navigationClasses = params.navigationClasses ? html` ${params.navigationClasses}` : ''
    const menuButtonLabel = params.menuButtonLabel && params.menuButtonLabel !== menuButtonText ? html` aria-label="${params.menuButtonLabel}"` : ''

    navigation += `<nav aria-label="${navigationLabel}" class="govuk-service-navigation__wrapper${navigationClasses}">
      <button type="button" class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle" aria-controls="${navigationId}"${menuButtonLabel} hidden>
        ${menuButtonText}
      </button>
      <ul class="govuk-service-navigation__list" id="${navigationId}">`

    // Slot: navigationStart
    if (params.slots?.navigationStart) {
      navigation += params.slots.navigationStart
    }

    if (params.navigation) {
      for (const item of params.navigation) {
        const activeOrCurrent = item.active || item.current
        const ariaCurrent = activeOrCurrent ? ` aria-current="${item.current ? 'page' : 'true'}"` : ''

        // We wrap active links in strong tags so that users who override colours
        // or styles will still have some indicator of the current nav item.
        let linkInnerContent = ''
        if (activeOrCurrent) {
          linkInnerContent += `<strong class="govuk-service-navigation__active-fallback">${item.html ?? html`${item.text}`}</strong>`
        } else {
          linkInnerContent += item.html ?? html`${item.text}`
        }

        // If item.current, add active style and set aria-current="page"
        // Elseif item.active, add active style and set aria-current="true"
        navigation += `<li class="govuk-service-navigation__item${activeOrCurrent ? ' govuk-service-navigation__item--active' : ''}">`

        if (item.href) {
          const href = item.href ? html`${item.href}` : ''
          navigation += `<a class="govuk-service-navigation__link" href="${href}"${ariaCurrent}${govukAttributes(item.attributes)}>
            ${linkInnerContent}
          </a>`
        } else if (item.html || item.text) {
          navigation += `<span class="govuk-service-navigation__text"${ariaCurrent}>${linkInnerContent}</span>`
        }

        navigation += '</li>'
      }
    }

    // Slot: navigationEnd
    if (params.slots?.navigationEnd) {
      navigation += params.slots.navigationEnd
    }
    navigation += '</ul></nav>'
  }

  const innerContent = `<div class="govuk-width-container">
  ${params.slots?.start ?? ''}
  <div class="govuk-service-navigation__container">
    ${serviceName}
    ${navigation}
  </div>
  ${params.slots?.end ?? ''}
</div>`

  // If a service name is included, we use a <section> element with an
  // aria-label to create a containing landmark region. Otherwise, the <nav> in
  // the innerContent can do the job just fine by itself.
  if (params.serviceName || params.slots?.start || params.slots?.end) {
    const ariaLabel = params.ariaLabel ? html`${params.ariaLabel}` : 'Service information'
    return `<section aria-label="${ariaLabel}" ${commonAttributes}>
    ${innerContent}
  </section>`
  }

  return `<div ${commonAttributes}>
    ${innerContent}
  </div>`
}

/**
 * @typedef {Object} slotsConfig
 * @property {string} [start] - HTML injected at the start of the service header container.
 * @property {string} [end] - HTML injected at the end of the service header container.
 * @property {string} [navigationStart] - HTML injected before the first list item in the navigation list. Requires `navigation` to be set.
 * @property {string} [navigationEnd] - HTML injected after the last list item in the navigation list. Requires `navigation` to be set.
 */

/**
 * @typedef {Object} navigationConfig
 * @property {boolean} [current] - If `true`, indicates that the user is currently on this page. This takes precedence over `active`.
 * @property {boolean} [active] - If `true`, indicates that the user is within this group of pages in the navigation hierarchy.
 * @property {string} html - HTML for the navigation item. If `html` is provided, the `text` option will be ignored.
 * @property {string} text - Text for the navigation item. If `html` is provided, the `text` option will be ignored.
 * @property {string} [href] - URL of the navigation item anchor.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example data attributes) to add to the navigation item anchor.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} serviceNavigationConfig
 * @property {string} [classes] - Classes to add to the service navigation container.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - HTML attributes (for example, data attributes) to add to the service navigation container.
 * @property {string} [ariaLabel] - The text for the `aria-label` which labels the service navigation container when a service name is included. Defaults to `"Service information"`.
 * @property {string} [menuButtonText] - The text of the mobile navigation menu toggle.
 * @property {string} [menuButtonLabel] - The screen reader label for the mobile navigation menu toggle. Defaults to the same value as `menuButtonText` if not specified.
 * @property {string} [navigationLabel] - The screen reader label for the mobile navigation menu. Defaults to the same value as `menuButtonText` if not specified.
 * @property {string} [navigationId] - The ID used to associate the mobile navigation toggle with the navigation menu. Defaults to `navigation`.
 * @property {string} [navigationClasses] - Classes to add to the navigation menu container.
 * @property {string} [serviceName] - The name of your service.
 * @property {string} [serviceUrl] - The homepage of your service.
 * @property {Array.<navigationConfig>} navigation - Used to add navigation to the service header.
 * @property {slotsConfig} [slots] - Specified points for injecting custom HTML into the service header.
 */
