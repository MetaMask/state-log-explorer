const Component = require("react").Component
const h = require("react-hyperscript")
const inherits = require("util").inherits
const Signature = require("./signature")

module.exports = SignatureList

inherits(SignatureList, Component)
function SignatureList() {
  Component.call(this)
}

SignatureList.prototype.render = function () {
  const props = this.props
  const { signatures, isMobile } = props

  return h("section.signatures", [
    h("h2", "Signatures"),
    h(
      ".signatures-list",
      signatures.map((signature) => {
        return h(Signature, { signature, isMobile })
      }),
    ),
  ])
}
