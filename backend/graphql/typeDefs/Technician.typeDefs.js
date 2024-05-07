import { gql } from "apollo-server-express";

const TechnicianTypeDefs = gql`
  type Technician {
    id: ID!
    employee: Employee!
    Type: String!
    categorie: String
    responsabilite: String
  }
  type Query {
    technician(ID: ID!): Technician
    technicians: [Technician]
  }
  input TechnicianInput {
    Type: String
    categorie: String
    responsabilite: String
  }
  type Mutation {
    createTechnician(
      employeeID: ID!
      technicianInput: TechnicianInput
    ): Technician!
    editTechnician(
      technicianID: ID!
      technicianInput: DoctorInput!
    ): Technician!
  }
`;
export default TechnicianTypeDefs;
