const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const Transactions = require('./transaction-list')
const Address = require('./address')
const Identities = require('./identities')
const ethUtil = require('ethereumjs-util')
const BN = ethUtil.BN

module.exports = StateViewerMobile

inherits(StateViewerMobile, Component)

function StateViewerMobile () {
  Component.call(this)
}

StateViewerMobile.prototype.render = function () {
  const props = this.props || {}
  const { parsedFile } = props
  const { engine } = parsedFile
  const { selectedAddress, lostIdentities } = engine.backgroundState.PreferencesController

  const anyLost = lostIdentities && Object.keys(lostIdentities).length > 0

  let transactions = engine.backgroundState.TransactionController.transactions;

  transactions = transactions.map(({ status, time, transaction, transactionHash, chainId }) => ({
    time,
    status,
    txParams: transaction,
    hash: transactionHash ? transactionHash : ``,
    err: ``,
    chainId
  }));

  return (
    h('.state-viewer', [

      h('section.overview', {
        style: {
          padding: '5px',
          background: '#DDD',
        },
      }, [
        h('p', `MetaMask Mobile`),
        h('div', [
          h('span', 'Current Account: '),
          h(Address, { address: selectedAddress })
        ]),
        anyLost ? this.renderLost() : null,
        this.renderBalance(),
        this.renderSecretExport(),
        this.renderIdentities()
      ]),

      h(Transactions,  { transactions, isMobile: true }),
    ])
  )
}

StateViewerMobile.prototype.renderLost = function () {
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

StateViewerMobile.prototype.renderBalance = function () {
  const props = this.props || {}
  const { parsedFile } = props
  const { engine } = parsedFile
  const { selectedAddress } = engine.backgroundState.PreferencesController
  const { accounts } = engine.backgroundState.AccountTrackerController

  // Balance computing:
  const account = accounts[selectedAddress]
  const hexBalance = account.balance
  const bnBalance = new BN(ethUtil.stripHexPrefix(hexBalance), 16)
  const stringBalance = bnBalance.toString(10)

  return h('p', `Balance: ${(bnBalance / 1e18).toFixed(8)} ETH (${stringBalance} wei)`)
}

StateViewerMobile.prototype.renderSecretExport = function () {
  const props = this.props || {}
  const { parsedFile } = props
  const { privacy } = parsedFile
  const { revealSRPTimestamps } = privacy

  return (
    h('section.srp-reveal', [
      h('h3', 'SRP Reveal Timestamps'),

      h('.srp-list', revealSRPTimestamps.map((timestamp) => {
        return h('li', timestamp)
      }))
    ])
  )
}

StateViewerMobile.prototype.renderIdentities = function () {
  const props = this.props || {}
  const { parsedFile } = props
  const { engine } = parsedFile
  const { backgroundState } = engine
  const { PreferencesController } = backgroundState
  const { identities } = PreferencesController;

  return (
    h('section.identities', [
      h('h4', 'Identities'),

      h('.identities', Object.keys(identities).map((addr) => {
        return h(Identities, { 
          address: identities[addr].address,
          name: identities[addr].name,
          importTime: identities[addr].importTime,
        })
      }))
    ])
  )
}