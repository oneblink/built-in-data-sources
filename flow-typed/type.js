// @flow
'use strict'

declare type UserInformation = {
  userId: string,
  email: string | void,
  firstName: string | void,
  lastName: string | void,
  fullName: string | void,
  picture: string | void,
  role: string | void,
  username: string,
  providerType: string,
  providerUserId: string,
  isSAMLUser: boolean,
  supervisorFullName: string | null,
  supervisorEmail: string | null,
  supervisorProviderUserId: string | null,
  phoneNumber: string | void,
}
