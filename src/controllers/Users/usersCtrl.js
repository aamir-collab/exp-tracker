const expressAsyncHandler = require('express-async-handler');
const User = require('../../models/User');

const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;
  const userExist = await User.findOne({ email });
  if (userExist) throw new Error('User already exists');
  try {
    const user = await User.create({ email, firstname, lastname, password });
    res.status(200).json(user);
  } catch (error) {
    res.json(error);
  }
});
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  try {
    res.join(users);
  } catch (error) {
    res.json(error);
  }
});
module.exports = { registerUser, fetchUsersCtrl };
