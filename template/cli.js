import { parseArgs } from 'node:util'
import { main } from './src/index.js'
import { printError, printResult } from './src/output.js'

const { values } = parseArgs({
  options: {
    count: {
      type: 'boolean',
    },
    filter: {
      multiple: true,
      type: 'string',
    },
    json: {
      type: 'boolean',
    },
    npm: {
      type: 'string',
    },
    recent: {
      type: 'string',
    },
  },
})

const res = await main(values)

if (!res.length) {
  printError()
  process.exit(1)
}

printResult({ json: values.json, nodeJSVersions: res })
