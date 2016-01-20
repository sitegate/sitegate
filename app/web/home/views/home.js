'use strict'
const privateLayout = require('../../../views/private-layout')

module.exports = opts => {
  return privateLayout(opts, {
    content: 'HOMEPAGE',
  })
}
