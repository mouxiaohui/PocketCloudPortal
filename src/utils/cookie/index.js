/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import cookie from 'vue-cookie'

const LOGIN_TOKEN = 'token',
  EMPTY_STR = ''

export function setToken(token) {
  cookie.set(LOGIN_TOKEN, token, { expires: 3 })
}

export function getToken() {
  let token = cookie.get(LOGIN_TOKEN)
  if (token) {
    return `Bearer ` + token
  }
  return EMPTY_STR
}

export function clearToken() {
  cookie.delete(LOGIN_TOKEN)
}
