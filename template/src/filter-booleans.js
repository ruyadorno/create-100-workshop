export function filterBooleans({ keys, nodeJSVersions }) {
  let res = nodeJSVersions
  if (keys) {
    res = nodeJSVersions.filter(i => keys.every(j => i[j]))
  }
  return res
}
