export const incrementCounter = () => {
  return { type: 'INCREMENT_COUNTER' }
}

export const decrementCounter = () => {
  return { type: 'DECREMENT_COUNTER' }
}

export const resetCounter = () => {
  return { type: 'RESET_COUNTER' }
}

export const setCounter = (num) => {
  return { type: 'SET_COUNTER', num }
}
 
