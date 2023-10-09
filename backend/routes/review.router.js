import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Inventory from '../models/inventory.model.js';
import User from '../models/customers.model.js';

const ratingRouter = express.Router();

ratingRouter.post(
  '/add/',
  expressAsyncHandler(async (req, res) => {
    const product = await Inventory.findOne({ name: req.body.inventoryName });

    if (product == null)
    {
      res.status(404).send({ message: "Inventory not found!"});
      return;
    }
    const user = await User.findOne({ username: req.body.username }); 

    if (user == null)
    {
      res.status(404).send({ message: "User not found!"});
      return;
    }

    const review = {
      name: user.name,
      username: req.body.username,
      comment: req.body.comment,
      rating: req.body.rating,
    };

    product.reviews.push(review);

    //saves order to database
    await product.save().then();

    res.send({ 
      message: 'Your review has been added.',
    });
  })
);

export default ratingRouter;
