// @ts-check
'use strict'

import util from 'util'
import childProcess from 'child_process'
const exec = util.promisify(childProcess.exec)

/**
 * @param {{ cwd: string, expected: number }} options 
 */
async function checkMaxDeps ({ cwd, expected }) {
  const res = await exec(
    'npm ls --omit=dev --depth 500 | grep -v deduped',
    { cwd }
  )
  
  // parse the format of `npm ls` output
  const lines = res.stdout.toString().split('\n')
    .filter(Boolean)
    .slice(1)
    .filter(line => !line.includes('empty'))

  const depsCount = lines.length

  if (depsCount > expected) return depsCount

  return false
}

export default checkMaxDeps
