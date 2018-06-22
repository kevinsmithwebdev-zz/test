const INITIAL_COUNTER = { number: 0 }

export function counter(state = INITIAL_COUNTER, action) {
  let newState
  switch (action.type) {

    case 'INCREMENT_COUNTER':
      return { number: state.number + 1}

    case 'DECREMENT_COUNTER':
      newState = Object.assign({}, state)
      if (newState.number>1)
        newState.number--
      else
        newState.number = 0
      return newState

    case 'RESET_COUNTER':
      return INITIAL_COUNTER

    case 'SET_COUNTER':
      newState = Object.assign({}, state)
      newState.number = action.payload
      newState = { ...state, number: action.payload }
      return newState

    default:
      return state
  }
}
