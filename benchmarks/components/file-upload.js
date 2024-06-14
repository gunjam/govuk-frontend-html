import benchmark from '../bench-component.js'

/** @typedef {import('../../components/file-upload/file-upload.js').fileUploadConfig} fileUploadConfig */

await benchmark({
  component: 'file-upload',

  /** @type {{ [option: string]: fileUploadConfig }} */
  tests: {
    simple: {
      id: 'file-upload-1',
      name: 'fileUpload1',
      label: {
        text: 'Upload a file'
      }
    },

    'with error message': {
      id: 'file-upload-1',
      name: 'fileUpload1',
      label: {
        text: 'Upload a file'
      },
      errorMessage: {
        text: 'The CSV must be smaller than 2MB'
      }
    },

    'with attributes': {
      id: 'file-upload-1',
      name: 'fileUpload1',
      label: {
        text: 'Upload a file'
      },
      attributes: {
        'arial-label': 'label',
        'data-file-upload-type': 'continue'
      }
    }
  }
})
