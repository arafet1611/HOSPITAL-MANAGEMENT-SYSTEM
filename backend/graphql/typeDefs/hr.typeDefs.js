import { gql } from "apollo-server-express";

const hrTypeDefs = gql`
  type Hr {
    id: ID!
    employee: Employee!
    responsabilite: String
  }
  type Query {
    hr(ID: ID!): Hr
    hrs: [Hr]
  }
  input HrInput {
    responsabilite: String
  }
  type Mutation {
    createHr(employeeID: ID!, hrInput: HrInput): Hr!
    editHr(hrID: ID!, hrInput: HrInput!): Hr!
  }
`;
export default hrTypeDefs;
