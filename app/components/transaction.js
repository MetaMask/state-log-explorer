const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const ethUtil = require('ethereumjs-util')
const Address = require('./address')
const TxStateHistory = require('./tx-state-history')
const BN = ethUtil.BN
const GWEI_FACTOR = new BN('1000000000', 10)

module.exports = NewComponent

inherits(NewComponent, Component)
function NewComponent () {
  Component.call(this)
}

NewComponent.prototype.render = function () {
  const props = this.props
  const { transaction, isMobile } = props

  if(isMobile) {
    return TransactionMobile(transaction)
  }

  const {
    time,
    status,
    txParams,
    hash,
    err,
    // id,
    // metamaskNetworkId,
    // gasLimitSpecified,
    // estimatedGas,
    // history,
    // retryCount,
  } = transaction

  // Date stuff
  const date = new Date(time)
  const dateString = date.toGMTString()

  const { gasPrice } = txParams
  const gasPriceHex = ethUtil.stripHexPrefix(gasPrice)
  const gasPriceBN = new BN(gasPriceHex, 16)
  const gasPriceString = gasPriceBN.div(GWEI_FACTOR).toString(10)

  const { gas } = txParams
  const gasLimitHex = ethUtil.stripHexPrefix(gas)
  const gasLimitBN = new BN(gasLimitHex, 16)
  const gasLimitString = gasLimitBN.toString(10)

  const valueHex = ethUtil.stripHexPrefix(txParams.value)
  const valueBn = new BN(valueHex, 16)
  const valueStr = valueBn.toString(10)

  return (
    h(`.transaction.transaction-status-${status}`, {
      style: {
        border: '1px solid black',
      },
    }, [

      h('p', `Time: ${dateString}`),

      h('p', [
        h('span', 'From: '),
        h(Address, { address:  txParams.from}),
      ]),

      h('p', [
        h('span', 'To: '),
        h(Address, { address:  txParams.to}),
      ]),

      h('p', [
        h('span', 'Value: '),
        h('span', valueStr),
        h('span', ' wei'),
      ]),

      h('p', `Nonce: ${txParams.nonce} ` + (txParams.nonce ? `(${parseInt(txParams.nonce)})` : '')),

      h('p', `Gas Price: ${gasPriceString} gwei`),

      h('p', `Gas Limit: ${gasLimitString}`),

      h('p', `Status: ${status}`),

      (status === 'failed') ?
        h('p', `Reason: ${JSON.stringify(err.message)}`) : null,

      h('p', `Hash: ${hash}`),

      h('details', [
        h('summary', 'History'),
        h(TxStateHistory, { transaction }),
      ]),
    ])
  )
}

function TransactionMobile(transaction) {
  const {
    time,
    status,
    txParams,
    hash,
    chainId,
  } = transaction

  const date = new Date(time)
  const dateString = date.toGMTString()

  const valueHex = ethUtil.stripHexPrefix(txParams.value)
  const valueBn = new BN(valueHex, 16)
  const valueStr = valueBn.toString(10)

  return (
    h(`.transaction.transaction-status-${status}`, {
      style: {
        border: '1px solid black',
      },
    }, [

      h('p', `Time: ${dateString}`),

      h('p', [
        h('span', 'From: '),
        h(Address, { address:  txParams.from}),
      ]),

      h('p', [
        h('span', 'To: '),
        h(Address, { address:  txParams.to}),
      ]),

      h('p', [
        h('span', 'Value: '),
        h('span', valueStr),
        h('span', ' wei'),
      ]),

      h('p', [
        h('span', 'Status: '),
        h('span', status),
      ]),

      h('p', `Hash: ${hash}`),

      h('p', [
        h('span', 'ChainId: '),
        h('span', chainId),
      ]),
    ])
  )
}
