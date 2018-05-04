import { drawTongue } from './froggy.js'

fetch('http://localhost:8080/static/data/q01.json')
  .then(function(response) {
    console.log(response)
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
});

export const qObj = {
  prompt1: 'Froggy is hungry!',
  prompt2: 'Froggy wants apples!',
  answers: [
    'perros',
    'manazanas',
    'eres',
    'platanos'
  ],
  answerKey: 1
}

export const NUM_ANSWERS = 4

const $prompt1 = document.getElementById("prompt1")
const $prompt2 = document.getElementById("prompt2")
const $answers = document.getElementById("answers")

let newAnsEl

export const writeQuestion = (qObj) => {
  $prompt1.innerHTML= qObj.prompt1
  $prompt2.innerHTML= qObj.prompt2

  // for (let ans of qObj.answers) {
  for (let i=0; i<qObj.answers.length; i++) {
    newAnsEl = document.createElement("span")
    newAnsEl.innerHTML = qObj.answers[i]
    newAnsEl.setAttribute('id', `ans${i}`)
    newAnsEl.setAttribute('value', i)
    newAnsEl.setAttribute('class', 'ans-btn')
    newAnsEl.addEventListener('click', function () {
      drawTongue(i);
    })
    $answers.appendChild(newAnsEl)
  }
}
