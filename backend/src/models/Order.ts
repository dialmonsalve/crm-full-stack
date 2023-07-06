import { Schema, model } from "mongoose";
import { IOrder } from "../types";

const OrderSchema = new Schema<IOrder>({

  order: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  salesperson: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['COMPLETED', 'CANCELED', 'PENDING'],
    default: 'PENDING'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export default model('Order', OrderSchema)