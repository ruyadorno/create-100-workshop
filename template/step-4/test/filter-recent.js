import t from 'tap'

const { filterRecent } = (await t.mockImport('../src/filter-recent.js', {
  '../src/date.js': {
    elapsed(releaseDate) {
      if (releaseDate === '1970-01-08') {
        return 1
      } else {
        return 86400001
      }
    }
  }
}))

const nodeJSVersions = [
  {
    name: 'v21.1.0',
    date: '1970-01-08',
  },
  {
    name: 'v21.0.0',
    date: '1970-01-01',
  }
]

t.match(
  filterRecent({ recent: 'day', nodeJSVersions }),
  [{
    name: 'v21.1.0',
    date: '1970-01-08',
  }],
  'should return only recent elements'
)
