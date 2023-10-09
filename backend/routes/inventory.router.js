import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Inventory from '../models/inventory.model.js';

const inventoryRouter = express.Router();

inventoryRouter.get(
  '/products',
  expressAsyncHandler(async (req, res, next) => {
    // get filters from request
    let filterColour = req.query.colour;
    let filterBrand = req.query.brand;
    let filterCategory = req.query.cat;
    let sortingParam = req.query.sort;

    // + is ascending sort, - is descending
    // eg.(-price = highest to lowest price)
    //    ( price = lowest to highest price)
    //    ( name  = A -> Z)
    //    (-name  = Z -> A)

    let dbQuery = [];

    if (!sortingParam || sortingParam === '') {
      sortingParam = { $natural: 1 };
    }

    if (filterColour !== undefined && filterColour !== '') {
      dbQuery.push({ colour: { $eq: filterColour } });
    }
    if (filterBrand !== undefined && filterBrand !== '') {
      dbQuery.push({ brand: { $eq: filterBrand } });
    }
    if (filterCategory !== undefined && filterCategory !== '') {
      dbQuery.push({ category: { $eq: filterCategory } });
    }

    try {
      var returnProducts;

      if (dbQuery.length == 0) {
        returnProducts = await Inventory.find({}).sort(sortingParam);
      } else {
        returnProducts = await Inventory.find({ $and: dbQuery }).sort(
          sortingParam
        );
      }

      if (returnProducts) {
        res.status(201).json({
          products: returnProducts,
        });
      } else {
        res.status(404).send({ message: 'Products Not Found' });
      }
    } catch (error) {
      console.log(error);
      console.log(dbQuery);
      console.log(sortingParam);
      next(error);
    }
  })
);

inventoryRouter.get(
  '/recommended',
  expressAsyncHandler(async (req, res, next) => {
    const recommendedItems = await Inventory.find({})
      .sort({ rating: -1 })
      .limit(5);
    if (recommendedItems) {
      res.status(201).json({
        products: recommendedItems,
      });
    } else {
      res.status(404).send({ message: 'Products Not Found' });
    }
  })
);

inventoryRouter.get(
  '/products/:id',
  expressAsyncHandler(async (req, res, next) => {
    try {
      var returnProducts;

      returnProducts = await Inventory.findOne({ _id: req.params.id });
      if (returnProducts) {
        res.status(201).json({
          product: returnProducts,
        });
      } else {
        res.status(404).send({ message: 'Products Not Found' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

//Diego added: we might delete
inventoryRouter.get(
  '/get-product/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Inventory.findOne({ _id: req.params.id }); //finds product with given id
    res.send(product);
  })
);

export default inventoryRouter;
