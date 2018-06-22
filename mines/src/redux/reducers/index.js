import { combineReducers } from 'redux'

import { score } from './score'
import { grid } from './grid'

const reducers = combineReducers({
  grid,
  score
})

export default reducers
