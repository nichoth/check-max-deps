#!/usr/bin/env node
// @ts-check
'use strict'

import checkMaxDeps from '../index.js'

const argv = process.argv.slice(2)

const cwd = argv[0]
if (!cwd) {
  console.log('missing directory')
  console.log('_base check-max-deps $DIR $COUNT')
  process.exit(1)
}

const expected = argv[1]
if (!expected) {
  console.log('missing max deps count')
  console.log('_base check-max-deps $DIR $COUNT')
  process.exit(1)
}

const depCount = await checkMaxDeps({ cwd: argv[0], expected: argv[1] })
if (depCount) {
    console.log('too many npm ls --prod dependencies')
    console.log(
      `Found ${depCount} dependencies, expected ${expected}`
    )
    process.exit(1)
} 