var mongoose = require("mongoose")
var bcrypt = require("bcryptjs")

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  hash: {
    type: String
  },
  salt: {
    type: String
  },
  zipCode: {
    type: String
  }
})

var User = module.exports = mongoose.model('User', UserSchema)


module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.hash, salt, function(err, hash) {
      newUser.hash = hash
      newUser.salt = salt
      newUser.save(callback)
    })
  })
}

module.exports.changePassword = (data, callback) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(data.newPassword, salt, function(err, hash) {
      var query = { username: data.username };
      User.findOneAndUpdate(query, { password: hash }, {new: true}, callback);
    })
  })
}

module.exports.getUserByUsername = (username, callback) => {
  var query = {username: username}
  User.findOne(query, callback)
}

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback)
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  if (!hash)
    hash = ""
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch)
  })
}
