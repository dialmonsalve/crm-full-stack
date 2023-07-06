import { Schema, model } from "mongoose";
import { IProduct } from "../types";

const ProductSchema = new Schema<IProduct>({

  name: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

ProductSchema.index({ name: 'text' })

export default model('Product', ProductSchema)