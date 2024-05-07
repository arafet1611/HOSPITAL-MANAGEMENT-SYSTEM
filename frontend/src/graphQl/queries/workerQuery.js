import { gql } from "@apollo/client";

const GET_WORKERS = gql`
  query GetWorkers {
    workers {
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

export { GET_WORKERS };
