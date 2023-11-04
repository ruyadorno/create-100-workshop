export async function getNodeJSVersions() {
  const nodeJSVersionsResponse =
    await fetch('https://nodejs.org/dist/index.json')
  const nodeJSVersions  = await nodeJSVersionsResponse.json()
  return nodeJSVersions
}

