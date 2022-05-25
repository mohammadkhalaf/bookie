import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);

    throw new Error('please provide all values');
  }
  const isExisted = await User.findOne({ email });
  if (isExisted) {
    res.status(400);

    throw new Error('Email is already registered');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ user, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);

    throw new Error('please provide all values');
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('You are not registered yet !');
  }
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    res.status(401);

    throw new Error('Invalid Credentials!');
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({ user, token: generateToken(user._id) });
  }
};

const updateUser = async (req, res) => {
  // console.log(req.body);
  const { email, name } = req.body;
  if (!email || !name) {
    res.status(400);
    throw new Error('Please provide all values');
  }
  console.log(req.body);
  console.log(1);
  console.log(req.user);

  const existedUser = await User.findOne({ _id: req.user.userId });
  if (!existedUser) {
    res.status(401);
    throw new Error('You are not authorized');
  } else {
    const user = await User.findByIdAndUpdate(
      { _id: existedUser._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ user, token: generateToken(existedUser.id) });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: '1d' });
};
export { register, login, updateUser };
