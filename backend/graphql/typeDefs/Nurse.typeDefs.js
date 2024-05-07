import { gql } from "apollo-server-express";

const NurseTypeDefs = gql`
  type Nurse {
    id: ID!
    employee: Employee!
    Type: String!
    categorie: String
    responsabilite: String
  }
  type Query {
    nurse(ID: ID!): Nurse
    nurses: [Nurse]
  }

  input NurseInput {
    Type: String
    categorie: String
    responsabilite: String
  }
  type Mutation {
    createNurse(employeeID: ID!, nurseInput: NurseInput!): Nurse!
    editNurse(nurseID: ID!, nurseInput: NurseInput!): Nurse!
  }
`;
export default NurseTypeDefs;
