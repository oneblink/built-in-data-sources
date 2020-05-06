// @flow
'use strict'
// $FlowFixMe
require('dotenv').config()
// $FlowFixMe
const execa = require('execa')

async function deploy(environment) {
  try {
    // deploy oneblink
    process.env.ONEBLINK_ACCESS_KEY = process.env.OB_ACCESS_KEY
    process.env.ONEBLINK_SECRET_KEY = process.env.OB_SECRET_KEY
    await runCommand('npx', [
      'oneblink',
      'api',
      'scope',
      'oneblink-data-sources.api.oneblink.io',
    ])
    await runCommand('npx', [
      'oneblink',
      'api',
      'deploy',
      `--env ${environment}`,
      '--force',
    ])

    // deploy civicplus
    process.env.ONEBLINK_ACCESS_KEY = process.env.CP_ACCESS_KEY
    process.env.ONEBLINK_SECRET_KEY = process.env.CP_SECRET_KEY
    await runCommand('npx', [
      'civicplus',
      'api',
      'scope',
      'oneblink-data-sources.api.transform.civicplus.com',
    ])
    await runCommand('npx', [
      'civicplus',
      'api',
      'deploy',
      `--env ${environment}`,
      '--force',
    ])
  } catch (error) {
    console.error('Error running deployment', error)
    throw error
  }
}

async function runCommand(file, arguements) {
  return await execa(file, arguements, {
    extendEnv: true,
  }).stdout.pipe(process.stdout)
}

const environment = process.argv[2]
if (!environment) {
  console.error('No environment specified')
  throw new Error('No environment specified')
}
deploy(environment)
