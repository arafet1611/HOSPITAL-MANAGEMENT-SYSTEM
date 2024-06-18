import { gql } from "@apollo/client";

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      firstname
      lastname
      phone
      email
      image
      sex
      job
      service
      isActive
    }
  }
`;
const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID) {
    employee(ID: $id) {
      _id
      firstname
      lastname
      email
      phone

      job
      dateJoining
    }
  }
`;

export { GET_EMPLOYEES, GET_EMPLOYEE };
