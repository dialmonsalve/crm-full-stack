import bcryptjs from 'bcryptjs'

import User from '../models/User';
import Order from '../models/Order';

import { CreateToken } from '../helpers/tokens';
import { ApolloContext, IAuthInput, IUser } from '../types';

const getUser = (_: any, { }, ctx: ApolloContext) => {

  const user = ctx.user;

  return user;
}

const createUser = async (_: any, { input }: { input: IUser }) => {

  const { email, password } = input;

  //Check if user exists
  const existsUser = await User.findOne({ email });

  if (existsUser) throw new Error('User is already registered');

  //hash password
  const salt = bcryptjs.genSaltSync();
  input.password = bcryptjs.hashSync(password, salt);

  try {
    // Save new user on db 
    const user = new User(input)
    user.save()
    return user

  } catch (error) {
    console.log(error);
    return;
  };
};

const authUser = async (_: any, { input }: { input: IAuthInput }) => {

  const { email, password } = input;

  // Check if user exists
  const existsUser = await User.findOne({ email });
  if (!existsUser) throw new Error('User does not exist');

  // Check if password is correct
  const successPassword = bcryptjs.compareSync(password, existsUser.password);

  if (!successPassword) throw new Error('email or password are wrong');

  // create token
  return {
    token: CreateToken(existsUser, process.env.SECRETPRIVATEKEY, '24h')
  };
};

const getBetterSalespersons = async () => {

  const salespersons = await Order.aggregate([
    { $match: { status: 'COMPLETED' } },
    {
      $group: {
        _id: '$salesperson',
        total: { $sum: '$total' }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'salesperson'
      }
    },
    { $limit: 3 }, { $sort: { total: -1 } }
  ]);

  return salespersons;
}

const Users = {
  authUser,
  createUser,
  getUser,
  getBetterSalespersons
};

export default Users;