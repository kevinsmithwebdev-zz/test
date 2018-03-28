const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  hash:     { type: String },
  password: { type: String },
  salt:     { type: String },
  zipCode:  { type: String }
})


// Automatically strip hash and salt before sending back to the client
// must be function to use *this*
UserSchema.methods.toJSON = function() {
  let obj = this.toObject()
  delete obj.hash
  delete obj.salt
  return obj
}

UserSchema.plugin(passportLocalMongoose)

const User = module.exports = mongoose.model('User', UserSchema)

//*************



// module.exports.comparePassword = (candidatePassword, hash) => {
//   console.log('cp', candidatePassword)
//   console.log('cp', hash)
//   return bcrypt.compare(candidatePassword, hash)
//   // (err, isMatch) => {
//   //   if (err) throw err
//   //   callback(null, isMatch)
//   // })
// }
//
// //************
//
// module.exports.changePassword = (data, callback) => {
//   // wowsers
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(data.newPassword, salt, function(err, hash) {
//       let query = { username: data.username }
//       User.findOneAndUpdate(query, { password: hash }, {new: true}, callback)
//     })
//   })
// }

//*************
//
// module.exports.getUserByUsername = (username, callback) => {
//   let query = {username: username}
//   return User.findOne(query, callback)
// }

// module.exports.getUserById = (id, callback) => {
//   User.findById(id, callback)
// }


module.exports.login = (username, candidatePassword) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username })
    .then(user => {
      if (!user)
        throw "user not found"
      console.log('login 98sdf user', user)
      User.authenticate(username, candidatePassword).exec()
      .then(user => {
        console.log('auth', user)
        resolve(user)
      })
      .catch(err => {
        console.log('auth err')
        throw err
      })


    })
    .catch( err => reject(err))
  })
}
