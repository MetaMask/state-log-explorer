const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const ethUtil = require('ethereumjs-util')
const Address = require('./address')
const TransactionHash = require('./transaction-hash')
const TxStateHistory = require('./tx-state-history')
const TxReceipt = require('./tx-receipt')
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
    return transactionMobile(transaction)
  }

  const {
    time,
    status,
    txParams,
    txReceipt,
    hash,
    baseFeePerGas,
    userEditedGasLimit,
    userFeeLevel,
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

  const baseFeePerGasHex = ethUtil.stripHexPrefix(baseFeePerGas)
  const baseFeePerGasBN = new BN(baseFeePerGasHex, 16)
  const baseFeePerGasString = baseFeePerGasBN.div(GWEI_FACTOR).toString(10)

  const { maxFeePerGas } = txParams
  const maxFeePerGasHex = ethUtil.stripHexPrefix(maxFeePerGas)
  const maxFeePerGasBN = new BN(maxFeePerGasHex, 16)
  const maxFeePerGasString = maxFeePerGasBN.div(GWEI_FACTOR).toString(10)

  const { maxPriorityFeePerGas } = txParams
  const maxPriorityFeePerGasHex = ethUtil.stripHexPrefix(maxPriorityFeePerGas)
  const maxPriorityFeePerGasBN = new BN(maxPriorityFeePerGasHex, 16)
  const maxPriorityFeePerGasString = maxPriorityFeePerGasBN.div(GWEI_FACTOR).toString(10)

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

      h('p', `Gas Limit: ${gasLimitString} ${(userEditedGasLimit ? '(User Edited)' : '')}`),

      h('p', [
        h('span', 'Gas Fees:'),
        h('span', ' '),
        h('span', `Base: ${baseFeePerGasString} gwei`),
        h('span', ' | '),
        h('span', `Max: ${maxFeePerGasString} gwei`),
        h('span', ' | '),
        h('span', `Max Priority: ${maxPriorityFeePerGasString} gwei`),
        h('span', userFeeLevel !== undefined ? ` | Fee Level: ${userFeeLevel}` : null)
      ]),

      h('p', `Status: ${status}`),

      (status === 'failed') ?
        h('p', `Reason: ${JSON.stringify(err.message)}`) : null,

      h('p', [
        h('span', 'Hash: '),
        h(TransactionHash, { tx: hash}),
      ]),

      h('details', [
        h('summary', 'History'),
        h(TxStateHistory, { transaction }),
      ]),

      (txReceipt ? 
        h('details', [
          h('summary', 'Tx Receipt'),
          h(TxReceipt, { txReceipt }),
        ]) : null
      )
    ])
  )
}

function transactionMobile(transaction) {
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

      h('p', [
        h('span', 'Hash: '),
        h(TransactionHash, { tx: hash}),
      ]),

      h('p', [
        h('span', 'ChainId: '),
        h('span', chainId),
      ]),
    ])
  )
}
