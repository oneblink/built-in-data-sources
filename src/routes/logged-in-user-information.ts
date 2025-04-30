import { OneBlinkAPIHostingRequest } from '@oneblink/cli'
import getUserInformation from '../get-user-information.js'
import getBearerToken from '../get-bearer-token.js'

function generateUserInformationHandler(
  req: OneBlinkAPIHostingRequest<unknown>,
) {
  const token = getBearerToken(req)
  const userInformation = getUserInformation(token)

  if (userInformation) {
    return userInformation
  } else {
    return {}
  }
}

export { generateUserInformationHandler as post }
