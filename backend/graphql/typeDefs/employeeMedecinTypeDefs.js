import { gql } from "apollo-server-express";

const employeeMedecinTypeDefs = gql`
  type Employee {
    id: ID!
    firstname: String
    lastname: String
    image: String
    Phone: Int
    email: String
    dateJoining: String
  }

  type Medecin {
    id: ID!
    employee: Employee!
    Type: String!
    categorie: String
    responsabilite: String
  }

  type Service {
    employee: [Employee!]!
    name: String
    information: String!
    categorie: String!
  }

  type Query {
    employee(ID: ID!): Employee
    getEmployee(amount: Int): [Employee]
    getAllEmployee: [Employee]
    getMedecin(ID: ID!): Medecin
    getAllMedecin: [Medecin]
  }

  input EmployeeInput {
    firstname: String
    lastname: String
    image: String
    Phone: String
    email: String
    dateJoining: String
  }

  input MedecinInput {
    Type: String
    categorie: String
    responsabilite: String
  }

  type Mutation {
    createEmployee(employeeInput: EmployeeInput!): Employee!
    deleteEmployee(ID: ID!): Boolean
    editEmployee(ID: ID!, employeeInput: EmployeeInput!): Boolean

    createMedecin(employeeID: ID!, medecinInput: MedecinInput!): Medecin!
    editMedecin(medecinID: ID!, medecinInput: MedecinInput!): Medecin!
  }
`;

export default employeeMedecinTypeDefs;
