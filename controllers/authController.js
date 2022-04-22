import User from '../models/userModel.js';
const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

const login = async (req, res) => {
  res.send('login');
};

const updateUser = async (req, res) => {
  res.send('update');
};

export { register, login, updateUser };
