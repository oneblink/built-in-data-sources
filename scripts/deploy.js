// @flow
'use strict'
// $FlowFixMe
require('dotenv').config()
// $FlowFixMe
const execa = require('execa')

function deploy(environment) {
  try {
    // deploy oneblink
    console.log('Starting OneBlink deployment')
    process.env.ONEBLINK_ACCESS_KEY = process.env.OB_ACCESS_KEY
    process.env.ONEBLINK_SECRET_KEY = process.env.OB_SECRET_KEY
    runCommand('npx', [
      'oneblink',
      'api',
      'scope',
      'oneblink-data-sources.api.oneblink.io',
    ])
    runCommand('npx', [
      'oneblink',
      'api',
      'deploy',
      '--env',
      `${environment}`,
      '--force',
    ])

    // deploy civicplus
    console.log('Starting CivicPlus deployment')
    process.env.ONEBLINK_ACCESS_KEY = process.env.CP_ACCESS_KEY
    process.env.ONEBLINK_SECRET_KEY = process.env.CP_SECRET_KEY
    runCommand('npx', [
      'civicplus',
      'api',
      'scope',
      'oneblink-data-sources.api.transform.civicplus.com',
    ])
    runCommand('npx', [
      'civicplus',
      'api',
      'deploy',
      '--env',
      `${environment}`,
      '--force',
    ])
  } catch (error) {
    console.error('Error running deployment', error)
    throw error
  }
}

function runCommand(file, arguements) {
  console.log('Running command', file, arguments)
  execa.sync(file, arguements, {
    extendEnv: true,
  })
}

const environment = process.argv[2]
if (!environment) {
  console.error('No environment specified')
  throw new Error('No environment specified')
}
console.log('Starting deployment for environment:', environment)
deploy(environment)
