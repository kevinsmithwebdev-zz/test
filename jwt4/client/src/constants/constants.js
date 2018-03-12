
const SERVER_URL = "http://localhost:8080"

export const AUTH_LOGIN_URL = SERVER_URL + '/auth/login'
export const AUTH_LOGOUT_URL = SERVER_URL + '/auth/logout'

export const DATA_PROTECTED_URL = SERVER_URL + '/auth/secret'
export const DATA_UNPROTECTED_URL = SERVER_URL + '/auth/'