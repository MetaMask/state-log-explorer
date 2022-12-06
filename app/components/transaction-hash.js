const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits

module.exports = TransactionHash

inherits(TransactionHash, Component)
function TransactionHash () {
  Component.call(this)
}

TransactionHash.prototype.render = function () {
  const props = this.props
  const { tx } = props

  const link = `https://blockscan.com/tx/${tx}`

  return (
    h('a', {href: link, target: '_blank'}, tx)
  )
}
