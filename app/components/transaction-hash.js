const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits

module.exports = TransactionHash

function getBlockExplorer(hash, chainId) {
  switch(chainId.toString(10)) {
    case '1':
      return `https://etherscan.io/tx/${hash}`
    case '5':
      return `https://goerli.etherscan.io/tx/${hash}`
    case '10':
      return `https://optimistic.etherscan.io/tx/${hash}`
    case '56':
      return `https://bscscan.com/tx/${hash}`
    case '137':
      return `https://polygonscan.com/tx/${hash}`
    case '250':
      return `https://ftmscan.com/tx/${hash}`
    case '42161':
      return `https://explorer.arbitrum.io/tx/${hash}`
    case '43114':
      return `https://snowtrace.io/tx/${hash}`
    case '11155111':
      return `https://sepolia.etherscan.io/tx/${hash}`
    default:
      'https://etherscan.io/'
  }
}

inherits(TransactionHash, Component)
function TransactionHash () {
  Component.call(this)
}

TransactionHash.prototype.render = function () {
  const props = this.props
  const { tx, chainId } = props
  const link = getBlockExplorer(tx, chainId)
  return (
    h('a', {href: link, target: '_blank'}, tx)
  )
}
