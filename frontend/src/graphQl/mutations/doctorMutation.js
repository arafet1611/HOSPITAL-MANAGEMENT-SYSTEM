import { gql } from "@apollo/client";

export const CREATE_DOCTOR = gql`
  mutation CreateDoctor($employeeID: ID!, $doctorInput: DoctorInput!) {
    createDoctor(employeeID: $employeeID, doctorInput: $doctorInput) {
      employee {
        firstname
        lastname
        service
      }
      Type
      categorie
      responsabilite
    }
  }
`;
