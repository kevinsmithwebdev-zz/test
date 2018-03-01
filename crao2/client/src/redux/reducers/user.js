const initUser = {
  username: '',
  email: '',
  firstName: '',
  lastName: ''
}


const userReducer = (state = {}, action) => {

  switch (action.type) {
    case 'USER_UPDATE':
      return ({
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email
      })

    default:
      return state
  }
}

export default userReducer
