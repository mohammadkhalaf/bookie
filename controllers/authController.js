import User from '../models/userModel.js';

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

  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(201).json({ user: { email: user.email, name: user.name }, token });
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
  const token = user.createJWT();
  user.password = undefined;

  res.json({ user, token });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    res.status(400);
    throw new Error('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    res.status(401);
    throw new Error('You are not authorized');
  }
  user.email = email;
  user.name = name;

  await user.save();
  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({ user, token });
};

export { register, login, updateUser };
