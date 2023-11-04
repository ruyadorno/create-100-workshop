import semver from 'semver'

export function filterNpm({ npm, nodeJSVersions }) {
  let res = nodeJSVersions
  if (npm) {
    res = nodeJSVersions.filter(i => {
      let satisfies = false
      try {
        satisfies = semver.satisfies(i.npm, npm)
      } catch (err) {
        throw Object.assign(
          new Error(`Could not compare provided semver value: ${npm}
Make sure it's a valid semver value.`),
          { code: 'ESEMVERVALUE' }
        )
      }
      return satisfies
    })
  }
  return res
}
