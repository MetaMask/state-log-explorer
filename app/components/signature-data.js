const Component = require("react").Component
const h = require("react-hyperscript")
const inherits = require("util").inherits

module.exports = SignatureList

inherits(SignatureList, Component)
function SignatureList() {
  Component.call(this)
}

SignatureList.prototype.render = function () {
  const { signingData, signingMethod } = this.props

  if (signingMethod === "personal_sign") {
    return h("div", [
      h("p", "Data: "),
      h(
        "pre",
        {
          overflow: "scroll",
        },
        `${JSON.stringify(signingData.data, null, 2)}`,
      ),
      h("p", [h("span", "Password: "), h("pre", extractAndAssemble(signingData))]),
    ])
  } else if (signingMethod === "eth_signTypedData") {
    return h("p", [
      h("span", "Data: "),
      h(
        "pre",
        {
          overflow: "scroll",
        },
        `${JSON.stringify(signingData.data, null, 2)}`,
      ),
    ])
  } else if (signingMethod === "eth_signTypedData_v3" || signingMethod === "eth_signTypedData_v4") {
    return h("p", [
      h("span", "Data: "),
      h(
        "pre",
        {
          overflow: "scroll",
        },
        `${JSON.stringify(JSON.parse(signingData.data), null, 2)}`,
      ),
    ])
  } else if (signingMethod === "eth_sign") {
    return h("p", [
      h("span", "Data: "),
      h(
        "pre",
        {
          overflow: "scroll",
        },
        `${JSON.stringify(signingData.data, null, 2)}`,
      ),
    ])
  } else {
    console.log({ signingMethod })
    return h("span", "FALLBACK")
  }
}

function extractAndAssemble(obj) {
  let resultString = ""
  let index = 0

  while (obj.hasOwnProperty(index) && obj[index] !== undefined) {
    resultString += obj[index]
    index++
  }

  return resultString
}
