const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const ethUtil = require('ethereumjs-util')
const BN = ethUtil.BN
const GWEI_FACTOR = new BN('1000000000', 10)

module.exports = TxReceipt

inherits(TxReceipt, Component)
function TxReceipt () {
  Component.call(this)
}

TxReceipt.prototype.render = function () {
  const props = this.props
  const { txReceipt } = props

  if(txReceipt === undefined) {
    return h('span', '')
  }

  return (
    h('.tx-receipt', {
      style: {
        paddingLeft: '16px',
      },
    }, [
        h('pre', {
          overflow: 'scroll',
        }, `${JSON.stringify(txReceipt, null, 2)}`)
      ]
    )
  )
}
