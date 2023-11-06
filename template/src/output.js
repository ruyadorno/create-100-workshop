export function printError() {
  console.error('No result found!')
}

export function printResult({ json, nodeJSVersions }) {
  if (json) {
    console.log(JSON.stringify(nodeJSVersions, null, 2))
  } else {
    if (nodeJSVersions.length && !nodeJSVersions[0]) {
      console.log(nodeJSVersions.length)
    } else {
      for (const i of nodeJSVersions) {
        console.log(i.version)
      }
    }
  }
}
