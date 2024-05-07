import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($employeeInput: EmployeeInput!) {
    createEmployee(employeeInput: $employeeInput) {
      id
      firstname
      lastname
      phone
      email
      sex
      job
      service
    }
  }
`;
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($ID: ID!) {
    deleteEmployee(ID: $ID) {
      id
    }
  }
`;
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($ID: ID!, $employeeInput: EmployeeInput!) {
    editEmployee(ID: $ID, employeeInput: $employeeInput) {
      id
      firstname
      lastname
      phone
      email
      sex
      job
    }
  }
`;
