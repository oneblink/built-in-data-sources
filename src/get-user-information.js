// @flow
'use strict'

const jsonwebtoken = require('jsonwebtoken')

function decodeToken(token /* : string | void */) {
  if (token) {
    const { payload } = jsonwebtoken.decode(token, { complete: true })
    return payload
  }
}

module.exports = function getUserInformation(
  token /* : string | void */,
) /* : UserInformation | null */ {
  const userProfile = decodeToken(token)

  if (userProfile) {
    console.log('userProfile', userProfile)
    const user = {
      userId: userProfile.sub,
      email: userProfile.email,
      firstName: userProfile.given_name,
      lastName: userProfile.family_name,
      fullName: userProfile.name,
      picture: userProfile.picture,
      role: userProfile['custom:role'],
      username: userProfile.email,
      providerType: 'Cognito',
      providerUserId: userProfile.sub,
      isSAMLUser: false,
      supervisorFullName: null,
      supervisorEmail: null,
      supervisorProviderUserId: null,
      phoneNumber: userProfile['custom:phone_number'] || null,
    }

    if (
      userProfile['custom:supervisor_name'] ||
      userProfile['custom:supervisor_email'] ||
      userProfile['custom:supervisor_user_id']
    ) {
      user.supervisorFullName = userProfile['custom:supervisor_name']
      user.supervisorEmail = userProfile['custom:supervisor_email']
      user.supervisorProviderUserId = userProfile['custom:supervisor_user_id']
    }

    if (
      Array.isArray(userProfile.identities) &&
      userProfile.identities.length
    ) {
      console.log('idp issued', userProfile.identities[0])
      console.log(
        'userProfile.identities[0].providerType',
        userProfile.identities[0].providerType,
      )
      console.log(
        'userProfile.identities[0].userId',
        userProfile.identities[0].userId,
      )
      user.providerType = userProfile.identities[0].providerType
      user.providerUserId = userProfile.identities[0].userId
      user.isSAMLUser = user.providerType === 'SAML'
      if (user.isSAMLUser) {
        user.username = user.providerUserId
      }
    }
    return user
  } else {
    return null
  }
}
