import { OneBlinkAPIHostingRequest } from '@oneblink/cli'
import * as OneBlink from '@oneblink/sdk'
import getUserInformation from '../get-user-information.js'
import getBearerToken from '../get-bearer-token.js'

const generateUserPictureHandler = function (
  req: OneBlinkAPIHostingRequest<unknown>,
): unknown[] {
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

export { generateUserPictureHandler as post }
