import { gql } from "apollo-server-express";

const EmployeeTypeDefs = gql`
  type Employee {
    id: ID!
    firstname: String
    lastname: String
    email: String
    phone: String
    sex: String
    image: String
    job: String
    dateJoining: String
    service: String
    isActive: Boolean
  }

  type Query {
    employee: Employee
    employees: [Employee]
    employeeByStatus(isActive: Boolean!): [Employee]
  }
  input EmployeeInput {
    firstname: String
    lastname: String
    email: String
    phone: String
    sex: String
    job: String
    service: String
    isActive: Boolean
  }

  type Mutation {
    createEmployee(employeeInput: EmployeeInput!): Employee!
    deleteEmployee(ID: ID!): Boolean
    editEmployee(ID: ID!, employeeInput: EmployeeInput!): Employee!
    updateEmployeeStatus(ID: ID!, isActive: Boolean!): Employee!
  }
`;
export default EmployeeTypeDefs;
