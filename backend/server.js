import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { ApolloServer } from "apollo-server-express";
import DoctorTypeDefs from "./graphql/typeDefs/Doctor.typeDefs.js";
import EmployeeTypeDefs from "./graphql/typeDefs/employee.typeDefs.js";
import NurseTypeDefs from "./graphql/typeDefs/Nurse.typeDefs.js";
import TechnicianTypeDefs from "./graphql/typeDefs/Technician.typeDefs.js";
import WorkerTypeDefs from "./graphql/typeDefs/worker.typeDefs.js";
import DoctorResolver from "./graphql/resolvers/doctorResolver.js";
import EmployeeResolver from "./graphql/resolvers/employeeResolver.js";
import NurseResolver from "./graphql/resolvers/nurseResolver.js";
import TechnicianResolver from "./graphql/resolvers/technicianResolver.js";
import WorkerResolver from "./graphql/resolvers/workerResolver.js";
import EmployeeRoute from "./routes/employeeRoute.js";
import VacationRoute from "./routes/vacationRoute.js";
import ServicesRoute from "./routes/serviceRoute.js";
import GuardBoardRoute from "./routes/guardBoardRoute.js";
import EmployeeGaurdboardRoute from "./routes/employeeGuardBoardRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();
connectDB();
const typeDefsMerge = [
  EmployeeTypeDefs,
  DoctorTypeDefs,
  NurseTypeDefs,
  TechnicianTypeDefs,
  WorkerTypeDefs,
];
const resolversMerge = [
  EmployeeResolver,
  DoctorResolver,
  NurseResolver,
  TechnicianResolver,
  WorkerResolver,
];
const port = 5000 || process.env.PORT;
async function startServer() {
  const app = express();
  app.use("/uploads", express.static("uploads"));
  app.use(bodyParser.json());
  const server = new ApolloServer({
    typeDefs: typeDefsMerge,
    resolvers: resolversMerge,
  });
  await server.start();
  app.use(cors({ origin: "*" }));

  // Routes
  app.use("/api/vacations", VacationRoute);
  app.use("/api/services", ServicesRoute);
  app.use("/api/guardboard", GuardBoardRoute);
  app.use("/api/employeeGaurdboard", EmployeeGaurdboardRoute);
  app.use("/api/employee", EmployeeRoute);
  server.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("hello from express apollo server");
  });
  app.listen(port, () => {
    console.log(`server in running on ${port}`);
  });
}
startServer();
