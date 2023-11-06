import t from 'tap'
import semver from 'semver'

const { filterNpm } = (await t.mockImport('../src/filter-npm.js', {
  semver: {
    satisfies(versionToCheck, versionFilteredBy) {
      if (versionFilteredBy === 'ERROR') {
        throw new Error('ERR')
      }
      return semver.satisfies(versionToCheck, versionFilteredBy)
    }
  },
}))

const nodeJSVersions = [
  {
    name: 'v21.1.0',
    npm: "10.2.0",
  },
  {
    name: 'v21.0.0',
    npm: "10.2.0",
  },
  {
    name: 'v20.8.1',
    npm: "10.1.0",
  },
  {
    name: 'v20.8.0',
    npm: "10.1.0",
  }
]

t.match(
  filterNpm({ npm: '=10.1.0', nodeJSVersions }),
  [
    {
      name: 'v20.8.1',
      npm: '10.1.0',
    },
    {
      name: 'v20.8.0',
      npm: '10.1.0',
    },
  ],
  'should return only exact npm version elements'
)

t.throws(
  () => filterNpm({ npm: 'ERROR', nodeJSVersions }),
  { 
    message: `Could not compare provided semver value: ERROR
Make sure it's a valid semver value.`,
    code: 'ESEMVERVALUE',
  },
  'should throw a semver value error'
)
