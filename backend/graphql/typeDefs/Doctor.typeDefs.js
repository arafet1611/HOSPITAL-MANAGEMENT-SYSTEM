import { gql } from "apollo-server-express";

const DoctorTypeDefs = gql`
  scalar ServiceId

  type Doctor {
    id: ID!
    employee: Employee!
    Type: String!
    categorie: String
    responsabilite: String
  }
  type Query {
    doctorsByService(ServiceId: ServiceId!): [Doctor]
    doctor(ID: ID!): Doctor
    doctors: [Doctor]
  }

  input DoctorInput {
    Type: String
    categorie: String
    responsabilite: String
  }
  type Mutation {
    createDoctor(employeeID: ID!, doctorInput: DoctorInput!): Doctor!
    editDoctor(doctorID: ID!, doctorInput: DoctorInput!): Doctor!
  }
`;
export default DoctorTypeDefs;
