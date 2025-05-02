import { OneBlinkAPIHostingRequest } from '@oneblink/cli'
import jsonwebtoken from 'jsonwebtoken'
import * as route from '../../../src/routes/logged-in-user-information.js'

describe('Logged in user information', () => {
  test('it should return {} when no token is provided', () => {
    const request = {
      body: {},
      headers: {},
      method: 'post',
      route: '',
      url: {
        host: '',
        hostname: '',
        params: {},
        pathname: '',
        protocol: 'https:',
        query: {},
        querystring: '',
      },
    } as OneBlinkAPIHostingRequest<unknown>

    const result = route.post(request)
    expect(result).toEqual({})
  })
  test('it should return user details when a token is provided', () => {
    const token = `Bearer ${jsonwebtoken.sign(
      {
        sub: 'bar',
        email: 'test@oneblink.io',
        given_name: 'John',
        middle_name: 'Flash',
        family_name: 'Test',
        name: 'Johny Test',
        picture:
          'https://www.google.com/search?sxsrf=ALeKk03TbSRk0MQfft8Jz2n7qrDGcrM-og:1588728449904&q=popular+Google+Doodle+games&oi=ddle&ct=153499290&hl=en&sa=X&ved=0ahUKEwiV3JjXip7pAhVZaCsKHV62CNgQPQgP',
        address: '123 Fake St',
        'custom:role': 'God',
        'custom:supervisor_name': 'Jesus Christ',
        'custom:supervisor_email': 'jesus@oneblink.io',
        'custom:supervisor_user_id': 'sid',
        'custom:departmenthead_email': 'god@oneblink.io',
        'custom:country_calling_code': '+61',
        'custom:department': 'Engineering',
        'custom:phone_number': '0412345678',
        'custom:employee_number': 'bbbcccddd',
        'custom:country': 'Sky',
        'custom:area_code': '2250',
        'custom:division': 'Software',
        'custom:state': 'Cloud',
        'custom:groups': 'Cool Role',
        'custom:city': 'Hyper Town',
        'custom:departmenthead_name': 'God',
        'custom:bargain': '10% Off',
      },
      'shhh',
    )}`
    const request = {
      body: {},
      headers: { authorization: token },
      method: 'post',
      route: '',
      url: {
        host: '',
        hostname: '',
        params: {},
        pathname: '',
        protocol: 'https:',
        query: {},
        querystring: '',
      },
    } as OneBlinkAPIHostingRequest<unknown>

    const result = route.post(request)
    console.log('result', result)
    expect(result).toEqual({
      email: 'test@oneblink.io',
      emailVerified: undefined,
      employeeNumber: 'bbbcccddd',
      firstName: 'John',
      fullName: 'Johny Test',
      groups: ['Cool Role'],
      lastName: 'Test',
      middleName: 'Flash',
      phoneNumber: '0412345678',
      phoneNumberVerified: undefined,
      picture:
        'https://www.google.com/search?sxsrf=ALeKk03TbSRk0MQfft8Jz2n7qrDGcrM-og:1588728449904&q=popular+Google+Doodle+games&oi=ddle&ct=153499290&hl=en&sa=X&ved=0ahUKEwiV3JjXip7pAhVZaCsKHV62CNgQPQgP',
      role: 'God',
      providerType: 'Cognito',
      username: 'test@oneblink.io',
      providerUserId: 'bar',
      state: 'Cloud',
      isSAMLUser: false,
      supervisorFullName: 'Jesus Christ',
      supervisorEmail: 'jesus@oneblink.io',
      supervisorProviderUserId: 'sid',
      userId: 'bar',
      address: '123 Fake St',
      areaCode: '2250',
      bargain: '10% Off',
      city: 'Hyper Town',
      country: 'Sky',
      countryCallingCode: '+61',
      department: 'Engineering',
      departmentHeadEmail: 'god@oneblink.io',
      departmentHeadFullName: 'God',
      division: 'Software',
    })
  })
  test('it should return idp details when a token is provided with identities', () => {
    const token = `Bearer ${jsonwebtoken.sign(
      {
        sub: 'bar',
        email: 'test@oneblink.io',
        given_name: 'John',
        family_name: 'Test',
        name: 'Johny Test',
        picture:
          'https://www.google.com/search?sxsrf=ALeKk03TbSRk0MQfft8Jz2n7qrDGcrM-og:1588728449904&q=popular+Google+Doodle+games&oi=ddle&ct=153499290&hl=en&sa=X&ved=0ahUKEwiV3JjXip7pAhVZaCsKHV62CNgQPQgP',
        'custom:role': 'God',
        'custom:supervisor_name': 'Jesus Christ',
        'custom:supervisor_email': 'jesus@oneblink.io',
        'custom:supervisor_user_id': 'sid',
        identities: [{ providerType: 'SAML', userId: 'ad-user' }],
      },
      'shhh',
    )}`
    const request = {
      body: {},
      headers: { authorization: token },
      method: 'post',
      route: '',
      url: {
        host: '',
        hostname: '',
        params: {},
        pathname: '',
        protocol: 'https:',
        query: {},
        querystring: '',
      },
    } as OneBlinkAPIHostingRequest<unknown>

    const result = route.post(request)
    expect(result).toEqual({
      userId: 'bar',
      email: 'test@oneblink.io',
      firstName: 'John',
      lastName: 'Test',
      fullName: 'Johny Test',
      picture:
        'https://www.google.com/search?sxsrf=ALeKk03TbSRk0MQfft8Jz2n7qrDGcrM-og:1588728449904&q=popular+Google+Doodle+games&oi=ddle&ct=153499290&hl=en&sa=X&ved=0ahUKEwiV3JjXip7pAhVZaCsKHV62CNgQPQgP',
      role: 'God',
      username: 'ad-user',
      providerType: 'SAML',
      providerUserId: 'ad-user',
      isSAMLUser: true,
      supervisorFullName: 'Jesus Christ',
      supervisorEmail: 'jesus@oneblink.io',
      supervisorProviderUserId: 'sid',
    })
  })

  test('it should return a users phone number from jwt', () => {
    const token = `Bearer ${jsonwebtoken.sign(
      {
        sub: 'bar',
        email: 'test@oneblink.io',
        given_name: 'John',
        family_name: 'Test',
        name: 'Johny Test',
        picture:
          'https://www.google.com/search?sxsrf=ALeKk03TbSRk0MQfft8Jz2n7qrDGcrM-og:1588728449904&q=popular+Google+Doodle+games&oi=ddle&ct=153499290&hl=en&sa=X&ved=0ahUKEwiV3JjXip7pAhVZaCsKHV62CNgQPQgP',
        'custom:role': 'God',
        'custom:supervisor_name': 'Jesus Christ',
        'custom:supervisor_email': 'jesus@oneblink.io',
        'custom:supervisor_user_id': 'sid',
        'custom:phone_number': '+612 4322 1355',
      },
      'shhh',
    )}`
    const request = {
      body: {},
      headers: { authorization: token },
      method: 'post',
      route: '',
      url: {
        host: '',
        hostname: '',
        params: {},
        pathname: '',
        protocol: 'https:',
        query: {},
        querystring: '',
      },
    } as OneBlinkAPIHostingRequest<unknown>

    const result = route.post(request)
    expect(result).toHaveProperty('phoneNumber')
    expect(result).toEqual({
      userId: 'bar',
      email: 'test@oneblink.io',
      firstName: 'John',
      lastName: 'Test',
      fullName: 'Johny Test',
      picture:
        'https://www.google.com/search?sxsrf=ALeKk03TbSRk0MQfft8Jz2n7qrDGcrM-og:1588728449904&q=popular+Google+Doodle+games&oi=ddle&ct=153499290&hl=en&sa=X&ved=0ahUKEwiV3JjXip7pAhVZaCsKHV62CNgQPQgP',
      role: 'God',
      providerType: 'Cognito',
      username: 'test@oneblink.io',
      providerUserId: 'bar',
      isSAMLUser: false,
      supervisorFullName: 'Jesus Christ',
      supervisorEmail: 'jesus@oneblink.io',
      supervisorProviderUserId: 'sid',
      phoneNumber: '+612 4322 1355',
    })
  })
})
