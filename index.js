// @ts-check
'use strict'

import util from 'util'
import childProcess from 'child_process'
const exec = util.promisify(childProcess.exec)

/**
 * @param {{ cwd: string, expected: string }} options 
 */
async function checkMaxDeps ({ cwd, expected }) {
  const res = await exec(
    'npm ls --prod --depth 500 | grep -v deduped | wc -l',
    {
      cwd: cwd
    }
  )

  const depCount = res.stdout.toString().trim()
  const depCountInt = parseInt(depCount, 10)
  const expectedInt = parseInt(expected, 10)

  if (depCountInt > expectedInt) {
    return depCountInt
  }

  return false
}

export default checkMaxDeps
