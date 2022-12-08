const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const Transaction = require('./transaction')

module.exports = TransactionList

inherits(TransactionList, Component)
function TransactionList () {
  Component.call(this)
}

TransactionList.prototype.render = function () {
  const props = this.props
  const { transactions, isMobile } = props

  return (
    h('section.transactions', [
      h('h2', 'Transactions'),

      h('.transaction-list', transactions.map((transaction) => {
        return h(Transaction, { transaction, isMobile })
      }))
    ])
  )
}
