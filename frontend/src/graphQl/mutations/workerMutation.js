import { gql } from "@apollo/client";

export const CREATE_WORKER = gql`
  mutation CreateTechnician($employeeID: ID!, $workerInput: WorkerInput!) {
    createWorker(employeeID: $employeeID, workerInput: $workerInput) {
      employee {
        firstname
        lastname
      }
      Type
      categorie
      responsabilite
    }
  }
`;
