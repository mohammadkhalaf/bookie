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
  res.send('login');
};

const updateUser = async (req, res) => {
  res.send('update');
};

export { register, login, updateUser };
