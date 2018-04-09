const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const router = express.Router()

const authentication = require('../../config/authentication')

const User = require('../../models/user.js')

const { registerIncomplete, registerUsernameTaken, registerSuccess, registerServerError, deleteUserSuccess, deleteUserFailure } = require('../../constants/api_msg')

//*************

router.post("/register", (req, res) => {

  let { username, password, zipCode } = req.body

  if (!username || !password)
    return res.status(registerIncomplete.code).json(registerIncomplete.message)

  let newUser = new User({
    username,
    zipCode
  })

  User.count({ username }).exec()
  .then(count => {
    if (count!==0)
      throw { code: registerUsernameTaken.code, message: registerUsernameTaken.message(username) }
    let newUser = new User({
      username,
      password,
      zipCode
    })
    return User.register(newUser, password)
  })
  .then(user => {
    return res.status(registerSuccess.code).json(registerSuccess.message(user))
  })
  .catch(err => {
    if (err.code < 500 && err.message)
      res.status(err.code).json({ error: err.message })
    else
      res.status(registerServerError.code(err.code)).json(registerServerError.message(err.message))
  })
})

//*************

router.post('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: false })
  .then(user => {
    console.log('in update', user)
    res.status(200).json({ user, success: "user updated" });
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: 'Error in database.' })
  })
})

//*************

router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findByIdAndRemove(req.user.id)
  .then(user => {
    res.status(deleteUserSuccess.code).json(deleteUserSuccess.message(user.username))
  })
  .catch(err => {
    console.error(err)
    res.status(deleteUserFailure.code).json(deleteUserFailure.message);
  })
})


// Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
//     // As always, handle any potential errors:
//     if (err) return res.status(500).send(err);
//     // We'll create a simple object to send back with a message and the id of the document that was removed
//     // You can really do this however you want, though.
//     const response = {
//         message: "Todo successfully deleted",
//         id: todo._id
//     };
//     return res.status(200).send(response);
// });



//*************

module.exports = router
