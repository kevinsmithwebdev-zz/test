const express = require('express')

const fetch = require("node-fetch");

const router = express.Router()

router.get("/timezone", (req, res) => {
  let url = 'https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=' + process.env.G_KEY
  fetch(url)
    .then(response => {
      response.json().then(json => {
        console.log(json);
        res.json(json);
      });
    })
    .catch(error => {
      console.log(error);
    });


})


module.exports = router
