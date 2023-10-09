import jwt from 'jsonwebtoken';

//authenticates user
export const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res
            .status(401)
            .send({ message: 'Invalid Token. Please Log in Again!' });
        } else {
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token. Please Log In again!' });
  }
};

//authenticates admin
export const isAdmin = (req, res, next) => {
  if (req.username && req.username.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
