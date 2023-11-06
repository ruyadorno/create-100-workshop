#! /usr/bin/env node

import { resolve } from 'node:path'
import { copyFile, mkdir } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import { parseArgs } from 'node:util'

const { values: opts } = parseArgs({
  options: {
    step: {
      type: 'string',
    },
  },
})

const folders = [
  'src',
  'tap-snapshots',
  'tap-snapshots/test',
  'test',
]
const defaultTemplates = [
  '.gitignore',
  'src/filter-booleans.js',
  'src/filter-npm.js',
  'src/filter-recent.js',
  'src/format-count.js',
  'src/index.js',
  'src/output.js',
  'src/retrieve-nodejs-versions.js',
  'test/index.js',
  'cli.js',
  'package-lock.json',
  'package.json',
]
const stepTemplates = new Map(Object.entries({
  1: [
    'test/index.js',
    'tap-snapshots/test/index.js.test.cjs',
  ],
  2: [
    'test/index.js',
  ],
  3: [
    'test/format-count.js',
  ],
  4: [
    'src/date.js',
    'src/filter-recent.js',
    'test/filter-recent.js',
  ],
  5: [
    'test/filter-npm.js',
  ],
  6: [
    'test/filter-booleans.js',
  ],
  7: [
    'test/output.js',
  ],
  8: [
    'test/index.js',
  ],
}))

async function makeDirectory({ basename, dirname }) {
  const to = resolve(basename, dirname)
  console.log('mkdir: ', to)
  await mkdir(to).catch(err => console.warn('dir found: ', err.path))
}

async function copy({ basename, filename }) {
  const stepfoldername = opts.step ? `step-${opts.step}` : ''
  const url = new URL(`template/${stepfoldername}/${filename}`, import.meta.url)
  const path = fileURLToPath(url)
  const to = resolve(basename, filename)
  console.log('copy from:', path)
  console.log('copy to: ', to)
  console.log('---')
  await copyFile(path, to)
}

for (const t of folders) {
  await makeDirectory({ basename: process.cwd(), dirname: t })
}

const stepTemplate = opts.step && stepTemplates.get(opts.step)
const templates = stepTemplate || defaultTemplates
for (const t of templates) {
  await copy({ basename: process.cwd(), filename: t })
}
