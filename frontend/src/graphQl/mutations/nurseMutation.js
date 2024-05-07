import { gql } from "@apollo/client";

export const CREATE_NURSE = gql`
  mutation CreateNurse($employeeID: ID!, $nurseInput: NurseInput!) {
    createNurse(employeeID: $employeeID, nurseInput: $nurseInput) {
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
