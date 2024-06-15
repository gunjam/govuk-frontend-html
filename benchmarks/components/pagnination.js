import benchmark from '../bench-component.js'

/** @typedef {import('../../components/pagination/pagination.js').paginationConfig} paginationConfig */

await benchmark({
  component: 'pagination',

  /** @type {{ [option: string]: paginationConfig }} */
  tests: {
    '3 page links and next': {
      next: {
        href: '#'
      },
      items: [
        {
          number: 1,
          current: true,
          href: '#'
        },
        {
          number: 2,
          href: '#'
        },
        {
          number: 3,
          href: '#'
        }
      ]
    },

    '3 page links, previous and next': {
      previous: {
        href: '#'
      },
      next: {
        href: '#'
      },
      items: [
        {
          number: 1,
          href: '#'
        },
        {
          number: 2,
          current: true,
          href: '#'
        },
        {
          number: 3,
          href: '#'
        }
      ]
    },

    'previous and next only': {
      previous: {
        labelText: 'Applying for a provisional lorry or bus licence',
        href: '#'
      },
      next: {
        labelText: 'Driver CPC part 1 test: theory',
        href: '#'
      }
    },

    '1 - 42, 5 page links ellipsised, previous and next': {
      previous: {
        href: '#'
      },
      next: {
        href: '#'
      },
      items: [
        {
          number: 1,
          href: '#'
        },
        {
          ellipsis: true
        },
        {
          number: 6,
          href: '#'
        },
        {
          number: 7,
          current: true,
          href: '#'
        },
        {
          number: 8,
          href: '#'
        },
        {
          ellipsis: true
        },
        {
          number: 42,
          href: '#'
        }
      ]
    },

    '3 page links and next with attributes': {
      previous: {
        href: '#'
      },
      next: {
        href: '#'
      },
      items: [
        {
          number: 1,
          href: '#'
        },
        {
          number: 2,
          current: true,
          href: '#'
        },
        {
          number: 3,
          href: '#'
        }
      ],
      attributes: {
        'arial-label': 'label',
        'data-pagination-type': 'continue'
      }
    }
  }
})
