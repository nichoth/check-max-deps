#!/usr/bin/env node
// @ts-check
'use strict'

import { test } from 'tapzero'
import childProcess from 'child_process'

const cmd = 'node ./cli/index.js'

test('check dependencies with too many', t => {
    try {
        childProcess.execSync(cmd + ' . -1').toString()
        t.fail('should not exit ok')
    } catch (error) {
        t.equal(error.status, 1, 'should exit with error code')
    }
})

test('check dependencies ok', t => {
    try {
        const res = childProcess.execSync(cmd + ' . 0').toString()
        t.equal(res, 'npm dependencies not too large\n')
    } catch (error) {
        t.fail('should not return an error')
        console.log('error', error.toString())
    }
})
