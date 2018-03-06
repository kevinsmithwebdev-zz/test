import { CANVAS_DIM, COORD_MOUTH, FROG_DIM } from './constants.js'
import { NUM_ANSWERS } from './questions.js'

const tongueCanvas = document.getElementById('tongue-canvas').getContext('2d')

export const drawTongue = ansIdx => {

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

  tongueCanvas.arc(COORD_MOUTH.x, COORD_MOUTH.y, TONGUE_WIDTH/4, 0, Math.PI * 2, true)

  for (let i=1; i<=NUM_FRAMES; i++) {
    setTimeout(function() {
      let amount = (i/NUM_FRAMES)
      tongueCanvas.moveTo(COORD_MOUTH.x, COORD_MOUTH.y);
      tongueCanvas.lineTo(COORD_MOUTH.x + (coordTongueEnd.x - COORD_MOUTH.x) * amount, COORD_MOUTH.y + (coordTongueEnd.y - COORD_MOUTH.y) * amount);
      tongueCanvas.lineWidth = TONGUE_WIDTH
      if (i===NUM_FRAMES)
      tongueCanvas.arc(coordTongueEnd.x, coordTongueEnd.y, TONGUE_WIDTH/4, 0, Math.PI * 2, true)
      tongueCanvas.stroke()
    }, TIME_TONGUE*i / NUM_FRAMES)
  }

  const delta = Math.max(COORD_MOUTH.x-coordTongueEnd.x, COORD_MOUTH.y-coordTongueEnd.y)/NUM_FRAMES

  for (let i=0; i<=NUM_FRAMES; i++) {
    setTimeout(function() {
      let amount = (i/NUM_FRAMES)
      let x = coordTongueEnd.x - (coordTongueEnd.x - COORD_MOUTH.x ) * amount
      let y = coordTongueEnd.y - (coordTongueEnd.y - COORD_MOUTH.y) * amount

      tongueCanvas.clearRect(x-2*delta, y-2*delta, delta*4, delta*4)

    }, TIME_TONGUE*2 + (TIME_TONGUE*i / NUM_FRAMES))
  }

}
