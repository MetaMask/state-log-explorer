const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const Transactions = require('./transaction-list')
const Address = require('./address')
const ethUtil = require('ethereumjs-util')
const BN = ethUtil.BN

module.exports = StateViewer

inherits(StateViewer, Component)

function StateViewer () {
  Component.call(this)
}

StateViewer.prototype.render = function () {
  const props = this.props || {}
  const { parsedFile } = props
  const { version, metamask, browser } = parsedFile
  const { selectedAddress, lostIdentities } = metamask

  const anyLost = lostIdentities && Object.keys(lostIdentities).length > 0

  const transactions = metamask.transactions
    ? metamask.transactions // txs for all networks and addresses
    : metamask.selectedAddressTxList
      ? metamask.selectedAddressTxList // legacy
      : metamask.currentNetworkTxList // >=8.0.0

  return (
    h('.state-viewer', [

      h('section.overview', {
        style: {
          padding: '5px',
          background: '#DDD',
        },
      }, [
        h('p', `MetaMask Version ${version}`),
        h('div', [
          h('span', 'Current Account: '),
          h(Address, { address: selectedAddress }),
          h('p', 'Browser: ' + browser),
        ]),
        anyLost ? this.renderLost() : null,
        this.renderBalance(),
      ]),

      h(Transactions,  { transactions, isMobile: false }),
    ])
  )
}

StateViewer.prototype.renderLost = function () {
  const props = this.props || {}
  const { parsedFile } = props
  const { metamask } = parsedFile
  const { lostIdentities } = metamask

  const lost = Object.keys(lostIdentities).map((address) => {
    return h(Address, { address })
  })

  return h('p', {
    style: {
      background: 'red',
    }
  }, ['Orphaned 4457: '].concat(lost))
}

StateViewer.prototype.renderBalance = function () {
  const props = this.props || {}
  const { parsedFile } = props
  const { metamask } = parsedFile
  const { selectedAddress, accounts } = metamask

  // Balance computing:
  const account = accounts[selectedAddress]
  const hexBalance = account.balance
  const bnBalance = new BN(ethUtil.stripHexPrefix(hexBalance), 16)
  const stringBalance = bnBalance.toString(10)

  return h('p', `Balance: ${(bnBalance / 1e18).toFixed(8)} ETH (${stringBalance} wei)`)
}
