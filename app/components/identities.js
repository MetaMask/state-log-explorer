const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits

module.exports = Identities

inherits(Identities, Component)
function Identities () {
  Component.call(this)
}

Identities.prototype.render = function () {
  const props = this.props
  const { address, name, importTime } = props

  const date = new Date(importTime)
  const dateString = date.toGMTString()

  const link = `https://etherscan.io/address/${address}`

  return (
    h('div', [
        h('a', {href: link, target: '_blank'}, `${address}`),
        h('span', ` (${name})`),
        h('span', ` (Imported: ${dateString})`)
    ])
  )
}
