// const SERVER_URL = "https://kswd-tvc-pptut.herokuapp.com"
const SERVER_URL = "http://localhost:8080"

export const USER_REGISTER_URL    = SERVER_URL + '/user/register'
export const USER_UPDATE_URL      = SERVER_URL + '/user/update'

export const AUTH_LOGIN_URL       = SERVER_URL + '/auth/login'
export const AUTH_LOGOUT_URL      = SERVER_URL + '/auth/logout'
export const AUTH_CHECKJWT_URL    = SERVER_URL + '/auth/checkjwt'

export const DATA_PROTECTED_URL   = SERVER_URL + '/data/protected'
export const DATA_UNPROTECTED_URL = SERVER_URL + '/data/unprotected'
