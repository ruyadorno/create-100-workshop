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
  '_gitignore',
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
    'test/filter-booleans.js',
    'test/filter-npm.js',
    'test/filter-recent.js',
    'test/format-count.js',
    'test/index.js',
    'test/output.js',
    'test/retrieve-nodejs-versions.js',
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
    'tap-snapshots/test/output.js.test.cjs',
  ],
  8: [
    'test/retrieve-nodejs-versions.js',
    'package.json',
  ],
  9: [
    'test/index.js',
  ],
  10: [
    'coverage-map.mjs',
    'package.json',
  ],
}))

async function makeDirectory({ basename, dirname }) {
  const to = resolve(basename, dirname)
  console.log('mkdir: ', to)
  await mkdir(to).catch(err => console.warn('dir found: ', err.path))
}

function fixFilenameTo(filename) {
  if (filename === '_gitignore') {
    return '.gitignore'
  }
  return filename
}

async function copy({ basename, filename }) {
  const stepfoldername = opts.step ? `step-${opts.step}` : ''
  const url = new URL(`template/${stepfoldername}/${filename}`, import.meta.url)
  const path = fileURLToPath(url)
  const to = resolve(basename, fixFilenameTo(filename))
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
