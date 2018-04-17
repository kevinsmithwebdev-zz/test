const express = require('express')
const url = require('url')
const fetch = require("node-fetch")

const router = express.Router()


router.get("/timezone", (req, res) => {

  let dt = Math.round(Date.now()/1000)
  let { lat, lon } = url.parse(req.url, true).query

  if (isNaN(lat) || isNaN(lon) || lat > 90 || lat < -90 || lon > 180 || lon < -180)
    return res.status(400).json({ error: 'lat and lon must be a number - -90<=lon<=90 and -180<=lat<=180' })

  let gUrl = `https://maps.googleapis.com/maps/api/timezone/json` +
                `?location=${lat},${lon}` +
                `&timestamp=${dt}&key=${process.env.G_KEY}`

  fetch(gUrl)
  .then(response => {
    response.json().then(json => {
      res.json(json)
    })
  })
  .catch(error => {
    console.log(error)
  })
})

router.get("/ping", (req, res) => {
  res.json({ data: "pong" })
})

module.exports = router
