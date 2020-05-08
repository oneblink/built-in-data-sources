// @flow
'use strict'

const OneBlink = require('@oneblink/sdk')

const getUserInformation = require('../get-user-information')
const getBearerToken = require('../get-bearer-token')

const generateUserPictureHandler = function (
  req /* : BmRequest */,
) /* : mixed[] */ {
  const token = getBearerToken(req)
  const userInformation = getUserInformation(token)

  if (!userInformation || !userInformation.picture) {
    return []
  }

  return [
    OneBlink.Forms.generateFormElement({
      type: 'image',
      name: 'picture',
      label: 'Picture',
      defaultValue: userInformation.picture,
    }),
  ]
}

module.exports = {
  post: generateUserPictureHandler,
}
