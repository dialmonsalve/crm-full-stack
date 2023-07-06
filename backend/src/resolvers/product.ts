import Product from '../models/Product';
import { isValidObjectId } from 'mongoose';
import { IProduct } from '../types';

const getProducts = async () => {

  try {
    const products = await Product.find();

    return products;

  } catch (error) {
    console.log(error);
    return;
  };
};

const getProduct = async (_: any, { id }: { id: string }) => {

  const product = await Product.findById(id);

  if (!isValidObjectId(id)) {
    throw new Error('Not is a valid id');
  };

  if (!product) {
    throw new Error('Product does not exist');
  };

  return product;
};

const createProduct = async (_: any, { input }: { input: IProduct }) => {

  try {
    const product = new Product(input);

    const result = await product.save();

    return result;

  } catch (error) {
    console.log(error);
    return;
  };
};

const updateProduct = async (_: any, { id, input }: { id: string, input: IProduct }) => {

  let product = await Product.findById(id);

  if (!isValidObjectId(id)) {
    throw new Error('Not is a valid id');
  };

  if (!product) {
    throw new Error('Product does not exist');
  };

  product = await Product.findOneAndUpdate({ _id: id }, input, { new: true });

  return product;
};

const deleteProduct = async (_: any, { id }: { id: string }) => {

  let product = await Product.findById(id);

  if (!isValidObjectId(id)) {
    throw new Error('Not is a valid id');
  }

  if (!product) {
    throw new Error('Product does not exist');
  }

  product = await Product.findOneAndDelete({ _id: id });

  return 'product has been deleted';
};

const searchProduct = async (_: any, { text }: { text: string }) => {

  const products = await Product.find({ $text: { $search: text } });

  return products;
}

const Products = {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  searchProduct,
};

export default Products;