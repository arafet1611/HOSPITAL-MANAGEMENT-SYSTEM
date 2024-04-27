import mongoose from "mongoose";
//import { ApolloServer } from "apollo-server-express";
/*import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers";
const server = new ApolloServer({
  typeDefs,
  resolvers
})*/
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODBURI);

    console.log(`MongoDB Connect: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
