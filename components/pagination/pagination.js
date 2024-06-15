import { join } from 'node:path'
import { html } from 'ghtml'
import { includeFile } from 'ghtml/includeFile.js'
import govukAttributes from '../../utils/govuk-attributes.js'

const ARROW_PREVIOUS = includeFile(join(import.meta.dirname, './arrow-previous.svg'))
const ARROW_NEXT = includeFile(join(import.meta.dirname, './arrow-next.svg'))

/**
 * Build HTML for Previous or Next links
 * @param {boolean} blockLevel - Wether the link should be block level
 * @param {previousConfig|nextConfig} link - The link config from the pagination params
 * @param {string} linkContent - the HTML content of the link
 * @param {'previous'|'next'} type - Type of link, previous or next
 * @param {string} arrowIcon - The SVG arrow icon (<-- / -->)
 * @returns {string} link HTML
 */
function arrowLink(blockLevel, link, linkContent, type, arrowIcon) {
  let linkHtml = ''

  if (blockLevel) {
    // Block style:
    //
    // <-- Previous
    // Optional label
    // --------------
    // --> Next
    // Optional label
    linkHtml += `${arrowIcon} <span class="govuk-pagination__link-title${link.labelText ? '' : ' govuk-pagination__link-title--decorated'}">
      ${linkContent}
    </span>`

    if (link.labelText) {
      linkHtml += html`<span class="govuk-visually-hidden">:</span><span class="govuk-pagination__link-label">${link.labelText}</span>`
    }
  } else {
    // Inline style:
    //
    // <-- Previous ... Next -->
    const linkTitle = `<span class="govuk-pagination__link-title">${linkContent}</span>`
    linkHtml += type === "prev" ? `${arrowIcon} ${linkTitle}` : `${linkTitle} ${arrowIcon}`
  }

  return html`<div class="govuk-pagination__!${type}">
  <a class="govuk-link govuk-pagination__link" href="${link.href}" rel="!${type}"!${govukAttributes(link.attributes)}}>!${linkHtml}</a>
</div>`
}

/**
 * Help users navigate forwards and backwards through a series of pages. For example, search results or guidance that’s divided into multiple website pages – like {@link https://prototype-kit.service.gov.uk/v12/docs/templates/mainstream-guide the GOV.UK mainstream guide format}.
 * @param {paginationConfig} params - Pagination config options
 * @returns {string} Pagination HTML
 * @see {@link https://design-system.service.gov.uk/components/pagination/ GOV.UK Design System}
 * @example
 * ```javascript
 * govukPagination({
 *   previous: {
 *     href: '/previous'
 *   },
 *   next: {
 *     href: '/next'
 *   },
 *   items: [
 *     {
 *       number: 1,
 *       href: '/page/1'
 *     },
 *     {
 *       number: 2,
 *       href: '/page/2',
 *       current: true
 *     },
 *     {
 *       number: 3,
 *       href: '/page/3'
 *     }
 *   ]
 * })
 * ```
 */
export default function govukPagination(params) {
  const blockLevel = !params.items && (params.next || params.previous)

  let classNames = 'govuk-pagination'
  if (blockLevel) {
    classNames += ' govuk-pagination--block'
  }
  if (params.classes) {
    classNames += html` ${params.classes}`
  }

  let previousLink = ''
  if (params.previous?.href) {
    const linkContent = params.previous.html ?? html`${params.previous.text}` ?? 'Previous<span class="govuk-visually-hidden"> page</span>'
    previousLink = arrowLink(blockLevel, params.previous, linkContent, 'prev', ARROW_PREVIOUS)
  }

  let nextLink = ''
  if (params.next?.href) {
    const linkContent = params.next.html ?? html`${params.next.text}` ?? 'Next<span class="govuk-visually-hidden"> page</span>'
    nextLink = arrowLink(blockLevel, params.next, linkContent, 'next', ARROW_NEXT)
  }

  let pageLinks = ''
  if (params.items) {
    pageLinks += '<ul class="govuk-pagination__list">'

    for (const item of params.items) {
      let classNames = 'govuk-pagination__item'
      let link

      if (item.current) {
        classNames += ' govuk-pagination__item--current'
      }
      if (item.ellipsis) {
        classNames += ' govuk-pagination__item--ellipses'
        link = '&ctdot;'
      } else {
        const visuallyHiddenText = item.visuallyHiddenText ? html`${item.visuallyHiddenText}` : 'Page '
        link = html`<a class="govuk-link govuk-pagination__link" href="${item.href}" aria-label="!${visuallyHiddenText}"!${item.current ? ' aria-current="page"' : ''}!${govukAttributes(item.attributes)}>${item.number}</a>`
      }

      pageLinks += `<li class="${classNames}">${link}</li>`
    }
    pageLinks += '</ul>'
  }

  const ariaLabel = params.landmarkLabel ? html`${params.landmarkLabel}` : 'Pagination'
  return `<nav class="${classNames}" aria-label="${ariaLabel}"${govukAttributes(params.attributes)}>
  ${previousLink}
  ${pageLinks}
  ${nextLink}
</nav>`
}

/**
 * @typedef {Object} nextConfig
 * @property {string} [text] - The text content of the link to the next page. Defaults to `"Next page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored.
 * @property {string} [html] - The HTML content of the link to the next page. Defaults to `"Next page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored.
 * @property {string} [labelText] - The optional label that goes underneath the link to the next page, providing further context for the user about where the link goes.
 * @property {string} href - The next page's URL.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - The HTML attributes (for example, data attributes) you want to add to the anchor.
 */

/**
 * @typedef {Object} previousConfig
 * @property {string} [text] - The text content of the link to the previous page. Defaults to `"Previous page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored.
 * @property {string} [html] - The HTML content of the link to the previous page. Defaults to `"Previous page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored.
 * @property {string} [labelText] - The optional label that goes underneath the link to the previous page, providing further context for the user about where the link goes.
 * @property {string} href - The previous page's URL.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - The HTML attributes (for example, data attributes) you want to add to the anchor.
 */

/**
 * @typedef {Object} itemsConfig
 * @property {string} [number] - The pagination item text – usually a page number.
 * @property {string} [visuallyHiddenText] - The visually hidden label (for the pagination item) which will be applied to an `aria - label` and announced by screen readers on the pagination item link. Should include page number.
 * @property {string} href - The link's URL.
 * @property {boolean} [current] - Set to `true` to indicate the current page the user is on.
 * @property {boolean} [ellipsis] - Use this option if you want to specify an ellipsis at a given point between numbers. If you set this option as `true`, any other options for the item are ignored.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - The HTML attributes (for example, data attributes) you want to add to the anchor.
 */

/**
 * Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.
 *
 * Some options are required for the macro to work; these are marked as “Required” in the option description.
 *
 * If you’re using these components in production with “html” options, or ones ending with “html”, you must sanitise the HTML to protect against {@link https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting cross-site scripting exploits}.
 * @typedef {Object} paginationConfig
 * @property {Array.<itemsConfig>} [items] - The items within the pagination component.
 * @property {previousConfig} [previous] - A link to the previous page, if there is a previous page.
 * @property {nextConfig} [next] - A link to the next page, if there is a next page.
 * @property {string} [landmarkLabel] - The label for the navigation landmark that wraps the pagination. Defaults to `"Pagination"`.
 * @property {string} [classes] - The classes you want to add to the pagination `nav` parent.
 * @property {{ [attribute: string]: string | { value: string, optional?: boolean } } | string} [attributes] - The HTML attributes (for example, data attributes) you want to add to the pagination `nav` parent.
 */
