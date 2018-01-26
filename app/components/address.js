const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits

module.exports = Address

inherits(Address, Component)
function Address () {
  Component.call(this)
}

Address.prototype.render = function () {
  const props = this.props
  const { address } = props

  const link = `https://etherscan.io/address/${address}`

  return (
    h('a', {href: link}, address)
  )
}
