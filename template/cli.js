import { parseArgs } from 'node:util'
import { main } from './src/index.js'

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
  console.error('No result found!')
  process.exit(1)
}

if (values.json) {
  console.log(JSON.stringify(res, null, 2))
} else {
  if (res.length && !res[0]) {
    console.log(res.length)
  } else {
    for (const i of res) {
      console.log(i.version)
    }
  }
}
