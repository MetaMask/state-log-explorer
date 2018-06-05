const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const ethUtil = require('ethereumjs-util')
const BN = ethUtil.BN
const GWEI_FACTOR = new BN('1000000000', 10)

module.exports = NewComponent

inherits(NewComponent, Component)
function NewComponent () {
  Component.call(this)
}

NewComponent.prototype.render = function () {
  const props = this.props
  const { transaction } = props
  const { id, time, status,
   metamaskNetworkId, txParams,
    gasLimitSpecified, estimatedGas,
    history, hash, retryCount, err } = transaction

  // Date stuff
  const date = new Date(time)
  const dateString = date.toGMTString()

  const { gasPrice } = txParams
  const gasPriceHex = ethUtil.stripHexPrefix(gasPrice)
  const gasPriceBN = new BN(gasPriceHex, 16)
  const gasPriceString = gasPriceBN.div(GWEI_FACTOR).toString(10)

  return (
    h('.tx-state-history', {
      style: {
        paddingLeft: '16px',
      },
    }, history.map((entry) => {
      return (
        h('pre', {
          overflow: 'scroll',
        }, `${JSON.stringify(entry, null, 2)}`)
      )
    }))
  )
}
