const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.pre('save', async function(next) {
  try {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(this.password, saltRounds);
    next();

  } catch (e) {
    console.log(e)
  }
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) {
        reject(err);
        return
      }
      resolve(isMatch)
    });
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
