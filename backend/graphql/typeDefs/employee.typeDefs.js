import { gql } from "apollo-server-express";

const EmployeeTypeDefs = gql`
  type Employee {
    id: ID!
    firstname: String
    lastname: String
    email: String
    phone: String
    sex: String
    image:  String
    job: String
    dateJoining: String
    service: String
  }

   type Query {
    employee: Employee
    employees: [Employee]
  }
  input EmployeeInput {
    firstname: String
    lastname: String
    email: String
    phone: String
    sex: String
    job: String
    service: String
  }

  type Mutation {
    createEmployee(employeeInput: EmployeeInput!): Employee!
    deleteEmployee(ID: ID!): Boolean
    editEmployee(ID: ID!, employeeInput: EmployeeInput!): Employee!
  }
`;
export default EmployeeTypeDefs;
