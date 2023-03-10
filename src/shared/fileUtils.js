import axios from 'axios'

export const makeDocumentFormat = address => {
  let addr = ''
  let added = false // Just for checking if there is first item in an address line

  // First line
  if (address.street) {
    added = true
    addr += address.street
  }
  if (address.unit) {
    addr += (added ? ', ' : '') + address.unit
    added = true
  }
  if (added) {
    addr += '\n'
    added = false
  }

  // Second line
  if (address.city) {
    added = true
    addr += address.city
  }
  if (address.state) {
    addr += (added ? ', ' : '') + address.state
    added = true
  }
  if (address.zip) {
    addr += (added ? ', ' : '') + address.zip
    added = true
  }
  if (added) {
    addr += '\n'
    added = false
  }

  // Third line
  if (address.country) {
    added = true
    addr += `${address.country}\n`
  }
  return addr
}

export const getFileUrl = async (url, ext = 'pdf') => {
  return new Promise((resolve, reject) => {
    axios.post('files/url', { url })
      .then(res => {
        if (ext !== 'img') {
          ext === 'docx'
            ? window.open('#/docxviewer?docxUrl=' + res.data)
            : window.open(res.data)
        }
        resolve(res.data)
      })
      .catch(err => reject(err))
  })
}
