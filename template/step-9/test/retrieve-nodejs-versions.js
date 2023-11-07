import t from 'tap'
import { MockAgent, setGlobalDispatcher } from 'undici'
import { getNodeJSVersions } from '../src/retrieve-nodejs-versions.js'

const mockAgent = new MockAgent()
setGlobalDispatcher(mockAgent)

const res = JSON.stringify([
  {
    version: '1.0.0',
    npm: '1.0.0',
    lts: true,
  }
])

const mockPool = mockAgent.get('https://nodejs.org')
mockPool.intercept({ path: '/dist/index.json' }).reply(200, res)

const nodeJSVersions = await getNodeJSVersions()
t.strictSame(
  nodeJSVersions,
  JSON.parse(res),
  'should fetch and parse versions json info'
)
