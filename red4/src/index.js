import 'styles/index.css'
import 'actions/index'
import 'reducers/index' // wowsers


const $counterBtns = document.querySelectorAll('.btn-counter')

for (let $btn of $counterBtns) {
  $btn.addEventListener('click', function(event) {
    console.log('pressed')
    console.log(this)
  })
}
