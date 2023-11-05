import t from 'tap'
import { main } from '../src/index.js'

const result = await main({ npm: '>=10.2' })
t.matchSnapshot(
  result,
  'should have expected versions'
)
