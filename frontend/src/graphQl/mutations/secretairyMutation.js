import { gql } from "@apollo/client";

export const CREATE_SECRETAIRY = gql`
  mutation CreateSecretairy(
    $serviceID: ID!
    $employeeID: ID!
    $secretairyInput: SecretairyInput!
  ) {
    createSecretairy(
      serviceID: $serviceID
      employeeID: $employeeID
      secretairyInput: $secretairyInput
    ) {
      employee {
        firstname
        lastname
      }
      responsabilite
    }
  }
`;
