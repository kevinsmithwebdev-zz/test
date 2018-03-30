import 'styles/index.css'

import configureStore from './store'
import { incrementCounter, decrementCounter, resetCounter, setCounter } from './actions'

const store = configureStore()

const updateCounter = () => $counterDisplay.innerHTML = store.getState().counter
const unsubscribeStore = store.subscribe(updateCounter)

//*************

const $counterBtns = document.querySelectorAll('.btn-counter')
const $counterResetBtn = document.querySelector('#counter-reset-btn')
const $counterSetBtn = document.querySelector('#counter-set-btn')
const $counterSetField = document.querySelector('#counter-set-field')

const $counterDisplay = document.querySelector('#counter-display')


function counterButtonListener() {
  switch (this.name) {
    case 'inc':
      store.dispatch(incrementCounter())
      break
    case 'dec':
      store.dispatch(decrementCounter())
      break
    default:
  }
}

function counterReset() {
  store.dispatch(resetCounter())
}
function counterSet() {
  store.dispatch(setCounter($counterSetField.value))
}


for (let $btn of $counterBtns) {
  $btn.addEventListener('click', counterButtonListener)
}

$counterResetBtn.addEventListener('click', counterReset)
$counterSetBtn.addEventListener('click', counterSet)
