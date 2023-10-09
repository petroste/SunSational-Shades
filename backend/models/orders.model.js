import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
      orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory',
            required: true,
        },
      ],
      totalPrice: { type: Number, required: true },
      customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    },
    {
      timestamps: true,
    }
  );
  const Order = mongoose.model('Order', orderSchema);
  export default Order;