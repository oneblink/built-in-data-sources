import { MiscTypes } from '@oneblink/types'
import { userService } from '@oneblink/sdk-core'
import jsonwebtoken from 'jsonwebtoken'

type UserInformation = Omit<MiscTypes.UserProfile, 'supervisor'> & {
  supervisorFullName: string | undefined
  supervisorEmail: string | undefined
  supervisorProviderUserId: string | undefined
}

function decodeToken(token: string | undefined) {
  if (token) {
    const payload = jsonwebtoken.decode(token, { complete: true })?.payload
    if (typeof payload !== 'string') {
      return payload
    }
  }
}

export default function getUserInformation(
  token: string | undefined,
): UserInformation | null {
  const payload = decodeToken(token)

  const userProfile = userService.parseUserProfile(payload)
  if (!userProfile) {
    return null
  }

  const supervisor = userProfile.supervisor
  delete userProfile.supervisor

  const userInformation: UserInformation = {
    ...userProfile,
    supervisorProviderUserId: supervisor?.providerUserId,
    supervisorFullName: supervisor?.fullName,
    supervisorEmail: supervisor?.email,
  }
  return userInformation
}
