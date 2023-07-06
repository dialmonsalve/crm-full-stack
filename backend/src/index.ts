import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import jwt from 'jsonwebtoken';

import resolvers from './db/resolvers';
import typeDefs from './db/schema';
import connectDB from './config/db';


const main = async () => {

  connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {

      const token = req.headers['authorization'] || ''; 

      // if (!token) return {};
      
      if (token) {
        try {
          const user = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETPRIVATEKEY!)

          return { user }

        } catch (error) {
         
          console.log(error);

        }
      }
      return {};
    }
  });
  console.log(`Server ready at ${url}`);
}

main();
