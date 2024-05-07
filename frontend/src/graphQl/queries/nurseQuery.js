import { gql } from "@apollo/client";

const GET_NURSES = gql`
  query GetNurses {
    nurses{
      employee{
        firstname
        lastname
      }
      Type
      categorie
      responsabilite
    }
  }
`;
export { GET_NURSES };
