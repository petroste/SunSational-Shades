import jwt from 'jsonwebtoken';

export const tokenGenAndSign = (customer) => {
    return jwt.sign(
      {
        _id: customer._id,
        name: customer.name,
        username: customer.username,
        isAdmin: customer.isAdmin,
      },
      process.env.JWT_SECRET || 'somethingsecret',
      {
        expiresIn: '30d',
      }
    );
  };
