import { gql } from "@apollo/client";

const GET_TECHNICIANS = gql`
  query GetTechnicians {
    technicians {
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
export {GET_TECHNICIANS};
