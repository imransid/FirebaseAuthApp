import {gql} from '@apollo/client';

export const GET_A_USER_QUERY = gql`
  query GetAUser {
    getAUser {
      id
      email
      firstName
      lastName
      mobileNumber
      approveStatus
      role
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      firstName
      lastName
      mobileNumber
      approveStatus
      role
    }
  }
`;
