import t from 'tap'
import { formatCount } from '../src/format-count.js'

t.strictSame(
  formatCount({ nodeJSVersions: [1,2,3,4] }),
  { length: 4 },
  'should return the expected count of elements'
)

t.strictSame(
  formatCount({ nodeJSVersions: [] }),
  { length: 0 },
  'should return 0 on no elements'
)
