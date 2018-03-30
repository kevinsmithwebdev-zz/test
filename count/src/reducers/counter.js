const INITIAL_COUNTER = 0

export function counter(state = INITIAL_COUNTER, action) {

  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return state + 1
    case 'DECREMENT_COUNTER':
      return (state>1) ? (state-1) : 0
    case 'RESET_COUNTER':
      return INITIAL_COUNTER
    case 'SET_COUNTER':
      return action.num
    default:
      return state
  }
}
