import { gql } from "@apollo/client";

const GET_DOCTORS = gql`
  query GetDoctors {
    doctors {
      employee {
        firstname
        lastname
      }
      Type
      categorie
      responsabilite
    }
  }
`;

export { GET_DOCTORS };
