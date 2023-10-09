import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    login: { type: Date, required: true },
    logout: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);
const Session = mongoose.model('Session', sessionSchema);
export default Session;
