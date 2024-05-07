import { gql } from "apollo-server-express";

const WorkerTypeDefs = gql`
  type Worker {
    id: ID!
    employee: Employee!
    Type: String!
    categorie: String
    responsabilite: String
  }
  type Query {
    worker(ID: ID!): Worker
    workers: [Worker]
  }

  input WorkerInput {
    Type: String
    categorie: String
    responsabilite: String
  }
  type Mutation {
    createWorker(employeeID: ID!, workerInput: WorkerInput!): Worker!
    editWorker(workerID: ID!, workerInput: WorkerInput!): Worker!
  }
`;
export default WorkerTypeDefs;
