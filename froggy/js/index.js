let qObj = {
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

const $prompt1 = document.getElementById("prompt1")
const $prompt2 = document.getElementById("prompt2")
const $answers = document.getElementById("answers")


const FROG_DIM = {
  height: 171,
  width: 207
}

const CANVAS_DIM = {
  width: 1000,
  height: 500
}

const NUM_ANSWERS = 4



let frogImg = new Image()
frogImg.src = './assets/frog.png'

let frogCanvas = document.getElementById('frog-canvas').getContext('2d')
let tongueCanvas = document.getElementById('tongue-canvas').getContext('2d')

const frogImgX = CANVAS_DIM.width/2 - FROG_DIM.width/2

const coordMouth = {
  x: CANVAS_DIM.width/2,
  y: FROG_DIM.height/2 - 7
}


frogImg.onload = function() {
  frogCanvas.drawImage(this, frogImgX, 0)

  // drawTongue(0)

}




writeQuestion(qObj)






//*************


function writeQuestion(qObj) {
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

function drawTongue(ansIdx) {

  const tongueColor = 'red'

  const coordTongueEnd = {
    x: (CANVAS_DIM.width/(NUM_ANSWERS*2)) * (ansIdx*2 + 1),
    y: CANVAS_DIM.height
  }

  const NUM_FRAMES = 50
  const TIME_TONGUE = 100
  const TONGUE_WIDTH = 5

  tongueCanvas.clearRect(0, 0, CANVAS_DIM.width, CANVAS_DIM.height)
  tongueCanvas.beginPath()

  tongueCanvas.strokeStyle = tongueColor

  tongueCanvas.arc(coordMouth.x, coordMouth.y, TONGUE_WIDTH/4, 0, Math.PI * 2, true)

  for (let i=1; i<=NUM_FRAMES; i++) {
    setTimeout(function() {
      let amount = (i/NUM_FRAMES)
      tongueCanvas.moveTo(coordMouth.x, coordMouth.y);
      tongueCanvas.lineTo(coordMouth.x + (coordTongueEnd.x - coordMouth.x) * amount, coordMouth.y + (coordTongueEnd.y - coordMouth.y) * amount);
      tongueCanvas.lineWidth = TONGUE_WIDTH
      if (i===NUM_FRAMES)
        tongueCanvas.arc(coordTongueEnd.x, coordTongueEnd.y, TONGUE_WIDTH/4, 0, Math.PI * 2, true)
      tongueCanvas.stroke()
    }, TIME_TONGUE*i / NUM_FRAMES)
  }

  const delta = Math.max(coordMouth.x-coordTongueEnd.x, coordMouth.y-coordTongueEnd.y)/NUM_FRAMES

  for (let i=0; i<=NUM_FRAMES; i++) {
    setTimeout(function() {
      let amount = (i/NUM_FRAMES)
      let x = coordTongueEnd.x - (coordTongueEnd.x - coordMouth.x ) * amount
      let y = coordTongueEnd.y - (coordTongueEnd.y - coordMouth.y) * amount

      tongueCanvas.clearRect(x-2*delta, y-2*delta, delta*4, delta*4)

    }, TIME_TONGUE*2 + (TIME_TONGUE*i / NUM_FRAMES))
  }

}
