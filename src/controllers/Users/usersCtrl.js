const expressAsyncHandler = require('express-async-handler');
const User = require('../../models/User');
const generateToken = require('../../middlewares/generateToken');


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

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const userFound = await User.findOne({ email });

  if (userFound && (await userFound?.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid login credentials');
  }
});
module.exports = { registerUser, fetchUsersCtrl, loginUserCtrl };
