import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { ApolloServer } from "apollo-server-express";
import EmployeeMedecinTypeDefs from "./graphql/typeDefs/employeeMedecinTypeDefs.js";
import EmployeeMedecinResolvers from "./graphql/resolvers/EmployeeMedecinResolver.js";
import VacationRoute from "./routes/vacationRoute.js";
import ServicesRoute from "./routes/serviceRoute.js";
import GuardBoardRoute from "./routes/guardBoardRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();
connectDB();
const combinedTypeDefs = [EmployeeMedecinTypeDefs];
const combinedResolvers = [EmployeeMedecinResolvers];
const port = 5000 || process.env.PORT;
async function startServer() {
  const app = express();
  app.use("/uploads", express.static("uploads"));
  app.use(bodyParser.json());
  const server = new ApolloServer({
    typeDefs: combinedTypeDefs,
    resolvers: combinedResolvers,
  });
  await server.start();
  app.use(cors({ origin: "*" }));

  // Routes
  app.use("/api/vacations", VacationRoute);
  app.use("/api/services", ServicesRoute);
  app.use("/api/guardboard", GuardBoardRoute);
  server.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("hello from express apollo server");
  });
  app.listen(port, () => {
    console.log(`server in running on ${port}`);
  });
}
startServer();
