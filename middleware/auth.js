import jwt from 'jsonwebtoken';
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401);

    throw new Error('You are not authorized');
  }
  const token = authHeader.split(' ')[1];
  console.log(token);
  console.log(process.env.SECRET_TOKEN);
  try {
    var decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    console.log(decoded);

    req.user = { userId: decoded.id };
    console.log(`The auth middle ware is working , ${req.user}`);
  } catch (error) {
    res.status(401);

    throw new Error('You are not authorized');
  }

  next();
};
export default auth;
