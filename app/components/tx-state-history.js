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
  const {
    history,
    // time,
    // txParams,
    // hash,
    // id,
    // metamaskNetworkId,
    // gasLimitSpecified,
    // estimatedGas,
    // history,
    // retryCount,
    // status,
    // err,
  } = transaction

  if (!history) {
    return null;
  }

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
