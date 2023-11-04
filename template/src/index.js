import { getNodeJSVersions } from './retrieve-nodejs-versions.js'
import { formatCount } from './format-count.js'
import { filterBooleans } from './filter-booleans.js'
import { filterNpm } from './filter-npm.js'
import { filterRecent } from './filter-recent.js'

export async function main(options) {
  let res = await getNodeJSVersions()
  const {
    count,
    filter: keys,
    npm,
    recent,
  } = options

  res = filterBooleans({ keys, nodeJSVersions: res })
  res = filterNpm({ npm, nodeJSVersions: res })
  res = filterRecent({ recent, nodeJSVersions: res })

  if (count) {
    return formatCount({nodeJSVersions: res})
  }

  return res
}
