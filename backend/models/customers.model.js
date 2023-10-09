import mongoose from 'mongoose';
import Inventory from './inventory.model.js';

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: { type: String, required: true, default: '' },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    loyaltyPoints: { type: Number, required: true },
    pastOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

customerSchema.methods.getCartPrice = async (cust) => {
  // console.log("Method A");
  let customerCart = await cust.cart;
  let cost = 0;
  for (let i = 0; i < customerCart.length; i++) {
    const product = await Inventory.findOne({ _id: customerCart[i] }); //finds product with given name
    cost += product.price;
  }
  return cost;
};

customerSchema.methods.getCartPriceInLoyaltyPoints = async (cust) => {
  // console.log('We are here');
  let cost = cust.getCartPrice(cust);
  return cost * 10;
};

const User = mongoose.model('Customer', customerSchema);
export default User;
