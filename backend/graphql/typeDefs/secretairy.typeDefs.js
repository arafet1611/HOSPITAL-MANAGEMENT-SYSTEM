import { gql } from "apollo-server-express";

const secretairyTypeDefs = gql`
  type Secretairy {
    id: ID!
    employee: Employee!
    responsabilite: String
  }
  type Query {
    secretairy(ID: ID!): Secretairy
    secretairys: [Secretairy]
  }
  input SecretairyInput {
    responsabilite: String
  }
  type Mutation {
    createSecretairy(
      serviceID: ID!
      employeeID: ID!
      secretairyInput: SecretairyInput
    ): Secretairy!
    editSecretairy(
      secretairyID: ID!
      secretairyInput: SecretairyInput!
    ): Secretairy!
  }
`;
export default secretairyTypeDefs;
