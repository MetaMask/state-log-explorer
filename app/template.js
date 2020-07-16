const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

module.exports = connect(mapStateToProps)(COMPONENTNAME)

function mapStateToProps (_state) {
  return {}
}

inherits(COMPONENTNAME, Component)
function COMPONENTNAME () {
  Component.call(this)
}

COMPONENTNAME.prototype.render = function () {
  const props = this.props

  return (
    h('div', {
      style: {
        background: 'blue',
      },
    }, [
      `Hello, ${props.sender}`,
    ])
  )
}
