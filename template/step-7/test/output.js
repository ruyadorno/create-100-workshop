import t from 'tap'
import { printError, printResult } from '../src/output.js'

t.test('printError', async t => {
  let printed = ''
  const _error = console.error
  console.error = msg => {
    printed += msg
  }
  printError()
  t.strictSame(
    printed,
    'No result found!',
    'should print error msg'
  )
  console.error = _error
})

t.test('printResult json output', async t => {
  let printed = ''
  const _log = console.log
  console.log = msg => {
    printed += msg
  }
  printResult({
    json: true,
    nodeJSVersions: [
      { version: '1.0.0' },
    ],
  })
  t.matchSnapshot(
    printed,
    'should stringify print output'
  )
  console.log = _log
})

t.test('printResult version output', async t => {
  let printed = ''
  const _log = console.log
  console.log = msg => {
    printed += (msg + '\n')
  }
  printResult({
    nodeJSVersions: [
      { version: '1.2.0' },
      { version: '1.1.0' },
      { version: '1.0.0' },
    ],
  })
  t.matchSnapshot(
    printed,
    'should print version output'
  )
  console.log = _log
})

t.test('printResult count output', async t => {
  let printed = ''
  const _log = console.log
  console.log = msg => {
    printed += msg
  }
  printResult({
    nodeJSVersions: {
      length: 3,
    },
  })
  t.strictSame(
    printed,
    '3',
    'should print count output'
  )
  console.log = _log
})
