const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
  {
    firstname: {
      required: [true, 'first name required'],
      type: String,
    },
    lastname: {
      required: [true, 'last name required'],
      type: String,
    },
    email: {
      required: [true, 'email is required'],
      type: String,
    },
    password: {
      required: [true, 'password required'],
      type: String,
    },
    isAdmin: {
      // required: [true, 'first name required'],
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);
//hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
