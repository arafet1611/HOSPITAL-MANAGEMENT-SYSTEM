import { gql } from "@apollo/client";

export const CREATE_TECHNICIAN = gql`
  mutation CreateTechnician(
    $employeeID: ID!
    $technicianInput: TechnicianInput!
  ) {
    createTechnician(
      employeeID: $employeeID
      technicianInput: $technicianInput
    ) {
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
