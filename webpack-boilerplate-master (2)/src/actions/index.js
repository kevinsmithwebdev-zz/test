export const incrementCounter = () => {
  console.log('in incrementCounter action')
  return { type: 'INCREMENT_COUNTER' }
}

export const decrementCounter = () => {
  console.log('in decrementCounter action')
  return { type: 'DECREMENT_COUNTER' }
}
 
