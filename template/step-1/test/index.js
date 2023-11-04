import t from 'tap'
import { main } from '../src/index.js'

const result = await main({ npm: '>=10.2' })
t.match(
  result,
  [
    { version: 'v21.1.0' },
    { version: 'v21.0.0' },
  ],
  'should have expected version'
)
