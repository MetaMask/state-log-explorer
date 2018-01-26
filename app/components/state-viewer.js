const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const Transactions = require('./transaction-list')
const Address = require('./address')
const ethUtil = require('ethereumjs-util')
const BN = ethUtil.BN

const ETHER_SCALE = new BN('1000000000000000000', 10)

module.exports = StateViewer

inherits(StateViewer, Component)
function StateViewer () {
  Component.call(this)
}

StateViewer.prototype.render = function () {
  const props = this.props || {}
  const { parsedFile } = props
  const { version, metamask } = parsedFile
  const { selectedAddress } = metamask

  return (
    h('.state-viewer', [

      h('section.overview', {
        style: {
          padding: '5px',
          background: '#DDD',
        },
      }, [
        h('p', `MetaMask Version ${version}`),
        h('p', [
          h('span', 'Current Account: '),
          h(Address, { address: selectedAddress }),
        ]),
        this.renderBalance(),
      ]),

      h(Transactions,  { transactions: parsedFile.metamask.selectedAddressTxList }),
    ])
  )
}

StateViewer.prototype.renderBalance = function () {
  const props = this.props || {}
  const { parsedFile } = props
  const { version, metamask } = parsedFile
  const { selectedAddress, accounts } = metamask

  // Balance computing:
  const account = accounts[selectedAddress]
  const hexBalance = account.balance
  const bnBalance = new BN(ethUtil.stripHexPrefix(hexBalance), 16)
  const stringBalance = bnBalance.toString(10)

  return h('p', `Balance: ${stringBalance} wei`)
}
