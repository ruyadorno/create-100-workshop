import t from 'tap'
import { filterBooleans } from '../src/filter-booleans.js'

const nodeJSVersions = [
  {
    version: 'v21.1.0',
  },
  {
    version: 'v21.0.0',
  },
  {
    version: 'v20.8.1',
    security: true,
    lts: true,
  },
  {
    version: 'v20.8.0',
    lts: true,
  }
]

t.strictSame(
  filterBooleans({ keys: ['lts'], nodeJSVersions }),
  [
    {
      version: 'v20.8.1',
      security: true,
      lts: true,
    },
    {
      version: 'v20.8.0',
      lts: true,
    }
  ],
  'should return the expected lts versions'
)

t.strictSame(
  filterBooleans({ keys: ['security'], nodeJSVersions }),
  [
    {
      version: 'v20.8.1',
      security: true,
      lts: true,
    },
  ],
  'should return the expected security versions'
)
