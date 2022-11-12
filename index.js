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
    'npm ls --omit=dev --depth 500 | grep -v deduped | wc -l',
    { cwd }
  )
  

  let resInt = parseInt(res.stdout.toString().trim(), 10)
  const depCountInt = (resInt - 3)
  const expectedInt = expected

  if (depCountInt > expectedInt) {
    return depCountInt
  }

  return false
}

export default checkMaxDeps
