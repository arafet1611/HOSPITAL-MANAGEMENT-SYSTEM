import { gql } from "@apollo/client";

export const CREATE_HR = gql`
  mutation CreateHr($employeeID: ID!, $hrInput: HrInput!) {
    createHr(employeeID: $employeeID, hrInput: $hrInput) {
      employee {
        firstname
        lastname
      }
      responsabilite
    }
  }
`;
