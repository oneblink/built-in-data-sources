// @flow
'use strict'

const getUserInformation = require('../get-user-information')
const getBearerToken = require('../get-bearer-token')

const generateUserInformationHandler = function (
  req /* : BmRequest */,
) /* : {} | UserInformation */ {
  const token = getBearerToken(req)
  const userInformation = getUserInformation(token)

  if (userInformation) {
    return userInformation
  } else {
    return {}
  }
}

module.exports = {
  post: generateUserInformationHandler,
}
