const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: String,
  createdAt: { type: Date, default: Date.now() },
  isAdmin: { type: Boolean, default: false },
  provider: { type: String, default: 'local' },
  providerId: Number
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

UserSchema.static(
  'handleSSOSignIn',
  function(provider, providerId, email, username) {
    // find user by provider and providerId
    // create user if not existed
    const User = this;
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({
          provider,
          providerId
        }).exec();
        if (user) {
          return resolve(user)
        } else {
          const user = new User({
            username,
            email,
            provider,
            providerId
          });
          const createdUser = await user.save();
          return resolve(createdUser)
        }
      } catch (e) {
        reject(e)
      }
    });
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
