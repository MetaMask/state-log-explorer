const Component = require("react").Component
const h = require("react-hyperscript")
const inherits = require("util").inherits
const Address = require("./address")
const SignatureData = require("./signature-data")

module.exports = NewComponent

inherits(NewComponent, Component)
function NewComponent() {
  Component.call(this)
}

NewComponent.prototype.render = function () {
  const { signature } = this.props

  const date = new Date(signature.timestamp)
  const dateString = date.toGMTString()

  return h(
    `.signature.signature-stage-${signature.log.data.stage}`,
    {
      style: {
        border: "1px solid black",
      },
    },
    [
      h("p", `Time: ${dateString}`),
      h("p", `Signing method: ${signature.log.data.signingMethod}`),
      h("p", `Origin: ${signature.log.data.signingData.origin}`),
      h("p", [h("span", "From: "), h(Address, { address: signature.log.data.signingData.from })]),
      h("p", `Stage: ${signature.log.data.stage}`),
      h(SignatureData, {
        signingMethod: signature.log.data.signingMethod,
        signingData: signature.log.data.signingData,
      }),
    ],
  )
}
