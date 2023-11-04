export function filterRecent({ recent, nodeJSVersions }) {
  let res = nodeJSVersions
  const day = 1000 * 60 * 60 * 24
  const week = day * 7
  const month = week * 4
  const year = month * 12
  const map = new Map(Object.entries({ day, week, month, year }))

  if (recent) {
    res = nodeJSVersions.filter(i =>
      (Date.now() - Date.parse(i.date)) <= map.get(recent))
  }
  return res
}
