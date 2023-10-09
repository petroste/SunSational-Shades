import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Customer from '../models/customers.model.js';
import { isAuth, isAdmin } from '../utils/tokenCheck.js';
import { tokenGenAndSign } from '../utils/jwtAuth.js';
import Inventory from '../models/inventory.model.js';
import Session from '../models/sessions.model.js';

const customerRouter = express.Router();

customerRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ username: req.body.username });
    // console.log(customer);
    if (customer) {
      if (bcrypt.compareSync(req.body.password, customer.password)) {
        const newToken = tokenGenAndSign(customer);
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 12 * 60 * 60 * 1000
          ),
          domain: 'localhost',
          httpOnly: true,
          sameSite: 'Strict',
          //secure: true,
        };
        // Maybe also add redirect to home here??
        const cook = res.cookie('token', newToken, cookieOptions);

        const session = new Session({
          customer: customer,
          login: new Date(),
          //Do not add logout because user has not logged out yet
        });

        //save user's session
        await session.save().then();

        res.send({
          _id: customer._id,
          username: customer.username,
          isAdmin: customer.isAdmin,
          loyaltyPoints: customer.loyaltyPoints,
        });
        return;
      } else {
        return res.status(401).send({
          token: null,
          message: 'Invalid password!',
        });
      }
    } else {
      return res.status(404).send({ message: 'User does not exist' });
    }
  })
);

customerRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const doesUserExist = await Customer.findOne({
      username: req.body.username,
    });
    if (!doesUserExist) {
      var pwRegExp = new RegExp(
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
      );
      var isPwLegal = pwRegExp.test(req.body.password);

      if (isPwLegal) {
        const customer = new Customer({
          name: req.body.name,
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, 8),
          loyaltyPoints: 0,
          isAdmin: false,
        });

        const createdCustomer = await customer.save().then();
        res.send({
          name: createdCustomer.name,
        });
      } else {
        return res.status(401).send({
          token: null,
          message: 'Invalid password!',
        });
      }
    } else {
      return res.status(404).send({ message: 'User already exists' });
    }
  })
);

customerRouter.post(
  '/logout',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ username: req.body.username }); //finds customer with given id param
    const session = await Session.findOne({ customer: customer }); //finds session of given customer
    session.logout = new Date();

    // //save user's session
    await session.save().then();

    // Redirect here, just like login
    res.clearCookie('token');
    res.status(200).json({
      success: true,
      message: 'Logged out',
    });
  })
);

//post request to add item to cart
customerRouter.post(
  '/add-to-cart/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param
    var cartCust = customer.cart;
    const product = await Inventory.findOne({ _id: req.body.id }); //finds product with given id

    //handle error
    if (product == null) {
      res.send('Cannot add to cart. Please select a valid product');
    }
    //add item to customer's cart
    cartCust.push(product);

    //update database
    await Customer.updateOne(
      { _id: customer._id },
      { $set: { cart: cartCust } }
    );

    //send entire customer
    res.send(customer);
  })
);

//post request to add item to cart
customerRouter.post(
  '/add-to-cart-copy/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param
    var cartCust = customer.cart;
    const product = await Inventory.findOne({ name: req.body.name }); //finds product with given id

    //handle error
    if (product == null) {
      res.send('Cannot add to cart. Please select a valid product');
    }
    //add item to customer's cart
    cartCust.push(product);

    //update database
    await Customer.updateOne(
      { _id: customer._id },
      { $set: { cart: cartCust } }
    );

    //send entire customer
    res.send(customer);
  })
);

//post request to remove one item from cart
customerRouter.post(
  '/remove-one/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param
    var cartCust = customer.cart;
    const product = await Inventory.findOne({ name: req.body.name }); //finds product with given id

    //handle error
    if (product == null) {
      res.send('Cannot remove from cart. Please select a valid product');
    }

    //find the index of the first occurrence of the product in the cart
    const index = cartCust.findIndex(
      (item) => item._id.toString() === product._id.toString()
    );

    //remove the item if it's found in the cart
    if (index > -1) {
      cartCust.splice(index, 1);

      //update database
      await Customer.updateOne(
        { _id: customer._id },
        { $set: { cart: cartCust } }
      );

      //send entire customer
      res.send(customer);
    } else {
      res.send('Product not found in cart.');
    }
  })
);

//post request to add item to cart
customerRouter.post(
  '/remove-from-cart/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param
    var cartCust = customer.cart;
    const product = await Inventory.findOne({ name: req.body.name }); //finds product with given name

    //handle error
    if (product == null) {
      res.send('Cannot remove from cart. Please select a valid product');
    }

    //remove item to customer's cart
    cartCust.remove(product);

    //update database
    await Customer.updateOne(
      { _id: customer._id },
      { $set: { cart: cartCust } }
    );

    //send entire customer
    res.send(customer);
  })
);

//post request to show entire customer's cart
customerRouter.get(
  '/cart/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param
    var cartCust = customer.cart;

    //send entire customer
    res.send(cartCust);
  })
);

//post request to change username
customerRouter.post(
  '/change-username/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //Before starting: get user by ID
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param

    //First, extract the new username
    const newUsername = req.body.newUsername;

    //Check if newUsername is taken
    const customerFind = await Customer.findOne({ username: newUsername });

    //if username is not taken
    if (customerFind === null) {
      //Now, update the database
      await Customer.updateOne(
        { _id: customer._id },
        { $set: { username: newUsername } }
      );
    }

    res.send(newUsername);
  })
);

//post request to change Name
customerRouter.post(
  '/change-name/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //Before starting: get user by ID
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param

    //First, extract the new name
    const newName = req.body.newName;

    //No need to check if new name is taken: duplicates allowed
    //Update the database
    await Customer.updateOne(
      { _id: customer._id },
      { $set: { name: newName } }
    );

    res.send('New name is: ' + newName);
  })
);

//returns true if customer is admin, false otherwise
customerRouter.get(
  '/is-cust-admin/:id',
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    //Before starting: get user by ID
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param
    var isAdministrator = false;

    if (customer.isAdmin) {
      isAdministrator = true;
    }

    res.send(isAdministrator);
  })
);

//post request to change password
customerRouter.post(
  '/change-password/:id',
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    //Testing: Password: 123Jackie! $2a$08$JcYB/nOYpQNQgSt7MZolWuiqxMAvi451Jgyr5ENQoR8sUUDNoApZC
    //Before starting: get user by ID
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param

    //First, extract the new password1 and password2
    const newPassword1 = req.body.newPassword1;
    const newPassword2 = req.body.newPassword2;

    //Check if both passwords match
    if (newPassword1 === newPassword2) {
      //validate if new password is legal
      var pwRegExp = new RegExp(
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
      );
      var isPwLegal = pwRegExp.test(newPassword1);

      if (isPwLegal) {
        //if new password is legal
        await Customer.updateOne(
          { _id: customer._id },
          { $set: { password: bcrypt.hashSync(newPassword1, 8) } }
        );
        return res.send('Password updated');
      } else {
        return res.status(401).send({
          message: 'Invalid password!',
        });
      }
    } else {
      res.send('Passwords do not match');
    }
  })
);

//get request to send entire customer
// Get customer name by user id
customerRouter.get(
  '/get-customer/:id',
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const customer = await Customer.findOne({ _id: req.params.id });
      if (customer) {
        res.send(customer);
      } else {
        res.status(404).send({ message: 'Customer not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error getting customer name', error });
    }
  })
);

export default customerRouter;
