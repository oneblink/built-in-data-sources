/* eslint-env jest */
// @flow
'use strict'
const jsonwebtoken = require('jsonwebtoken')

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
      },
    }

    const route = require('../../../src/routes/logged-in-user-information.js')
    const result = route.post(request)
    expect(result).toEqual({})
  })
  test('it should return user details when a token is provided', () => {
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
      },
    }

    const route = require('../../../src/routes/logged-in-user-information.js')
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
      providerType: 'Cognito',
      username: 'test@oneblink.io',
      providerUserId: 'bar',
      isSAMLUser: false,
      supervisorFullName: 'Jesus Christ',
      supervisorEmail: 'jesus@oneblink.io',
      supervisorProviderUserId: 'sid',
      phoneNumber: null,
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
      },
    }

    const route = require('../../../src/routes/logged-in-user-information.js')
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
      phoneNumber: null,
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
        phoneNumber: '+612 4322 1355',
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
      },
    }

    const route = require('../../../src/routes/logged-in-user-information.js')
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
