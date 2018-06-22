export const GRID_ROWS = 20
export const GRID_COLS = 30

export const TOT_MINES = 20

// let gridx = new Array(GRID_ROWS).fill([...new Array(GRID_COLS).fill({})])
// let gridx = Array(GRID_ROWS).fill(null).map(
//   () => (Array(GRID_COLS).fill(null)))
let gridx = []
for (let r=0; r<GRID_ROWS; r++) {
  let temp = []
  for (let c=0; c<GRID_COLS; c++) {
    temp.push({ id: (r*GRID_COLS+c), value: 0, isHidded: true })
  }
  gridx.push(temp)
}

const rand = max => Math.floor(Math.random()*max)

let i = TOT_MINES
while (i) {
  let r = rand(GRID_ROWS)
  let c = rand(GRID_COLS)
  if (gridx[r][c].value === 0) {
    gridx[r][c].value = -1
    i--
  }
}

for (let r=0; r<GRID_ROWS; r++) {
  for (let c=0; c<GRID_COLS; c++) {
    if (gridx[r][c].value===0) {
      let isLeft = c === 0
      let isRight = c === GRID_COLS - 1
      let isTop = r === 0
      let isBottom = r === GRID_ROWS - 1

      let sum = 0

      if (!isLeft)
        if (gridx[r][c-1].value === -1)
          sum++
      if (!isRight)
        if (gridx[r][c+1].value === -1)
          sum++
      if (!isTop)
        if (gridx[r-1][c].value === -1)
          sum++
      if (!isBottom)
        if (gridx[r+1][c].value === -1)
          sum++

      if(!isTop && !isLeft)
        if (gridx[r-1][c-1].value === -1)
          sum++
      if(!isTop && !isRight)
        if (gridx[r-1][c+1].value === -1)
          sum++
      if(!isBottom && !isRight)
        if (gridx[r+1][c+1].value === -1)
          sum++
      if(!isBottom && !isLeft)
        if (gridx[r+1][c-1].value === -1)
          sum++

      gridx[r][c].value = sum
    }
  }
}

console.log(gridx)

export const INITIAL_GRID = gridx
