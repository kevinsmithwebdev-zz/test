import './scss/main.scss';
console.log('hello!');

import { CANVAS_DIM, FROG_DIM } from './js/constants.js'

import { qObj, writeQuestion } from './js/questions.js'


// ***************************************
// ***************************************
// ***************************************
// INDEX

import imgFrog from './img/frog.png'
import imgEyelid from './img/frog-eyes-closed.png'

const $prompt1 = document.getElementById("prompt1")
const $prompt2 = document.getElementById("prompt2")
const $answers = document.getElementById("answers")

const eyelidCanvas = document.getElementById('eyelid-canvas').getContext('2d')
const frogEyelidImg = new Image()
frogEyelidImg.src = imgEyelid

const frogCanvas = document.getElementById('frog-canvas').getContext('2d')
const frogImg = new Image()
frogImg.src = imgFrog

const frogImgX = CANVAS_DIM.width/2 - FROG_DIM.width/2

const coordMouth = {
  x: CANVAS_DIM.width/2,
  y: FROG_DIM.height/2 - 7
}


frogImg.onload = function() {
  frogCanvas.drawImage(this, frogImgX, 0)
}


function blinkFroggy() {
  frogEyelidImg.onload = function() {

    const BLINK_LENGTH = 70
    const BLINK_SHORT_DELAY = 250
    const BLINK_LONG_DELAY = 7000

    const startBlink = () => {
      setInterval(() => {
        eyelidCanvas.drawImage(this, frogImgX, 0)
      }, BLINK_LONG_DELAY)
    }

    const endBlink = () => {
      setInterval(() => {
        eyelidCanvas.clearRect(0, 0, CANVAS_DIM.width, CANVAS_DIM.height)
      }, BLINK_LONG_DELAY)
    }

    startBlink()

    setTimeout(() => {
      endBlink()
    }, BLINK_LENGTH)

    setTimeout(() => {
      startBlink()
    }, BLINK_SHORT_DELAY)

    setTimeout(() => {
      endBlink()
    }, BLINK_SHORT_DELAY + BLINK_LENGTH)
  }
}


blinkFroggy()


writeQuestion(qObj)


//*************
