// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http"; // Import createServer from http
import bcrypt from "bcrypt";
const password = "admin123";
const saltRounds = 10;
import { initSocketIO, getIoInstance } from "./configs/socketHandler.js";
bcrypt.hash(password, saltRounds, function (err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log(hash);
  }
});
// Import database connection function
import connectDB from "./configs/db.js";

// Import ApolloServer and typeDefs/resolvers
import { ApolloServer } from "apollo-server-express";
import DoctorTypeDefs from "./graphql/typeDefs/Doctor.typeDefs.js";
import EmployeeTypeDefs from "./graphql/typeDefs/employee.typeDefs.js";
import NurseTypeDefs from "./graphql/typeDefs/Nurse.typeDefs.js";
import TechnicianTypeDefs from "./graphql/typeDefs/Technician.typeDefs.js";
import WorkerTypeDefs from "./graphql/typeDefs/worker.typeDefs.js";
import SecretairyTypeDefs from "./graphql/typeDefs/secretairy.typeDefs.js";
import HrTypeDefs from "./graphql/typeDefs/hr.typeDefs.js";
import DoctorResolver from "./graphql/resolvers/doctorResolver.js";
import EmployeeResolver from "./graphql/resolvers/employeeResolver.js";
import NurseResolver from "./graphql/resolvers/nurseResolver.js";
import TechnicianResolver from "./graphql/resolvers/technicianResolver.js";
import WorkerResolver from "./graphql/resolvers/workerResolver.js";
import SecretairyResolver from "./graphql/resolvers/secretairyResolver.js";
import HrResolver from "./graphql/resolvers/hrResolver.js";

import EmployeeRoute from "./routes/employeeRoute.js";
import VacationRoute from "./routes/vacationRoute.js";
import ServicesRoute from "./routes/serviceRoute.js";
import GuardBoardRoute from "./routes/guardBoardRoute.js";
import EmployeeGaurdboardRoute from "./routes/employeeGuardBoardRoute.js";
import RosterRoute from "./routes/rosterRoute.js";
import AdminRoute from "./routes/adminRoute.js";
import LeaveDemandeRoute from "./routes/leaveDemandeRoute.js";
import DocumentDemandeRoute from "./routes/documentDemandeRoute.js";
import TrainingDemandeRoute from "./routes/trainingDemandeRoute.js";
import PermutationRequestRoute from "./routes/permutationRequestRoute.js";
import NotificationRoute from "./routes/NotificationRoute.js";
import PrimeRoute from "./routes/primeRoute.js";
import SchemaObjectModel from "./routes/schemaObjectRoute.js";

import RequestHistoryRoute from "./routes/requestHistoryRoute.js";
import ModificationHistoryRoute from "./routes/modificationHistoryRoute.js";
dotenv.config();

connectDB();

const typeDefsMerge = [
  EmployeeTypeDefs,
  DoctorTypeDefs,
  NurseTypeDefs,
  TechnicianTypeDefs,
  WorkerTypeDefs,
  SecretairyTypeDefs,
  HrTypeDefs,
];

const resolversMerge = [
  EmployeeResolver,
  DoctorResolver,
  NurseResolver,
  TechnicianResolver,
  WorkerResolver,
  SecretairyResolver,
  HrResolver,
];

const port = process.env.PORT || 5000;

async function startServer() {
  const app = express();

  app.use("/uploads", express.static("uploads"));

  app.use(bodyParser.json());

  app.use(cors());

  const httpServer = createServer(app);

  initSocketIO(httpServer);

  const server = new ApolloServer({
    typeDefs: typeDefsMerge,
    resolvers: resolversMerge,
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use("/api/vacations", VacationRoute);
  app.use("/api/services", ServicesRoute);
  app.use("/api/guardboard", GuardBoardRoute);
  app.use("/api/rosters", RosterRoute);
  app.use("/api/employeeGaurdboard", EmployeeGaurdboardRoute);
  app.use("/api/employee", EmployeeRoute);
  app.use("/api/admin", AdminRoute);
  app.use("/api/demandeLeave", LeaveDemandeRoute);
  app.use("/api/documentDemande", DocumentDemandeRoute);
  app.use("/api/trainingDemande", TrainingDemandeRoute);
  app.use("/api/permutationRequest", PermutationRequestRoute);
  app.use("/api/notifications", NotificationRoute);
  app.use("/api/prime", PrimeRoute);
  app.use("/api/schemaObject", SchemaObjectModel);
  app.use("/api", RequestHistoryRoute);
  app.use("/api/modifications", ModificationHistoryRoute);
  app.use((req, res) => {
    res.send("Hello from the Express Apollo server");
  });
  const io = getIoInstance();
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.emit("notification", { message: "New notification!" });
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  return io;
}

startServer();
