import { gql } from "@apollo/client";

const GET_DOCTORS = gql`
  query GetDoctors {
    doctors {
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

const GET_DOCTORS_BY_SERVICE = gql`
  query GetDoctorsByService($ServiceId: ServiceId!) {
    doctorsByService(ServiceId: $ServiceId) {
      employee {
        id
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

export { GET_DOCTORS, GET_DOCTORS_BY_SERVICE };
