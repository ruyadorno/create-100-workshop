import t from 'tap'
import { filterBooleans } from '../src/filter-booleans.js'

const nodeJSVersions = [
  {
    name: 'v21.1.0',
  },
  {
    name: 'v21.0.0',
  },
  {
    name: 'v20.8.1',
    security: true,
    lts: true,
  },
  {
    name: 'v20.8.0',
    lts: true,
  }
]

t.strictSame(
  filterBooleans({ keys: ['lts'], nodeJSVersions }),
  [
    {
      name: 'v20.8.1',
      security: true,
      lts: true,
    },
    {
      name: 'v20.8.0',
      lts: true,
    }
  ],
  'should return the expected lts versions'
)

t.strictSame(
  filterBooleans({ keys: ['security'], nodeJSVersions }),
  [
    {
      name: 'v20.8.1',
      security: true,
      lts: true,
    },
  ],
  'should return the expected security versions'
)
