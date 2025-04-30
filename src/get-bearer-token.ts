import { OneBlinkAPIHostingRequest } from '@oneblink/cli'

export default function getBearerToken(
  req: OneBlinkAPIHostingRequest<unknown>,
): string | undefined {
  const token = req.headers.authorization

  if (!token || typeof token !== 'string') {
    console.log('No "Authorization" header in request', req.headers)
    return
  }

  const vars = token.split(' ')
  if (vars.length < 2 || vars[0] !== 'Bearer' || !vars[1]) {
    console.log('No "Bearer" "Authorization" header in request', req.headers)
    return
  }
  // return the token
  return vars[1]
}
