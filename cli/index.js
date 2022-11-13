#!/usr/bin/env node
// @ts-check
'use strict'

import checkMaxDeps from '../index.js'

const argv = process.argv.slice(2)

const cwd = argv[0]
if (!cwd) {
  console.log('missing directory')
  console.log('check-deps $DIR $COUNT')
  process.exit(1)
}

const expected = argv[1]
if (!expected) {
  console.log('missing max deps count')
  console.log('check-deps $DIR $COUNT')
  process.exit(1)
}

const depCount = await checkMaxDeps({
    cwd: argv[0],
    expected: parseInt(argv[1], 10)
})
if (depCount > parseInt(expected, 10)) {
    console.log('too many npm ls --prod dependencies')
    console.log(
      `Found ${depCount} dependencies, expected ${expected}`
    )
    process.exit(1)
} 

console.log('npm dependencies not too large')
